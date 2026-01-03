"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";

const previewImages = [
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg", alt: "Vue extérieure" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-01.jpeg", alt: "Piscine" },
  { src: "/images/villa_lily_blue-sxm_photo-master-bedroom.jpg", alt: "Chambre" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero-01.jpeg", alt: "Vue mer" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-01.jpg", alt: "Salon" },
  { src: "/images/villa_lily_blue-sxm_photo-outdoor-kitchen.jpeg", alt: "Terrasse" },
];

export function GalleryPreview() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--secondary)] md:text-4xl">
            {t("galleryPreview")}
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/gallery">
            <Button size="lg">{tCommon("viewGallery")}</Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
