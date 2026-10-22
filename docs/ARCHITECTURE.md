# Architecture · Private Core / Public Platform

## Non-negotiable separation

```text
                    HUMAN FOUNDER APPROVAL
                              │
               ┌──────────────▼─────────────┐
               │ Private canonical Core      │
               │ Obsidian Vault, memory,     │
               │ governance, operations      │
               └──────────────┬─────────────┘
                              │
                  REVIEW + REDACTION GATE
             (explicit approved public material)
                              │
               ┌──────────────▼─────────────┐
               │ Public Git repository       │
               │ Front-end + approved docs   │
               └──────────────┬─────────────┘
                              │
                   Static hosting / CDN
```

- **Private Core:** canonical institutional knowledge and sensitive operational data; not mirrored, vendored, submoduled or built into the public site.
- **Public repository:** source of the public website only. It has **no Git history in common with the Core**.
- **Publication:** deliberate human review of individual sanitized artifacts. An automated safety scanner is a second line of defense, never the authority that approves publication.
- **Public hosting:** static Cloudflare Pages website, with no back-end connection to the Vault and no use of GitHub private repository credentials.
- **n8n / LUMIAION:** any future read-only GitHub integration is a private backend workflow, *outside* this public site. It must have its own minimal-scoped credentials, access rules, logs policy, and Founder approval. Never call GitHub private APIs directly from browser JavaScript.

## Present-day boundaries

- Homepage is a **preview**, not an operational agent interface.
- Domain names represent **areas of exploration**, not evidence of deployed autonomous agents or formal appointment.
- No authentication, remote API, forms, dashboards, databases, embeddings, cookies, or external telemetry are shipped.
- Language preference is optional browser `localStorage`; the site continues to work if storage is disabled.

## Future implementation gates

1. Document exact purpose, users, data categories, retention, and external services of any new feature.
2. Classify as public/internal/private/restricted before writing code.
3. Threat-model any new API or user interaction, including authenticated permissions and rate limits.
4. Require Founder sign-off before allowing public interactions with any AI capability.
5. Introduce an independent, narrow API boundary and server-side authorization. Do not expose Vault paths or raw memory.
