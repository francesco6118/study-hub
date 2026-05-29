// Visual indicator of progress within a Pomodoro cycle (e.g. ●●○○)
// done  = work sessions completed in the current cycle
// total = sessions per cycle (longBreakInterval)
export default function CycleDots({ done, total }) {
  if (total <= 1) return null
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div key={i}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i < done
              ? 'bg-emerald-500 scale-110'
              : 'bg-slate-200 dark:bg-slate-600'
          }`}
        />
      ))}
    </div>
  )
}
