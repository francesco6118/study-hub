import { useState } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useDailyGoal() {
  const [dailyGoal, setGoalState] = useState(() => getItem(KEYS.DAILY_GOAL, 4))

  function setDailyGoal(n) {
    const clamped = Math.max(1, Math.min(20, n))
    setGoalState(clamped)
    setItem(KEYS.DAILY_GOAL, clamped)
  }

  return { dailyGoal, setDailyGoal }
}
