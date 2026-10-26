---
type: concept
sources: ["raw/Health-Insurance/Workspace/SOPs/WhatsApp_FollowUp_NonResponders.md", "raw/Health-Insurance/Workspace/Reports/WhatsApp-No-Response-Report-28-Apr-2026.md"]
updated: 2026-10-22
tags: [insurance, process, whatsapp, follow-up, reporting]
summary: "The weekly non-responder routine - analyse the chat archive for silence, write a dated report, send tiered follow-ups with approval between tiers."
---
# WhatsApp non-responder follow-up

A ten-minute weekly routine that finds the leads who have gone quiet and works them back in tiers, with a hard stop after two attempts.

## The loop
1. **Analyse** - ask which clients have not replied to the welcome message since a given date. The agent queries the WhatsApp SQLite archive, finds chats with an outbound message and no inbound reply after the first one, cross-references the numbers against the lead files, and splits the result into welcome-message non-responders and follow-up/quote non-responders.
2. **Report** - a dated file lands in `Workspace/Reports/`, with summary stats, silence tiers, a drafted personalised message per client, unknown contacts and other non-replies. The agent drafts; the human edits.
3. **Send tier by tier** - oldest and highest priority first, one message confirmed at a time, then a **pause for approval**, then the next tier; parallel within a tier. Transport is the WhatsApp bridge's REST API, gated by a health check.
4. **Update** - check for replies within a few hours, update the lead file and the pipeline board, and if there is still no reply after two follow-ups, **call instead of messaging**.

## The tiers
| Silence | Treatment |
|---|---|
| 3-5 days | first follow-up - light nudge, easy call to action |
| 6-7 days | second follow-up - friendly check-in, ask for requirements |
| 10+ days | final WhatsApp follow-up plus a phone call - warmer re-introduction, acknowledge the time passed |

Personalisation is by profile: title from gender, and an angle from member category - domestic worker, golden visa, dependent spouse, investor or partner, salary band, senior, family. Triage flags (wrong DOB on file, uncertain phone number, bridge down at creation, no lead-file match) change what is sent.

## The two rules that keep it honest
- **Two strikes, then a call.** After two follow-ups with no reply the lead is marked cold and messaging stops. Without that rule a non-responder report becomes a machine for sending a third message.
- **A new lead is not a non-responder.** A lead created today gets the welcome message only, and a chat where the bridge was down at creation counts as first contact rather than silence.

## Cost and limits
- **The bridge is a hard dependency** - if the Go bridge is not up, nothing sends.
- **The report is PII-bearing** by construction (names, phone numbers, suggested messages), so the wiki keeps it as counts only - see [[WhatsApp non-response report]].
- **Reply rate is the only health metric**, and the desk's own April figures were 40 of 105 chats silent - see [[WhatsApp follow-up gaps]] and [[Sales reporting]].

## Related
- [[WhatsApp non-responder follow-up SOP]]
- [[SOP WhatsApp Follow-Up Non-Responders]]
- [[Standard intro message]]
- [[Batch intro messaging]]
- [[WhatsApp lead follow-up statuses]]
- [[WhatsApp follow-up gaps]]
- [[Sales reporting]]
- [[Lead pipeline stages]]
- [[Sales operations issues]]
- [[Customer objections]]
- [[Plan price tiers]]
- [[IMCRM]]
