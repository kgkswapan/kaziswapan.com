---
title: "Monthly kill-switch drill"
summary: "Dry-run to ensure operations can halt trading from terminals and APIs within seconds."
pubDatetime: 2024-10-18T09:30:00Z
tags:
  - resilience
  - process
draft: false
---

1. Trigger simulated runaway algo from the lab OMS tenant.
2. Confirm desk can yank per-strategy limits via GUI.
3. Use automation to broadcast kill-switch state to downstream risk.
4. Document latency observed between command and venue-level confirmation.
