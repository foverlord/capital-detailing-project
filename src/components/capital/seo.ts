import { studio } from "./site";
import { formatKzt, minPriceThousands, serviceBounds, services } from "./pricing";

/** Plain-space version of a price (meta tags do not need non-breaking spaces). */
const plain = (value: string) => value.replace(/\u00A0/g, " ");

/** Meta description: the "from" price is taken from the pricing data. */
export const metaDescription = `Оклейка PPF, полировка, шумоизоляция в Астане. Цены от ${plain(
  formatKzt(minPriceThousands),
)}, гарантия до 5 лет.`;

/**
 * schema.org LocalBusiness with one Offer per service.
 * Low / high prices are the cheapest and the most expensive variant across all body classes.
 * Rating and phone are intentionally left out: the phone is still a placeholder and
 * the rating is not something we can confirm from the code.
 */
export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: studio.name,
    description: metaDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.addressLines[0],
      addressLocality: studio.city,
      addressCountry: "KZ",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    sameAs: [studio.gisFirmUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги и цены",
      itemListElement: services.map((service) => {
        const { low, high } = serviceBounds(service);
        return {
          "@type": "Offer",
          priceCurrency: "KZT",
          price: low * 1000,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "KZT",
            minPrice: low * 1000,
            maxPrice: high * 1000,
          },
          itemOffered: { "@type": "Service", name: service.title },
        };
      }),
    },
  };
}
