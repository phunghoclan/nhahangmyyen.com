# Nhà Hàng Mỹ Yến website

Static marketing site for [nhahangmyyen.com](https://nhahangmyyen.com), published through Cloudflare Workers static assets.

## Local check

```sh
sh scripts/build-site.sh
```

The finished site is created in `dist/`. The build checks all local page and asset links.

## Publish

```sh
npx wrangler deploy
```

The configured domains are `nhahangmyyen.com` and `www.nhahangmyyen.com`.

## Public customer contact

The public site does not accept orders or reservations through a form. Visitors are directed to:

- Zalo: `0948 900 488`
- Phone: `0948 900 488`
- Google Maps / direct visit

## Before future content updates

Confirm every listed menu item, price, event package, capacity, and service detail with the restaurant team. The source menu photos use handwritten price stickers, so fixed prices are intentionally not published yet.
