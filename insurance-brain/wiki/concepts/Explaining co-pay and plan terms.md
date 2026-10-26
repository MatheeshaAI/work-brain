---
type: concept
sources: ["raw/10_Work-Insurance/Call transcriptions.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [insurance, explainers, co-pay, sales]
summary: "The glossary the desk explains on calls: co-pay, dental limits, physiotherapy, maternity, newborn cover and network names."
---
# Explaining co-pay and plan terms

The largest block of talk in [[Call transcriptions]] is the advisor reading the quotation sheet aloud and explaining what each line means. This page is that glossary. It is the spoken counterpart of the [[Plan price tiers]] table.

## The vocabulary

| Term | What the customer is told |
|---|---|
| Co-payment | The customer's share at the clinic. Nothing is claimed back; the customer only pays the co-pay. |
| Consultation co-payment | 20%, **capped at AED 50**. The cap is demonstrated: a 350 consultation becomes 50, not 70. |
| Diagnostics (scans, tests) | 20% on the 20% option, 0% on the 0% option. |
| Medicines | 20% on the 20% option, **no cap** - so 20 dirhams on a 100 dirham medicine and 100 on a 500 dirham one. |
| Inpatient | 10% of the final bill. |
| Routine dental | 20%, no cap. Covers check-ups and ordinary tooth pain. |
| Major dental | Implants and major surgery are **not** in the dental line; they come out of the annual limit, quoted at AED 3,500. |
| Physiotherapy | 15 sessions per year, and only after a doctor consult, a doctor's report and (for a fracture, say) x-rays sent to the insurer for approval. No self-referral to a physiotherapist. |
| Surgery | Room and board is private. |
| Maternity | Pre-natal scans, ultrasound and consultations; gynaecology is covered even when the patient is not pregnant. |
| Delivery / newborn cover | The baby is covered for the first 30 days under the mother's policy. |
| Outpatient co-pay options | The sheet lists 0% / 10% / 20% "as per chosen outpatient co-pay" - a choice the customer makes, not a fixed benefit. |
| Network vs insurer | A quote line names a **network** (Dubai Care N4, Takaful Emarat Pearl). Two insurers can quote the same network; that is why two quotations can look identical. |

## How the explanation is delivered
- **Anchor to a number the customer recognises.** A consultation at a good hospital is about 350; a blood test 250-300; medicine 500. The percentage is turned into a dirham figure.
- **Show the cap working.** The AED 50 consultation cap is proved by taking a larger number and showing the customer still pays 50.
- **Use the plan's own sheet.** The advisor says "at the top of the document you see routine dental again" - the explanation tracks the customer's own document, not a script.
- **Separate what is covered from where it is paid from.** Coverage (dental line, annual limit, session count) is one thing; the share (co-pay, cap) is another. Mixing them is what makes quotations look identical.

## Why it matters
- It is the **main tool for the price objection**: once the customer understands that a cheaper plan differs only in who operates the network, the price gap becomes a service question rather than a value question ([[Handling the price objection]]).
- It is also the source of the [[Customer categories]] signal: salary band, visa type and network choice decide which of these lines the customer will actually use.
- The same three terms (consultation 20% capped at AED 50, diagnostics 20%, medicines 20%) appear in the written channel - the chat exports use them as the standard line for every plan quoted - so the explanation on the phone matches the sheet in the message.

Related: [[Plan price tiers]], [[Network tiers]], [[Dubai Care]], [[Takaful Emarat]], [[Call handling routine]], [[Customer objections]].

## The extraction-side distinction (2026-10-22 ingest)
The customer explanation above mixes co-pay and co-insurance, but the **data extraction has to keep them apart**: on an IMCRM quote page the co-pay column header also matches "co-insurance", so the original extraction code put the two in one column. The fix requires the co-pay header to exclude "insurance" and matches co-insurance separately, giving two output columns. See [[Co-pay and co-insurance]].

The same page has a **two-price** structure - a price and a total indicative price - which is a second thing the desk's one-line "20% max AED 50" quote does not convey. The plan's own build notes also name a live bug in the older code: the price column was chosen by strict equality on the header text, so a differently-headed price column was silently missed.
