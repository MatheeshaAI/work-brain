---
type: concept
sources: ["raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt", "raw/10_Work-Insurance/todos.md"]
updated: 2026-10-22
tags: [documents, whatsapp, policy-admin, process]
summary: "What gets requested after a quote: the five-item accounts pack, insurer document delays, e-cards and the medical application upload."
---
# Document request handling

The second half of a health-insurance sale is paperwork, and it is the half the chats show most frustration about. Source: the [[WhatsApp chat exports]] and [[Todos]].

## Three document flows

**1. The accounts pack.** A member of the broker's own ops team asks, in chat, for five items to be sent to accounts:
- Certificate
- Schedule
- Tax invoice
- Credit note
- E-card

That list is the post-issue pack. It matches the motor-side paperwork pattern in the [[IMCRM Data Extractor]] notes and the CRM document list below.

**2. The CRM document list.** A health lead record in the CRM carries **16 documents** per client, across five groups:
| Group | Items |
|---|---|
| Underwriting | Risk score, medical application form (signed), medical application form |
| Identity | KYC, passport copy, Emirates ID, visa page |
| Payment | Receipt, receipt screenshot, tax invoices |
| Policy | Policy schedule, policy wordings / bond, policy certificate, e-card |

The identity and payment items are **PII** and stay in the CRM; only the group-level count is reproduced here. This set is why the CRM extraction route in [[Getting client data from the CRM]] needs a privacy pass before anything is copied out.

**3. The pre-issue upload.** In some chats the client uploads documents and the medical application form through a quote payment link (`insurancemarket.ae/health-insurance/quote/<ref>/payment/?providerCode=TE&planId=306&selectedCopayId=314`), and a colleague confirms in the group chat that the insurer has been asked and will share once received.

## Where it breaks

**The insurer is the bottleneck.** Two chats show the same pattern:
- "by monday will get the rest of the documents from the insurance company"
- "Will share you the documents shortly sir still didn't get it from the insurance company"

The desk promises a date, the insurer misses it, and the customer waits. The customer-facing message has to apologise for a delay the desk does not control ([[Sales operations issues]]).

**The e-card is the last visible step.** [[Todos]] carries two of the four open tasks on exactly this: a client waiting for the **e-cards** of the policy, and documents that have been **received but still need submitting in the CRM** to release the policy documents. One of these tasks is a client waiting with nothing to chase.

**Client-side uncertainty.** "I'm not sure about the last 2 details" - the client cannot complete a form. That needs a call, not a document request, which is why the routine in [[Call handling routine]] starts with a call.

## Why this matters for the pipeline
- Documents are the point where the [[CRM hygiene]] problem becomes visible: a document received in WhatsApp is not the same as a document attached to the lead.
- The 16-document list is the **complete** list a sale can accumulate; the CRM has to carry it and the desk has to chase it.
- The delay is external (insurer) but the promise is internal (desk), so the gap between "quoted" and "policy issued" is where the [[WhatsApp lead follow-up statuses]] vocabulary is thinnest.

Related: [[Document request handling]], [[Getting client data from the CRM]], [[Extracting leads from the CRM]], [[Process inbox workflow]], [[Open tasks]], [[Sales operations issues]].

See also (added): the dictated checklist in [[Policy submission documents]] and file naming in [[Document renaming workflow]].
