---
type: source
sources: ["raw/Health-Insurance/Workspace/Reports/WhatsApp-No-Response-Report-28-Apr-2026.md"]
updated: 2026-10-22
tags: [insurance, whatsapp, reporting, follow-up, analysis]
privacy: aggregate only - the report names clients, phone numbers and family members; nothing identifying is reproduced here
summary: "The 28 April 2026 non-response report: 105 WhatsApp chats analysed, 40 silent, tiered by days of silence with drafted messages."
---
# Source: WhatsApp non-response report

`raw/Health-Insurance/Workspace/Reports/WhatsApp-No-Response-Report-28-Apr-2026.md` - the dated output of the non-responder SOP for April 2026. It is the only file in `Reports/`.

> Generated from the WhatsApp message database (`messages.db`). Scope: all outbound messages sent **1-28 April 2026**.

## The headline
**105 chats analysed - 65 replied (62%) - 40 did not reply (38%).**

## The summary table
| Category | Count |
|---|---|
| No response to welcome message (identified) | 16 |
| No response to welcome message (unknown - no lead file match) | 8 |
| No response to follow-up / quote message | 4 |
| Other non-client chats (no reply) | 12 |
| **Total non-responsive contacts** | **40** |

The 12 "other non-client chats" are not leads at all - they are contacts the business account messaged for other reasons. So **24 of the 40 silent contacts are lead-shaped**, and 8 of those 24 have no matching lead file.

## Structure
The report is organised by silence tier, exactly as the SOP prescribes:
- **PRIORITY - 10+ days silent** - 3 entries, with the recommendation "call + WhatsApp follow-up recommended".
- **MODERATE - 6-7 days silent** - 5 entries.
- **RECENT - 3-5 days silent** - 8 entries.
- **Unknown contacts** (welcome sent, no lead file match).
- **Other non-replies** (follow-up / quote stage) with suggested messages.
- **Response rate breakdown**.

Each lead entry carries the phone number, the date welcomed and the days silent, a profile line (nationality, gender and marital status, visa emirate, family plan and dependent ages), the member category, and a **fully drafted WhatsApp message** in a code block - the "review and edit before sending" step of the SOP.

## What it says
- **The 62% reply rate is the number that matters**, and it is the only response-rate measurement in the workspace. Compare [[WhatsApp analysis May-June 2026]], where the report noted a low response rate on the intro batch.
- **Silence clusters at the top of the funnel**: of 16 identified welcome non-responders, 3 were already 10+ days silent.
- **The drafted messages are personal, not templated**: they name the family situation (a couple with an infant, for example) and offer an affordable option. The personalisation table in [[WhatsApp non-responder follow-up]] is what drives them.
- **One entry is a placeholder-looking name rather than a person**, and the workspace audit flagged the same kind of entry as a possible test record. See [[Workspace audit June 2026]].

## Caveats
- **The window is 1-28 April** and the report is a snapshot - it does not update itself.
- **8 of the 24 lead-shaped silent contacts have no lead file**, which means the reply-rate denominator is not fully reconciled with the CRM. That is a CRM-hygiene problem, not a messaging one - see [[CRM hygiene]] and [[Lead capture gaps]].
- **The report is the most PII-dense file in the workspace** - names, phone numbers, nationalities, family structure and dependent dates - and the dossiers add health information to the same records. It is summarised here as counts only; the file itself holds the detail.

## Related
- [[WhatsApp non-responder follow-up]]
- [[WhatsApp non-responder follow-up SOP]]
- [[WhatsApp lead follow-up statuses]]
- [[WhatsApp follow-up gaps]]
- [[Sales reporting]]
- [[Standard intro message]]
- [[Batch intro messaging]]
- [[CRM hygiene]]
