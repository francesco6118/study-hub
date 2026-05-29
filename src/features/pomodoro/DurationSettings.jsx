function NumberInput({ label, value, onChange, min = 1, max = 99, unit = 'dk' }) {
  return (
    <label className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
      <span className="text-[10px] uppercase tracking-wide text-center leading-tight">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
        className="w-14 text-center text-lg font-bold bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl py-2 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <span className="text-[10px] text-slate-400 dark:text-slate-500">{unit}</span>
    </label>
  )
}

export default function DurationSettings({
  workMinutes, breakMinutes, longBreakMinutes, longBreakInterval,
  onChange, disabled,
}) {
  return (
    <div className={`grid grid-cols-4 gap-3 justify-items-center transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <NumberInput label="Çalışma"    value={workMinutes}       onChange={v => onChange('work', v)} />
      <NumberInput label="Kısa Mola"  value={breakMinutes}      onChange={v => onChange('break', v)} />
      <NumberInput label="Uzun Mola"  value={longBreakMinutes}  onChange={v => onChange('longBreak', v)} />
      <NumberInput label="Seans"      value={longBreakInterval} onChange={v => onChange('interval', v)} min={2} max={10} unit="seans" />
    </div>
  )
}
