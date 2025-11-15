---
title: "Quarterly capacity snapshot"
summary: "Digest of CPU, memory, and network headroom across our colo footprint."
pubDatetime: 2024-08-05T05:45:00Z
tags:
  - capacity
  - planning
draft: false
---

| Tier | Avg CPU | Peak CPU | Notes |
| ---- | ------- | -------- | ----- |
| Ingress | 42% | 68% | Extra burst observed on ECB rate release. |
| Analytics | 55% | 71% | Candidate for rightsizing once nightly jobs migrate. |
| Gateways | 36% | 59% | Plenty of room; consider consolidating hosts. |
