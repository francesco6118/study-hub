import { useState } from 'react'
import { scheduleCard, previewIntervals } from '../../lib/sm2'

export default function ReviewSession({ cards, onCardUpdate, onFinish }) {
  const [index, setIndex]       = useState(0)
  const [showBack, setShowBack] = useState(false)

  if (index >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center animate-fade-up">
        <div className="text-5xl">🎉</div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bugünlük bitti!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {cards.length} kart gözden geçirildi.
          </p>
        </div>
        <button onClick={onFinish}
          className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold transition-all">
          Tamam
        </button>
      </div>
    )
  }

  const card = cards[index]
  const previews = previewIntervals(card)

  function handleRating(rating) {
    const updated = scheduleCard(card, rating)
    onCardUpdate(card.id, {
      interval:     updated.interval,
      easeFactor:   updated.easeFactor,
      repetitions:  updated.repetitions,
      dueDate:      updated.dueDate,
      lastReviewed: updated.lastReviewed,
    })
    setShowBack(false)
    setIndex(i => i + 1)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(index / cards.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
          {index + 1} / {cards.length}
        </span>
      </div>

      {/* Card */}
      <div className="min-h-44 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-3">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Soru
        </span>
        <p className="text-base font-medium text-slate-900 dark:text-white leading-relaxed flex-1">
          {card.front}
        </p>
        {showBack && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Cevap
            </span>
            {card.back ? (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{card.back}</p>
            ) : (
              <p className="text-sm italic text-slate-400 dark:text-slate-500">Arka yüz eklenmemiş</p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {!showBack ? (
        <button onClick={() => setShowBack(true)}
          className="w-full py-3 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 active:scale-95 text-white font-medium transition-all">
          Cevabı Göster
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => handleRating('hard')}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 text-red-600 dark:text-red-400 font-medium text-sm transition-all border border-red-100 dark:border-red-800/50">
            <span>Zor</span>
            <span className="text-xs opacity-50">{previews.hard}g</span>
          </button>
          <button onClick={() => handleRating('good')}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 active:scale-95 text-amber-600 dark:text-amber-400 font-medium text-sm transition-all border border-amber-100 dark:border-amber-800/50">
            <span>Orta</span>
            <span className="text-xs opacity-50">{previews.good}g</span>
          </button>
          <button onClick={() => handleRating('easy')}
            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 active:scale-95 text-emerald-600 dark:text-emerald-400 font-medium text-sm transition-all border border-emerald-100 dark:border-emerald-800/50">
            <span>Kolay</span>
            <span className="text-xs opacity-50">{previews.easy}g</span>
          </button>
        </div>
      )}
    </div>
  )
}
