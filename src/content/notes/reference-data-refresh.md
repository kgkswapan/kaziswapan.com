---
title: "Reference data refresh playbook"
summary: "Quick reminder on how I refresh venue symbol files without breaking caches."
pubDatetime: 2024-08-28T06:30:00Z
tags:
  - data
  - automation
draft: false
---

- Fetch latest files via SFTP mirror and checksum against previous drop.
- Feed to `refdata-normalize` so enum casing stays consistent.
- Preload caches in staging + smoke-test instrument search.
- Promote to prod window and monitor API hit ratios for 30 minutes.
