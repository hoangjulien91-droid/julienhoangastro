export interface CasDeonto123 {
  id: string;
  titre: string;
  contexte: string;
  demandeTiers: string;
  qualificationAttendue: "conforme" | "manquement_code" | "delit_penal";
  articlesViolés: string[];
  reponseRecommandee: string;
  explicationJuridique: string;
  piegeExamen: string;
}

export const CAS_DEONTOLOGIE_123: CasDeonto123[] = [
  {
    id: "c1",
    titre: "Transmission des Comptes-Rendus d'Entretiens pour un PSE",
    contexte:
      "Dans le cadre d'un Plan de Sauvegarde de l'Emploi (PSE), le psychologue du travail salarié d'un grand groupe reçoit en entretien individuel des salariés en souffrance.",
    demandeTiers:
      "La DRH convoque le psychologue et exige la transmission des fiches d'entretiens individuels annotées pour 'identifier les salariés les plus fragiles psychologiquement afin de ne pas les licencier brutalement'.",
    qualificationAttendue: "delit_penal",
    articlesViolés: [
      "Article 226-13 du Code pénal (Violation du secret professionnel)",
      "Principe 1 du Code 2021 (Respect de la personne et confidentialité)",
      "Principe 6 du Code 2021 (Respect du but assigné : interdiction de détourner les données cliniques)",
    ],
    reponseRecommandee:
      "Refus catégorique et absolu. Le secret professionnel ne se partage pas avec la DRH, même sous un prétexte 'protecteur'. Le psychologue peut seulement transmettre des bilans statistiques anonymisés collectifs sur les facteurs de risques psycho-sociaux.",
    explicationJuridique:
      "Le secret professionnel du psychologue est d'ordre public. Même avec le consentement supposé du salarié, la transmission de données nominatives à l'employeur constitue le délit pénal de violation du secret professionnel (1 an d'emprisonnement et 15 000 € d'amende).",
    piegeExamen:
      "Ne pas céder au piège de 'l'intention bienveillante de la DRH'. En droit, la violation du secret reste punissable quelle que soit la finalité invoquée.",
  },
  {
    id: "c2",
    titre: "Usurpation du Titre par un Coach / Consultant RH",
    contexte:
      "Un cabinet de conseil recrute un titulaire d'un Master 2 en Gestion des Ressources Humaines qui a suivi une certification de coaching de 3 semaines.",
    demandeTiers:
      "Sur son profil LinkedIn, ses cartes de visite et ses rapports d'audit de climat social, ce consultant signe : 'Jean Dupont, Psychologue des Organisations et Coach certifié'.",
    qualificationAttendue: "delit_penal",
    articlesViolés: [
      "Loi n° 85-772 du 25 juillet 1985 (Protection du titre de psychologue)",
      "Article 433-17 du Code pénal (Usurpation de titre réglementé)",
      "Décret n° 90-255 du 22 mars 1990 (Exigence de la licence + maîtrise/master en psychologie + stage professionnel de 500h)",
    ],
    reponseRecommandee:
      "Signalement à la commission déontologique et obligation de mise en demeure. L'usage du qualificatif 'psychologue des organisations' sans inscription au répertoire ADELI/RPPS constitue une usurpation d'un titre protégé par la loi.",
    explicationJuridique:
      "L'usage du titre de psychologue sans posséder les diplômes requis par la loi de 1985 est un délit puni d'un an de prison et de 15 000 euros d'amende. L'adjonction d'un adjectif ('organisationnel', 'd'entreprise', 'du travail') ne contourne pas la loi.",
    piegeExamen:
      "Croire qu'une formation certifiante en coaching ou un diplôme RH permet d'utiliser le mot 'psychologue' : c'est rigoureusement interdit.",
  },
  {
    id: "c3",
    titre: "Détournement d'un Test de Personnalité pour une Promotion",
    contexte:
      "Une entreprise organise une session d'évaluation interne pour pourvoir un poste de directeur commercial. Le psychologue interne fait passer un inventaire de personnalité (ex: Big Five / NEO-PI).",
    demandeTiers:
      "Le directeur général demande au psychologue de lui remettre les scores bruts détaillés et les profils psychologiques complets de tous les candidats non retenus.",
    qualificationAttendue: "manquement_code",
    articlesViolés: [
      "Principe 3 du Code 2021 (Responsabilité et autonomie : le psychologue est seul responsable de ses conclusions)",
      "Principe 4 du Code 2021 (Rigueur méthodologique : les scores bruts sont ininterprétables par des non-psychologues)",
      "Article 15 du Code (Restitution : les résultats ne peuvent être commentés qu'au sujet concerné)",
    ],
    reponseRecommandee:
      "Le psychologue ne doit transmettre à la direction qu'une synthèse d'adéquation au poste, sans jamais divulguer les scores bruts ou les données intimes de personnalité. Il doit obligatoirement réaliser une restitution orale individuelle préalable à chaque candidat.",
    explicationJuridique:
      "Le Code de déontologie interdit formellement de communiquer des protocoles ou données brutes à des tiers non habilités. Seule la conclusion relative aux compétences professionnelles requises peut être transmise.",
    piegeExamen:
      "Oublier l'obligation de restitution préalable au salarié : le sujet a un droit strict à connaître ses conclusions avant son employeur.",
  },
  {
    id: "c4",
    titre: "Double Commande : Expertise CSE et Mission Direction",
    contexte:
      "Un psychologue du travail indépendant est sollicité par la Direction d'une usine pour 'animer un atelier sur la communication bienveillante'.",
    demandeTiers:
      "Trois semaines plus tard, le Comité Social et Économique (CSE) de la même usine le sollicite pour réaliser une expertise légale pour 'Risque Grave' suite à une vague de tentatives de suicide.",
    qualificationAttendue: "manquement_code",
    articlesViolés: [
      "Principe 2 du Code 2021 (Intégrité et probité : prévention des conflits d'intérêts)",
      "Principe 3 du Code 2021 (Préservation de l'indépendance professionnelle)",
      "Article 18 du Code (Le psychologue ne peut accepter une mission si ses liens antérieurs compromettent sa neutralité)",
    ],
    reponseRecommandee:
      "Refuser la mission d'expertise du CSE en expliquant en toute transparence le conflit d'intérêts né de la prestation rémunérée par la direction. Le psychologue doit orienter le CSE vers un confrère ou un cabinet indépendant agréé.",
    explicationJuridique:
      "Le cumul d'une mission de conseil auprès de la direction et d'une expertise agréée CSE dans le même établissement détruit la neutralité et le positionnement tiers indispensable à l'intervention clinique.",
    piegeExamen:
      "Penser qu'on peut rester 'objectif' malgré le double financement : la déontologie exige de refuser pour préserver la confiance des salariés.",
  },
];
