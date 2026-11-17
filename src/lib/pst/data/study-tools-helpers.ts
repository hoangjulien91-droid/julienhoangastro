import { getAudioContext } from "@/lib/pst/audio-feedback";
import { MODULE_LABELS } from "@/lib/pst/data/ponts";

export const POMO_WORK = 25 * 60;
export const POMO_BREAK = 5 * 60;

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function fmtPomoTime(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export function getLS(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setLS(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function beepAudio(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 660;
    gain.gain.value = 0.05;
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // ignore
  }
}

export function notifyBrowser(title: string, body: string): void {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  } catch {
    // ignore
  }
}

export function buildFullSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  const snapshot: Record<string, string> = {};
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && /^(pst|st_)/i.test(k)) {
        const val = window.localStorage.getItem(k);
        if (val !== null) snapshot[k] = val;
      }
    }
  } catch {
    // ignore
  }
  return JSON.stringify({
    version: 2,
    exportedAt: new Date().toISOString(),
    entries: snapshot,
  });
}

export function restoreSnapshot(rawJson: string): number {
  const parsed = JSON.parse(rawJson);
  const entries: Record<string, string> = parsed.entries || parsed;
  let count = 0;
  Object.entries(entries).forEach(([k, v]) => {
    if (/^(pst|st_)/i.test(k) && typeof v === "string") {
      window.localStorage.setItem(k, v);
      count++;
    }
  });
  window.dispatchEvent(new CustomEvent("pst:storage-updated"));
  window.dispatchEvent(new CustomEvent("pst:ad-updated"));
  return count;
}

export function getStaleModules(): { id: string; days: number }[] {
  return Object.keys(MODULE_LABELS)
    .map((id) => {
      const last = getLS("st_visit_" + id);
      if (!last) return null;
      const days = Math.floor(
        (Date.now() - new Date(last).getTime()) / 86400000,
      );
      return days >= 3 ? { id, days } : null;
    })
    .filter((x): x is { id: string; days: number } => x !== null);
}
