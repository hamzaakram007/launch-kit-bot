import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} from "discord.js";
import { getFaqSlice } from "../lib/faq-data.js";
import { replyError } from "../lib/replies.js";

/**
 * /faq — post FAQ button panel (owner-written seed replies).
 * Button clicks are handled globally in index.js (survives restarts better than collectors).
 */
export async function handleFaq(interaction, { faqMax = 5 } = {}) {
  if (!interaction.guildId) {
    await replyError(interaction, "FAQ panels only work inside a server.");
    return;
  }

  if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
    await replyError(interaction, "You need **Manage Server** to post the FAQ panel.");
    return;
  }

  const items = getFaqSlice(faqMax);
  const row = new ActionRowBuilder().addComponents(
    items.map((item) =>
      new ButtonBuilder()
        .setCustomId(item.id)
        .setLabel(item.label)
        .setStyle(ButtonStyle.Secondary),
    ),
  );

  await interaction.reply({
    content:
      "Launch Kit FAQ — tap a button for a short answer (seed text; edit later in the dashboard).",
    components: [row],
  });
}
