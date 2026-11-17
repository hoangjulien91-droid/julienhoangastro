export interface EnonceTravail {
  id: string;
  enonce: string;
  contexte: string;
  locuteur: string;
  destinataire: string;
  grilleBuhler: {
    expression: string;
    appel: string;
    representation: string;
  };
  grilleHabermas: {
    typeAgir: "communicationnel" | "stratégique";
    pretentionVerite: string;
    pretentionJustesse: string;
    pretentionSincerite: string;
    verdict: string;
  };
  grilleBourdieuAustin: {
    forceIllocutoire: string;
    pouvoirSymbolique: string;
    autoriteDeleguee: string;
  };
  grilleVygotski: string;
  piegeExamen: string;
}

export const ENONCES_TRAVAIL_PST108: EnonceTravail[] = [
  {
    id: "e1",
    enonce: "« Je veux ce rapport de production sur mon bureau demain 8h pétantes, sans faute. »",
    contexte: "Fin de journée, le chef d'atelier s'adresse à un technicien méthodes qui allait partir.",
    locuteur: "Chef d'atelier (autorité hiérarchique)",
    destinataire: "Technicien méthodes (subordonné)",
    grilleBuhler: {
      expression: "Symptôme de l'émetteur : anxiété managériale, pression temporelle subie de la direction, volonté de domination.",
      appel: "Signal vers le récepteur : injonction d'obéissance, sommation de rester tard le soir, menace implicite de sanction.",
      representation: "Symbole / Objet du monde : le rapport de production écrit, le délai temporel fixé (demain 8h00).",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Factuellement discutable : le délai de 8h est-il techniquement indispensable ou arbitraire ?",
      pretentionJustesse: "Normativement contestable : le respect des horaires légaux de repos quotidien de 11h consécutives est violé.",
      pretentionSincerite: "Subjectivement opaque : le chef masque sa propre peur de sa hiérarchie derrière un ton autoritaire péremptoire.",
      verdict: "Agir stratégique ouvertement fondé sur la contrainte hiérarchique sans recherche d'intercompréhension.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte directif (ordre formel contraignant pour le destinataire).",
      pouvoirSymbolique: "L'énoncé ne tire son efficacité que du statut de chef conféré par l'institution : sans le titre hiérarchique, la phrase serait ridicule.",
      autoriteDeleguee: "Le chef agit comme porte-parole autorisé de l'organisation ; il use du capital institutionnel.",
    },
    grilleVygotski:
      "Ce mot d'ordre social extérieur est intériorisé par le technicien sous forme de langage intérieur anxiogène : « Il faut que je me dépêche, sinon je suis viré ».",
    piegeExamen:
      "Ne pas confondre la force linguistique de l'énoncé (Austin) avec le pouvoir social conféré par l'institution (Bourdieu).",
  },
  {
    id: "e2",
    enonce: "« Dans cette entreprise, on forme une grande famille, alors on ne compte pas ses heures. »",
    contexte: "Entretien d'évaluation annuel ou discours d'intégration d'un nouveau salarié cadre.",
    locuteur: "Directeur des Ressources Humaines",
    destinataire: "Jeune cadre recruté",
    grilleBuhler: {
      expression: "Émetteur : désir de séduction narcissique, instrumentalisation de l'affectivité pour maximiser la docilité.",
      appel: "Récepteur : injonction à la dévotion totale, culpabilisation par anticipation de toute revendication d'heures sup.",
      representation: "Objets : l'entreprise assimilée métaphoriquement à la sphère privée familiale (confusion des genres).",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Faillite de la vérité : une entreprise à but lucratif n'est pas une famille biologique désintéressée.",
      pretentionJustesse: "Violation normative : le droit du travail distingue rigoureusement le contrat de travail de l'engagement familial.",
      pretentionSincerite: "Insincérité systémique : manipulation idéologique destinée à obtenir un travail gratuit consenti.",
      verdict: "Agir stratégique dissimulé (pseudo-communicationnel) : emprise managériale par subversion des repères moraux.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte assertif en apparence (« nous sommes une famille »), mais prescriptif en réalité.",
      pouvoirSymbolique: "Violence symbolique pure : le dominé est incité à consentir à sa propre exploitation par l'adhésion affective à l'institution.",
      autoriteDeleguee: "L'institution s'octroie le monopole de la définition légitime du dévouement.",
    },
    grilleVygotski:
      "La métaphore de la 'famille' colonise la conscience du salarié : l'instrument sémiotique aliène la pensée au lieu de la libérer.",
    piegeExamen:
      "Ne pas qualifier cela de 'gentillesse managériale' : c'est l'exemple d'école de l'idéologie gestionnaire de Vincent de Gaulejac et de la violence symbolique de Bourdieu.",
  },
  {
    id: "e3",
    enonce: "« De toute façon, t'es qu'un bon à rien d'incapable, t'arriveras jamais à tenir ce poste ! »",
    contexte: "Altercation vive dans un vestiaire d'usine entre un tuteur et son apprenti suite à une pièce rebutée.",
    locuteur: "Ouvrier tuteur excédé",
    destinataire: "Jeune apprenti en formation",
    grilleBuhler: {
      expression: "Émetteur : explosion de colère, sentiment d'impuissance pédagogique et peur que la responsabilité du rebut retombe sur lui.",
      appel: "Récepteur : anéantissement symbolique, humiliation publique, assignation à l'indignité professionnelle.",
      representation: "Objets : le statut d'incapable érigé en vérité ontologique définitive.",
    },
    grilleHabermas: {
      typeAgir: "stratégique",
      pretentionVerite: "Faux factuellement : l'erreur d'apprentissage ne préjuge pas de l'incapacité globale du sujet.",
      pretentionJustesse: "Rupture absolue de la justesse : infraction déontologique et harcèlement moral potentiel.",
      pretentionSincerite: "Émotion débordante sans régulation éthique.",
      verdict: "Destruction pure de l'espace communicationnel par disqualification du sujet parlant.",
    },
    grilleBourdieuAustin: {
      forceIllocutoire: "Acte injurieux : acte de langage performatif dégradant cherchant à blesser par le verbe (Éric Lucy).",
      pouvoirSymbolique: "L'insulte opère comme un verdict social négatif, un stigmate cherchant à figer le dominé dans son infériorité.",
      autoriteDeleguee: "Le tuteur abuse de sa position d'ancien pour exercer une violence verbale sans légitimité juridique.",
    },
    grilleVygotski:
      "Impact traumatique : l'insulte sociale devient pour l'apprenti un langage intérieur destructeur bloquant sa zone proximale de développement (ZPD).",
    piegeExamen:
      "Éric Lucy a consacré un séminaire à l'insulte au travail : toujours rappeler que l'insulte vise à dénier à autrui sa qualité d'interlocuteur valable.",
  },
];
