# Roadmap

## v0.1 — Foundation MVP

- Daily focus, quick capture/search, goals/projects/tasks, daily journal and system settings.
- French/English interface, dark/light theme, IndexedDB, JSON backup/restore and PWA shell.
- Explicitly unavailable: LUMIAION actions, Core/Vault, AI providers, cross-device synchronization, encrypted backup.

## Candidate next steps

1. Run device QA on iPhone/iPad and desktop browsers; confirm install and offline update behavior.
2. Add robust browser-level user-flow tests for persistence and backup round trips.
3. Prototype a provider-neutral Personal Intelligence Hub with a mock router, capability registry, visible routing rationale, and consent/approval flow. Keep every live AI provider disabled until configured.
4. Design opt-in encrypted backup and sync threat models before implementing any remote service.

Claude Code may be used as a development assistant on reviewed feature branches. Runtime Claude support, if selected later, means an Anthropic API adapter and requires separate configuration; the Claude Code CLI itself is not the in-app model router.

Each addition should preserve exportability and make data movement explicit.
