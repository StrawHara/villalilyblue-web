import { Hero, Highlights, Welcome, GalleryPreview, CallToAction } from "@/components/sections";
import { Reviews } from "@/components/sections/Reviews";
import { JsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Welcome />
      <Highlights />
      <GalleryPreview />
      <Reviews />
      <CallToAction />
    </>
  );
}
