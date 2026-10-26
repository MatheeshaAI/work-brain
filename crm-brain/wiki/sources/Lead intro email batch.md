---
type: source
sources: ["raw/Health-Insurance/Context/HEA-XXXXXXXX.md"]
updated: 2026-10-22
tags: [insurance, leads, email, template]
privacy: "structure and counts only, no client names, lead IDs, phone numbers or health details"
summary: "A captured batch of 12 lead intro emails: one shared template, per-lead salutation, three plan tiers."
---
# Source: Lead intro email batch

Original file: `raw/Health-Insurance/Context/HEA-XXXXXXXX.md` (in the `Context` folder). The file name is itself a lead reference, so it is masked here in the same way the vault itself masks lead IDs; the real name is in the source file. **This page keeps only structure, counts and the template.** No client names, lead references, phone numbers, email addresses or health details are copied.

## What the file is
- A captured batch of **12 intro emails**, one per lead, each with a subject line of the form "Re: `<Name>`'s Health Insurance with Alfred `<REF-ID>`".
- The lead whose reference names the file is the first entry; the remaining 11 are other leads.
- The file ends mid-sentence, so the batch is a capture of a work session rather than a finished document.

## The shared template (all 12 follow it)
1. **Greeting** with a title - Mr. / Ms. / Mrs. / Miss - chosen to match the lead.
2. **One-line self-introduction**: the sender names their company and says they are the dedicated advisor for the health insurance inquiry.
3. **Three plan tiers** offered, always the same three, always in this order, each with a one-line coverage description (see [[Plan price tiers]]).
4. **Two questions** to qualify the lead: is there a budget, or do you prefer coverage at specific facilities (clinics, hospitals, international)?
5. **Closing promise**: tailored quotes once the preference is known.
6. **Sign-off** with the advisor's name and company.

## Patterns worth keeping
- **One template, twelve personalisations.** The only per-lead change in the body is the salutation; the plan block and the two questions are byte-identical across the batch. The lead reference appears in the subject line only.
- **The question is deliberately two-way.** Asking "budget or facilities" rather than offering a price immediately is what turns the email into a quote request.
- **One entry is flagged for verification before sending** - the note marks it as looking like a placeholder or test name and says to check it in [[IMCRM]] first. That is the only quality-control annotation in the batch, and it shows the intended check: names that look synthetic get verified in the CRM rather than sent.
- **One entry repeats the company line in its sign-off** - a copy-paste artefact, harmless but evidence the emails are written by hand from a template.
- **Salutation tracks the lead's situation**, including family leads, where the wording mentions "you and your family member" instead of "you".

## Caveats
- The wording of the plan tiers here is **sales copy, not the insurer's wording**. It says nothing about premiums, deductibles, networks or exclusions.
- The batch is undated in the file. It sits between the April workspace reorganisation and the May plan work, so it is probably from late April or May 2026, but the file does not say.
- The template this batch uses is the email cousin of the WhatsApp [[Standard intro message]]; the two are not shown to be identical.

Related: [[Standard intro message]], [[Plan price tiers]], [[Entry level plans]], [[Customer categories]].
