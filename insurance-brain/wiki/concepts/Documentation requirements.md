---
type: concept
sources: ["raw/Health-Insurance/Workspace/Knowledge Base/General-Underwriting.md", "raw/Health-Insurance/Workspace/SOPs/FTC_Email_Template.md", "raw/Health-Insurance/Workspace/SOPs/Booking Policy.md"]
updated: 2026-10-22
tags: [insurance, documents, medical, evidence, process]
summary: "What evidence a policy file has to carry - passport/EID/visa, medical reports, eight tests - and the validity rules that decide whether it is accepted."
---
# Documentation requirements

The evidence a file needs before a policy can be quoted, booked or issued, and the rules that make evidence acceptable or worthless.

## The document set of a normal case
From the FTC email template, which lists what forms the basis of the application:
- Medical application form (original or revised)
- Emirates ID / passport
- Valid visa
- Sponsor documents

The booking SOP adds the issuer-side documents that have to be uploaded to the CRM before a policy is booked: **policy certificate, policy bond schedule, e-cards, tax invoice receipt and commission**. See [[Policy booking procedure]].

## The medical evidence rules
Where medical evidence is required at all, it must be:
- issued by a **UAE-based** medical facility, and
- dated **within the last 3 months**.

Reports from outside the UAE or older than three months **will not be accepted** by underwriters. This is the single most common disqualifier in the rule set, and it is stated as a hard rule.

**On pre-existing conditions**, if the client declares them they must supply the relevant medical report for each condition plus current medication prescriptions; if they do not declare them, claims may be rejected later. Declaration is optional, disclosure is not - see [[Underwriting rules]] and [[General underwriting rules]].

**For the over-65 case** the medical form must carry eight tests - CBC, fasting blood sugar, lipid profile, kidney function, liver function, ECG stress, ultrasound of abdomen and pelvis, and PSA for males. See [[Documentation requirements]]'s companion, [[Underwriting rules]].

## The sequence, and where it breaks
1. Quote is issued.
2. Client is asked for the document set, and for medical evidence if a gate applies.
3. **FTC email** - the plan and terms are confirmed in writing before any payment link goes out. The client is told explicitly that only the submitted documents will be considered, and that changes must be raised now. See [[Plan confirmation before payment]].
4. Payment link, payment.
5. Booking in the CRM with every document attached.

The weak link is step 2: the "3 months / UAE-based" rule is not something a client will know, so it has to be stated when the request is made, not after the reports come back. That is why the document request is treated as its own routine - see [[Document request handling]].

## Where the documents live
Per-lead document folders (`Documents/[REF_ID]-[Name]/`) and the document checklist inside each lead dossier. See [[Dossier structure]] and [[Markdown-backed lead store]].

## Related
- [[Underwriting rules]]
- [[General underwriting rules]]
- [[Document request handling]]
- [[Policy booking procedure]]
- [[Plan confirmation before payment]]
- [[Dossier structure]]
- [[Document attestation in the UAE]]
