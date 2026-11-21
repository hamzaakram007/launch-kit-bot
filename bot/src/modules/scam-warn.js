/**
 * Educational scam-link warn.
 * Soft-flags suspicious URL patterns — not antivirus, not Safe Link Check.
 * Gated by SCAM_WARN_ENABLED. Rate-limited per channel to avoid spam loops.
 */

import { takeToken } from "../lib/rate-limit.js";

const SUSPICIOUS = [
  /free[-_]?download/i,
  /crack/i,
  /steamcommunity\.ru/i,
  /bit\.ly\//i,
  /\.exe\b/i,
  /ultimate[-_]?edition[-_]?pc/i,
  /discord[-_]?nitro[-_]?free/i,
  /claim[-_]?reward/i,
];

export async function maybeWarnScamLink(message, { enabled = false } = {}) {
  if (!enabled) return;
  if (!message.guildId) return;

  const text = message.content ?? "";
  if (text.length > 2000) return;
  if (!/https?:\/\//i.test(text)) return;

  const hit = SUSPICIOUS.some((re) => re.test(text));
  if (!hit) return;

  const limit = takeToken(`scamwarn:${message.channelId}`, 60_000, 2);
  if (!limit.ok) return;

  try {
    await message.reply({
      content:
        "⚠️ **Launch Kit warn:** that link matches common scam / fake-download patterns. Prefer official storefronts. This is an educational heuristic — **not** a malware scan. For a dedicated checker, use NeonGulf Safe Link Check.",
      allowedMentions: { repliedUser: false },
    });
  } catch (err) {
    console.error("[launch-kit-bot] scam-warn reply failed", err);
  }
}
