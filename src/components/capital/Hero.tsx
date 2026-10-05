import { ArrowRight, Shield, Star } from "lucide-react";
import { heroCarImage, heroLightsImage } from "./assets";
import { formatFrom, minPriceThousands } from "./pricing";

const starFills = ["w-full", "w-full", "w-full", "w-full", "w-[90%]"] as const;

function RatingStars() {
  return (
    <span className="inline-flex shrink-0 gap-px" aria-hidden="true">
      {starFills.map((fill, index) => (
        <span key={index} className="relative size-2.5 sm:size-3">
          <Star className="size-2.5 text-[#d0b898]/35 sm:size-3" strokeWidth={1.5} />
          <span className={`absolute inset-y-0 left-0 overflow-hidden ${fill}`}>
            <Star className="size-2.5 fill-[#d0b898] text-[#d0b898] sm:size-3" strokeWidth={1.5} />
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="bg-[#101115]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 sm:px-8 lg:grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-start lg:gap-6 lg:px-14 lg:py-8">
        <div className="contents lg:block lg:min-w-0 lg:pt-32">
          <div className="@container order-1 min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
              Астана · студия защиты авто
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.05rem,12cqw,5.15rem)] font-black uppercase leading-[0.86] tracking-[-0.045em] text-white">
              Защита и
              <br />
              <span className="text-[#d0b898]">эстетика</span>
              <br />
              авто в Астане
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
              Оклейка PPF, полировка и шумоизоляция — от городских седанов до кроссоверов и
              спорткаров
            </p>
          </div>
          <div className="order-3 min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
              <a
                href="#booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
              >
                Онлайн расчёт
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#works"
                className="inline-flex min-h-12 items-center justify-center px-4 text-sm text-zinc-300 transition-colors hover:text-white"
              >
                Смотреть работы
              </a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <div className="bg-[#101115] px-3 py-4 sm:px-4">
                <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  2ГИС
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-base font-medium text-white sm:text-lg">
                  <span>4.9</span>
                  <RatingStars />
                </dd>
              </div>
              <div className="bg-[#101115] px-3 py-4 sm:px-4">
                <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Гарантия
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-base font-medium text-white sm:text-lg">
                  <Shield className="size-4 shrink-0 text-[#d0b898]" strokeWidth={1.5} aria-hidden />
                  <span>5 лет</span>
                </dd>
              </div>
              <div className="bg-[#101115] px-3 py-4 sm:px-4">
                <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Плёнки студии
                </dt>
                <dd className="mt-1 text-base font-medium text-white sm:text-lg">STEK / SunTek</dd>
              </div>
              <div className="relative bg-[#101115] px-3 py-4 transition-colors focus-within:bg-white/[0.04] hover:bg-white/[0.04] sm:px-4">
                <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Цены
                </dt>
                <dd className="mt-1 text-base font-medium whitespace-nowrap text-white sm:text-lg">
                  {/* The link covers the whole cell and leads to the services block with prices. */}
                  <a
                    href="#services"
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-[#d0b898]"
                  >
                    {formatFrom(minPriceThousands)}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="order-2 flex min-w-0 flex-col items-center bg-[#101115] lg:order-none">
          <div className="w-full bg-[#101115]">
            <img
              src={heroLightsImage}
              alt="Четыре прожектора над автомобилем"
              className="h-auto w-full"
            />
          </div>
          <div className="mt-2 w-full bg-[#101115]">
            <img
              src={heroCarImage}
              alt="Чёрный Mercedes-Benz G-Class"
              className="h-auto w-[107%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
