# Launch Kit Bot

Neutral **Discord launch-server kit** by NeonGulf — spoiler roles, FAQ buttons, tip of the day, countdown, optional scam-link warn.

Independent product by **Hamza Akram**. Not affiliated with Discord Inc., Rockstar Games, Take-Two, Sony, or Microsoft. No official game assets. No RMT or leak tools. **Not** an Amazon affiliate site.

## Live

- Site: https://bot.neongulf.com
- Fallback: https://launch-kit-bot.vercel.app
- Repo: https://github.com/hamzaakram007/launch-kit-bot

## What’s in this repo

| Path | What |
| --- | --- |
| `src/` | Next.js invite landing + setup docs + dashboard preview |
| `bot/` | Discord.js bot (`/setup`, `/countdown`, `/faq`, `/tip`, optional scam-warn) |

## Slash commands (hero product)

| Command | Purpose |
| --- | --- |
| `/setup` | Create `Spoiler-OK` role |
| `/countdown set\|show\|clear` | Launch countdown |
| `/faq` | Post FAQ button panel |
| `/tip show\|add\|list` | Tip of the day |

## Pricing (SaaS plan)

| Plan | Price | Includes |
| --- | --- | --- |
| **Free** | $0 | Countdown + 1 FAQ + `/setup` |
| **Server seat** | **$9/mo per Discord server** | Full modules (roles, 5 FAQs, tip-of-day, scam-warn, billing portal) |

Checkout / Stripe portal open soon. Self-hosting the open-source bot is free.

## Web (Vercel)

```bash
npm install
npm run dev
```

### Vercel env (landing invite button)

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_DISCORD_CLIENT_ID` | For live invite CTA | Discord Application ID |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | Optional | Full OAuth invite URL override |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL (default `https://bot.neongulf.com`) |

**Do not** put `DISCORD_TOKEN` on Vercel. The marketing site never needs the bot token.

## Bot setup (Hamza must set these)

1. Create a Discord application + bot; copy **token** and **application ID**.
2. `cd bot && npm install`
3. Set env on your VPS/Fly (see `bot/.env.example`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `DISCORD_TOKEN` | **Yes** | Bot login — secret, never commit |
| `CLIENT_ID` | **Yes** | Application ID for slash command register |
| `GUILD_ID` | No | Fast guild-scoped command sync while testing |
| `SCAM_WARN_ENABLED` | No | `true` only if Message Content Intent is enabled |
| `FAQ_MAX` | No | 1–5 FAQ buttons (default 5) |
| `COMMAND_COOLDOWN_SECONDS` | No | Per-user command cooldown (default 3) |

```bash
export DISCORD_TOKEN=...
export CLIENT_ID=...
# optional:
export GUILD_ID=...
export SCAM_WARN_ENABLED=false
npm run register
npm start
```

4. Invite with Manage Roles + Send Messages + Embed Links + Use Application Commands.
5. In Discord: `/setup` → `/countdown set when:2026-12-01T00:00:00Z` → `/faq` → `/tip show`.

Keep the bot process on a small VPS/Fly. Vercel hosts the NeonGulf marketing site only.

More detail: [`bot/README.md`](./bot/README.md) and the on-site **Setup** section.

## Privacy

See the on-site [Privacy note](https://bot.neongulf.com/#privacy). Token never in repo. Message content only if scam-warn is enabled.

## License

MIT — see [LICENSE](./LICENSE).
