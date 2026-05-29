import { useState, useMemo } from 'react'
import SubjectManager from '../features/subjects/SubjectManager'
import SubjectDetail from '../features/subjects/SubjectDetail'
import useSubjectNotes from '../hooks/useSubjectNotes'
import useSubjectGoals from '../hooks/useSubjectGoals'
import useSubjectVideos from '../hooks/useSubjectVideos'

export default function SubjectsPage({ subjects, onAdd, onRemove, logs }) {
  const [selectedId, setSelectedId] = useState(null)
  const { getNote, setNote }                          = useSubjectNotes()
  const { goalsFor, addGoal, toggleGoal, removeGoal } = useSubjectGoals()
  const videoOps                                      = useSubjectVideos()

  const selected = useMemo(
    () => subjects.find(s => s.id === selectedId) ?? null,
    [subjects, selectedId]
  )

  if (selected) {
    return (
      <SubjectDetail
        subject={selected}
        logs={logs}
        note={getNote(selected.id)}
        onSaveNote={text => setNote(selected.id, text)}
        goals={goalsFor(selected.id)}
        onAddGoal={text => addGoal(selected.id, text)}
        onToggleGoal={toggleGoal}
        onRemoveGoal={removeGoal}
        videoOps={videoOps}
        onBack={() => setSelectedId(null)}
      />
    )
  }

  return (
    <SubjectManager
      subjects={subjects}
      onAdd={onAdd}
      onRemove={onRemove}
      onSelect={setSelectedId}
    />
  )
}
