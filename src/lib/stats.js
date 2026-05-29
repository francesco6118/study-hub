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

export function formatMinutes(minutes) {
  if (minutes === 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} dk`
  if (m === 0) return `${h} sa`
  return `${h} sa ${m} dk`
}
