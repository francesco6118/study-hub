import { useState } from 'react'

export default function SubjectNotes({ initialText, onSave }) {
  const [text, setText] = useState(initialText)
  const isDirty = text !== initialText

  function save() { if (isDirty) onSave(text) }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Notlar</span>
        {isDirty && (
          <button onClick={save}
            className="text-xs text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">
            Kaydet
          </button>
        )}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} onBlur={save}
        placeholder="Bu ders için notlarını buraya yaz..." rows={5}
        className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400 resize-none leading-relaxed" />
    </div>
  )
}
