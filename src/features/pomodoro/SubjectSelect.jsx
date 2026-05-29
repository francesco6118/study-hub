import Select from '../../components/Select'

export default function SubjectSelect({ subjects, selectedId, onSelect }) {
  if (subjects.length === 0) return null

  const selected = subjects.find(s => s.id === selectedId)

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <label className="text-xs text-slate-500 uppercase tracking-wide">Çalışılan Ders</label>
      <div className="relative w-full max-w-xs">
        {selected && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 pointer-events-none"
            style={{ backgroundColor: selected.color }} />
        )}
        <Select
          value={selectedId ?? ''}
          onChange={e => onSelect(e.target.value || null)}
          className={selected ? 'pl-8' : ''}
        >
          <option value="">— Ders seçilmedi —</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
      </div>
    </div>
  )
}
