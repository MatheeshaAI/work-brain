---
type: source
sources: ["raw/10_Work-Insurance/{.md", "raw/90_Archive/sample_row.md", "raw/work_os system designing documents/00_ORIGINALS/{.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md"]
updated: 2026-10-22
tags: [mednet, schema, provider-network, data]
summary: "The JSON Schema for the combined MEDNET provider list, plus a one-row CSV sample showing the real column layout."
---
# MEDNET provider list schema

Two small data-shape files that describe the same dataset: the [[Mednet]] healthcare-provider network list used by the facility-search tooling ([[Network database design]], [[Finding a hospital in a network]]).

## `{.md` - the schema
A file whose stray name is just an opening brace; the content is a JSON Schema titled "MEDNET Healthcare Provider Network List Schema". It describes an array of provider objects.

- **Required fields (10):** provider code, provider name, group name (for example a hospital group), provider type (hospital, clinic, pharmacy), emirate, region, address, licence number, speciality, telephone.
- **Optional coverage flags:** dental, optical, alternative medicine, and special remarks (exclusions or notes).
- **Optional network columns:** GOLD, GREEN, PEARL, SILVER CLASSIC, SILVER PREMIUM, SILK ROAD OP, SILK ROAD IP. A provider covered by a network carries a tick character, otherwise null. The tick is stored as a mis-encoded character ("u-umlaut" in the schema text), which is the usual Wingdings tick surviving an export without its font.
- The schema is "combined" because several Mednet files, each with a different set of network columns, were merged, so not every record has every network column.

## `sample_row.md` (Archive)
A single CSV data row, about 16 KB, almost all trailing empty commas. Its first columns are a provider code, a hospital name, group, type, emirate, region, address, licence number, speciality and phone number, followed by two tick characters and several hundred empty columns. It is a public facility record, not client data. It demonstrates that the real export is far wider than the schema: the empty tail suggests a spreadsheet with many unused columns that should be trimmed before loading.

## Why it matters
- The seven network columns equal the Mednet tiers in [[Network tiers]] and the codes in [[Network plan code list (NAS_CN)]].
- A loader must treat tick characters, not text, as the true/false signal, and must decode them consistently.
- Caveat: the schema is a design aid; whether the data was actually validated against it is not recorded.

## Also stored in work_os
The schema is in `00_ORIGINALS/{.md` (the file is named only "{" because it is raw JSON) and, properly named, `03_INSURANCE_KNOWLEDGE/MEDNET_Provider_Schema.md` (same content). The Master Index points to it as the field-level schema behind the hospital lookup template: [[TPAs and Networks Reference (Work OS)]].
