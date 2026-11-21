import { setupSteps } from "@/data/features";

export function SetupGuide() {
  return (
    <section id="setup" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
          Invite + setup
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          Landing page → Vercel. Bot process → your VPS/Fly. Exact env names below — Hamza sets the
          real Discord token; we never invent or commit secrets.
        </p>
      </div>

      <ol className="mt-10 space-y-5">
        {setupSteps.map((item) => (
          <li key={item.step} className="panel flex gap-4 rounded-2xl p-5 sm:gap-5 sm:p-6">
            <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--teal)]/10 text-[var(--teal)]">
              {item.step}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--foam)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="panel mt-8 rounded-2xl p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
          Bot host env (required)
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--line)] bg-[#031016] p-4 text-xs leading-relaxed text-[var(--cyan)] sm:text-sm">
{`DISCORD_TOKEN=          # Bot token from Discord Developer Portal
CLIENT_ID=              # Application ID
# Optional:
GUILD_ID=               # Fast guild command sync while testing
SCAM_WARN_ENABLED=false # true only if Message Content Intent is on
FAQ_MAX=5
COMMAND_COOLDOWN_SECONDS=3

cd bot && npm install && npm run register && npm start
# In Discord: /setup → /countdown set when:2026-12-01T00:00:00Z → /faq → /tip show`}
        </pre>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
          Vercel landing env (invite button)
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--line)] bg-[#031016] p-4 text-xs leading-relaxed text-[var(--cyan)] sm:text-sm">
{`NEXT_PUBLIC_DISCORD_CLIENT_ID=   # same Application ID as CLIENT_ID
NEXT_PUBLIC_DISCORD_INVITE_URL=  # optional full OAuth URL override
NEXT_PUBLIC_SITE_URL=https://bot.neongulf.com`}
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Required bot permissions: Manage Roles, Send Messages, Embed Links, Use Application
          Commands. Never commit tokens. See{" "}
          <code className="text-[var(--teal)]">bot/.env.example</code> and root{" "}
          <code className="text-[var(--teal)]">.env.example</code>.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[var(--sand)]">
          Legal: keep the bot neutral — no publisher trademarks in the name/avatar, no RMT or leak
          channels as features.
        </p>
      </div>
    </section>
  );
}
