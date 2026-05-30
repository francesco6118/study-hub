import { useState } from 'react'
import { todayStr } from '../../lib/sm2'

function formatDue(dueDate) {
  const today = todayStr()
  if (dueDate <= today) return 'Bugün hazır'
  const diff = Math.round(
    (new Date(dueDate + 'T12:00:00') - new Date(today + 'T12:00:00')) / 86400000
  )
  if (diff === 1) return 'Yarın'
  return `${diff} gün sonra`
}

function CardForm({ initial, onSave, onCancel }) {
  const [front, setFront] = useState(initial?.front ?? '')
  const [back, setBack]   = useState(initial?.back  ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!front.trim()) return
    onSave(front.trim(), back.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={front}
        onChange={e => setFront(e.target.value)}
        placeholder="Soru / ön yüz *"
        rows={2}
        autoFocus
        className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <textarea
        value={back}
        onChange={e => setBack(e.target.value)}
        placeholder="Cevap / arka yüz (isteğe bağlı)"
        rows={2}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex gap-2">
        <button type="submit"
          className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
          Kaydet
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors">
          İptal
        </button>
      </div>
    </form>
  )
}

export default function FlashcardList({ subjectId, cards, onAdd, onUpdate, onRemove }) {
  const [adding, setAdding]     = useState(false)
  const [editingId, setEditingId] = useState(null)

  const subjectCards = cards.filter(c => c.subjectId === subjectId)
  const dueCount = subjectCards.filter(c => c.dueDate <= todayStr()).length

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Tekrar Kartları
          </h3>
          {dueCount > 0 && (
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
              {dueCount} hazır
            </span>
          )}
        </div>
        <button
          onClick={() => { setAdding(v => !v); setEditingId(null) }}
          className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-colors">
          + Kart Ekle
        </button>
      </div>

      {adding && (
        <div className="mb-3">
          <CardForm
            onSave={(front, back) => { onAdd(subjectId, front, back); setAdding(false) }}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {subjectCards.length === 0 && !adding && (
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
          Henüz kart yok. Ekleyerek tekrar çalışmaya başla.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {subjectCards.map(card => (
          <div key={card.id}
            className="rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3">
            {editingId === card.id ? (
              <CardForm
                initial={card}
                onSave={(front, back) => { onUpdate(card.id, { front, back }); setEditingId(null) }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug flex-1">
                    {card.front}
                  </p>
                  <div className="flex gap-1 shrink-0 mt-0.5">
                    <button
                      onClick={() => { setEditingId(card.id); setAdding(false) }}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
                      title="Düzenle">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onRemove(card.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                      title="Sil">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
                {card.back && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                    {card.back}
                  </p>
                )}
                <div className="mt-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    card.dueDate <= todayStr()
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {formatDue(card.dueDate)}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
