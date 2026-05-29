import { useState } from 'react'
import useSubjects from './hooks/useSubjects'
import useSessions from './hooks/useSessions'
import useTasks from './hooks/useTasks'
import PomodoroPage from './pages/PomodoroPage'
import SubjectsPage from './pages/SubjectsPage'
import CalendarPage from './pages/CalendarPage'
import TasksPage from './pages/TasksPage'

function TimerIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#34d399' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  )
}

function BookIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#34d399' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function CalIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#34d399' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function TasksIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#34d399' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3 8-8" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

const TABS = [
  { id: 'pomodoro', label: 'Pomodoro' },
  { id: 'subjects', label: 'Dersler' },
  { id: 'calendar', label: 'Takvim' },
  { id: 'tasks',    label: 'Görevler' },
]

export default function App() {
  const [tab, setTab] = useState('pomodoro')
  const { subjects, addSubject, removeSubject } = useSubjects()
  const { sessions, addSession, removeSession } = useSessions()
  const { tasks, addTask, toggleTask, removeTask } = useTasks()

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="px-4 pt-5 pb-3 max-w-xl mx-auto">
        <h1 className="text-xl font-bold tracking-tight text-white">Study Hub</h1>
      </header>

      <main className="px-4 pb-24 max-w-xl mx-auto">
        {tab === 'pomodoro' && (
          <PomodoroPage subjects={subjects} />
        )}
        {tab === 'subjects' && (
          <SubjectsPage subjects={subjects} onAdd={addSubject} onRemove={removeSubject} />
        )}
        {tab === 'calendar' && (
          <CalendarPage
            sessions={sessions}
            subjects={subjects}
            onAddSession={addSession}
            onDeleteSession={removeSession}
          />
        )}
        {tab === 'tasks' && (
          <TasksPage
            tasks={tasks}
            subjects={subjects}
            onAdd={addTask}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 flex z-30">
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                active ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              {t.id === 'pomodoro' && <TimerIcon active={active} />}
              {t.id === 'subjects' && <BookIcon active={active} />}
              {t.id === 'calendar' && <CalIcon active={active} />}
              {t.id === 'tasks'    && <TasksIcon active={active} />}
              {t.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
