import { useState, useEffect, useRef, useMemo } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'
import { calcStreak, todayLogs } from '../lib/stats'

export default function useMotivation(logs, dailyGoal) {
  const [toast, setToast] = useState(null)
  const [bestStreak, setBestStreak] = useState(() => getItem(KEYS.BEST_STREAK, 0))

  // Refs let us read latest values inside the logs-change effect without
  // adding them as deps (which would cause false triggers).
  const bestStreakRef = useRef(bestStreak)
  const dailyGoalRef = useRef(dailyGoal)
  // Track previous log count so the effect only fires on new additions.
  const prevLengthRef = useRef(logs.length)

  useEffect(() => { bestStreakRef.current = bestStreak }, [bestStreak])
  useEffect(() => { dailyGoalRef.current = dailyGoal },   [dailyGoal])

  const currentStreak = useMemo(() => calcStreak(logs), [logs])

  useEffect(() => {
    // Skip if no new log was added (covers initial render & React Strict Mode double-mount)
    if (logs.length <= prevLengthRef.current) {
      prevLengthRef.current = logs.length
      return
    }
    prevLengthRef.current = logs.length

    const newStreak   = calcStreak(logs)
    const todayCount  = todayLogs(logs).length
    const goal        = dailyGoalRef.current

    let isNewRecord = false
    if (newStreak > bestStreakRef.current) {
      isNewRecord = true
      bestStreakRef.current = newStreak
      setBestStreak(newStreak)
      setItem(KEYS.BEST_STREAK, newStreak)
    }

    // Goal toast fires exactly when today's count hits the target (not on every extra pomodoro)
    const goalJustReached = goal > 0 && todayCount === goal

    if (goalJustReached && isNewRecord) {
      setToast({ type: 'both', streak: newStreak, goal })
    } else if (isNewRecord) {
      setToast({ type: 'streak', streak: newStreak })
    } else if (goalJustReached) {
      setToast({ type: 'goal', goal })
    }
  }, [logs]) // eslint-disable-line react-hooks/exhaustive-deps

  return { currentStreak, bestStreak, toast, dismissToast: () => setToast(null) }
}
