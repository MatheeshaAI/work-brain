# Dubaicare Network Comparison — N1, Exclusive N2, N2, N3, N4

**Source:** `Dubaicare-Full Network List.csv`  
**Date:** 2026-06-02  
**Scope:** All hospital-type providers (`HOSPITAL`, `DHA HOSPITAL`, `MOH HOSPITAL`, `SEHA HOSPITAL`) across all 7 emirates.

---

## How the Networks Work — including Exclusive N2

The CSV has **two separate N2 columns**: `Exclusive N2` and `N2`. Here's how they relate:

### Coverage Counts (all 4,220 providers in file)

| Network | All Providers | Hospitals Only |
|---------|--------------:|---------------:|
| **N1** | 3,924 | 162 |
| **Exclusive N2** | 3,851 | 148 |
| **N2** | 3,499 | 90 |
| **N3** | 3,396 | 76 |
| **N4** | 3,172 | 42 |

### The Exclusive N2 vs N2 relationship

- **Exclusive N2 is *broader* than N2** — every provider with N2 also has Exclusive N2
- **No provider** (out of 4,220) has N2 without Exclusive N2
- **352 providers** have Exclusive N2 **without** N2 — including **58 hospitals**

So the hierarchy by provider count is:

```
N1 (3924)  →  Exclusive N2 (3851)  →  N2 (3499)  →  N3 (3396)  →  N4 (3172)
  most inclusive                                         most exclusive
```

| Network | What it means |
|---------|---------------|
| **N1** | Broadest participation — nearly every provider accepts this tier |
| **Exclusive N2** | A negotiated tier, broader than N2 — includes all N2 providers plus 352 more who are on the "Exclusive" list only |
| **N2** | A subset within Exclusive N2 — only 90 of 162 hospitals |
| **N3** | Narrower still — 76 hospitals |
| **N4** | Most exclusive — only 57 hospital-type providers (SEHA/government + Burjeel/NMC/Aster/Thumbay/Saudi German/Ahalia chains) |

> **Key insight:** Most premium private hospitals (Cleveland Clinic, Mediclinic, Kings College, Moorfields, Health Bay, etc.) participate in **Exclusive N2** but NOT in N2, N3, or N4. They're in that pool of 58 hospitals that have Exclusive N2 checked but N2 unchecked.

---

## Summary Table — All Hospital Types by Emirate

| Emirate | Total | N1 | Excl N2 | N2 | N3 | N4 | Dental |
|---------|------:|---:|--------:|---:|---:|---:|-------:|
| **ABU DHABI** | 65 | 65 | 59 | 46 | 43 | **25** | 9 |
| **DUBAI** | 83 | 83 | 76 | 32 | 23 | **11** | 10 |
| **SHARJAH** | 25 | 25 | 24 | 17 | 17 | **8** | 7 |
| **AJMAN** | 9 | 9 | 9 | 9 | 9 | **7** | 8 |
| **UMM AL QUWAIN** | 2 | 2 | 2 | 2 | 1 | **0** | 1 |
| **RAS AL KHAIMAH** | 7 | 7 | 7 | 7 | 6 | **2** | 1 |
| **FUJAIRAH** | 6 | 6 | 6 | 6 | 6 | **4** | 3 |
| **TOTAL** | **197** | **197** | **183** | **119** | **105** | **57** | **39** |

> Excl N2 = 183 = hospitals with Exclusive N2 ✓ (includes both those with and without N2).  
> N2 = 119 = hospitals with N2 ✓ (all of whom also have Exclusive N2).  
> So 183 − 119 = **64 hospital-type providers that are Exclusive N2 only** (no N2, N3, or N4).

---

## Breakdown by Sub-Type per Emirate

| Emirate | Sub-Type | Total | N1 | Excl N2 | N2 | N3 | N4 | Dental |
|---------|----------|------:|---:|--------:|---:|---:|---:|-------:|
| **ABU DHABI** | HOSPITAL | 51 | 51 | 45 | 33 | 30 | 12 | 9 |
| | SEHA | 14 | 14 | 14 | 13 | 13 | 13 | 0 |
| **DUBAI** | HOSPITAL | 75 | 75 | 68 | 29 | 20 | 10 | 9 |
| | DHA | 7 | 7 | 7 | 2 | 2 | 1 | 1 |
| | MOH | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| **SHARJAH** | HOSPITAL | 19 | 19 | 18 | 11 | 11 | 8 | 7 |
| | MOH | 6 | 6 | 6 | 6 | 6 | 0 | 0 |
| **AJMAN** | HOSPITAL | 9 | 9 | 9 | 9 | 9 | 7 | 8 |
| **UMM AL QUWAIN** | HOSPITAL | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| | MOH | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| **RAS AL KHAIMAH** | HOSPITAL | 4 | 4 | 4 | 4 | 3 | 2 | 1 |
| | MOH | 3 | 3 | 3 | 3 | 3 | 0 | 0 |
| **FUJAIRAH** | HOSPITAL | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| | MOH | 2 | 2 | 2 | 2 | 2 | 0 | 0 |
| | SEHA | 1 | 1 | 1 | 1 | 1 | 1 | 0 |

---

## Network Penetration (Hospitals Only)

How many hospitals participate in each tier — from N1 (most inclusive) to N4 (most exclusive):

| Emirate | Hospitals | N1 | Excl N2 | N2 | N3 | N4 |
|---------|:---------:|:--:|:-------:|:--:|:--:|:--:|
| ABU DHABI | 51 | 51 | 45 | 33 | 30 | **12** |
| DUBAI | 75 | 75 | 68 | 29 | 20 | **10** |
| SHARJAH | 19 | 19 | 18 | 11 | 11 | **8** |
| AJMAN | 9 | 9 | 9 | 9 | 9 | **7** |
| UMM AL QUWAIN | 1 | 1 | 1 | 1 | 0 | **0** |
| RAS AL KHAIMAH | 4 | 4 | 4 | 4 | 3 | **2** |
| FUJAIRAH | 3 | 3 | 3 | 3 | 3 | **3** |

> N1 covers all hospitals everywhere. N4 is the most restricted — only 42 of 162 hospitals.  
> In Dubai, only 10 of 75 hospitals are on N4 (13%). In Ajman, 7 of 9 (78%).

---

## Where Exclusive N2 Lives (Hospitals Only)

The 58 hospitals that are **Exclusive N2 only** — meaning they have Exclusive N2 checked but NOT N2, N3, or N4 — are mostly the premium/well-known private hospitals:

### Abu Dhabi (12)
- NMC Royal Women's, Gulf Diagnostic Center Hospital, Danat Al Emarat, Burjeel Hospital, Burjeel Royal Hospital (Al Ain), Kanad Hospital, NMC Royal Hospital, Burjeel Medical City, YAS Clinic, Healthline Day Care Surgery, Exeter Medical Center for Bone & Joint, Bascom Palmer Eye Institute

### Dubai (38)
- Most Mediclinic locations (City Hospital, Parkview, Welcare, Dubai Mall, Ibn Battuta, Deira Clinic)
- Saudi German Hospital Dubai, Fakeeh University Hospital, Kings College Hospital London
- Dr. Sulaiman Al Habib Hospital + Medical Center
- Medcare Women & Children, Medcare Royal Speciality, Medcare Eye Centre
- Dubai London Hospital + Dubai London Speciality
- Moorfields Eye Hospital, Barraquer Eye Hospital
- American Hospital + American Hospital Dubai Science Park
- Gargash Hospital, Charme Day Surgery, Novomed, Adam Vital, Armada Day Surgical
- Al Garhoud Private, Al Zahra (suspended), Al Mousa Day Surgery
- Cosmesurge, First IVF, American Spine, American Academy of Cosmetic Surgery
- Mubadala Health Medical & Surgical (Jumeirah), Emirates Integra
- Clinica Sabah, Dubai Medical University Hospital, Tarabichi, New Vision Eye Center, Vasan Eyecare

### Sharjah (7)
- NMC Royal Hospital Sharjah, University Hospital, Medcare Hospital Sharjah
- Dar Al Kamal, Cosmesurge & Emirates Clinic, Gaelan Medical Care
- Medcare Hospital SHJ Branch 1

### Umm Al Quwain (1)
- Sheikh Khalifa General Hospital

---

## Hospitals WITH N4 Coverage (Most Exclusive Tier)

### ABU DHABI (25)

| Provider | Region | Networks |
|----------|--------|----------|
| \*\*AL AIN HOSPITAL & HOMECARE SERVICES | AL AIN | N1, Excl N2, N2, N3, N4 |
| \*\*AL CORNICHE HOSPITAL IVF CENTRE | ABU DHABI | N1, Excl N2, N2, N3, N4 |
| \*\*AL CORNICHE HOSPITAL-ABU DHABI | AL CORNICHE | N1, Excl N2, N2, N3, N4 |
| \*\*AL RAHBA HOSPITAL | ABU DHABI | N1, Excl N2, N2, N3, N4 |
| \*\*AL WAGAN HOSPITAL | AL AIN | N1, Excl N2, N2, N3, N4 |
| \*\*DELMA HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*GHIATHY HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*LIWA HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*MADINAT ZAYED HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*MARFA HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*SILA HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4 |
| \*\*TAWAM HOSPITAL-SEHA | AL AIN | N1, Excl N2, N2, N3, N4 |
| \*\*AL DANNAH HOSPITAL | WESTERN REGION | N1, Excl N2, N2, N3, N4, Dental |
| \*\*LIFECARE HOSPITAL | ABU DHABI | N1, Excl N2, N2, N3, N4 |
| \*\*LIFECARE HOSPITAL LLC-BRANCH 1 | MUSAFFAH | N1, Excl N2, N2, N3, N4 |
| \*\*LLH HOSPITAL AL MUSAFFAH | MUSAFFAH | N1, Excl N2, N2, N3, N4 |
| \*\*LLH HOSPITAL (FORM LIFELINE) | ELECTRA | N1, Excl N2, N2, N3, N4 |
| \*\*NMC SPECIALITY HOSPITAL | ALAIN | N1, Excl N2, N2, N3, N4 |
| \*\*SPECIALISED MEDICAL CARE HOSPITAL | ALAIN | N1, Excl N2, N2, N3, N4, Dental |
| AHALIA HOSPITAL | ABU DHABI | N1, Excl N2, N2, N3, N4, Dental |
| AL AHALIA HOSPITAL - MUSAFFA BRANCH | ABU DHABI | N1, Excl N2, N2, N3, N4, Dental |
| MILLENNIUM HOSPITAL (AHALIA GROUP) | MUSSAFAH | N1, Excl N2, N2, N3, N4, Dental |
| NATIONAL HOSPITAL - SOLE PROPRIETORSHIP | AL DANAH | N1, Excl N2, N2, N3, N4 |
| PHOENIX HOSPITAL | MUSSAFAH | N1, Excl N2, N2, N3, N4, Dental |
| Sheikh Khalifa Medical City (SKMC) | ABU DHABI | N1, Excl N2, N2, N3, N4 |

### DUBAI (11)

| Provider | Region | Networks |
|----------|--------|----------|
| \*\*HATTA HOSPITAL - DHA | HATTA | N1, Excl N2, N2, N3, N4 |
| AL TADAWI SPECIALTY HOSPITAL | UMM RAMOOL | N1, Excl N2, N2, N3, N4 |
| ASTER DAY SURGERY CENTRE | BUR DUBAI | N1, Excl N2, N2, N3, N4 |
| ASTER HOSPITAL | MANKHOOL | N1, Excl N2, N2, N3, N4 |
| ASTER HOSPITAL - AL QUSAIS | AL QUSAIS | N1, Excl N2, N2, N3, N4 |
| ASTER HOSPITAL SONAPUR | MUHAISANAH | N1, Excl N2, N2, N3, N4 |
| CEDARS JEBEL ALI INTERNATIONAL HOSPITAL (ASTER) | JEBEL ALI | N1, Excl N2, N2, N3, N4 |
| INTERNATIONAL MODERN HOSPITAL | BUR DUBAI | N1, Excl N2, N2, N3, N4 |
| N M C HOSPITAL BR OF NMC ROYAL HOSPITAL - DIP | DIP 1 | N1, Excl N2, N2, N3, N4 |
| NMC ROYAL HOSPITAL - DIP | DUBAI INVESTMENT PARK | N1, Excl N2, N2, N3, N4 |
| NMC SPECIALITY HOSPITAL | AL QUSAIS | N1, Excl N2, N2, N3, N4 |

### SHARJAH (8)

| Provider | Region | Networks |
|----------|--------|----------|
| AL SAHA WA AL SHIFAA ONE DAY SURGERY | ROLLA | N1, Excl N2, N2, N3, N4, Dental |
| CENTRAL HOSPITAL | MAYSALOON | N1, Excl N2, N2, N3, N4 |
| ORIANA HOSPITAL | AL TAAWUN | N1, Excl N2, N2, N3, N4, Dental |
| ORIANA SPECIALITY HOSPITAL | AL TAAWUN | N1, Excl N2, N2, N3, N4, Dental |
| SAUDI GERMAN HOSPITAL SHJ BR | SHARJAH | N1, Excl N2, N2, N3, N4 |
| SHARJAH CORNICHE HOSPITAL | BUHAIRAH | N1, Excl N2, N2, N3, N4 |
| THUMBAY HOSPITAL DAYCARE - MUWAILAH 1 | SHARJAH | N1, Excl N2, N2, N3, N4, Dental |
| W. WILSON SPECIALIZED HOSPITAL | TAWAUN | N1, Excl N2, N2, N3, N4 |

### AJMAN (7)

| Provider | Region | Networks |
|----------|--------|----------|
| RASHID CENTER FOR DIABETES AND RESEARCH | AL JURF | N1, Excl N2, N2, N3, N4, Dental |
| SAUDI GERMAN HOSPITAL AJMAN | AL TALLAH | N1, Excl N2, N2, N3, N4 |
| SHEIKH KHALIFA GENERAL HOSPITAL AJMAN | AL JURF | N1, Excl N2, N2, N3, N4, Dental |
| SHEIKH KHALIFA HOSPITAL MASFOUT | MASFOUT | N1, Excl N2, N2, N3, N4, Dental |
| SHEIKH KHALIFA MATERNITY AND PEDIATRIC HOSPITAL | AL JURF | N1, Excl N2, N2, N3, N4, Dental |
| THUMBAY HOSPITAL - AJMAN | AJMAN | N1, Excl N2, N2, N3, N4, Dental |
| THUMBAY UNIVERSITY HOSPITAL COMPLEX | AL JURF | N1, Excl N2, N2, N3, N4, Dental |

### RAS AL KHAIMAH (2)

| Provider | Region | Networks |
|----------|--------|----------|
| RAK HOSPITAL | RAS AL KHAIMAH | N1, Excl N2, N2, N3, N4 |
| ZAHRAWI HOSPITAL | RAS AL KHAIMAH | N1, Excl N2, N2, N3, N4, Dental |

### FUJAIRAH (4)

| Provider | Region | Networks |
|----------|--------|----------|
| AL SHARQ HOSPITAL - DIBBA | DIBBA | N1, Excl N2, N2, N3, N4, Dental |
| AL SHARQ INTERNATIONAL HOSPITAL | AL FASEEL | N1, Excl N2, N2, N3, N4, Dental |
| SHEIKH KHALIFA HOSPITAL - FUJAIRAH | AL FASEEL | N1, Excl N2, N2, N3, N4 |
| THUMBAY HOSPITAL FUJAIRAH BRANCH | FUJAIRAH | N1, Excl N2, N2, N3, N4, Dental |

---

## Notable Hospitals NOT on N4

These major hospitals participate up to **Exclusive N2 only** (or N1 only) — no N2, N3, or N4:

### Abu Dhabi
- **Cleveland Clinic Abu Dhabi** — N1 only
- **Imperial College London Diabetes Centre** — N1 only
- **Health Point Hospital** (Mubadala) — N1 only
- **Moorfields Eye Hospital Centre** — N1 only
- **Burjeel Hospital / Burjeel Medical City / Burjeel Royal** — Exclusive N2 only
- **Mediclinic Airport Road / Al Jowhara / Al Ain** — N1–N3 (no N4)
- **NMC Royal Hospital / NMC Royal Women's** — Exclusive N2 only
- **Universal Hospital Al Ain** — N1–N3 + Dental
- **Gulf Diagnostic Center Hospital** — Exclusive N2 only
- **Danat Al Emarat** (Mubadala) — Exclusive N2 only
- **Bareen International Hospital** — N1, Excl N2, N2 only

### Dubai
- **Kings College Hospital London** — Exclusive N2 only
- **Mediclinic City Hospital / Parkview / Welcare / Dubai Mall / Ibn Battuta** — Exclusive N2 only
- **Saudi German Hospital Dubai** — Exclusive N2 only
- **Fakeeh University Hospital** — Exclusive N2 only
- **All Health Bay branches** — N1 only
- **Mirdif Private Hospital** — N1 only
- **Valiant Healthcare** — N1 only
- **Burjeel Hospital for Advanced Surgery** — N1 only
- **Canadian Specialist Hospital** — N1–N3
- **Prime Hospital** — N1–N3
- **Emirates Hospital** — N1–N3 + Dental

### Sharjah
- **NMC Royal Hospital Sharjah** — Exclusive N2 only
- **University Hospital** — Exclusive N2 only
- **Dar Al Kamal Hospital** — Exclusive N2 only
- **Burjeel Specialty Hospital** — N1–N3

---

## Key Patterns

| Pattern | Examples | Network |
|---------|----------|---------|
| **Government/SEHA hospitals** | SKMC, Al Corniche, Tawam, Hatta, Al Qassimi | N1 → **N4** (full) |
| **Large private chains** | Burjeel (Farha), NMC (DIP), Aster (all branches), Thumbay | N1 → **N4** (selected locations) |
| **Premium international brands** | Cleveland Clinic, Kings College, Moorfields | **N1 only** or Excl N2 only |
| **Mediclinic** | City Hospital, Parkview, Welcare, Airport Road | **Excl N2 only** (no N2/N3/N4) |
| **Day surgery / speciality centres** | Health Bay, Cosmesurge, Charme, First IVF | N1 only or Excl N2 only |
| **Ahalia / Saudi German / Oriana** | Multiple emirates | N1 → N4 with Dental (broadest coverage among private groups) |
| **Dental coverage** | Concentrated among N4 + Ahalia, SGH, Thumbay chains | Scattered across all tiers |

---

## Bottom Line

- **N1 → N4** goes from **most inclusive** to **most exclusive**. N4 has only 42 of 162 hospitals.
- **Exclusive N2** sits between N1 and N2 — it's a broader tier than N2, with 58 additional hospitals that are Exclusive N2 only.
- The **58 Exclusive N2–only hospitals** are mostly premium brands (Mediclinic, Kings College, Moorfields, Saudi German Dubai, etc.).
- The **42 N4 hospitals** are SEHA/government facilities + Burjeel/NMC/Aster/Thumbay/Saudi German/Ahalia/Oriana chains.
- If a patient's plan covers N4, they access all 162 hospitals. If it's **Exclusive N2 only**, they lose the 42 N4 hospitals but keep everything else. If **N1 only**, they lose ~120 hospitals.
