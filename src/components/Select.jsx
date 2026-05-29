// Styled wrapper around native <select>:
// hides the OS arrow with appearance-none and overlays a custom chevron.
// The native element still handles all click/keyboard/accessibility events.
export default function Select({ value, onChange, children, className = '' }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`w-full appearance-none bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 pr-9 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer ${className}`}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  )
}
