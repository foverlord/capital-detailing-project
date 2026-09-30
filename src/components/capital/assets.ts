import hero from "@/assets/hero-gwagen.png";
import heroScene from "@/assets/hero-scene.png";
import mustang from "@/assets/gallery-mustang.jpg";
import bmw from "@/assets/gallery-bmw.jpg";
import zeekr from "@/assets/gallery-zeekr.jpg";
import hyundaiGloss from "@/assets/gallery-hyundai-gloss.jpg";
import hyundaiMatte from "@/assets/gallery-hyundai-matte.jpg";
import salon from "@/assets/gallery-salon.jpg";
import ppfHands from "@/assets/process-ppf-hands.jpg";
import ppfHood from "@/assets/process-ppf-hood.jpg";
import soundproof from "@/assets/process-soundproof.jpg";

export const heroImage = hero;
export const heroSceneImage = heroScene;

/** Existing studio photos used to fill the service cards. */
export const servicePhotos = {
  ppf: mustang,
  tint: zeekr,
  vinyl: hyundaiMatte,
  sound: soundproof,
} as const;

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
    src: salon,
    title: "KIA Sportage",
    detail: "Детейлинг салона",
    alt: "Салон KIA Sportage после детейлинга",
    tags: ["Салон"],
  },
];

export const processImages = [
  { src: ppfHands, alt: "Монтаж защитной плёнки на кузов автомобиля", caption: "Точность монтажа" },
  {
    src: ppfHood,
    alt: "Оклейка капота защитной плёнкой в Capital Detailing",
    caption: "Чистая технология",
  },
  { src: soundproof, alt: "Шумо- и виброизоляция пола салона", caption: "Comfort Mat" },
] as const;
