import TaskItem from './TaskItem'

export default function TaskList({ tasks, subjects, onToggle, onRemove }) {
  const active = tasks.filter(t => !t.completed)
  const completed = tasks.filter(t => t.completed)

  function getSubject(id) {
    return subjects.find(s => s.id === id) ?? null
  }

  if (tasks.length === 0) {
    return <p className="text-slate-500 text-sm text-center py-10">Henüz görev eklenmedi.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {active.length > 0 && (
        <ul className="flex flex-col gap-2">
          {active.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              subject={getSubject(task.subjectId)}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      {completed.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-600 uppercase tracking-wide px-1">
            Tamamlananlar ({completed.length})
          </p>
          <ul className="flex flex-col gap-2">
            {completed.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                subject={getSubject(task.subjectId)}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
