---
type: concept
sources: ["raw/Health-Insurance/Workspace/Leads/Health Insurance/Individual-Health-Insurance/Individual-Health-Insurance.md", "raw/Health-Insurance/Workspace/Leads/Lead-Context/leads.md", "raw/Health-Insurance/Workspace/SYSTEM.md"]
updated: 2026-10-22
tags: [insurance, leads, dossiers, structure, templates]
privacy: aggregate only - no client field values are reproduced
summary: "The anatomy of one lead file - the six standard sections, the twenty-two status values and the naming rule that is only mostly followed."
---
# Dossier structure

A lead dossier is one markdown file per client. The template has six standard sections and one primary key; the parts that are not uniform are the status field and the working sections underneath.

## The template
```
# Lead Detail: [REF_ID] - [Customer Name]

## General Information     Ref-ID, Customer Type, Created Date, Advisor, Status
## Customer Profile       Full Name, Mobile, Email, Nationality, DOB, Gender, Emirate of Visa, Member Category
## Payment Details        Total Amount, Status, Payment Method
## Member Details         one row per member: name, policy PEC flag, gender, DOB, relation, nationality, emirate, category
## Documents              checklist of the files received
## Status Updates         dated log of what happened
```

Two variants sit on top of it: a **Quote Details** block (requirements, currently insured, transaction type, plan type, pre-existing condition) on the files that were quoted, and a **Call Notes** block on the files that were worked by phone.

## How uniform it really is
Across the 168 individual health dossiers: `Customer Profile` in 163, `General Information` in 161, `Payment Details` in 138, `Member Details` in 117, `Documents` in 109, `Status Updates` in 82 - and about 45 distinct heading names once the long tail is counted. **Reliable at the top, ad hoc at the bottom.**

Practical consequence: a script can rely on the identity fields and on `Status`; it cannot rely on `Documents` or `Status Updates` being present, and it must match headings loosely.

## The naming rule
`[REF_ID]-[First]-[Last].md`, with `HEA-` for health and `CAR-` for motor. **166 of the 168 individual health dossiers follow it.** The two that do not are named for the client only - and both are the two leads worked on the day the daily note was written, so the rule is applied to older cases and skipped on new ones. See [[Lead file naming]] and [[Lead reference IDs]].

The reference id is not decoration: it is the primary key of the store. The pipeline board, the task list, the renewal files and the CRM quote URL all address a lead by that key, and the document folder is named after it.

## The status field is the weak point
The `Status` value in `General Information` takes **22 distinct values** in the 168 dossiers - "New Lead" 81 and "New" 27 being the same state in two spellings, "Quoted" 18, "Followed Up" 13, "Allocated" 8, "Policy Booked" 4, four files with no status at all, and **eight values that are a CRM status with a parenthetical gloss attached** ("Quote Shared - Awaiting Client Confirmation", "New Lead (Quote Comparison Received)", "Application Submitted - Awaiting Quote Approval").

The drift is measured against three other vocabularies in the same workspace: six statuses in the April CRM export, seven in the 30-day export, five pipeline sections in the board, and a 16-stage CRM pipeline. See [[Lead pipeline stages]] and [[Insurance CRM pipeline]].

**The fix is small and mechanical:** map every dossier status onto the CRM's own stage list, and keep the free-text gloss in `Status Updates` where it belongs. Until then, any report that counts statuses has to know which file it is reading.

## Four templates, one store
The workspace contains **four** different lead-file templates:
1. the standard dossier above, used by the 168 files;
2. a **lead-context** template (contact info, timeline, plans and documents, activity log, next steps) with the file named for the client only - which is the convention the two name-only dossiers follow;
3. a **group** file keyed on the employer rather than a person;
4. a **renewal** file keyed on insurer plus policy number.

See [[Client dossiers]], [[Markdown-backed lead store]] and [[Insurance product lines]].

## Related
- [[Client dossiers]]
- [[Lead file naming]]
- [[Lead folder index files]]
- [[Lead pipeline stages]]
- [[Lead reference IDs]]
- [[Markdown-backed lead store]]
- [[Folder structure convention]]
- [[Underwriting rules]]
- [[Documentation requirements]]
- [[Lead folder note template]]
- [[Individual health insurance leads folder]]
- [[Lead data quality issues]]
