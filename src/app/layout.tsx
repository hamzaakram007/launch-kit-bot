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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://bot.neongulf.com";
const title = "Launch Kit Bot — Add Discord launch helpers | NeonGulf";
const description =
  "Add Launch Kit Bot to Discord: /setup spoiler roles, /faq buttons, /countdown, /tip of the day. Neutral gaming-server kit by NeonGulf. Free tier + $9/mo per server. No publisher IP.";

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
  publisher: "NeonGulf",
  keywords: [
    "Discord bot",
    "Add to Discord",
    "launch kit",
    "gaming server bot",
    "spoiler roles",
    "FAQ buttons",
    "countdown bot",
    "tip of the day",
    "Discord SaaS",
    "NeonGulf",
    "server moderation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Launch Kit Bot · NeonGulf",
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
    brand: {
      "@type": "Brand",
      name: "NeonGulf",
    },
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
        description: "Countdown + 1 FAQ + /setup",
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
