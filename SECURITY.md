# Security policy · ALPHA-PROXIMA-PUBLIC

This repository contains **only intentionally public website source code**. It does not accept internal Vault notes, personal profiles, authentication material, private organizational records or operational state.

## Report a vulnerability

Open a private security advisory in GitHub when that feature is available (Repository > Security > Advisories). Do **not** include secrets or personal data in a public issue or pull request. If private advisories are not enabled, contact the repository owner through an agreed private channel; do not paste secrets into public discussions.

## Security controls

- `main` should require a PR, a passing `public-safety` CI check, and human review.
- Public scanner disallows known internal directory names and obvious secret shapes. This scanner is imperfect and does not rewrite Git history or ensure compliance by itself.
- No backend endpoints, login forms, browser API tokens, third-party scripts or automatic exports.
- Cloudflare Pages `_headers` defines a restrictive CSP and browser response headers; confirm them after deployment.
- Rotate any real credentials that were ever exposed, and investigate Git history and clones before attempting history cleanup. A current-branch deletion cannot erase public copies.

## Critical prohibition

Never make the private Core public to debug connectivity to ChatGPT or n8n. Configure private GitHub App installations and backend tokens with least privilege instead.
