import TaskForm from '../features/tasks/TaskForm'
import TaskList from '../features/tasks/TaskList'

export default function TasksPage({ tasks, subjects, onAdd, onToggle, onRemove }) {
  return (
    <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Görevler</h2>
      <TaskForm subjects={subjects} onAdd={onAdd} />
      <TaskList tasks={tasks} subjects={subjects} onToggle={onToggle} onRemove={onRemove} />
    </div>
  )
}
