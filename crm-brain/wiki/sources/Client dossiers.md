---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Health Insurance/Individual-Health-Insurance/Individual-Health-Insurance.md", "raw/Health-Insurance/Workspace/Leads/Health Insurance/Group-Health-Insurance/Group-Health-Insurance.md", "raw/Health-Insurance/Workspace/Leads/Motor Insurance/Motor-Insurance.md", "raw/Health-Insurance/Workspace/Leads/Leads.md", "raw/Health-Insurance/Workspace/Leads/Lead-Context/leads.md", "raw/Health-Insurance/Workspace/Leads/Referral Leads/Referral_Leads_Tracker.md", "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/May/May-Health-Insurance.md", "raw/Health-Insurance/Workspace/Renewals/May/RENEWALS-May-2026.md"]
updated: 2026-10-22
tags: [insurance, leads, dossiers, structure, renewals]
privacy: aggregate only - the dossiers hold names, phone numbers, emails, lead references, dates of birth and health information; none is reproduced here
summary: "The client dossier collection: 168 individual health dossiers, 5 motor, 1 group, 20 renewal files, plus folder indexes and the lead-status drift inside them."
---
# Source: Client dossiers

The lead store of the insurance workspace: **243 files** under `raw/Health-Insurance/Workspace/Leads/`. Every client the desk has worked is a markdown file, and every folder of lead files carries an index. Nothing here is ingested file by file - the dossiers hold names, phone numbers, emails, lead references, dates of birth and health information, so this page records **structure, counts and vocabulary only**.

## The tree
| Folder | Files | What is in it |
|---|---|---|
| `Health Insurance/Individual-Health-Insurance/` | 169 | **168 dossiers** + 1 index |
| `Health Insurance/Group-Health-Insurance/` | 2 | 1 group-policy file + 1 index |
| `Motor Insurance/` | 6 | 5 motor dossiers + 1 index |
| `Leads/` (root) | 2 | 1 stray health dossier + 1 index |
| `Lead-Context/` | 2 | 1 active-leads table + 1 index |
| `Referral Leads/` | 2 | 1 referral tracker + 1 index |
| `Renewals/Health Insurance/{Month}/` | 44 | 12 month folders, each an index + a board, plus 20 renewal dossiers |
| `recovered files/` | 16 | 1 recovery note + 15 archived scripts |

The separate `Workspace/Renewals/` folder holds a **fourth** copy of the renewal month: `May/` with one renewal dossier, a `_reference` variant of the same dossier, an index and a board.

## Naming
| Kind | Pattern | Count |
|---|---|---|
| Individual health lead | `HEA-XXXXXXXX-First-Last.md` | 166 |
| Individual health lead, **name only** | `First-Last.md` | 2 |
| Motor lead | `CAR-XXXXXXXX-First-Last.md` | 5 |
| Group policy | employer name only, no reference | 1 |
| Renewal | `[Provider]-[PolicyNumber]-First-Last.md` | 20 |
| Stray at the root | `HEA-XXXXXXXX-First-Last.md` | 1 |

The two name-only files are **the two leads that appear in the daily note** - the policy enrolled and the quotation sent on 20 May. They are the newest cases and the newest ones have not been given the reference-id prefix yet, so the convention is applied inconsistently rather than broken. The reference is the primary key of the whole store, and it is also what the pipeline, task list and renewal files link to - see [[Lead reference IDs]] and [[Lead file naming]].

Renewal files use the **insurer's own policy scheme** as the key: `DIC-` (Dubai Insurance), `TE-` (Takaful Emarat), `HAYAH-`, `OI2-` ([[Oman Insurance]] - not [[Orient Insurance]], see that page). One renewal file carries `TE-TBD` because the policy number was not yet known - the placeholder survives into the filename.

## The folder indexes
Every folder has an index: `<Folder name>.md`, a count line `## Leads (n)` and one entry per file - a wikilink to the file, then the display name, separated by a double dash - sorted by filename. See [[Lead folder index files]].

**The individual-health index is out by two.** It lists **166** entries; the folder holds **168** dossiers. Two dossiers are not in the index, and no index entry points at a missing file. The root index lists 1 entry (the stray), which is correct for the root but is read by the workspace audit as the main index being wrong - see [[Workspace audit June 2026]].

## The dossier anatomy
The canonical template, as the workspace documents it:
`General Information` -> `Customer Profile` -> `Payment Details` -> `Member Details` -> `Documents` -> `Status Updates`.

**How uniform is it actually?** Counting the `##` headings across the 168 individual dossiers:

| Heading | Files |
|---|---|
| Customer Profile | 163 |
| General Information | 161 |
| Payment Details | 138 |
| Member Details | 117 |
| Documents | 109 |
| Status Updates | 82 |
| Lead Status | 27 |
| Quote Details | 26 |
| Notes | 23 |
| Status History | 22 |

and about **45 distinct heading names in total** once the long tail is counted - `Available Plans Extracted` (13), `Documents Received` (16), `Member Information` (15), `Notes / Status Updates` (13), `Documents Location` (10), `Last Year's Policy Details` (9), `Related Tasks` (7), plus roughly twenty-five headings that appear once, several of them numbered variants (`3. Customer Profile`, `4. Member Details`) and several that are case-specific rather than structural.

So the template is **consistent at the top and drifting at the bottom**: every file carries the identity fields, and the working sections are whatever that case needed. A parser can rely on `General Information` and `Customer Profile`; it cannot rely on `Documents` or `Status Updates` being present.

## The status vocabulary - the biggest single drift
The `Status` field in `General Information` takes **22 distinct values** across the 168 dossiers:

| Value | Files | Value | Files |
|---|---|---|---|
| New Lead | 81 | Quote Shared - Awaiting Client Confirmation | 1 |
| New | 27 | Await WhatsApp Response | 1 |
| Quoted | 18 | Enrolled | 1 |
| Followed Up | 13 | Inquiry | 1 |
| Allocated | 8 | Application Submitted - Awaiting Quote Approval | 1 |
| Policy Booked | 4 | Application Submitted | 1 |
| (no status field) | 4 | Application Pending | 1 |
| Policy Cancelled | 1 | Payment Pending | 1 |
| New - Quote Requested | 1 | Quote Sent | 1 |
| New Lead (Quote Comparison Received) | 1 | Quoted (InsuranceMarket.ae Quote Comparison Sent) | 1 |

Compare with the other vocabularies in the workspace: the CRM exports use **six** statuses, the 30-day export **seven**, the pipeline board **five sections**, and the CRM itself has a **16-stage** pipeline. See [[Lead pipeline stages]] and [[Insurance CRM pipeline]].

**"New" and "New Lead" are the same thing** and together are 108 of 168 files. Four files have no status at all. Eight values are a CRM status with a parenthetical gloss attached - a habit of writing the state and the reason in one field, which is why the set cannot be enumerated.

## The lead-context table
`Lead-Context/leads.md` is a **third** active-leads view with its own status legend: **Prospect, Quoted, Pending, Enrolled, Inactive** (prospect = initial contact, quoted = plans sent, pending = awaiting decision or documents, enrolled = policy activated, inactive = no activity in 30+ days). It holds two rows, and its links point at `leads/` and `daily/` paths that do not exist in the workspace. It also carries a **fourth** lead-file template - contact info, timeline, plans and documents, activity log, next steps - with the file named `leads/[FIRSTNAME-LASTNAME].md`, which is the convention the two name-only dossiers follow.

## The referral tracker
`Referral Leads/Referral_Leads_Tracker.md` holds **3 referral leads pending IMCRM entry**, all from one referrer, all status **Message Sent**, all added 20-05-2026, all awaiting a response, with the detail blocks still empty ("awaiting name and details"). It records a **six-step conversion process**: collect details -> enter in IMCRM to generate the reference -> create the lead file -> create the documents folder -> move into the pipeline sections -> remove from the tracker or mark it converted. See [[Referral lead records]].

## The renewal dossiers
20 renewal files across 12 month folders - **8 in April, 10 in May, 2 in June**; the other nine months hold only the index and the board, with no cases. Each month folder has `<Month>-Health-Insurance.md` (an index of that month's renewal files) and `<Month>-Renewal.md` (the month's renewal board: client, policy number, provider, expiry date, status, gross premium, notes).

The board's status flow is: **Due -> Contacted -> Quote Sent -> Payment Pending -> Renewed -> Lapsed**. See [[Renewal pipeline]].

## Caveats
- **Dossiers are working notes, not records of truth.** The same client appears in a dossier, a pipeline row, a task, a renewal file and a CRM quote page; the files are updated by hand and drift.
- **Health information is present** in individual dossiers, including condition-declaration decisions and medical-underwriting notes. None of it is reproduced here - see [[Client privacy exposure in agent memory]] and [[Underwriting rules]].
- **The `recovered files/` folder** holds 15 archived scripts and a 3.7 MB plan debug dump recovered from git on 20 May 2026; the dump contains member dates of birth and contact details, so it is described only by shape. See [[Recovered WhatsApp scripts]].

## Related
- [[Dossier structure]]
- [[Renewal pipeline]]
- [[Referral lead records]]
- [[Markdown-backed lead store]]
- [[Lead file naming]]
- [[Lead folder index files]]
- [[Lead pipeline stages]]
- [[Lead reference IDs]]
- [[Pipeline board]]
- [[Renewals board]]
- [[Referral leads board]]
- [[Task list]]
- [[Daily activity 20 May 2026]]
- [[Client privacy exposure in agent memory]]
- [[Individual health insurance leads folder]]
- [[Motor insurance leads folder]]
- [[Group health insurance leads folder]]
- [[Health renewals leads folder]]
- [[Referral leads folder]]
- [[Referral Leads Tracker]]
- [[Renewals Pipeline April 2026]]
- [[Renewals Pipeline May 2026]]
- [[Lead folder note template]]
- [[Lead data quality issues]]
- [[Workspace Leads folder overview]]
