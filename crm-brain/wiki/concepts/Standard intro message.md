---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt", "raw/10_Work-Insurance/full_chatlist.txt", "raw/Health-Insurance/Context/"]
updated: 2026-10-22
tags: [insurance, whatsapp, sales, template]
summary: "The scripted first WhatsApp message to every new health lead - fixed frame, three variants, one personalisation slot, and the plan ladder it carries."
---
# Standard intro message

The first WhatsApp message sent to every new health-insurance lead. Per [[WhatsApp analysis May-June 2026]] it follows a template that opens with a greeting, the lead's name and a wave, then introduces the sender as working with InsuranceMarket.ae.

## How it was used
- About 35+ leads received it in the period; 15 in one day.
- It is adapted by the lead's situation. The report names these variants: self and spouse, self and family, child inquiry, wife inquiry.
- When a lead cannot be reached by phone, the intro is sent on WhatsApp instead ("couldn't reach by phone").
- Response rate was low: a large batch of intros had no reply.

The full wording of the template is not in this source.
Related: [[WhatsApp lead follow-up statuses]], [[Referral sources]].

## The cold re-engagement sibling
The [[Daily sales audit]] of 29 May 2026 writes a different message for leads that never answered: a cold-lead re-engagement draft, for 3 leads at 13-14 days. Its shape is **an apology for the delay, a reference to the plan tier the lead had looked at, one qualifying question (how many people the cover is for) and an offer of a quick comparison**.

That is not the intro message - it is a second-step message that assumes the intro was seen and ignored. Keeping it separate matters: the intro introduces, the re-engagement apologises, and mixing them reads as an opener for someone who has already been ignored once.

Related: [[Pending reply drafts]], [[Customer objections]], [[Daily sales audit]].

## The template itself, recovered from the raw chat exports
The raw WhatsApp dumps in `raw/10_Work-Insurance/` contain the wording that the analysis only described. The message has a fixed frame and three variable slots - see [[Batch intro messaging]] for the full breakdown.

**Fixed frame:**
1. Greeting and claim - name, "This is Matheesha Sarathchandra from InsuranceMarket,ae", and the reason for the contact.
2. The subject of cover - the one personalisation slot: *yourself*, *your child*, *your spouse*, *your wife*, *yourself and your family*, *yourself and your spouse*.
3. The ask - a convenient time for a call, then the two qualifying questions: **a plan within a specific budget, or one that covers specific clinics and hospitals?** and the promise of tailored quotes once the preference is known.
4. The plan ladder - **Basic Plan** (clinic coverage only, outpatient), **Basic Enhance Plan** (clinic coverage + direct access to specialists, outpatient), **Enhance Plan** (complete coverage: clinics + hospitals outpatient, plus international plans).

**Three variants in use:** the standard intro; the **unreachable** variant ("I tried calling you but I couldn't reach you"); and an **advisor overview** variant that says "here I'm your dedicated advisor for your health insurance inquiry! I've reviewed your profile..." and then lists each tier with a named starting plan, the standard co-pay line and its starting price.

**The co-pay line that travels with every quote:** *20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines*. It is a system default, and it appears identically in the intros, in chat quotes, and on the CRM policy record.

**Scale:** the greeting appears 27 times in the fullest chat export and 24 times in the earlier one, all sent between **08:38 and 09:10** - a single batch of roughly two dozen intros in half an hour.

Related: [[Batch intro messaging]], [[Explaining co-pay and plan terms]], [[Plan price tiers]], [[WhatsApp follow-up gaps]], [[Call handling routine]].

## The email twin of the intro (2026-10-22 ingest)
A captured batch of **12 intro emails** in the workspace carries the same structure as the WhatsApp intro, in the other channel:
- **Subject:** "Re: `<Name>`'s Health Insurance with Alfred `<REF-ID>`" - the lead reference travels in the subject line.
- **Greeting** with a title matched to the lead (Mr. / Ms. / Mrs. / Miss), then the advisor's one-line self-introduction: "I'm your dedicated advisor for your health insurance inquiry".
- **The same three tiers** with the same one-line descriptions, in the same order, with **no prices**.
- **The same two qualifying questions** - budget, or specific clinics and hospitals - and the same promise of tailored quotes afterwards.
- **Sign-off** with the advisor's name and company.

Source: [[Lead intro email batch]]. Two differences from WhatsApp: the reference ID is in the subject rather than only in the CRM, and the email version names no starting price. One entry is flagged in the batch as looking like a placeholder and needing a CRM check before sending - the intended quality control on the template itself.

## The salutation table the desk works to (2026-10-22 ingest)
The workspace rulebook fixes the greeting by gender and marital status, and adds one exception:

| Lead | Salutation |
|---|---|
| Male | **Mr.** |
| Female, married | **Mrs.** |
| Female, unmarried | **Miss** |
| Female, marital status not recorded | **Ms.** |
| Under 18 | **first name only, no title** |

Source: [[Health insurance CRM system overview]], [[WhatsApp welcome message template]], [[SOP WhatsApp Welcome Message Template]].

**The rule is doing real work.** The pipeline board holds family cases - six members including infants and seniors, a family of four with two adults and two children - and the marital status is a field in the CRM rather than an inference from the name. Two greetings in the batch need different titles for the same person depending on which CRM field is filled in, and one of them is the missing-status default.

**The referral variant.** A referred lead gets the intro **adapted**, not the standard one - the referrer is named in the message. That is a persistent rule, not a style choice, because the referral is the reason the person is being contacted at all. See [[Referral sources]] and [[Referral lead records]].

## Show it or send it? (2026-10-22 ingest)
The workspace contradicts itself on the one action the template exists for.

- The **persistent rules** in `SYSTEM.md` say: *"WhatsApp welcome message - show, don't send."*
- The **lead-onboarding workflow** says: *"Use the Node.js REST API to send immediately - do not just display it, actually send it"* - and adds a pre-send step: check the live CRM status, and if the lead is `Quoted`, change it to `Followed Up` first so the lead is not reassigned.

Both cannot be followed. The evidence of what actually happens is in the data: the pipeline board's New Leads section carries a pending action of **"Send WhatsApp welcome message - get insurance requirements"** on **21 rows**, which means the message was **prepared and not sent** - and the archived `send_onboarding_messages.js` script, recovered in May, contains a **hardcoded list of clients to message**, which means for some leads it was sent. See [[Recovered WhatsApp scripts]], [[Pipeline board]] and [[Task list]].

The second rule also carries a **commercial side effect** the first does not: changing the CRM status to `Followed Up` before sending is what stops the lead being reassigned. If the message is only shown, the status change may never happen and the lead can be reassigned while the message sits in the desk's outbox. See [[CRM hygiene]] and [[Insurance CRM pipeline]].
