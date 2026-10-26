---
description: Quickly find which insurance networks cover a specific hospital or clinic.
---

# Workflow: Find Facility Network Coverage

Use this workflow to quickly check if a hospital (e.g., Saudi German, Mediclinic) is covered under a specific TPA network without opening the massive 34GB network list.

## Steps:

1. **Ask for Facility Name**: Identify the name of the hospital or clinic you are looking for.
2. **Run Search Command**:
   ```bash
   python facility_search.py "[Facility Name]"
   ```
3. **Analyze Results**:
   - Look at the "Coverage" section in the output.
   - It will list all networks (N1, N2, N3, etc.) where the facility is found.
4. **Report to Client**: Provide the client with the list of plans (Networks) that include their requested facility.

---

*Tip: You can just say "is Saudi German covered in Dubaicare?" and I will run this for you.*
