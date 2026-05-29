import { useState, useMemo } from 'react'
import WeeklyCalendar from './WeeklyCalendar'
import SessionForm from './SessionForm'

function getMonday(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d
}
function addDays(date, n) {
  const d = new Date(date); d.setDate(d.getDate() + n); return d
}
function formatRange(start, end) {
  const startStr = start.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })
  const endStr   = end.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })
  return `${startStr} – ${endStr}`
}

export default function CalendarView({ sessions, subjects, onAddSession, onDeleteSession }) {
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [showForm, setShowForm] = useState(false)
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])

  function handleDelete(id) {
    if (window.confirm('Bu seansı silmek istiyor musunuz?')) onDeleteSession(id)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <button onClick={() => setWeekStart(d => addDays(d, -7))}
          className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg text-lg transition-colors">‹</button>
        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          {formatRange(weekStart, addDays(weekStart, 6))}
        </span>
        <button onClick={() => setWeekStart(d => addDays(d, 7))}
          className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg text-lg transition-colors">›</button>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500 text-sm">
          Takvimi kullanmak için önce bir ders ekleyin.
        </div>
      ) : (
        <WeeklyCalendar weekDays={weekDays} sessions={sessions} subjects={subjects} onDeleteSession={handleDelete} />
      )}

      {subjects.length > 0 && (
        <button onClick={() => setShowForm(true)}
          className="fixed bottom-20 right-4 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-3xl rounded-full shadow-lg flex items-center justify-center transition-all z-40"
          title="Seans Ekle">+</button>
      )}

      {showForm && (
        <SessionForm subjects={subjects} onSave={onAddSession} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
