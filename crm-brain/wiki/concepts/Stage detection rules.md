---
type: concept
sources: ["raw/work_os system designing documents/05_CODE/stage_detector.py", "raw/work_os system designing documents/00_ORIGINALS/stage_detector.py", "raw/work_os system designing documents/05_CODE/analyzer.py", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [pipeline, stages, inference, whatsapp, ai, code]
summary: "How the agent infers a pipeline stage from a WhatsApp message: six ordered rules over the AI analysis, a 19-stage list of which only 7 are reachable, and a default that assumes Followed Up."
---
# Stage detection rules

How a message is turned into a pipeline stage. The mechanism is a single function, `detect_stage(sender, analysis)`, in the archived code ([[Health Insurance Sales Agent Python Code]]); the stage list it returns into is the one in [[Insurance CRM pipeline]].

## The rule order

The detector reads three fields of the analysis dict produced by the analyzer - `intent`, `type` and `key_topics` - and applies six ordered rules, first match wins:

| Order | Condition | Stage |
|---|---|---|
| 1 | intent `ask_for_quote` **and** type `new_lead` | New Lead |
| 2 | intent `question` **and** type `follow_up` | Followed Up |
| 3 | `quote` in key topics | Quoted |
| 4 | intent `objection` | In Negotiation |
| 5 | any of document, payment, policy, application in key topics | Missing Documents Requested, or Payment Link Sent To Customer, or Application Pending |
| 6 | no match | **Followed Up** (logged as a warning) |

Any exception in the function returns New Lead.

## What the rules assume about the analysis

The detector is tightly coupled to the analyzer's output shape. It expects `intent` to be one of a small vocabulary (`ask_for_quote`, `question`, `objection`, plus `other`), `type` to be `new_lead` or `follow_up`, and `key_topics` to be a list of short topic strings. When the analyzer is unavailable it returns exactly that shape with neutral values, so the pipeline still runs - see [[Safe fallback defaults]].

Rules 1 and 2 are conjunctions, so a new lead who replies with a question and is typed `new_lead` falls through to rule 6 rather than matching either rule exactly.

## Two default answers, both quiet

The detector's two fallbacks are the notable part:

- **No match -> Followed Up.** The log says "Could not detect stage, assuming". This is the safe-sounding choice for a follow-up agent, and it is also the choice that erases information: an unrecognised message is recorded as a stage the lead may already have passed.
- **Exception -> New Lead.** A crash is treated as a brand-new conversation.

Neither fallback asks anything of the user, so a stage error is silent unless the log is read.

## Coverage: 7 of 19 stages are reachable

The 19-stage list in the code (the CRM list with "Allocated" removed) contains twelve stages no rule can ever produce: Renewal Terms Received, Renewal Terms Sent, Pending BOR Request, Application Submitted, KYC Cleared, Sent for Transaction Approval, Payment Initiated, Payment Pending, Sale Leads, Policy Documents Pending, Policy Pending, and Lost. Rule 5 is where the loss happens: the topic words document, payment, policy and application cover seven of those stages, and every one of them collapses into the same three outcomes.

The detection vocabulary and the stage vocabulary are therefore not the same size, and the detector's own docstring says "20-stage pipeline" while its list holds 19 - see [[Insurance CRM pipeline]] for the stage-count conflicts across the vault.

## The stage list is duplicated

`config.py` and `stage_detector.py` each carry their own copy of the 19 stages. A change in one does not reach the other, and the plan lists a third wording ([[Health Insurance Sales Agent Plan (Jan 2026)]]).

Related: [[Health Insurance Sales Agent Python Code]], [[Safe fallback defaults]], [[Insurance CRM pipeline]], [[Lead pipeline stages]], [[Negotiation stage stalls]], [[Draft and approve messaging flow]].
