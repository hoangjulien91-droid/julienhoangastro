import React, { lazy, Suspense } from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";

const HubContent = lazy(() =>
  import("@/components/pst/hub/HubContent").then((m) => ({ default: m.HubContent }))
);
const PlanningContent = lazy(() =>
  import("@/components/pst/planning/PlanningContent").then((m) => ({ default: m.PlanningContent }))
);
const Pst106Page = lazy(() =>
  import("@/components/pst/modules/pst106/Pst106Page").then((m) => ({ default: m.Pst106Page }))
);
const Pst108Page = lazy(() =>
  import("@/components/pst/modules/pst108/Pst108Page").then((m) => ({ default: m.Pst108Page }))
);
const Pst120Page = lazy(() =>
  import("@/components/pst/modules/pst120/Pst120Page").then((m) => ({ default: m.Pst120Page }))
);
const Pst123Page = lazy(() =>
  import("@/components/pst/modules/pst123/Pst123Page").then((m) => ({ default: m.Pst123Page }))
);
const Pst124Page = lazy(() =>
  import("@/components/pst/modules/pst124/Pst124Page").then((m) => ({ default: m.Pst124Page }))
);

const LoadingFallback = (
  <div className="min-h-[40vh] flex items-center justify-center font-mono text-xs text-slate-400 dark:text-slate-500 animate-pulse">
    Chargement de l'atelier...
  </div>
);

interface PstAppProps {
  module: "hub" | "planning" | "106" | "108" | "120" | "123" | "124";
}

export function PstApp({ module }: PstAppProps) {
  if (module === "hub") {
    return (
      <PstPageShell moduleKey="pst" wide>
        <Suspense fallback={LoadingFallback}>
          <HubContent />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "planning") {
    return (
      <PstPageShell moduleKey="pst" wide>
        <Suspense fallback={LoadingFallback}>
          <PlanningContent />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "106") {
    return (
      <PstPageShell moduleKey="pst106">
        <Suspense fallback={LoadingFallback}>
          <Pst106Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "108") {
    return (
      <PstPageShell moduleKey="pst108">
        <Suspense fallback={LoadingFallback}>
          <Pst108Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "120") {
    return (
      <PstPageShell moduleKey="pst120">
        <Suspense fallback={LoadingFallback}>
          <Pst120Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "123") {
    return (
      <PstPageShell moduleKey="pst123">
        <Suspense fallback={LoadingFallback}>
          <Pst123Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "124") {
    return (
      <PstPageShell moduleKey="pst124">
        <Suspense fallback={LoadingFallback}>
          <Pst124Page />
        </Suspense>
      </PstPageShell>
    );
  }

  return null;
}

export default PstApp;
