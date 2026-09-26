# TODO

## Visual Refresh In Progress

September 2026, branch `feat/modern-website-refresh`: surface polish with the original slim mobile header and logo banner preserved. The user rejected the larger header/photo-hero layout. The SEO audit remains pending.

- [x] Restore the original header and logo-led hero after feedback; keep Montserrat and lightweight interaction improvements.
- [ ] Review the corrected radii, colors, shadows, and animation polish.
- [x] Add desktop-only logo/copy arrangement at 1100px and above, without changing mobile layout.
- [ ] Review the desktop addition in the local preview before merging.
- [ ] Prepare a sharper SVG banner that preserves the existing composition and mobile dimensions.
- [ ] Verify the Firebase PR preview and rerun Lighthouse before merge.
- [ ] Confirm production behavior after an approved merge.

## Current Priority

- [x] Rewrite `README.md` as a concise public project overview.
- [x] Move useful history from the old `README.md` into `docs/PROJECT_HISTORY.md`.
- [x] Move roadmap, security, deployment, and maintenance notes from the temporary roadmap README into the relevant docs.
- [x] Confirm current production hosting and Cloudflare DNS configuration.
- [x] Add initial Firebase Hosting repository config.
- [x] Create or select the Firebase project: `rest-assured-afh-website`.
- [x] Install and authenticate Firebase CLI.
- [x] Add `.firebaserc` after confirming the real Firebase project ID.
- [x] Run local Firebase Hosting preview.
- [x] Deploy to a Firebase preview channel.
- [x] Verify Firebase preview URL before DNS changes.
- [x] Plan GitHub Actions or Firebase GitHub deployment.
- [x] Configure Firebase Hosting GitHub integration for PR previews and `main` deploys.
- [x] Verify GitHub Actions PR preview workflow after opening this branch as a pull request.
- [x] Verify GitHub Actions live deploy workflow after merging to `main`.
- [x] Add `restassuredafh.com` as a Firebase Hosting custom domain after preview validation.
- [x] Configure `www.restassuredafh.com` to redirect to `https://restassuredafh.com/`.
- [x] Verify Cloudflare DNS records for Firebase Hosting.
- [x] Smoke-test production after DNS migration.
- [x] Decide to keep the old home-hosted setup as fallback/rollback only.
- [x] Confirm Cloudflare SSL/TLS mode remains Full strict if proxying is re-enabled.
- [x] Decide whether to revoke the Firebase CLI GitHub OAuth authorization after setup.
- [x] Keep any home-server fallback activation runbook in private operational notes.
- [x] Add final mobile menu close-icon polish.
- [ ] Audit current local SEO visibility and Google Business Profile.

## Site Follow-Ups To Review

- [x] Confirm "nurse-led" wording is approved and document Eden as a licensed nurse.
- [x] Add branded visitor-facing 404 page.
- [x] Update save-contact page with licensed nurse and nurse-led wording.
- [x] Change mobile hamburger button to a close icon while the menu is open.
- [ ] Fix non-numeric image height attributes if confirmed as a cleanup task.
- [x] Load homepage `script.js` with `defer` and avoid a first-paint mobile navigation layout shift in the refresh branch.

## Later

- [ ] Create the first local SEO landing page after copy is approved.
- [ ] Extend the visual refresh to the remaining sections after the first-stage design is approved.
- [ ] Consider analytics only if it supports clear business decisions.
