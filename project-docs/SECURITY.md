# Security Policy

## Supported Versions

The site is deployed directly from the `main` branch. Only the latest commit on `main` is supported at any given time. Historical versions are considered archived and should not be used in production.

## Reporting a Vulnerability

If you discover a vulnerability in this project, please:

1. **Do not** open a public GitHub issue.
2. Email me at `kazi.swapan@gmail.com` with the subject line `SECURITY DISCLOSURE`.
3. Provide as much detail as possible (steps to reproduce, affected files, proposed fix, etc.).

I will acknowledge the report within 5 business days and aim to provide a fix or mitigation within 30 days. If a fix requires more time, I’ll keep you informed of progress.

## Private & Sensitive Information

- Do not commit API keys, secrets, or unpublished private documents. The repository is public and all history is accessible.
- Configuration data (in `SITE` or other exported objects) is client-visible. Keep sensitive configuration values out of source control.
- Before pushing, run `git diff --stat HEAD~1` (or similar) to confirm no secrets were added.

## Dependency & Workflow Hygiene

- Run `npm install` and `npm run build` before opening pull requests to ensure dependency integrity.
- When introducing GitHub Actions, pin each action to a specific commit SHA (e.g. `actions/checkout@v4.1.1`).
- Keep dependencies updated (`npm outdated`, `npm audit`) to reduce exposure to known vulnerabilities.

## Contact

Questions about this policy can be directed to `kazi.swapan@gmail.com`.
