import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { Pst124Page } from "@/components/pst/modules/pst124/Pst124Page";

export function Pst124App() {
  return (
    <PstPageShell moduleKey="pst124">
      <Pst124Page />
    </PstPageShell>
  );
}

export default Pst124App;
