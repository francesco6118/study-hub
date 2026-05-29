import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function usePomodoroLogs() {
  const [logs, setLogs] = useState(() => getItem(KEYS.POMODORO_LOGS, []))

  useEffect(() => {
    setItem(KEYS.POMODORO_LOGS, logs)
  }, [logs])

  function addLog({ subjectId, durationMinutes, completedAt }) {
    setLogs(prev => [...prev, { id: crypto.randomUUID(), subjectId, durationMinutes, completedAt }])
  }

  return { logs, addLog }
}
