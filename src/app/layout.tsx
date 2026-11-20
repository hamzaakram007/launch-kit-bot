import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://bot.neongulf.com";
const title = "Launch Kit Bot — Neutral Discord launch-server kit";
const description =
  "NeonGulf Discord launch kit for gaming servers: spoiler roles, FAQ buttons, tip-of-day, countdown, and scam-link warnings. Free tier + $9/mo per server. Independent — no publisher IP.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Launch Kit Bot",
  },
  description,
  applicationName: "Launch Kit Bot",
  authors: [{ name: "Hamza Akram", url: "https://github.com/hamzaakram007" }],
  creator: "Hamza Akram",
  keywords: [
    "Discord bot",
    "launch kit",
    "gaming server",
    "spoiler roles",
    "FAQ buttons",
    "countdown bot",
    "scam link warning",
    "Discord SaaS",
    "server moderation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Launch Kit Bot",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Launch Kit Bot",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Discord",
    description,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Hamza Akram",
      url: "https://github.com/hamzaakram007",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "Countdown + 1 FAQ button",
      },
      {
        "@type": "Offer",
        name: "Server seat",
        price: "9",
        priceCurrency: "USD",
        description: "Per Discord server / month — full module kit",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
