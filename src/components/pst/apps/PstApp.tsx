import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { HubContent } from "@/components/pst/hub/HubContent";
import { PlanningContent } from "@/components/pst/planning/PlanningContent";
import { Pst106Page } from "@/components/pst/modules/pst106/Pst106Page";
import { Pst108Page } from "@/components/pst/modules/pst108/Pst108Page";
import { Pst120Page } from "@/components/pst/modules/pst120/Pst120Page";
import { Pst123Page } from "@/components/pst/modules/pst123/Pst123Page";
import { Pst124Page } from "@/components/pst/modules/pst124/Pst124Page";

interface PstAppProps {
  module: "hub" | "planning" | "106" | "108" | "120" | "123" | "124";
}

export function PstApp({ module }: PstAppProps) {
  if (module === "hub") {
    return (
      <PstPageShell moduleKey="pst">
        <HubContent />
      </PstPageShell>
    );
  }

  if (module === "planning") {
    return (
      <PstPageShell moduleKey="pst" wide>
        <PlanningContent />
      </PstPageShell>
    );
  }

  if (module === "106") {
    return (
      <PstPageShell moduleKey="pst106">
        <Pst106Page />
      </PstPageShell>
    );
  }

  if (module === "108") {
    return (
      <PstPageShell moduleKey="pst108">
        <Pst108Page />
      </PstPageShell>
    );
  }

  if (module === "120") {
    return (
      <PstPageShell moduleKey="pst120">
        <Pst120Page />
      </PstPageShell>
    );
  }

  if (module === "123") {
    return (
      <PstPageShell moduleKey="pst123">
        <Pst123Page />
      </PstPageShell>
    );
  }

  if (module === "124") {
    return (
      <PstPageShell moduleKey="pst124">
        <Pst124Page />
      </PstPageShell>
    );
  }

  return null;
}

export default PstApp;
