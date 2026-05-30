let _ctx = null

function getCtx() {
  try {
    if (!_ctx || _ctx.state === 'closed') {
      _ctx = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (_ctx.state === 'suspended') _ctx.resume()
    return _ctx
  } catch {
    return null
  }
}

// One sinusoidal partial: fast attack (8 ms) then exponential decay.
function partial(ctx, freq, t, decay, amp) {
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(amp, t + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + decay)
  osc.start(t)
  osc.stop(t + decay + 0.05)
}

// Soft two-note rising ding (C5 → G5) — played when Start is pressed.
export function playStart(volume = 0.6) {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const v = Math.max(0, Math.min(1, volume)) * 0.35
    const t = ctx.currentTime
    partial(ctx, 523.25, t,        0.55, v * 0.85)  // C5
    partial(ctx, 1046.5, t,        0.45, v * 0.18)  // C6 harmonic
    partial(ctx, 784.0,  t + 0.20, 0.65, v * 1.00)  // G5 — rising fifth
    partial(ctx, 1568.0, t + 0.20, 0.55, v * 0.20)  // G6 harmonic
  } catch {}
}

// Calming singing-bowl chime — played when work ends and break begins.
// A4 with a 0.7 Hz detuned pair creates gentle acoustic beating (~1.4 Hz),
// then a lower E4 settles in after 0.55 s.
export function playBreakStart(volume = 0.6) {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const v = Math.max(0, Math.min(1, volume)) * 0.35
    const t = ctx.currentTime
    partial(ctx, 440.0,  t,        2.8, v * 0.55)
    partial(ctx, 440.7,  t,        2.8, v * 0.14)   // 0.7 Hz detune → ~1.4 Hz beating
    partial(ctx, 880.0,  t,        2.0, v * 0.18)
    partial(ctx, 1320.0, t,        1.4, v * 0.08)
    partial(ctx, 329.63, t + 0.55, 2.5, v * 0.40)  // E4 — lower, settling
    partial(ctx, 330.1,  t + 0.55, 2.5, v * 0.10)
    partial(ctx, 659.25, t + 0.55, 1.8, v * 0.12)
  } catch {}
}

// Soft ascending G-major arpeggio (G4 → B4 → D5) — played when break ends.
export function playWorkStart(volume = 0.6) {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const v = Math.max(0, Math.min(1, volume)) * 0.35
    const t = ctx.currentTime
    partial(ctx, 392.0,  t,        0.50, v * 0.70)  // G4
    partial(ctx, 784.0,  t,        0.42, v * 0.20)
    partial(ctx, 493.88, t + 0.16, 0.50, v * 0.75)  // B4
    partial(ctx, 987.77, t + 0.16, 0.42, v * 0.22)
    partial(ctx, 587.33, t + 0.32, 0.70, v * 0.85)  // D5
    partial(ctx, 1174.7, t + 0.32, 0.58, v * 0.23)
    partial(ctx, 1760.0, t + 0.32, 0.40, v * 0.08)  // A6 shimmer
  } catch {}
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
