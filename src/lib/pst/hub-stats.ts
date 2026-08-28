import studyIndex from "./data/study-index.json";
import type { PlanningUnitId } from "./data/planning";
import { getExamDateTime } from "./planning-stats";

export interface ModuleInfo {
  id: string;
  title: string;
  subject: string;
  accent: string;
  exam?: string;
  fiches: number;
  cards: number;
  lexique: number;
}

export interface GlossaryTerm {
  w: string;
  def: string;
  m: string;
}

export const INDEX = studyIndex as unknown as {
  modules: Record<string, ModuleInfo>;
  glossaire: GlossaryTerm[];
};

// La date d'examen n'est plus recopiée dans study-index.json : elle vient du
// calendrier PLANNING_EVENTS (seule source de vérité), pour ne plus jamais
// désynchroniser le compte à rebours du hub de celui du calendrier réel.
export const MODULES: ModuleInfo[] = Object.values(INDEX.modules).map((m) => {
  const exam = getExamDateTime(m.id as PlanningUnitId);
  return exam ? { ...m, exam } : m;
});

interface StoredData {
  marks?: Record<string, unknown>;
  scores?: Record<string, { pct?: number }>;
  sessions?: (string | { date?: string })[];
}

// Les modules n'utilisent pas tous le même suffixe de clé localStorage
// (pst106 stocke sous "pst106_v1", les autres sous "pstXXX_atelier_v10").
const STORE_KEY_SUFFIXES = ["_atelier_v10", "_v1"];

function readStore(id: string): StoredData | null {
  if (typeof window === "undefined") return null;
  for (const suffix of STORE_KEY_SUFFIXES) {
    try {
      const raw = window.localStorage.getItem(id + suffix);
      if (raw) return JSON.parse(raw) as StoredData;
    } catch {
      // clé illisible : on tente le suffixe suivant
    }
  }
  return null;
}

function daysSince(id: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem("st_visit_" + id);
    if (!v) return null;
    return Math.floor((Date.now() - new Date(v).getTime()) / 86400000);
  } catch {
    return null;
  }
}

function sessionDates(d: StoredData | null): string[] {
  if (!d || !Array.isArray(d.sessions)) return [];
  return d.sessions
    .map((s) => (typeof s === "string" ? s : s && s.date ? s.date : null))
    .filter((s): s is string => Boolean(s));
}

export interface ModuleStats {
  mastered: number;
  pctCards: number;
  avgScore: number | null;
  days: number | null;
  dates: string[];
}

export function moduleStats(m: ModuleInfo): ModuleStats {
  const d = readStore(m.id);
  let mastered = 0;
  let scoreCount = 0;
  let scoreSum = 0;
  if (d) {
    const marks = d.marks || {};
    Object.keys(marks).forEach((k) => {
      if (k.indexOf("fc_") === 0 && marks[k]) mastered++;
    });
    const sc = d.scores || {};
    Object.keys(sc).forEach((k) => {
      const pct = sc[k]?.pct;
      if (typeof pct === "number") {
        scoreCount++;
        scoreSum += pct;
      }
    });
  }
  mastered = Math.min(mastered, m.cards);
  return {
    mastered,
    pctCards: m.cards ? Math.round((100 * mastered) / m.cards) : 0,
    avgScore: scoreCount ? Math.round(scoreSum / scoreCount) : null,
    days: daysSince(m.id),
    dates: sessionDates(d),
  };
}

export interface GlobalStats {
  allStats: { m: ModuleInfo; st: ModuleStats }[];
  totMastered: number;
  totCards: number;
  avgScore: number | null;
  active: number;
  activeDays: Record<string, number>;
  streak: number;
}

const dayStr = (d: Date) => d.toISOString().slice(0, 10);

export function computeGlobalStats(): GlobalStats {
  const allStats = MODULES.map((m) => ({ m, st: moduleStats(m) }));
  const totMastered = allStats.reduce((s, x) => s + x.st.mastered, 0);
  const totCards = MODULES.reduce((s, m) => s + m.cards, 0);
  const scored = allStats.filter((x) => x.st.avgScore != null);
  const avgScore = scored.length
    ? Math.round(
        scored.reduce((s, x) => s + (x.st.avgScore ?? 0), 0) / scored.length,
      )
    : null;
  const active = allStats.filter((x) => x.st.days != null).length;

  const activeDays: Record<string, number> = {};
  allStats.forEach((x) => {
    x.st.dates.forEach((dt) => {
      activeDays[dt] = (activeDays[dt] || 0) + 1;
    });
  });
  if (typeof window !== "undefined") {
    MODULES.forEach((m) => {
      try {
        const v = window.localStorage.getItem("st_visit_" + m.id);
        if (v) activeDays[v] = (activeDays[v] || 0) + 1;
      } catch {
        // ignore
      }
    });
  }

  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (activeDays[dayStr(d)]) streak++;
    else if (i > 0) break;
  }

  return {
    allStats,
    totMastered,
    totCards,
    avgScore,
    active,
    activeDays,
    streak,
  };
}
