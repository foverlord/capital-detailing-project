import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/capital/LandingPage";
import { buildStructuredData, metaDescription } from "@/components/capital/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Detailing — премиальный детейлинг в Астане" },
      {
        name: "description",
        content: metaDescription,
      },
      { property: "og:title", content: "Capital Detailing Astana" },
      {
        property: "og:description",
        content: "Защита и эстетика премиальных автомобилей в Астане.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildStructuredData()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
