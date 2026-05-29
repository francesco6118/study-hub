import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

const DEFAULTS = {
  longBreakMinutes:  15,
  longBreakInterval: 4,
  autoStart:         false,
  soundEnabled:      true,
  soundVolume:       0.6,
}

export default function usePomodoroSettings() {
  const [settings, setSettings] = useState(() => ({
    ...DEFAULTS,
    ...getItem(KEYS.POMODORO_SETTINGS, {}),
  }))

  useEffect(() => {
    setItem(KEYS.POMODORO_SETTINGS, settings)
  }, [settings])

  function update(patch) {
    setSettings(prev => ({ ...prev, ...patch }))
  }

  return { ...settings, update }
}
