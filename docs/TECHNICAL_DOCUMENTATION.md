# Technical Documentation

## Current Verified State

- The website is a static HTML/CSS/JavaScript site.
- Core production files include `index.html`, `404.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml`, `save-contact/index.html`, and `downloads/contact.vcf`.
- Image and brand assets are stored under `assets/`.
- Business card and QR assets are stored under `business_card/`.

## Architecture

- The homepage is served from `index.html`.
- Missing routes are handled by the branded `404.html` page on Firebase Hosting.
- The save-contact workflow is served from `save-contact/index.html`.
- The downloadable contact card is stored at `downloads/contact.vcf`.
- Shared styling is primarily in `style.css`.
- `home-refresh.css` contains the homepage refresh overrides and loads after `style.css`.
- Shared interaction behavior is in `script.js`.
- Static SEO files are `robots.txt` and `sitemap.xml`.

## Current Features

- Responsive static website for Rest Assured AFH.
- Real home photo gallery with lightbox behavior.
- Save-contact page for QR workflows.
- Branded visitor-facing 404 page.
- Mobile navigation toggle changes from hamburger to close icon while open.
- vCard download for Eden Tesfay and Rest Assured AFH.
- Basic local SEO metadata, structured data, sitemap, and robots file.
- Business card QR assets for the website and save-contact page.
- Optimized and responsive image assets where currently implemented.

## Asset Notes

- Real home photos use `assets/real-*` naming.
- Logo and favicon assets are split between top-level `assets/` files and `assets/logo/`.
- Owner portrait assets are stored under `assets/owner/`.
- The custom 404 illustration is stored at `assets/404-sleeping-dog.svg`.
- The homepage retains its original header emblem and `assets/logo-v23-full-display.webp` banner. A sharper vector replacement must preserve the existing mobile banner composition and dimensions; this asset-only improvement remains pending.
- Older PNG/JPG files are still present for safety; current HTML generally prefers optimized WebP files where available.

## Known Cleanup Items

- Nurse-led wording is approved based on client confirmation that Eden Tesfay is a licensed nurse with a degree.
- Do not remove nurse-led positioning unless the client changes this direction.
- Do not specify an exact credential type or degree name, such as RN, LPN, BSN, or another title, until the exact credential wording is provided.
- Replace any non-numeric image `height` attributes when site-code cleanup is approved.
- The homepage now loads `script.js` with `defer`. A small head script selects the JavaScript-enabled mobile navigation layout before first paint to avoid a header layout shift.

## September 2026 Visual Refresh

Working branch: `feat/modern-website-refresh`. This is a local design preview, not a confirmed production deployment.

- The first photo-led hero and taller header were rejected by the user and reverted. The original header and image sources remain in use. Mobile header height, banner dimensions, spacing, and order must remain unchanged.
- Surface polish includes Montserrat headings, Inter body text, restrained 8px radii on cards/buttons, lighter shadows, accessible sage/gold-adjacent colors, and subtle motion. The mobile logo showcase keeps its existing geometry and styling.
- The introductory exterior/interior photo frames and adjacent quote panel use 8px radii at every breakpoint, without changing their dimensions. Focus outlines remain visible outside the clipped photo frames.
- At viewport widths of 1100px and above, `.home-intro` places the existing logo beside the original introductory copy and contact actions, with the existing photos below. No text or controls are duplicated. Below this breakpoint, the wrapper uses `display: contents` and the previous mobile/tablet sequence is preserved. Desktop presentation is unframed; the mobile logo frame is unchanged.
- The skip link is a keyboard accessibility control, not a permanent navigation button. It is visually clipped unless `:focus-visible` matches; Tab reveals it, Enter focuses `main#top`, and moving focus away hides it again. Pointer-only focus does not reveal it.
- Existing business copy, original H1, contact links, SEO metadata, canonical URL, JSON-LD, and QR/vCard targets are preserved.
- Shared typography also applies to the save-contact and 404 pages; their content and layouts are otherwise unchanged.
- Scroll reveals run once, use opacity/transform, and leave content visible without JavaScript. Reduced-motion preferences are respected.
- Mobile navigation supports Escape, outside clicks, link selection, and viewport changes. Without JavaScript, navigation links remain visible.
- No runtime package dependencies, build step, hosting configuration, or production deployment were added.

The previously reported 97-point Lighthouse result belonged to the rejected photo-hero prototype. The latest local gzip-served runs with the desktop addition scored 99 performance and 100 accessibility, best practices, and SEO on both desktop and mobile, with CLS 0 on desktop and 0.019 on mobile. The original logo dimensions are reserved before image decoding with block layout and a 3:2 aspect ratio; final mobile banner geometry is unchanged. These are individual local lab results, not production guarantees. Recheck the Firebase PR preview before merge.

Corrected-version checks passed at widths 320, 390, 768, 1024, 1440, and 1920 pixels with no horizontal document overflow or missing images. At 320 and 390 pixels, the mobile header is exactly 53px high, and the banner's position and dimensions match `HEAD`. Menu/lightbox interactions, reduced motion, no-JavaScript behavior, preserved content/metadata, and static contact/SEO routes passed. Automated axe A/AA checks found no violations on the homepage, save-contact, and 404 pages at mobile and desktop widths; this is not a complete accessibility audit. Temporary test tooling stays outside the repository and is not deployed.

The desktop addition was checked at 320, 390, 760, 1024, 1099, 1100, 1280, 1440, and 1920px. Mobile geometry remains unchanged; at desktop widths, logo/text do not overlap and contact actions plus the start of the photo row fit in the first viewport, including 1280x720. Skip-link focus behavior passed, and homepage axe A/AA checks found no violations at 390px and 1280px.

## Pending Documentation

- Document exact image optimization workflow.
