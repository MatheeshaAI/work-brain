---
type: concept
sources: ["raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md", "raw/10_Work-Insurance/Crm_data_extraction.md", "raw/10_Work-Insurance/steps to get the client data from imcrm.md"]
updated: 2026-10-22
tags: [handoff, crm, extraction, workflow, ai]
summary: "The copy-and-paste handoff between systems: what a human carries from IMCRM to the next tool, and where the format has to change."
---
# IMCRM data handoff

The handoff between IMCRM and whatever comes next - a chat message, a tracker, a quote, or an agent. Today it is a **copy-paste**, and the note that documents it is a handoff contract.

## The contract, as written
The extension handoff ([[IMCRM Data Extractor handoff]]) lists the extraction functions that must not break, because each one pairs an extraction with a **formatter**:

| Extraction | Formatter |
|---|---|
| `runExtraction()` | `formatAsBulletList()` |
| `runMotorExtraction()` | `formatMotorAsBulletList()` |
| `extractSaveNumber()` | `formatSaveNumber()` |

The Copy button then routes by `lastExtractionType` - `lead`, `motor`, `saveNumber`, `checkedPlans` - so the same button produces four different outputs. **Any new extraction type needs a new branch in that routing.** That is the whole handoff contract in one sentence: one extractor, one formatter, one routing table.

## The two worked examples
Both worked extractions in this folder follow the same ten-section order - Customer profile, Member details, Lead status, E-com details, Available plans, Manage payments, Policy details, Documents, Booking details, Lead history - and both end with a "sections that were empty or collapsed" list. That consistency is what makes the format recognisable downstream.

The difference between them is instructive:
- one leads with a **family** policy and a full commission block, and enumerates 15 documents under a counter that says 16;
- the other leads with a **single-member** policy, captures **four pages of the 376-plan catalogue**, and lists the collapsed panels instead.

So the handoff format is stable in shape but variable in depth - the extractor takes what the page has.

## Why the handoff is fragile
- **Format changes with the extraction type.** The routing table is the first thing to break when a new type is added, and the handoff explicitly says so.
- **It carries everything.** The customer profile section includes Emirates ID, date of birth, nationality and the document list with file names. A handoff that copies the whole block copies PII into the next system - see [[Getting client data from the CRM]].
- **The receiver is not defined.** The handoff says "copy to clipboard" and stops. What happens next - CRM note, tracker row, chat - is not part of the contract, which is why the same lead can exist in three shapes (see [[CRM hygiene]]).
- **The proposal version replaces it eventually.** [[Using ICM for a CRM-driven insurance sales agent]] describes a connector script writing a markdown file per lead - a structured handoff instead of a clipboard one. It is a **design intent**, not built.

## Related
[[IMCRM Data Extractor]], [[Extracting leads from the CRM]], [[Getting client data from the CRM]], [[CRM hygiene]], [[Process inbox workflow]], [[Using ICM for a CRM-driven insurance sales agent]].
