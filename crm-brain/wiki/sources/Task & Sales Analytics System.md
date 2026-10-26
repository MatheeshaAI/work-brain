---
type: source
sources: ["raw/10_Work-Insurance/README_Tasks_Analytics.md"]
updated: 2026-10-22
tags: [insurance, tasks, analytics, kpi, crm]
summary: "Task tracker and sales analytics system"
---
# Source: Task & Sales Analytics System

Original note: [[raw/10_Work-Insurance/README_Tasks_Analytics|README_Tasks_Analytics]]. Task types/priorities/statuses and analytics.

## Tasks
Types: New Lead, Renewal, Claims, Admin. Priorities High/Medium/Low. Status Pending/In Progress/Completed/Cancelled.

## Analytics (12-Jan-2026 snapshot)
8 policies sold: 6 Health (75%), 2 Motor (25%). Premium AED 63,089.76, Customer payable AED 66,243, Tax AED 3,154, Commission AED 9,430 (avg ~15%). Companies: HAYAH (2, 5890), Takaful Emarat (2, 1456), Orient (1,979), Dubai Insurance (1,823), Sukoon/Oman (2,282). Top clients by premium include Diana Madalieva (36,221 HAYAH Health).

## Files
Task_Tracker.csv, Sales_Analytics.csv, Lead_Tracker.csv, docs.

## Workflow
Morning: review today's tasks by priority; During day: update status/time/notes; Evening: mark complete, reschedule, plan tomorrow, update Lead_Tracker. Weekly review import sales data, calculate totals/conversion, identify trends. Monthly review revenue/pipeline/task performance.

## Automation ideas
Auto-generate tasks from Lead Tracker by stage (stage1→initial contact, stage3→send quote, stage7→follow up docs, stage11→chase payment high priority), auto-import sales reports, renewal reminders 30/60/90 days.

## KPIs
Sales: policies/week 5-10, conversion 20-30%, avg premium by type, commission/policy >=1000 AED, response <24h. Tasks: completion >=90%, overdue <5, 8-10/day. Pipeline: 30-50 active, track velocity/drop-off/payment collection <3 days.

## Related

- [[Tasks and analytics]]
- [[Insurance CRM pipeline]]
- [[Lead tracking in the CRM]]
- [[Insurance Sales Operations - Master Workspace]]
