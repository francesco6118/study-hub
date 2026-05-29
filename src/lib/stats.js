// Returns YYYY-MM-DD in local time for a given Date or ISO string
function toLocalDate(d) {
  const date = typeof d === 'string' ? new Date(d) : d
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function localToday() {
  return toLocalDate(new Date())
}

function thisMonday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d
}

export function todayLogs(logs) {
  const t = localToday()
  return logs.filter(l => toLocalDate(l.completedAt) === t)
}

export function thisWeekLogs(logs) {
  const monday = thisMonday()
  return logs.filter(l => new Date(l.completedAt) >= monday)
}

export function last7DaysData(logs) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    d.setHours(0, 0, 0, 0)
    const dateStr = toLocalDate(d)
    const minutes = logs
      .filter(l => toLocalDate(l.completedAt) === dateStr)
      .reduce((sum, l) => sum + l.durationMinutes, 0)
    return {
      label: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
      minutes,
    }
  })
}

export function bySubjectData(logs, subjects) {
  const map = {}
  logs.forEach(l => {
    const key = l.subjectId ?? '__none__'
    map[key] = (map[key] ?? 0) + l.durationMinutes
  })
  return Object.entries(map)
    .map(([id, minutes]) => {
      const subject = subjects.find(s => s.id === id)
      return {
        name: subject?.name ?? 'Derssiz',
        minutes,
        color: subject?.color ?? '#64748b',
      }
    })
    .sort((a, b) => b.minutes - a.minutes)
}

// Counts consecutive days ending on today or yesterday that have ≥1 log.
// Using T12:00:00 for date arithmetic to avoid DST edge cases.
export function calcStreak(logs) {
  if (logs.length === 0) return 0

  const today = localToday()
  const yesterdayDate = new Date()
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)
  const yesterday = toLocalDate(yesterdayDate)

  const days = Array.from(new Set(logs.map(l => toLocalDate(l.completedAt)))).sort().reverse()

  if (days[0] !== today && days[0] !== yesterday) return 0

  let streak = 0
  let expected = days[0]
  for (const day of days) {
    if (day !== expected) break
    streak++
    const prev = new Date(expected + 'T12:00:00')
    prev.setDate(prev.getDate() - 1)
    expected = toLocalDate(prev)
  }
  return streak
}

export function formatMinutes(minutes) {
  if (minutes === 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} dk`
  if (m === 0) return `${h} sa`
  return `${h} sa ${m} dk`
}
