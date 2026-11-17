export interface ClinicalVignette {
  id: string;
  ue: string;
  title: string;
  sector: string;
  streams: string[];
  rawCommand: string;
  terrainObservables: string;
  step1DemandReformulation: string;
  step2PrescribedVsReal: string;
  step3TheoreticalTension: string;
  step4InterventionDevice: string;
}

export const CLINICAL_VIGNETTES: ClinicalVignette[] = [
  {
    id: "case-ehpad-care",
    ue: "PST106 · PST123",
    title:
      "Cas n°1 — EHPAD : « Fatigue compassionnelle » ou empêchement du travail bien fait ?",
    sector: "Secteur Médico-Social · Établissement de 85 résidents",
    streams: [
      "Clinique de l'activité (Clot)",
      "Psychodynamique & Care (Dejours, Molinier)",
    ],
    rawCommand:
      "La direction sollicite un psychologue du travail pour mettre en place des « ateliers de gestion du stress et de prévention de l'épuisement professionnel » à destination des aides-soignantes, suite à une hausse de 18 % des arrêts maladie et à des tensions lors des relèves.",
    terrainObservables:
      "Le chronométrage prescrit alloue 14 minutes par toilette matinale. En observation située, les aides-soignantes interrompent sans cesse leur tâche pour répondre aux sonnettes d'urgence, rassurer un résident désorienté ou aider une collègue novice lors d'un transfert lourd. Les temps de transmission orale de 15 minutes ont été remplacés par un cochage sur tablette numérique.",
    step1DemandReformulation:
      "Déconstruire la commande hygiéniste centrée sur la « fragilité émotionnelle individuelle » des soignantes (refus d'une orthopédie psychologique). Reformuler vers une demande d'analyse des contradictions organisationnelles qui entravent les critères de qualité du soin et privent le collectif de ses espaces de délibération.",
    step2PrescribedVsReal:
      "En mobilisant Leplat & Hoc (1983), on montre que la tâche prescrite (toilette standardisée en 14 min + traçabilité sur tablette) ignore la variabilité intrinsèque du vivant (Wisner, 1995). L'activité réelle implique un arbitrage permanent entre cadence gestionnaire et présence relationnelle. Ce qui fatigue n'est pas ce que les soignantes font, mais ce qu'elles ne peuvent pas faire : l'activité empêchée (Clot, 1999).",
    step3TheoreticalTension:
      "Articulation féconde entre deux courants :\n1. Psychodynamique du travail & Care (Dejours, 1993 ; Molinier, 2013) : la souffrance éthique naît lorsque l'organisation contraint à « bâcler » un soin relationnel, brisant le jugement de beauté des pairs.\n2. Clinique de l'activité (Clot, 2008) : la suppression des relèves orales détruit la dimension transpersonnelle du métier (le genre professionnel), laissant chaque opératrice seule face aux dilemmes.",
    step4InterventionDevice:
      "Institution d'un Comité de Pilotage paritaire (Direction, CSE, Médecin du travail, Encadrement) et d'un groupe de métier de 6 aides-soignantes volontaires (Code de déontologie 2021, Art. 7 & 19). Mise en place d'autoconfrontations croisées sur les séquences de toilette et de relève pour ré-instituer un espace de controverse sur le « soin bien fait ».",
  },
  {
    id: "case-callcenter-script",
    ue: "PST106 · PST120",
    title:
      "Cas n°2 — Plateforme Téléphonique : Scripts prescrits et catachrèses langagières",
    sector: "Relation Client Bancaire · 120 téléconseillers",
    streams: [
      "Analyse dialogique (Vygotski, Bakhtine)",
      "Ergonomie de l'activité",
    ],
    rawCommand:
      "Le responsable qualité déplore le « non-respect des scripts d'appel standardisés » malgré trois sessions de formation, tout en constatant un turnover élevé chez les nouveaux embauchés.",
    terrainObservables:
      "Les téléconseillers expérimentés contournent systématiquement l'arbre de questionnement imposé par le logiciel CRM : ils griffonnent des repères sur un carnet papier et reformulent les phrases juridiques en langage courant pour désamorcer l'agressivité des clients en litige.",
    step1DemandReformulation:
      "Déplacer la commande d'un « problème d'inobservance comportementale du script » vers l'étude des régulations langagières et cognitives indispensables pour tenir simultanément l'objectif de durée moyenne de traitement (DMT) et la résolution effective du litige client.",
    step2PrescribedVsReal:
      "Le script prescrit suppose un interlocuteur standardisé. Or, l'activité langagière réelle (PST120) est foncièrement dialogique (Bakhtine, 1984) : chaque énoncé du conseiller s'ajuste en temps réel aux intonations, à l'incompréhension ou à la colère du destinataire.",
    step3TheoreticalTension:
      "Avec Vygotski (1934/1997), la parole au travail n'est pas l'exécution mécanique d'un texte pré-écrit mais une réalisation de la pensée dans l'interaction. Avec Austin (1970), l'énoncé a une force illocutoire (apaiser, engager). Imposer un script rigide produit un conflit entre le destinataire immédiat (le client) et le surdestinataire gestionnaire (la grille d'écoute).",
    step4InterventionDevice:
      "Co-analyse de transcriptions d'appels anonymisés (avec consentement écrit préalable des conseillers) en séances d'autoconfrontation croisée réunissant anciens et novices afin de formaliser les « ficelles du métier » et de faire évoluer la grille d'évaluation qualité.",
  },
  {
    id: "case-industrie-securite",
    ue: "PST106 · PST123",
    title:
      "Cas n°3 — Maintenance Aéronautique : Infractions de sécurité ou stratégies collectives de défense ?",
    sector: "Industrie Lourde & Maintenance · Atelier de révision mécanique",
    streams: [
      "Psychodynamique du travail (Dejours)",
      "Ergonomie située (Wisner)",
    ],
    rawCommand:
      "Suite à deux presque-accidents, la direction HSE commande une étude sur les « biais cognitifs et la prise de risque volontaire » des techniciens qui retirent ponctuellement leurs gants de protection ou shuntent une étape de consignation.",
    terrainObservables:
      "Certains boulons situés dans des trappes aveugles sont impossibles à sentir tactilement avec les gants épais prescrits. Par ailleurs, une culture de « virilité de métier » tourne en dérision la peur et valorise la vitesse d'exécution lors des pics de remise en ligne des appareils.",
    step1DemandReformulation:
      "Refuser l'explication par l'erreur humaine individuelle ou la négligence. Reformuler la demande autour de deux axes : (1) les incompatibilités technico-ergonomiques des équipements et (2) les mécanismes psychodynamiques collectifs permettant aux opérateurs de tenir face au risque réel.",
    step2PrescribedVsReal:
      "Retirer le gant n'est pas une transgression gratuite mais un compromis opératoire coûteux pour garantir la précision du serrage (qualité perçue du travail) lorsque l'accessibilité mécanique a été mal conçue (ergonomie de correction vs conception — Daniellou).",
    step3TheoreticalTension:
      "Mobilisation centrale de Dejours (1993) : face à un risque résiduel irréductible, le collectif élabore une stratégie collective de défense (déni de la vulnérabilité, bravade virile) pour conjurer la peur. Mais ce bouclier psychique devient ambivalent lorsqu'il aveugle sur le danger physique. En contrepoint, Clot (2008) invite à transformer cette défense en controverse technique sur les gestes sûrs.",
    step4InterventionDevice:
      "Combinaison d'observations ergonomiques des postures en situation réelle et d'une enquête de psychodynamique du travail (collectif de volontaires, élaboration de l'expérience subjective du risque, validation intégrale du rapport par le groupe avant présentation au CSSCT).",
  },
  {
    id: "case-digital-ia-cobots",
    ue: "PST124 · PST106",
    title:
      "Cas n°4 — Déploiement d'un ERP / IA Prédictive : Genèse instrumentale et catachrèses",
    sector: "Logistique Pharmaceutique · Ordonnancement & Préparation",
    streams: [
      "Approche instrumentale (Rabardel)",
      "Clinique de l'usage (Bobillier Chaumon)",
    ],
    rawCommand:
      "La direction des systèmes d'information (DSI) sollicite un accompagnement au changement face à la « résistance au numérique » des planificateurs qui continuent d'utiliser des fichiers Excel parallèles malgré le déploiement d'un algorithme d'ordonnancement par IA.",
    terrainObservables:
      "L'algorithme réalloue automatiquement les priorités toutes les 10 minutes sans afficher ses critères de calcul (boîte noire). Pour éviter la désorganisation des quais en cas d'aléa transporteur, les planificateurs neutralisent certaines alertes et maintiennent un tableur partagé clandestin.",
    step1DemandReformulation:
      "Dépasser le mythe de la « résistance psychologique au changement ». Reformuler vers l'analyse de l'acceptabilité située et des entraves à la genèse instrumentale de ce nouvel artefact algorithmique (Bobillier Chaumon, 2021).",
    step2PrescribedVsReal:
      "Distinction fondamentale de Rabardel (1995) : la DSI a livré un artefact technique (le logiciel), mais celui-ci ne devient un instrument psychologique que s'il s'enrichit des schèmes d'utilisation des opérateurs (instrumentation + instrumentalisation).",
    step3TheoreticalTension:
      "Les tableurs clandestins ne sont pas du sabotage mais des catachrèses régulatrices permettant de préserver l'intelligibilité de la situation et le pouvoir d'agir face à l'opacité algorithmique. Sans marge d'instrumentalisation, la technologie produit une intensification techno-induite et une perte de sens.",
    step4InterventionDevice:
      "Mise en place d'un dispositif de conception participative et de simulation ergonomique réunissant concepteurs DSI et planificateurs autour de scénarios réels d'aléas, afin de redonner la main aux opérateurs sur le paramétrage des règles de priorité.",
  },
  {
    id: "case-parcours-bilan-sosie",
    ue: "PST108 · PST120",
    title:
      "Cas n°5 — Reconversion & Usure Professionnelle : Instruction au sosie et conceptualisation",
    sector: "Accompagnement des Parcours · Salariés seniors de l'industrie",
    streams: [
      "Didactique professionnelle (Pastré)",
      "Instruction au sosie (Oddone, Clot)",
    ],
    rawCommand:
      "Dans le cadre d'un accord GEPP (Gestion des Emplois et des Parcours Professionnels), la DRH souhaite aider des opérateurs de fabrication ayant 25 ans d'ancienneté à « identifier leurs compétences transférables », ceux-ci affirmant « ne rien savoir faire d'autre qu'appuyer sur des boutons ».",
    terrainObservables:
      "En entretien classique, les opérateurs dévalorisent leur savoir-faire tacite. Pourtant, sur ligne, ils anticipent les dérives thermiques de la machine au bruit et à l'odeur bien avant le déclenchement des capteurs.",
    step1DemandReformulation:
      "Passer d'une logique d'inventaire déclaratif de compétences (référentiel RH abstrait) à une démarche développementale d'explicitation des savoirs d'expérience incorporés et des concepts pragmatiques.",
    step2PrescribedVsReal:
      "Avec Pastré (2011), les compétences critiques résident dans la structure conceptuelle de la situation (diagnostic subtil des variables d'état), devenue inconsciente à force d'incorporation dans l'habitude.",
    step3TheoreticalTension:
      "Mobilisation de l'Instruction au sosie (Oddone et al., 1981 ; Clot, 1999) : la consigne indirecte (« Dis-moi comment je dois m'y prendre pour te remplacer demain sans que personne s'en aperçoive ») oblige le sujet à déplier les micro-décisions invisibles et à prendre conscience de son propre style professionnel.",
    step4InterventionDevice:
      "Dispositif garantissant le volontariat et la propriété exclusive des synthèses par le salarié (Art. L. 6313-4 du Code du travail ; Code de déontologie 2021). Séances d'instruction au sosie retranscrites et commentées par le bénéficiaire pour construire son portefeuille de compétences réelles.",
  },
];
