import { useState, useCallback, useEffect, useRef } from 'react'
import useTimer from '../../hooks/useTimer'
import usePomodoroSettings from '../../hooks/usePomodoroSettings'
import { playAlarm, requestNotificationPermission, showNotification } from '../../lib/audio'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import DurationSettings from './DurationSettings'
import SubjectSelect from './SubjectSelect'
import CycleDots from './CycleDots'
import SoundSettings from './SoundSettings'

const RING = { work: '#10b981', break: '#f59e0b', longBreak: '#8b5cf6' }

export default function PomodoroTimer({ subjects, onSessionComplete }) {
  const { longBreakMinutes, longBreakInterval, autoStart, soundEnabled, soundVolume, update } =
    usePomodoroSettings()

  const [workMinutes, setWorkMinutes]   = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [mode, setMode]                 = useState('work') // 'work'|'break'|'longBreak'
  const [cycleCount, setCycleCount]     = useState(0)      // work sessions done this cycle
  const [session, setSession]           = useState(1)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)

  // Stable refs: settings + pending flags read inside callbacks / async effects
  const onSessionCompleteRef   = useRef(onSessionComplete)
  const settingsRef            = useRef({ autoStart, soundEnabled, soundVolume, longBreakInterval })
  const pendingAutoStartRef    = useRef(false)

  useEffect(() => { onSessionCompleteRef.current = onSessionComplete }, [onSessionComplete])
  useEffect(() => {
    settingsRef.current = { autoStart, soundEnabled, soundVolume, longBreakInterval }
  }, [autoStart, soundEnabled, soundVolume, longBreakInterval])

  useEffect(() => { requestNotificationPermission() }, [])
  useEffect(() => () => { document.title = 'Study Hub' }, []) // restore on unmount

  /* ── Core expire logic ─────────────────────────────────────────── */
  const handleExpire = useCallback(() => {
    const { soundEnabled: se, soundVolume: sv, longBreakInterval: lbi, autoStart: as } = settingsRef.current
    if (se) playAlarm(sv)

    if (mode === 'work') {
      onSessionCompleteRef.current?.({
        subjectId: selectedSubjectId,
        durationMinutes: workMinutes,
        completedAt: new Date().toISOString(),
      })
      const next = cycleCount + 1
      if (next >= lbi) {
        showNotification('Uzun mola!', `${lbi} pomodoro tamamlandı. İyi dinlenmeler!`)
        setCycleCount(0)
        setMode('longBreak')
      } else {
        showNotification('Mola zamanı!', `${workMinutes} dk çalışma bitti.`)
        setCycleCount(next)
        setMode('break')
      }
    } else {
      showNotification('Mola bitti!', 'Yeni bir pomodoro başlıyor.')
      setMode('work')
      setSession(s => s + 1)
    }

    if (as) pendingAutoStartRef.current = true
  }, [mode, workMinutes, selectedSubjectId, cycleCount])

  const activeDuration =
    mode === 'longBreak' ? longBreakMinutes * 60 :
    mode === 'break'     ? breakMinutes * 60 :
    workMinutes * 60

  const { secondsLeft, running, start, pause, reset } = useTimer(activeDuration, handleExpire)

  /* ── Auto-start: fires after mode change causes timer reset ─────── */
  useEffect(() => {
    if (!pendingAutoStartRef.current) return
    pendingAutoStartRef.current = false
    const id = setTimeout(start, 300)
    return () => clearTimeout(id)
  }, [mode, start])

  /* ── Live tab title ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!running) { document.title = 'Study Hub'; return }
    const mm  = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const ss  = String(secondsLeft % 60).padStart(2, '0')
    const lbl = mode === 'work' ? 'Çalışma' : mode === 'longBreak' ? 'Uzun Mola' : 'Mola'
    document.title = `${mm}:${ss} – ${lbl} | Study Hub`
  }, [running, secondsLeft, mode])

  /* ── Space key: start / pause ───────────────────────────────────── */
  useEffect(() => {
    function onKey(e) {
      if (e.code !== 'Space') return
      const tag = (document.activeElement?.tagName ?? '').toUpperCase()
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if (document.activeElement?.isContentEditable) return
      e.preventDefault()
      running ? pause() : start()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [running, start, pause])

  function handleDurationChange(type, val) {
    if      (type === 'work')      setWorkMinutes(val)
    else if (type === 'break')     setBreakMinutes(val)
    else if (type === 'longBreak') update({ longBreakMinutes: val })
    else if (type === 'interval')  update({ longBreakInterval: val })
  }

  const progress       = 1 - secondsLeft / activeDuration
  const circumference  = 2 * Math.PI * 110
  const selectedSubject = subjects?.find(s => s.id === selectedSubjectId)
  const ringColor      = selectedSubject?.color ?? RING[mode]
  const seansKalan     = longBreakInterval - cycleCount

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <SubjectSelect subjects={subjects ?? []} selectedId={selectedSubjectId} onSelect={setSelectedSubjectId} />

      {/* Cycle dots + hint */}
      <div className="flex flex-col items-center gap-1.5">
        <CycleDots done={cycleCount} total={longBreakInterval} />
        {mode === 'work' && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {seansKalan === 1 ? 'Son pomodoro! Uzun mola geliyor.' : `Uzun molaya ${seansKalan} seans kaldı`}
          </span>
        )}
      </div>

      {/* Progress ring */}
      <div className="relative flex items-center justify-center w-[min(280px,80vw)]">
        <svg viewBox="0 0 280 280" className="-rotate-90 w-full h-full">
          <circle cx="140" cy="140" r="110" fill="none" stroke="var(--timer-track)" strokeWidth="10" />
          <circle cx="140" cy="140" r="110" fill="none"
            stroke={ringColor} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="timer-ring-progress"
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

      {/* Settings */}
      <div className="w-full border-t border-slate-200 dark:border-slate-700 pt-5 flex flex-col gap-4">
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Ayarlar</p>

        <DurationSettings
          workMinutes={workMinutes} breakMinutes={breakMinutes}
          longBreakMinutes={longBreakMinutes} longBreakInterval={longBreakInterval}
          onChange={handleDurationChange} disabled={running}
        />

        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Otomatik başlatma</span>
          <button
            onClick={() => update({ autoStart: !autoStart })}
            role="switch" aria-checked={autoStart}
            className={`relative w-9 h-5 rounded-full transition-colors ${autoStart ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-600'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoStart ? 'translate-x-4' : ''}`} />
          </button>
        </div>

        <SoundSettings enabled={soundEnabled} volume={soundVolume} onUpdate={update} />
      </div>
    </div>
  )
}
