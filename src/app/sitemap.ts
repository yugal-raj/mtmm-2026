import { MetadataRoute } from "next";

const BASE_URL = "https://mtmm2026.vercel.app";

const lastModified = new Date("2026-01-01"); // update ONLY when content truly changes

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/program`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/committees`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/delegates`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/importantDates`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/registration`,
      lastModified,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/accommodation`,
      lastModified,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      priority: 0.5,
    },
  ];
}