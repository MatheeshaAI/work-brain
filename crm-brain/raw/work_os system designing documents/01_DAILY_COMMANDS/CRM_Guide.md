# IMCRM (Alfred.ae) — Guide & Reference

## Accessing the CRM
- **URL:** https://imcrm.alfred.ae
- **Health Lead URL format:** `https://imcrm.alfred.ae/quotes/health/{REF-ID}`
- **Lead list:** https://imcrm.alfred.ae/quotes/health (filter by your name / status)

---

## What's on a Health Lead Page

Each health lead page contains these sections — all expandable:

| Section | What you'll find |
|---|---|
| **Customer Profile** | Name, mobile, email, nationality, DOB, Emirates ID, visa emirate, salary band, risk category, KYC status |
| **Member Details** | All insured members with DOB, relation, nationality |
| **Lead Status** | Current pipeline stage + transaction type |
| **E-COM Details** | Selected plan name, provider, payment status, network, co-pay, total price |
| **Available Plans** | All 376 plans sorted by price — filter by plan type (Entry/Good/Best) |
| **Manage Payments** | Payment ref, collection date, method, VAT, total, allocation status |
| **Policy Details** | Policy number, issuance date, start/expiry date, quote number |
| **Documents** | All uploaded files (passport, EID, visa, MAF, policy schedule, e-card) |
| **Booking Details** | Invoice description, commission %, VAT on commission |
| **Lead Activities** | Follow-up tasks assigned |
| **Lead History** | Every status change with timestamp + who changed it |
| **KYC Audit Logs** | KYC verification trail |

---

## How to Extract Full Client Data (with Claude)

1. Open the lead in IMCRM (e.g. `https://imcrm.alfred.ae/quotes/health/5R8HU8C9`)
2. **Expand all sections** by clicking each dropdown/accordion
3. Use **Claude Code with browser extension** — it will read the full expanded page
4. Ask: *"Extract all data from this IMCRM health lead page and organize it by section"*
5. Claude will return a structured summary like the examples below

---

## Real Extraction Examples

### Example 1 — Lead: HEA-5R8HU8C9 (Policy Issued)

**Customer:** Rathan Prathap Castelino
**Mobile:** 0505013131 | **Email:** accounts@rcinternational.me
**Nationality:** Indian | **DOB:** 25-06-1973 | **EID:** 784-1973-2162698-4
**Visa Emirate:** Ras Al Khaimah | **Salary:** Above AED 4,000
**KYC:** Complete | **Risk:** Low Risk

**Policy Issued:**
- **Plan:** Dubai Care N4 (Entry level, DUBAI CARE)
- **Provider:** Dubai Insurance
- **Co-pay:** 20% max AED 50 (consultation, diagnostics, medicines)
- **Total Price (with VAT):** AED 4,036.52
- **Policy Number:** 572095 | **Start:** 24/04/2025 | **Expiry:** 23/04/2026
- **Commission:** 13.91% = AED 537.33 (inc. VAT)

**Documents uploaded:** 15 files (EID, passport, visa, MAF, policy schedule, e-card, invoices)

---

### Example 2 — Lead: HEA-M87D9GAS (Policy Booked)

**Customer:** Rian Nathan Castelino (Dependent child, DOB: 24-08-2007)
**Mobile:** 0505013131 | **Email:** marketing@rcinternational.me
**Nationality:** Indian | **Visa Emirate:** Ras Al Khaimah
**KYC:** Complete | **Risk:** Low Risk

**Policy Booked:**
- **Plan:** Dubai Care N4 (Entry level, DUBAI CARE)
- **Provider:** Dubai Insurance
- **Total Price (with VAT):** AED 1,919.10
- **Payment:** Paid | AED 1,807.80 (inc. VAT)

**Available Plans:** 376 total — cheapest starts at AED 930 (Takaful Emarat - E Care Blue 1)

---

## Quick Tips

- **Stage 5 leads (In Negotiation):** Set a next follow-up date in Lead Activities
- **Missing documents:** Check the Documents section — look for any missing from the required list
- **Payment tracking:** Use "Manage Payments" → check if fully allocated
- **Commission check:** In Booking Details → Commission (VAT APPLICABLE)
- **Lead history:** Shows every status change — useful to understand the full journey
