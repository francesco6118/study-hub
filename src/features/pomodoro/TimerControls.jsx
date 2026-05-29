export default function TimerControls({ running, onStart, onPause, onReset }) {
  return (
    <div className="flex gap-4 justify-center">
      {running ? (
        <button
          onClick={onPause}
          className="min-w-[7rem] px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-bold text-lg transition-all"
        >
          Duraklat
        </button>
      ) : (
        <button
          onClick={onStart}
          className="min-w-[7rem] px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold text-lg transition-all"
        >
          Başlat
        </button>
      )}
      <button
        onClick={onReset}
        className="px-6 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-bold text-lg transition-all"
      >
        Sıfırla
      </button>
    </div>
  )
}
