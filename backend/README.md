# Enquiries to Google Sheets

The Cloudflare Worker accepts same-origin JSON at `/api/inquiry`, validates the
fields and contact consent, applies an IP rate limit, and sends an authenticated
request to a private-configured Google Apps Script web app. No Google credential
or shared secret is included in the browser build.

Google Apps Script writes to the private spreadsheet tab `Enquiries`. Its column
headers must match `ENQUIRY_HEADERS` in `google-apps-script/Code.gs`.
Request IDs prevent repeat submissions from adding duplicate rows. Values that
could be interpreted as formulas are stored as literal text. The Sheet records
the new-enquiry status, selected product and whether the team email alert was sent.
The product is validated against the three catalogue products and included in the
alert subject and body. Existing 22-column Sheets gain a Product column at the
end; existing rows and status columns are preserved.

The Google account owning the spreadsheet executes the script. Alerts go to
`inquiry@altivonglobal.com`; no login to that receiving mailbox is needed. The
Google account and script must authorize spreadsheet access and MailApp sending.

## Configuration

1. Create/import the private Sheet and note its spreadsheet ID.
2. Deploy the Apps Script as a web app, execute as the owner, access Anyone.
   It authenticates requests using a shared secret; it exposes no read endpoint.
3. Configure Script Properties `SPREADSHEET_ID`, `ENQUIRY_SHARED_SECRET` and
   `ALERT_EMAIL`. Keep the shared secret out of Git and chat messages.
4. Set Cloudflare secrets `GOOGLE_ENQUIRY_URL` (the `/exec` URL) and the matching
   `ENQUIRY_SHARED_SECRET` using `wrangler secret put`.
5. Confirm a saved submission and alert delivery, then set
   `VITE_ENQUIRIES_ENABLED=true` and deploy. Leave it off until configured.

An email delivery failure does not discard a saved enquiry. Review the Sheet's
Email alert column if notifications fail. Apps Script and email sending are
subject to the owner's Google account quotas. Receipt means the enquiry was
saved, not that a quotation or order has been accepted.

Local boundary checks: `node --test api/worker.test.js`.
