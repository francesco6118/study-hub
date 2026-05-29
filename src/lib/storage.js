export const KEYS = {
  SUBJECTS: 'studyhub_subjects',
  SESSIONS: 'studyhub_sessions',
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
