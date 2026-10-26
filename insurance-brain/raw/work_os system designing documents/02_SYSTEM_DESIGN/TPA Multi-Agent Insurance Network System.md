# TPA Multi-Agent Insurance Network System

A multi-agent AI system for querying insurance network coverage across multiple TPA (Third-Party Administrator) providers in the UAE.

## Architecture

```
USER QUESTION
      ↓
[TPA ORCHESTRATOR]
      ↓
[ROUTER AGENT] ← Decides which TPA agent(s) to activate
      ↓
   ┌──┴──┬──────┬─────────┐
   ↓     ↓      ↓         ↓
[MEDNET] [DUBAI CARE] [NAS] [NEXTCARE]
 Agent    Agent        Agent  Agent
      ↓
[Consolidated Response to User]
```

## TPA Agents

### 1. MEDNET Specialist Agent
- **Networks**: 8 (GOLD, SILVER PREMIUM, SILVER CLASSIC, GREEN, EMERALD, PEARL, SILK ROAD OP, SILK ROAD IP)
- **Specialty**: Premium/expat clients, wide hospital coverage
- **Coverage**: All UAE emirates

### 2. DUBAI CARE Specialist Agent
- **Networks**: 7 (N1, Exclusive N2, N2, N3, N4, N5 OP, N5 IP)
- **Specialty**: Dubai-focused plans, government/corporate contracts
- **Coverage**: Primarily Dubai, limited Sharjah

### 3. NAS Specialist Agent
- **Networks**: 6 (Comprehensive, General, Restricted, Super-Restricted, Workers, Value)
- **Specialty**: Budget plans, SME groups, labor insurance
- **Coverage**: All UAE emirates, best value pricing

### 4. NEXTCARE Specialist Agent
- **Networks**: 6 (GN+, GN, GN Limited, RN, RN2, RN3)
- **Specialty**: Flexible plans, customizable coverage, add-on options
- **Coverage**: All UAE emirates

## Query Types Supported

1. **Hospital-to-Network Lookup**: "Is American Hospital Dubai covered in MEDNET Silver Premium?"
2. **Network-to-Hospitals Listing**: "What hospitals are covered in Dubai Care N3 network?"
3. **Multi-Hospital Matching**: "Which plan covers Mediclinic Parkview, Aster Hospital, and NMC Royal Hospital?"
4. **Reverse Lookup**: "Which insurance plans cover Burjeel Hospital Abu Dhabi?"
5. **Complex Multi-Criteria**: "Family of 4, budget AED 10,000, need Cleveland Clinic and Saudi German Hospital"