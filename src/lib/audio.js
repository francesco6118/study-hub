// Plays a short triple-beep using the Web Audio API — no external files needed.
export function playAlarm(volume = 0.6) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const beep = (startTime, freq = 880) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)), startTime + 0.05)
      gain.gain.linearRampToValueAtTime(0, startTime + 0.4)
      osc.start(startTime)
      osc.stop(startTime + 0.4)
    }
    beep(ctx.currentTime)
    beep(ctx.currentTime + 0.5, 1046)
    beep(ctx.currentTime + 1.0)
  } catch {
    // Web Audio not supported — fail silently
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}

export function showNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/icon.svg' })
  }
}
