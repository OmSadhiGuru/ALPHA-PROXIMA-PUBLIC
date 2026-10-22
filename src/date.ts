/**
 * Calendar date (YYYY-MM-DD) in the user's local time zone.
 * Do not use `toISOString().slice(0, 10)` for user-facing dates: it returns the
 * UTC date, which is already "tomorrow" in the evening west of Greenwich.
 */
export function localDateKey(date: Date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
