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
      "Rotate short, spoiler-free tips into a channel on a schedule you control.",
    tag: "Scheduled tip queue",
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
      "In the Discord Developer Portal, create an app → Bot. Copy the bot token and application (client) ID. Enable Message Content Intent if you want scam-warn.",
  },
  {
    step: 2,
    title: "Clone and install the bot package",
    detail:
      "From this repo: `cd bot && npm install`. Keep the Next.js site on Vercel; run the bot on a small VPS or Fly.io process.",
  },
  {
    step: 3,
    title: "Export env vars and register slash commands",
    detail:
      "`export DISCORD_TOKEN=… CLIENT_ID=…` (optional `GUILD_ID` for fast guild sync). Then `npm run register`.",
  },
  {
    step: 4,
    title: "Start the bot and run /setup",
    detail:
      "`npm start`, invite the bot with Manage Roles + Send Messages, then `/setup` to create Spoiler-OK. Add `/countdown set` and `/faq` as needed.",
  },
  {
    step: 5,
    title: "Toggle modules from the dashboard",
    detail:
      "Use the on-site dashboard to preview FAQ replies and module toggles. Connect Discord OAuth and Stripe when you are ready to go live.",
  },
];
