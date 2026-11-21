/**
 * Launch Kit Bot — Discord.js runtime for NeonGulf.
 * Secrets via env only. Never commit DISCORD_TOKEN.
 */

import { config as loadDotenv } from "dotenv";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  MessageFlags,
} from "discord.js";

// Loads bot/.env when you run npm start from the bot/ folder (never commit that file).
loadDotenv();
import { handleSetup } from "./commands/setup.js";
import { handleCountdown } from "./commands/countdown.js";
import { handleFaq } from "./commands/faq.js";
import { handleTip } from "./commands/tip.js";
import { maybeWarnScamLink } from "./modules/scam-warn.js";
import { loadEnv } from "./lib/env.js";
import { takeToken } from "./lib/rate-limit.js";
import { findFaq } from "./lib/faq-data.js";
import { replyError } from "./lib/replies.js";

const env = loadEnv();

if (!env.token) {
  console.log(
    "[launch-kit-bot] DISCORD_TOKEN missing — dry-run mode. Export a token to connect. See bot/.env.example.",
  );
}

const intents = [GatewayIntentBits.Guilds];
if (env.scamWarnEnabled) {
  intents.push(GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent);
}

const client = new Client({
  intents,
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (c) => {
  console.log(
    `[launch-kit-bot] ready as ${c.user.tag} · scam-warn=${env.scamWarnEnabled ? "on" : "off"} · faqMax=${env.faqMax}`,
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isButton()) {
      const item = findFaq(interaction.customId);
      if (!item) return;

      const limit = takeToken(`faqbtn:${interaction.user.id}`, 10_000, 5);
      if (!limit.ok) {
        await interaction.reply({
          content: `Slow down a bit — try again in ~${limit.retryAfterSec}s.`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      await interaction.reply({
        content: item.answer,
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const cooldownMs = env.commandCooldownSeconds * 1000;
    const limit = takeToken(
      `cmd:${interaction.user.id}:${interaction.commandName}`,
      cooldownMs,
      1,
    );
    if (!limit.ok) {
      await replyError(
        interaction,
        `Please wait ~${limit.retryAfterSec}s before using \`/${interaction.commandName}\` again.`,
      );
      return;
    }

    if (interaction.commandName === "setup") {
      await handleSetup(interaction);
      return;
    }
    if (interaction.commandName === "countdown") {
      await handleCountdown(interaction);
      return;
    }
    if (interaction.commandName === "faq") {
      await handleFaq(interaction, { faqMax: env.faqMax });
      return;
    }
    if (interaction.commandName === "tip") {
      await handleTip(interaction);
    }
  } catch (err) {
    console.error("[launch-kit-bot] interaction error", err);
    await replyError(
      interaction,
      "Something went wrong running that. Try again in a moment — if it keeps failing, check bot permissions.",
    );
  }
});

if (env.scamWarnEnabled) {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    await maybeWarnScamLink(message, { enabled: true });
  });
}

if (env.token) {
  client.login(env.token).catch((err) => {
    console.error(
      "[launch-kit-bot] login failed — check DISCORD_TOKEN is valid and not revoked.",
      err?.message ?? err,
    );
    process.exit(1);
  });
} else {
  console.log(
    "[launch-kit-bot] commands loaded: /setup /countdown /faq /tip (+ optional scam-warn).",
  );
}
