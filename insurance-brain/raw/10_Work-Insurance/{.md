{
    "title": "MEDNET Healthcare Provider Network List Schema",
    "description": "A comprehensive JSON Schema for the combined MEDNET network lists. Not all fields will be present in every provider record, especially the network-specific columns, which are included as optional properties to reflect the full structure across all files.",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "PROVIDER CODE": {
                "type": "string",
                "description": "Unique identifier for the healthcare provider."
            },
            "PROVIDER NAME": {
                "type": "string",
                "description": "Name of the healthcare provider."
            },
            "GROUP NAME": {
                "type": "string",
                "description": "Group the provider belongs to (e.g., NMC Group)."
            },
            "PROVIDER TYPE": {
                "type": "string",
                "description": "Type of facility (e.g., HOSPITAL, CLINIC, PHARMACY)."
            },
            "EMIRATE": {
                "type": "string",
                "description": "Emirate where the provider is located."
            },
            "REGION": {
                "type": "string",
                "description": "Region within the Emirate."
            },
            "ADDRESS": {
                "type": "string",
                "description": "Full physical address of the provider."
            },
            "LICENSE NUMBER": {
                "type": "string",
                "description": "Healthcare facility license number."
            },
            "SPECIALITY": {
                "type": "string",
                "description": "Provider's medical specialty."
            },
            "TELEPHONE": {
                "type": "string",
                "description": "Contact telephone number."
            },
            "DENTAL": {
                "type": "string",
                "description": "Dental coverage indicator. 'ü' if covered, null otherwise (Optional)."
            },
            "OPTICAL": {
                "type": "string",
                "description": "Optical coverage indicator. 'ü' if covered, null otherwise (Optional)."
            },
            "ALTERNATIVE": {
                "type": "string",
                "description": "Alternative medicine coverage indicator. 'ü' if covered, null otherwise (Optional)."
            },
            "SPECIAL REMARKS": {
                "type": "string",
                "description": "Any specific notes or exclusions for the provider (Optional)."
            },
            "GOLD": {
                "type": "string",
                "description": "'ü' if covered under the GOLD network, null otherwise (Optional)."
            },
            "GREEN": {
                "type": "string",
                "description": "'ü' if covered under the GREEN network, null otherwise (Optional)."
            },
            "PEARL": {
                "type": "string",
                "description": "'ü' if covered under the PEARL network, null otherwise (Optional)."
            },
            "SILVER CLASSIC": {
                "type": "string",
                "description": "'ü' if covered under the SILVER CLASSIC network, null otherwise (Optional)."
            },
            "SILVER PREMIUM": {
                "type": "string",
                "description": "'ü' if covered under the SILVER PREMIUM network, null otherwise (Optional)."
            },
            "SILK ROAD OP": {
                "type": "string",
                "description": "'ü' if covered under SILK ROAD Out-Patient, null otherwise (Optional)."
            },
            "SILK ROAD IP": {
                "type": "string",
                "description": "'ü' if covered under SILK ROAD In-Patient, null otherwise (Optional)."
            }
        },
        "required": [
            "PROVIDER CODE",
            "PROVIDER NAME",
            "GROUP NAME",
            "PROVIDER TYPE",
            "EMIRATE",
            "REGION",
            "ADDRESS",
            "LICENSE NUMBER",
            "SPECIALITY",
            "TELEPHONE"
        ]
    }
}