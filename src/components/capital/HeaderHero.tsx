import { ArrowDownRight, Menu, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { heroImage } from "./assets";

const nav = [
  ["Услуги", "#services"],
  ["Работы", "#works"],
  ["Процесс", "#process"],
  ["Контакты", "#contacts"],
] as const;

function Brand() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Capital Detailing — наверх">
      <span className="grid size-9 place-items-center border border-foreground/30 text-xs font-extrabold text-foreground transition-colors group-hover:border-primary">CD</span>
      <span className="text-[11px] font-extrabold leading-[1.05] tracking-[0.16em] text-foreground">CAPITAL<br />DETAILING</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Главное меню">
          {nav.map(([label, href]) => <a key={href} href={href} className="text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
        </nav>
        <div className="hidden md:block"><Button variant="luxury" asChild><a href="#booking">Онлайн расчёт</a></Button></div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-5 md:hidden" aria-label="Мобильное меню">
          <div className="grid gap-1">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-sm font-semibold uppercase">{label}</a>)}
            <Button variant="luxury" className="mt-4 h-12" asChild><a href="#booking" onClick={() => setOpen(false)}>Онлайн расчёт</a></Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] overflow-hidden pt-16 lg:min-h-[820px]">
      <img src={heroImage} alt="Матовый Mercedes-Benz G-Class в студии Capital Detailing" className="absolute inset-0 h-full w-full object-cover object-[62%_center] lg:object-center" />
      <div className="hero-shade absolute inset-0" />
      <div className="relative mx-auto flex min-h-[696px] max-w-[1440px] items-end px-5 pb-10 pt-28 lg:min-h-[756px] lg:items-center lg:px-10 lg:pb-0">
        <div className="max-w-[760px] animate-enter">
          <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"><span className="h-px w-10 bg-primary" /> Astana · Premium car care</div>
          <h1 className="max-w-[730px] text-[clamp(2.5rem,6.5vw,5.8rem)] font-extrabold uppercase leading-[0.9] text-foreground">Защита и эстетика премиальных авто <span className="text-primary">в Астане</span></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 lg:text-lg">Оклейка бронеплёнкой, шумоизоляция и защитные сетки для Porsche, BMW, Zeekr и автомобилей, к которым относятся с особым вниманием.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="luxury" size="lg" className="h-13" asChild><a href="#booking">Записаться на расчёт <ArrowDownRight /></a></Button>
            <Button variant="glass" size="lg" className="h-13" asChild><a href="#works">Смотреть работы</a></Button>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/15 bg-white/[0.03] backdrop-blur-md">
            <div className="py-4 pr-3"><div className="flex items-center gap-1 text-sm font-bold"><Star className="size-3.5 fill-primary text-primary" />4.9</div><p className="mt-1 text-[10px] uppercase text-muted-foreground">128+ отзывов · 2ГИС</p></div>
            <div className="border-x border-white/15 px-3 py-4"><div className="flex items-center gap-1 text-sm font-bold"><ShieldCheck className="size-3.5 text-primary" />5 лет</div><p className="mt-1 text-[10px] uppercase text-muted-foreground">Гарантия на работы</p></div>
            <div className="py-4 pl-3"><div className="text-sm font-bold">Tytan PPF</div><p className="mt-1 text-[10px] uppercase text-muted-foreground">Полиуретановые плёнки</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}