# Worked examples

## Example 1 — raw CRM paste → filled email

This is the kind of raw paste Matheesha gives, straight from the Alfred CRM car lead page (trimmed to the relevant fields):

```
PRICE                960.67
AUTHORISED AT         21-08-2026 00:23:13
PROVIDER NAME          GIG INSURANCE (GULF) BSC(C)
PLAN NAME              GIG Gulf (AXA) - Third Party Only
QUOTE LINK             https://insurancemarket.ae/car-insurance/quote/SZH3CTGH
ORDER REFERENCE        auth_LV01C0920262323r5K72008919
PAYMENT REFERENCE      CAR-SZH3CTGH
CHASSIS NUMBER         SCFSMGAW7LGN04101
CREATED DATE           12-08-2026 20:13:52

Plan details:
GIG Gulf (AXA) - Third Party Only  TPL  Q26UAERTB615945  Up to AED 3.5 Million ...  914.92  914.92  960.67  0

INSURED FIRST NAME     Morris
INSURED LAST NAME      Frank Junior Dupker

Starting date 21/06/2026
```

Notes on the mapping:
- The CAR ref is `CAR-SZH3CTGH`, taken from PAYMENT REFERENCE (ORDER REFERENCE here is an internal auth token, not the CAR- code — always prefer the field that actually starts with `CAR-`).
- The Quotation No is `Q26UAERTB615945`, from the plan details row — not the ORDER REFERENCE and not the PAYMENT REFERENCE.
- The Amount is 960.67 (the final total in the plan details row), not 914.92 (the insurer net figure earlier in the same row).
- Starting Date (21/06/2026) falls *before* CREATED DATE (12/08/2026) — that's implausible for a lead that didn't exist yet, so it gets flagged rather than silently accepted.

Filled output:

```
Subject: Morris Frank Junior Dupker - CAR-SZH3CTGH - Motor Policy Issuance

Dear Team,

Good Afternoon!

Please note that we have uploaded all the documents and the payment is done. Kindly issue the policy and book the policy.

- Insurer - GIG Insurance (Gulf) BSC(C)
- Starting Date - 21/06/2026
- Quotation No - Q26UAERTB615945
- Chassis - SCFSMGAW7LGN04101
- Amount - 960.67 AED
- IMCRM Link - https://imcrm.alfred.ae/quotes/car/SZH3CTGH

Thanks & Regards,
```

Flag line after it: the starting date (21/06/2026) is before this lead's created date (12/08/2026) — worth confirming that's not meant to be a different date before sending.

## Example 2 — clean input, no issues

Input given directly by Matheesha:

> Insurer: Sukoon (Oman Insurance), starting 14/08/2026, quotation COMRT202610102131, chassis JTJHY00W8L4312433, amount 7216.65, client Krishna Khatri, ref CAR-APKGQQZ7

Filled output:

```
Subject: Krishna Khatri - CAR-APKGQQZ7 - Motor Policy Issuance

Dear Team,

Good Morning!

Please note that we have uploaded all the documents and the payment is done. Kindly issue the policy and book the policy.

- Insurer - Sukoon (Oman Insurance)
- Starting Date - 14/08/2026
- Quotation No - COMRT202610102131
- Chassis - JTJHY00W8L4312433
- Amount - 7216.65 AED
- IMCRM Link - https://imcrm.alfred.ae/quotes/car/APKGQQZ7

Thanks & Regards,
```

No flag line needed here — nothing missing, nothing implausible.
