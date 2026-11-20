# Launch Kit Bot (Discord)

Neutral Discord launch-server kit by NeonGulf — **not** an official publisher bot.

## Commands

| Command | Purpose |
| --- | --- |
| `/setup` | Create `Spoiler-OK` role (Manage Roles required) |
| `/countdown set\|show` | In-memory launch countdown |
| `/faq` | Post 5 seed FAQ buttons |
| message listener | Soft scam-link warning heuristics |

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

Without `DISCORD_TOKEN`, `npm start` prints dry-run guidance and exits the login path.

## Hosting note

Keep the bot process on a small VPS/Fly. The Next.js site on Vercel is the NeonGulf SaaS landing + dashboard preview.
