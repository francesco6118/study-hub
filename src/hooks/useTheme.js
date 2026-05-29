import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useTheme() {
  const [theme, setThemeState] = useState(() => getItem(KEYS.THEME, 'dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setThemeState(next)
    setItem(KEYS.THEME, next)
  }

  return { theme, toggle, isDark: theme === 'dark' }
}
