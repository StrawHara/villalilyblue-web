import { useLocale } from "next-intl";

export function JsonLd() {
  const locale = useLocale();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villa Lily Blue",
    description:
      locale === "fr"
        ? "Villa de luxe avec vue mer à Anse Marcel, Saint Martin. Piscine privée, 4 chambres."
        : "Luxury sea view villa in Anse Marcel, Saint Martin. Private pool, 4 bedrooms.",
    url: "https://villalilyblue.com",
    telephone: "+590 690 XX XX XX",
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
      "https://villalilyblue.com/images/hero.jpg",
      "https://villalilyblue.com/images/gallery/pool-1.jpg",
      "https://villalilyblue.com/images/gallery/view-1.jpg",
    ],
    priceRange: "$$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Pool" },
      { "@type": "LocationFeatureSpecification", name: "Sea View" },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning" },
      { "@type": "LocationFeatureSpecification", name: "WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Parking" },
    ],
    numberOfRooms: 4,
    petsAllowed: false,
    checkinTime: "16:00",
    checkoutTime: "11:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
