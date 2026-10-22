import React, { Suspense } from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";

const HubContent = React.lazy(() =>
  import("@/components/pst/hub/HubContent").then((m) => ({
    default: m.HubContent,
  })),
);
const PlanningContent = React.lazy(() =>
  import("@/components/pst/planning/PlanningContent").then((m) => ({
    default: m.PlanningContent,
  })),
);
const Pst106Page = React.lazy(() =>
  import("@/components/pst/modules/pst106/Pst106Page").then((m) => ({
    default: m.Pst106Page,
  })),
);
const Pst108Page = React.lazy(() =>
  import("@/components/pst/modules/pst108/Pst108Page").then((m) => ({
    default: m.Pst108Page,
  })),
);
const Pst120Page = React.lazy(() =>
  import("@/components/pst/modules/pst120/Pst120Page").then((m) => ({
    default: m.Pst120Page,
  })),
);
const Pst123Page = React.lazy(() =>
  import("@/components/pst/modules/pst123/Pst123Page").then((m) => ({
    default: m.Pst123Page,
  })),
);
const Pst124Page = React.lazy(() =>
  import("@/components/pst/modules/pst124/Pst124Page").then((m) => ({
    default: m.Pst124Page,
  })),
);

function ModuleSkeleton() {
  return (
    <div className="space-y-4 py-4 animate-pulse">
      <div className="h-28 rounded-3xl bg-slate-200/60 dark:bg-slate-800/60" />
      <div className="h-12 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50" />
      <div className="h-64 rounded-3xl bg-slate-200/40 dark:bg-slate-800/40" />
    </div>
  );
}

interface PstAppProps {
  module: "hub" | "planning" | "106" | "108" | "120" | "123" | "124";
}

export function PstApp({ module }: PstAppProps) {
  if (module === "hub") {
    return (
      <PstPageShell moduleKey="pst" wide>
        <Suspense fallback={<ModuleSkeleton />}>
          <HubContent />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "planning") {
    return (
      <PstPageShell moduleKey="pst" wide>
        <Suspense fallback={<ModuleSkeleton />}>
          <PlanningContent />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "106") {
    return (
      <PstPageShell moduleKey="pst106">
        <Suspense fallback={<ModuleSkeleton />}>
          <Pst106Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "108") {
    return (
      <PstPageShell moduleKey="pst108">
        <Suspense fallback={<ModuleSkeleton />}>
          <Pst108Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "120") {
    return (
      <PstPageShell moduleKey="pst120">
        <Suspense fallback={<ModuleSkeleton />}>
          <Pst120Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "123") {
    return (
      <PstPageShell moduleKey="pst123">
        <Suspense fallback={<ModuleSkeleton />}>
          <Pst123Page />
        </Suspense>
      </PstPageShell>
    );
  }

  if (module === "124") {
    return (
      <PstPageShell moduleKey="pst124">
        <Suspense fallback={<ModuleSkeleton />}>
          <Pst124Page />
        </Suspense>
      </PstPageShell>
    );
  }

  return null;
}

export default PstApp;
