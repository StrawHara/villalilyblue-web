import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/lp/"],
      },
    ],
    sitemap: "https://villalilyblue.com/sitemap.xml",
  };
}
