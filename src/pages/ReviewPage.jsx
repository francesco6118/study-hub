import { useState } from 'react'
import ReviewSession from '../features/flashcards/ReviewSession'
import { todayStr } from '../lib/sm2'

function SubjectRow({ subject, dueCount, totalCount }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
        <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{subject.name}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{totalCount} kart</span>
      </div>
      {dueCount > 0 && (
        <span className="ml-2 shrink-0 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
          {dueCount} hazır
        </span>
      )}
    </div>
  )
}

export default function ReviewPage({ cards, subjects, onCardUpdate }) {
  const [sessionCards, setSessionCards] = useState(null)
  const today = todayStr()
  const dueCards = cards.filter(c => c.dueDate <= today)

  if (sessionCards !== null) {
    return (
      <div className="flex flex-col gap-5">
        <button
          onClick={() => setSessionCards(null)}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-sm self-start">
          ‹ Geri
        </button>
        <ReviewSession
          cards={sessionCards}
          onCardUpdate={onCardUpdate}
          onFinish={() => setSessionCards(null)}
        />
      </div>
    )
  }

  const subjectsWithCards = subjects.filter(s => cards.some(c => c.subjectId === s.id))
  const totalCards = cards.length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tekrar</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Aralıklı tekrar ile kalıcı öğren
        </p>
      </div>

      {/* Hero card */}
      <div className={`rounded-2xl p-6 text-center ${
        dueCards.length > 0
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50'
          : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
      }`}>
        {dueCards.length > 0 ? (
          <>
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
              {dueCards.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-5">
              kart tekrar bekliyor
            </div>
            <button
              onClick={() => setSessionCards([...dueCards])}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold transition-all">
              Tekrara Başla
            </button>
          </>
        ) : totalCards > 0 ? (
          <>
            <div className="text-3xl mb-2">✓</div>
            <div className="text-base font-semibold text-slate-700 dark:text-slate-300">
              Bugünlük her şey tamam!
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tüm kartlar gözden geçirildi.
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl mb-2">📚</div>
            <div className="text-base font-semibold text-slate-700 dark:text-slate-300">
              Henüz kart yok
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Derslerine gidip tekrar kartı ekle.
            </div>
          </>
        )}
      </div>

      {/* Subject breakdown */}
      {subjectsWithCards.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-transparent">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
            Ders Bazlı
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {subjectsWithCards.map(s => {
              const sc = cards.filter(c => c.subjectId === s.id)
              const due = sc.filter(c => c.dueDate <= today).length
              return (
                <SubjectRow key={s.id} subject={s} dueCount={due} totalCount={sc.length} />
              )
            })}
          </div>
        </div>
      )}

      {totalCards > 0 && (
        <p className="text-xs text-center text-slate-400 dark:text-slate-500">
          Toplam {totalCards} kart
        </p>
      )}
    </div>
  )
}
