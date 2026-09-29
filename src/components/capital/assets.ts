import hero from "@/assets/hero-gwagen.png";
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

export const galleryImages = [
  { src: mustang, title: "Ford Mustang", detail: "Матовая PPF · полный кузов" },
  { src: bmw, title: "BMW X5", detail: "Защитная плёнка · PPF" },
  { src: zeekr, title: "Zeekr 001", detail: "PPF · полный кузов" },
  { src: hyundaiGloss, title: "Hyundai Elantra", detail: "Детейлинг · глянцевая защита" },
  { src: hyundaiMatte, title: "Hyundai Grandeur", detail: "Матовая защита кузова" },
  { src: salon, title: "KIA Sportage", detail: "Детейлинг салона" },
] as const;

export const processImages = [
  { src: ppfHands, alt: "Монтаж защитной плёнки на кузов автомобиля" },
  { src: ppfHood, alt: "Оклейка капота защитной плёнкой в Capital Detailing" },
  { src: soundproof, alt: "Шумо- и виброизоляция пола салона" },
] as const;
