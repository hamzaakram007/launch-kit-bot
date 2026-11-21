/**
 * Read and validate bot env. Never log token values.
 */

function truthy(value) {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(String(value).trim().toLowerCase());
}

function clampInt(raw, fallback, min, max) {
  const n = Number.parseInt(String(raw ?? ""), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function loadEnv() {
  const token = process.env.DISCORD_TOKEN?.trim() || "";
  const clientId = process.env.CLIENT_ID?.trim() || "";
  const guildId = process.env.GUILD_ID?.trim() || "";

  return {
    token,
    clientId,
    guildId: guildId || null,
    scamWarnEnabled: truthy(process.env.SCAM_WARN_ENABLED),
    faqMax: clampInt(process.env.FAQ_MAX, 5, 1, 5),
    commandCooldownSeconds: clampInt(process.env.COMMAND_COOLDOWN_SECONDS, 3, 1, 60),
  };
}

export function assertRegisterEnv(env) {
  const missing = [];
  if (!env.token) missing.push("DISCORD_TOKEN");
  if (!env.clientId) missing.push("CLIENT_ID");
  if (missing.length) {
    console.error(
      `[launch-kit-bot] Missing required env: ${missing.join(", ")}. See bot/.env.example.`,
    );
    process.exit(1);
  }
}
