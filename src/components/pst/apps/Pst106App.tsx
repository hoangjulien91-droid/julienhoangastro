import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { Pst106Page } from "@/components/pst/modules/pst106/Pst106Page";

export function Pst106App() {
  return (
    <PstPageShell moduleKey="pst106">
      <Pst106Page />
    </PstPageShell>
  );
}

export default Pst106App;
