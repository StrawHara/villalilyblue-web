import type { MetadataRoute } from "next";
import { BRAND_COLOR, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Villa de luxe avec vue mer à Anse Marcel, Saint Martin — Luxury sea-view villa rental",
    // "/" laisse le middleware next-intl rediriger vers la locale du visiteur
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: BRAND_COLOR,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
