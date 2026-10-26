---
type: concept
sources: ["raw/Health-Insurance/Workspace/SOPs/Booking Policy.md", "raw/Health-Insurance/Workspace/SOPs/FTC_Email_Template.md", "raw/Health-Insurance/Workspace/SOPs/Policy_Delivery_Email_Template.md", "raw/Health-Insurance/Workspace/SYSTEM.md"]
updated: 2026-10-22
tags: [insurance, process, booking, crm, policy]
summary: "The booking procedure - attach every document to the CRM lead, reply to the AML check email to request issuance, then deliver the documents."
---
# Policy booking procedure

The last mile of a health policy sale: getting the issuer to book it and the client to hold the documents. Three steps, each with its own SOP, and one rule that holds them together - **the policy is booked against the documents that are already on file**.

## The steps
1. **Everything is in.** The policy is issued, the document set is complete, and the payment has been confirmed - for a bank transfer, confirmed the day before, because the issuer's systems take a business day to reflect it. See [[Takaful Emarat underwriting notes]].
2. **Book it in the CRM.** Open the lead, upload the documents, and type in the issuer-side set: health insurance certificate, policy bond schedule, e-cards, tax invoice receipt and commission. Then send the **booking email as a reply to the AML/KYC check confirmation**, subject `[Client Name] - [REF-ID] - AML & KYC Check`, with the unit heads copied, asking the policy admin to book the policy and share the documents with the client. See [[Policy booking SOP]], [[SOP Booking Policy]] and [[IMCRM]].
3. **Deliver it.** Send the client the policy bond, e-card and insurance certificate, ask for a Google review, and mention the adviser's name only if they want to. See [[Plan delivery and review request]].

## The gates
- **Written terms first.** The payment link only goes out after the client replies to the FTC email confirming the plan and the terms. That reply is the evidence that the client agreed to what is being paid for - see [[Plan confirmation before payment]].
- **Document completeness is checked before booking**, not after. The client is told in the FTC email that only the submitted documents will be considered, so a missing paper is a conversation before payment, not a dispute after it.
- **Nothing is promised that the issuer has not confirmed.** Where the terms are still moving - a revised quote after a medical review, a declined discount - the rule is to call before sending. See [[Sales operations issues]] and [[QIC]].

## Why the booking email is a reply
Replying to the AML check confirmation keeps the booking request inside the compliance thread. It means the person booking can see the check that cleared the case, and it means the client reference and the compliance reference cannot drift apart. The cost is that the request cannot be sent until the AML check email exists.

## What the desk does after
Update the lead file status, move the row in the pipeline board, and close the task. The status vocabulary is not uniform across the workspace - see [[Dossier structure]] and [[Lead pipeline stages]].

## Related
- [[Policy booking SOP]]
- [[Plan confirmation before payment]]
- [[Plan delivery and review request]]
- [[Documentation requirements]]
- [[IMCRM]]
- [[Sales operations issues]]
- [[Standard intro message]]
- [[WhatsApp lead follow-up statuses]]
- [[Customer objections]]
- [[Plan price tiers]]
