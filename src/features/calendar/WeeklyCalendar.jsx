const START_HOUR = 6
const END_HOUR = 23
const HOUR_HEIGHT = 60

const DAY_NAMES = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

function toDateStr(date) { return date.toISOString().slice(0, 10) }

export default function WeeklyCalendar({ weekDays, sessions, subjects, onDeleteSession }) {
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
  const totalHeight = hours.length * HOUR_HEIGHT
  const todayStr = toDateStr(new Date())

  return (
    <div className="overflow-x-auto -mx-4">
      <div style={{ minWidth: '380px' }} className="px-4">
        {/* Day headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-900 z-10">
          <div className="w-10 shrink-0" />
          {weekDays.map(day => {
            const isToday = toDateStr(day) === todayStr
            return (
              <div key={toDateStr(day)} className="flex-1 text-center py-2">
                <div className="text-xs text-slate-400 dark:text-slate-500">{DAY_NAMES[day.getDay()]}</div>
                <div className={`text-sm font-bold mx-auto w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-emerald-500 text-white' : 'text-slate-900 dark:text-white'
                }`}>
                  {day.getDate()}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time grid */}
        <div className="flex" style={{ height: totalHeight }}>
          <div className="w-10 shrink-0 relative">
            {hours.map((h, i) => (
              <div key={h} style={{ top: i * HOUR_HEIGHT - 8 }} className="absolute w-full pr-1">
                <span className="text-xs text-slate-300 dark:text-slate-600">{h}:00</span>
              </div>
            ))}
          </div>

          {weekDays.map(day => {
            const dayStr = toDateStr(day)
            const daySessions = sessions.filter(s => s.date === dayStr)
            return (
              <div key={dayStr} className="flex-1 relative border-l border-slate-100 dark:border-slate-800">
                {hours.map((_, i) => (
                  <div key={i} style={{ top: i * HOUR_HEIGHT }}
                    className="absolute w-full border-t border-slate-100 dark:border-slate-800 pointer-events-none" />
                ))}
                {daySessions.map(session => {
                  const subject = subjects.find(s => s.id === session.subjectId)
                  const [h, m] = session.startTime.split(':').map(Number)
                  const top = (h - START_HOUR) * HOUR_HEIGHT + (m / 60) * HOUR_HEIGHT
                  const height = Math.max((session.durationMinutes / 60) * HOUR_HEIGHT, 22)
                  return (
                    <button key={session.id} onClick={() => onDeleteSession(session.id)}
                      style={{ top, height, backgroundColor: subject?.color ?? '#3b82f6' }}
                      className="absolute left-0.5 right-0.5 rounded text-left px-1 py-0.5 overflow-hidden opacity-90 hover:opacity-100 active:opacity-75 transition-opacity"
                      title="Seansı sil">
                      <div className="text-xs font-semibold text-white truncate leading-tight">
                        {subject?.name ?? 'Ders'}
                      </div>
                      {height > 32 && (
                        <div className="text-xs text-white/70 leading-tight">{session.startTime}</div>
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
