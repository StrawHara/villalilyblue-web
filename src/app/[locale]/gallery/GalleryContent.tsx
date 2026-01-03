"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  // Chambres / Bedrooms
  { src: "/images/villa_lily_blue-sxm_photo-master-bedroom.jpg", category: "bedrooms", alt: "Suite master" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-01.jpg", category: "bedrooms", alt: "Chambre 1" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-01-2.jpg", category: "bedrooms", alt: "Chambre 1 vue" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-02.jpg", category: "bedrooms", alt: "Chambre 2" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-04.jpg", category: "bedrooms", alt: "Chambre 4" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-04-2.jpeg", category: "bedrooms", alt: "Chambre 4 vue" },
  // Intérieur / Interior
  { src: "/images/villa_lily_blue-sxm_photo-living-room-01.jpg", category: "interior", alt: "Salon et salle à manger" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-01-2.jpg", category: "interior", alt: "Espace de vie" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-04.jpeg", category: "interior", alt: "Salon" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen.jpg", category: "interior", alt: "Cuisine moderne" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen-02.webp", category: "interior", alt: "Cuisine équipée" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen-03.jpg", category: "interior", alt: "Salle à manger" },
  { src: "/images/villa_lily_blue-sxm_photo-fitness-room.jpeg", category: "interior", alt: "Salle de fitness" },
  // Salles de bain / Bathrooms
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-01.jpg", category: "interior", alt: "Salle de bain 1" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-02.jpg", category: "interior", alt: "Salle de bain 2" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-03.jpeg", category: "interior", alt: "Salle de bain 3" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-04.jpeg", category: "interior", alt: "Salle de bain 4" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-05.jpeg", category: "interior", alt: "Salle de bain 5" },
  // Piscine / Pool
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-01.jpeg", category: "pool", alt: "Piscine" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-ext.jpeg", category: "pool", alt: "Piscine et terrasse" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-and-house-01.jpeg", category: "pool", alt: "Villa et piscine" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg", category: "pool", alt: "Vue aérienne" },
  // Extérieur / Exterior
  { src: "/images/villa_lily_blue-sxm_photo-outdoor-kitchen.jpeg", category: "exterior", alt: "Cuisine extérieure" },
  { src: "/images/villa_lily_blue-sxm_photo-from-sea-map.jpeg", category: "exterior", alt: "Vue depuis la mer" },
  // Vues / Views
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero.jpg", category: "views", alt: "Vue panoramique salon" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero-01.jpeg", category: "views", alt: "Vue mer" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero-02.jpeg", category: "views", alt: "Vue terrasse" },
  { src: "/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg", category: "views", alt: "Plage Anse Marcel" },
  { src: "/images/villa_lily_blue-sxm_photo-anse-marcel-beach-02.jpg", category: "views", alt: "Baie Anse Marcel" },
];

const categoryKeys = ["all", "exterior", "interior", "pool", "views", "bedrooms"] as const;

export function GalleryContent() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--secondary)] pb-12 pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("title")}</h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="sticky top-20 z-30 bg-white py-4 shadow-sm">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === key
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {t(`categories.${key}`)}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <Container>
          <motion.div
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative h-[80vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
