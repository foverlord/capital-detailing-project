import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "./FadeIn";
import { Accent, SectionHeading } from "./SectionHeading";

const items = [
  {
    q: "Краска OEM и плёнка?",
    a: "Плёнка ложится поверх заводского лака и не заменяет окраску. Перед оклейкой смотрим кузов: сколы и ремонт согласуем отдельно, чтобы кромки сели ровно.",
  },
  {
    q: "Как мыть после?",
    a: "На выдаче подскажем режим мойки. Плёнку не трём абразивом и не бьём струёй в упор по кромкам. Обычная ручная мойка после этого — нормальный уход.",
  },
  {
    q: "Сроки?",
    a: "Зависят от пакета и состояния кузова. На карточках услуг — ориентир, точный срок называем после осмотра. Студия открыта ежедневно с 10:00 до 20:00.",
  },
  {
    q: "Гарантия?",
    a: "На работы оформляем договор. Гарантия — 5 лет. Студия в Астане, ул. Бухар жырау, 36н, ЖК Адал.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-zinc-800/80">
      <FadeIn className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Вопросы"
          title={
            <>
              Коротко о <Accent>плёнке</Accent> и сроках
            </>
          }
        />
        <Accordion type="single" collapsible className="border-t border-zinc-800/80">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-zinc-800/80">
              <AccordionTrigger className="min-h-14 py-4 text-left text-base text-zinc-100 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-zinc-400">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </section>
  );
}
