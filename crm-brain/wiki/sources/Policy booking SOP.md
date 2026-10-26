---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/Booking Policy.md"]
updated: 2026-10-22
tags: [insurance, sop, booking, crm, email]
privacy: aggregate only - the example subject line carries a personal name and a lead reference; not reproduced
summary: "How a policy is booked: attach every document to the CRM lead and reply to the AML check email to request issuance."
---
# Source: Policy booking SOP

`raw/Health-Insurance/Workspace/SOPs/Booking Policy.md` - the shortest of the five SOPs, a single unpunctuated paragraph plus an example email. It is the process that runs once a policy is issued and all the documents are in.

## The process
1. **Trigger** - the policy is issued and all the documents have been received.
2. **Open the lead in the CRM** and attach the documents to it. The note says this mostly happens at the payment-link stage, where the passport or Emirates ID is attached for the member and for the sponsor.
3. **Type out the policy documents**: health insurance certificate, policy bond schedule, e-cards, tax invoice receipt and commission.
4. **Email the policy admin** - the note says "these two emails" but names only one destination, plus the unit heads in copy - and the email must be **a reply to the confirmation of the AML/KYC check email**, with a subject line of the form `[Client Name] - [REF-ID] - AML & KYC Check`.

The body of that email is fixed and short:

> Dear Team,
> Good afternoon,
> Please note that all the documents are uploaded in the IMCRM, kindly book the policy and share the documents with the client.
> Thanks & Regards

The example subject line in the source carries a personal name and a lead reference; both are left out here. The **shape** - name, reference, "AML & KYC Check" - is what matters, because the reply chain is what ties the booking request to the compliance check that cleared it.

## Design intent versus built fact
- **Intent, clearly stated**: the booking email is a reply to the AML check confirmation, and unit heads are copied.
- **Stated but not resolved**: "these two emails" - the note does not say what the second recipient is. The workspace rule elsewhere says to copy the unit head, which is consistent with one of them, but the second address is not named anywhere in this file.
- **Not specified**: the order of the attachments, whether the documents are attached to the email as well as uploaded in the CRM, and what happens when the AML check has not been sent yet. The process assumes a compliance email already exists in the thread.

## Why it is written this way
The booking email asks for **one thing**: book the policy and share the documents with the client. It does not restate the case. That works because everything else - the policy, the documents, the check - is already in the thread and in the CRM record. See [[Policy booking procedure]] for the surrounding workflow and [[IMCRM]] for the CRM side.

## Related
- [[Policy booking procedure]]
- [[SOP Booking Policy]]
- [[Plan confirmation before payment]]
- [[Plan delivery and review request]]
- [[Documentation requirements]]
- [[IMCRM]]
- [[Dossier structure]]
