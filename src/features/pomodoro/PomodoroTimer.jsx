import { useState, useCallback, useEffect } from 'react'
import useTimer from '../../hooks/useTimer'
import { playAlarm, requestNotificationPermission, showNotification } from '../../lib/audio'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import DurationSettings from './DurationSettings'

export default function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [mode, setMode] = useState('work') // 'work' | 'break'
  const [session, setSession] = useState(1)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  const handleExpire = useCallback(() => {
    playAlarm()
    if (mode === 'work') {
      showNotification('Süre doldu!', `${workMinutes} dakikalık çalışma bitti. Mola zamanı!`)
      setMode('break')
    } else {
      showNotification('Mola bitti!', 'Yeni bir pomodoro başlıyor.')
      setMode('work')
      setSession(s => s + 1)
    }
  }, [mode, workMinutes])

  const activeDuration = mode === 'work' ? workMinutes * 60 : breakMinutes * 60

  const { secondsLeft, running, start, pause, reset } = useTimer(activeDuration, handleExpire)

  function handleDurationChange(type, value) {
    if (type === 'work') setWorkMinutes(value)
    else setBreakMinutes(value)
  }

  const progress = 1 - secondsLeft / activeDuration
  const circumference = 2 * Math.PI * 110

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto">
      {/* Circular progress ring */}
      <div className="relative flex items-center justify-center">
        <svg width="280" height="280" className="-rotate-90">
          <circle cx="140" cy="140" r="110" fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="140" cy="140" r="110"
            fill="none"
            stroke={mode === 'work' ? '#10b981' : '#f59e0b'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute">
          <TimerDisplay secondsLeft={secondsLeft} mode={mode} />
        </div>
      </div>

      <TimerControls running={running} onStart={start} onPause={pause} onReset={reset} />

      {/* Session counter */}
      <p className="text-slate-400 text-sm">
        Pomodoro <span className="text-white font-semibold">#{session}</span>
      </p>

      <div className="w-full border-t border-slate-700 pt-6">
        <p className="text-center text-xs text-slate-500 mb-4 uppercase tracking-wide">
          Süre Ayarları
        </p>
        <DurationSettings
          workMinutes={workMinutes}
          breakMinutes={breakMinutes}
          onChange={handleDurationChange}
          disabled={running}
        />
      </div>
    </div>
  )
}
