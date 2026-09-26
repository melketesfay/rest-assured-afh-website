# AI Handoff — Rest Assured AFH Website

## Purpose of this file

This file preserves project context for future AI coding sessions, especially Codex sessions running in VS Code or on another machine.

It is based on project discussions and known uploaded repository/documentation state. The current repository may have changed. Always inspect the repository before making edits.

## Project summary

**Rest Assured AFH Website** is a static production website for Rest Assured AFH, a licensed Adult Family Home in Everett, Washington.

The project serves two purposes:

1. A real public website for the business.
2. A professional portfolio-quality client project demonstrating web development, performance optimization, SEO, deployment, and operational thinking.

## Known business details

- Business: Rest Assured AFH
- Domain: `restassuredafh.com`
- Owner: Eden Tesfay
- Address: 5417 133rd St SE, Everett, WA 98208
- License: 758759
- Phone: +1 (425) 332-3455
- Mobile: +1 (206) 403-3838
- Email: restassuredafh@gmail.com
- Owner experience: 17+ years in healthcare
- Owner credential: licensed nurse with a degree. The exact public credential wording, such as RN, LPN, BSN, or another title, still needs explicit confirmation before using that abbreviation or degree name.
- Location focus: Everett, Silver Firs, nearby Seattle area where relevant
- Business type: licensed Adult Family Home / residential senior care

Known services/positioning:

- adult family home care
- residential senior care
- owner-led care
- licensed nurse-led care
- personal care
- medication assistance
- memory care support
- respite care
- hospice support
- meals/nutrition
- housekeeping/laundry
- calm, warm, home-like environment
- family-centered care
- dignity, comfort, communication, safety

## Known project history

The project has gone through multiple versions and polish phases.

Known historical work:

- Built a static site with real home photos and generated/cleaned branding assets.
- Added or discussed real photo gallery/lightbox behavior.
- Created or updated save-contact page.
- Created vCard/contact workflow.
- Created QR codes for website and save-contact page.
- Worked on business cards and QR placement.
- Added SEO foundation such as `robots.txt`, `sitemap.xml`, metadata, structured data.
- Added local business/owner structured data concepts.
- Performed performance optimization:
  - image optimization
  - WebP generation/usage
  - `width`/`height` image attributes
  - lazy loading
  - hero image tuning
  - stale preload removal
  - Nginx caching/compression when home-hosted
  - HTTP/2 discussion/use
- Reported Lighthouse results:
  - mobile performance reached 90+
  - desktop performance reached about 99
  - SEO/accessibility/best-practices scores reached around 100 after fixes
- Configured/used Cloudflare:
  - DNS/proxy
  - SSL/TLS Full (strict) was recommended
  - Brotli/HTTP2/HTTP3 were discussed
  - Rocket Loader was recommended off
  - managed robots/content-signal injection caused an SEO/Lighthouse issue and was disabled
- Investigated Cloudflare robots/autoconfig/autodiscover issues.
- Discussed Google Business Profile/local SEO strategy.
- Discussed migration away from home hosting to Firebase Hosting or Google Cloud.
- Added branded visitor-facing `404.html` page.
- Updated save-contact page with approved nurse-led wording.
- Updated the mobile navigation toggle so it changes from hamburger to close icon while open.

Do not assume every historical file still exists in the repo. Verify.

## Current known state

Known current files and folders:

- `README.md`
- `index.html`
- `404.html`
- `style.css`
- `script.js`
- `save-contact/index.html`
- `downloads/contact.vcf`
- `robots.txt`
- `sitemap.xml`
- `assets/` with real photos, generated images, logos, favicons, and possibly WebP variants
- `business_card/` with QR/business-card assets
- `docs/` with project, deployment, security, SEO, maintenance, and AI handoff docs

The README has been rewritten as a public project overview. Detailed technical/project-history records live in `docs/`.

## Current user goals

The repository foundation is complete. In September 2026, the user requested modern surface styling while preserving all business information and the sage/gold identity. The user rejected the first preview's taller header and photo-led hero. Preserve the original slim mobile header and logo banner; focus on radii, colors, Montserrat typography, and subtle motion. A desktop-only arrangement is now implemented from 1100px, with the existing logo beside the introduction and contact actions. See `NEXT_ACTIONS.md` and `../TECHNICAL_DOCUMENTATION.md` for the corrected working preview on `feat/modern-website-refresh`.

Completed foundation work:

- GitHub repository renamed to `rest-assured-afh-website`.
- README rewritten as a public project overview.
- Project documentation moved into `docs/`.
- AI memory files added under `docs/ai/`.
- Firebase Hosting configured for the static site.
- GitHub Actions/Firebase Hosting integration configured for PR previews and `main` deploys.
- `restassuredafh.com` connected to Firebase Hosting.
- `www.restassuredafh.com` redirects to `https://restassuredafh.com/`.
- Previous home-hosted setup is retained only as a fallback/rollback option.
- Branded visitor-facing 404 page added.
- Save-contact page updated with approved nurse-led wording.
- Mobile menu toggle polished to show a close icon while open.

Current priorities:

1. Review the corrected preview: original mobile header/banner preserved, with logo and introductory copy arranged side by side only from 1100px. The skip link appears only on keyboard focus.
2. Validate the Firebase PR preview before any approved merge/deployment.
3. Resume the pending local SEO visibility and Google Business Profile audit.
4. Update `docs/SEO_PLAN.md` with verified findings and implement legitimate local SEO improvements.
5. Extend the redesign only after feedback on the initial visual direction.

## Current SEO concern

User observed that Google local/map results show the business with a red place marker for some terms, e.g.:

- `adult family home everett wa`
- `adult family home everett seattle` / similar

But visibility is weaker or missing for broader/adjacent terms, e.g.:

- `adult care everett`
- `adult care silver firs`
- `adult care seattle`
- possibly other senior-care and residential-care terms

The user wants SEO to be more aggressive so more relevant searches lead to the business.

Important caution: local map pack rankings cannot be directly forced. Work must focus on legitimate local SEO:

- relevance
- distance/location alignment
- prominence
- Google Business Profile completeness
- reviews and owner responses
- local content
- structured data
- consistent NAP citations
- service and location relevance

No spam tactics.

## Current deployment state

The site is now hosted on Firebase Hosting with GitHub-based deployment.

Current stack:

- GitHub is the source of truth.
- Pull requests create Firebase Hosting preview deployments.
- Merges to `main` deploy to the Firebase Hosting live channel.
- Firebase Hosting serves the static site.
- `restassuredafh.com` is the live custom domain.
- `www.restassuredafh.com` redirects to `https://restassuredafh.com/`.
- Cloudflare remains DNS provider.
- Firebase Hosting records are currently DNS-only in Cloudflare so Firebase can manage certificates directly.
- The previous home-hosted setup is fallback/rollback only, not the active production origin.

## Known risks

### SEO risks

- Keyword stuffing could hurt credibility.
- Fake or incentivized reviews would be unethical and risky.
- Thin duplicated city/location pages can become doorway pages.
- Local SEO results vary by location, personalization, device, and search history.
- Google Business Profile changes may take time to affect rankings.

### Deployment risks

- Switching DNS/domain without a tested Firebase deployment could cause downtime.
- Cloudflare settings can break robots.txt, SSL, redirects, or caching.
- Firebase preview/live channels must be configured carefully.
- GitHub Actions secrets must not leak.
- Old home-hosted content and new Firebase content can diverge.

### Documentation risks

- Future sessions may miss recent state if these docs are not read.
- Future Codex sessions lack context unless these docs are maintained.

### Content/legal risks

- Do not invent care guarantees, medical claims, staff qualifications, availability, pricing, or testimonials.
- All claims must be grounded in provided business facts.

## Project Resume Note

Work resumed in September 2026 at the user's request. The current refresh is a working-branch preview, not a confirmed production deployment. Inspect the working tree before switching branches so uncommitted design changes are not lost or mistaken for production state.

## Suggested next safe working order after pause

1. Inspect repo state:
   - list files
   - read current README
   - inspect current `index.html`, `404.html`, `style.css`, `script.js`
   - inspect current `robots.txt`, `sitemap.xml`, structured data
2. Confirm the latest production deployment is healthy.
3. Perform SEO audit and Google Business Profile review.
4. Update `docs/SEO_PLAN.md` with verified findings.
5. Plan one focused local SEO implementation branch.
6. Follow the user-approved visual-refresh scope in `NEXT_ACTIONS.md`; the earlier SEO-first ordering has been superseded for the current branch only.

## Handoff instruction for future AI/Codex

Do not make broad changes based only on this file.

Start by inspecting the actual repository. Then propose a small concrete change. If you update project state, update these docs.
