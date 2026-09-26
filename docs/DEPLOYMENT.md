# Deployment

## Current Status

Production hosting has been migrated to Firebase Hosting and verified on the live custom domain.

Known context:

- The website is a static HTML/CSS/JavaScript site.
- Firebase Hosting is the production static host.
- Cloudflare remains the DNS provider.
- The previous home-hosted setup is retained only as a fallback/rollback option.
- Cloud Run is not needed for the current static site.
- The repository should remain the source of truth for production files.

## Firebase Hosting Direction

Use classic Firebase Hosting for the current site.

Official references:

- Firebase Hosting quickstart: `https://firebase.google.com/docs/hosting/quickstart`
- Firebase Hosting GitHub integration: `https://firebase.google.com/docs/hosting/github-integration`
- Firebase Hosting custom domain setup: `https://firebase.google.com/docs/hosting/custom-domain`

Current repo preparation:

- `firebase.json` is present at the repository root.
- `hosting.public` is set to `.` because production files currently live at the repo root.
- `cleanUrls` and `trailingSlash` are enabled.
- No single-page-app rewrite is configured.
- `.firebaserc` links the repository to the Firebase project `rest-assured-afh-website`.
- Preview channel `setup-preview` has been deployed and validated.
- The live custom domain `restassuredafh.com` has been connected and verified.

Current `.firebaserc` shape:

```json
{
  "projects": {
    "default": "rest-assured-afh-website"
  }
}
```

## Firebase Config Behavior

The current `firebase.json` is configured to deploy only public site assets from the root while excluding project and documentation files.

Excluded from public deployment:

- Git metadata and local editor files.
- `docs/**`.
- `business_card/**`.
- `README.md`.
- `AGENTS.md`.
- Firebase local state and debug logs.

Caching approach:

- `/assets/**` uses long-lived immutable caching.
- `style.css`, `home-refresh.css`, and `script.js` use `public, max-age=0, must-revalidate` because filenames are not content-hashed. Browsers may store these files but must revalidate before reusing them; unchanged files can return 304 responses.
- HTML references these files with `?v=20260926` to bypass copies stored under the earlier one-hour cache policy. This changes the request URL without adding a build step. Future edits at the same URL rely on revalidation after this policy is deployed.
- HTML, `robots.txt`, `sitemap.xml`, and `downloads/contact.vcf` use conservative revalidation.

Validated preview URL:

```text
https://rest-assured-afh-website--setup-preview-yw7ylqac.web.app/
```

Preview channel expiration:

```text
2026-06-13 21:00:02
```

Validated preview checks:

- `/` returns `200`.
- `/save-contact/` returns `200`.
- `/downloads/contact.vcf` returns `200`.
- `/robots.txt` returns `200`.
- `/sitemap.xml` returns `200`.
- `docs/TODO.md`, `README.md`, `business_card/website_qr.svg`, `firebase.json`, and `.firebaserc` return `404`.
- Homepage, gallery/lightbox, save-contact page, contact buttons, and vCard download were manually checked in browser.

The Firebase preview response includes `x-robots-tag: noindex`, which is appropriate for a temporary test URL.

## Manual Setup Workflow

Run these after the Firebase CLI is available.

1. Install Firebase CLI if it is not installed.

```bash
npm install -g firebase-tools
```

2. Sign in.

```bash
firebase login
```

3. Confirm the selected Firebase project:

```bash
firebase use
```

Expected project:

```text
rest-assured-afh-website
```

4. Test locally.

```bash
firebase emulators:start --only hosting
```

5. Deploy to a preview channel first.

```bash
firebase hosting:channel:deploy preview
```

6. Test the Firebase-generated preview URL before any production DNS change.

Note: The preview deploy may warn that it cannot sync Firebase Auth domains if Firebase Authentication is not configured. That warning is acceptable for this static site because it does not use Firebase Auth.

## GitHub Deployment Direction

CI/CD is configured through Firebase Hosting GitHub integration.

Generated workflow files:

- `.github/workflows/firebase-hosting-pull-request.yml`
- `.github/workflows/firebase-hosting-merge.yml`

Workflow behavior:

- Pull requests from this repository create Firebase Hosting preview deployments.
- Pushes to `main` deploy to the Firebase Hosting live channel.
- No build step runs because this is a static site without a build system.
- Deployment credentials are stored in GitHub as `FIREBASE_SERVICE_ACCOUNT_REST_ASSURED_AFH_WEBSITE`.
- No service account JSON file is committed to the repository.
- The first pull request preview workflow and first `main` live deployment workflow completed successfully.

Firebase CLI setup command used:

```bash
firebase init hosting:github
```

The Firebase CLI GitHub OAuth authorization can be revoked here after setup if desired:

```text
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
```

## Custom Domain Migration

Firebase Hosting is connected to the live custom domain.

Target domain:

```text
restassuredafh.com
```

Current DNS shape:

- `restassuredafh.com` uses an `A` record to `199.36.158.100`.
- `www.restassuredafh.com` uses a `CNAME` record to `rest-assured-afh-website.web.app`.
- Firebase redirects `www.restassuredafh.com` to `https://restassuredafh.com/`.
- Firebase's TXT verification record remains in DNS.
- The existing Google Search Console TXT verification record remains in DNS.
- Firebase website records are currently DNS-only in Cloudflare so Firebase can manage certificates directly.
- Do not add old Cloudflare/home-origin `A` or `AAAA` records back to the Firebase-hosted domain.

Post-migration smoke checks:

```bash
curl -I https://restassuredafh.com/
curl -I https://restassuredafh.com/save-contact/
curl -I https://restassuredafh.com/downloads/contact.vcf
curl -I https://restassuredafh.com/robots.txt
curl -I https://restassuredafh.com/sitemap.xml
```

Also verify in a browser:

- Homepage loads.
- Real photos and logo assets load.
- Save-contact page works.
- vCard download works.
- Map and external links still behave correctly.
- Canonical URLs still point to `https://restassuredafh.com/`.

Validated production checks on 2026-06-06:

- `https://restassuredafh.com/` returns `200`.
- `https://www.restassuredafh.com/` returns `301` to `https://restassuredafh.com/`.
- `https://restassuredafh.com/save-contact/` returns `200`.
- `https://restassuredafh.com/downloads/contact.vcf` returns `200`.
- `https://restassuredafh.com/robots.txt` returns `200`.
- `https://restassuredafh.com/sitemap.xml` returns `200`.

## Cloudflare Direction

Cloudflare remains responsible for DNS. The Firebase Hosting records are currently set to DNS-only.

Official reference:

- Cloudflare Full strict SSL mode: `https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/`

Recommended settings to preserve or verify:

- SSL/TLS mode: Full (strict) if Cloudflare proxying is later enabled.
- Always Use HTTPS enabled if tested.
- Brotli enabled.
- HTTP/2 enabled.
- HTTP/3 enabled if available and tested.
- Rocket Loader off unless specifically tested.
- Do not aggressively cache HTML until deployment behavior is proven.
- Do not enable the Cloudflare proxy for Firebase Hosting records without retesting certificate provisioning, redirects, and cache behavior.

## Rollback Plan

Before changing DNS, record the current production DNS records and hosting route.

If Firebase custom-domain migration fails:

- Revert Cloudflare DNS records to the previous production origin.
- Purge Cloudflare cache if needed.
- Confirm `/`, `/save-contact/`, `robots.txt`, `sitemap.xml`, and `downloads/contact.vcf` return `200`.
- Leave Firebase preview/live site intact for debugging unless it is actively causing a conflict.

Fallback hosting note:

- The old home-hosted setup may remain available as a fallback/rollback environment.
- It is not the active public production origin while Firebase Hosting is healthy.
- Do not publish private home-server IPs, credentials, tunnel details, or local network details in this public repository.
- If fallback activation is needed, record the operational steps in private notes and verify DNS, SSL, redirects, and all production smoke checks before relying on it.

## Future Operational Checks

- Confirm Cloudflare SSL/TLS mode remains Full (strict) if proxying is re-enabled.
- Re-test Firebase custom-domain behavior before enabling Cloudflare proxying on Firebase Hosting records.
- Use pull request preview deployments for future production-facing changes.
- Smoke-test production after each merge to `main`.
- Keep any home-server fallback activation runbook in private operational notes, not this public repository.
