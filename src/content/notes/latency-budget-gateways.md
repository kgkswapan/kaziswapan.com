---
title: "Latency budget for order gateways"
summary: "Targets I keep for ingress, matching, and confirmation hops so routing tweaks stay measurable."
pubDatetime: 2024-11-22T08:00:00Z
tags:
  - performance
  - routing
draft: false
---

- Ingress parsing + validations <= **250µs** per message.
- Smart-order routing decision <= **400µs** including venue throttles.
- Matching acknowledgements <= **2ms** round trip on metro venues.
- Confirmation fan-out must stay < **500µs** so drop copies land quickly in risk.
