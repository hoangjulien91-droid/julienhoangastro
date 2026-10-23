import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { Pst123Page } from "@/components/pst/modules/pst123/Pst123Page";

export function Pst123App() {
  return (
    <PstPageShell moduleKey="pst123">
      <Pst123Page />
    </PstPageShell>
  );
}

export default Pst123App;
