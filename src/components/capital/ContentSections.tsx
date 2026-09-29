import { ArrowUpRight, Grid3x3, Layers, Maximize2, Monitor, ScanLine, Shield, Star, Volume2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { galleryImages, processImages } from "./assets";

const services = [
  { icon: Shield, n: "01", title: "Полный кузов PPF", copy: "Полная оклейка кузова глянцевыми и матовыми или сатиновыми полиуретановыми плёнками, например Tytan PPF. Точные лекала и закрытые края." },
  { icon: Layers, n: "02", title: "LUX · зоны риска", copy: "Пакеты на уязвимые зоны: капот, передний бампер, крылья, фары, стойки, полоса на крышу, зеркала, кантики и зоны под ручками." },
  { icon: Monitor, n: "03", title: "Защита салона", copy: "Плёнка на экраны и мониторы, пластик, дверные карты и пороги — салон остаётся без царапин в ежедневной эксплуатации." },
  { icon: ScanLine, n: "04", title: "Лобовое стекло", copy: "Защита лобового стекла от сколов и пескоструя." },
  { icon: Volume2, n: "05", title: "Шумоизоляция", copy: "Комплексная или поэлементная шумо- и виброизоляция салона." },
  { icon: Grid3x3, n: "06", title: "Сетка в радиатор", copy: "Установка защитной сетки в радиатор от камней и дорожного мусора." },
] as const;

function SectionIntro({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_0.62fr] lg:items-end"><div><p className="section-kicker">{kicker}</p><h2 className="section-title">{title}</h2></div>{copy && <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">{copy}</p>}</div>;
}

export function Services() {
  return <section id="services" className="section-shell"><SectionIntro kicker="01 · Экспертиза" title="Технологии защиты без компромиссов" copy="Оклейка бронеплёнкой, шумоизоляция и защитные сетки — под сценарий эксплуатации и состояние автомобиля." /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{services.map(({ icon: Icon, n, title, copy }) => <article key={title} className="group border border-white/10 bg-white/[0.03] backdrop-blur-md min-h-72 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"><div className="flex items-center justify-between"><Icon className="size-6 text-primary" /><span className="font-mono text-xs text-muted-foreground">{n}</span></div><h3 className="mt-16 text-xl font-bold uppercase leading-tight">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p><div className="mt-6 h-px w-10 bg-primary/50 transition-all group-hover:w-full" /></article>)}</div></section>;
}

export function Works() {
  const [active, setActive] = useState<(typeof galleryImages)[number] | null>(null);
  return <section id="works" className="section-shell pt-8"><SectionIntro kicker="02 · Работы" title="Финиш говорит за нас" copy="Только реальные автомобили из нашей студии в Астане. Никаких постановочных стоковых кадров." /><div className="gallery-grid">{galleryImages.map((image, index) => <button type="button" key={image.title} onClick={() => setActive(image)} className={`group relative overflow-hidden text-left ${index === 0 ? "gallery-feature" : ""}`} aria-label={`Открыть фото: ${image.title}`}><img src={image.src} alt={`${image.title} — ${image.detail}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /><div className="gallery-scrim absolute inset-0" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><div><p className="text-lg font-bold uppercase">{image.title}</p><p className="mt-1 text-xs text-foreground/60">{image.detail}</p></div><span className="grid size-9 place-items-center border border-foreground/20 bg-background/50 backdrop-blur"><Maximize2 className="size-4" /></span></div></button>)}</div>{active && <div className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4" role="dialog" aria-modal="true" aria-label={active.title}><img src={active.src} alt={`${active.title} — ${active.detail}`} className="max-h-[88vh] max-w-full object-contain" /><Button variant="glass" size="icon" className="absolute right-5 top-5" onClick={() => setActive(null)} aria-label="Закрыть фото"><X /></Button><div className="absolute bottom-5 left-5"><p className="font-bold uppercase">{active.title}</p><p className="text-xs text-muted-foreground">{active.detail}</p></div></div>}</section>;
}

export function Process() {
  const steps = [{ n: "01", title: "Заявка", copy: "Фиксируем автомобиль, задачу и желаемый результат." }, { n: "02", title: "Осмотр / смета", copy: "Осматриваем кузов и согласовываем материалы, сроки и точную стоимость." }, { n: "03", title: "Выдача", copy: "Проверяем каждый элемент, передаём рекомендации и гарантию." }];
  return <section id="process" className="section-shell"><SectionIntro kicker="03 · Процесс" title="Контроль на каждом этапе" copy="Работаем в чистой студии, фиксируем зоны обработки и не торопим технологический процесс." /><div className="grid gap-3 lg:grid-cols-3">{steps.map((step) => <div key={step.n} className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"><span className="font-mono text-sm text-primary">{step.n}</span><h3 className="mt-8 text-xl font-bold uppercase">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.copy}</p></div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-3">{processImages.map((image, index) => <figure key={image.alt} className={`relative overflow-hidden ${index === 1 ? "md:-translate-y-5" : ""}`}><img src={image.src} alt={image.alt} className="aspect-[4/5] h-full w-full object-cover" /><figcaption className="absolute bottom-0 left-0 bg-white/[0.03] backdrop-blur-md border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase text-foreground">{["Точность монтажа", "Чистая технология", "Многослойная защита"][index]}</figcaption></figure>)}</div></section>;
}

export function Reviews() {
  const reviews = [
    {
      name: "Александр К.",
      text: "Отличная работа! PPF на Porsche Cayenne сделали идеально. Все края закрыты, плёнка незаметна. Рекомендую!",
      rating: 5,
      date: "2 недели назад"
    },
    {
      name: "Мария Д.",
      text: "Шумоизоляцию сделали аккуратно: в салоне заметно тише, сроки соблюдены. Студия очень чистая и современная.",
      rating: 5,
      date: "1 месяц назад"
    },
    {
      name: "Дмитрий С.",
      text: "LUX-пакет на BMW X5 закрыл капот, бампер и фары. Результат превзошёл ожидания. Менеджеры профессионалы, всё объяснили и показали.",
      rating: 5,
      date: "3 недели назад"
    }
  ];

  return (
    <section id="reviews" className="section-shell">
      <SectionIntro 
        kicker="04 · Отзывы" 
        title="Наши клиенты рекомендуют" 
        copy="Честные отзывы автовладельцев о качестве работ и сервисе Capital Detailing в Астане." 
      />
      <div className="mb-8 flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="size-5 fill-primary text-primary" />
          ))}
          <span className="ml-2 text-2xl font-bold">4.9</span>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">128+ отзывов</span> на 2ГИС
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review, index) => (
          <article 
            key={index} 
            className="border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`size-4 ${star <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} 
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-4 text-foreground/90">
              "{review.text}"
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-primary">{review.name}</span>
              <span className="text-muted-foreground">{review.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Contacts() {
  return <section id="contacts" className="section-shell"><div className="contact-grid overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md"><div className="p-6 md:p-10"><p className="section-kicker">06 · Контакты</p><h2 className="section-title max-w-2xl">Студия в сердце Астаны</h2><div className="mt-10 grid gap-8 sm:grid-cols-2"><div><p className="info-label">Адрес</p><p className="mt-2 text-lg font-semibold">ул. Бухар жырау, 36н<br /><span className="text-muted-foreground">ЖК Адал</span></p></div><div><p className="info-label">Режим работы</p><p className="mt-2 text-lg font-semibold">Ежедневно<br /><span className="text-muted-foreground">10:00–20:00</span></p></div><div><p className="info-label">Телефон · WhatsApp · Telegram</p><p className="mt-2 text-lg font-semibold">+7 XXX XXX XX XX</p></div></div><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button variant="luxury" asChild><a href="https://2gis.kz/astana/firm/70000001054354013" target="_blank" rel="noreferrer">Открыть в 2ГИС <ArrowUpRight /></a></Button><Button variant="glass" asChild><a href="https://2gis.kz/astana/directions/points/|71.4304,51.1282" target="_blank" rel="noreferrer">Построить маршрут</a></Button></div></div><div className="map-panel min-h-80"><div className="map-lines" /><div className="relative z-10 grid size-16 place-items-center border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.06)]"><span className="size-3 bg-primary" /></div><div className="relative z-10 mt-4 text-center"><p className="text-xs font-bold uppercase">Capital Detailing</p><p className="mt-1 text-[10px] text-muted-foreground">Бухар жырау, 36н</p></div></div></div></section>;
}