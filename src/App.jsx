import { useState } from 'react'
import useSubjects from './hooks/useSubjects'
import useSessions from './hooks/useSessions'
import useTasks from './hooks/useTasks'
import usePomodoroLogs from './hooks/usePomodoroLogs'
import useTheme from './hooks/useTheme'
import PomodoroPage from './pages/PomodoroPage'
import SubjectsPage from './pages/SubjectsPage'
import CalendarPage from './pages/CalendarPage'
import TasksPage from './pages/TasksPage'
import StatsPage from './pages/StatsPage'

/* ── Tab / icon definitions ───────────────────────────────────────── */
const TABS = [
  { id: 'pomodoro', label: 'Pomodoro'   },
  { id: 'subjects', label: 'Dersler'    },
  { id: 'calendar', label: 'Takvim'     },
  { id: 'tasks',    label: 'Görevler'   },
  { id: 'stats',    label: 'İstatistik' },
]

function TimerIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
    </svg>
  )
}
function BookIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}
function CalIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function TasksIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3 8-8" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}
function StatsIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#10b981' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const ICONS = {
  pomodoro: TimerIcon,
  subjects: BookIcon,
  calendar: CalIcon,
  tasks:    TasksIcon,
  stats:    StatsIcon,
}

/* ── App ──────────────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState('pomodoro')
  const { subjects, addSubject, removeSubject }    = useSubjects()
  const { sessions, addSession, removeSession }    = useSessions()
  const { tasks, addTask, toggleTask, removeTask } = useTasks()
  const { logs, addLog }                           = usePomodoroLogs()
  const { theme, toggle }                          = useTheme()

  function ThemeButton() {
    return (
      <button onClick={toggle}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        title={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    )
  }

  const pageContent = (
    <>
      {tab === 'pomodoro' && <PomodoroPage subjects={subjects} onSessionComplete={addLog} logs={logs} />}
      {tab === 'subjects' && <SubjectsPage subjects={subjects} onAdd={addSubject} onRemove={removeSubject} logs={logs} />}
      {tab === 'calendar' && <CalendarPage sessions={sessions} subjects={subjects} onAddSession={addSession} onDeleteSession={removeSession} />}
      {tab === 'tasks'    && <TasksPage tasks={tasks} subjects={subjects} onAdd={addTask} onToggle={toggleTask} onRemove={removeTask} />}
      {tab === 'stats'    && <StatsPage logs={logs} subjects={subjects} />}
    </>
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors lg:flex">

      {/* ── Desktop left sidebar ── */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-slate-200 dark:border-slate-800 min-h-screen sticky top-0">
        <div className="px-4 py-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-base font-bold tracking-tight">Study Hub</h1>
          <ThemeButton />
        </div>
        <nav className="flex flex-col gap-0.5 p-3 flex-1">
          {TABS.map(t => {
            const active = tab === t.id
            const Icon = ICONS[t.id]
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white active:scale-95'
                }`}>
                <span className={active ? '' : 'group-hover:scale-110 transition-transform'}>
                  <Icon active={active} />
                </span>
                {t.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ── Right content area ── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Mobile header */}
        <header className="lg:hidden px-4 pt-5 pb-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Study Hub</h1>
          <button onClick={toggle}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            title={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* Main content */}
        <main className="px-4 lg:px-10 pb-24 lg:pb-10 pt-0 lg:pt-8 flex-1">
          <div className="max-w-sm lg:max-w-xl mx-auto lg:mx-0">
            {pageContent}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex z-30"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {TABS.map(t => {
            const active = tab === t.id
            const Icon = ICONS[t.id]
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors ${
                  active ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'
                }`}>
                <Icon active={active} />
                {t.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
