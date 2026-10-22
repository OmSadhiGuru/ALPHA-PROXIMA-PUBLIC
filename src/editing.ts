import type { Capture, CaptureKind } from './model'

export type EditKind = 'capture' | 'goal' | 'project' | 'task'
export type EditState = { type: EditKind; id: string } | null
export interface CaptureDraft { kind: CaptureKind; title: string; body: string }

/** The record being edited for this form, or undefined when the form should create a new record. */
export function editTarget<T extends { id: string }>(rows: T[], editing: EditState, type: EditKind): T | undefined {
  return editing?.type === type ? rows.find(row => row.id === editing.id) : undefined
}

/** Builds the record to save: updates `existing` in place (same id/createdAt) or creates a new one. */
export function buildCapture(draft: CaptureDraft, existing: Capture | undefined, now: string, newId: () => string): Capture {
  return { id: existing?.id ?? newId(), kind: draft.kind, title: draft.title.trim(), body: draft.body, createdAt: existing?.createdAt ?? now, updatedAt: now }
}
