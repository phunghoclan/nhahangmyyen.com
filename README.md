# Nhà Hàng Mỹ Yến website

Static first-version marketing site for `nhahangmyyen.com`.

The folder is ready for GitHub Pages. `CNAME`, `.nojekyll`, `robots.txt`, and
`sitemap.xml` are included for the restaurant's canonical domain.

## Publishing on GitHub Pages

1. Create a GitHub repository and upload this folder's contents.
2. In repository Settings, enable GitHub Pages from the `main` branch and `/ (root)`.
3. Add `nhahangmyyen.com` as the custom domain.
4. At the domain registrar, configure the DNS records GitHub Pages provides, then enable HTTPS.

## Before the public launch

- Deploy and configure the approval-based Google request workflow in `google-apps-script/`. It sends staff an alert and a guest acknowledgement; calendar events are created only after staff confirms the booking.
- Confirm restaurant phone number, opening hours, address, social links, map URL, and reservation rules.
- Confirm each currently listed menu item and price. The source menu photos use handwritten stickers, so prices are intentionally not published in this version.
