"use client";

import { useState, useEffect, type ReactNode } from "react";
import { GraduationCap, Calendar, Clock } from "lucide-react";
import { PLANNING_EVENTS, type PlanningUnitId } from "@/lib/pst/data/planning";

interface ModuleIntroProps {
  children: ReactNode;
  unitId?: PlanningUnitId;
}

export function ModuleIntro({ children, unitId }: ModuleIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const [examDateStr, setExamDateStr] = useState<string | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!unitId) return;
    const exam = PLANNING_EVENTS.find(
      (e) => e.unit === unitId && e.type === "EXAMEN" && e.session === 1,
    );
    if (!exam) return;

    const parts = exam.date.split("-");
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    if (!y || !m || !d) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(y, m - 1, d);
    const diff = Math.ceil(
      (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    setExamDateStr(`${exam.day} ${d}/${m}/${y}`);
    setDaysLeft(diff);
  }, [unitId]);

  return (
    <div>
      {unitId && examDateStr && daysLeft !== null && (
        <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 rounded-xl text-xs font-semibold text-amber-900 dark:text-amber-300 mb-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="text-amber-600 dark:text-amber-400 size-4" />
            <b>Examen session 1 :</b> {examDateStr} (Dax)
          </span>
          <span className="px-2 py-0.5 bg-amber-600 text-white rounded-md font-bold text-[11px] flex items-center gap-1">
            <Clock className="size-3" />
            {daysLeft < 0 ? "Passé" : `J-${daysLeft}`}
          </span>
        </div>
      )}

      <div className={`sub-intro${expanded ? " expanded" : ""}`}>
        <p className="sub">{children}</p>
        <button
          type="button"
          className="sub-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      </div>
    </div>
  );
}
