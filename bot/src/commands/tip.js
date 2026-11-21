import { MessageFlags, PermissionFlagsBits } from "discord.js";
import { replyError } from "../lib/replies.js";

/** Spoiler-free tip queue (in-memory MVP). */
const tipsByGuild = new Map();

const DEFAULT_TIPS = [
  "Keep story chat in spoiler channels until friends are ready.",
  "Buy only from official storefronts — skip random “free download” links.",
  "Take breaks on launch night. Hydrate. Your save will still be there.",
  "Use platform roles so friends find the right voice/text rooms.",
  "Pin server rules once. Repeat less. Help more.",
];

function listFor(guildId) {
  if (!tipsByGuild.has(guildId)) {
    tipsByGuild.set(guildId, [...DEFAULT_TIPS]);
  }
  return tipsByGuild.get(guildId);
}

/**
 * /tip show — post next tip
 * /tip add text:… — owner/mod adds a tip (Manage Guild)
 * /tip list — show queue size (ephemeral)
 */
export async function handleTip(interaction) {
  const guildId = interaction.guildId;
  if (!guildId) {
    await replyError(interaction, "Tips only work inside a server.");
    return;
  }

  const sub = interaction.options.getSubcommand();
  const tips = listFor(guildId);

  if (sub === "add") {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
      await replyError(interaction, "You need Manage Server to add tips.");
      return;
    }
    const text = interaction.options.getString("text", true).trim();
    if (text.length < 3 || text.length > 280) {
      await replyError(interaction, "Tip text must be 3–280 characters.");
      return;
    }
    if (tips.length >= 50) {
      await replyError(interaction, "Tip queue is full (50 max). Remove some later via dashboard.");
      return;
    }
    tips.push(text);
    await interaction.reply({
      content: `Tip added (${tips.length} in queue).`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (sub === "list") {
    await interaction.reply({
      content: `This server has **${tips.length}** tip(s) queued. Use \`/tip show\` to post the next one.`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  // show
  if (tips.length === 0) {
    await replyError(interaction, "No tips yet. Add one with `/tip add text:…`.");
    return;
  }

  const tip = tips.shift();
  tips.push(tip); // rotate
  await interaction.reply({
    content: `**Tip of the day**\n${tip}`,
  });
}
