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

## Long-term direction — Personal Intelligence Hub

ALPHA PROXIMA ONE can grow into one personal control surface for several AI providers and personal systems. This is a future architecture direction, **not an enabled v0.1 capability**.

### Separate the app hub from model providers

- The app is the user's dashboard and policy surface. It owns task intake, user preferences, consent, context selection, routing visibility, and result review.
- A provider adapter talks to one supported model service through its documented API. An adapter reports its capabilities, data requirements, availability, and any known usage cost.
- A system connector (for example, a calendar or knowledge store) is a separate adapter with its own narrow permissions. Connecting a model must not automatically grant it access to every connected system.
- The registry describes available providers and connectors. It contains capability metadata and status, never provider secrets.

### Task-routing flow

1. The user captures a task and may choose a provider directly or ask the hub to recommend one.
2. A routing policy compares the task's declared needs with configured capabilities, user privacy rules, availability, and optional cost/latency preferences.
3. Before sending content outside the device, the hub shows the selected provider, the context that will be sent, and any available cost information, then asks for consent unless the user has configured a narrow reusable permission.
4. The provider returns a proposal or result. ALPHA PROXIMA ONE presents it for user review; the model does not silently change goals, records, settings, or external systems.
5. External writes and destructive actions require explicit user approval at the action boundary. The hub records routing metadata locally; prompt/response retention is off by default and configurable only with clear notice.

If a provider is unavailable, the hub reports that state and offers an explicit alternative. It must not silently reroute private task context to another provider.

### Claude Code and Claude models

Claude Code is a development tool for working on the repository. It can help inspect and change code under a reviewed feature-branch workflow; it is not itself a model-routing API or an always-on runtime agent inside the installed app. If the product later supports Anthropic Claude at runtime, that should be a distinct, opt-in Anthropic API adapter with user-configured credentials held outside the public repository and browser bundle.

### Runtime boundary and staged implementation

Keep the v0.1 app local-first and useful without any provider. Later work should start with a provider-neutral `TaskRouter` interface and a mock provider for tests. Add a real provider only after the user explicitly configures it, its data flow is documented, secrets stay server-side or in a supported secure credential store, and consent and approval gates are tested. Do not add a backend or put API keys in client-side environment variables as a shortcut.
