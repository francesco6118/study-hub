import { useState } from 'react'

export default function TaskForm({ subjects, onAdd }) {
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [deadline, setDeadline] = useState('')
  const [expanded, setExpanded] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, subjectId: subjectId || null, deadline: deadline || null })
    setTitle('')
    setSubjectId('')
    setDeadline('')
    setExpanded(false)
  }

  const fieldClass =
    'flex-1 min-w-0 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 [color-scheme:dark]'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-800 rounded-2xl p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Yeni görev ekle..."
          maxLength={120}
          className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors shrink-0"
        >
          Ekle
        </button>
      </div>

      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="text-xs text-slate-500 hover:text-slate-400 transition-colors text-left"
      >
        {expanded ? '▲ Gizle' : '▼ Ders & son tarih ekle (isteğe bağlı)'}
      </button>

      {expanded && (
        <div className="flex gap-2 flex-wrap">
          {subjects.length > 0 && (
            <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className={fieldClass}>
              <option value="">— Ders yok —</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          )}
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className={fieldClass}
          />
        </div>
      )}
    </form>
  )
}
