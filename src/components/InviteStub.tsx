"use client";

import { useState } from "react";

const PERMISSIONS = "268445696"; // Manage Roles + Send Messages + Embed Links + Use App Commands

function buildInviteUrl(): string | null {
  const override = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL?.trim();
  if (override) return override;

  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID?.trim();
  if (!clientId || clientId === "YOUR_BOT_CLIENT_ID") return null;

  return `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(
    clientId,
  )}&scope=bot%20applications.commands&permissions=${PERMISSIONS}`;
}

export function InviteStub() {
  const inviteUrl = buildInviteUrl();
  const [copied, setCopied] = useState(false);

  function copySetupHint() {
    const hint =
      "Set NEXT_PUBLIC_DISCORD_CLIENT_ID on Vercel, then the Add to Discord button opens the real invite.";
    void navigator.clipboard.writeText(hint).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    });
  }

  if (inviteUrl) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <a
          className="btn-primary animate-pulse-glow"
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to Discord
        </a>
        <a className="btn-ghost" href="#setup">
          Setup guide
        </a>
        <a className="btn-ghost" href="#pricing">
          Pricing
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <a className="btn-primary animate-pulse-glow" href="#setup">
        Add to Discord — see setup
      </a>
      <a className="btn-ghost" href="#commands">
        Slash commands
      </a>
      <button type="button" className="btn-ghost" onClick={copySetupHint}>
        {copied ? "Hint copied" : "Copy env hint"}
      </button>
      <p className="w-full text-xs leading-relaxed text-[var(--muted)]">
        Invite opens once{" "}
        <code className="text-[var(--teal)]">NEXT_PUBLIC_DISCORD_CLIENT_ID</code> is set on
        Vercel (or paste a full{" "}
        <code className="text-[var(--teal)]">NEXT_PUBLIC_DISCORD_INVITE_URL</code>).
      </p>
    </div>
  );
}
