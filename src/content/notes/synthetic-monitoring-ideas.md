---
title: "Synthetic monitoring ideas"
summary: "List of probes I want to add so we catch auth, market data, and settlement issues sooner."
pubDatetime: 2024-05-21T07:10:00Z
tags:
  - monitoring
  - reliability
draft: false
---

- FIX heartbeat latency watch (per venue).
- REST auth refresh simulation every 30 minutes.
- Market data gap detection comparing vendor vs. exchange feed.
- Settlement gateway smoke test with dummy trades overnight.
