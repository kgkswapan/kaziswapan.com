---
title: "Observability checklist"
summary: "Routine I follow each morning to confirm trading systems are healthy before activity picks up."
pubDatetime: 2025-01-05T06:00:00Z
tags:
  - operations
  - monitoring
draft: false
---

1. Review overnight batch logs for discrepancies.
2. Confirm data feeds (market data, reference data) have fresh timestamps.
3. Check FIX session status via automation script `fix-check`.
4. Update the runbook with any anomalies.
