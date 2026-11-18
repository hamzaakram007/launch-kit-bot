import { setupSteps } from "@/data/features";

export function SetupGuide() {
  return (
    <section id="setup" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
          Bot setup docs
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          The website deploys on Vercel. The Discord process lives in{" "}
          <code className="text-[var(--teal)]">bot/</code> and needs its own host. Full notes also
          live in the repo README.
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
          Quick commands
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--line)] bg-[#031016] p-4 text-xs leading-relaxed text-[var(--cyan)] sm:text-sm">
{`cd bot && npm install
export DISCORD_TOKEN=... CLIENT_ID=... GUILD_ID=...
npm run register
npm start
# In Discord: /setup  →  /countdown set when:2026-12-01T00:00:00Z  →  /faq`}
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
          Required bot permissions (MVP): Manage Roles, Send Messages, Embed Links, Use Application
          Commands. Enable Message Content Intent for scam-warn. Never commit tokens.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-[var(--sand)]">
          Legal: keep the bot neutral — no publisher trademarks in the name/avatar, no RMT or leak
          channels as features.
        </p>
      </div>
    </section>
  );
}
