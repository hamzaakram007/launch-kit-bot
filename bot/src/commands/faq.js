import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} from "discord.js";

const FAQ = [
  {
    id: "faq_consoles",
    label: "Which consoles?",
    answer:
      "This server is for console players. Check pinned channels for platform roles.",
  },
  {
    id: "faq_spoilers",
    label: "Spoiler policy",
    answer:
      "Keep story talk in spoiler channels. Take the Spoiler-OK role only when ready.",
  },
  {
    id: "faq_buy",
    label: "Buy only official",
    answer:
      "Only buy from official storefronts. Never run random installer links for console titles.",
  },
  {
    id: "faq_tips",
    label: "Tip of the day",
    answer: "Tips rotate in your tips channel — short and spoiler-free.",
  },
  {
    id: "faq_help",
    label: "Need help?",
    answer: "Ping mods in support. Do not DM strangers offering free codes.",
  },
];

export async function handleFaq(interaction) {
  const row = new ActionRowBuilder().addComponents(
    FAQ.map((item) =>
      new ButtonBuilder()
        .setCustomId(item.id)
        .setLabel(item.label)
        .setStyle(ButtonStyle.Secondary),
    ).slice(0, 5),
  );

  await interaction.reply({
    content: "Launch Kit FAQ — tap a button (seed replies; edit later in dashboard).",
    components: [row],
  });

  const message = await interaction.fetchReply();
  const collector = message.createMessageComponentCollector({ time: 15 * 60 * 1000 });

  collector.on("collect", async (btn) => {
    const item = FAQ.find((f) => f.id === btn.customId);
    await btn.reply({
      content: item?.answer ?? "Unknown FAQ item.",
      flags: MessageFlags.Ephemeral,
    });
  });
}
