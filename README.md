# EMBER — Restaurant Website Demo

Premium, rebrandable restaurant website system. Next.js 16 + Tailwind CSS 4.

## Run it

```bash
cd ember
npm install
npm run dev      # open http://localhost:3000
```

## Pages

| URL | What |
|---|---|
| `/` | Full demo homepage |
| `/menu` | Interactive menu (search, filters, allergens, customise, cart) |
| `/checkout` | Delivery/pickup, branch, details, promo code, order tracking |
| `/locations`, `/locations/mingora` … | Branch picker + SEO branch pages |
| `/reservations` | Book a table |
| `/catering`, `/offers`, `/about`, `/loyalty` | Section pages |
| `/dashboard` | Owner analytics concept |
| `/admin` | CMS concept (orders, menu, offers, hours, bookings, reviews) |

Demo promo codes: `WELCOME10`, `WEEKEND20`, `TWOFIRE`, `STUDENT`.

## Rebrand for a new restaurant

1. `src/config/brand.ts` — name, tagline, colors, phone, WhatsApp, socials, SEO keywords
2. `src/config/menu.ts` — categories, items, prices, add-ons, allergens
3. `src/config/content.ts` — branches, offers, reviews, story, loyalty tiers, FAQs
4. `src/components/Logo.tsx` — swap the logo
5. `public/media/` — drop in photos/videos (see below)

## Media to upload (put in `public/media/`)

Missing files show a warm placeholder, so you can add them one by one.

- `hero.mp4` (8–12s loop, under 3 MB) + `hero-poster.jpg`
- `clip-cheese-pull.mp4`, `clip-burger-grill.mp4`, `clip-sauce.mp4`, `clip-prep.mp4` (3–5s each, portrait 3:4)
- `chef.jpg` (portrait 4:5), `interior.jpg`, `about-ingredients.jpg`
- `social-1.jpg` … `social-6.jpg` (square)
- `menu/<item-id>.jpg` — one square photo per menu item, named by the `id` in `menu.ts`
  (e.g. `menu/ember-supreme.jpg`, `menu/fire-burger.jpg`)

Photos are auto-converted to AVIF/WebP and lazy-loaded. Videos only load when on screen.
# valley-fire
