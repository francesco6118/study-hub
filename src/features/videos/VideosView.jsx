import { useMemo } from 'react'
import { formatMinutes } from '../../lib/stats'

function ProgressBar({ ratio, thin = false }) {
  return (
    <div className={`w-full ${thin ? 'h-1.5' : 'h-2'} bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden`}>
      <div style={{ width: `${Math.min(1, ratio) * 100}%` }}
        className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out" />
    </div>
  )
}

export default function VideosView({ videos, subjects }) {
  const stats = useMemo(() => {
    const total    = videos.length
    const watched  = videos.filter(v => v.completed).length
    const unwatchedMins = videos
      .filter(v => !v.completed)
      .reduce((s, v) => s + (v.durationMinutes ?? 0), 0)

    const bySubject = subjects
      .map(s => {
        const svids = videos.filter(v => v.subjectId === s.id)
        if (svids.length === 0) return null
        const sWatched       = svids.filter(v => v.completed).length
        const sUnwatchedMins = svids.filter(v => !v.completed)
          .reduce((a, v) => a + (v.durationMinutes ?? 0), 0)
        return { subject: s, total: svids.length, watched: sWatched, unwatchedMins: sUnwatchedMins }
      })
      .filter(Boolean)
      .sort((a, b) => b.unwatchedMins - a.unwatchedMins)

    return { total, watched, unwatchedMins, bySubject }
  }, [videos, subjects])

  if (stats.total === 0) {
    return (
      <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-16 leading-relaxed">
        Henüz hiçbir derse video eklenmedi.<br />
        Ders detayından video ekleyebilirsin.
      </p>
    )
  }

  const globalRatio = stats.total > 0 ? stats.watched / stats.total : 0
  const allDone     = stats.watched === stats.total

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">İzlenecekler</h2>

      {/* Global summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-transparent flex flex-col gap-3">
        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
          Toplam izlenecek süre
        </span>

        {allDone ? (
          <p className="text-2xl font-bold text-emerald-500">Tüm videolar izlendi!</p>
        ) : (
          <>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
                {stats.unwatchedMins > 0 ? formatMinutes(stats.unwatchedMins) : '—'}
              </p>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {stats.total - stats.watched} video bekliyor
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{stats.watched}/{stats.total} izlendi</span>
                <span>{Math.round(globalRatio * 100)}%</span>
              </div>
              <ProgressBar ratio={globalRatio} />
            </div>
          </>
        )}
      </div>

      {/* Per-subject breakdown */}
      {stats.bySubject.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
            Ders bazında
          </p>
          {stats.bySubject.map(({ subject, total, watched, unwatchedMins }) => {
            const ratio     = total > 0 ? watched / total : 0
            const unwatched = total - watched
            return (
              <div key={subject.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-transparent flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: subject.color }} />
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{subject.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white shrink-0 tabular-nums">
                    {unwatchedMins > 0 ? formatMinutes(unwatchedMins) : '—'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar ratio={ratio} thin />
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 tabular-nums">
                    {watched}/{total}
                  </span>
                </div>

                {unwatched > 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {unwatched} video izlenecek
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
