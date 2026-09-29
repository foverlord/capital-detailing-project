import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/capital/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Detailing — премиальный детейлинг в Астане" },
      {
        name: "description",
        content:
          "Оклейка PPF, полировка и шумоизоляция премиальных авто в Астане. Capital Detailing, ул. Бухар жырау, 36н.",
      },
      { property: "og:title", content: "Capital Detailing Astana" },
      {
        property: "og:description",
        content: "Защита и эстетика премиальных автомобилей в Астане.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
