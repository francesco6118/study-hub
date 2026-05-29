function Toggle({ on, onToggle, label }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${on ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-600'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  )
}

export default function SoundSettings({ enabled, volume, onUpdate }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide shrink-0 w-6">Ses</span>
      <Toggle on={enabled} onToggle={() => onUpdate({ soundEnabled: !enabled })} label="Sesi aç/kapat" />
      {enabled && (
        <input
          type="range" min={0} max={1} step={0.05} value={volume}
          onChange={e => onUpdate({ soundVolume: Number(e.target.value) })}
          className="flex-1 accent-emerald-500"
          aria-label="Ses seviyesi"
        />
      )}
    </div>
  )
}
