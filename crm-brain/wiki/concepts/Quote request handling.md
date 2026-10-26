---
type: concept
sources: ["raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt"]
updated: 2026-10-22
tags: [whatsapp, quotations, pricing, sales]
summary: "How a quotation request is handled in chat: plan-by-plan messages, payment links, hospital-fit checks and renewal premium questions."
---
# Quote request handling

What a chat looks like once the customer has moved from "send me quotes" to a comparison. Source: the [[WhatsApp chat exports]].

## The request itself
"quotation" appears **29 times** across the visible rows of `chatlist_full.txt` (26 in `whatsapp_body2.txt`) - more often than any other topic besides the intro. Three request forms appear:
- the customer asks for a quotation directly;
- a colleague asks on the customer's behalf ("can we get the renewal quote for same pls?");
- the customer pushes back on a plan that does not fit and asks what else is available.

## The three-part answer
The standard reply is a message containing **plans, prices and links** in one block. Two shapes appear:

**Individual case** - two tiers sent with a one-line summary each, then the payment links:
- Takaful Emarat - **APN Plan (Aafiya)**, with the quote link
- HAYAH Insurance - **Care Protect RN3 B**, with the quote link

**Family case** - three tiers, same structure:
- Dubai Care - **Next N5**
- HAYAH - **Care Protect RN3 B**
- Takaful Emarat - **Silver**

Each link is a `insurancemarket.ae/health-insurance/quote/<lead-ref>/payment/` URL carrying a **provider code, a plan id and a co-pay id** (for example `providerCode=TE&planId=447&selectedCopayId=674`). The co-pay id is why the same plan can be quoted at 0% or 20% without a new document ([[Explaining co-pay and plan terms]]).

## The hospital-fit check
When the customer names a facility, the fit is checked before the plan is offered, and the answer can be "no":
- one lead asked for a **Canadian specialist hospital**;
- another was sent an alternative because **"we don't cover prime medical clinics"** - i.e. the plan the customer had picked does not include the clinic they named, so a different plan was proposed instead.

This is the network constraint made concrete: a plan that looks cheaper can be unusable. It is the same trade-off the phone call argues in [[Handling the price objection]], and it is why [[Network tiers]] and [[Plan price tiers]] both have to be read together.

## The renewal premium question
One chat turns a renewal into an explanation rather than a quote:
- the renewal premium is **AED 2,290.29** against **AED 1,245** the year before;
- the reason given is **age brackets** - a second, younger insured member had been added since the previous year, so the premium is priced differently;
- the customer also asks whether the **renewal premium can be reduced by adding or removing family members**.

So a renewal quote is not a repeat of the last one: age band and member count both move.

## The unpaid-quotation state
One customer asks "can you share the link to pay?" about a policy paid for the year before - a payment link being re-requested for an existing policy, which is a different task from issuing a new quotation and belongs with [[Document request handling]].

## Where the quote actually lives
The quotation leaves the chat in three forms: the **message** (plans + prices + links), the **email** ("I have shared the quotation details to your email sir"), and the **CRM record** (which quotes plan names against a lead). That triplication is the root of [[CRM hygiene]] - a price quoted in a chat and a price in the CRM can disagree without either system noticing.

Related: [[Plan price tiers]], [[Network tiers]], [[Document request handling]], [[Customer objections]], [[Handling the price objection]], [[Explaining co-pay and plan terms]], [[Sales operations issues]].
