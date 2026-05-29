import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useSubjects() {
  const [subjects, setSubjects] = useState(() => getItem(KEYS.SUBJECTS, []))

  useEffect(() => {
    setItem(KEYS.SUBJECTS, subjects)
  }, [subjects])

  function addSubject(name, color) {
    setSubjects(prev => [...prev, { id: crypto.randomUUID(), name, color }])
  }

  function removeSubject(id) {
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  return { subjects, addSubject, removeSubject }
}
