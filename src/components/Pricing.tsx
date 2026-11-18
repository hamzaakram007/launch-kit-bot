import { pricing } from "@/data/features";

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight text-[var(--foam)] sm:text-4xl">
          Clear pricing
        </h2>
        <p className="mt-3 text-[var(--muted)]">
          You pay <strong className="font-medium text-[var(--foam)]">per Discord server</strong>, not
          per user. Free forever for countdown + one FAQ. Server seat unlocks the full kit. Stripe
          checkout and customer portal are stubs until keys are connected — no charges yet.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pricing.map((plan) => (
          <article
            key={plan.id}
            className={`panel rounded-2xl p-6 ${
              plan.featured ? "border-[var(--teal)]/40 ring-1 ring-[var(--teal)]/20" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
                {plan.name}
              </p>
              {plan.featured ? (
                <span className="rounded-md border border-[var(--teal)]/35 bg-[var(--teal)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--teal)]">
                  Most popular
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-display text-4xl text-[var(--foam)]">
              {plan.price}
              <span className="ml-2 text-base font-normal text-[var(--muted)]">{plan.period}</span>
            </p>
            {"priceNote" in plan && plan.priceNote ? (
              <p className="mt-2 text-xs leading-relaxed text-[var(--sand)]">{plan.priceNote}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{plan.blurb}</p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Includes
            </p>
            <ul className="mt-2 space-y-2">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex gap-2 text-sm text-[var(--foam)]/90">
                  <span className="text-[var(--teal)]" aria-hidden>
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            {plan.notIncluded.length > 0 ? (
              <>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Not included
                </p>
                <ul className="mt-2 space-y-2">
                  {plan.notIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[var(--muted)]">
                      <span aria-hidden>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <button
              type="button"
              disabled
              title="Stripe checkout stub — not wired"
              className={`mt-6 w-full ${plan.featured ? "btn-primary" : "btn-ghost"} opacity-80`}
            >
              {plan.cta} (stub)
            </button>
          </article>
        ))}
      </div>

      <div className="panel mt-8 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <caption className="sr-only">Free vs Server seat feature comparison</caption>
          <thead>
            <tr className="border-b border-[var(--line)] text-[11px] uppercase tracking-wider text-[var(--muted)]">
              <th className="px-4 py-3 font-semibold">Module</th>
              <th className="px-4 py-3 font-semibold">Free</th>
              <th className="px-4 py-3 font-semibold">Server seat ($9/mo)</th>
            </tr>
          </thead>
          <tbody className="text-[var(--foam)]/90">
            {[
              ["Countdown", "Yes", "Yes"],
              ["FAQ buttons", "1", "Up to 5"],
              ["/setup spoiler role", "Yes", "Yes + channel gates"],
              ["Tip of the day", "—", "Yes"],
              ["Scam-link warn", "—", "Yes"],
              ["Stripe portal", "—", "Stub → live later"],
            ].map(([module, free, seat]) => (
              <tr key={module} className="border-b border-[var(--line)]/60">
                <td className="px-4 py-3">{module}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{free}</td>
                <td className="px-4 py-3 text-[var(--teal)]">{seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
