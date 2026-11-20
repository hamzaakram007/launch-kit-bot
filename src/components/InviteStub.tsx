"use client";

import { useState } from "react";

export function InviteStub() {
  const [copied, setCopied] = useState(false);

  function handleInvite() {
    const inviteUrl =
      "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&scope=bot%20applications.commands&permissions=268445696";
    void navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn-primary animate-pulse-glow" onClick={handleInvite}>
        {copied ? "Invite URL copied" : "Invite bot to Discord"}
      </button>
      <a className="btn-ghost" href="#pricing">
        See pricing
      </a>
    </div>
  );
}
