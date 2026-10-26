# TPAs & Networks Reference

## Overview — 8 TPAs (Third Party Administrators)

| TPA | Networks | Strength | Best Area |
|-----|----------|----------|-----------|
| **NAS** | 5 networks | Strong network | Abu Dhabi |
| **MEDNET** | 7 networks | Wide coverage | UAE-wide |
| **NEXTCARE** | 6 networks | Wide network | Dubai |
| **DUBAICARE** | 6 networks | Dubai-focused | Dubai |
| **ADNIC** | 4 networks | Abu Dhabi focus | Abu Dhabi |
| **SUKOON** | 6 networks | Regional | Various |
| **ECARE** | 3 networks | Budget options | Northern Emirates |
| **AAFIYA** | 3 networks | Multiple tiers | Various |

---

## NAS
- CN Network
- GN Network
- RN Network
- SRN Network
- WN Network

## MEDNET
- Gold Network
- Silver Premium Network
- Silver Classic Network
- Emerald Network
- Pearl Network
- Silk Road IP Network
- Silk Road OP Network

## NEXTCARE
- GN+ Network
- GN Network
- GN Limited Network
- RN Network
- RN2 Network
- RN3 Network

## DUBAICARE
- N1 Network
- Exclusive N2 Network
- N2 Network
- N3 Network
- N4 Network
- N5 Network

## ADNIC
- Platinum Network
- Gold Network
- Silver Network
- Bronze Network

## SUKOON
- Premium Network
- Edge Network
- Signature + Medcare Network
- Signature Network
- Advance Network
- Vital Network

## ECARE
- Classic Network
- Green Network
- Blue Network

## AAFIYA
- APN Plus Network
- APN Network
- Essential Network

---

## Database Schema — Hospitals & Clinics by Network

The following JSON structure is used to map hospitals and clinics to each TPA network and emirate. This is a template — add facility names under each emirate.

```json
{
  "TPAs": [
    {
      "name": "NAS",
      "networks": [
        {
          "name": "NAS_CN",
          "emirates": {
            "Dubai": { "hospitals": [], "clinics": [] },
            "Abu Dhabi": { "hospitals": [], "clinics": [] },
            "Sharjah": { "hospitals": [], "clinics": [] },
            "Ajman": { "hospitals": [], "clinics": [] },
            "Ras Al Khaimah": { "hospitals": [], "clinics": [] },
            "Fujairah": { "hospitals": [], "clinics": [] },
            "Umm Al Quwain": { "hospitals": [], "clinics": [] }
          }
        },
        {
          "name": "NAS_GN",
          "emirates": {
            "Dubai": { "hospitals": [], "clinics": [] },
            "Abu Dhabi": { "hospitals": [], "clinics": [] },
            "Sharjah": { "hospitals": [], "clinics": [] },
            "Ajman": { "hospitals": [], "clinics": [] },
            "Ras Al Khaimah": { "hospitals": [], "clinics": [] },
            "Fujairah": { "hospitals": [], "clinics": [] },
            "Umm Al Quwain": { "hospitals": [], "clinics": [] }
          }
        },
        {
          "name": "NAS_RN",
          "emirates": {
            "Dubai": { "hospitals": [], "clinics": [] },
            "Abu Dhabi": { "hospitals": [], "clinics": [] },
            "Sharjah": { "hospitals": [], "clinics": [] },
            "Ajman": { "hospitals": [], "clinics": [] },
            "Ras Al Khaimah": { "hospitals": [], "clinics": [] },
            "Fujairah": { "hospitals": [], "clinics": [] },
            "Umm Al Quwain": { "hospitals": [], "clinics": [] }
          }
        },
        {
          "name": "NAS_SRN",
          "emirates": {
            "Dubai": { "hospitals": [], "clinics": [] },
            "Abu Dhabi": { "hospitals": [], "clinics": [] },
            "Sharjah": { "hospitals": [], "clinics": [] },
            "Ajman": { "hospitals": [], "clinics": [] },
            "Ras Al Khaimah": { "hospitals": [], "clinics": [] },
            "Fujairah": { "hospitals": [], "clinics": [] },
            "Umm Al Quwain": { "hospitals": [], "clinics": [] }
          }
        },
        {
          "name": "NAS_WN",
          "emirates": {
            "Dubai": { "hospitals": [], "clinics": [] },
            "Abu Dhabi": { "hospitals": [], "clinics": [] },
            "Sharjah": { "hospitals": [], "clinics": [] },
            "Ajman": { "hospitals": [], "clinics": [] },
            "Ras Al Khaimah": { "hospitals": [], "clinics": [] },
            "Fujairah": { "hospitals": [], "clinics": [] },
            "Umm Al Quwain": { "hospitals": [], "clinics": [] }
          }
        }
      ]
    },
    {
      "name": "MEDNET",
      "networks": [
        { "name": "MEDNET_GOLD", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_SILVER_PREMIUM", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_SILVER_CLASSIC", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_EMERALD", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_PEARL", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_SILK_ROAD_IP", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } },
        { "name": "MEDNET_SILK_ROAD_OP", "emirates": { "Dubai": { "hospitals": [], "clinics": [] }, "Abu Dhabi": { "hospitals": [], "clinics": [] }, "Sharjah": { "hospitals": [], "clinics": [] }, "Ajman": { "hospitals": [], "clinics": [] }, "Ras Al Khaimah": { "hospitals": [], "clinics": [] }, "Fujairah": { "hospitals": [], "clinics": [] }, "Umm Al Quwain": { "hospitals": [], "clinics": [] } } }
      ]
    }
  ]
}
```

> The remaining TPAs (NEXTCARE, DUBAICARE, ADNIC, SUKOON, ECARE, AAFIYA) follow the same pattern — add their networks with the same 7-emirate structure.
>
> See `MEDNET_Provider_Schema.md` for the full field-level JSON schema for MEDNET provider records.
