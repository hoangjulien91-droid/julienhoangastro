import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { Pst108Page } from "@/components/pst/modules/pst108/Pst108Page";

export function Pst108App() {
  return (
    <PstPageShell moduleKey="pst108">
      <Pst108Page />
    </PstPageShell>
  );
}

export default Pst108App;
