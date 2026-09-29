import { Camera, Check, ChevronDown, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const services = ["Полный кузов PPF", "LUX-пакет", "Защита салона", "Лобовое стекло", "Шумоизоляция", "Сетка в радиатор"];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^7/, "").slice(0, 10);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)];
  let result = "+7";
  if (parts[0]) result += ` (${parts[0]}`;
  if (parts[0].length === 3) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;
  return result;
}

export function Booking() {
  const [selected, setSelected] = useState<string[]>([]);
  const [phone, setPhone] = useState("+7");
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    toast.success("Заявка принята", { description: "Менеджер свяжется с вами для уточнения деталей." });
  };

  return <section id="booking" className="section-shell"><div className="booking-band"><div className="max-w-xl"><p className="section-kicker">04 · Concierge</p><h2 className="section-title">Рассчитаем ваш проект</h2><p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Расскажите об автомобиле и задаче. Подготовим предварительный план работ и свяжемся для согласования осмотра.</p><div className="mt-10 hidden border-l border-primary/50 pl-5 lg:block"><p className="text-sm font-semibold">Консультация без обязательств</p><p className="mt-1 text-xs text-muted-foreground">Ответим в рабочее время · 10:00–20:00</p></div></div>{sent ? <div className="border border-white/10 bg-white/[0.03] backdrop-blur-md grid min-h-[520px] place-items-center p-8 text-center"><div><span className="mx-auto grid size-16 place-items-center border border-white/10 bg-white/[0.03] backdrop-blur-md text-primary shadow-[0_0_20px_rgba(255,255,255,0.06)]"><Check className="size-7" /></span><h3 className="mt-7 text-2xl font-bold uppercase">Спасибо за заявку</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Мы получили данные. Менеджер Capital Detailing свяжется с вами для детального расчёта.</p><Button variant="glass" className="mt-7" onClick={() => setSent(false)}>Новая заявка</Button></div></div> : <form onSubmit={submit} className="border border-white/10 bg-white/[0.03] backdrop-blur-md grid gap-5 p-5 md:p-7"><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Имя<Input required name="name" placeholder="Как к вам обращаться" className="field-input" /></label><label className="field-label">Телефон<Input required name="phone" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} inputMode="tel" placeholder="+7 (___) ___-__-__" className="field-input" /></label></div><label className="field-label">Марка и модель<Input required name="car" placeholder="Например, Porsche Cayenne" className="field-input" /></label><fieldset><legend className="field-label mb-3">Интересующая услуга</legend><div className="flex flex-wrap gap-2">{services.map((service) => { const active = selected.includes(service); return <button key={service} type="button" onClick={() => setSelected((current) => active ? current.filter((item) => item !== service) : [...current, service])} className={cn("service-pill", active && "service-pill-active")} aria-pressed={active}>{active && <Check className="size-3.5" />}{service}</button>; })}</div></fieldset><label className="field-label">Филиал<div className="relative"><select name="branch" className="field-select" defaultValue="adal"><option value="adal">Бухар жырау, 36н — ЖК Адал</option></select><ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></div></label><label className="upload-zone"><Camera className="size-5 text-primary" /><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{fileName || "Добавить фото автомобиля"}</span><span className="mt-1 block text-xs text-muted-foreground">JPG или PNG, до 20 МБ</span></span><span className="text-xs font-bold uppercase text-primary">Выбрать</span><input type="file" accept="image/png,image/jpeg" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} /></label><label className="field-label">Комментарий <span className="font-normal text-muted-foreground">(необязательно)</span><Textarea name="comment" placeholder="Что важно учесть в проекте" className="field-input min-h-24 resize-none" /></label><Button variant="luxury" size="lg" className="h-13 w-full" type="submit">Получить детальный расчёт <Send /></Button><p className="text-center text-[10px] leading-4 text-muted-foreground">Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.</p></form>}</div></section>;
}