# ALPHA PROXIMA · PUBLIC

**Public Foundation MVP** · Bilingual French / English · Static, dependency-free landing page.

> **Public-only repository.** The institutional Core / Obsidian Vault is a distinct, **private**, canonical source. Do not copy or migrate its Git history, notes, memory exports, personal profiles, configuration files, credentials, or operational state into this repository.

## What ships

- Responsive, accessible FR/EN site (`public/index.html`, `public/assets/`).
- ALPHA PROXIMA introduction, two-layer architecture, conceptual agent domains, human governance.
- Clear preview status: no live agent, private Core, or authenticated API access.
- [Safety scanner](scripts/check_public_safety.py) and GitHub Actions check to detect prohibited Vault paths and token-like content.
- [GitHub import guide](docs/IMPORT-GITHUB.md) and [Cloudflare Pages deployment guide](docs/DEPLOYMENT.md) with review-first workflow.
- Static `_headers` security policy for Cloudflare Pages; no analytics, external fonts, API requests, or dependencies.

## Run locally

```bash
python3 -m http.server 8080 --directory public
# Open http://localhost:8080
```

## Validate

```bash
python3 scripts/check_public_safety.py
python3 -m unittest discover -s tests -v
node --check public/assets/app.js
```

## Publish safely

1. **Never mirror the private Core.** Begin from this clean repository with no shared Git history.
2. Create a feature branch, commit the public-only files, and open a pull request.
3. Complete [`docs/CONTENT-APPROVAL.md`](docs/CONTENT-APPROVAL.md) and review every addition.
4. Enable branch protection / rulesets on `main` and require the `public-safety` check (available after the first PR runs) and one human approval.
5. Merge only after approval. Deploy with **Cloudflare Pages** (`main`, build command `exit 0`, output `public`).

**Project boundaries:** Public documentation does not authorize an agent to access private repositories or to make institutional governance decisions. The Founder retains final authority.

## Structure

```text
ALPHA-PROXIMA-PUBLIC/
├── public/                      # Only this directory is hosted
│   ├── index.html               # Landing page (no framework)
│   ├── assets/
│   │   ├── app.js               # FR/EN toggle, no network requests
│   │   ├── styles.css           # Responsive theme
│   │   └── favicon.svg
│   ├── _headers                 # Cloudflare CSP and security headers
│   ├── robots.txt
│   ├── site.webmanifest
│   └── .nojekyll
├── .github/
│   ├── CODEOWNERS
│   └── workflows/public-safety.yml
├── scripts/check_public_safety.py
├── tests/test_public_safety.py
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTENT-APPROVAL.md
│   └── DEPLOYMENT.md
├── .gitignore
├── SECURITY.md
└── CONTRIBUTING.md
```

**Canonical boundaries:** `OmSadhiGuru/ALPHA.PROXIMA.CORE-` (private) and `OmSadhiGuru/ALPHA-PROXIMA-PUBLIC` (public). These are separate products with separate Git histories.

**Release boundary:** The scanner has an explicit 20-file allowlist. Any new file requires updating `APPROVED_PATHS` and Founder review before publication. This is an aid, not a guarantee of no information leaks.
