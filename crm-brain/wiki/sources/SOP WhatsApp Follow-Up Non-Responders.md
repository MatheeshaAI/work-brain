---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/WhatsApp_FollowUp_NonResponders.md"]
updated: 2026-10-22
tags: [sop, whatsapp, follow-up, cadence]
summary: "The weekly SOP for finding leads who did not answer the welcome message and sending tiered, personalised follow-ups."
---
# SOP WhatsApp Follow-Up Non-Responders

A ten-minute weekly routine (Monday morning recommended, or after a batch of new leads). Concept page: [[WhatsApp non-responder follow-up]]. Output example: [[WhatsApp No-Response Report 28 Apr 2026]].

## Three steps
1. **Run the analysis:** ask the agent which clients have not replied since a given date. It queries the local WhatsApp SQLite database, finds chats with an outbound message and no inbound reply after it, cross-references phone numbers with lead files, and splits welcome-message non-responders from follow-up or quote non-responders.
2. **Review the report:** saved as a dated report with summary stats and reply rate, priority tiers by days silent, a personalised suggested message per client, unknown contacts (no lead file) and other non-replies. Edit before sending.
3. **Send tier by tier:** oldest tier first, each message confirmed; pause and show results before the next tier; sends go through the REST API of the local WhatsApp bridge. Prerequisite: the bridge health check returns connected; otherwise start it with the Go launch command.

## Personalisation rules
Salutation from gender and marital status ([[Welcome message salutation rules]]); content from member category (domestic worker gets affordable plans, golden visa gets local plus international options, dependent spouse acknowledged, investor or partner gets UAE-wide cover, salary at or below AED 4,000 gets budget-friendly plans, age 60+ gets senior-plan specialisation, family plans reference members). Tone by tier: 10+ days warmer re-introduction; 6-7 days friendly check-in asking requirements; 3-5 days light nudge.

## Triage flags
Wrong date of birth in the system (ask to confirm), uncertain last phone digit (verify first), bridge down at lead creation (treat as first contact), no lead file match (identify from the message).

## Frequency guide
| Situation | Action |
|---|---|
| Lead created today | welcome only |
| 3-5 days no reply | first follow-up |
| 6-7 days | second follow-up |
| 10+ days | final WhatsApp follow-up plus a phone call |
| 2 follow-ups, still silent | mark cold, stop messaging |
After sending: check for replies within hours, update the lead file and pipeline, and after two follow-ups move to a call, never a third message.

Local bridge path is a Windows folder path (not copied). See [[Local message archive]], [[WhatsApp lead follow-up statuses]].
