"use client";

import { useState, type ReactNode } from "react";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import { ModuleIntroScheduleBanner } from "./module-intro/ModuleIntroScheduleBanner";
import { ModuleIntroToolsBar } from "./module-intro/ModuleIntroToolsBar";

interface ModuleIntroProps {
  children: ReactNode;
  unitId?: PlanningUnitId;
}

export function ModuleIntro({ children, unitId }: ModuleIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {/* Target Exam Countdown, Next Session & Calendar Popup */}
      <ModuleIntroScheduleBanner unitId={unitId} />

      {/* Barre d'outils Exclusifs de l'UE + Kit 18/20 */}
      <ModuleIntroToolsBar unitId={unitId} />

      {/* Accordion intro description */}
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
