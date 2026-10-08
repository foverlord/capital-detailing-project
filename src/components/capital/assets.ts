import heroLights from "@/assets/hero-spotlights.png";
import heroCar from "@/assets/hero-car.png";
import mustang from "@/assets/gallery-mustang.jpg";
import bmw from "@/assets/gallery-bmw.jpg";
import zeekr from "@/assets/gallery-zeekr.jpg";
import hyundaiGloss from "@/assets/gallery-hyundai-gloss.jpg";
import hyundaiMatte from "@/assets/gallery-hyundai-matte.jpg";
import hilux from "@/assets/gallery-hilux.png";
import camry from "@/assets/gallery-camry.png";
import palisade from "@/assets/gallery-palisade.png";
import bmwE38 from "@/assets/gallery-bmw-e38.png";
export const heroLightsImage = heroLights;
export const heroCarImage = heroCar;

export type GalleryWork = {
  src: string;
  title: string;
  detail: string;
  alt: string;
  tags: readonly string[];
};

/** Labels and tags come from existing gallery copy. No invented models. */
export const galleryImages: readonly GalleryWork[] = [
  {
    src: mustang,
    title: "Ford Mustang",
    detail: "Матовая PPF · полный кузов",
    alt: "Ford Mustang в матовой защитной плёнке, полный кузов",
    tags: ["Full PPF", "Матовая PPF"],
  },
  {
    src: bmw,
    title: "BMW X5",
    detail: "Защитная плёнка · PPF",
    alt: "BMW X5 после оклейки защитной плёнкой",
    tags: ["PPF"],
  },
  {
    src: zeekr,
    title: "Zeekr 001",
    detail: "PPF · полный кузов",
    alt: "Zeekr 001 в полной оклейке PPF",
    tags: ["Full PPF"],
  },
  {
    src: hyundaiGloss,
    title: "Hyundai Elantra",
    detail: "Детейлинг · глянцевая защита",
    alt: "Hyundai Elantra с глянцевой защитой кузова",
    tags: ["Глянцевая защита"],
  },
  {
    src: hyundaiMatte,
    title: "Hyundai Grandeur",
    detail: "Матовая защита кузова",
    alt: "Hyundai Grandeur в матовой защите кузова",
    tags: ["Матовая защита"],
  },
  {
    src: hilux,
    title: "Toyota Hilux",
    detail: "Полировка · глянцевая защита",
    alt: "Toyota Hilux после полировки и глянцевой защиты кузова",
    tags: ["Полировка", "Глянец"],
  },
  {
    src: camry,
    title: "Toyota Camry",
    detail: "Керамика · глубокий глянец",
    alt: "Чёрная Toyota Camry с керамической защитой в студии Capital Detailing",
    tags: ["Керамика", "Глянец"],
  },
  {
    src: palisade,
    title: "Hyundai Palisade",
    detail: "PPF · полный кузов",
    alt: "Белый Hyundai Palisade после полной оклейки защитной плёнкой",
    tags: ["Full PPF"],
  },
  {
    src: bmwE38,
    title: "BMW 7 Series",
    detail: "Восстановление лака · полировка",
    alt: "Серебристый BMW 7 Series после восстановительной полировки",
    tags: ["Полировка", "Лак"],
  },
];
