import { formatMinutes } from '../../lib/stats'

export default function StatCard({ label, pomodoros, minutes }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 flex flex-col gap-0.5">
      <span className="text-xs text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-3xl font-bold text-white leading-tight">{pomodoros}</span>
      <span className="text-xs text-slate-500">pomodoro</span>
      <span className="text-sm text-emerald-400 font-medium mt-1">
        {formatMinutes(minutes)}
      </span>
    </div>
  )
}
