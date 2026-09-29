import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImage } from "./assets";
import { studio } from "./site";

const badges = [
  { value: studio.rating, label: studio.ratingSource },
  { value: "5 лет", label: "Гарантии" },
  { value: studio.films, label: "Плёнки студии" },
] as const;

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="Матовый Mercedes-Benz G-Class в студии Capital Detailing"
        className="absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-[64%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/35 md:bg-gradient-to-r md:from-zinc-950 md:via-zinc-950/75 md:to-zinc-950/10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-24 size-72 rounded-full bg-zinc-100/[0.06] blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-end px-4 pb-12 pt-16 md:items-center md:px-6 md:pb-16">
        <div className="max-w-xl">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-zinc-300">
            {studio.city} · премиальный детейлинг
          </p>
          <h1 className="mt-4 text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-zinc-100 sm:text-5xl md:text-[3.4rem]">
            Защита и эстетика премиальных авто в Астане
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-300">
            Оклейка PPF, полировка и шумоизоляция для Porsche, BMW, Zeekr и др.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="luxury" asChild className="min-h-12 px-6">
              <a href="#booking">
                Онлайн расчёт
                <ArrowDownRight data-icon="inline-end" />
              </a>
            </Button>
            <Button variant="glass" asChild className="min-h-12 px-6">
              <a href="#works">Смотреть работы</a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md">
            {badges.map((badge) => (
              <div key={badge.label} className="px-3 py-3 md:px-4 md:py-4">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {badge.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-100 md:text-base">
                  {badge.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
