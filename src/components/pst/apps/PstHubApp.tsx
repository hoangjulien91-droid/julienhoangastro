import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { HubContent } from "@/components/pst/hub/HubContent";

export function PstHubApp() {
  return (
    <PstPageShell moduleKey="pst" activeNav="hub" wide>
      <HubContent />
    </PstPageShell>
  );
}

export default PstHubApp;
