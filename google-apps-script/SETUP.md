# Reservation and inquiry workflow

## What this does

1. A website inquiry is stored in a Google Sheet.
2. `nhahangmyyen88@gmail.com` receives a staff alert.
3. A guest receives an acknowledgement only if they supplied an email.
4. Staff checks availability, contacts the guest, then creates a calendar event only after confirmation.

This preserves the distinction between **request received** and **booking confirmed**.

## One-time setup

1. Sign in as `nhahangmyyen88@gmail.com` and open Google Apps Script.
2. Create a project named `Mỹ Yến Website Requests` and replace its default code with `Code.gs`.
3. Deploy as a Web App. Run as: the restaurant Gmail account. Access: anyone.
4. Approve Sheets, Gmail, and Calendar permissions when Google requests them.
5. Copy the deployed `/exec` URL into the website configuration.
6. Create the calendar automatically on the first confirmed event, then share it with appropriate staff as **See all event details** or **Make changes to events**, according to their role.

## Staff operating rule

- New request: acknowledge within **30–60 minutes during 6 AM–9 PM operating hours**.
- Do not promise availability in the first acknowledgement.
- Confirm date, time, guest count, seating/space, menu, deposit, and planner contact before creating the calendar event.
- For urgent same-day matters, use Zalo `0948900488` or phone `0948 900 488`.

## Zalo

The website can direct guests to Zalo immediately. Automated Zalo notifications should only be added after the restaurant has an approved Zalo Official Account/API configuration; no credentials are stored in this project.
