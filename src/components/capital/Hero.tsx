import { ArrowRight } from "lucide-react";
import { heroSceneImage } from "./assets";

const trust = [
  { label: "2ГИС", value: "4.9" },
  { label: "Гарантия", value: "5 лет" },
  { label: "Плёнки студии", value: "STEK / SunTek" },
] as const;

export function Hero() {
  return (
    <section id="top" className="bg-[#101115]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-14 lg:py-8">
        <div className="max-w-[40rem]">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
            Астана · премиальный детейлинг
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.65rem,6vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-white">
            Защита и
            <br />
            эстетика
            <br />
            <span className="text-[#d0b898]">премиальных</span>
            <br />
            авто в Астане
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
            Оклейка PPF, полировка и шумоизоляция для Porsche, BMW, Zeekr и др.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#booking"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
            >
              Онлайн расчет
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#works"
              className="inline-flex min-h-12 items-center justify-center px-4 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              Смотреть работы
            </a>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10">
            {trust.map((item) => (
              <div key={item.label} className="px-3 py-4 sm:px-5">
                <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-base font-medium text-white sm:text-lg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <img
            src={heroSceneImage}
            alt="Чёрный Mercedes-Benz G-Class под вывеской Capital Detailing"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
