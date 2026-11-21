import { PermissionFlagsBits } from "discord.js";
import { replyError } from "../lib/replies.js";

/** In-memory countdown store for the MVP (replace with DB for multi-instance). */
const countdowns = new Map();

const MAX_ISO_LENGTH = 64;

function formatDiscordTimestamp(ts) {
  const sec = Math.floor(ts / 1000);
  return `<t:${sec}:F> (<t:${sec}:R>)`;
}

export async function handleCountdown(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    await replyError(interaction, "Countdown only works inside a server.");
    return;
  }

  const sub = interaction.options.getSubcommand();

  if (sub === "set") {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
      await replyError(interaction, "You need **Manage Server** to set the countdown.");
      return;
    }

    const when = interaction.options.getString("when", true).trim();
    if (when.length > MAX_ISO_LENGTH) {
      await replyError(interaction, "That date string is too long. Use a short ISO datetime.");
      return;
    }

    const ts = Date.parse(when);
    if (Number.isNaN(ts)) {
      await replyError(
        interaction,
        "Could not parse that date. Use ISO like `2026-12-01T00:00:00Z`.",
      );
      return;
    }

    // Reject absurdly far / past-only noise (allow past for “already launched” display)
    const year = new Date(ts).getUTCFullYear();
    if (year < 2020 || year > 2100) {
      await replyError(interaction, "Pick a date between years 2020 and 2100.");
      return;
    }

    countdowns.set(guildId, ts);
    await interaction.reply({
      content: `Countdown set to ${formatDiscordTimestamp(ts)}.`,
    });
    return;
  }

  if (sub === "clear") {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
      await replyError(interaction, "You need **Manage Server** to clear the countdown.");
      return;
    }
    countdowns.delete(guildId);
    await interaction.reply({ content: "Countdown cleared for this server." });
    return;
  }

  const ts = countdowns.get(guildId);
  if (!ts) {
    await replyError(
      interaction,
      "No countdown set yet. Try `/countdown set when:2026-12-01T00:00:00Z`.",
    );
    return;
  }

  await interaction.reply({
    content: `Current countdown: ${formatDiscordTimestamp(ts)}`,
  });
}
