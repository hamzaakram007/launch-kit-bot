/** Owner-editable seed FAQ replies (neutral — no publisher IP). */

export const FAQ_ITEMS = [
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

export function getFaqSlice(max = 5) {
  const n = Math.min(5, Math.max(1, max));
  return FAQ_ITEMS.slice(0, n);
}

export function findFaq(customId) {
  return FAQ_ITEMS.find((f) => f.id === customId) ?? null;
}
