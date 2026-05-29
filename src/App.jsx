import PomodoroTimer from './features/pomodoro/PomodoroTimer'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8 tracking-tight">
        Study Hub
      </h1>
      <PomodoroTimer />
    </div>
  )
}
