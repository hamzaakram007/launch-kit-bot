import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://launch-kit-bot.vercel.app";
  return [
    {
      url: base,
      lastModified: new Date("2026-11-18"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
