import { useState } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'
import { createCard, isDue } from '../lib/sm2'

export default function useFlashcards() {
  const [cards, setCards] = useState(() => getItem(KEYS.FLASHCARDS, []))

  function save(updated) {
    setCards(updated)
    setItem(KEYS.FLASHCARDS, updated)
  }

  function addCard(subjectId, front, back) {
    save([...cards, createCard(subjectId, front, back)])
  }

  function updateCard(id, changes) {
    save(cards.map(c => c.id === id ? { ...c, ...changes } : c))
  }

  function removeCard(id) {
    save(cards.filter(c => c.id !== id))
  }

  function cardsFor(subjectId) {
    return cards.filter(c => c.subjectId === subjectId)
  }

  const dueCards = cards.filter(c => isDue(c.dueDate))

  return { cards, dueCards, addCard, updateCard, removeCard, cardsFor }
}
