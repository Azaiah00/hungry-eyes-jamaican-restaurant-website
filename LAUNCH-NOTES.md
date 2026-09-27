# Launch notes: Hungry Eyes Jamaican Restaurant & Bar

Everything below must be confirmed with the owner before the site goes live.

## Facts to confirm
1. **Hours (conflicting sources).** The site shows Mon 11:30 AM-7 PM, Tue-Thu 11 AM-9 PM, Fri-Sat 11 AM-10 PM, Sun 12-6 PM. Conflicts found in their posts:
   - "Now open Mondays" posts say 11:30 AM-7 PM, but one "We are now OPEN on Mondays" graphic says **11:30 AM-9 PM**.
   - An older roti flyer lists Mon-Thu 11 AM-9 PM, Fri-Sat 11 AM-10 PM, **Sun 12-8:30 PM**.
   - Friday DJ flyers say "8 PM-close" and some say **8 PM-1:30 AM**, which is later than the 10 PM Friday closing time. The site says "until close". Confirm Friday/Saturday late hours for the bar.
   - Update hours in the HTML, `assets/js/site.js` (`HOURS`), JSON-LD and `llms.txt`.
2. **"Since 2009"** is taken from the logo ring ("See Good Food and Eat - Since 2009"). Confirm and confirm it is OK to state (also in JSON-LD `foundingDate`).
3. **Location wording:** "Short Pump, West Broad Village area". Confirm the owner is happy with "West Broad Village".
4. **Parking:** site says parking is in the shared shopping-center lots around Towne Center West Blvd. Confirm.
5. **Google rating 4.5 from 245 reviews** (home page, JSON-LD aggregateRating, `llms.txt`). Re-check the live numbers at launch.
6. **"Family-run"** comes from a local creator's Instagram post ("a family-run spot"). Confirm the owner wants this.
7. **Reservations:** the FAQ says there is no booking system and to call ahead for large groups. Confirm.
8. **Friday specials:** jerk wings, rasta pasta special, "$5 drink specials". Confirm still current (an older post advertised $3 beers / $5 rum punch / $15 oxtail; not used).
9. **Karaoke night:** site says Fridays from 6 PM (current posts). Older posts advertised Thursday karaoke at 8 PM; confirm Thursdays are no longer running.
10. **DJs:** the site says "rotating DJs". Tagged DJs in posts: @wizzimentals, DJ Blend Masters (@djblendmasters), DJ Untouchable. Ask if they want DJs named. The Friday photo on the site shows a DJ at a Blend Masters table; get the DJ's OK for the photo.
11. **Delivery:** site says "Delivery available on DoorDash" as plain text. **Add the real DoorDash store link** once confirmed (none was verified; no guessed URL is linked).
12. **Shared location / Perlas Pizza and Bar:** a Christmas post and a hiring post reference "Hungry Eyes Jamaican Restaurant & Perlas Pizza and Bar" and a "merge". Confirm the current relationship and whether Perlas should appear on the site.
13. **Temporary closures:** posts announced a temporary closure ("see you Tuesday 2/3/26") and an earlier closure for a family emergency. Confirm the restaurant is operating normally.
14. **Email:** none is shown on the site. A hiring graphic shows a Gmail address; ask whether they want a public email.

## Menu (transcribed from the in-house menu board photo)
- Prices used, clearly legible on the board: Curry Chicken $16.00, Brown Stew Chicken $16.00, Fried Chicken $17.00, Wings 8 pcs $12.95 / 12 pcs $17.95, sides (mac n cheese, plantains, candied yams, steamed cabbage or green beans) $7.00, beef patty $3.50, chicken patty $3.50, coco bread $3.00.
- **Not shown (obscured on the board, "call for price"):** Oxtail (board appears to read around $30), Jerk Chicken (~$17), Curry Goat (~$19), BBQ chicken, snapper, whiting fish, shrimp, shrimp & fish platter, whiting fish sandwich (~$10), kids meal (~$10), roti, rasta pasta, drinks. The brief noted oxtail about $24 and curry chicken about $14, which conflicts with the board ($16 curry chicken). Get a current menu with prices and fill these in (visible menu plus JSON-LD `hasMenu` offers).
- Allergen line from the board is partly cut off ("Milk, Wheat, S..."). Confirm the full allergen statement.
- Confirm roti is still offered (from an older "Roti now available" flyer) and whether breakfast (trialed once) should be mentioned (not included).

## Photo credits and licensing
All photos come from Hungry Eyes' own public Instagram/Facebook posts and must be approved/licensed by the owner before launch:
- Food: oxtail (bowl), jerk chicken, jerk wings with mac, rasta pasta, snapper, curry shrimp, brown stew chicken, beef patty in coco bread, candied yams/plantains/cabbage, fried fish & shrimp.
- `hero-oxtail-plate.webp` and `og.jpg` use a photo tagged **@eatwithleah** (local creator; the watermark is cropped out of the hero, but the photo is theirs). Get the creator's permission or swap for a house photo.
- Interior/bar: bar counter, bar shelves, bartender pour (hands only), glassware, flag behind bar, welcome counter, storefront.
- Nightlife: karaoke screen photo with "Friday's at 6pm! $5 drink & food specials" text (the one flyer-style image used), DJ at the decks (identifiable DJ; get consent).
- Logo: `hungry-eyes-logo.*` extracted from their profile picture; ask for the original vector logo file.
- Recommended: a short professional food and interior shoot to replace the phone photos (several are low-res Instagram story frames).

## Items to swap/add at launch
- DoorDash store URL (visit page, home FAQ, footer).
- Missing menu prices.
- Final hours.
- Google Business Profile link (the "Read the reviews" button currently uses a Google Maps search URL for the address).
- Optional: an email address or contact form (none built, none requested).

## Domain and hosting
- Proposed domain: **hungryeyesrva.com** (used in canonical, OG, sitemap, robots, llms.txt).
- Hosting: Netlify (config in `netlify.toml`). No forms on this site.
