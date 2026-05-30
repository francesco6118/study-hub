import { useState, useRef } from 'react'
import { exportData, importData } from '../../lib/backup'

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

export default function BackupPanel() {
  const [status, setStatus]         = useState(null)   // { type: 'success'|'error', msg }
  const [pendingFile, setPendingFile] = useState(null)  // File awaiting confirmation
  const [importing, setImporting]   = useState(false)
  const fileInputRef = useRef(null)

  function handleExport() {
    try {
      exportData()
      setStatus({ type: 'success', msg: 'Veriler başarıyla indirildi.' })
    } catch {
      setStatus({ type: 'error', msg: 'Dışa aktarma başarısız oldu.' })
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setStatus(null)
    setPendingFile(file)
  }

  async function handleConfirm() {
    setImporting(true)
    try {
      await importData(pendingFile)
      setPendingFile(null)
      setStatus({ type: 'success', msg: 'Veriler geri yüklendi. Sayfa yenileniyor…' })
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      setPendingFile(null)
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setImporting(false)
    }
  }

  function handleCancel() {
    setPendingFile(null)
    setStatus(null)
  }

  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium mb-3">
        Yedekleme
      </p>

      {/* Confirmation dialog */}
      {pendingFile && (
        <div className="mb-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 p-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 truncate">
            {pendingFile.name}
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mb-3 leading-snug">
            Mevcut tüm veri bu yedekle değiştirilecek. Bu işlem geri alınamaz.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirm}
              disabled={importing}
              className="flex-1 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-semibold transition-colors">
              {importing ? 'Yükleniyor…' : 'Evet, yükle'}
            </button>
            <button
              onClick={handleCancel}
              disabled={importing}
              className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors">
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Status message */}
      {status && !pendingFile && (
        <p className={`mb-3 px-3 py-2 rounded-lg text-xs leading-snug ${
          status.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        }`}>
          {status.msg}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors">
          <DownloadIcon />
          Dışa aktar
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors">
          <UploadIcon />
          İçe aktar
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
