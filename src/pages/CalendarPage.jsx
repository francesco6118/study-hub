import CalendarView from '../features/calendar/CalendarView'

export default function CalendarPage({ sessions, subjects, onAddSession, onDeleteSession }) {
  return (
    <CalendarView
      sessions={sessions}
      subjects={subjects}
      onAddSession={onAddSession}
      onDeleteSession={onDeleteSession}
    />
  )
}
