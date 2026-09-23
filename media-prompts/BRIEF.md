# EMBER Kitchen — Media Generation Brief
(Context store for AI video/image prompts — used across the session)

## Brand recap
- Name: EMBER Kitchen | Tagline: "Fired with Swat pride."
- Cuisine: premium stone-fired pizza, smash burgers, fried chicken — Swat, Pakistan
- Palette: Charcoal #0F0D0B (bg) · Ember Orange #E4572E (accent) · Cream #F5EFE6 (ink) · Gold #D9A441
- Mood: dark, moody, cinematic, premium fast-food — think high-end burger/pizza brand photography (Shake Shack x fine dining), NOT bright fast-food lighting.

## Consistent visual style (use in every prompt)
- Cinematic side/top-down lighting, warm key light, deep charcoal-black background or dark wood/slate surface
- Shallow depth of field, macro/close-up food detail, visible steam/smoke/char where relevant
- Rich warm color grade: amber, ember-orange, gold highlights against near-black shadows
- Photorealistic, 4K, food commercial / restaurant ad quality — no cartoon, no illustration
- No visible text, logos, or watermarks in the generated media (text is added in code)

## Full shot list
### Videos (5) — public/media/
1. hero.mp4 — cinematic hero loop, 8–12s, landscape 16:9, 1080p+
2. clip-cheese-pull.mp4 — 3–5s, portrait 3:4
3. clip-burger-grill.mp4 — 3–5s, portrait 3:4
4. clip-sauce.mp4 — 3–5s, portrait 3:4
5. clip-prep.mp4 — 3–5s, portrait 3:4

### Images (33) — public/media/
- hero-poster.jpg — 1920×1080 (16:9)
- chef.jpg — 1000×1250 (4:5 portrait)
- interior.jpg — 1600×1000 (16:10)
- about-ingredients.jpg — 1600×1000 (16:10)
- social-1.jpg … social-6.jpg — 1080×1080 (1:1) each
- menu/*.jpg — 23 items, 1200×1200 (1:1) each:
  Pizza: ember-supreme, spicy-chicken-pizza, margherita, bbq-beef
  Burgers: fire-burger, classic-smash, crispy-zinger, mushroom-melt
  Chicken: hot-wings, fried-bucket, tenders
  Sides: loaded-fries, classic-fries, mozzarella-sticks, coleslaw
  Drinks: mint-lemonade, oreo-shake, soft-drink
  Desserts: lava-cake, kunafa-cheesecake
  Deals: solo-deal, family-feast, fire-duo

## Delivery plan
Prompts given one at a time, videos first (5), then images (33), each with
exact filename, dimensions, duration (if video), and a ready-to-paste prompt.

## Realism rules (added after review — apply to ALL prompts)
- Avoid hands where possible. If unavoidable: exactly ONE hand, already holding/touching the object from the first frame (never "reaching in" or a second hand appearing mid-shot).
- No "steam rising" / "smoke swirling" language — this produces fake, obviously-AI volumetric clouds. Omit steam entirely, or specify "one thin wisp of steam, barely visible."
- Locked-off camera or slow linear push-in/pan only. No fast action, no elastic/stretching physics (cheese pulls, dough tosses) — these are where AI motion breaks down.
- Food should be static/already-finished in frame 1, not assembling or transforming.
- No people, faces, or extra limbs anywhere in frame.
