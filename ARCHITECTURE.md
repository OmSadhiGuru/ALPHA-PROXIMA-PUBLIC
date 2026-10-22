# Architecture

## v0.1 shape

- **UI:** React + TypeScript, built with Vite; page-level experiences are kept inside one small app.
- **Storage:** IndexedDB (`alpha-proxima-one`, schema version 1), one object store per record type. A versioned `openDB` upgrade callback is the migration boundary for future schema changes.
- **Data model:** captures, goals, projects, tasks and journal entries. IDs are generated in the browser; goals may group projects and projects may group tasks.
- **Backup:** JSON envelope with format identifier and backup version. Import validates collection shape and record IDs, enforces a 20 MB limit, asks before replacement and writes all collections in one IndexedDB transaction.
- **Offline:** small service worker caches the application shell and same-origin assets; no external runtime services are required.
- **Integrations:** no model, Core, Vault, or workflow connection is made. The System screen labels future integrations as planned.

## Compatibility and migrations

Do not change the meaning or remove fields from an existing schema in place. Increment the IndexedDB database version and add an explicit migration in `src/db.ts` when a schema change is needed. Add a backup-version converter before accepting a newer/older backup format. Keep exports documented and test round trips and rejected inputs.

## Boundaries

The app is a public application layer. It contains no private Core material or user records. Browser storage is scoped to the browser profile/device and is not durable backup. The user remains responsible for exporting and protecting backups.

## Architecture decisions

Decisions recorded here are binding for all contributors, human or AI. Changing one requires a new decision that explicitly supersedes it; do not work around a decision silently.

### ADR-001 — One application and one source of data for ALPHA PROXIMA ONE and OSG Life OS

- **Status:** Accepted
- **Date:** 2026-10-21
- **Decided by:** the Founder

**Context.** OSG Life OS already exists as separate interactive pages (a long-range roadmap, a 12-week sprint view, and a Life OS dashboard), and a merge into one centralized dashboard was planned. ALPHA PROXIMA ONE now provides overlapping capabilities (daily focus, goals, projects, tasks, journal). Building both independently would create two parallel life systems whose data and behavior diverge.

**Decision.** ALPHA PROXIMA ONE is the single technical foundation for the future merge with OSG Life OS. There is one application and one source of data. OSG Life OS is integrated progressively into ALPHA PROXIMA ONE as experiences or modules; it is not rebuilt as a parallel system.

**Consequences.**

- OSG Life OS features become screens, views or modules inside this application, sharing its navigation, settings, language and theme.
- All records live in the same local database (`alpha-proxima-one`). New record types are added through the versioned migration path in `src/db.ts`, never through a separate database or storage location.
- The backup format stays single: every module's data is included in the same export and restore, with a backup-version converter whenever the format changes.
- A module reuses existing concepts (goals, projects, tasks, journal) before introducing new ones. A long-range roadmap or a 12-week sprint, for example, should be expressed as views over goals, projects and tasks, or as extensions of them, rather than as duplicate data.
- Existing OSG Life OS pages are treated as design references and migration sources. Importing their content is a one-way, explicit, user-confirmed operation.
- Any proposal for a second application, a second data store, or a sync between two systems requires a new ADR that supersedes this one.

**Related:** [Compatibility and migrations](#compatibility-and-migrations), [Roadmap](ROADMAP.md).

## Long-term direction — Personal Intelligence Hub

ALPHA PROXIMA ONE can grow into one personal control surface for several AI providers and personal systems. This is a future architecture direction, **not an enabled v0.1 capability**.

### Separate the app hub from model providers

- The app is the user's dashboard and policy surface. It owns task intake, user preferences, consent, context selection, routing visibility, and result review.
- A provider adapter talks to one supported model service through its documented API. An adapter reports its capabilities, data requirements, availability, and any known usage cost.
- A system connector (for example, a calendar or knowledge store) is a separate adapter with its own narrow permissions. Connecting a model must not automatically grant it access to every connected system.
- The registry describes available providers and connectors. It contains capability metadata and status, never provider secrets.

### Local models, Google identity, and provider authentication

- **Local models are preferred when suitable and available.** A local-model adapter connects to a runtime installed and controlled by the user on their device or trusted network. Local inference does not require a Google account or cloud provider account.
- **Google sign-in is optional identity, not a universal AI key.** If a future version adds Google sign-in for identity or Google services, consent and scopes must be limited to that purpose. A Google session does not automatically authenticate the user to Anthropic, OpenAI, or other model APIs.
- **Each cloud provider has its own connection and consent.** Use that provider's supported OAuth flow when available; otherwise require an explicit provider credential supplied by the user. Show provider, account, scopes, and connection status separately. Disconnecting one provider must not affect another provider or local models.
- **Keep credentials out of app data and exports.** Never put long-lived API keys or refresh tokens in IndexedDB, localStorage, backups, source control, or the public JavaScript bundle. A future implementation needs a platform credential store or a narrowly scoped local companion that holds secrets; do not add a backend proxy without a separate privacy and security design.
- **Local routing must not quietly become cloud routing.** If no suitable local model is available, explain that and ask before sending the task or selected context to a cloud provider. Store user preferences per task category, while keeping a visible provider override available.
- **Treat local endpoints as a security boundary too.** Only connect to a runtime the user explicitly selects, disclose where it runs, and constrain origins and permissions. A hosted PWA talking to loopback or private-network model runtimes needs a tested browser-compatible design; do not solve this by accepting arbitrary endpoints.

### Task-routing flow

1. The user captures a task and may choose a model directly or ask the hub to recommend one. A configured local model is preferred when it meets the task requirements.
2. A routing policy compares the task's declared needs with configured capabilities, user privacy rules, availability, and optional cost/latency preferences.
3. Before sending content outside the device, the hub shows the selected provider, the context that will be sent, and any available cost information, then asks for consent unless the user has configured a narrow reusable permission.
4. The provider returns a proposal or result. ALPHA PROXIMA ONE presents it for user review; the model does not silently change goals, records, settings, or external systems.
5. External writes and destructive actions require explicit user approval at the action boundary. The hub records routing metadata locally; prompt/response retention is off by default and configurable only with clear notice.

If a provider is unavailable, the hub reports that state and offers an explicit alternative. It must not silently reroute private task context to another provider.

### Claude Code and Claude models

Claude Code is a development tool for working on the repository. It can help inspect and change code under a reviewed feature-branch workflow; it is not itself a model-routing API or an always-on runtime agent inside the installed app. If the product later supports Anthropic Claude at runtime, that should be a distinct, opt-in Anthropic API adapter with its own user-controlled authentication and credentials held outside the public repository, browser bundle, and exported app data.

### Runtime boundary and staged implementation

Keep the v0.1 app local-first and useful without any provider. Later work should start with a provider-neutral `TaskRouter` interface and a mock provider for tests. Add a real provider only after the user explicitly configures it, its data flow is documented, secrets stay server-side or in a supported secure credential store, and consent and approval gates are tested. Do not add a backend or put API keys in client-side environment variables as a shortcut.
