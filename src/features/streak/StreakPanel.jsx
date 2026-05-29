export default function StreakPanel({ currentStreak, bestStreak, todayCount, dailyGoal, onGoalChange }) {
  const pct = Math.min(1, todayCount / dailyGoal)
  const goalReached = todayCount >= dailyGoal

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 flex flex-col gap-3 border border-slate-100 dark:border-transparent">
      {/* Streak + record */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">Seri</span>
          <span className={`text-2xl font-bold leading-tight ${currentStreak > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}>
            {currentStreak}
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">gün</span>
          </span>
        </div>
        <div className="w-px h-10 bg-slate-100 dark:bg-slate-700 mx-2" />
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">En uzun</span>
          <span className={`text-2xl font-bold leading-tight ${bestStreak > 0 ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`}>
            {bestStreak}
            <span className="text-sm font-normal text-slate-400 dark:text-slate-500 ml-1">gün</span>
          </span>
        </div>
      </div>

      {/* Daily goal */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${goalReached ? 'text-emerald-500' : 'text-slate-500 dark:text-slate-400'}`}>
            Bugün: {todayCount} / {dailyGoal} pomodoro{goalReached ? ' — Hedefe ulaştın!' : ''}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-0.5">Hedef:</span>
            <button onClick={() => onGoalChange(dailyGoal - 1)}
              className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-bold active:scale-95">−</button>
            <span className="text-sm font-bold text-slate-900 dark:text-white w-6 text-center tabular-nums">{dailyGoal}</span>
            <button onClick={() => onGoalChange(dailyGoal + 1)}
              className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-bold active:scale-95">+</button>
          </div>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct * 100}%`, backgroundColor: goalReached ? '#10b981' : '#f59e0b' }} />
        </div>
      </div>
    </div>
  )
}
