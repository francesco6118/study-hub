import { useState } from 'react'

const COLORS = [
  { label: 'Kırmızı',   value: '#ef4444' },
  { label: 'Turuncu',   value: '#f97316' },
  { label: 'Sarı',      value: '#eab308' },
  { label: 'Yeşil',     value: '#22c55e' },
  { label: 'Mavi',      value: '#3b82f6' },
  { label: 'Mor',       value: '#a855f7' },
  { label: 'Pembe',     value: '#ec4899' },
  { label: 'Camgöbeği', value: '#06b6d4' },
]

export default function SubjectManager({ subjects, onAdd, onRemove, onSelect }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[4].value)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed, color)
    setName('')
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Derslerim</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="Ders adı (örn. Matematik)" maxLength={40}
          className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400" />
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button key={c.value} type="button" onClick={() => setColor(c.value)}
              style={{ backgroundColor: c.value }}
              className={`w-8 h-8 rounded-full transition-transform ${
                color === c.value
                  ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-white dark:ring-offset-slate-800'
                  : 'hover:scale-110'
              }`} title={c.label} />
          ))}
        </div>
        <button type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors">
          Ders Ekle
        </button>
      </form>

      {subjects.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-4">Henüz ders eklenmedi.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {subjects.map(subject => (
            <li key={subject.id} className="flex items-center bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-transparent">
              <button onClick={() => onSelect(subject.id)}
                className="flex items-center gap-3 flex-1 px-4 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
                <span className="text-slate-900 dark:text-white flex-1 text-sm font-medium">{subject.name}</span>
                <span className="text-slate-300 dark:text-slate-600 text-lg leading-none">›</span>
              </button>
              <button onClick={() => onRemove(subject.id)}
                className="px-4 py-3.5 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors text-xl leading-none" title="Dersi sil">
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
