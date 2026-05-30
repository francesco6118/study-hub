import { KEYS, getItem, setItem, removeItem } from './storage'

const APP_MARKER = 'study-hub'
const VERSION    = '1'

export function exportData() {
  const data = {
    __app:        APP_MARKER,
    __version:    VERSION,
    __exportedAt: new Date().toISOString(),
  }
  for (const key of Object.values(KEYS)) {
    const val = getItem(key, null)
    if (val !== null) data[key] = val
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `study-hub-yedek-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Geçersiz dosya formatı.')
  }
  if (data.__app !== APP_MARKER) {
    throw new Error('Bu bir Study Hub yedek dosyası değil.')
  }
}

// Full restore: write keys present in backup, clear keys that are absent.
export async function importData(file) {
  let text
  try {
    text = await file.text()
  } catch {
    throw new Error('Dosya okunamadı.')
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Geçersiz dosya: JSON formatı hatalı.')
  }

  validate(data)

  for (const key of Object.values(KEYS)) {
    if (key in data) setItem(key, data[key])
    else             removeItem(key)
  }
}
