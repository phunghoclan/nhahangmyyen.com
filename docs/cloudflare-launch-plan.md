# Mỹ Yến hosting and launch plan

This document records the staged migration plan. Production remains unchanged until the comparison gate is complete.

## Phase 1 — plan and inventory

- Keep `nhahangmyyen.com` registered with the current registrar.
- Preserve all mail DNS records and the `nhahangmyyen88@gmail.com` workflow.
- Keep GitHub as the source of truth and GitHub Pages as the rollback path.
- Deploy a curated public build so internal `docs/` and `google-apps-script/` files are not publicly copied.
- Keep the existing Google Apps Script, Sheets, Calendar, staff email, guest acknowledgement, and confirmation workflow unchanged.

## Phase 2 — draft code

### Public build

The build will copy the six public HTML pages, shared CSS and JavaScript, SEO files, and `assets/*` into `dist/`. It will exclude `docs/`, `google-apps-script/`, `README.md`, and `CNAME`.

### Cloudflare configuration draft

```jsonc
{
  "name": "myyen-website",
  "compatibility_date": "2026-10-02",
  "assets": {
    "directory": "./dist"
  }
}
```

### Security headers draft

```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-src 'self' https://script.google.com https://*.googleusercontent.com; form-action 'self' https://script.google.com
```

This header is only enabled after testing the iframe-based reservation form.

### Deployment draft

The final workflow will build the curated public output, run validation, and deploy to Cloudflare. Account-specific names and secrets will be verified before enabling automation.

## Phase 3 — compare and sync

- Confirm all six page paths remain unchanged.
- Confirm every local image, stylesheet, script, and SEO file resolves.
- Confirm the Apps Script endpoint is unchanged.
- Confirm canonical URLs remain `https://nhahangmyyen.com`.
- Confirm Vietnamese copy, mobile navigation, phone, Zalo, Maps, Facebook, and Instagram links remain available.
- Confirm internal documents and scripts are excluded from the Cloudflare build.
- Confirm reservation form submission, staff notification, guest acknowledgement, and calendar confirmation remain intact.
- Confirm root domain, `www`, HTTPS, images, and rollback path after preview deployment.
- Keep online ordering deferred until the reservation and catering lead workflow is stable.

## Phase 4 — implementation order

1. Sign in to Cloudflare and verify the account.
2. Create the Worker Static Assets project without changing the public domain.
3. Add the build files and local checks.
4. Deploy and test the temporary `workers.dev` address.
5. Attach the custom domain only after the preview passes.
6. Verify HTTPS, public pages, assets, reservation submission, staff email, guest acknowledgement, and calendar behavior.
7. Keep GitHub Pages available as rollback.
8. Add analytics and conversion tracking after launch verification.
