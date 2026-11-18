"use client";

import { useState } from "react";
import { faqSeed } from "@/data/features";

const toggles = [
  { id: "roles", label: "Spoiler roles", defaultOn: true },
  { id: "faq", label: "FAQ buttons", defaultOn: true },
  { id: "tips", label: "Tip of the day", defaultOn: false },
  { id: "countdown", label: "Countdown", defaultOn: true },
  { id: "scam", label: "Scam-link warn", defaultOn: false },
] as const;

export function DashboardPreview() {
  const [on, setOn] = useState<Record<string, boolean>>(
    Object.fromEntries(toggles.map((t) => [t.id, t.defaultOn])),
  );
  const [activeFaq, setActiveFaq] = useState(0);
  const [portalNote, setPortalNote] = useState<string | null>(null);

  function toggle(id: string) {
    setOn((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openPortalStub() {
    setPortalNote(
      "Stripe customer portal is stubbed for this MVP. Wire STRIPE_CUSTOMER_PORTAL_URL later.",
    );
  }

  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3 sm:px-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--teal)]">
            Dashboard preview
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">Local mock — no live Discord write yet</p>
        </div>
        <button
          type="button"
          onClick={openPortalStub}
          className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--cyan)] transition hover:border-[var(--cyan)]/40"
        >
          Billing portal
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-[var(--line)] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="text-sm font-medium text-[var(--foam)]">Modules</p>
          <ul className="mt-3 space-y-2">
            {toggles.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-left transition hover:border-[var(--line)] hover:bg-white/[0.03]"
                  aria-pressed={on[t.id]}
                >
                  <span className="text-sm text-[var(--foam)]">{t.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                      on[t.id]
                        ? "bg-[var(--teal)]/15 text-[var(--teal)]"
                        : "bg-white/5 text-[var(--muted)]"
                    }`}
                  >
                    {on[t.id] ? "On" : "Off"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {portalNote ? (
            <p className="mt-4 rounded-lg border border-[var(--sand)]/30 bg-[var(--sand)]/10 px-3 py-2 text-xs leading-relaxed text-[var(--sand)]">
              {portalNote}
            </p>
          ) : null}
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-sm font-medium text-[var(--foam)]">FAQ button replies</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {faqSeed.map((faq, i) => (
              <button
                key={faq.label}
                type="button"
                onClick={() => setActiveFaq(i)}
                className={`rounded-md border px-2.5 py-1.5 text-xs transition ${
                  activeFaq === i
                    ? "border-[var(--teal)]/50 bg-[var(--teal)]/10 text-[var(--teal)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--foam)]"
                }`}
              >
                {faq.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-[var(--line)] bg-[#061821]/80 p-4">
            <p className="text-[11px] uppercase tracking-wider text-[var(--muted)]">Bot reply</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--foam)]">
              {faqSeed[activeFaq]?.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
