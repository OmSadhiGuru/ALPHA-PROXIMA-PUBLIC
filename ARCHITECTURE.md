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
