function NumberInput({ label, value, onChange, min = 1, max = 99 }) {
  return (
    <label className="flex flex-col items-center gap-1 text-slate-300">
      <span className="text-xs uppercase tracking-wide">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
        className="w-16 text-center text-xl font-bold bg-slate-700 border border-slate-600 rounded-xl py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <span className="text-xs text-slate-500">dk</span>
    </label>
  )
}

export default function DurationSettings({ workMinutes, breakMinutes, onChange, disabled }) {
  return (
    <div className={`flex gap-8 justify-center transition-opacity ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <NumberInput
        label="Çalışma"
        value={workMinutes}
        onChange={val => onChange('work', val)}
      />
      <NumberInput
        label="Mola"
        value={breakMinutes}
        onChange={val => onChange('break', val)}
      />
    </div>
  )
}
