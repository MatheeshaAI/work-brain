---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/WhatsApp_Welcome_Message_Template.md"]
updated: 2026-10-22
tags: [insurance, sop, whatsapp, template, welcome]
summary: "The first WhatsApp message to a new lead: salutation from the CRM gender field, the three-tier plan ladder and two qualifying questions."
---
# Source: WhatsApp welcome message template

`raw/Health-Insurance/Workspace/SOPs/WhatsApp_Welcome_Message_Template.md` - the template for the **first** message sent to a new health-insurance lead.

## The salutation rules
The salutation is derived from the **gender and marital-status field in IMCRM**, not from the name:

| IMCRM gender field | Salutation |
|---|---|
| Male / Male-Married / Male-Unmarried | Mr. |
| Female-Married | Mrs. |
| Female-Unmarried | Miss |
| Female (no marital status) | Ms. |
| Age under 18 (any gender) | first name only, no title |

## The message
The adviser introduces themselves as the dedicated adviser for the lead's health-insurance inquiry, says the profile has been reviewed, and then presents **three tiers**:

- **BASIC PLAN** - clinic coverage only (outpatient)
- **BASIC ENHANCED** - clinic coverage plus direct access to specialists (outpatient)
- **ENHANCED** - complete coverage: clinics and hospitals outpatient, plus international plans

It then asks two qualifying questions: **is the client looking for a plan within a specific budget, or do they prefer coverage at specific facilities (clinics, hospitals, international)?** - and promises tailored quotes matching the answer.

## Where it sits
- It is the **same message** the wiki already documents from the raw chat exports as the standard intro: the fixed frame, the three tiers and the two qualifying questions. See [[Standard intro message]] and [[Batch intro messaging]].
- The workspace version adds the piece the raw exports could not give: **the salutation table**, which is a deterministic lookup against a CRM field rather than a judgement call.
- The tier words map onto the plan library's `Plan Type` column (`Entry Level` / `Good` / `Best`) and onto the Basic / Basic Enhanced / Enhance ladder in [[Insurance plan catalogue]]. The **price is not in the welcome message** - the tier ladder is offered without numbers, which is what makes it safe to send before requirements are known. See [[Plan price tiers]].
- The workspace rules also require checking the live CRM status before sending, and moving a `Quoted` lead to `Followed Up` so it is not reassigned. See [[Lead pipeline stages]] and [[WhatsApp lead follow-up statuses]].

## Design intent versus built fact
- **Intent**: qualify on budget-versus-facilities before spending time on quotes, and offer three clearly separated levels of cover.
- **Built fact**: the salutation table is mechanical and has to be applied as written.
- **Gap**: the message as written names no insurer, no network and no price, and it says "we have the perfect options for you" before any requirement is known - so the follow-up quality depends entirely on the answers coming back.

## Related
- [[Standard intro message]]
- [[SOP WhatsApp Welcome Message Template]]
- [[Batch intro messaging]]
- [[WhatsApp non-responder follow-up SOP]]
- [[WhatsApp lead follow-up statuses]]
- [[Plan price tiers]]
- [[Insurance plan catalogue]]
- [[Customer objections]]
