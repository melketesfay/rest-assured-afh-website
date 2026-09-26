# Next Actions — Rest Assured AFH Website

This file lists concrete next actions for future AI sessions. Keep it short and move completed work into `docs/PROJECT_HISTORY.md` or the relevant documentation file.

## Current State

- Repository name: `rest-assured-afh-website`.
- Production domain: `https://restassuredafh.com/`.
- Static host: Firebase Hosting.
- Deployment: Firebase Hosting GitHub integration.
- PR behavior: Firebase preview deploys.
- `main` behavior: Firebase live-channel deploy.
- DNS provider: Cloudflare.
- `www.restassuredafh.com` redirects to `https://restassuredafh.com/`.
- Previous home-hosted setup is fallback/rollback only, not active public production.
- Branded `404.html` page exists for missing routes.
- Save-contact page uses approved licensed nurse/nurse-led wording.
- Mobile menu button changes from hamburger to close icon while open.

## Active Design Preview

Work resumed at the user's request in September 2026 on `feat/modern-website-refresh`. The user rejected the taller header and photo-led hero; the original header and logo showcase have been restored. Preserve the slim mobile header and existing mobile banner dimensions, spacing, and order. Modernization should focus on radii, colors, typography, and animations. Business information and the sage/gold identity must remain intact. Local changes are not yet confirmed merged or deployed.

## Immediate Actions

1. Review the desktop-only addition: from 1100px, the existing logo sits beside the original introduction/contact actions, with photos below. Mobile keeps its original layout. The keyboard skip link is only visible on focus. A sharper SVG version of the existing banner is still pending.
2. Recheck the Firebase PR preview on desktop/mobile, including Lighthouse, navigation, gallery, save-contact, and 404 behavior before merging.
3. Resume the local SEO/Google Business Profile audit; it has not been completed by this visual update.
4. Update `docs/SEO_PLAN.md` only with verified search and GBP observations.
5. Check non-numeric image height attributes separately without changing image proportions unintentionally.

## SEO Next Actions

1. Audit current local SEO visibility and Google Business Profile.
2. Update `docs/SEO_PLAN.md` with verified search observations.
3. Plan the first legitimate local landing page, likely `/adult-family-home-everett-wa/`.
4. Implement local SEO copy only from verified business facts.

## Guardrails

- Do not invent medical claims, staff credentials, reviews, pricing, availability, or guarantees.
- Do not expose private home-server details in public docs.
- Do not commit secrets, service account JSON files, `.env`, or Firebase tokens.
- Preserve Firebase Hosting, GitHub Actions, contact/vCard, SEO, accessibility, and performance behavior unless a requested task requires a change.
