# Launch Kit Bot (Discord)

Neutral Discord launch-server kit by NeonGulf — **not** an official publisher bot. **Not** an affiliate shop.

## Commands

| Command | Purpose |
| --- | --- |
| `/setup` | Create `Spoiler-OK` role (Manage Server + Manage Roles) |
| `/countdown set\|show\|clear` | In-memory launch countdown |
| `/faq` | Post FAQ buttons (Manage Server) |
| `/tip show\|add\|list` | Tip of the day queue |
| message listener | Soft scam-link warn — **off** unless `SCAM_WARN_ENABLED=true` |

## Hardening notes

- Secrets only via env (`DISCORD_TOKEN` never committed)
- Permission checks on admin commands
- ISO date validation on countdown
- Tip text length limits (3–280)
- Per-user command cooldown + FAQ button rate limit
- Clear ephemeral errors (no stack traces to users)
- Scam-warn rate-limited per channel; Message Content Intent only when enabled

## Env vars (exact)

Copy `bot/.env.example`. On Fly/VPS set:

| Name | Required | Notes |
| --- | --- | --- |
| `DISCORD_TOKEN` | Yes | Bot token from Discord Developer Portal |
| `CLIENT_ID` | Yes | Application ID |
| `GUILD_ID` | No | Guild ID for instant command sync in one test server |
| `SCAM_WARN_ENABLED` | No | `true` / `false` (default off) |
| `FAQ_MAX` | No | `1`–`5` (default `5`) |
| `COMMAND_COOLDOWN_SECONDS` | No | Default `3` |

Hamza must create the Discord app and paste real values into the host. Do not invent tokens.

## Run locally

```bash
cd bot
npm install
export DISCORD_TOKEN=...
export CLIENT_ID=...
# optional for fast guild command sync:
export GUILD_ID=...
npm run register
npm start
```

Without `DISCORD_TOKEN`, `npm start` prints dry-run guidance and skips login.

## Hosting note

Keep the bot process on a small VPS/Fly. The Next.js site on Vercel is the NeonGulf invite landing + dashboard preview — it does **not** run the Discord websocket.
