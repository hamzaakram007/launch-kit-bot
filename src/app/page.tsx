import { DashboardPreview } from "@/components/DashboardPreview";
import { InviteStub } from "@/components/InviteStub";
import { Pricing } from "@/components/Pricing";
import { SetupGuide } from "@/components/SetupGuide";
import { features } from "@/data/features";

export default function Home() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="atmosphere absolute inset-0" aria-hidden />
      <div className="grid-wash absolute inset-0" aria-hidden />
      <div
        className="animate-drift pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="animate-drift pointer-events-none absolute -left-16 bottom-40 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative z-10">
        <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <p className="font-display text-lg tracking-tight text-[var(--cyan)]">Launch Kit Bot</p>
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
            <a className="transition hover:text-[var(--foam)]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[var(--foam)]" href="#dashboard">
              Dashboard
            </a>
            <a className="transition hover:text-[var(--foam)]" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-[var(--foam)]" href="#setup">
              Setup
            </a>
            <a
              className="hidden transition hover:text-[var(--foam)] sm:inline"
              href="https://github.com/hamzaakram007/launch-kit-bot"
            >
              GitHub
            </a>
          </nav>
        </header>

        <section className="mx-auto flex min-h-[78vh] max-w-5xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6 sm:pt-6">
          <p className="animate-fade-up font-display text-4xl tracking-tight text-[var(--cyan)] sm:text-6xl md:text-7xl">
            Launch Kit Bot
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl text-xl font-medium leading-snug text-[var(--foam)] sm:text-2xl">
            Neutral Discord tools for gaming launch servers — roles, FAQ, countdown, scam warn.
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            A generic launch-server kit SaaS. Not an official publisher bot. Free forever for
            countdown + one FAQ; <span className="text-[var(--foam)]">$9/mo per Discord server</span>{" "}
            unlocks the full module set. Built by Hamza Akram.
          </p>
          <div className="animate-fade-up-delay-2 mt-8">
            <InviteStub />
          </div>
        </section>

        <section id="features" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
            What the kit includes
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            High-level MVP modules with Discord.js stubs under{" "}
            <code className="text-[var(--teal)]">/bot</code>. Wire tokens later — no publisher marks
            or leak channels.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <li
                key={feature.id}
                className="border-t border-[var(--line)] pt-5"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <h3 className="font-display text-2xl text-[var(--foam)]">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{feature.blurb}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-[var(--teal)]/80">
                  {feature.stub}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="dashboard" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
            Configure without leaving the browser
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            Toggle modules and preview FAQ replies. This UI is a stub until Discord OAuth and Stripe
            are connected.
          </p>
          <div className="mt-8">
            <DashboardPreview />
          </div>
        </section>

        <Pricing />
        <SetupGuide />

        <footer className="mx-auto max-w-5xl border-t border-[var(--line)] px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-lg text-[var(--cyan)]">Launch Kit Bot</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
                Independent fan utility by Hamza Akram. Not affiliated with Discord Inc., Rockstar
                Games, Take-Two, Sony, or Microsoft. No official game assets. No RMT or leak tools.
              </p>
            </div>
            <a
              className="text-sm text-[var(--teal)] transition hover:text-[var(--cyan)]"
              href="https://github.com/hamzaakram007/launch-kit-bot"
            >
              Source on GitHub →
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
