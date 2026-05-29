export const KEYS = {
  SUBJECTS:      'studyhub_subjects',
  SESSIONS:      'studyhub_sessions',
  TASKS:         'studyhub_tasks',
  POMODORO_LOGS: 'studyhub_pomodoro_logs',
  BEST_STREAK:   'studyhub_best_streak',
  DAILY_GOAL:    'studyhub_daily_goal',
}

// Single entry point for all localStorage access.
export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage quota exceeded — fail silently
  }
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
