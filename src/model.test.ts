import { describe, expect, it } from 'vitest'
import { emptyData, validateBackup } from './model'

describe('portable backup validation', () => {
  it('accepts a versioned backup and preserves all collections', () => {
    const data = { ...emptyData(), tasks: [{ id: 't1', title: 'Task', done: false, priority: true, createdAt: '2026-01-01' }] }
    const exported = JSON.stringify({ format: 'alpha-proxima-one-backup', version: 1, data })
    expect(validateBackup(JSON.parse(exported))).toEqual(data)
  })
  it('rejects unknown versions and malformed records', () => {
    expect(() => validateBackup({ format: 'alpha-proxima-one-backup', version: 9, data: emptyData() })).toThrow('Unsupported')
    expect(() => validateBackup({ format: 'alpha-proxima-one-backup', version: 1, data: { ...emptyData(), tasks: [{ title: 'missing id' }] } })).toThrow('Invalid record')
  })
  it('rejects missing collections', () => {
    expect(() => validateBackup({ format: 'alpha-proxima-one-backup', version: 1, data: { tasks: [] } })).toThrow('captures')
  })
})
