# Launch Kit Bot

Neutral **Discord launch-server kit** SaaS — spoiler roles, FAQ buttons, tip-of-day, countdown, and scam-link warn stubs.

Independent product by **Hamza Akram**. Not affiliated with Discord Inc., Rockstar Games, Take-Two, Sony, or Microsoft. No official game assets. No RMT or leak tools.

## Live

- Site: https://launch-kit-bot.vercel.app
- Repo: https://github.com/hamzaakram007/launch-kit-bot

## What’s in this repo

| Path | What |
| --- | --- |
| `src/` | Next.js marketing site + dashboard mock |
| `bot/` | Discord.js scaffold (`/setup`, `/countdown`, `/faq`, scam-warn) |

## Pricing (MVP)

| Plan | Price | Includes |
| --- | --- | --- |
| **Free** | $0 | Countdown + 1 FAQ + `/setup` |
| **Server seat** | **$9/mo per Discord server** | Full modules (roles, 5 FAQs, tip-of-day, scam-warn, Stripe portal stub) |

Billed per server, not per user. Typical seat range discussed for the product: $5–$20/mo. Stripe is stubbed — no live charges yet.

## Web (Vercel)

```bash
npm install
npm run dev
```

## Bot setup

1. Create a Discord application + bot; copy token and client ID. Enable **Message Content Intent** for scam-warn.
2. `cd bot && npm install`
3. Export env and register commands:

```bash
export DISCORD_TOKEN=...
export CLIENT_ID=...
# optional fast guild sync:
export GUILD_ID=...
npm run register
npm start
```

4. Invite with Manage Roles + Send Messages + Use Application Commands.
5. In Discord: `/setup` → `/countdown set when:2026-12-01T00:00:00Z` → `/faq`.

Keep the bot process on a small VPS/Fly. Vercel only hosts the marketing site + dashboard mock.

More detail: [`bot/README.md`](./bot/README.md) and the on-site **Setup** section.

## License

MIT — see [LICENSE](./LICENSE).
