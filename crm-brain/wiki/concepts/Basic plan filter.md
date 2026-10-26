---
type: concept
sources: ["raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [insurance, plans, filter, imcrm, extraction]
summary: "The extension's basic-plans filter - selected by network name, two cheapest per provider - and why it conflicts with the name-based entry-level set."
---
# Basic plan filter

The "Extract Basic Plans" button in the IMCRM extension filters the available-plans table down to a shortlist. The filter is defined **by network name**, and it is the one selection rule in the workspace that decides which plans reach a customer first.

## The rule as recorded
- **Include:** `E CARE BLUE`, `E CARE`, `AAFIYA (APN)`.
- **Exclude:** Fidelity, Takaful Emarat, Essential, Dubai Care and others.
- **Cap:** maximum **2 plans per provider**, sorted by **price ascending**.
- **Status:** the memory note records this filter as *in progress*, not finished.

Source: [[IMCRM extension memory note]].

## Why it is a network filter and not a tier filter
- The networks on the include list are the cheap end of the network ladder - see [[Network tiers]] and [[Insurance plan catalogue]].
- But the same networks can carry plans at different price points, and the **network label does not identify the tier**. `AAFIYA (APN)` is a network-plus-plan label in practice: APN is also a [[Takaful Emarat]] plan name. That is the ambiguity the name-based filter was written to remove.
- The 2-per-provider cap with price sorting is what keeps the output short: the two cheapest plans on each of the included networks.

## The conflict with the entry-level set
The later extraction plan (2026-05-22) selects entry-level plans **by plan name** and deliberately changes the filter key from network to plan name. The two rules disagree:

| | Basic filter | Entry-level extraction |
|---|---|---|
| Key | network name | plan name |
| Includes | E CARE BLUE, E CARE, AAFIYA (APN) networks | Takaful APN, Takaful Silver, Takaful Essential, Dubai Insurance Remento N4 |
| Excludes | Takaful Emarat, Essential, Dubai Care | nothing by provider |
| Result | two cheapest per included network | four fixed rows, always shown |

**The exclusion list names Takaful Emarat and Essential, while the entry-level set is three Takaful Emarat plans.** Both rules describe themselves as "the cheap plans". Either the exclusion list is about the *network* label rather than the insurer (that is, exclude Takaful Emarat's E-care and Nextcare writing, keep its Aafiya writing), or the two rules were written from different lists of what a customer can afford. Nothing in the ingested sources resolves it.

Source: [[Entry level plans extraction plan]].

## Practical consequences
- **The "2 cheapest per provider" rule hides the good comparison.** A customer who needs a specific hospital may need the third plan on a network, and the filter will never show it. Network fit is checked before price in this business - see [[Quote request handling]].
- **The filter's output is not the same as the sales pitch.** The scripted intro offers three tiers and a starting price for each; the basic filter returns a shortlist of plan rows. See [[Standard intro message]], [[Batch intro messaging]].
- The plan's own list of extraction problems includes a **known `priceIdx` strict-equality bug** in the older code, which mis-selected the price column - a plausible cause of a wrong "cheapest two".

Related: [[Entry level plans]], [[Network tiers]], [[Insurance plan catalogue]], [[IMCRM Data Extractor]], [[Co-pay and co-insurance]].
