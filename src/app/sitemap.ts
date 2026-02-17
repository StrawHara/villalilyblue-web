import { MetadataRoute } from "next";

const baseUrl = "https://villalilyblue.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en", "es"];
  const routes = [
    "",
    "/villa",
    "/amenities",
    "/gallery",
    "/rates",
    "/location",
    "/services",
    "/contact",
    "/anse-marcel",
    "/saint-martin",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${route}`,
            en: `${baseUrl}/en${route}`,
            es: `${baseUrl}/es${route}`,
          },
        },
      });
    }
  }

  return sitemap;
}
