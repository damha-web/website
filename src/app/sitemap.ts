import { MetadataRoute } from "next";
import { PORTFOLIO_PREVIEWS } from "@/lib/portfolio-preview";

const BASE_URL = "https://damha.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioEntries = PORTFOLIO_PREVIEWS.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...portfolioEntries,
  ];
}
