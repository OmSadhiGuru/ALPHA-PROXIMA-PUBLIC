import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { AppData } from './model'
import { emptyData } from './model'

interface AlphaDB extends DBSchema {
  captures: { key: string; value: AppData['captures'][number] }
  goals: { key: string; value: AppData['goals'][number] }
  projects: { key: string; value: AppData['projects'][number] }
  tasks: { key: string; value: AppData['tasks'][number] }
  journal: { key: string; value: AppData['journal'][number] }
}
const stores = ['captures', 'goals', 'projects', 'tasks', 'journal'] as const
const DB_VERSION = 1
const migrations: Record<number, (db: IDBPDatabase<AlphaDB>) => void> = {
  1(db) { for (const store of stores) if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, { keyPath: 'id' }) },
}
let database: Promise<IDBPDatabase<AlphaDB>> | undefined
export function getDatabase() {
  database ??= openDB<AlphaDB>('alpha-proxima-one', DB_VERSION, { upgrade(db, oldVersion) {
    for (let version = oldVersion + 1; version <= DB_VERSION; version++) migrations[version]?.(db)
  } })
  return database
}
export async function readAll(): Promise<AppData> {
  const db = await getDatabase()
  const values = await Promise.all(stores.map(store => db.getAll(store)))
  return Object.fromEntries(stores.map((store, i) => [store, values[i]])) as unknown as AppData
}
export async function putRecord(store: keyof AppData, value: AppData[keyof AppData][number]) { return (await getDatabase()).put(store, value as never) }
export async function deleteRecord(store: keyof AppData, id: string) { return (await getDatabase()).delete(store, id) }
export async function replaceAll(data: AppData) {
  const db = await getDatabase()
  const tx = db.transaction([...stores], 'readwrite')
  await Promise.all(stores.map(async store => { await tx.objectStore(store).clear(); await Promise.all(data[store].map(row => tx.objectStore(store).put(row as never))) }))
  await tx.done
}
export async function resetAll() { await replaceAll(emptyData()) }
