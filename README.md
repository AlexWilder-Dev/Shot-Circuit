# Shot Circuit: demo site

A speculative site for **Shot Circuit**, the shooter bar at Unit 14, Market Row, Brixton Village, London SW9 8LD. Made to pitch to the owners. It runs on static data only: no CMS, bookings or payments, and the group form only shows a confirmation.

Live: https://alexwilder-dev.github.io/shot-circuit/

## What's in it

- **The fascia as the header.** Their mirrored wordmark (SHOT reads forwards, CIRCUI loops back off the T), rebuilt as SVG from Barlow Condensed. "14" and "Market Row" sit in the corners as painted on the sign.
- **Open-now strip.** Worked out in London time from the hours in `src/data/bar.ts`.
- **"What's the moment?"** Their four moments (kicking off, keeping it going, after dinner, a wellness or indulgence boost) reorder the shot list. The default follows the clock.
- **Poured glasses.** Each drink is drawn from the bar's own build data (layers, colours, ml, glass, garnish) and pours layer by layer when opened.
- **Find us.** A Market Row plan traced from OpenStreetMap footways, step-by-step directions from Brixton Tube, map links, their photos, and their "How to get to Shot Circuit" video as click-to-play.
- **Groups.** A heads-up form for big groups that shows a confirmation and sends nothing.

## Editing content

All drinks, prices, hours, contact details and events live in **`src/data/bar.ts`**. Prices only appear where the bar has published them.

## Develop

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run og        # rebuild og.jpg, icons and web-sized photos from research/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`. Set Pages → Source to "GitHub Actions" in the repo settings.

## Research

`research/notes.md` has the findings and design reasoning. `research/sources/` holds transcripts and the bar's own menu data. `research/photos/` holds the original photos from the Brixton Village listing.

Fonts: Barlow Condensed (SIL OFL), Geist and Geist Mono, via Google Fonts.

---

Site by AlexWilder-Dev
