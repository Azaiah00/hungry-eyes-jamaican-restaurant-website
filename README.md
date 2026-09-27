# Hungry Eyes Jamaican Restaurant & Bar: spec website

A production-ready static website concept for **Hungry Eyes Jamaican Restaurant & Bar (Yaad Vibes Bar & Grill)**, 201 Towne Center W Blvd, Suite 707, Richmond, VA 23233. Built by Couture House Co. as a spec site to present to the owner.

- Pages: `index.html`, `menu.html`, `yaad-vibes.html`, `visit.html`, `404.html`
- Plain HTML, one stylesheet (`assets/css/site.css`, plus `assets/css/fonts.css`) and one vanilla script (`assets/js/site.js`). No build step, no frameworks, no third-party requests.
- Fonts: Lilita One and Nunito Sans (variable), self-hosted from Fontsource (SIL Open Font License) in `assets/fonts/`.
- SEO/AEO: per-page titles and descriptions, canonical URLs, Open Graph/Twitter cards, JSON-LD (Restaurant + BarOrPub with full hasMenu, BreadcrumbList, FAQPage, WebSite), `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`.

## Preview locally
Double-click `index.html`, or for the most accurate preview (fonts, preloads, 404):

```
cd hungry-eyes-jamaican-restaurant
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Drag the folder onto https://app.netlify.com/drop, or connect the Git repo (publish directory: `.`, no build command).
2. `netlify.toml` already sets security headers (CSP, HSTS, etc.), asset caching and the 404 page.
3. Add the custom domain in Site settings > Domain management and enable HTTPS.

## Domain
Proposed: **hungryeyesrva.com** (all canonical, Open Graph and sitemap URLs use it). If a different domain is chosen, find-and-replace `https://hungryeyesrva.com` across the HTML, `sitemap.xml`, `robots.txt` and `llms.txt`.

## Editing
- Hours live in three places: the HTML hours tables, the `HOURS` array at the top of `assets/js/site.js` (drives the open-now badge, America/New_York time) and the JSON-LD `openingHoursSpecification`.
- Menu prices: `menu.html` (visible) and its JSON-LD `hasMenu` block.

See `LAUNCH-NOTES.md` for everything that must be confirmed with the owner before launch.
