import { useState, useEffect, useRef, useCallback } from 'react'

// Uses an absolute end-time ref so the countdown stays accurate when the
// browser throttles timers (background tab, locked screen).
// visibilitychange corrects the display immediately when the app is foregrounded.
export default function useTimer(initialSeconds, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)

  const endTimeRef     = useRef(null)
  const intervalRef    = useRef(null)
  const onExpireRef    = useRef(onExpire)
  const secondsRef     = useRef(secondsLeft) // stable read inside callbacks

  useEffect(() => { onExpireRef.current = onExpire }, [onExpire])
  useEffect(() => { secondsRef.current = secondsLeft }, [secondsLeft])

  // Reset when the target duration changes (mode/settings change)
  useEffect(() => {
    setSecondsLeft(initialSeconds)
    setRunning(false)
    endTimeRef.current = null
  }, [initialSeconds])

  // Correct remaining time when tab becomes visible again
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState !== 'visible' || !endTimeRef.current) return
      const remaining = Math.round((endTimeRef.current - Date.now()) / 1000)
      if (remaining <= 0) {
        clearInterval(intervalRef.current)
        setRunning(false)
        setSecondsLeft(0)
        endTimeRef.current = null
        onExpireRef.current()
      } else {
        setSecondsLeft(remaining)
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      if (!endTimeRef.current) return
      const remaining = Math.round((endTimeRef.current - Date.now()) / 1000)
      if (remaining <= 0) {
        clearInterval(intervalRef.current)
        setRunning(false)
        setSecondsLeft(0)
        endTimeRef.current = null
        onExpireRef.current()
        return
      }
      setSecondsLeft(remaining)
    }, 500) // poll every 500 ms for 1-second display accuracy
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start = useCallback(() => {
    endTimeRef.current = Date.now() + secondsRef.current * 1000
    setRunning(true)
  }, [])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    endTimeRef.current = null
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  return { secondsLeft, running, start, pause, reset }
}
