import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://mtmm2026.website";
  // WHY: Date of the last content update (September 2026 site refresh); bump when pages change so Google recrawls
  const lastModified = "2026-09-14";

  // WHY: Only list routes that exist under src/app — a 404 URL in the sitemap is reported as an error in Search Console
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
      url: `${BASE_URL}/speakers`,
      lastModified,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/committees`,
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
      url: `${BASE_URL}/sponsors`,
      lastModified,
      priority: 0.6,
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
