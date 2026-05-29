import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useTasks() {
  const [tasks, setTasks] = useState(() => getItem(KEYS.TASKS, []))

  useEffect(() => {
    setItem(KEYS.TASKS, tasks)
  }, [tasks])

  function addTask({ title, subjectId, deadline }) {
    setTasks(prev => [
      { id: crypto.randomUUID(), title, subjectId: subjectId ?? null, deadline: deadline ?? null, completed: false, createdAt: new Date().toISOString() },
      ...prev,
    ])
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return { tasks, addTask, toggleTask, removeTask }
}
