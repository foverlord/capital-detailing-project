import hero from "@/assets/hero-gwagen.png.asset.json";
import mustang from "@/assets/gallery-mustang.jpg.asset.json";
import bmw from "@/assets/gallery-bmw.jpg.asset.json";
import zeekr from "@/assets/gallery-zeekr.jpg.asset.json";
import hyundaiGloss from "@/assets/gallery-hyundai-gloss.jpg.asset.json";
import hyundaiMatte from "@/assets/gallery-hyundai-matte.jpg.asset.json";
import salon from "@/assets/gallery-salon.jpg.asset.json";
import ppfHands from "@/assets/process-ppf-hands.jpg.asset.json";
import ppfHood from "@/assets/process-ppf-hood.jpg.asset.json";
import soundproof from "@/assets/process-soundproof.jpg.asset.json";

export const heroImage = hero.url;

export const galleryImages = [
  { src: mustang.url, title: "Ford Mustang", detail: "Матовый винил · полный кузов" },
  { src: bmw.url, title: "BMW X5", detail: "Защитная плёнка · STEK" },
  { src: zeekr.url, title: "Zeekr 001", detail: "PPF · полный кузов" },
  { src: hyundaiGloss.url, title: "Hyundai Elantra", detail: "Детейлинг · глянцевая защита" },
  { src: hyundaiMatte.url, title: "Hyundai Grandeur", detail: "Матовый стайлинг" },
  { src: salon.url, title: "KIA Sportage", detail: "Детейлинг салона" },
] as const;

export const processImages = [
  { src: ppfHands.url, alt: "Монтаж защитной плёнки на кузов автомобиля" },
  { src: ppfHood.url, alt: "Оклейка капота защитной плёнкой в Capital Detailing" },
  { src: soundproof.url, alt: "Многослойная шумоизоляция Comfort Mat" },
] as const;