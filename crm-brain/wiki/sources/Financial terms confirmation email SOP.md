---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/FTC_Email_Template.md"]
updated: 2026-10-22
tags: [insurance, sop, email, template, plan-confirmation]
summary: "The Financial Terms & Conditions email - the written confirmation of plan and terms that must be replied to before a payment link goes out."
---
# Source: Financial terms confirmation email SOP

`raw/Health-Insurance/Workspace/SOPs/FTC_Email_Template.md` - the **FTC email**, sent to a client to confirm plan terms before the payment link is shared.

## When it is used
"After receiving insurance company confirmation/approval on a lead's application, but before sending the payment link. **Client must reply confirming the plan details before proceeding.**" That reply requirement is the point of the email: it is a written gate between approval and money.

## The output rule (the unusual part)
The SOP is as much about **file format** as about wording:

- Output as **plain text (`.txt`)**, not markdown - email clients do not render markdown bullet points properly.
- Level 1 bullets: 4 spaces before the bullet. Level 2 sub-items: 8 spaces before the dash.
- Section headers: **ALL CAPS**, no markdown heading syntax.
- Save as `Documents/[REF_ID]-[Name]/FTC_Email_Draft.txt` so it can be opened and copy-pasted directly.

This is the one SOP in the workspace that tells the writer not to use the wiki's own markdown convention, and the reason is practical: the output is pasted into a mail client, not into Obsidian.

## The structure of the email
**Greeting and thanks** for the documents, then the ask: review the details below and reply to confirm that the information provided is accurate and that the client understands the policy terms, conditions and exclusions.

**YOUR POLICY SUMMARY** - insurance company, chosen plan, network provider, co-insurance / deductibles, and who the invoice is raised to (individual or company).

**APPLICATION DOCUMENTS** - the medical application form (original or revised, attached), Emirates ID / passport, valid visa, sponsor documents. With a line that matters: if there are changes or additional information, say so **now** - "otherwise, only the submitted documents will be considered."

**KEY TERMS & CONDITIONS** - network changes at the insurer's discretion; medical declarations (all known or suspected conditions must be declared, or coverage and eligibility may be affected); maternity coverage (married females only, and the insurer's discretion over undeclared pregnancies and pregnancies arising within 40 days of the application); and an optional outpatient-access block (GP referral first, hospital access limited to emergency and approved in-patient treatment) with the instruction to remove it if it does not apply.

**Close** - the insurer's policy issuance and activation turnaround is left as the placeholder **"xx working days"**, and the client is asked to reply so processing can continue.

## Design intent versus built fact
- **Intent**: the email is a two-way gate - the client must confirm before the payment link is sent, and the confirmation must cover both accuracy of information and understanding of the terms.
- **Intent**: the document list in the email *is* the application; changes are only possible before it is confirmed.
- **Built fact**: the templates' conditional blocks are literally conditional - "remove if not applicable" - so the email is assembled per plan, not sent verbatim.
- **Not finished**: the turnaround figure is still `xx working days` in the template, so the number has to be filled in per insurer before sending. Compare the one-business-day bank-transfer reality at [[Takaful Emarat]].
- **Not stated**: who writes it, and where the plan price comes from - it is not in the summary block, which is odd for a financial terms confirmation. The lead dossier records quotes being sent separately by email with a comparison PDF.

## Related
- [[Plan confirmation before payment]]
- [[Policy booking procedure]]
- [[Plan delivery and review request]]
- [[Documentation requirements]]
- [[Customer objections]]
- [[Explaining co-pay and plan terms]]
- [[Dossier structure]]
