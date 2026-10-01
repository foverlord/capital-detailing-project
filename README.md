# Capital Detailing Project

Build a single-page ultra-luxury automotive detailing landing for **Capital Detailing** (Astana). Dark Porsche-center / stealth garage vibe. Use ONLY the attached real photos (do not invent stock cars).

## Brand & facts
- Name: CAPITAL DETAILING
- One branch: ул. Бухар жырау, 36н (ЖК Адал), Astana
- Hours: ежедневно 10:00–20:00
- Phone / WhatsApp / Telegram: placeholders (+7 XXX XXX XX XX)
- Trust: 4.9★ / 128+ отзывов 2ГИС; гарантия 5 лет; плёнки STEK & SunTek Premium
- Language: Russian UI
- No before/after slider. Use a **Works gallery** + **Process** photos instead.

## Visual system
- BG: #08090C / #0F1117
- Glass cards: zinc-900/40 backdrop-blur border white/10
- Accent: electric cyan #00F0FF subtle glow (not neon carnival)
- Text: zinc-100 / zinc-400
- Bold uppercase headlines, tight tracking, Inter or Plus Jakarta Sans
- Mobile-first, polished, dealer-site quality — not a generic template

## Photo usage (attached files)
1. **hero-gwagen.png** — HERO background only (matte G-Class, full car). Put headline + CTAs on the LEFT empty space; do not cover the car face/headlight.
2. Gallery: mustang, bmw studio, zeekr studio, hyundai gloss, hyundai matte street, salon interior with CD bottle
3. Process: ppf hands (squeegee), ppf hood with Capital sign, soundproofing Comfort Mat floor

## Sections (one page)
1. Sticky glass header: logo CAPITAL DETAILING, anchors Услуги / Работы / Процесс / Контакты, CTA «Онлайн расчёт»
2. Hero: headline «ЗАЩИТА И ЭСТЕТИКА ПРЕМИАЛЬНЫХ АВТО В АСТАНЕ»; sub about PPF, тонировка, шумоизоляция for Porsche/BMW/Zeekr; trust badges; CTAs «Записаться на расчёт» + «Смотреть работы»
3. Services grid (4 glass cards, cyan border on hover): Бронеплёнка PPF; Премиум тонировка; Виниловый стайлинг; Шумоизоляция Premium — short Russian blurbs
4. Works gallery: attached finished-car photos in a refined grid (no fake before/after)
5. Process: 01 Заявка → 02 Осмотр/смета → 03 Выдача + show the 3 process photos
6. Booking form (concierge style): имя, телефон +7 mask, марка/модель, service pills (4), филиал select (only Адал address), photo upload placeholder UI (no real backend yet), comment; submit «Получить детальный расчёт» → for now toast/success UI only (Telegram/Supabase later)
7. Contacts/map card: address, hours, buttons «Открыть в 2ГИС» linking https://2gis.kz/astana/firm/70000001054354013 and «Построить маршрут»; dark map placeholder ok
8. Footer: © Capital Detailing Astana · Digital experience by Amir

## Stack notes
React + Tailwind + shadcn, on Vite and TanStack Start. Modular section components. Keep v1 focused and elegant — polish over feature bloat.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
