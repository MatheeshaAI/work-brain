---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_WhatsApp_Lead_Tracking.md"]
updated: 2026-10-22
tags: [whatsapp, leads, lifecycle, pipeline]
summary: "The eight-stage lead lifecycle from CRM extract to retention, with the WhatsApp action and file update at each stage."
---
# Workflow WhatsApp Lead Tracking

An end-to-end walkthrough of one lead using sample data (the names, numbers and amounts in it are illustrative and not copied). It is the earliest written form of the lifecycle that [[Health Insurance CRM system overview]] later formalised. See [[Lead lifecycle stages]].

## The eight stages
1. **Extract lead data** from the CRM (ref ID, contact, member category, preferred plan, annual cost); create the document folder.
2. **Generate and send the quote:** PDF from the CRM, saved in the folder, sent over WhatsApp with a short caption listing plan highlights; log status Quoted, date, amount and channel in the lead file.
3. **Track response:** search the chat within 24 hours; no reply after a day triggers a check-in; a "let me think" reply sets a follow-up reminder.
4. **Follow up and handle objections:** answer questions (example: pre-existing conditions waiting period), keep going until the lead buys, needs time or declines (mark Not Interested).
5. **Close:** lead confirms; request passport, visa and medical certificate if age requires; set status to ready for policy booking.
6. **Documents and AML/KYC:** store documents in the lead folder, email compliance with subject "name - ref - AML & KYC Check" and wait for approval ([[Policy booking]]).
7. **Policy booking and delivery:** generate certificate, e-card, bond and receipt in the CRM, send certificate and e-card on WhatsApp, update the CRM to Policy Booked, record policy number, active date, premium, renewal date.
8. **Retention:** export the chat to the folder; send a renewal reminder about 11 months later.

## Checklist and automation ideas
A 14-item checklist closes the file. Listed as "coming soon": automatic quote sending, renewal reminders, document organisation, WhatsApp-to-CRM status sync. None is shown as built.

## Flags
- The sample promises specific coverage facts to the lead (waiting periods, conditions covered from day one, an AED 500,000 limit). These are example text, not rules; they should not be reused as plan facts.
- Uses wacli script names; see [[WhatsApp stack timeline]].
- The sample pipeline here has fewer statuses than the later 16-stage and 9-status models ([[Insurance Sales Pipeline - 16-Stage System]], [[Lead pipeline stages]]).
