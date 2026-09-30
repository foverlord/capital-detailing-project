import { Clock, Paintbrush, Shield, SunMedium, Volume2, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { servicePhotos } from "./assets";
import { FadeIn } from "./FadeIn";
import { Accent, SectionHeading } from "./SectionHeading";

type ServiceCard = {
  title: string;
  copy: string;
  duration: string;
  icon: LucideIcon;
  photo: string;
  className: string;
};

const services: readonly ServiceCard[] = [
  {
    title: "Бронеплёнка PPF",
    copy: "Полиуретан STEK и SunTek на зоны риска или весь кузов. Лекала по модели, кромки закрываем — лак остаётся заводским.",
    duration: "2–5 дней",
    icon: Shield,
    photo: servicePhotos.ppf,
    className: "min-h-[28rem] md:col-span-4 md:row-span-2 md:min-h-full",
  },
  {
    title: "Премиум тонировка",
    copy: "Температура и приватность в салоне без потери обзора. Плёнку подбираем под стекло.",
    duration: "1 день",
    icon: SunMedium,
    photo: servicePhotos.tint,
    className: "min-h-72 md:col-span-2",
  },
  {
    title: "Виниловый стайлинг",
    copy: "Глянец, сатин или мат. Стыки держим по кузовным линиям, без случайных швов на виду.",
    duration: "3–5 дней",
    icon: Paintbrush,
    photo: servicePhotos.vinyl,
    className: "min-h-72 md:col-span-2",
  },
  {
    title: "Шумоизоляция Comfort Mat",
    copy: "Вибро- и шумоизоляция салона материалами Comfort Mat. В дороге тише, двери звучат плотнее.",
    duration: "1–2 дня",
    icon: Volume2,
    photo: servicePhotos.sound,
    className: "min-h-72 md:col-span-6",
  },
];

export function ServicesBento() {
  return (
    <section id="services">
      <FadeIn className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
        <SectionHeading
          eyebrow="Услуги"
          title={
            <>
              Четыре <Accent>направления</Accent> студии
            </>
          }
          copy="Срок на карточке — ориентир по типовой работе. Точные дни и состав называем после осмотра, без фиксированного прайса на сайте."
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`group relative isolate overflow-hidden rounded-xl border border-zinc-800/80 transition duration-300 hover:-translate-y-1 hover:border-zinc-700 ${service.className}`}
              >
                <img
                  src={service.photo}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/20"
                />
                <div className="relative flex h-full min-h-[inherit] flex-col justify-between gap-8 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-lg border border-zinc-700/80 bg-zinc-950/50 text-zinc-100 backdrop-blur-md [&_svg]:size-5">
                      <Icon />
                    </span>
                    <Badge
                      variant="outline"
                      className="gap-1.5 border-zinc-600 bg-zinc-950/60 px-2.5 py-1 text-zinc-100 [&_svg]:size-3.5"
                    >
                      <Clock />
                      {service.duration}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="max-w-prose text-sm leading-6 text-zinc-300">{service.copy}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
