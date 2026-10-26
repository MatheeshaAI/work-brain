---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/lead-handling-rules.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/message-style.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [insurance, sales, objections]
summary: "What stops or delays a health-insurance sale, and how each objection is answered with a number the customer can check."
---
# Customer objections

What stops or delays a sale, per [[WhatsApp analysis May-June 2026]]:

1. **Price.** "It's expensive, I found one for 2600." The report's suggested response is to address the objection or adjust the offer. See [[Plan price tiers]].
2. **Deferral.** A customer postpones to a later month, after being told quotes last 30 days and prices will likely change. The report's lesson: diary the return date and re-quote.
3. **Payment problems.** A customer who cannot make a second payment and wants the existing payment moved to a different policy.
4. **No response.** A large batch of leads never answered the [[Standard intro message]].

## The shared brain's side of the problem
The Sales workspace context adds two rules that change how an objection is handled.
- **Qualifying signals are separated from stalling.** Asking for a payment link, asking for final confirmation, asking for a hospital or network confirmation, asking for an urgent update, a large premium case and ready-to-buy language are hot-lead signals. "Send me more info" is not on that list - a third-party post in the vault argues it is the easiest brush-off in sales and the reply should be a question, not another document. See [[Lead prioritization]], [[Info request is not a buying signal]].
- **The reply style is fixed.** Concise, direct, one clear next step - confirm documents, confirm quote, schedule a call, send a payment link, or ask one closing question - and never overexplain. See [[Client message style]].

Related: [[Sales operations issues]], [[WhatsApp lead follow-up statuses]], [[Handling the price objection]], [[Customer categories]], [[Business Goals]].

## What the calls add
The transcribed calls in [[Call transcriptions]] show the same objections in the spoken channel, and how they are actually answered.

| Objection | The answer given |
|---|---|
| "Both quotes look identical - why is one dearer?" | The benefit sheets are the same because the **network operator** differs, not the cover. Move the comparison to claims-approval speed and service, and quote a concrete gap (10-20 minutes on a diagnostic approval) |
| "Is the 0% co-pay worth AED 700 more?" | Break-even: a typical 20%-co-pay visit costs about AED 270-300, so **three visits** cover the premium. Let the uncertainty stay visible - nobody knows how often the family will visit a doctor |
| "I want a specific hospital" | Check the network before quoting. If the plan does not include the named facility, offer a different plan - a chat shows exactly this: "we don't cover prime medical clinics", and an alternative plan was sent instead |
| "Why is the renewal more expensive?" | Age brackets and member count. A second, younger member added since last year moves the premium (AED 2,290.29 against AED 1,245 the year before on that renewal) |
| "Can I get it cheaper by changing who is on the policy?" | Yes, on a renewal - the question is answered, but the pricing is not fixed until the member list is confirmed |
| "Should I buy individual cover for my employees?" | Group cover is cheaper because the risk is pooled across the whole employee group - not everyone falls ill at once |
| "Can I split the family onto two plans?" | Possible but it has to be checked with the insurer, because the basic employee plan and the higher plan are different products |

Full detail: [[Handling the price objection]], [[Explaining co-pay and plan terms]], [[Quote request handling]].

## The pattern
Every objection is answered with a **number the customer can check** - three visits, ten minutes, AED 50, AED 4,000 - and never with a promise. The one exception is approval speed, which is a sales claim and is recorded as such on [[Takaful Emarat]] and [[Dubai Care]].

## Cross-source note: lead notes (2026-10-22)
In the 169 individual lead files, price or budget wording appears in 12 and medical-underwriting concerns (pre-existing, BMI loading, whether to declare) in 11; no file records "not interested" or "no answer", so lost leads are not logged. In renewals, the one recorded objection is a declined incumbent discount and cheaper outside quotes. See [[Individual health insurance leads folder]], [[Health renewals leads folder]].

## The code's objection taxonomy (2026-10-22 ingest)
The saved Python settings module declares nine objection types as a controlled list: Price, Network, Coverage, Timing, Trust, Competitor, Budget, Pre-existing, BMI. This is a **third objection vocabulary** in the vault, alongside the report's four (price, deferral, payment, no response) and the persona prompt's five playbooks (price, network gaps, knowledge gaps, trust, ghosting). The code's list is the one a system would classify into, and it merges the medical-underwriting pair (Pre-existing, BMI) that the report counts separately.

The same module has a nine-item lost-reason list (Price, Network, Coverage, No Response, Competitor, Budget, Timing, Trust, Other), which is close to the objection list with No Response swapped in - see [[Lost lead analysis]].

Source: [[Health Insurance Sales Agent Python Code]].
