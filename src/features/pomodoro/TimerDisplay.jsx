export default function TimerDisplay({ secondsLeft, mode }) {
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
        {mode === 'work' ? 'Çalışma' : 'Mola'}
      </span>
      <span className="text-8xl sm:text-9xl font-mono font-bold tabular-nums leading-none text-white">
        {minutes}:{seconds}
      </span>
    </div>
  )
}
