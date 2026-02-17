import { useLocale, useTranslations } from "next-intl";

export function JsonLd() {
  const locale = useLocale();
  const t = useTranslations("reviews");
  const tContact = useTranslations("contact");

  const description =
    locale === "fr"
      ? "Villa de luxe avec vue mer à Anse Marcel, Saint Martin. Piscine privée chauffée, 4 chambres, 5 salles de bain, 250 m²."
      : locale === "es"
        ? "Villa de lujo con vista al mar en Anse Marcel, Saint Martin. Piscina privada climatizada, 4 habitaciones, 5 baños, 250 m²."
        : "Luxury sea view villa in Anse Marcel, Saint Martin. Heated private pool, 4 bedrooms, 5 bathrooms, 2,700 sq ft.";

  const lodgingBusiness = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villa Lily Blue",
    description,
    url: "https://villalilyblue.com",
    email: "contact@villalilyblue.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anse Marcel",
      addressRegion: "Saint Martin",
      postalCode: "97150",
      addressCountry: "MF",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.1097,
      longitude: -63.0319,
    },
    image: [
      "https://villalilyblue.com/images/og-image.jpg",
      "https://villalilyblue.com/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg",
      "https://villalilyblue.com/images/villa_lily_blue-sxm_photo-swimming-pool-and-house-01.jpeg",
      "https://villalilyblue.com/images/villa_lily_blue-sxm_photo-master-view-hero.jpg",
    ],
    priceRange: "$$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Heated Private Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Fitness Room", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Kitchen", value: true },
    ],
    numberOfRooms: 4,
    petsAllowed: false,
    checkinTime: "16:00",
    checkoutTime: "11:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: "15",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Marie-Claire" },
        datePublished: "2024-12",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review1"),
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Thomas" },
        datePublished: "2024-11",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review2"),
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sophie & Laurent" },
        datePublished: "2024-10",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review3"),
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jean-Pierre" },
        datePublished: "2024-09",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review4"),
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Caroline" },
        datePublished: "2024-08",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review5"),
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Michel & Anne" },
        datePublished: "2024-07",
        reviewRating: { "@type": "Rating", ratingValue: "5" },
        reviewBody: t("review6"),
      },
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Villa Lily Blue",
        item: `https://villalilyblue.com/${locale}`,
      },
    ],
  };

  const faqItems = tContact.raw("faq.items") as Array<{ question: string; answer: string }>;
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
