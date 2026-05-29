import { useState } from 'react'

const inputCls = 'bg-slate-600 text-white rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400'

function AddForm({ onAdd }) {
  const [open, setOpen]   = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(title, url)
    setTitle(''); setUrl(''); setOpen(false)
  }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors text-left">
      + Video Ekle
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-slate-700 rounded-xl p-3">
      <input value={title} onChange={e => setTitle(e.target.value)} required maxLength={80}
        placeholder="Başlık (örn. 12. Ders: Oksijenli Solunum-1)" className={inputCls} />
      <input value={url} onChange={e => setUrl(e.target.value)} required type="url"
        placeholder="YouTube linki (https://...)" className={inputCls} />
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen(false)}
          className="flex-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 text-sm transition-colors">İptal</button>
        <button type="submit"
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg py-2 text-sm transition-colors">Ekle</button>
      </div>
    </form>
  )
}

function EditForm({ video, onSave, onCancel }) {
  const [title, setTitle] = useState(video.title)
  const [url, setUrl]     = useState(video.url)

  return (
    <form onSubmit={e => { e.preventDefault(); onSave({ title, url }) }}
      className="flex flex-col gap-2 bg-slate-700 rounded-xl px-3 py-2.5">
      <input value={title} onChange={e => setTitle(e.target.value)} required maxLength={80} className={inputCls} />
      <input value={url} onChange={e => setUrl(e.target.value)} required type="url" className={inputCls} />
      <div className="flex gap-2">
        <button type="button" onClick={onCancel}
          className="flex-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-1.5 text-sm transition-colors">İptal</button>
        <button type="submit"
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg py-1.5 text-sm transition-colors">Kaydet</button>
      </div>
    </form>
  )
}

function VideoItem({ video, isFirst, isLast, onToggle, onMove, onEdit, onRemove }) {
  const btnCls = 'w-6 h-6 flex items-center justify-center text-slate-500 hover:text-white transition-colors disabled:opacity-20'
  return (
    <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl ${video.completed ? 'bg-slate-700/40' : 'bg-slate-700'}`}>
      <button onClick={() => onToggle(video.id)}
        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
          video.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 hover:border-emerald-400'
        }`}>
        {video.completed && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        )}
      </button>

      <a href={video.url} target="_blank" rel="noopener noreferrer"
        className={`flex-1 text-sm min-w-0 truncate transition-colors ${
          video.completed ? 'line-through text-slate-500' : 'text-white hover:text-emerald-400'
        }`}>
        {video.title}
      </a>

      <div className="flex items-center shrink-0">
        <button onClick={() => onMove(video.id, 'up')}   disabled={isFirst} className={btnCls} title="Yukarı taşı">▲</button>
        <button onClick={() => onMove(video.id, 'down')} disabled={isLast}  className={btnCls} title="Aşağı taşı">▼</button>
        <button onClick={() => onEdit(video.id)} className={btnCls} title="Düzenle">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button onClick={() => onRemove(video.id)}
          className="w-7 h-6 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors text-xl leading-none" title="Sil">×</button>
      </div>
    </div>
  )
}

export default function SubjectVideos({ videos, onAdd, onUpdate, onRemove, onToggle, onMove }) {
  const [editingId, setEditingId] = useState(null)
  const completedCount = videos.filter(v => v.completed).length
  const pct = videos.length > 0 ? completedCount / videos.length : 0

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 uppercase tracking-wide">Ders Videoları</span>
        {videos.length > 0 && (
          <span className={`text-xs font-medium ${completedCount === videos.length ? 'text-emerald-400' : 'text-slate-400'}`}>
            {completedCount}/{videos.length} tamamlandı
          </span>
        )}
      </div>

      {videos.length > 0 && (
        <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden -mt-1">
          <div style={{ width: `${pct * 100}%` }} className="h-full bg-emerald-500 rounded-full transition-all duration-300" />
        </div>
      )}

      {videos.length === 0
        ? <p className="text-slate-600 text-sm py-1">Henüz video eklenmedi.</p>
        : (
          <div className="flex flex-col gap-1.5">
            {videos.map((video, idx) =>
              editingId === video.id
                ? <EditForm key={video.id} video={video}
                    onSave={data => { onUpdate(video.id, data); setEditingId(null) }}
                    onCancel={() => setEditingId(null)} />
                : <VideoItem key={video.id} video={video}
                    isFirst={idx === 0} isLast={idx === videos.length - 1}
                    onToggle={onToggle} onMove={onMove}
                    onEdit={setEditingId} onRemove={onRemove} />
            )}
          </div>
        )
      }

      <AddForm onAdd={onAdd} />
    </div>
  )
}
