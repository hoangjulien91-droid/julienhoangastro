export interface ShellModalsState {
  matchAuteursOpen: boolean;
  definitionsOpen: boolean;
  fichePocheOpen: boolean;
  speedRunOpen: boolean;
  detectiveOpen: boolean;
  sujetsOpen: boolean;
  roleplayOpen: boolean;
  schemasOpen: boolean;
  blindTestOpen: boolean;
  chronologieOpen: boolean;
  palaisMemoireOpen: boolean;
  briefingOpen: boolean;
  pontsTransversauxOpen: boolean;
  commandPaletteOpen: boolean;
  selectedWorkshop: string | null;
  disasterRecoveryOpen: boolean;
  examSimulatorOpen: boolean;
  clinicalProtocolsOpen: boolean;
  memoireStudioOpen: boolean;
  biblioVaultOpen: boolean;
  deontoAuditOpen: boolean;
  clinicalCasesOpen: boolean;
  fieldJournalOpen: boolean;
  oralDefenseOpen: boolean;
  interventionCommsOpen: boolean;
  pontsS1Open: boolean;
  flashCitationsS1Open: boolean;
  chronoExamenOpen: boolean;
  generateurIntroOpen: boolean;
  dictaphoneOralOpen: boolean;
  correcteurCopieOpen: boolean;
  radarMaitriseOpen: boolean;
  tableauAdOpen: boolean;
}

export type ModalKey = keyof ShellModalsState;
