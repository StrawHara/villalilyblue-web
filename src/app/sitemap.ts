import { MetadataRoute } from "next";

const baseUrl = "https://villalilyblue.com";

// Real per-page last modified dates
const lastModDates: Record<string, string> = {
  "": "2026-03-08",
  "/villa": "2026-02-15",
  "/amenities": "2026-02-15",
  "/gallery": "2026-01-20",
  "/location": "2026-01-10",
  "/services": "2026-01-10",
  "/contact": "2026-01-10",
  "/anse-marcel": "2026-01-10",
  "/saint-martin": "2026-01-10",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en", "es"];
  const routes = Object.keys(lastModDates);

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(lastModDates[route]),
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${route}`,
            en: `${baseUrl}/en${route}`,
            es: `${baseUrl}/es${route}`,
            "x-default": `${baseUrl}/fr${route}`,
          },
        },
      });
    }
  }

  return sitemap;
}
