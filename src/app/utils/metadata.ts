import { Metadata } from "next";

export function generateMetadata({ params, searchParams }: any): Metadata {
  const baseUrl = "https://mtmm2026.website";
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  const pageData: Record<string, { title: string; description: string }> = {
    "/": { title: "Modern Trends in Molecular Magnetism (MTMM)", description: "Official website of Modern Trends in Molecular Magnetism 2026 (MTMM 2026). Find event details, schedule, registration, speakers, and updates." },
    "/about": { title: "About MTMM 2026", description: "About the Modern Trends in Molecular Magnetism 2026 conference." },
    "/program": { title: "Program – MTMM 2026", description: "Schedule and program details of MTMM 2026 conference." },
    "/registration": { title: "Registration – MTMM 2026", description: "Register for the Modern Trends in Molecular Magnetism 2026 conference." },
    "/contact": { title: "Contact – MTMM 2026", description: "Contact details and inquiries for MTMM 2026 conference." },
    "/committees": { title: "Committees – MTMM 2026", description: "Organizing and scientific committees of MTMM 2026 conference." },
    "/accommodation": { title: "Accommodation – MTMM 2026", description: "Information about lodging and hotels for MTMM 2026 attendees." },
    "/importantDates": { title: "Important Dates – MTMM 2026", description: "Important deadlines and key dates for MTMM 2026 conference." },
    "/delegates": { title: "Delegates – MTMM 2026", description: "List of delegates attending MTMM 2026 conference." },
    "/sitemap.xml": { title: "Sitemap – MTMM 2026", description: "Sitemap of the MTMM 2026 conference website." },
    "/_not-found": { title: "Page Not Found – MTMM 2026", description: "The page you are looking for could not be found on MTMM 2026 website." },
  };

  const { title, description } = pageData[pathname] || pageData["/"];

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    authors: [{ name: "Yugal Raj Deka", url: "https://github.com/yugal-raj" }],
    verification: {
      google: "XSt2hBQFpBCyDOU3FCeXUsO02MxWuIPz_ED3kFXGcHM",
    },
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${pathname}`,
      siteName: "MTMM 2026",
      type: "website",
    },
  };
}