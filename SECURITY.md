# Security

## Defaults

- No credentials, server, authentication, telemetry, analytics, or third-party AI integration are required.
- User text is rendered as React text; avoid HTML injection APIs.
- Backup input is parsed as data, checked for format/version/collections/IDs, and capped at 20 MB before a replace confirmation.
- A same-origin Content Security Policy is configured for Vite's development server and Cloudflare Pages through `public/_headers`. The policy allows inline style attributes for the small progress indicator; scripts, connections, images and other resources remain same-origin.
- `npm run audit:public` scans tracked project content (excluding dependencies, Git metadata and build output) for private/opaque file extensions and common credential patterns. This is a useful preflight, not a complete secret scanner.

## Reporting

Please do not publish exploit details or private user data in an issue. Contact the repository maintainer privately with a concise reproduction and affected version.

## Limits

Local browser data is not encrypted by this app and can be read by someone with access to the browser profile/device. A JSON export is plaintext. Browser storage may be cleared. Do not store secrets or highly sensitive records here. No security guarantee is implied by the presence of local storage or the audit script.
