import { useState, useCallback, useEffect, useRef } from 'react'
import useTimer from '../../hooks/useTimer'
import { playAlarm, requestNotificationPermission, showNotification } from '../../lib/audio'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import DurationSettings from './DurationSettings'
import SubjectSelect from './SubjectSelect'

export default function PomodoroTimer({ subjects, onSessionComplete }) {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [mode, setMode] = useState('work') // 'work' | 'break'
  const [session, setSession] = useState(1)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)

  const onSessionCompleteRef = useRef(onSessionComplete)
  useEffect(() => { onSessionCompleteRef.current = onSessionComplete }, [onSessionComplete])

  useEffect(() => { requestNotificationPermission() }, [])

  const handleExpire = useCallback(() => {
    playAlarm()
    if (mode === 'work') {
      onSessionCompleteRef.current?.({
        subjectId: selectedSubjectId,
        durationMinutes: workMinutes,
        completedAt: new Date().toISOString(),
      })
      showNotification('Süre doldu!', `${workMinutes} dakikalık çalışma bitti. Mola zamanı!`)
      setMode('break')
    } else {
      showNotification('Mola bitti!', 'Yeni bir pomodoro başlıyor.')
      setMode('work')
      setSession(s => s + 1)
    }
  }, [mode, workMinutes, selectedSubjectId])

  const activeDuration = mode === 'work' ? workMinutes * 60 : breakMinutes * 60
  const { secondsLeft, running, start, pause, reset } = useTimer(activeDuration, handleExpire)
  const progress = 1 - secondsLeft / activeDuration
  const circumference = 2 * Math.PI * 110
  const selectedSubject = subjects?.find(s => s.id === selectedSubjectId)
  const ringColor = selectedSubject ? selectedSubject.color : (mode === 'work' ? '#10b981' : '#f59e0b')

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <SubjectSelect subjects={subjects ?? []} selectedId={selectedSubjectId} onSelect={setSelectedSubjectId} />

      {/* Circular progress ring — responsive size */}
      <div className="relative flex items-center justify-center w-[min(280px,80vw)]">
        <svg viewBox="0 0 280 280" className="-rotate-90 w-full h-full">
          {/* CSS variable for track color so it follows theme */}
          <circle cx="140" cy="140" r="110" fill="none" stroke="var(--timer-track)" strokeWidth="10" />
          <circle cx="140" cy="140" r="110" fill="none"
            stroke={ringColor} strokeWidth="10" strokeLinecap="round"
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

      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Pomodoro <span className="text-slate-900 dark:text-white font-semibold">#{session}</span>
        {selectedSubject && (
          <> · <span style={{ color: selectedSubject.color }} className="font-semibold">{selectedSubject.name}</span></>
        )}
      </p>

      <div className="w-full border-t border-slate-200 dark:border-slate-700 pt-5">
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wide">Süre Ayarları</p>
        <DurationSettings workMinutes={workMinutes} breakMinutes={breakMinutes}
          onChange={(t, v) => t === 'work' ? setWorkMinutes(v) : setBreakMinutes(v)} disabled={running} />
      </div>
    </div>
  )
}
