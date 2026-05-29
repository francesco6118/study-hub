import { useMemo } from 'react'
import SubjectNotes from './SubjectNotes'
import SubjectGoals from './SubjectGoals'
import { formatMinutes } from '../../lib/stats'

function StatMini({ value, label }) {
  return (
    <div className="flex-1 bg-slate-700 rounded-xl px-4 py-3 text-center">
      <div className="text-2xl font-bold text-white leading-tight">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}

export default function SubjectDetail({
  subject, logs, note, onSaveNote,
  goals, onAddGoal, onToggleGoal, onRemoveGoal, onBack,
}) {
  const subjectLogs = useMemo(
    () => logs.filter(l => l.subjectId === subject.id),
    [logs, subject.id]
  )
  const totalMinutes = subjectLogs.reduce((s, l) => s + l.durationMinutes, 0)

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm shrink-0"
        >
          ‹ Geri
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
          <h2 className="text-lg font-bold text-white truncate">{subject.name}</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <StatMini value={subjectLogs.length} label="pomodoro" />
        <StatMini value={formatMinutes(totalMinutes)} label="toplam süre" />
      </div>

      {/* Notes */}
      <div className="bg-slate-800 rounded-2xl p-4">
        {/* key forces textarea to reset when switching subjects */}
        <SubjectNotes key={subject.id} initialText={note} onSave={onSaveNote} />
      </div>

      {/* Goals */}
      <div className="bg-slate-800 rounded-2xl p-4">
        <SubjectGoals
          goals={goals}
          onAdd={onAddGoal}
          onToggle={onToggleGoal}
          onRemove={onRemoveGoal}
        />
      </div>
    </div>
  )
}
