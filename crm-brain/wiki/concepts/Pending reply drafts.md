---
type: concept
sources: ["raw/Insurance Workspace/Sales-System/Drafts/pending_replies.json", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md"]
updated: 2026-10-22
tags: [automation, drafts, process, sales]
summary: "Ready-to-send replies the hourly audit prepares each run: file shape, channel mix, urgency ladder and the gaps in it."
---
# Pending reply drafts

The queue of replies the hourly audit prepares so that a message can be sent without composing it under pressure. One file, `Sales-System/Drafts/pending_replies.json`, rewritten by every run. File detail is in [[Sales-System automation data]]; the 29 May run is the state on record.

**Contents described by shape only.** The file holds real message bodies, client names, email addresses and lead IDs. None of that is reproduced here - only the themes.

## Shape
Top level: `generated` (timestamp of the run), `source` (which channel the drafts came from - the 29 May run says Gmail, because WhatsApp was offline), and `drafts[]`.

Each draft carries:
- `id` - a running number, `draft_001` to `draft_008`.
- `client` - who it is for.
- `lead` - the CRM lead identifier, present on only some entries.
- `contact_email` or `contact_via` - where to send it. `contact_via` means a colleague is the route.
- `channel` - `email`, `email_internal` (to a colleague) or `phone_or_whatsapp` (written to be spoken or messaged, not emailed).
- `urgency` - `CRITICAL`, `urgent`, `follow_up` or `cold`.
- `context` - one sentence on why the reply is needed and how long it has waited. This is the field a human reads first.
- `draft_reply` - the body.

## The mix on the 29 May run
| Channel | Count | | Urgency | Count |
|---|---|---|---|---|
| email | 2 | | CRITICAL | 2 |
| email_internal | 1 | | urgent | 3 |
| phone_or_whatsapp | 5 | | follow_up | 2 |
| | | | cold | 1 |

**5 of 8 drafts are not emails.** The system picks a channel per item: a renewal is best done in a call, an internal handover by email, a price objection by email where a written comparison can follow.

**The urgency ladder matches the audit's priority ladder** - CRITICAL for a lapsed or expiring policy, urgent for a blocked or escalating client, follow_up for an engaged lead nobody has called, cold for a lead that has gone quiet.

## The themes the drafts cover
Across the four days the drafts are written for a small, repeating set of situations:
1. **A renewal that lapsed or is about to** - check whether it was renewed, offer to fix it in the same message.
2. **A client escalation** - apologise for the delay, then ask for a short call rather than sending another document.
3. **A price objection** - acknowledge the premium is too high for what they expect, offer mid-range alternatives, and promise the outstanding competing quote.
4. **A plan-preference callback** - reference the tier the client was looking at, offer a comparison, ask for a convenient time.
5. **A cold re-engagement** - apologise for not reaching out sooner, ask how many people the cover is for, and offer a quick comparison.
6. **An internal handover** - confirm to the colleague that the issuance is being picked up, with a time to update.
7. **A claims escalation** - apologise, state that it has been escalated internally, and promise a concrete update.

## Gaps worth knowing
- **Contact details are inconsistent.** Only 2 of 8 drafts carry an email address; one carries a colleague route; one carries neither a lead nor a contact field. A draft that cannot be routed is a draft that does not get sent.
- **No send state.** Nothing records whether a draft was sent, edited or discarded. The file is replaced on the next run, so an unsent draft is simply gone - the same failure mode as "draft left unsent" in [[Sales operations issues]].
- **No expiry.** Drafts carry no date by which they go stale, even though the window they were written in is about to change.
- **Health context leaks into the drafts by necessity.** Some situations can only be answered with the client's own details, which is why the file holds them and why the wiki does not.

Related: [[Sales System]], [[Sales System automation]], [[Daily sales audit]], [[Sales task automation]], [[Standard intro message]], [[Sales operations issues]].

Earlier design of the same idea: [[Draft and approve messaging flow]].
