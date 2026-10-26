---
type: concept
sources: ["raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt", "raw/10_Work-Insurance/full_chatlist.txt"]
updated: 2026-10-22
tags: [whatsapp, sales, automation, templates]
summary: "The scripted first message: how a batch of 24-27 intros is personalised, what the template says and what varies."
---
# Batch intro messaging

How the desk opens a new health-insurance conversation, and what the scripted message actually contains. Source: the [[WhatsApp chat exports]].

## The shape of a batch

In `chatlist_full.txt` the scripted greeting appears **27 times**, in `whatsapp_body2.txt` **24 times**. The timestamps of those sends run from **08:38 to 09:10** - roughly a **30-minute window** in which two dozen new leads were contacted. That is the batch: same message, same hour, many recipients.

## The template

The opening is a fixed frame with three variable slots:

1. **Greeting and claim** - name, "This is Matheesha Sarathchandra from InsuranceMarket,ae", and the reason for the contact.
2. **The subject of cover** - one of *yourself*, *your child*, *your spouse*, *your wife*, *yourself and your family*, *yourself and your spouse*. This slot is the only personalisation in the standard intro, and it is what the member-category label in the chat title also encodes.
3. **The ask** - a convenient time for a call, plus the two qualifying questions: **a plan within a specific budget, or a plan that covers specific clinics/hospitals?**

Then a fixed block lists the three plan types:
- **Basic Plan** - clinic coverage only (outpatient)
- **Basic Enhance Plan** - clinic coverage + direct access to specialists (outpatient)
- **Enhance Plan** - complete coverage: clinics + hospitals (outpatient) + international plans

These three are the [[Plan price tiers]] tiers, described in the customer's language.

## The three variants in use

| Variant | How it opens | When it appears |
|---|---|---|
| **Standard** | "We received your health insurance inquiry for [subject]. Please let me know a convenient time for me to call you..." | Most of the batch |
| **Unreachable** | "I tried calling you but I couldn't reach you. We received a health insurance inquiry for [subject]..." | Where a phone call was already attempted |
| **Advisor overview** | "here I'm your dedicated advisor for your health insurance inquiry! I've reviewed your profile and I can see you're looking for a [individual/family] health insurance plan based in Dubai" - then each tier with a named starting plan, its co-pay line and its starting price | Where the lead has a fuller profile |

The advisor-overview variant adds one instruction that the other two do not: **specialist access under the hospital plans requires a GP referral first** - you see a general practitioner, who refers you on if needed.

The standard co-pay line, used on every quoted plan: **20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines**. See [[Explaining co-pay and plan terms]].

## Starting prices quoted in the advisor-overview variant

Individual plan:
| Tier | Starting plan | From (excl. VAT) | From (incl. VAT) |
|---|---|---|---|
| Basic | Takaful Emarat APN (Aafiya) | 998 | 1,086.75 |
| Basic Enhanced | HAYAH Care Protect RN3 B (Nextcare) | 1,193 | 1,291.50 |
| Enhanced, option 1 | Dubai Insurance - Remnto N4 Value (Dubai Care) | 1,757 | 1,883.70 |
| Enhanced, option 2 | Takaful Emarat Essential (Aafiya) | 1,800 | 1,928.85 |

Family plan: Basic from 6,677, Basic Enhanced from 8,342, Enhanced from 11,190 (Takaful Emarat Essential) or 12,300 (Dubai Insurance Dubai Care N4), VAT inclusive 7,166.25 / 8,914.50 / 11,904.90 / 13,070.40.

**Contradiction to note.** These figures disagree with [[Plan price tiers]], which records the same plan names at higher starting prices (Takaful Emarat Essential at 2,417.10, HAYAH Care Protect RN3 B at 1,461.60). Both sources are June 2026 and both say "starting from", so the difference is either a price revision between the captures or different plan versions under the same name. It is not resolved here - the chat figures are the earlier batch.

## Why the batch matters
- **It is the same two questions as the phone.** [[Call handling routine]] asks budget-or-hospital; the intro asks budget-or-facility. One qualification rule across both channels.
- **Volume is the point.** About 25 intros in half an hour is a manual batch, and it creates the cold-lead pile the [[WhatsApp analysis May-June 2026]] measured.
- **The template carries the plan ladder**, so a lead learns the three tiers before any quotation arrives. That is why [[Plan price tiers]] exists as a concept rather than a price list.
- **Personalisation is thin**: one slot (the subject of cover). Everything else is identical, which is why the referral tag in the chat title does the work of telling the desk where the lead came from ([[Referral sources]]).

Related: [[Standard intro message]], [[Plan price tiers]], [[WhatsApp lead follow-up statuses]], [[Batch intro messaging]] is used by [[WhatsApp follow-up gaps]] and [[Quote request handling]].
