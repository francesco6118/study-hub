import { useMemo } from 'react'
import SubjectNotes from './SubjectNotes'
import SubjectGoals from './SubjectGoals'
import SubjectVideos from './SubjectVideos'
import FlashcardList from '../flashcards/FlashcardList'
import { formatMinutes } from '../../lib/stats'
import { todayStr } from '../../lib/sm2'

function StatMini({ value, label }) {
  return (
    <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-3 text-center">
      <div className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}

export default function SubjectDetail({
  subject, logs, note, onSaveNote,
  goals, onAddGoal, onToggleGoal, onRemoveGoal,
  videoOps, flashcardOps, onBack,
}) {
  const subjectLogs = useMemo(() => logs.filter(l => l.subjectId === subject.id), [logs, subject.id])
  const totalMinutes = subjectLogs.reduce((s, l) => s + l.durationMinutes, 0)
  const { videosFor, addVideo, updateVideo, removeVideo, toggleVideo, moveVideo } = videoOps
  const subjectVideos = videosFor(subject.id)
  const { cardsFor, addCard, updateCard, removeCard } = flashcardOps
  const subjectCards = cardsFor(subject.id)
  const dueCardCount = subjectCards.filter(c => c.dueDate <= todayStr()).length

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center gap-3">
        <button onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-sm shrink-0">
          ‹ Geri
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">{subject.name}</h2>
        </div>
      </div>

      <div className="flex gap-3">
        <StatMini value={subjectLogs.length} label="pomodoro" />
        <StatMini value={formatMinutes(totalMinutes)} label="toplam süre" />
      </div>

      {subjectCards.length > 0 && (
        <div className="flex gap-3">
          <StatMini value={subjectCards.length} label="toplam kart" />
          <StatMini value={dueCardCount} label="bugün hazır" />
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
        <SubjectNotes key={subject.id} initialText={note} onSave={onSaveNote} />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
        <SubjectGoals goals={goals} onAdd={onAddGoal} onToggle={onToggleGoal} onRemove={onRemoveGoal} />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
        <SubjectVideos
          videos={subjectVideos}
          onAdd={(title, url, mins) => addVideo(subject.id, title, url, mins)}
          onUpdate={updateVideo} onRemove={removeVideo}
          onToggle={toggleVideo} onMove={moveVideo}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
        <FlashcardList
          subjectId={subject.id}
          cards={subjectCards}
          onAdd={addCard}
          onUpdate={updateCard}
          onRemove={removeCard}
        />
      </div>
    </div>
  )
}
