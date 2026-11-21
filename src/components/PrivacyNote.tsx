export function PrivacyNote() {
  return (
    <section id="privacy" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
        Privacy note
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Easy words: the bot only sees what Discord sends it to do its job. We do not sell your
        data.
      </p>
      <ul className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <li>
          <span className="text-[var(--foam)]">What we use:</span> server IDs, channel IDs, role
          IDs, and command usage needed for setup, FAQ, countdown, and tips. Message content is
          read only if you turn on the optional scam-link warn (Message Content Intent).
        </li>
        <li>
          <span className="text-[var(--foam)]">What we do not do:</span> no selling member lists, no
          reading DMs, no training ads on your chat, no RMT or leak tools.
        </li>
        <li>
          <span className="text-[var(--foam)]">Secrets:</span> the Discord bot token stays in host
          env vars — never in the public repo or the Vercel marketing site.
        </li>
        <li>
          <span className="text-[var(--foam)]">Self-host:</span> if you run the open-source bot
          yourself, your process stores countdown/tips in memory until you add a database. Restart
          clears that MVP store.
        </li>
      </ul>
    </section>
  );
}
