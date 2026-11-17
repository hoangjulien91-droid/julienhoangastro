import { Users, GraduationCap, Building2 } from "lucide-react";
import type { Pst108ProfId } from "@/lib/pst/data/pst108-annales";

export const PART_SECONDS = 60 * 60; // 1h00 par enseignant
export const TOTAL_EXAM_SECONDS = PART_SECONDS * 3; // 3h00 au total

export const PROF_ORDER: Pst108ProfId[] = ["lucy", "valls", "marot"];

export interface ProfUiMeta {
  icon: typeof Users;
  pillActive: string;
  cardActive: string;
  badgeBg: string;
  barBg: string;
}

export const PROF_UI: Record<Pst108ProfId, ProfUiMeta> = {
  lucy: {
    icon: GraduationCap,
    pillActive:
      "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20",
    cardActive:
      "border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/35 ring-2 ring-indigo-500/20",
    badgeBg:
      "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
    barBg: "bg-indigo-600",
  },
  valls: {
    icon: Building2,
    pillActive:
      "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/20",
    cardActive:
      "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/35 ring-2 ring-emerald-500/20",
    badgeBg:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
    barBg: "bg-emerald-600",
  },
  marot: {
    icon: Users,
    pillActive:
      "bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/20",
    cardActive:
      "border-rose-500 bg-rose-50/70 dark:bg-rose-950/35 ring-2 ring-rose-500/20",
    badgeBg:
      "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
    barBg: "bg-rose-600",
  },
};

export function fmtTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
