import { useState } from 'react'
import Select from '../../components/Select'

export default function TaskForm({ subjects, onAdd }) {
  const [title, setTitle]         = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [deadline, setDeadline]   = useState('')
  const [expanded, setExpanded]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, subjectId: subjectId || null, deadline: deadline || null })
    setTitle(''); setSubjectId(''); setDeadline(''); setExpanded(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
      <div className="flex gap-2">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Yeni görev ekle..." maxLength={120}
          className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400 transition-colors" />
        <button type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-semibold rounded-xl px-4 py-2 text-sm transition-all shrink-0">
          Ekle
        </button>
      </div>

      <button type="button" onClick={() => setExpanded(v => !v)}
        className="text-xs text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors text-left">
        {expanded ? '▲ Gizle' : '▼ Ders & son tarih ekle (isteğe bağlı)'}
      </button>

      {expanded && (
        <div className="flex gap-2 flex-wrap pt-1">
          {subjects.length > 0 && (
            <div className="flex-1 min-w-0">
              <Select value={subjectId} onChange={e => setSubjectId(e.target.value)}>
                <option value="">— Ders yok —</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
            </div>
          )}
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
            className="flex-1 min-w-0 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
      )}
    </form>
  )
}
