import PomodoroTimer from '../features/pomodoro/PomodoroTimer'

export default function PomodoroPage({ subjects, onSessionComplete }) {
  return <PomodoroTimer subjects={subjects} onSessionComplete={onSessionComplete} />
}
