export interface AuditOption {
  text: string;
  accept: number;
  alien: number;
  pouvoir: number;
  feedback: string;
}

export interface AuditScenario {
  title: string;
  desc: string;
  opts: AuditOption[];
}

export const SCENARIOS_AUDIT_DIGITAL: AuditScenario[] = [
  {
    title: "Étape 1 : Choix de la méthode d'introduction",
    desc: "Votre direction souhaite déployer Slack/Teams pour réduire les e-mails. Comment lancez-vous le projet ?",
    opts: [
      {
        text: "Déploiement obligatoire le weekend avec coupure automatique des serveurs mails.",
        accept: -20,
        alien: 30,
        pouvoir: -20,
        feedback:
          "Méthode directive sans concertation. La coupure crée un sentiment d'empêchement pour ceux qui ont des urgences.",
      },
      {
        text: "Co-conception de la charte des usages avec des groupes de salariés volontaires.",
        accept: 30,
        alien: -10,
        pouvoir: 20,
        feedback:
          "Excellent ! Vous ouvrez des espaces de délibération sur l'usage de l'outil.",
      },
    ],
  },
  {
    title: "Étape 2 : Surcharge informationnelle & notifications",
    desc: "Certains salariés se plaignent d'être inondés de notifications et de messages hors temps de travail. Quelle action menez-vous ?",
    opts: [
      {
        text: "Bloquer l'accès technique de l'application à distance après 20h.",
        accept: -10,
        alien: 20,
        pouvoir: -10,
        feedback:
          "L'interdiction technique rigide aliène les salariés en niant la variabilité de leur activité réelle.",
      },
      {
        text: "Instaurer des débats d'équipe réguliers sur la charge de travail et la priorisation.",
        accept: 20,
        alien: -20,
        pouvoir: 20,
        feedback:
          "Parfait ! Réguler la charge par le dialogue redonne du pouvoir d'agir sur l'organisation.",
      },
    ],
  },
  {
    title: "Étape 3 : Résistances et contournements (Catachrèses)",
    desc: "Vous constatez que des salariés contournent l'outil officiel en utilisant des messageries grand public (WhatsApp) pour collaborer rapidement. Que faites-vous ?",
    opts: [
      {
        text: "Menacer de sanctions et faire bloquer l'usage des téléphones personnels au travail.",
        accept: -30,
        alien: 40,
        pouvoir: -30,
        feedback:
          "Destructeur ! Vous niez l'intelligence pratique des salariés qui cherchent juste à faire du bon travail.",
      },
      {
        text: "Analyser ces usages informels comme des catachrèses utiles pour enrichir le nouvel outil.",
        accept: 30,
        alien: -10,
        pouvoir: 30,
        feedback:
          "Brillant ! C'est la genèse instrumentale en action : les usages réels modifient l'artefact technique.",
      },
    ],
  },
];
