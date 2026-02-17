"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Marie-Claire",
    location: "Paris, France",
    date: "2024-12",
    rating: 5,
    textKey: "review1",
  },
  {
    id: 2,
    author: "Thomas",
    location: "Lyon, France",
    date: "2024-11",
    rating: 5,
    textKey: "review2",
  },
  {
    id: 3,
    author: "Sophie & Laurent",
    location: "Bruxelles, Belgique",
    date: "2024-10",
    rating: 5,
    textKey: "review3",
  },
  {
    id: 4,
    author: "Jean-Pierre",
    location: "Genève, Suisse",
    date: "2024-09",
    rating: 5,
    textKey: "review4",
  },
  {
    id: 5,
    author: "Caroline",
    location: "Bordeaux, France",
    date: "2024-08",
    rating: 5,
    textKey: "review5",
  },
  {
    id: 6,
    author: "Michel & Anne",
    location: "Montréal, Canada",
    date: "2024-07",
    rating: 5,
    textKey: "review6",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string, locale: string) {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

interface ReviewsProps {
  showAll?: boolean;
  locale?: string;
}

export function Reviews({ showAll = false, locale = "fr" }: ReviewsProps) {
  const t = useTranslations("reviews");
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--secondary)] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">{t("subtitle")}</p>

          {/* Rating Summary */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-[var(--secondary)]">5.0</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{t("basedOn", { count: 15 })}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl bg-white p-6 shadow-lg"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-[var(--primary)]/20" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-lg font-semibold text-[var(--primary)]">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--secondary)]">
                    {review.author}
                  </h4>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>

              <StarRating rating={review.rating} />

              <p className="mt-4 text-gray-600 leading-relaxed">
                {t(review.textKey)}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                {formatDate(review.date, locale)}
              </p>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a
              href="https://www.airbnb.fr/rooms/1313868121596013747"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--primary)] px-6 py-3 font-medium text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white"
            >
              {t("viewAllOnAirbnb")}
            </a>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
