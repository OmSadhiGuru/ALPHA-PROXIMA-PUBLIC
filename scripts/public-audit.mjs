import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const blocked = /\.(?:pem|key|p12|pfx|kdbx|sqlite|db|zip|tar|gz)$/i
const secret = /(?:gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/
const findings = []
async function walk(dir) {
  for (const name of await readdir(dir)) {
    if (['node_modules','.git','dist','.codex'].includes(name)) continue
    const path = join(dir, name)
    const info = await stat(path)
    if (info.isDirectory()) await walk(path)
    else {
      if (blocked.test(name)) findings.push(`${path}: private or opaque file extension`)
      if (info.size < 2_000_000 && /\.(?:js|jsx|ts|tsx|json|md|html|css|yml|yaml|txt|env)$/i.test(name)) {
        const body = await readFile(path, 'utf8')
        if (secret.test(body)) findings.push(`${path}: possible credential pattern`)
      }
    }
  }
}
await walk('.')
if (findings.length) { console.error(findings.join('\n')); process.exitCode = 1 }
else console.log('Public-content audit passed.')
