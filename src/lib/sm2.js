const MIN_EASE = 1.3
const MAX_EASE = 4.0

export function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function isDue(dueDate) {
  return dueDate <= todayStr()
}

export function createCard(subjectId, front, back = '') {
  return {
    id: crypto.randomUUID(),
    subjectId,
    front,
    back,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    dueDate: todayStr(),
    lastReviewed: null,
  }
}

// Returns the next interval in days for each rating without mutating the card.
export function previewIntervals(card) {
  const { interval, easeFactor, repetitions } = card
  const hard = repetitions < 2 ? 1 : Math.max(1, Math.round(interval * 1.2))
  let good, easy
  if (repetitions === 0)      { good = 1;  easy = 4 }
  else if (repetitions === 1) { good = 4;  easy = 7 }
  else {
    good = Math.max(1, Math.round(interval * easeFactor))
    easy = Math.max(1, Math.round(interval * easeFactor * 1.3))
  }
  return { hard, good, easy }
}

// rating: 'hard' | 'good' | 'easy'
export function scheduleCard(card, rating) {
  let { interval, easeFactor, repetitions } = card

  if (rating === 'hard') {
    if (repetitions < 2) {
      interval = 1
      // repetitions stays — card must be seen again before graduating
    } else {
      interval = Math.max(1, Math.round(interval * 1.2))
      easeFactor = Math.max(MIN_EASE, easeFactor - 0.15)
    }
  } else if (rating === 'good') {
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 4
    else                        interval = Math.max(1, Math.round(interval * easeFactor))
    repetitions += 1
  } else { // easy
    if (repetitions === 0)      interval = 4
    else if (repetitions === 1) interval = 7
    else                        interval = Math.max(1, Math.round(interval * easeFactor * 1.3))
    easeFactor = Math.min(MAX_EASE, easeFactor + 0.15)
    repetitions += 1
  }

  return {
    ...card,
    interval,
    easeFactor: parseFloat(easeFactor.toFixed(4)),
    repetitions,
    dueDate: addDays(todayStr(), interval),
    lastReviewed: todayStr(),
  }
}
