export type CaptureKind = 'thought' | 'note' | 'task' | 'idea'
export interface Capture { id: string; kind: CaptureKind; title: string; body: string; createdAt: string; updatedAt: string }
export interface Goal { id: string; title: string; description: string; createdAt: string }
export interface Project { id: string; goalId?: string; title: string; description: string; createdAt: string }
export interface Task { id: string; projectId?: string; title: string; done: boolean; priority: boolean; dueDate?: string; createdAt: string }
export interface Journal { id: string; date: string; text: string; mood?: string; updatedAt: string }
export interface AppData { captures: Capture[]; goals: Goal[]; projects: Project[]; tasks: Task[]; journal: Journal[] }
export const emptyData = (): AppData => ({ captures: [], goals: [], projects: [], tasks: [], journal: [] })
export const BACKUP_VERSION = 1
export function validateBackup(input: unknown): AppData {
  if (!input || typeof input !== 'object') throw new Error('Backup must be a JSON object.')
  const backup = input as { format?: unknown; version?: unknown; data?: unknown }
  if (backup.format !== 'alpha-proxima-one-backup' || backup.version !== BACKUP_VERSION || !backup.data || typeof backup.data !== 'object') throw new Error('Unsupported or invalid backup format.')
  const data = backup.data as Record<string, unknown>
  const collections = ['captures', 'goals', 'projects', 'tasks', 'journal']
  for (const name of collections) if (!Array.isArray(data[name])) throw new Error(`Backup is missing the ${name} collection.`)
  const bounded = JSON.stringify(data)
  if (bounded.length > 20_000_000) throw new Error('Backup is larger than the 20 MB safety limit.')
  const required: Record<string, string[]> = { captures: ['id','kind','title','body','createdAt','updatedAt'], goals: ['id','title','description','createdAt'], projects: ['id','title','description','createdAt'], tasks: ['id','title','done','priority','createdAt'], journal: ['id','date','text','updatedAt'] }
  for (const name of collections) {
    for (const row of data[name] as unknown[]) {
      if (!row || typeof row !== 'object' || typeof (row as { id?: unknown }).id !== 'string' || (row as { id: string }).id.length > 200) throw new Error(`Invalid record in ${name}.`)
      const record = row as Record<string, unknown>
      for (const field of required[name]) if (!(field in record)) throw new Error(`Invalid record in ${name}: missing ${field}.`)
      for (const field of ['title','body','description','text','createdAt','updatedAt','date','kind','mood']) if (field in record && typeof record[field] !== 'string') throw new Error(`Invalid record in ${name}: ${field} must be text.`)
      if ('done' in record && typeof record.done !== 'boolean' || 'priority' in record && typeof record.priority !== 'boolean') throw new Error(`Invalid record in ${name}: task flags must be boolean.`)
      for (const field of ['title','body','description','text']) if (typeof record[field] === 'string' && record[field].length > 100_000) throw new Error(`Invalid record in ${name}: ${field} is too long.`)
    }
  }
  return data as unknown as AppData
}
