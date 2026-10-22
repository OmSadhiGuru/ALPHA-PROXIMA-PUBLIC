# Roadmap

## v0.1 — Foundation MVP

- Daily focus, quick capture/search, goals/projects/tasks, daily journal and system settings.
- French/English interface, dark/light theme, IndexedDB, JSON backup/restore and PWA shell.
- Explicitly unavailable: LUMIAION actions, Core/Vault, AI providers, cross-device synchronization, encrypted backup.

## Candidate next steps

1. Run device QA on iPhone/iPad and desktop browsers; confirm install and offline update behavior.
2. Add robust browser-level user-flow tests for persistence and backup round trips.
3. Design opt-in encrypted backup and sync threat models before implementing any remote service.

Each addition should preserve exportability and make data movement explicit.
