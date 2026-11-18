# Launch Kit Bot (Discord scaffold)

Neutral Discord launch-server kit — **not** an official publisher bot.

## Commands (stubs)

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

Keep the bot process on a small VPS/Fly. The Next.js site on Vercel is the SaaS landing + dashboard mock only.
