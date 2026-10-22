#!/usr/bin/env python3
"""Fail closed if a public release contains likely private files or credentials.

This is a defense-in-depth check, not a substitute for GitHub secret scanning,
reviewing history, or a human content-approval gate. It only scans this tree.
"""
from __future__ import annotations
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
FORBIDDEN_DIRS = frozenset({
    'omi', '12_people', '13_operations', '03_ai_council', '04_decisions',
    '06_governance', '09_offices', 'project_genome', '.obsidian', '.claudian',
    'private', 'secrets', 'credentials', 'alpha.proxima.core-',
})
FORBIDDEN_SUFFIXES = ('.pem', '.key', '.p12', '.pfx', '.db', '.mdb', '.sqlite', '.sqlite3', '.zip', '.tar', '.gz', '.pdf', '.png', '.jpg', '.jpeg', '.webp', '.heic')
FORBIDDEN_NAMES = frozenset({'.env', 'id_rsa', 'id_ed25519', '.npmrc'})
# Build patterns in small pieces so the scanner source itself does not contain a live token.
SECRET_PATTERNS = [
    re.compile(r'gh' + r'p_[a-zA-Z0-9]{32,}'),
    re.compile(r'github_pat_' + r'[a-zA-Z0-9_]{30,}'),
    re.compile(r'sk-' + r'proj-[a-zA-Z0-9_-]{20,}'),
    re.compile(r'\b\d{8,10}:' + r'[A-Za-z0-9_-]{30,}\b'),
    re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
]
MAX_FILE_BYTES = 1_000_000
TEXT_EXTENSIONS = {'.html', '.css', '.js', '.json', '.md', '.txt', '.svg', '.yml', '.yaml', '.py', '.webmanifest', ''}
# Explicit publication manifest. New files require an intentional scanner change and review.
APPROVED_PATHS = frozenset({
    '.github/CODEOWNERS', '.github/workflows/public-safety.yml', '.gitignore',
    'CONTRIBUTING.md', 'README.md', 'SECURITY.md',
    'docs/ARCHITECTURE.md', 'docs/CONTENT-APPROVAL.md', 'docs/DEPLOYMENT.md', 'docs/IMPORT-GITHUB.md',
    'public/.nojekyll', 'public/_headers', 'public/assets/app.js', 'public/assets/favicon.svg',
    'public/assets/styles.css', 'public/index.html', 'public/robots.txt', 'public/site.webmanifest',
    'scripts/check_public_safety.py', 'tests/test_public_safety.py',
})


def check_paths(paths: list[str]) -> list[str]:
    problems = []
    for name in paths:
        normalized = name.replace('\\', '/').strip('/')
        if normalized not in APPROVED_PATHS:
            problems.append(f'File not in approved public release manifest: {normalized}')
        segments = [part.lower() for part in normalized.split('/')]
        basename = segments[-1]
        if any(part in FORBIDDEN_DIRS for part in segments):
            problems.append(f'Disallowed private directory: {normalized}')
        if basename in FORBIDDEN_NAMES or basename.startswith('.env.') or basename.endswith(FORBIDDEN_SUFFIXES):
            problems.append(f'Disallowed filename or extension: {normalized}')
    return problems


def check_content(data: bytes, label: str) -> list[str]:
    if len(data) > MAX_FILE_BYTES:
        return [f'File exceeds 1 MB manual-review threshold: {label}']
    decoded = data.decode('utf-8', errors='replace')
    # Never print a match, a line, or a value: CI logs are publicly visible.
    return [f'Potential secret detected, manual review required: {label}'] if any(pattern.search(decoded) for pattern in SECRET_PATTERNS) else []


def tracked_files() -> list[str]:
    result = subprocess.run(['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], cwd=ROOT, check=False, capture_output=True)
    if result.returncode == 0:
        return sorted({name.decode('utf-8') for name in result.stdout.split(b'\0') if name})
    # Support testing an extracted ZIP without a .git directory.
    cache_dirs = {'.git', '__pycache__', '.pytest_cache', 'node_modules'}
    files = []
    for p in ROOT.rglob('*'):
        if not (p.is_file() or p.is_symlink()):
            continue
        rel = p.relative_to(ROOT)
        if any(part in cache_dirs for part in rel.parts) or p.suffix == '.pyc':
            continue
        files.append(str(rel))
    return sorted(files)


def main() -> int:
    files = tracked_files()
    errors = check_paths(files)
    for name in files:
        p = ROOT / name
        if p.is_symlink():
            errors.append(f'Symlinks are not allowed in public releases: {name}')
            continue
        if not p.is_file():
            errors.append(f'Missing or unsupported file: {name}')
            continue
        if p.suffix.lower() not in TEXT_EXTENSIONS:
            errors.append(f'Unsupported file type: {name}')
            continue
        errors.extend(check_content(p.read_bytes(), name))
    if errors:
        for message in errors:
            print('BLOCKED: ' + message, file=sys.stderr)
        return 1
    print(f'PASS: {len(files)} public files checked. Human approval still required before publishing.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
