import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useSubjectGoals() {
  const [goals, setGoals] = useState(() => getItem(KEYS.SUBJECT_GOALS, []))

  useEffect(() => {
    setItem(KEYS.SUBJECT_GOALS, goals)
  }, [goals])

  function addGoal(subjectId, text) {
    setGoals(prev => [...prev, { id: crypto.randomUUID(), subjectId, text, completed: false }])
  }

  function toggleGoal(id) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g))
  }

  function removeGoal(id) {
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  function goalsFor(subjectId) {
    return goals.filter(g => g.subjectId === subjectId)
  }

  return { goalsFor, addGoal, toggleGoal, removeGoal }
}
