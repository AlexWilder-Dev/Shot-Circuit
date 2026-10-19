# Shot Circuit: research notes

Researched 19 October 2026. Exact source wording is in `sources/transcripts.md`, and the bar's own drink data is in `sources/shotcircuit-menu-data.json`.

## Are they trading?

Very probably, but I couldn't confirm it from Google or Instagram.

- The Brixton Village trader page was last modified on **14 Sep 2026**. It calls them "new" and lists Wednesday–Sunday hours.
- The Brixton Village photos were shot on 21 and 27 Aug 2026 and show the bar open, staffed and serving.
- The TikTok account was created on 30 May 2026 and has 5 videos. Brixton Village's July 2026 summer guide calls them "one of Market Row's newest arrivals".
- Google reviews hit a captcha and a limited-view page. Instagram redirects to a login wall. I found no recent post or review I could read.

## Brand assets found

| Asset | Where | Notes |
|---|---|---|
| Wordmark | Fascia, TikTok avatar, site header | **SHOT** reads normally. **CIRCUI** is mirrored and shares the **T** of SHOT, so the word runs out and loops back on itself, closing the circuit. The site builds it from Barlow Condensed Bold with `scale-x-[-1]`. |
| Logo mark | `/menu` header SVG (`brand/logo-mark.svg`) | A tapered shot glass drawn as one continuous line, with a lightning bolt dropping into it, stroke `#00d9ff`. The bolt is the electric idea, and it is theirs. |
| Fonts | Site CSS | Barlow Condensed 700 for the wordmark and signage. Geist and Geist Mono for body text (the Next.js default). The fascia and A-board lettering are the same condensed grotesque. |
| Colours | `sources/shotcircuit-home.css` and photos | Main blue `#003fff`, text `#f5f9ff`, link yellow `#fff799`. Their utility classes also use a pale-blue family (`#eef5ff`, `#dceaff`) and a dark navy `#0a1628`. Photos give stool yellow ≈ `#f1bc20` and the pale-blue Market Row frontage. The TikTok poster pink is ≈ `#eb2a8f`. |
| Link preview | none | The live site has no `og:image`, and its twitter card is "summary". The unlinked `/menu` page points at `/og-image.jpg`, which returns 404. There is no favicon at all. |

## Photos (saved in `photos/`)

| File | What it shows | Use |
|---|---|---|
| `DSC09323-scaled.jpg` (2560×1710, Sony, 27 Aug) | Straight-on shot of the fascia: royal-blue board, white condensed caps "SHOTIUCRIC / SHOOTER BAR", "14" bottom left, "MARKET ROW" bottom right. Below it, a warm amber interior lined with antique mirror tiles and chalkboards. A pale-blue paper lantern sits top right. | Find us page, "Look up for this". |
| `DSC09696-1.jpg` (1024×684, Sony) | Night at the counter. A couple sit on yellow Tolix-style stools at a brushed-steel bar. A white neon squiggle runs across a mirror-tiled wall, with lit back-bar shelves. The bartender wears a yellow beanie and yellow tee. Chalkboards above read SoCo Kamikaze, Negroni 8.00, Amaretto Sour 8.00, "Add a shot for 4.00", Ginger Irie Slushie. | Best bar photo. Used for og.jpg, under the fascia band, and as the lead tile on the home photo wall. |
| `IMG_1838.jpg` (phone, 21 Aug) | Daytime exterior. Blue fascia, open shopfront, mirror-tiled interior, a steel counter with a chalk "SHOOTERS" A-board in the window. Out front are two black poster tables and four yellow stools. A chalk A-board reads "FRESH Wellness Shots Shooters ←". Pale-blue painted neighbouring units and paper lanterns sit under Market Row's glass roof. | Find us page: what the unit looks like from the aisle. |
| `IMG_1839.jpg` | Two bartenders laughing behind the steel counter. Behind them are antique mirror tiles, fairy-lit back-bar shelves (Southern Comfort, Absolut, Midori-green bottle, Grand Marnier) and an espresso machine. A whipped-cream-topped shot sits on a black napkin. A chalkboard reads "…DEAL … Rosso … Digestif … Tiramisu SHOT". | The groups page poster, and the "Bringing a crowd?" panel on the homepage. |
| `IMG_1840.jpg` | Two sugar-rimmed layered shots on the steel counter: dark red below, pale pink cream on top. Lit shelves are blurred behind. | Home photo wall, and next to "Chalked up at the bar" on the menu. |
| `IMG_1841.jpg` | Daylight. An orange frozen or juiced drink in a ribbed tumbler with an orange wedge, on a black napkin, plus two shots behind it. The market aisle is visible through the open front. | Home photo wall ("Noon, with the aisle going by"). The drink isn't named anywhere, so the site doesn't name it. |

## The room

The unit is narrow and opens fully onto the Market Row aisle under the glass roof. There is no door, just the blue fascia over an open front. Inside is one long **brushed-steel counter**, and the walls and ceiling are lined with **antique (foxed) mirror tiles**. That doubles the room and the bottles, and gives the same warm amber glow at night that you see from the aisle. **Yellow metal stools** run along the counter and spill outside around two black tables.

Menus are **hand-chalked** on blackboards: hanging boards over the bar, an A-board in the window and one in the aisle. A **white neon squiggle** wiggles across the mirrors. Paper lanterns hang outside. It looks like a market unit done cheerfully, not a nightclub. The style is primary colours, steel and chalk, with no neon signage, velvet or cocktail-lounge moodiness.

## How they talk

- Short, chirpy, a bit pun-led: "Come for the shots, stay for the sips." "We've got your sip sorted." "There's a shot for every mood." "Tinnies for the road." "(un)wellness shots."
- They describe the night in three moments, every time: **kicking off the night / keeping the party alive / winding down after dinner**. The about page adds a fourth: **"a wellness or indulgence boost"**.
- They call themselves **"The one and only shots bar in Brixton"** and a **"shooter bar"**. Coined words include "shotails", "sips" and "liquid desserts".
- British register: "tinnies", "whet the appetite", "sorted". They are informal, never sneering, with no slang overload.
- Chalkboards abbreviate drolly: "S'Comfort, T'Sec, L'Juice".

## Who comes when (inferred from hours, menu and copy; no reviews available)

- **Noon to late afternoon (Wed–Sun from 12:00):** market browsers and lunch traffic. They push wellness shots, "energisers", speciality teas, the Ginger Irie slushie, aperitifs and take-away cocktails (from the TikTok bio). Brixton Village's own guide frames them as a daytime stop: "from morning through to evening".
- **Early evening:** pre-drinks before Brixton's venues (the O2 Academy, Phonox and Electric are all minutes away). Rounds of shooters, Jägerbombs, the "Add a shot for 4.00" board.
- **Late (to 23:30):** keeping it going. Layered party shooters such as Traffic Light, Starman, Bazooka Joe and Electric Blue.
- **After dinner:** Market Row and Brixton Village are full of restaurants, so people move on to dessert shots and digestifs (Baby Guinness, Irish Affogato, Tiramisu shot, Sambuca, Sgroppino).
- **Groups:** shots are a group drink, and there are tables out front. But their own structured data says **"Walk in, no reservation needed."** I found no evidence of group packages, birthdays, events or DJ nights.

## What reviewers praise or complain about

I couldn't read any reviews (Google was blocked and nothing else is indexed). I've left reviews and quotes off the site entirely.

## How easy the unit is to find

It's hard if you don't already know the market.

- Market Row is a covered arcade. Per the OpenStreetMap footways, its main aisle runs east–west from **Electric Lane** (west entrance) to **Atlantic Road** (east entrance). A short passage branches south from it to **Coldharbour Lane**.
- The **Unit 14** cluster (OSM records 14A–14E, postcodes SW9 8LD / 8JP) sits along that short north–south passage, near where it meets the main aisle. Their Google pin lands in the same spot.
- That means it isn't visible from any street. Coming from the Tube, you walk Electric Avenue, turn onto Electric Lane, enter Market Row, then take the turn towards the Coldharbour Lane passage.
- The bar knows this is the problem. **Their whole current homepage is a video called "How to get to Shot Circuit in Brixton"**, walking from the Tube roundel to the Market Row arch and in to the counter. Their TikTok avatar prints the address larger than anything except the name. They put an A-board in the aisle with an arrow, and "14 / MARKET ROW" is painted on the fascia itself.
- There is a nice local link to use: the route runs **Electric Avenue → Electric Lane**, and their mark is a lightning bolt.

## Conflicts and gaps

- **Hours conflict.** The Brixton Village listing (Sep 2026) has Mon–Tue closed, Wed–Sat 12:00–23:30, Sun 12:00–20:00. Their own unlinked `/menu` and structured data (Aug 2026) have Thu–Fri 16:00–23:30, Sat–Sun 14:00–23:30, bank holidays 14:00–23:30. The site uses the newer Brixton Village hours, which is the brief's instruction. Both need confirming with the owners.
- **Prices.** Only three are legible anywhere: Negroni £8.00, Amaretto Sour £8.00 and "Add a shot for 4.00", all from the chalkboard. The shooter price on the A-board can't be read. Their own menu data carries no prices.
- **Unnamed items.** There are no named tinnies, wines, spirits, beers, aperitifs or teas. The site lists them as categories only.
- **Ginger Irie.** Their data lists it as "Ginger Shot 50ml, Coconut Liqueur 25ml, Spiced Rum 25ml" in a tumbler. The about page calls it a "wellness Slushie". I treat these as the same drink.
- **Chalkboard-only drinks.** SoCo Kamikaze, Kamikaze, Melon Drop and Tiramisu appear on the chalkboards but not in their data. I list them, with builds only where the board gives one.

## Design reasoning

- **Palette.** Fascia blue `#003fff` (their CSS) is the dominant colour, with their own `#f5f9ff` white on it. Pale market blue `#eef5ff` / `#dceaff` (their utility palette, and the painted Market Row frontage) is the page ground. Chalkboard black is used for drinks lists, because that is how they actually write menus. Stool yellow `#f1bc20` and their link yellow `#fff799` are the accents. TikTok-poster pink `#eb2a8f` is used sparingly for the live status. Logo-mark cyan `#00d9ff` is reserved for the bolt.
- **Type.** Barlow Condensed 700 for display (wordmark, fascia lettering, A-boards). Geist for body text and Geist Mono for ml and prices: their site's own stack. No chalk "handwriting" font, because faking their chalk would be worse than none.
- **Layout.** The top of the page *is* their fascia, rebuilt in type: the mirrored wordmark, "SHOOTER BAR", and "14" and "MARKET ROW" in the corners exactly as painted. The open-now strip and route hang under it like the open shopfront under the sign. No hero photo, no cards row.
- **Electric.** Only where they use it: the bolt-in-glass mark, the bolt as the route marker along Electric Avenue / Electric Lane, and the Electric Blue shooter. No circuit boards, HUD or neon.
- **Signature interactions.**
  1. **"What's the moment?"** Their four moments (kicking off / keeping it alive / after dinner / wellness or indulgence boost) reorder the drinks list. The default follows the clock: noon to 17:00 wellness, 17:00 to 20:00 kicking off, 20:00 to 21:30 after dinner, then keeping it alive.
  2. **Poured glasses.** Each drink is drawn from *their own* build data (layers, colours, ml, glass type, garnish), in the glass shape from their logo mark. Tapping a drink pours it layer by layer. Their unlinked menu was clearly heading this way.
- **Photos.** Only theirs. Mirror-tile framing echoes the room.

## What the owners most want this site to do

1. Get people from the Tube, or from anywhere in the market, to Unit 14. It's new and sits on a side passage of a covered arcade. Their homepage is literally a how-to-get-here video.
2. Put the full shot list in front of people before they arrive. They already built an unlinked 20-drink menu. Prices go in only where they've chalked them.
3. Show it's a bar for every hour they're open: noon wellness shots, teas and the slushie, pre-drinks, the party, after-dinner dessert shots. That brings in daytime trade and rounds for groups (walk-in, with a heads-up form for big groups rather than bookings).
