/**
 * Launch Kit Bot — Discord.js scaffold (high-level MVP).
 * Set DISCORD_TOKEN + CLIENT_ID before running. No publisher IP.
 */

import {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
  MessageFlags,
} from "discord.js";
import { handleSetup } from "./commands/setup.js";
import { handleCountdown } from "./commands/countdown.js";
import { handleFaq } from "./commands/faq.js";
import { maybeWarnScamLink } from "./modules/scam-warn.js";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.log(
    "[launch-kit-bot] DISCORD_TOKEN missing — scaffold loads in dry-run mode. Export a token to connect.",
  );
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (c) => {
  console.log(`[launch-kit-bot] ready as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "setup") {
      await handleSetup(interaction);
      return;
    }
    if (interaction.commandName === "countdown") {
      await handleCountdown(interaction);
      return;
    }
    if (interaction.commandName === "faq") {
      await handleFaq(interaction);
    }
  } catch (err) {
    console.error("[launch-kit-bot] command error", err);
    const payload = {
      content: "Something went wrong running that command stub.",
      flags: MessageFlags.Ephemeral,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(payload);
    } else {
      await interaction.reply(payload);
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  await maybeWarnScamLink(message);
});

if (token) {
  client.login(token);
} else {
  console.log("[launch-kit-bot] stubs loaded. Commands: /setup /countdown /faq + scam-warn listener.");
}
