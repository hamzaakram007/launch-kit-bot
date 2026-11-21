const commands = [
  {
    name: "/setup",
    blurb: "Create the Spoiler-OK role so early players stay unspoiled.",
  },
  {
    name: "/countdown",
    blurb: "Set, show, or clear a live launch countdown in your server.",
  },
  {
    name: "/faq",
    blurb: "Post button FAQs — console rules, spoilers, buy-official tips.",
  },
  {
    name: "/tip",
    blurb: "Show or add a rotating spoiler-free tip of the day.",
  },
];

export function CommandsHero() {
  return (
    <section id="commands" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
        Slash commands that run the kit
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        This is a Discord launch-kit bot — not a shopping site. Invite it, run{" "}
        <code className="text-[var(--teal)]">/setup</code>, then layer countdown, FAQ, and tips.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {commands.map((cmd) => (
          <li key={cmd.name} className="border-t border-[var(--line)] pt-5">
            <p className="font-display text-2xl text-[var(--cyan)]">{cmd.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{cmd.blurb}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[var(--muted)]">
        Optional: educational scam-link warn (off by default — set{" "}
        <code className="text-[var(--teal)]">SCAM_WARN_ENABLED=true</code> on the bot host). For a
        full link checker, use NeonGulf Safe Link Check — a separate product.
      </p>
    </section>
  );
}
