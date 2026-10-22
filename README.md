# ALPHA PROXIMA ONE

**Personal Operating System · Foundation MVP v0.1**
*One life. One evolving system.*

An installable, local-first space for daily focus, capture, goals, projects, tasks and journaling. Start without an account. Your content stays in this browser unless you export a backup.

## Run locally

Requirements: Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To verify the production build:

```sh
npm run lint
npm run typecheck
npm test
npm run audit:public
npm run build
npm run preview
```

## Data and recovery

Structured content is stored in IndexedDB on this browser and device. Use **System → Export backup** to download a versioned JSON file. To move devices: export a backup, save it somewhere you control, open ALPHA PROXIMA ONE on the new device, then choose **System → Restore from backup** and confirm. Restore replaces the current local data. Keep regular backups in a safe location. Browser storage is not a permanent archive and can be cleared by the browser, operating system, or user.

There is no account, backend, telemetry, analytics, or AI provider in v0.1. Cross-device sync and encrypted backups are not implemented.

## Install and offline use

Serve the production build over HTTPS (localhost is also treated as secure by modern browsers), open the site once online, and use the browser's **Add to Home Screen / Install app** action where supported. The service worker caches the application shell and same-origin assets; IndexedDB keeps content locally. Browser/platform installation behavior varies.

## Deploy to Cloudflare Pages

1. Connect `OmSadhiGuru/ALPHA-PROXIMA-PUBLIC` to Cloudflare Pages.
2. Set the production branch to the reviewed branch you intend to publish.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Framework preset: **Vite** (or **None** with the same command and output directory).
6. No environment variables are needed. Do not add secrets for v0.1.
7. Review the Cloudflare preview and confirm HTTPS before promoting a production deployment.

The GitHub Actions workflow checks code and public-content audit; it does not deploy.

## Project notes

- [Architecture](ARCHITECTURE.md)
- [Security](SECURITY.md)
- [Privacy](PRIVACY.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)
