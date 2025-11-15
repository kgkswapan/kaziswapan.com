---
title: "Post-trade data QA loop"
summary: "Quick checklist for validating allocations, fees, and confirmations before handing data to downstream consumers."
pubDatetime: 2024-12-14T07:30:00Z
tags:
  - operations
  - data
  - qa
draft: false
---

- Reconcile allocations vs. OMS export using `alloc-diff`.
- Sample 10 tickets across asset classes and verify fees/commissions.
- Run confirmation regeneration for any breaks detected in the risk UI.
- Notify downstream teams via the ops channel once the snapshot looks clean.
