---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/do-not-do.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/lead-handling-rules.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/todos.md", "raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv"]
updated: 2026-10-22
tags: [insurance, operations, process]
summary: "The recurring failures in the health-insurance sales process - unsent drafts, delayed insurer documents, payment links, wrong networks - confirmed from calls, chats, tasks and exports."
---
# Sales operations issues

Recurring problems in the health-insurance sales process, from [[WhatsApp analysis May-June 2026]]:

| Issue | What happens | Fix suggested by the report |
|---|---|---|
| Draft left unsent | A prepared reply about installment plans never goes out | Send it the same day |
| Payment link pending | Customer is ready to pay and waits for a link | Send immediately; chase confirmation after |
| Insurer documents delayed | Customer paid, policy documents did not arrive for over a month | Chase the insurer for the documents |
| Wrong plan issued | A policy was issued under one TPA's network when another was needed (a Dubai Care N5 versus a Next N5 case with different dental limits, AED 2,000 versus 3,500) | Resolve with the insurer, ask whether it can switch without new payment |
| Quote expires | Quotes are valid for 30 days, then prices change | Re-quote when the customer returns |

## Insight
Most items are waiting on a person, the insurer or a payment link, not on the customer. That makes them good candidates for reminders or automation ([[WhatsApp lead follow-up statuses]]).

See [[Dubai Care]], [[Nextcare]], [[Customer objections]].

## The same list, confirmed a month earlier by the daily audits
The [[Daily sales audit]] window of 26-29 May 2026 shows most of these as a standing pattern rather than one-off incidents. Counts only:

| Issue | In the audits |
|---|---|
| Insurer documents delayed | Policy issued on 27 May, documents ready but the certificate of insurance still pending |
| Quote expires | A quote revised after a medical review sat unreviewed for 2 days; a competing quote was outstanding for 3+ days |
| Payment link pending | 1 approved application waiting on payment, open from 28 May |
| Wrong plan / wrong network | The largest single client blocker: a client waiting for an answer about a specific hospital network, unanswered for 23, 24, 25 days |
| Draft left unsent | The audit prepares 5-8 drafts a run and replaces them on the next run - there is no sent state, so an unsent draft is lost |

## Two issues the audits add that the WhatsApp report does not list
1. **Renewal lapse.** A policy flagged at one day from expiry and never confirmed renewed - escalated from "expires today" to "likely lapsed" and stayed open for all four days. The whole renewal pipeline was 7-10 policies deep, every run.
2. **Unhandled internal hand-over.** A colleague asked for help issuing a policy; it stayed unanswered for 8 days because nothing in the workflow tracks an internal request.

The pattern behind both is the same as the rest of the list: **waiting on a person, an insurer or a payment link, not on the customer.** See [[Sales System]], [[Sales task automation]], [[IMCRM]].

## The shared brain's operating rules for the same list
The Sales workspace context now holds a written rule set aimed at exactly these failures - see [[Sales Context File Set]].
- **Drafts are never sent automatically.** "Do not send WhatsApp messages unless explicitly instructed" is the direct answer to the unsent-draft problem: the human stays in the loop at the send step. See [[Automation guardrails]].
- **Staleness is a priority signal.** A "Followed Up" lead that has gone stale is re-ranked rather than left in the queue, and a lead waiting on your confirmation is always high priority. See [[Lead prioritization]].
- **The CRM is the source of truth for status.** Lead status, last-modified date and the follow-up date live in [[IMCRM]], and the health list can be read in bulk rather than one lead at a time - see [[Extract IMCRM Health Leads Workflow]].
- **Client messages have one job.** A reply carries one clear next step, so a stalled thread has a stated reason to move. See [[Client message style]].

## The raw material confirms the same list, from three more angles

**Calls.** All five transcribed calls in [[Call transcriptions]] end with a promise to send something - policy wordings, a comparison, a corrected premium table, a turnaround time. **None carries a date, a duration, a lead ID or an outcome code.** The promise is the only next step the record holds, so nothing tracks whether it was sent. See [[Call handling routine]].

**Chats.** The raw WhatsApp exports show the delay problem at source: two chats promise documents "by monday" and "shortly" because the insurer has not delivered, one customer is told the quotation was sent to email (so the working content leaves the channel), and the client-facing reply has to apologise for the delay. About 20 of 64 visible chats carry no lead reference at all, so they cannot be chased from the CRM. See [[WhatsApp follow-up gaps]], [[Document request handling]].

**The desk's own task list.** The four open items in [[Todos]] are two document-flow stalls (e-cards, documents received but not submitted in the CRM), one QA refer-back waiting on underwriter approval, and one pure retrieval - "look into the last conversation" for a client asking for quotations. See [[Open tasks]].

**The commission export.** The book-of-business CSV is where the reporting side of the same problem lands: `Period begin` is an epoch placeholder on 20 of 32 rows, `Date paid` on 23, `Currency` and `Installment` are empty on every row, and `Paid` holds sums rather than flags. Any ageing or renewal-due report built on it is wrong, and wrong silently. See [[Commission and premium reporting]], [[Sales commission export]].

**The CRM.** The lead status vocabulary has no slot for any of these post-sale states, so a lead can read Quoted in the CRM while the desk is waiting on an insurer. See [[CRM hygiene]].
