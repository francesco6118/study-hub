import { useState } from 'react'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export default function SessionForm({ subjects, onSave, onClose }) {
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '')
  const [date, setDate] = useState(todayStr)
  const [startTime, setStartTime] = useState('09:00')
  const [durationMinutes, setDurationMinutes] = useState(60)

  function handleSubmit(e) {
    e.preventDefault()
    if (!subjectId || !date || !startTime || durationMinutes < 5) return
    onSave({ subjectId, date, startTime, durationMinutes: Number(durationMinutes) })
    onClose()
  }

  const fieldClass =
    'bg-slate-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 [color-scheme:dark]'

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-slate-800 rounded-2xl w-full max-w-sm p-5 flex flex-col gap-4">
        <h3 className="text-white font-bold text-base">Seans Ekle</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Ders</label>
            <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className={fieldClass}>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Tarih</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={fieldClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Başlangıç Saati</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className={fieldClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400">Süre (dakika)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={e => setDurationMinutes(e.target.value)}
              min={5}
              max={480}
              className={fieldClass}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg py-2.5 text-sm transition-colors">
              İptal
            </button>
            <button type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
