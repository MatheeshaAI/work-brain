---
type: concept
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/lead-handling-rules.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/business-goals.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md"]
updated: 2026-10-22
tags: [sales, leads, prioritization, crm]
summary: "Rank leads by status and intent signals - not by arrival time - so follow-up effort goes to the leads most likely to close."
---
# Lead prioritization

How the sales work decides which lead gets attention next. Written into the Sales workspace context; see [[Sales Context File Set]].

## Priority order
1. New Lead
2. Quoted
3. Application Pending
4. Qualified
5. Followed Up but stale
6. Lost

The logic behind the order: a new lead is worth a fast first contact; a quoted lead is waiting on a decision and can be pushed; an application pending lead is blocked on something you can remove; a qualified lead is ready for quote, documents or payment; a stale followed-up lead needs re-engagement; a lost lead rarely deserves time unless the loss reason suggests it is recoverable.

## Hot-lead signals
Asking for a payment link, asking for final confirmation, asking for hospital or network confirmation, asking for an urgent update, a large premium case, and ready-to-buy language. These override the status order - they are behavioural signals that a lead is close.

## Escalation rules
- Big premium plus clear intent = high priority.
- Any client waiting on your confirmation = high priority.
- Old, stale, low-intent leads = lower priority unless they are strategically important.

## The prioritisation lens
Urgency, premium size, likelihood to convert, and stage in the pipeline. See [[Business Goals]].

## How the data looks
In the May 2026 extract of 51 leads, 30 were already "Followed Up" and only 4 were "New Lead", so on that snapshot the queue is mostly stale follow-ups rather than fresh enquiries. See [[IMCRM Health Leads May 2026]]. That is a reason to sort by status first when starting a day.

## Related
- [[Lead tracking in the CRM]] - the folder and tracker system for the same pipeline
- [[WhatsApp lead follow-up statuses]] - the status board used on the messaging side
- [[Business Goals]] - the targets prioritisation serves
- [[Client message style]] - what the follow-up actually says
- [[Customer objections]], [[Insurance CRM pipeline]]

## Caveats
- The order is written as a list, not a score; nothing combines status and signal into one ranking, so two rules can disagree and there is no stated tie-break.
- "Stale" is not defined in days, and the CRM exposes a staleness badge whose threshold is not recorded here.

Related: [[My Shared Brain]], [[Sales]], [[IMCRM]].

## Cross-source note: renewals (2026-10-22)
The renewal notes mark expired or highest-value policies as priority in free text rather than a field ([[Health renewals leads folder]], [[Renewal tracking status flow]]).
