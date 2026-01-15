import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mtmm2026.vercel.app/",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://mtmm2026.vercel.app/about",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://mtmm2026.vercel.app/importantDates",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://mtmm2026.vercel.app/registration",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://mtmm2026.vercel.app/accommodation",
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: "https://mtmm2026.vercel.app/contact",
      lastModified: new Date(),
      priority: 0.6,
    },
  ];
}