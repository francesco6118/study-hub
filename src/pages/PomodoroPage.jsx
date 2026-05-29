import { useMemo } from 'react'
import PomodoroTimer from '../features/pomodoro/PomodoroTimer'
import StreakPanel from '../features/streak/StreakPanel'
import Toast from '../features/streak/Toast'
import useDailyGoal from '../hooks/useDailyGoal'
import useMotivation from '../hooks/useMotivation'
import { todayLogs } from '../lib/stats'

export default function PomodoroPage({ subjects, onSessionComplete, logs }) {
  const { dailyGoal, setDailyGoal }                       = useDailyGoal()
  const { currentStreak, bestStreak, toast, dismissToast } = useMotivation(logs, dailyGoal)
  const todayCount = useMemo(() => todayLogs(logs).length, [logs])

  return (
    <div className="flex flex-col gap-5 w-full w-full">
      <Toast toast={toast} onDismiss={dismissToast} />

      <StreakPanel
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        todayCount={todayCount}
        dailyGoal={dailyGoal}
        onGoalChange={setDailyGoal}
      />

      <PomodoroTimer subjects={subjects} onSessionComplete={onSessionComplete} />
    </div>
  )
}
