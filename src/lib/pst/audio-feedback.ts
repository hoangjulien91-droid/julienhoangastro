/**
 * Micro-moteur audio synthétisé Web Audio API (Linear / Apple standard)
 * 100% procédural, 0 fichier externe, 0 latence, volume discret.
 */

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

let cachedAudioEnabled: boolean | null = null;

export function isAudioEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedAudioEnabled !== null) return cachedAudioEnabled;
  try {
    cachedAudioEnabled = window.localStorage.getItem("pst_sound_enabled") === "true";
  } catch {
    cachedAudioEnabled = false;
  }
  return cachedAudioEnabled;
}

export function setAudioEnabled(enabled: boolean) {
  cachedAudioEnabled = enabled;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      "pst_sound_enabled",
      enabled ? "true" : "false",
    );
  } catch {
    // Silencieux si storage indisponible (mode privé durci)
  }
}

export type HapticFeedbackType =
  "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection";

/** Micro-vibration haptique douce et feutrée (Taptic Engine / Android) */
export function triggerHaptic(type: HapticFeedbackType = "light") {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;
  try {
    switch (type) {
      case "selection":
      case "light":
        navigator.vibrate(8);
        break;
      case "medium":
        navigator.vibrate(14);
        break;
      case "heavy":
        navigator.vibrate([25, 40, 25]);
        break;
      case "success":
        navigator.vibrate([10, 35, 12]);
        break;
      case "warning":
        navigator.vibrate([18, 40, 18]);
        break;
      case "error":
        navigator.vibrate([18, 40, 18, 40, 25]);
        break;
    }
  } catch {
    // Silencieux
  }
}

/** Clic mécanique feutré au retournement de carte */
export function playFlipSound() {
  triggerHaptic("light");
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Silencieux si non supporté
  }
}

/** Clic feutré et discret pour bouton d'action ou changement d'onglet */
export function playClickSound() {
  triggerHaptic("light");
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Silencieux si non supporté
  }
}

/** Chime discret et gratifiant lors de la validation "Su" */
export function playSuccessSound() {
  triggerHaptic("success");
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Note 1: E5 (659Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.05, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.09);

    // Note 2: A5 (880Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.05);
    gain2.gain.setValueAtTime(0.05, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.16);
  } catch {
    // Silencieux
  }
}

/** Son mat et neutre lors de "À revoir" */
export function playReviewSound() {
  triggerHaptic("warning");
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Silencieux
  }
}

/** Accord harmonieux de complétion de deck */
export function playDeckCompleteSound() {
  triggerHaptic("success");
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch {
    // Silencieux
  }
}
