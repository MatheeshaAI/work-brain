---
name: motor-document-extraction
description: Extract client details from UAE motor insurance documents (Driving License, Vehicle License/Mulkiya front & back, Emirates ID) that Matheesha uploads as images or photos, and return them organized document-by-document. Use this whenever Matheesha uploads photos of a UAE driving license, vehicle registration card (Mulkiya), or Emirates ID and asks to "extract the details", "get the details from these", "extract document wise", "read these documents", or similar — with or without saying which fields he needs. Also trigger if he uploads a mix of these documents for a lead and just says something like "pull the details" with no other context, since the images are the input. Output is short, copy-paste-ready plain text grouped by document, not a table or formal report.
---

# Motor Insurance Document Extraction

Matheesha is an insurance advisor at InsuranceMarket.ae (Dubai). When onboarding a motor insurance lead he collects photos of the client's Driving License, Vehicle License (Mulkiya, front and back), and Emirates ID (including Golden Visa cards). He uses these to fill the Alfred CRM lead and, later, the booking email (see the `motor-booking-email` skill). This skill turns a batch of those document photos into clean, document-wise extracted text he can scan or paste straight into the CRM.

This is an operational task. Per Matheesha's standing preferences, keep the output short and copy-paste ready — no extra headers beyond the document-name labels below, no restating the request, no "here's what I found" preamble. Default to action: read every image handed to you and extract everything legible, even if he doesn't specify which fields he wants.

## How to read the images

The images are already visible in the conversation — look at them directly rather than reading the files from disk, unless a task specifically needs the file itself (e.g. copying it into a new document).

Some UAE documents are printed in both Arabic and English on the same card — always take the English label/value, ignore the Arabic unless English is missing. Match each photo to the correct document type by its layout, not just by order of upload — people don't always upload them in a predictable sequence, and a set may include duplicates or repeats of the same card.

## Output format

Group the output under one bold line per document type (e.g. **Driving License**), followed by `Label: value` lines, one per field, no bullets. Only include a document heading once per distinct document — if the same card was uploaded twice, extract it once. List documents in this order when present: Driving License, Vehicle License (Mulkiya) — front, Vehicle License (Mulkiya) — back, Emirates ID, then anything else (passport, visa page, insurance certificate, etc.) in the order uploaded.

Use the field sets below as the baseline for each document type. If a document shows extra fields beyond these (e.g. a passport number field, a mortgage/lien note), include them too — don't limit yourself to the list.

**Driving License**
Name, License No, Nationality, DOB, Issue Date, Expiry Date, Traffic Code No, Place of Issue

**Vehicle License (Mulkiya) — front**
Traffic Plate No, Owner, Nationality, T.C. No, Reg. Date, Licence Exp. Date, Insurance Exp, Policy No, Insurance Type, Place of Issue, Mortgage By (only if filled)

**Vehicle License (Mulkiya) — back / vehicle info**
Vehicle Type, Model Year, Origin, Color, No. of Passengers, Empty Weight, G.V.W., Engine No, Chassis No

**Emirates ID**
Name, ID Number, Card Number (if present — Golden Visa cards show this), Nationality, DOB, Sex, Occupation (if present), Issuing Date, Expiry Date, Issuing Place

## After the extraction

If any document is missing, blurry, or a field is unreadable, say so in one short line after the extraction — don't guess a value. If dates suggest an expired document (license, Emirates ID, or vehicle insurance expiry earlier than today), flag that in the same line since it affects whether the lead can be booked.

See `references/examples.md` for a full worked example.
