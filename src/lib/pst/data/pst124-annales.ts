/**
 * PST124 — Transformations digitales, usages et acceptation située (Semestre 2)
 * Annales officielles, sujets types d'examen & corrigés d'excellence (18+/20)
 *
 * Enseignant responsable : Pr. Marc-Éric BOBILLIER-CHAUMON (Chaire de Psychologie du Travail Cnam)
 * Références majeures :
 * - Marc-Éric BOBILLIER-CHAUMON (Clinique de l'usage, acceptation située, 4 dimensions, technologies capacitantes)
 * - Pierre RABARDEL (Genèse instrumentale, artefact vs instrument, instrumentation / instrumentalisation, schèmes d'utilisation)
 * - Yrjö ENGESTRÖM (Système d'activité, contradictions systémiques, apprentissage expansif)
 * - Lucy SUCHMAN (Action située vs plans, critique de l'IA cognitiviste)
 * - Bernard STIEGLER (Le Pharmakon technologique, prolétarisation des savoirs de métier)
 */

export interface AnnalePst124Item {
  id: string;
  session: string;
  type: "dissertation" | "cas" | "rabardel" | "bobillier" | "engestrom" | "algorithme";
  titre: string;
  contexteCitation?: string;
  questions: string[];
  criteres: string[];
  planConseille: {
    partie: string;
    sousParties: string[];
  }[];
  corrigeExcellence: string;
  piegesAEviter: string[];
  conceptsCles: string[];
}

export const ANNALES_PST124: AnnalePst124Item[] = [
  {
    id: "pst124-annale-01",
    session: "Option A — Dissertation théorique",
    type: "bobillier",
    titre: "Sujet 1 : De l'acceptabilité a priori à l'acceptation située — Renversement paradigmatique en ergonomie des usages",
    contexteCitation:
      "« L'évaluation de l'adoption d'un outil technologique ne se décrète pas avant l'usage par des questionnaires d'intention rationnels. L'acceptation n'est jamais un état préalable, elle est un processus situé qui se construit a posteriori dans et par l'activité réelle, face aux contradictions et aux arbitrages du travail. » (Marc-Éric Bobillier-Chaumon, Décrypter les usages numériques au travail, 2021).",
    questions: [
      "Pourquoi les modèles d'acceptabilité technologique nord-américains (TAM de Davis, UTAUT) se révèlent-ils insuffisants pour prédire les usages et les rejets réels en situation de travail ?",
      "Développez la grille des quatre dimensions de l'acceptation située (Bobillier-Chaumon) et montrez en quoi la clinique de l'usage permet de concevoir des technologies capacitantes pour le pouvoir d'agir des professionnels.",
    ],
    criteres: [
      "Critiquer rigoureusement le modèle TAM (Technology Acceptance Model) : utilisateur rationnel isolé, évaluation décontextualisée a priori (utilité et facilité d'utilisation perçues), déterminisme technologique sous-jacent.",
      "Déployer le renversement théorique : l'acceptation située se construit à l'épreuve du travail réel (Bobillier-Chaumon & Dubois).",
      "Détailler les 4 dimensions de la grille de diagnostic : 1) Utilité pour l'activité, 2) Utilisabilité cognitive et motrice, 3) Intégration socio-organisationnelle (collectif, coopération), 4) Signification identitaire et professionnelle (pouvoir faire du beau travail).",
      "Mobiliser la distinction entre technologies capacitantes (développement de l'autonomie et des compétences) et incapacitantes (taylorisme numérique, déqualification, surveillance).",
      "Conclure sur la démarche de conception continuée dans l'usage et les espaces de délibération sur les outils numériques.",
    ],
    planConseille: [
      {
        partie: "I. LA CRITIQUE DE L'ACCEPTABILITÉ A PRIORI : LES IMPASSES DU MODÈLE DU CONSOMMATEUR RATIONNEL",
        sousParties: [
          "A. Les postulats réducteurs du TAM et de l'UTAUT : l'illusion de l'évaluation décontextualisée et la psychologisation de la « résistance ».",
          "B. Le démenti du terrain : pourquoi un outil jugé « utile et facile » sur maquette est massivement rejeté dans l'activité réelle.",
        ],
      },
      {
        partie: "II. LA CLINIQUE DE L'USAGE ET LA GRILLE DES QUATRE DIMENSIONS DE L'ACCEPTATION SITUÉE",
        sousParties: [
          "A. Les quatre épreuves de l'appropriation : opératoire, organisationnelle, identitaire et subjective.",
          "B. De l'outil incapacitant au milieu capacitant : restaurer le pouvoir d'agir par la conception continuée dans l'usage.",
        ],
      },
    ],
    corrigeExcellence:
      "La transformation numérique des entreprises est trop souvent pensée selon une ingénierie descendante où la technologie est conçue par des experts hors-sol, puis imposée à des salariés sommés de « s'adapter ». Lorsque des dysfonctionnements apparaissent, le management invoque quasi systématiquement la « résistance au changement » des utilisateurs.\n\n" +
      "1. La critique épistémologique du modèle TAM :\n" +
      "Les théories dominantes de l'adoption technologique, issues des sciences de gestion nord-américaines (TAM de Fred Davis, 1989 ; UTAUT de Venkatesh, 2003), postulent que l'intention d'usage dépend de deux variables : l'utilité perçue et la facilité d'utilisation perçue. Ces modèles reposent sur la fiction d'un utilisateur individuel, libre de choisir son outil, calculant rationnellement le rapport coût/bénéfice d'un clic. Or, dans le monde du travail salarié, les technologies sont prescrites et imposées. Un logiciel peut être parfaitement « utilisable » au sens ergonomique de l'interface (ISO 9241) tout en étant destructeur pour l'organisation du travail et le métier.\n\n" +
      "2. Le paradigme de l'acceptation située (Bobillier-Chaumon) :\n" +
      "Marc-Éric Bobillier-Chaumon opère un renversement : l'acceptation ne préexiste pas à l'activité, elle est située et émerge de l'épreuve des contraintes réelles. Pour la diagnostiquer, il propose une grille en 4 dimensions interdépendantes :\n" +
      "1. Dimension opératoire (l'utilité réelle) : l'outil permet-il de résoudre les aléas imprévus et la variabilité du travail réel ?\n" +
      "2. Dimension ergonomique (l'utilisabilité) : la charge mentale, les interruptions et le flux d'informations restent-ils soutenables ?\n" +
      "3. Dimension socio-organisationnelle : l'outil favorise-t-il l'entraide et la coopération, ou isole-t-il les opérateurs derrière leurs écrans ?\n" +
      "4. Dimension identitaire et professionnelle : l'outil valorise-t-il les savoir-faire et permet-il de faire un « beau travail » reconnu, ou dépossède-t-il le travailleur de son jugement professionnel ?\n" +
      "Si l'outil échoue sur la dimension identitaire (ex. algorithme qui dicte les décisions sans explication), il devient une technologie incapacitante (taylorisme numérique). La clinique de l'usage préconise donc de considérer les contournements et braconnages non comme des fautes, mais comme des analyseurs précieux pour ouvrir des espaces de délibération et mettre en œuvre une conception continuée dans l'usage.",
    piegesAEviter: [
      "Réduire l'acceptation située à la seule ergonomie d'interface (couleurs des boutons, lisibilité de la police).",
      "Valider le diagnostic managérial de 'résistance au changement' qui masque l'inadéquation de l'outil à l'activité.",
      "Oublier la dimension identitaire (le sentiment d'être déqualifié ou infantilisé par l'algorithme).",
    ],
    conceptsCles: [
      "Acceptation située vs acceptabilité a priori",
      "Modèle TAM / UTAUT",
      "4 dimensions de l'acceptation (Bobillier-Chaumon)",
      "Technologie capacitante vs incapacitante",
      "Pouvoir d'agir numérique",
      "Conception continuée dans l'usage",
    ],
  },
  {
    id: "pst124-annale-02",
    session: "Option A — Dissertation théorique",
    type: "rabardel",
    titre: "Sujet 2 : La genèse instrumentale — De l'artefact technique à l'instrument du sujet",
    contexteCitation:
      "« L'outil ne se réduit jamais à sa matérialité physique ou logicielle. Un artefact n'est pas d'emblée un instrument : il ne le devient qu'au terme d'une genèse instrumentale par laquelle le sujet élabore des schèmes d'utilisation ou adapte l'objet à ses propres fins. » (Pierre Rabardel, Les hommes et les technologies : approche cognitive des instruments contemporains, 1995).",
    questions: [
      "Distinguez rigoureusement les notions d'artefact et d'instrument selon la théorie de Pierre Rabardel.",
      "Explicitez les deux mouvements constitutifs de la genèse instrumentale (l'instrumentation et l'instrumentalisation). Comment le concept de catachrèse permet-il d'analyser les détournements et braconnages au travail ?",
    ],
    criteres: [
      "Définir l'artefact comme l'objet technique prescrit (matériel ou logiciel), neutre et extérieur au sujet.",
      "Définir l'instrument comme une entité mixte : Artefact + Schèmes d'utilisation (organisations invariantes de l'activité du sujet).",
      "Détailler le processus d'instrumentation : orienté vers le sujet, transformation et enrichissement des schèmes cognitifs de l'opérateur par l'outil.",
      "Détailler le processus d'instrumentalisation : orienté vers l'artefact, transformation, adaptation, personnalisation et détournement de l'objet technique par le travailleur.",
      "Expliquer la catachrèse instrumentale : assignation d'une fonction nouvelle non prévue par les concepteurs (ex. détourner un tableur ou bricoler une interface), preuve de la vitalité créatrice du travailleur face aux lacunes du prescrit.",
    ],
    planConseille: [
      {
        partie: "I. LA DOUBLE NATURE DE L'INSTRUMENT : DÉPASSER LE MATÉRIALISME TECHNOLOGIQUE",
        sousParties: [
          "A. L'artefact prescrit vs l'instrument vécu : l'instrument comme entité mixte couplant l'objet technique et les schèmes du sujet.",
          "B. Le rôle des schèmes d'utilisation (Piaget, Rabardel) : assimilation de l'outil et accommodation de l'activité.",
        ],
      },
      {
        partie: "II. LES DEUX MOTEURS DE LA GENÈSE INSTRUMENTALE ET LA CLINIQUE DU BRACONNAGE",
        sousParties: [
          "A. L'instrumentation (vers le sujet) et l'instrumentalisation (vers l'artefact) : une dialectique permanente d'appropriation.",
          "B. La catachrèse et le détournement comme analyseurs de l'activité réelle : sauver la production contre la rigidité logicielle.",
        ],
      },
    ],
    corrigeExcellence:
      "La théorie de la genèse instrumentale développée par Pierre Rabardel en 1995 constitue l'un des piliers majeurs de l'ergonomie cognitive et de la psychologie des usages contemporains. Elle réfute l'illusion positiviste selon laquelle un logiciel ou une machine déployée dans une entreprise serait immédiatement opérationnelle et transparente pour ceux qui l'utilisent.\n\n" +
      "1. L'entité mixte : Artefact et Schèmes d'utilisation :\n" +
      "Pour Rabardel, l'artefact technique (un marteau, un ERP, une IA générative) n'est qu'une proposition technique des concepteurs, extérieure à l'activité. L'instrument, en revanche, n'existe que dans et par l'usage : il est une entité mixte composée d'une composante matérielle ou symbolique (l'artefact) et d'une composante psychologique (les schèmes d'utilisation du sujet). Un schème d'utilisation (notion issue de Piaget et Vergnaud) est une structure cognitive stable qui organise l'action du travailleur : savoir comment cliquer, anticiper les temps de latence, interpréter un message d'erreur.\n\n" +
      "2. La dialectique de la genèse instrumentale :\n" +
      "L'appropriation de l'artefact engage deux dynamiques complémentaires :\n" +
      "- L'instrumentation : le vecteur est dirigé vers le sujet. L'artefact contraint le travailleur, fait évoluer ses habitudes mentales, enrichit ou modifie ses représentations et schèmes d'action.\n" +
      "- L'instrumentalisation : le vecteur est dirigé vers l'artefact. Le sujet adapte l'outil, le paramètre, le bricole, et en détourne parfois l'usage prescrit. Cette réappropriation culmine dans le phénomène de catachrèse instrumentale : l'opérateur utilise l'outil pour une fonction que les concepteurs n'avaient ni prévue ni autorisée (ex. utiliser le champ 'adresse' d'une base de données pour y consigner des alertes relationnelles informelles).\n\n" +
      "En clinique de l'usage, la catachrèse ne doit jamais être sanctionnée comme une fraude : elle est le signal d'un écart irréductible entre prescrit et réel, la preuve vivante que le sujet résiste à l'aliénation algorithmique pour préserver la qualité de son travail.",
    piegesAEviter: [
      "Inverser les définitions d'instrumentation (vers le sujet) et d'instrumentalisation (vers l'artefact).",
      "Considérer la catachrèse comme une erreur ou un bogue au lieu d'une invention cognitive du travailleur.",
      "Réduire l'instrument à un simple objet physique sans inclure les schèmes d'action du travailleur.",
    ],
    conceptsCles: [
      "Artefact vs Instrument",
      "Entité mixte",
      "Schèmes d'utilisation",
      "Instrumentation",
      "Instrumentalisation",
      "Catachrèse instrumentale",
      "Braconnage numérique",
    ],
  },
  {
    id: "pst124-annale-03",
    session: "Option B — Étude de situation de travail / Cas clinique",
    type: "cas",
    titre: "Sujet 3 : Déploiement d'une IA d'assistance au diagnostic et crise du pouvoir d'agir",
    contexteCitation:
      "Étude de cas : Un groupe mutualiste de centres de radiologie médicale introduit un système d'intelligence artificielle fondé sur le deep learning pour pré-analyser les scanners thoraciques. Le logiciel surligne automatiquement en rouge les zones suspectes et génère un pré-compte-rendu textuel que le radiologue n'a théoriquement plus qu'à valider d'un clic pour doubler la cadence d'examen. Dès les premiers mois, les radiologues seniors manifestent un profond malaise : ils se plaignent d'une fatigue visuelle intense, du sentiment de devenir de 'simples tamponneurs de code', et constatent que les jeunes internes perdent leur capacité de détection autonome des anomalies rares non répertoriées dans la base d'entraînement de l'IA. Un collectif de médecins menace de débrayer si l'obligation d'utiliser l'IA n'est pas suspendue.",
    questions: [
      "À partir des concepts de Rabardel, Bobillier-Chaumon et Bernard Stiegler (le Pharmakon), modélisez la crise d'activité vécue par les radiologues.",
      "Analysez en quoi cette IA risque de basculer d'une technologie capacitante en un dispositif de prolétarisation des savoirs médicaux.",
      "Formulez un protocole d'intervention ergonomique fondé sur la conception continuée dans l'usage et la délibération collective.",
    ],
    criteres: [
      "Mobiliser le concept de Pharmakon (Stiegler) : l'IA est à la fois remède (aide à la détection des nodules courants) et poison (destruction de l'attention et des savoirs cliniques).",
      "Expliquer la prolétarisation selon Stiegler : perte du savoir-faire autonome transmise par les anciens aux internes au profit d'une machine propriétaire opaque.",
      "Déployer la grille des 4 dimensions de Bobillier-Chaumon : échec cuisant sur la dimension identitaire (dépossession du jugement diagnostique) et organisationnelle (minutage des actes).",
      "Montrer comment rééquilibrer la genèse instrumentale : passer du pré-diagnostic imposé (diktat algorithmique) à un outil d'interrogation activable sur demande (instrument capacitant au service de l'expertise).",
      "Proposer la constitution d'un comité d'usage pluridisciplinaire (médecins, ergonomes, data scientists) pour réécrire les règles de coopération Homme-IA.",
    ],
    planConseille: [
      {
        partie: "I. MODÉLISATION CLINIQUES DU CAS : LE PHARMAKON DE L'IA ET LA DÉPOSSESSION DU MÉTIER",
        sousParties: [
          "A. Du remède au poison : l'invisibilisation de l'expertise clinique et la prolétarisation des savoirs (Stiegler).",
          "B. Diagnostic par les 4 dimensions : le court-circuit de la Mètis diagnostique et la déqualification des novices.",
        ],
      },
      {
        partie: "II. DÉMARCHE DE TRANSFORMATION : VERS UNE TECHNOLOGIE MÉDICALE CAPACITANTE",
        sousParties: [
          "A. Reconfigurer l'artefact : restaurer l'explicabilité et le droit à la contradiction algorithmique.",
          "B. Installer la conception continuée dans l'usage : espaces de controverse clinique sur les faux positifs/négatifs.",
        ],
      },
    ],
    corrigeExcellence:
      "Ce cas clinique met en lumière avec acuité les tensions contemporaines de l'intelligence artificielle au travail lorsqu'elle est implantée selon un paradigme de substitution plutôt que d'hybridation capacitante.\n\n" +
      "1. Analyse clinique et théorique :\n" +
      "- Le Pharmakon technologique et la prolétarisation (Stiegler) : L'IA d'aide au diagnostic thoracique est typiquement un Pharmakon. Utilisée comme un filtre d'alerte secondaire paramétrable, elle peut sauver des vies en prévenant les oublis dus à la fatigue. Mais prescrite comme un pré-diagnostic obligatoire couplé à une hausse des cadences, elle devient un poison : elle détruit l'attention flottante du radiologue, le prive de l'épreuve du doute clinique et installe une paresse cognitive chez les novices (prolétarisation du savoir médical).\n" +
      "- Échec sur les 4 dimensions (Bobillier-Chaumon) :\n" +
      "  * Opératoire : L'IA échoue sur les cas complexes et atypiques où le radiologue doit aller chercher des indices infimes.\n" +
      "  * Ergonomique : La sur-sollicitation visuelle (zones rouges partout) provoque un biais d'ancrage et une fatigue mentale accrue.\n" +
      "  * Identitaire : Le médecin est rabattu sur un rôle subalterne de valideur juridique de la machine (déresponsabilisation éthique).\n\n" +
      "2. Préconisations d'intervention de l'ergonome / psychologue du travail :\n" +
      "L'objectif de l'intervention est de transformer cet artefact imposé en un instrument capacitant au service du pouvoir d'agir médical :\n" +
      "1. Suspension du compte-rendu pré-rempli : l'IA ne doit pas afficher ses prédictions avant que le radiologue n'ait formulé sa propre lecture initiale (préservation de l'intelligence pratique diagnostique).\n" +
      "2. Fonction 'seconde lecture contradictoire' à la demande : l'IA devient un partenaire consultatif que le médecin active pour confronter son regard en fin d'analyse.\n" +
      "3. Espaces de controverse clinique sur les biais de la base de données : organiser des staffs réguliers où les médecins et les concepteurs de l'IA analysent ensemble les discordances, faisant des soignants des co-concepteurs de l'outil.",
    piegesAEviter: [
      "Rejeter l'IA par technophobie de principe sans identifier ses potentiels capacitants réels.",
      "Se contenter de demander une formation technique des radiologues au lieu de transformer l'architecture d'interaction avec le logiciel.",
    ],
    conceptsCles: [
      "Pharmakon (Stiegler)",
      "Prolétarisation des savoirs",
      "Technologie capacitante vs incapacitante",
      "Clinique de l'usage",
      "Biais d'ancrage algorithmique",
      "Conception continuée dans l'usage",
    ],
  },
];
