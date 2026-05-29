import { useState } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useSubjectNotes() {
  const [notes, setNotes] = useState(() => getItem(KEYS.SUBJECT_NOTES, {}))

  function setNote(subjectId, text) {
    setNotes(prev => {
      const next = { ...prev, [subjectId]: text }
      setItem(KEYS.SUBJECT_NOTES, next)
      return next
    })
  }

  function getNote(subjectId) {
    return notes[subjectId] ?? ''
  }

  return { getNote, setNote }
}
