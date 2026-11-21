export type Feature = {
  id: string;
  title: string;
  blurb: string;
  tag: string;
};

export const features: Feature[] = [
  {
    id: "spoiler-roles",
    title: "Spoiler roles",
    blurb:
      "One /setup command creates a spoiler-safe role and channel gate so early players stay unspoiled.",
    tag: "Role + channel gates",
  },
  {
    id: "faq-buttons",
    title: "FAQ buttons",
    blurb:
      "Owner-written answers as Discord buttons — console launch FAQ without sticky-message chaos.",
    tag: "Up to 5 FAQ replies",
  },
  {
    id: "tip-of-day",
    title: "Tip of the day",
    blurb:
      "Rotate short, spoiler-free tips with /tip show — mods can /tip add their own lines.",
    tag: "/tip show · /tip add",
  },
  {
    id: "countdown",
    title: "Launch countdown",
    blurb:
      "Pin a live countdown to any date you set — free tier includes countdown + one FAQ.",
    tag: "/countdown set",
  },
  {
    id: "scam-warn",
    title: "Scam-link warn",
    blurb:
      "Optional hook that flags suspicious paste links with a soft warning — educational, not antivirus.",
    tag: "Heuristic link warn",
  },
  {
    id: "dashboard",
    title: "Simple dashboard",
    blurb:
      "Invite the bot, paste FAQ text, toggle modules. Manage server seats from the billing portal.",
    tag: "Web config panel",
  },
];

export const faqSeed = [
  {
    label: "Which consoles?",
    answer:
      "This server is for console players. Check the pinned channel for platform channels and role self-assign.",
  },
  {
    label: "Spoiler policy",
    answer:
      "Keep story talk in spoiler-tagged channels. Grab the Spoiler-OK role only when you are ready.",
  },
  {
    label: "Buy only official",
    answer:
      "Only buy from official storefronts. Never run random “PC installer” links for console titles.",
  },
  {
    label: "Tip of the day",
    answer:
      "Tips rotate daily in #tips — short, spoiler-free, and written by your mods.",
  },
  {
    label: "Need help?",
    answer:
      "Ping @mods in #support. Do not DM strangers offering “free codes” or early access.",
  },
];

export const pricing = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "Stand up a launch night channel with the basics. No card required.",
    perks: [
      "Countdown module",
      "1 FAQ button",
      "Invite + /setup spoiler role",
      "Community Discord only (1 server)",
    ],
    notIncluded: [
      "Extra FAQ buttons",
      "Tip-of-day rotator",
      "Scam-link warn",
      "Billing portal",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    id: "server",
    name: "Server seat",
    price: "$9",
    period: "/mo per Discord server",
    priceNote: "Typical range $5–$20/mo — $9 is the default seat price.",
    blurb:
      "Billed per Discord server you connect. Cancel anytime from the Stripe customer portal.",
    perks: [
      "Everything in Free",
      "Spoiler roles + channel gates",
      "Up to 5 FAQ buttons",
      "Tip-of-day + scam-warn modules",
      "Stripe customer portal",
    ],
    notIncluded: [],
    cta: "Unlock server seat",
    featured: true,
  },
];

export const setupSteps = [
  {
    step: 1,
    title: "Create a Discord application",
    detail:
      "Discord Developer Portal → New Application → Bot. Copy the bot token and Application ID (CLIENT_ID). Enable Message Content Intent only if you want scam-warn.",
  },
  {
    step: 2,
    title: "Host the bot process (not Vercel)",
    detail:
      "Vercel hosts this landing page only. Run `cd bot && npm install` on a small VPS or Fly.io. Put secrets in the host env — never in git.",
  },
  {
    step: 3,
    title: "Set bot env vars and register commands",
    detail:
      "Required: DISCORD_TOKEN, CLIENT_ID. Optional: GUILD_ID (fast guild sync), SCAM_WARN_ENABLED, FAQ_MAX, COMMAND_COOLDOWN_SECONDS. Then `npm run register`.",
  },
  {
    step: 4,
    title: "Invite, start, run /setup",
    detail:
      "`npm start`, invite with Manage Roles + Send Messages + Use Application Commands, then `/setup` → `/countdown set` → `/faq` → `/tip show`.",
  },
  {
    step: 5,
    title: "Wire the landing invite button",
    detail:
      "On Vercel set NEXT_PUBLIC_DISCORD_CLIENT_ID (same as CLIENT_ID) so “Add to Discord” opens the real OAuth link. Optional: NEXT_PUBLIC_DISCORD_INVITE_URL.",
  },
];
