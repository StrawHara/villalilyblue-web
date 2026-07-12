import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/lp/", ...routing.locales.map((locale) => `/${locale}/lp/`)],
      },
    ],
    sitemap: "https://villalilyblue.com/sitemap.xml",
  };
}
