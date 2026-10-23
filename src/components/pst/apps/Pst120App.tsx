import React from "react";
import { PstPageShell } from "@/components/pst/shell/PstPageShell";
import { Pst120Page } from "@/components/pst/modules/pst120/Pst120Page";

export function Pst120App() {
  return (
    <PstPageShell moduleKey="pst120">
      <Pst120Page />
    </PstPageShell>
  );
}

export default Pst120App;
