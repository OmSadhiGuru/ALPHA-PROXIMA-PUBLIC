# Hosting / publication guide (FR / EN)

## Recommended: Cloudflare Pages (static, no build)

**Important:** Do not connect a public preview deployment until the Founder approves the site content; preview URLs can become publicly accessible.

**Prerequisites:** `OmSadhiGuru/ALPHA-PROXIMA-PUBLIC` contains the approved files on its default `main` branch; public-safety CI passes; publication has been approved by the Founder.

1. Sign into Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git** (labels may vary).
2. Authorize the GitHub integration for **only** `OmSadhiGuru/ALPHA-PROXIMA-PUBLIC`.
3. Select the repository and `main` as the production branch.
4. Build settings: **Framework preset: None**; **Build command: `exit 0`**; **Build output directory: `public`**. Only files in `public/` will be hosted; never use `/` or the private Core as deployment output.
5. Deploy. Cloudflare will assign a `*.pages.dev` address. Inspect mobile and desktop, FR/EN switching, links and browser console.
6. Optionally attach a custom domain *after* DNS/SSL review and Founder approval.
7. Confirm response headers, especially `Content-Security-Policy`, `X-Content-Type-Options`, `Permissions-Policy`, and `X-Frame-Options`. Cloudflare Pages applies the `_headers` file to static assets; **other hosts may ignore it**.
8. Turn on Cloudflare access monitoring if desired, without collecting visitor personal data until a privacy review.

### Security note

The `main` branch is the **publication boundary**. Configure GitHub Settings > Rules > Rulesets or Branch protection, require pull requests and the `public-safety` job, and disallow force pushes. `CODEOWNERS` by itself does not enforce review. GitHub plan and repository visibility can affect which rules are enforceable; verify in your account UI.

## Alternative: GitHub Pages

GitHub > repository **Settings > Pages**. GitHub Pages does not support `public/` as a direct branch publishing folder. A GitHub Actions build/publish workflow would be required; it is intentionally not included in this first release. **GitHub Pages does not process Cloudflare `_headers`**. Use Cloudflare Pages for the initial deployment.

## Local testing

```bash
python3 -m http.server 8080 --directory public
# http://localhost:8080
```

### FR · checklist de publication

- Les documents du Vault et les exports Omi ne sont pas copiés.
- Aucune clé API / aucun identifiant / aucune donnée personnelle.
- Le CI public-safety est vert; revue humaine explicite.
- La branche `main` est protégée avant le premier déploiement réel.
- Les versions FR/EN sont relues et les descriptions n'exagèrent pas les capacités.
- Le lien GitHub, la présentation mobile et les en-têtes de sécurité sont vérifiés.

### EN · release checklist

- No private Vault files, Omi memory exports, credentials, or personal data.
- Safety workflow passes and Founder approves every publication.
- Protect the production branch and inspect the Cloudflare static security headers.
- Verify bilingual wording, broken links, privacy boundaries and mobile layout.
