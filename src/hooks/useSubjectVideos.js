import { useState, useEffect } from 'react'
import { getItem, setItem, KEYS } from '../lib/storage'

export default function useSubjectVideos() {
  const [videos, setVideos] = useState(() => getItem(KEYS.SUBJECT_VIDEOS, []))

  useEffect(() => {
    setItem(KEYS.SUBJECT_VIDEOS, videos)
  }, [videos])

  function videosFor(subjectId) {
    return videos
      .filter(v => v.subjectId === subjectId)
      .sort((a, b) => a.order - b.order)
  }

  function addVideo(subjectId, title, url, durationMinutes = 0) {
    const maxOrder = videos
      .filter(v => v.subjectId === subjectId)
      .reduce((m, v) => Math.max(m, v.order), -1)
    setVideos(prev => [...prev, {
      id: crypto.randomUUID(), subjectId,
      title: title.trim(), url: url.trim(),
      completed: false, order: maxOrder + 1,
      durationMinutes: Number(durationMinutes) || 0,
    }])
  }

  function updateVideo(id, { title, url, durationMinutes }) {
    setVideos(prev => prev.map(v =>
      v.id === id
        ? { ...v, title: title.trim(), url: url.trim(), durationMinutes: Number(durationMinutes) || 0 }
        : v
    ))
  }

  function removeVideo(id) {
    setVideos(prev => prev.filter(v => v.id !== id))
  }

  function toggleVideo(id) {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, completed: !v.completed } : v))
  }

  function moveVideo(id, direction) {
    setVideos(prev => {
      const subjectId = prev.find(v => v.id === id)?.subjectId
      if (!subjectId) return prev
      const others = prev.filter(v => v.subjectId !== subjectId)
      const mine = prev
        .filter(v => v.subjectId === subjectId)
        .sort((a, b) => a.order - b.order)
        .map(v => ({ ...v }))
      const idx = mine.findIndex(v => v.id === id)
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= mine.length) return prev
      ;[mine[idx], mine[swapIdx]] = [mine[swapIdx], mine[idx]]
      mine.forEach((v, i) => { v.order = i })
      return [...others, ...mine]
    })
  }

  return { videos, videosFor, addVideo, updateVideo, removeVideo, toggleVideo, moveVideo }
}
