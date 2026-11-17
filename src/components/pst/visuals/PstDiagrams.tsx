"use client";

import React from "react";
import {
  LeplatHocDiagram,
  ClotIcebergDiagram,
} from "./diagrams/pst106Diagrams";
import {
  BourdieuHabitusDiagram,
  HabermasTetraedreDiagram,
  HonnethSpheresDiagram,
  VallsCastraIodDiagram,
  DubarDoubleTransactionDiagram,
  SainsaulieuMatriceDiagram,
  CastelDesaffiliationDiagram,
  BuhlerOrganonDiagram,
  DubarFormesIdentitairesDiagram,
} from "./diagrams/pst108Diagrams";
import { DejoursReconnaissanceDiagram } from "./diagrams/pst120Diagrams";
import {
  CartographieLagabrielleDiagram,
  VygotskiPiagetDiagram,
  GolseFonctionsPenseeDiagram,
} from "./diagrams/pst123Diagrams";

export * from "./diagrams/pst106Diagrams";
export * from "./diagrams/pst108Diagrams";
export * from "./diagrams/pst120Diagrams";
export * from "./diagrams/pst123Diagrams";

export function PstDiagramRenderer({ schemaId }: { schemaId: string }) {
  switch (schemaId) {
    case "schema-leplat-regulation":
      return <LeplatHocDiagram />;
    case "schema-clot-activite-reelle":
      return <ClotIcebergDiagram />;
    case "schema-dejours-reconnaissance":
      return <DejoursReconnaissanceDiagram />;
    case "schema-bourdieu-algorithme":
      return <BourdieuHabitusDiagram />;
    case "schema-habermas-validite":
      return <HabermasTetraedreDiagram />;
    case "schema-honneth-spheres":
      return <HonnethSpheresDiagram />;
    case "schema-buhler-organon":
      return <BuhlerOrganonDiagram />;
    case "schema-valls-iod":
      return <VallsCastraIodDiagram />;
    case "schema-dubar-double-transaction":
      return <DubarDoubleTransactionDiagram />;
    case "schema-sainsaulieu-matrice":
      return <SainsaulieuMatriceDiagram />;
    case "schema-castel-desaffiliation":
      return <CastelDesaffiliationDiagram />;
    case "schema-cartographie-lagabrielle":
      return <CartographieLagabrielleDiagram />;
    case "schema-vygotski-piaget":
      return <VygotskiPiagetDiagram />;
    case "schema-golse-pensee":
      return <GolseFonctionsPenseeDiagram />;
    case "schema-dubar-formes":
      return <DubarFormesIdentitairesDiagram />;
    default:
      return null;
  }
}
