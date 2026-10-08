# Capital Detailing Project

Build a single-page ultra-luxury automotive detailing landing for **Capital Detailing** (Astana). Dark Porsche-center / stealth garage vibe. Use ONLY the attached real photos (do not invent stock cars).

## Brand & facts
- Name: CAPITAL DETAILING
- One branch: ул. Бухар жырау, 36н (ЖК Адал), Astana
- Hours: ежедневно 10:00–20:00
- Phone / WhatsApp: +7 708 111 96 96 (`tel:+77081119696`, `https://wa.me/77081119696`)
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
6. Booking form: класс авто, услуга, марка/модель, телефон +7. Submit posts to `/api/lead`, which notifies Telegram and Google Sheets.
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

## Заявки: Telegram и Google Sheets

Секреты читает только серверный `POST /api/lead`. В клиентский бандл они не попадают. Локально скопируйте `.env.example` в `.env` и заполните значения. На Vercel: Project → Settings → Environment Variables, добавьте те же три переменные для Production (и Preview, если нужно), затем Redeploy.

- `TELEGRAM_BOT_TOKEN` — токен бота от BotFather
- `TELEGRAM_CHAT_ID` — id чата, куда бот пишет заявки
- `GOOGLE_SHEETS_WEBHOOK_URL` — URL веб-приложения Apps Script

В таблице создайте лист **Заявки** с шапкой в первой строке: Дата, Класс, Услуга, Марка, Телефон. В Apps Script вставьте код и опубликуйте его как веб-приложение (выполнять от своего имени, доступ — все):

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActive().getSheetByName("Заявки");
  sheet.appendRow([data.date, data.carClass, data.service, data.carModel, data.phone]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Заявка считается принятой, если дошло хотя бы одно из двух уведомлений. Сбой второго пишется в лог сервера.
