function localToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function DeadlineChip({ deadline }) {
  const today = localToday()
  const label = new Date(deadline + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
  const cls =
    deadline < today  ? 'bg-red-100 dark:bg-red-900/60 text-red-500 dark:text-red-400' :
    deadline === today ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400' :
                         'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
  return <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${cls}`}>{label}</span>
}

export default function TaskItem({ task, subject, onToggle, onRemove }) {
  return (
    <li className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
      task.completed ? 'bg-slate-100/60 dark:bg-slate-800/40' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-transparent'
    }`}>
      <button onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
          task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-500 hover:border-emerald-400'
        }`}
        title={task.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}>
        {task.completed && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
      </button>

      {subject && (
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
      )}

      <span className={`flex-1 text-sm min-w-0 break-words ${
        task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
      }`}>
        {task.title}
      </span>

      {task.deadline && <DeadlineChip deadline={task.deadline} />}

      <button onClick={() => onRemove(task.id)}
        className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors text-xl leading-none shrink-0 px-1"
        title="Görevi sil">×</button>
    </li>
  )
}
