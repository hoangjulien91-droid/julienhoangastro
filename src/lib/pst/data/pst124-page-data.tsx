import type { DebatAxis } from "@/components/pst/modules/shared/panels/Debats";
import type {
  BonusAuthorCard,
  BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";

export const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "dejours", label: "Bobillier Chaumon (Usage)" },
  { key: "precurseurs", label: "Rabardel (Instrument)" },
  { key: "molinier", label: "Engeström (Activité)" },
  { key: "management", label: "Acceptabilité & Algorithme" },
];

export const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "dejours", label: "Bobillier Chaumon" },
  { key: "precurseurs", label: "Rabardel" },
  { key: "molinier", label: "Engeström" },
  { key: "management", label: "Acceptabilité & Algorithme" },
];

export const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "L'Artefact" },
  { key: "dejours", label: "La Genèse" },
  { key: "molinier", label: "L'Acceptation" },
  { key: "management", label: "Pouvoir d'agir" },
];

export const RECITS_COLORS: Record<string, string> = {
  precurseurs: "var(--precurseurs)",
  dejours: "var(--dejours)",
  molinier: "var(--molinier)",
  management: "var(--management)",
};

export const CARD_AXES = ["precurseurs", "dejours", "molinier", "management"];

export const EXAM_DATE = getExamDateTime("pst124") ?? "";
export const EXAM_LABEL = getExamLabel("pst124") ?? "";

export const PST124_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Évaluation des technologies",
    title:
      "Acceptabilité a priori (TAM/UTAUT) vs Acceptation située (Bobillier Chaumon & Dubois)",
    tension:
      "Les modèles nord-américains (TAM de Davis, UTAUT) évaluent l'adoption d'un outil a priori via « l'utilité perçue » et la « facilité d'utilisation » d'un utilisateur rationnel isolé. Bobillier Chaumon montre que l'acceptation se construit a posteriori, dans et par l'activité réelle, face aux contradictions et aux aléas du travail.",
    example:
      "Montrer que la « résistance au changement » est souvent un faux diagnostic qui masque une technologie inadaptée à l'activité, et déployer la grille des 4 dimensions (utilité, utilisabilité, intégration socio-organisationnelle, signification identitaire) pour le démontrer.",
    exampleColor: "var(--molinier)",
  },
  {
    axis: "Axe 2 — Pouvoir de développement de l'outil",
    title: "Technologie Capacitante vs Technologie Incapacitante",
    tension:
      "Toute copie doit s'articuler autour de ces deux trajectoires. Soit l'outil développe les compétences, augmente l'autonomie et le pouvoir d'agir, soutient l'apprentissage et le collectif (technologie capacitante). Soit il réduit les compétences (taylorisme numérique), renforce le contrôle et la surveillance, isole l'opérateur et fige les pratiques (technologie incapacitante).",
    example:
      "Démontrer qu'une même IA d'aide à la décision peut être capacitante (elle outille le jugement du professionnel) ou incapacitante (elle dicte la décision et déqualifie), selon la place laissée au pouvoir d'agir dans sa conception.",
    exampleColor: "var(--sante)",
  },
  {
    axis: "Axe 3 — Déplacement de la prescription",
    title:
      "Prescription managériale (le chef d'atelier) vs Prescription algorithmique (le code)",
    tension:
      "Le management algorithmique déplace la prescription : le rythme et l'organisation ne sont plus dictés par un manager humain (négociable, visible) mais codés dans le logiciel ou pilotés par un algorithme de scoring (opaque, continu). La clinique de l'usage cherche à rouvrir des espaces de délibération sur ces outils.",
    example:
      "Analyser le pilotage des livreurs ou chauffeurs de plateforme par l'application (notation client, dispatching automatique) comme une prescription invisibilisée qui supprime toute marge de manœuvre et toute discussion.",
    exampleColor: "var(--management)",
  },
  {
    axis: "Axe 4 — Unité d'analyse",
    title:
      "Le couple Sujet-Instrument (Rabardel) vs Le Système d'activité (Engeström)",
    tension:
      "Rabardel centre l'analyse sur la genèse instrumentale : comment un sujet transforme un artefact en instrument (instrumentation / instrumentalisation). Engeström élargit la focale au système d'activité entier (sujet, objet, outil, règles, communauté, division du travail) et aux contradictions systémiques qu'une technologie y introduit.",
    example:
      "Analyser l'introduction d'un ERP non comme un simple changement d'outil (Rabardel), mais comme une perturbation de tout le système d'activité d'un service (Engeström) générant des contradictions dans la division du travail.",
    exampleColor: "var(--precurseurs)",
  },
];

export const PST124_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Selon Lucy Suchman (action située), un plan ou une prescription logicielle :",
    opts: [
      "Détermine entièrement le déroulement de l'action",
      "Ne détermine jamais l'action, qui se reconfigure selon les circonstances locales",
      "Doit être appliqué à la lettre pour réussir",
    ],
    ok: 1,
    expl: "L'action située montre que l'usage déborde toujours la conception : c'est un fondement de l'acceptation située.",
  },
  {
    q: "Pour Bruno Latour (théorie de l'acteur-réseau), les objets techniques :",
    opts: [
      "Sont des outils parfaitement neutres",
      "Sont des actants qui prescrivent des comportements et redistribuent l'action",
      "N'ont aucune influence sur les humains",
    ],
    ok: 1,
    expl: "Latour invite à nuancer le déterminisme technologique tout en reconnaissant que l'artefact embarque un « script » d'action.",
  },
  {
    q: "Le « pouvoir d'agir » d'Yves Clot, mobilisé en clinique de l'usage, désigne :",
    opts: [
      "La capacité à agir et transformer son activité et ses outils, dont l'empêchement nuit à la santé",
      "Le pouvoir hiérarchique du manager sur l'équipe",
      "La puissance de calcul d'un système informatique",
    ],
    ok: 0,
    expl: "Quand l'activité est empêchée par un outil rigide, c'est le pouvoir d'agir qu'il faut restaurer (pont direct avec PST106).",
  },
];

export const PST124_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Lucy Suchman — L'action située (Plans and Situated Actions)",
    color: "var(--sante)",
    body: (
      <>
        Les plans (et donc les prescriptions logicielles) ne déterminent jamais
        l&apos;action : celle-ci se reconfigure en permanence selon les
        circonstances locales. L&apos;usage déborde toujours la conception.
        <br />
        <i>Où l&apos;utiliser :</i> Pour fonder épistémologiquement l&apos;«
        acceptation située » : c&apos;est la situation réelle, et non
        l&apos;intention de l&apos;utilisateur, qui révèle l&apos;usage.
      </>
    ),
  },
  {
    title: "Bruno Latour — Théorie de l'acteur-réseau et agentivité des objets",
    color: "var(--precurseurs)",
    body: (
      <>
        Les objets techniques ne sont pas neutres : ils sont des actants qui
        prescrivent des comportements et redistribuent l&apos;action entre
        humains et non-humains.
        <br />
        <i>Où l&apos;utiliser :</i> Pour nuancer le « déterminisme technologique
        » tout en rappelant qu&apos;un artefact embarque bien un programme
        d&apos;action (un script) imposé à l&apos;usager.
      </>
    ),
  },
  {
    title: "Yves Clot — Pouvoir d'agir et activité empêchée",
    color: "var(--molinier)",
    body: (
      <>
        La santé au travail se mesure au pouvoir d&apos;agir : quand
        l&apos;activité est empêchée (par un outil rigide), le sujet est privé
        de la possibilité de bien faire son métier.
        <br />
        <i>Où l&apos;utiliser :</i> Pont direct avec PST106 et avec la clinique
        de l&apos;usage (Bobillier Chaumon &amp; Clot) : restaurer le pouvoir
        d&apos;agir numérique des professionnels.
      </>
    ),
  },
];

export const PST124_ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "① La double trajectoire technologique (boussole de l'examen)",
    headers: [
      "Étape / Direction",
      "Technologie capacitante",
      "Technologie incapacitante",
    ],
    rows: [
      [
        "Point de départ",
        "Artefact soumis à l'épreuve de l'acceptation située",
        "Artefact imposé, prescription codée dans le logiciel",
      ],
      [
        "Dynamique d'usage",
        "Genèse instrumentale, appropriation et braconnage assumés",
        "Management algorithmique, surveillance et invisibilisation du travail réel",
      ],
      [
        "Effet sur le collectif",
        "Soutien du collectif et des espaces de délibération",
        "Isolement, perte des espaces informels, technostress",
      ],
      [
        "Résultat final",
        "Développement du pouvoir d'agir ➔ instrument capacitant",
        "Déqualification, activité empêchée ➔ taylorisme numérique",
      ],
    ],
  },
  {
    sectionTitle: "② Les concepts clés du syllabus",
    headers: ["Concept", "Définition d'examen / Auteur principal"],
    rows: [
      [
        "Clinique de l'usage",
        "Analyse compréhensive et transformatrice des situations médiatisées pour restaurer le pouvoir d'agir (Bobillier Chaumon & Clot).",
      ],
      [
        "Acceptation située",
        "Appropriation construite dans et par l'activité réelle, a posteriori (Bobillier Chaumon & Dubois).",
      ],
      [
        "Acceptabilité (TAM/UTAUT)",
        "Évaluation a priori de l'intention d'usage (utilité perçue, facilité), critiquée car elle ignore le travail réel.",
      ],
      [
        "Genèse instrumentale",
        "Passage de l'artefact à l'instrument par instrumentation et instrumentalisation (Rabardel).",
      ],
      [
        "Système d'activité",
        "Sujet-Objet-Outil + règles, communauté, division du travail ; lieu de contradictions systémiques (Engeström).",
      ],
      [
        "Les 4 dimensions",
        "Utilité, utilisabilité, intégration socio-organisationnelle, signification identitaire (Bobillier Chaumon).",
      ],
      [
        "Management algorithmique",
        "Prescription du travail déplacée du manager vers le code (scoring, dispatching, surveillance).",
      ],
      [
        "Invisibilisation",
        "Masquage du travail d'articulation et de régulation derrière l'illusion du « clic magique ».",
      ],
      [
        "Capacitant / incapacitant",
        "Boussole du pouvoir de développement de l'outil : autonomie & collectif vs contrôle & déqualification.",
      ],
      [
        "Conception continuée",
        "Le projet IT se poursuit dans l'usage ; rouvrir des espaces de délibération après le déploiement.",
      ],
    ],
  },
];
