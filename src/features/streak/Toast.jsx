import { useEffect } from 'react'

const MESSAGES = {
  goal:   ({ goal })   => `Günlük hedefe ulaştın! ${goal} pomodoro tamamlandı.`,
  streak: ({ streak }) => `Yeni seri rekoru: ${streak} gün!`,
  both:   ({ streak, goal }) => `Harika! ${goal} pomodoro ve ${streak} günlük yeni rekor!`,
}

const AUTO_DISMISS_MS = 4000

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(id)
  }, [toast, onDismiss])

  if (!toast) return null

  const message = MESSAGES[toast.type]?.(toast) ?? ''

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4 pointer-events-none">
      <div
        className="bg-emerald-600 text-white rounded-2xl px-4 py-3 shadow-xl text-sm font-medium text-center pointer-events-auto"
        onClick={onDismiss}
      >
        {message}
      </div>
    </div>
  )
}
