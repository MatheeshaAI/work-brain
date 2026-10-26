---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/Policy_Delivery_Email_Template.md"]
updated: 2026-10-22
tags: [insurance, sop, email, template, policy-delivery]
summary: "The email sent after a policy is booked: share the documents, ask for a Google review, and let the client know the adviser's name."
---
# Source: Policy delivery email SOP

`raw/Health-Insurance/Workspace/SOPs/Policy_Delivery_Email_Template.md`, headed "Policy Delivery & Google Review Request Email Template".

## When it is used
Send to the client **after the policy is booked and all documents are ready to share**. Subject line: `[Client Name] - Policy Documents`.

## The body
A short note that points to the attached documents for the recipient's policy - the relationship is a placeholder, so the same template covers a client's own policy, a parent's policy or a family's policy - and offers further help.

Then the review request: it was a pleasure arranging the cover, and if the experience was smooth a quick **Google review** would mean a lot. The review link is embedded in the message, with a link to the InsuranceMarket.ae review page.

The client is told that **mentioning the adviser's name is completely optional**, and that a message can be sent afterwards so the adviser can thank them properly.

## Notes section of the template
- Replace `[relation]` with the right relationship - "your", "your mother's", "your family's".
- **Attach**: policy bond, e-card, insurance certificate, and any other relevant documents.

## Design intent versus built fact
- **Intent**: the email closes the loop in one send - the client receives the evidence of the cover and is asked for a public rating in the same message.
- **Intent**: the review request is deliberately low-friction and the name mention optional, so the client is never obliged to endorse.
- **Built fact**: the documents attached are the issuer-side set - policy bond, e-card, insurance certificate - the same set the booking SOP asks to be uploaded to the CRM. See [[Policy booking SOP]].
- **Not specified**: the review link in the file is a long search-engine URL with tracking parameters; the workspace convention elsewhere is to substitute a clean `[GOOGLE_REVIEW_LINK]` placeholder before sending. Either way it has to be checked per send.
- **Gap**: the template says nothing about **when** the policy documents actually arrive. Where payment is made by bank transfer the documents are issued a business day later - see [[Takaful Emarat underwriting notes]] - so this email can only go out after the delay, not on the payment date.

## Related
- [[Plan delivery and review request]]
- [[SOP Policy Delivery Email Template]]
- [[Policy booking procedure]]
- [[Plan confirmation before payment]]
- [[Takaful Emarat underwriting notes]]
- [[Documentation requirements]]
- [[Customer objections]]
