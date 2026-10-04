# Mỹ Yến: business and website direction

## Current purpose

The website is the restaurant’s clear first point of contact. It should help a customer understand whether Mỹ Yến suits their occasion, prepare the right details, and start an efficient Zalo or phone conversation.

It is not an automatic reservation or ordering system. The restaurant confirms availability, menu, price, and final arrangements directly.

## Priority customer journeys

| Journey | Customer outcome | Staff receives |
| --- | --- | --- |
| Table dining | A concise request with date, time, group size, and space preference | A Zalo-ready request to check availability |
| Events and large groups | A structured starting point for a celebration or company event | Occasion, group size, date/time, and preferred space |
| Corporate catering | A qualified inquiry for recurring or event-based meals | Company name, organization type, meal need, volume, term, dates, and notes |
| Takeaway | A simple way to begin a prepared-food inquiry | Occasion, serving size, preferred menu direction, and pickup time |

## Current product decisions

- Primary language: Vietnamese.
- Primary contact channels: Zalo `0948 900 488`, phone `0948 900 488`, and direct visit.
- Response promise: 30–60 minutes during operating hours.
- Website style: minimal, elegant, warm, and mobile-first.
- Customer language: direct, clear, and considerate; speak to “bạn”.
- The site should reduce coordination work for group organizers while remaining simple for staff.

## Next content phase

When the restaurant provides approved menu data and real photos:

1. Build the full digital menu by category, occasion, and group suitability.
2. Add dish selection to dining and takeaway request helpers.
3. Generate a complete Zalo-ready request containing selected dishes and logistics.
4. Replace visual placeholders with verified photography of food, spaces, and events.
5. Keep prices and availability confirmed by staff until a deliberate ordering and payment policy is approved.

## Banquet menu release — October 2026

- 34 prepared menus from the restaurant’s Canva Tiệc 2026 deck, six reference price tiers, 10 guests/table.
- Menu codes, dish lists, and prices live in `assets/banquet-menus.json`; `scripts/render-banquet.mjs` updates menu cards and event-helper choices during the build.
- Customers select a menu, add logistics, services and notes, then copy the request into Zalo. Nothing is submitted automatically. Draft details stay only in session storage in their browser tab.
- Wedding offers are described generally; exact promotional entitlements are pending confirmation.
- Before publishing detailed offers: confirm current prices, VAT, drinks/services inclusion, expiry, and the missing exactly-50-table promotion bracket.
- Preserve source-specific dish names pending kitchen review: “Gà tiềm Trúc Xinh”, “Sò mực xào XO” (4E), “Chả giò Long Nhãn” (5C). Obvious spelling and typography were normalized.
- Canva’s address differs from the existing site and its EMAIL field is a domain. Existing contact details retained pending verification.
