import { afterEach, describe, expect, it } from 'vitest'
import { localDateKey } from './date'

// Vitest runs in Node; declared locally so the browser app does not need Node typings.
declare const process: { env: Record<string, string | undefined> }
const originalTZ = process.env.TZ
afterEach(() => { if (originalTZ === undefined) delete process.env.TZ; else process.env.TZ = originalTZ })

describe('localDateKey', () => {
  it('uses the local date in the evening west of UTC (Gatineau, EDT)', () => {
    process.env.TZ = 'America/Toronto'
    const eveningLocal = new Date('2026-10-22T01:30:00Z') // 21:30 on Oct 21 in Gatineau
    expect(eveningLocal.toISOString().slice(0, 10)).toBe('2026-10-22') // the old UTC behaviour
    expect(localDateKey(eveningLocal)).toBe('2026-10-21')
  })
  it('uses the local date in winter time (EST, UTC-5)', () => {
    process.env.TZ = 'America/Toronto'
    expect(localDateKey(new Date('2026-12-16T04:59:00Z'))).toBe('2026-12-15') // 23:59 local
    expect(localDateKey(new Date('2026-12-16T05:00:00Z'))).toBe('2026-12-16') // 00:00 local
  })
  it('uses the local date east of UTC, where UTC is still "yesterday"', () => {
    process.env.TZ = 'Asia/Tokyo'
    expect(localDateKey(new Date('2026-10-21T16:00:00Z'))).toBe('2026-10-22') // 01:00 local
  })
})
