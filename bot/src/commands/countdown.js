import { MessageFlags } from "discord.js";

/** In-memory countdown store for the MVP scaffold (replace with DB later). */
const countdowns = new Map();

export async function handleCountdown(interaction) {
  const guildId = interaction.guildId ?? "dm";
  const sub = interaction.options.getSubcommand();

  if (sub === "set") {
    const when = interaction.options.getString("when", true);
    const ts = Date.parse(when);
    if (Number.isNaN(ts)) {
      await interaction.reply({
        content: "Could not parse that date. Use an ISO string like 2026-12-01T00:00:00Z.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    countdowns.set(guildId, ts);
    await interaction.reply({
      content: `Countdown set to <t:${Math.floor(ts / 1000)}:F> (<t:${Math.floor(ts / 1000)}:R>).`,
    });
    return;
  }

  const ts = countdowns.get(guildId);
  if (!ts) {
    await interaction.reply({
      content: "No countdown set yet. Try `/countdown set when:2026-12-01T00:00:00Z`.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.reply({
    content: `Current countdown: <t:${Math.floor(ts / 1000)}:F> · <t:${Math.floor(ts / 1000)}:R>`,
  });
}
