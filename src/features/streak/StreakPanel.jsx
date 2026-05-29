export default function StreakPanel({ currentStreak, bestStreak, todayCount, dailyGoal, onGoalChange }) {
  const pct = Math.min(1, todayCount / dailyGoal)
  const goalReached = todayCount >= dailyGoal

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 flex flex-col gap-3 border border-slate-100 dark:border-transparent">
      {/* Streak + record */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Seri</span>
          {currentStreak > 0 ? (
            <span className="text-2xl font-bold text-amber-500 dark:text-amber-400 leading-tight">
              {currentStreak} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">gün</span>
            </span>
          ) : (
            <span className="text-2xl font-bold text-slate-300 dark:text-slate-600 leading-tight">—</span>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">En uzun</span>
          {bestStreak > 0 ? (
            <span className="text-lg font-semibold text-slate-600 dark:text-slate-300 leading-tight">
              {bestStreak} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">gün</span>
            </span>
          ) : (
            <span className="text-lg font-semibold text-slate-300 dark:text-slate-600 leading-tight">—</span>
          )}
        </div>
      </div>

      {/* Daily goal */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${goalReached ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>
            Bugün: {todayCount} / {dailyGoal} pomodoro{goalReached ? ' — Hedefe ulaştın!' : ''}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 dark:text-slate-500">Hedef:</span>
            <button onClick={() => onGoalChange(dailyGoal - 1)}
              className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded bg-slate-100 dark:bg-slate-700 text-sm">−</button>
            <span className="text-sm font-bold text-slate-900 dark:text-white w-4 text-center">{dailyGoal}</span>
            <button onClick={() => onGoalChange(dailyGoal + 1)}
              className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded bg-slate-100 dark:bg-slate-700 text-sm">+</button>
          </div>
        </div>
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct * 100}%`, backgroundColor: goalReached ? '#10b981' : '#f59e0b' }} />
        </div>
      </div>
    </div>
  )
}
