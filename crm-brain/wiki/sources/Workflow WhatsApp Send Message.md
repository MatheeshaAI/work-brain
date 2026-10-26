---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_WhatsApp_Send_Message.md"]
updated: 2026-10-22
tags: [whatsapp, wacli, templates, sales]
summary: "How quotes, follow-ups and policy documents are sent to leads over WhatsApp, with three message templates."
---
# Workflow WhatsApp Send Message

Procedure for sending text and files to leads with [[wacli]] (command line) or the Node.js wrapper script. It also holds three fill-in templates.

## Methods
- Quick send from the command line to a number in `971XXXXXXXXX` form.
- Node wrapper with `--phone`, `--message`, or `--file` plus `--caption` (recommended).
- Sends: PDF quote, policy certificate, e-card or digital health card.

## Templates (patterns)
| Template | Content slots |
|---|---|
| Quote sent | name, plan name, annual cost, members, validity date; ends "reply YES to proceed" |
| Follow-up | references the quote date and offers help on coverage, network hospitals, claims process, documents needed |
| Policy activated | policy number, effective date, coverage amount, beneficiaries; attaches certificate and card |

## Workflow: send quote to a lead
1. Pull lead details from the CRM. 2. Export the quote PDF into the lead's document folder. 3. Send with a short caption. 4. Track the reply (search the chat). 5. Update the CRM: Quoted once the lead confirms, Policy Booked once payment is received.

## Workflow: send documents after booking
After policy approval the lead submits passport/EID and visa copies and the policy documents go back by WhatsApp. See [[Document request handling]], [[Policy booking]].

Related: [[Client message style]], [[Standard intro message]], [[Workflow WhatsApp Lead Tracking]]. Flag: this file uses wacli while the later stack differs ([[WhatsApp stack timeline]]).
