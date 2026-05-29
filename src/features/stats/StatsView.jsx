import { useMemo } from 'react'
import { todayLogs, thisWeekLogs, last7DaysData, bySubjectData } from '../../lib/stats'
import StatCard from './StatCard'
import DailyChart from './DailyChart'
import SubjectChart from './SubjectChart'

function sumMinutes(entries) {
  return entries.reduce((s, l) => s + l.durationMinutes, 0)
}

export default function StatsView({ logs, subjects }) {
  const todayData   = useMemo(() => todayLogs(logs),               [logs])
  const weekData    = useMemo(() => thisWeekLogs(logs),            [logs])
  const dailyData   = useMemo(() => last7DaysData(logs),           [logs])
  const subjectData = useMemo(() => bySubjectData(logs, subjects), [logs, subjects])

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-white">İstatistikler</h2>

      {logs.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-14 leading-relaxed">
          Henüz tamamlanmış Pomodoro yok.<br />
          İlk seansı bitirince grafikler burada belirecek.
        </p>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Bugün"    pomodoros={todayData.length} minutes={sumMinutes(todayData)} />
            <StatCard label="Bu Hafta" pomodoros={weekData.length}  minutes={sumMinutes(weekData)} />
          </div>

          {/* Daily chart */}
          <div className="bg-slate-800 rounded-2xl p-4">
            <p className="text-sm font-semibold text-white mb-3">Son 7 Gün</p>
            <DailyChart data={dailyData} />
          </div>

          {/* Subject chart */}
          {subjectData.length > 0 && (
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Ders Başına Süre</p>
              <SubjectChart data={subjectData} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
