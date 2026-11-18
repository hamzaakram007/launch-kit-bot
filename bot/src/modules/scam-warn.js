/**
 * Educational scam-link warn stub.
 * Soft-flags suspicious URL patterns — not antivirus, not a full Safe Link Check.
 */

const SUSPICIOUS = [
  /free[-_]?download/i,
  /crack/i,
  /steamcommunity\.ru/i,
  /bit\.ly\//i,
  /\.exe\b/i,
  /ultimate[-_]?edition[-_]?pc/i,
];

export async function maybeWarnScamLink(message) {
  const text = message.content ?? "";
  if (!/https?:\/\//i.test(text)) return;

  const hit = SUSPICIOUS.some((re) => re.test(text));
  if (!hit) return;

  await message.reply({
    content:
      "⚠️ **Launch Kit warn (stub):** that link matches common scam/fake-download patterns. Prefer official storefronts. This is an educational heuristic — not a malware scan.",
    allowedMentions: { repliedUser: false },
  });
}
