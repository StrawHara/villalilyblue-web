"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  { src: "/images/villa_lily_blue-sxm_photo-master-bedroom.jpg", category: "bedrooms", altKey: "masterSuite" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-01.jpg", category: "bedrooms", altKey: "bedroom1" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-01-2.jpg", category: "bedrooms", altKey: "bedroom1View" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-02.jpg", category: "bedrooms", altKey: "bedroom2" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-04.jpg", category: "bedrooms", altKey: "bedroom4" },
  { src: "/images/villa_lily_blue-sxm_photo-bedroom-04-2.jpeg", category: "bedrooms", altKey: "bedroom4View" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-01.jpg", category: "interior", altKey: "livingDining" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-01-2.jpg", category: "interior", altKey: "livingSpace" },
  { src: "/images/villa_lily_blue-sxm_photo-living-room-04.jpeg", category: "interior", altKey: "lounge" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen.jpg", category: "interior", altKey: "kitchen" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen-02.webp", category: "interior", altKey: "kitchenEquipped" },
  { src: "/images/villa_lily_blue-sxm_photo-kitchen-03.jpg", category: "interior", altKey: "dining" },
  { src: "/images/villa_lily_blue-sxm_photo-fitness-room.jpeg", category: "interior", altKey: "fitness" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-01.jpg", category: "interior", altKey: "bathroom1" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-02.jpg", category: "interior", altKey: "bathroom2" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-03.jpeg", category: "interior", altKey: "bathroom3" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-04.jpeg", category: "interior", altKey: "bathroom4" },
  { src: "/images/villa_lily_blue-sxm_photo-bathroom-05.jpeg", category: "interior", altKey: "bathroom5" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-01.jpeg", category: "pool", altKey: "pool" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-ext.jpeg", category: "pool", altKey: "poolTerrace" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-and-house-01.jpeg", category: "pool", altKey: "villaPool" },
  { src: "/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg", category: "pool", altKey: "aerialView" },
  { src: "/images/villa_lily_blue-sxm_photo-outdoor-kitchen.jpeg", category: "exterior", altKey: "outdoorKitchen" },
  { src: "/images/villa_lily_blue-sxm_photo-from-sea-map.jpeg", category: "exterior", altKey: "seaView" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero.jpg", category: "views", altKey: "panoramicLiving" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero-01.jpeg", category: "views", altKey: "oceanView" },
  { src: "/images/villa_lily_blue-sxm_photo-master-view-hero-02.jpeg", category: "views", altKey: "terraceView" },
  { src: "/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg", category: "views", altKey: "anseMarcelBeach" },
  { src: "/images/villa_lily_blue-sxm_photo-anse-marcel-beach-02.jpg", category: "views", altKey: "anseMarcelBay" },
];

const categoryKeys = ["all", "exterior", "interior", "pool", "views", "bedrooms"] as const;

export function GalleryContent() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrevious = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--secondary)] pb-12 pt-28 sm:pt-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">{t("title")}</h1>
            <p className="text-lg text-white/90 sm:text-xl">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="sticky top-16 z-30 bg-white py-3 shadow-sm sm:top-20 sm:py-4">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                  activeCategory === key
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                aria-current={activeCategory === key ? "page" : undefined}
              >
                {t(`categories.${key}`)}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 sm:py-12">
        <Container>
          <h2 className="sr-only">{t("subtitle")}</h2>
          <motion.div
            layout
            className="grid gap-2 grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
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
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={t(`alt.${image.altKey}`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={t(`alt.${filteredImages[lightboxIndex].altKey}`)}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:top-4"
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Navigation - hidden on mobile (use swipe) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 z-10 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:left-4 sm:block"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 z-10 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:right-4 sm:block"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative h-[75vh] w-full max-w-6xl sm:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={t(`alt.${filteredImages[lightboxIndex].altKey}`)}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white sm:text-base">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
