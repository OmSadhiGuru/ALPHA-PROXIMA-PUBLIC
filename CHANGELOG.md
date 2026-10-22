# Changelog

## Unreleased — 0.1.1

- Fixed: journal entries and backup file names now use the user's local calendar date instead of the UTC date (evening entries no longer land on the next day west of UTC).
- Fixed: edit mode now has a Cancel button on captures, goals, projects and tasks; starting or cancelling an edit clears the form so the next save creates a new item.
- Fixed: editing a task from Home now keeps its project.
- Added: 180×180 opaque `apple-touch-icon` for iPhone/iPad home screens (source in `design/icons/`).
- Tests: time-zone coverage for local dates and a UI test for cancel-then-create on captures.
- Docs: ADR-001 in `ARCHITECTURE.md` — ALPHA PROXIMA ONE is the single application and single data source for the future merge with OSG Life OS.

## 0.1.0 — Foundation MVP

- Initial local-first app with Home, Capture, Life, Journal and System.
- IndexedDB data model, JSON backup validation/restore, bilingual UI, theme choice and PWA shell.
- Added documentation, CI checks and public-content audit.
