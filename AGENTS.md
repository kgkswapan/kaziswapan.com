## kaziswapan.com Agent Bootstrap (always injected by Codex)

This file is the golden source for agent startup. Follow it on every new
session and after any context reset/truncation.

## API credentials (use for all /agent calls)
- API_BASE: http://192.168.1.100:3000
- PROJECT_ID: cmju0xx5622pt7tqeke3ru1s9
- TOKEN: 174d845e5508a0c698d8dee9b7bdcdeb7afab21544662307

## First contact (always do this first)
- GET {API_BASE}/agent/org/whoami (Authorization: Bearer TOKEN)
- GET {API_BASE}/agent/discovery (Authorization: Bearer TOKEN)
- GET {API_BASE}/agent/org/custom-instructions (Authorization: Bearer TOKEN)
- GET {API_BASE}/agent/org/handbook (Authorization: Bearer TOKEN)
- GET {API_BASE}/agent/projects/{PROJECT_ID}/context (Authorization: Bearer TOKEN)

## Reset/rehydration rule
- If you detect a context reset, truncation, or a fresh session, immediately
  repeat the "First contact" sequence before doing anything else.

## Usage rule
- Always follow the latest handbook and project context tabs as the source of
  truth for workflows (SSP/SEDP), git rules, testing, and safety.
