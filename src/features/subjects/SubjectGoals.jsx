import { useState } from 'react'

function Checkmark() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="1.5,5 4,7.5 8.5,2.5" />
    </svg>
  )
}

function GoalItem({ goal, onToggle, onRemove }) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${goal.completed ? 'bg-slate-100/60 dark:bg-slate-700/40' : 'bg-slate-100 dark:bg-slate-700'}`}>
      <button onClick={() => onToggle(goal.id)}
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
          goal.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-500 hover:border-emerald-400'
        }`}>
        {goal.completed && <Checkmark />}
      </button>
      <span className={`flex-1 text-sm min-w-0 ${goal.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
        {goal.text}
      </span>
      <button onClick={() => onRemove(goal.id)}
        className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors text-xl leading-none shrink-0 px-1">×</button>
    </div>
  )
}

export default function SubjectGoals({ goals, onAdd, onToggle, onRemove }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  const active    = goals.filter(g => !g.completed)
  const completed = goals.filter(g =>  g.completed)

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Hedefler</span>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Yeni hedef ekle..." maxLength={100}
          className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400" />
        <button type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors shrink-0">Ekle</button>
      </form>

      {goals.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-600 text-sm py-1">Henüz hedef eklenmedi.</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {active.map(g => <GoalItem key={g.id} goal={g} onToggle={onToggle} onRemove={onRemove} />)}
          {completed.length > 0 && (
            <>
              <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wide pt-1">Tamamlananlar ({completed.length})</p>
              {completed.map(g => <GoalItem key={g.id} goal={g} onToggle={onToggle} onRemove={onRemove} />)}
            </>
          )}
        </div>
      )}
    </div>
  )
}
