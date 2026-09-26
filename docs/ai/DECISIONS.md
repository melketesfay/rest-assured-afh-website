# Decisions — Rest Assured AFH Website

This file records known project decisions from prior work. Do not treat planned items as completed unless verified in the repository.

## Confirmed business/project decisions

### Project language

Decision: The website and project documentation should be in **English**.

Reason: The business and audience are US-facing.

### Site type

Decision: The site is a **static website**.

Reason: Current needs are informational: business presentation, contact, local SEO, photos, vCard/save-contact workflow, and hosting reliability. No backend is currently required for the core site.

### Business positioning

Decision: Position the business as a licensed, nurse-led Adult Family Home in Everett, WA, with a warm, home-like, family-centered care environment.

Known claims allowed:

- licensed Adult Family Home
- License #758759
- owner-led care
- nurse-led care
- Eden Tesfay is a licensed nurse with a degree
- Eden Tesfay has 17+ years in healthcare
- Everett / Silver Firs local relevance
- personal care, medication assistance, memory care support, respite care, hospice support, meals/nutrition, housekeeping/laundry

Do not invent additional claims. Do not use a specific credential abbreviation or degree title, such as RN, LPN, BSN, or another title, until the exact wording is confirmed.

### Domain

Decision: Use `restassuredafh.com` as the public domain.

### QR targets

Decision:

- Main website QR should target: `https://restassuredafh.com/`
- Save contact QR should target: `https://restassuredafh.com/save-contact/`
- The save-contact page can then trigger or link to `downloads/contact.vcf`.

Reason: A direct QR to a `.vcf` file is less user-friendly and less brand-building than a dedicated save-contact page.

### Owner content

Decision: Include nurse-led and owner-led trust messaging around Eden Tesfay and 17+ years of healthcare experience.

Known prior owner-section direction:

- “Meet the Owner”
- “Experienced care, personally led.”
- calm, responsible, personal approach
- daily routines, communication with families, comfort, dignity, well-being
- quote concept: giving families peace of mind that loved ones are safe, respected, and cared for with patience and dignity

Do not invent a medical title or license for Eden unless provided.

## Technical decisions

### Static hosting direction

Decision: Use **Firebase Hosting** rather than Cloud Run for the current static site.

Reason:

- Current site is static.
- Firebase Hosting fits static assets, SSL, custom domain, preview channels, and GitHub integration.
- Cloud Run is better suited for containers, APIs, dynamic apps, or future backend services.

Cloud Run remains a possible future option if backend/API functionality is added.

### Deployment direction

Decision: Use CI/CD from GitHub through Firebase Hosting GitHub integration.

Current behavior:

- pull requests create Firebase Hosting preview deployments
- merges to `main` deploy to the Firebase Hosting live channel
- `restassuredafh.com` is connected as the live custom domain
- `www.restassuredafh.com` redirects to `https://restassuredafh.com/`
- deployment should be documented in `docs/DEPLOYMENT.md`

Deployment credentials are stored in GitHub Secrets through the Firebase/GitHub integration. No service account JSON file should be committed.

### Cloudflare

Decision: Use Cloudflare carefully as DNS provider and, where appropriate, CDN/proxy layer.

Known prior recommendations:

- SSL/TLS should be Full (strict), not Flexible.
- Brotli ON.
- HTTP/2 ON.
- HTTP/3 ON if available.
- Rocket Loader OFF unless specifically tested.
- Cache static assets.
- Do not cache HTML aggressively until the deployment model is clear.
- Avoid Cloudflare-managed robots/content-signal injection if it causes SEO validation issues.
- Firebase Hosting records are currently DNS-only in Cloudflare so Firebase can manage certificates directly.
- Do not re-enable Cloudflare proxying for Firebase Hosting records without retesting certificates, redirects, caching, and contact/vCard routes.

Known issue: Cloudflare managed Content Signals previously inserted a robots/content-signal directive that Lighthouse flagged. Disabling it restored SEO score.

### Performance

Decision: Preserve prior performance work.

Known baseline from prior discussion:

- Mobile Lighthouse performance reached 90+ after image/server optimizations.
- Desktop performance reached about 99.
- SEO/accessibility/best-practices scores reached around 100 after fixes.

Decision: Future performance work should focus on hosting/CDN/cache/deployment rather than degrading visual quality further.

### Images

Decision: Use optimized image assets and preserve width/height/lazy loading patterns where possible.

Known prior work included:

- WebP conversion
- targeted hero image tuning
- real photo integration
- lightbox behavior
- favicon/logo optimization

### Branded 404 page

Decision: Use a branded visitor-facing `404.html` instead of the default Firebase Hosting error page.

Reason: Missing routes should not show developer-oriented Firebase copy to families or other public visitors.

Current implementation:

- `404.html`
- `assets/404-sleeping-dog.svg`

### Mobile navigation toggle

Decision: The mobile hamburger button should visually change to a close icon while the menu is open and keep its ARIA state in sync.

Reason: This improves mobile usability and accessibility without changing the site layout.

### Repo name

Decision: Use a professional, descriptive repository name.

Current repository:

```text
rest-assured-afh-website
```

## Documentation decisions

### README

Decision: Rewrite `README.md` as a public-facing project overview.

Audience:

- potential employers
- clients
- developers reviewing portfolio quality
- future maintainers

README should not be the full project diary.

### Technical/progress documentation

Decision: Move detailed implementation history, decisions, and operations notes into `docs/`.

Recommended docs:

```text
docs/TECHNICAL_DOCUMENTATION.md
docs/PROJECT_HISTORY.md
docs/DEPLOYMENT.md
docs/SEO_PLAN.md
docs/MAINTENANCE.md
docs/SECURITY.md
docs/TODO.md
```

### AI context

Decision: Add AI memory/handoff files:

```text
AGENTS.md
docs/ai/HANDOFF.md
docs/ai/DECISIONS.md
docs/ai/NEXT_ACTIONS.md
```

Reason: Future Codex/AI sessions in VS Code or on another machine need repository context without relying on this ChatGPT conversation.

## SEO decisions

### SEO before design V2

Decision: SEO and deployment/documentation should be handled before a larger V2 design overhaul.

Reason: Better design does not solve discoverability or operational quality. Local SEO and reliable deployment are higher priority.

### September 2026 user-requested visual refresh

The user explicitly requested a modern visual update before resuming SEO work. This supersedes the earlier ordering for the current branch, not the requirement for a future SEO audit. Work is on `feat/modern-website-refresh`.

User clarification: modernization means radii, colors, typography, and subtle animations, not a wholesale replacement of the layout. The taller navigation and photo-led hero were rejected. Preserve the original slim mobile header and logo-led banner, including dimensions, spacing, and content order. The original layout has been restored; do not reintroduce the rejected design.

The user subsequently requested the desktop addition. At 1100px and above, the original logo and introductory text/contact actions are arranged side by side without decorative containers; the existing photos follow below. The same DOM content is reused, and mobile layout remains unchanged. Keep the skip-to-content link for keyboard access and reveal it only while focused.

A sharper SVG banner should reproduce the existing composition, not introduce a different layout. Preserve all business information and the established sage/gold identity. Keep Montserrat headings, Inter body text, lightweight animation, reduced-motion support, and usable content/navigation without JavaScript. No framework, new runtime dependency, or deployment change is required.

### Local SEO approach

Decision: Use legitimate but assertive local SEO.

Allowed work:

- keyword research and tracking
- on-page SEO improvements
- title/meta improvements
- structured data
- service descriptions
- local landing page
- Google Business Profile audit
- photo/review strategy
- NAP consistency
- local citations

Not allowed:

- keyword stuffing
- fake reviews
- fake locations
- unsupported “best” claims
- duplicate doorway pages
- changing business name to keyword spam

### First local landing page

Decision/planned: Create one strong local landing page first:

```text
/adult-family-home-everett-wa/
```

Possible later page:

```text
/adult-family-home-silver-firs-wa/
```

Only create the second page if it can be substantially useful and not duplicate/thin.

## Current known unresolved decisions

These need verification or final choice:

1. Whether Cloudflare proxying should remain off for Firebase Hosting records or be re-tested later.
2. Whether to create a separate SEO landing page before broader on-page SEO changes.
3. Current Google Business Profile category/service configuration.
4. Whether a Search Console property already exists and is fully verified.
5. Whether Analytics is desired.
6. Whether the home-server fallback runbook should be maintained in private operational notes.
