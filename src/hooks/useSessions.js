import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useSessions() {
  const [sessions, setSessions] = useState(() => getItem(KEYS.SESSIONS, []))

  useEffect(() => {
    setItem(KEYS.SESSIONS, sessions)
  }, [sessions])

  function addSession(session) {
    setSessions(prev => [...prev, { id: crypto.randomUUID(), ...session }])
  }

  function removeSession(id) {
    setSessions(prev => prev.filter(s => s.id !== id))
  }

  return { sessions, addSession, removeSession }
}
