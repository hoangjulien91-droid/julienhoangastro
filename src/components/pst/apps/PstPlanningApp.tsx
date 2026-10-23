import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { PlanningContent } from "@/components/pst/planning/PlanningContent";

export function PstPlanningApp() {
  return (
    <PstPageShell moduleKey="pst" activeNav="planning" wide>
      <PlanningContent />
    </PstPageShell>
  );
}

export default PstPlanningApp;
