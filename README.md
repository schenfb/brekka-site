# Brekka website

The company website for Brekka, an AI transformation company whose senior engineers embed with enterprise teams and take AI from pilot to production.

It is a single-page static site with no build step, no frameworks and no external dependencies. It is served by GitHub Pages straight from the repository root.

- Live URL: <https://brekka.ai/> (custom domain connected, HTTPS enforced)
- GitHub Pages address: <https://schenfb.github.io/brekka-site/> (returns a 301 redirect to `https://brekka.ai/`; it does not serve the site itself)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole page: hero, what we do, how we work, why Brekka, team, contact, footer |
| `styles.css` | All styling, including the responsive layout |
| `script.js` | Mobile menu and the header hairline on scroll |
| `favicon.svg` | The "B" mark, and the source for the icon files below |
| `favicon.ico`, `favicon-32.png`, `favicon-192.png` | Icon fallbacks for browsers that do not use the SVG |
| `apple-touch-icon.png` | iOS home-screen icon, 180 × 180 |
| `og-image.png` | Social preview image, 1200 × 630, referenced by `og:image` |
| `og-image.svg` | Source artwork for `og-image.png` |

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Diagram grammar

The hero diagram, the method timeline and the social image share one visual grammar. Keep any new diagram inside it.

| Element | Meaning |
| --- | --- |
| Outlined node | A stage |
| Copper filled node | The production milestone |
| Dashed line | Exploratory leg, up to the pilot |
| Solid line | Committed leg, from the pilot on |

Copper is reserved for this path and milestone, the section markers, and link and button hover. It is not used as decoration. The same note sits at the top of `styles.css`, along with the type roles (serif display for H1/H2 and the names in Team, sans semibold for titles, sans regular for prose, mono for labels).

The hero diagram exists twice in `index.html`: a detailed plate for wider screens and a simplified one with larger labels at 760px and below. CSS displays exactly one, so only one is exposed to assistive technology. Change both when the diagram changes.

## Behaviour without JavaScript

No content depends on `script.js`. Nothing is hidden by CSS pending a script, and there is no scroll-reveal effect.

The only script-dependent state is the collapsed mobile menu. `script.js` adds a `nav-ready` class to `<html>` as its last step, after the menu button is wired up, and the CSS collapses the navigation only under that class. If the script is blocked, fails to load or stops early, small screens get a plain header with all links visible and wrapping under the wordmark, and that header scrolls with the page instead of sticking.

To check: block `script.js` in the browser's dev tools (or disable JavaScript), reload at 375px wide, and confirm every section is visible and every navigation link works.

## Deploy

In the repository settings, under **Pages**, set the source to the default branch and the `/ (root)` folder. Every push to that branch publishes the site.

## Custom domain

`brekka.ai` is connected and serving the site. The configuration has three parts, listed here for anyone who has to rebuild it:

1. **`CNAME` file.** GitHub Pages reads the custom domain from a file named `CNAME` in the repository root containing the single line `brekka.ai`. Deleting it disconnects the domain.
2. **DNS.** The apex domain needs `A`/`AAAA` records pointing to the GitHub Pages IP addresses listed in GitHub's documentation, and `www` needs a `CNAME` record pointing to `schenfb.github.io`.
3. **Pages settings.** The custom domain is confirmed in the repository's Pages settings and **Enforce HTTPS** is turned on. On a rebuild, that option only becomes available once GitHub has issued the certificate.

Resulting behaviour, verified on 2026-11-23: `https://brekka.ai/` serves the site with a valid certificate, and `http://brekka.ai/`, `http://www.brekka.ai/`, `https://www.brekka.ai/` and `https://schenfb.github.io/brekka-site/` each return a 301 redirect to it.

## Launch checklist

- [x] **Canonical and Open Graph URLs.** Done. `index.html` points `<link rel="canonical">` and `og:url` at `https://brekka.ai/`, and `og:image` and `twitter:image` at `https://brekka.ai/og-image.png`.
- [x] **DNS and HTTPS.** Done, verified on 2026-11-23. `https://brekka.ai/` loaded the site with a valid certificate, and `http://brekka.ai/`, `http://www.brekka.ai/` and `https://www.brekka.ai/` each redirected to it with a 301.
- [ ] **Mailbox.** `hello@brekka.ai` exists and receives mail from an outside account. Every call to action on the page is a `mailto:` link to that address.
- [ ] **Social preview image.** `og:image` and `twitter:image` point to `og-image.png`. Confirm it has been regenerated from the current `og-image.svg`, then check the rendered card with a link-preview debugger (LinkedIn Post Inspector or similar) after deployment.
- [ ] **Icons.** The ICO, PNG and Apple touch icon fallbacks are linked in the `<head>`. Confirm the tab icon in a browser and the home-screen icon on iOS, and check the mark is legible at 16px.
- [ ] **Headline line breaks.** The H1 is set in a system serif and breaks after "AI". Check it at desktop width and at 375px on macOS, Windows, iOS and Android: "We take enterprise AI" should sit on one line.
- [ ] **Mobile and keyboard pass.** At 375px wide: open and close the menu by touch and by keyboard (Tab, Enter, Escape), follow each navigation link and confirm the heading is not hidden under the header, and tab through the whole page checking that focus is always visible, including on buttons while hovered. Repeat with `script.js` blocked. Resize across the 760px breakpoint with focus on the menu button and on each "Talk to us" control.
- [ ] **Print.** Print preview at a narrow width still shows the navigation links.
- [ ] **Copy sign-off.** The credential line in the hero, the incorporation and focus-markets row under "Why Brekka" and the description of the diagnostic in the contact section are public commitments. Confirm each is accurate on the day of launch.

## Known limitations

- **Generated images are exports, not sources.** `og-image.png` is regenerated from `og-image.svg` with cairosvg:

  ```sh
  python3 -c "import cairosvg; cairosvg.svg2png(url='og-image.svg', write_to='og-image.png', output_width=1200, output_height=630)"
  ```

  The icon files are exported from `favicon.svg` the same way, at the sizes in the file table. If either SVG changes, regenerate the matching files at the same sizes and names. `og-image.svg` uses system fonts (a serif for the headline), so check a new export looks right on the machine that produces it.
- **Not browser-tested by the author.** The layout was written without a browser to render it. The checklist items above are the real test.

## Editing

- **Copy** lives in `index.html`.
- **Colours, type and spacing** are custom properties at the top of `styles.css`. To return the headings to sans-serif, set `--font-display` to the same stack as `--font-sans`.
- **Contact address** is `hello@brekka.ai`, used in the contact section and the footer.
- **Copyright year** is hard-coded as 2026 in the footer of `index.html` (`© 2026 Brekka`). Update it by hand each January. It is deliberately not set by script.
