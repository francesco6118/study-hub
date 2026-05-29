import { useState, useEffect, useRef, useCallback } from 'react'

export default function useTimer(initialSeconds, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    setSecondsLeft(initialSeconds)
    setRunning(false)
  }, [initialSeconds])

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])
  const reset = useCallback(() => {
    setRunning(false)
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  return { secondsLeft, running, start, pause, reset }
}
