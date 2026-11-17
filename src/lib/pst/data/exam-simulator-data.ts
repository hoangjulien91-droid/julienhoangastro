export interface ExamSubject {
  ue: string;
  titre: string;
  dureeMinutes: number;
  bareme: string;
  sujet: string;
  criteres: string[];
}

export type Pst108SubExamId = "lucy" | "valls" | "marot" | "complet";

export interface ExamSimulatorSavedState {
  ue: string;
  copieContent: string;
  secondsRemaining: number;
  lastUpdated: string;
}

export const EXAM_STORAGE_KEY = "pst_exam_simulator_v1";

export const EXAM_SUBJECTS: ExamSubject[] = [
  {
    ue: "PST106",
    titre: "Clinique de l'activité & Ergonomie",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« En vous appuyant sur les concepts forgés par Yves Clot et Alain Wisner, démontrez comment l'écart irréductible entre travail prescrit et travail réel constitue à la fois la source des discordances de métier et le levier d'une intervention en auto-confrontation croisée visant à restaurer le pouvoir d'agir. Illustrez votre propos par une situation de travail contrarié de votre choix. »",
    criteres: [
      "Distinction rigoureuse tâche prescrite vs activité réelle (Leplat / Wisner)",
      "Définition du réel de l'activité (l'activité suspendue, empêchée, contrariée)",
      "Articulation dialectique entre Genre professionnel et Style personnel",
      "Déroulement méthodologique précis du cadre d'auto-confrontation (simple puis croisée)",
      "Poste du psychologue : non pas expert prescripteur, mais garant du cadre dialogique",
    ],
  },
  {
    ue: "PST108",
    titre: "Examen 3h00 (3 × 1h00 : Lucy · Valls · Marot)",
    dureeMinutes: 180,
    bareme: "3 × 1h00 = 3h00",
    sujet:
      "L'épreuve officielle de PST108 (3h00) est divisée en 3 sous-épreuves de 1h00 chacune : 1h00 M. Éric LUCY, 1h00 M. Francis VALLS, 1h00 Mme Véronique MAROT. Sélectionne ci-dessous le petit examen de 1h00 à simuler ou l'épreuve complète 3h00.",
    criteres: [
      "Partie 1 (1h00 — É. Lucy) : Pouvoir symbolique (Bourdieu), agir communicationnel (Habermas), reconnaissance (Honneth) & critique de l'insulte",
      "Partie 2 (1h00 — F. Valls) : Contrat de communication (Ghiglione), ethnométhodologie (Garfinkel), faces & stigmate (Goffman) & Méthode IOD sans tri",
      "Partie 3 (1h00 — V. Marot) : Instrument psychologique (Vygotski), sosie/autoconfrontation, variables psychosociales (Abric/Lewin/Razran 1950/Porter)",
      "Gestion stricte du temps : 60 minutes maximum par enseignant (10m lecture + 10m plan + 35m rédaction + 5m relecture)",
    ],
  },
  {
    ue: "PST120",
    titre: "Psychodynamique du travail & RPS",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« La dynamique de la reconnaissance constitue le pivot de la transformation de la souffrance en plaisir au travail. Développez l'architecture des deux jugements (jugement d'utilité et jugement de beauté) théorisée par Christophe Dejours. Quels sont les effets psychopathologiques de la défaillance de ces jugements et comment émergent les idéologies défensives collectives ? »",
    criteres: [
      "Définition de l'expérience du réel comme résistance du monde physique/social",
      "Distinction nette jugement d'utilité (hiérarchie) vs jugement de beauté (pairs)",
      "Mécanismes des stratégies collectives de défense (virilisme, cynisme, déni partagé)",
      "Impact des nouvelles formes d'organisation du travail (NPM, reporting permanent)",
      "Cadre de l'enquête en psychodynamique : demande, volontariat, restitution",
    ],
  },
  {
    ue: "PST123",
    titre: "Déontologie & Bilan de compétences",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« Dans le cadre d'un bilan de compétences prescrit et financé par l'employeur dans un contexte de restructuration, la direction des ressources humaines exige la communication des conclusions détaillées et des tests de personnalité du salarié. Analysez la situation au regard des principes du Code de déontologie des psychologues (1996/2021) et du Code du travail. Quelle conduite tenez-vous ? »",
    criteres: [
      "Respect du secret professionnel et confidentialité absolue du document de synthèse",
      "Propriété exclusive des résultats du bilan au seul bénéficiaire (Art. L. 6313-4 C. Travail)",
      "Principe fondamental d'indépendance professionnelle et de libre arbitre du psychologue",
      "Refus d'instrumentalisation de l'évaluation à des fins de gestion managériale ou de licenciement",
      "Gestion de la restitution tripartite : accord préalable et explicite du bénéficiaire",
    ],
  },
  {
    ue: "PST124",
    titre: "Transformations numériques & Usages situés",
    dureeMinutes: 120,
    bareme: "Noté sur 20 points",
    sujet:
      "« L'introduction d'un outil algorithmique d'intelligence artificielle ou d'un progiciel ERP est fréquemment planifiée selon des critères d'acceptabilité a priori. À la lumière de la théorie de la genèse instrumentale de Pierre Rabardel et des travaux de Bobillier Chaumon sur l'acceptation située, montrez comment les salariés réinventent l'usage et pourquoi les ruses de métier sont indispensables au fonctionnement du système socio-technique. »",
    criteres: [
      "Distinction conceptuelle artefact technique vs instrument psychologique (Rabardel)",
      "Double mouvement de la genèse instrumentale : instrumentation et instrumentalisation",
      "Modèle de l'acceptation située face à l'écologie vivante du travail réel",
      "Rôle des catachrèses et détournements créatifs comme indicateurs de vitalité",
      "Risques de la charge mentale, de l'intensification et de l'invisibilisation du travail réel",
    ],
  },
];

export const PST108_SUBEXAMS: Record<
  Pst108SubExamId,
  {
    shortLabel: string;
    titre: string;
    dureeMinutes: number;
    bareme: string;
    sujet: string;
    criteres: string[];
  }
> = {
  lucy: {
    shortLabel: "1h00 É. Lucy",
    titre: "PST108 · Sous-épreuve M. Éric LUCY (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« L'acte de langage ne tient jamais sa force des mots seuls mais de l'autorité déléguée par l'institution. » À partir de la critique d'Austin par Pierre Bourdieu et des apports de Jürgen Habermas et d'Axel Honneth, analysez comment une parole professionnelle au travail peut à la fois exercer une violence symbolique ou restaurer un espace délibératif et de reconnaissance.",
    criteres: [
      "Critique bourdieusienne de l'illusion linguistique d'Austin (Ce que parler veut dire, 1982)",
      "Acte d'institution et légitimité sociale du porte-parole (sceptre d'Homère / lit de justice de Sarah Hanley)",
      "Distinction nette Agir stratégique vs Agir communicationnel et 4 prétentions à la validité (Habermas)",
      "3 sphères de reconnaissance d'Axel Honneth (amour, droit, estime sociale) et lutte contre le mépris",
      "Gestion serrée du format 1h00 : problématisation rapide et exemples situés (ex. SAMU social, insulte)",
    ],
  },
  valls: {
    shortLabel: "1h00 F. Valls",
    titre: "PST108 · Sous-épreuve M. Francis VALLS (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« Le stigmate et l'échec d'une communication professionnelle ne sont jamais des défauts individuels isolés mais des productions interactionnelles et organisationnelles. » En articulant Erving Goffman (Scène, Coulisses, Face, Stigmate) et la Méthode IOD (Castra & Valls), montrez comment l'intervenant agit sur les conditions réelles d'interaction plutôt que de trier ou corriger l'individu.",
    criteres: [
      "Articulation rigoureuse du modèle théâtral de Goffman (Scène / Coulisses / Distance au rôle / Figuration)",
      "Stigmate comme rapport social lors des contacts mixtes et indifférence civique (1963)",
      "Allants de soi et asynchronie interlocutoire (Garfinkel) ou tensions de justice (Dubet)",
      "Méthode IOD : refus absolu du tri préalable et négociation sur les contraintes réelles du poste",
      "Cadence 1h00 : articulation clinique du cas sans survol superficiel",
    ],
  },
  marot: {
    shortLabel: "1h00 V. Marot",
    titre: "PST108 · Sous-épreuve Mme Véronique MAROT (1h00)",
    dureeMinutes: 60,
    bareme: "Sous-épreuve 1h00 / 3h00",
    sujet:
      "« En situation d'entretien ou de travail, le locuteur n'émet jamais un message neutre : son énonciation est traversée par ses cadres psychosociaux, sa représentation de soi et son rapport à l'adresse. » Mobilisez l'expérience de Gregory Razran (1950), les variables psychosociologiques d'Abric/Lewin et l'approche clinique (Vygotski, Sosie ou Porter) pour montrer comment conduire un entretien professionnel sans enfermer l'interlocuteur.",
    criteres: [
      "Protocole complet de Razran (1950) et fonction anticipatrice des préjugés / stéréotypes",
      "Tension Moi intime vs Moi public et effets de la rigidité de rôle en entretien",
      "Variables des acteurs (Anzieu & Martin / Abric 1999), 4 mécanismes de défense (Lewin) et biais de l'influence",
      "Dialogue comme instrument psychologique et développemental (Vygotski, Sosie, Autoconfrontation ou attitudes de Porter)",
      "Méthode de copie 'déplier la pensée' en 1h00 : justifier chaque auteur par un exemple clinique",
    ],
  },
  complet: {
    shortLabel: "3h00 Complet",
    titre: "PST108 · Épreuve Complète 3h00 (3 × 1h00 enchaînés)",
    dureeMinutes: 180,
    bareme: "Épreuve complète 3h00 (3 × 1h00)",
    sujet:
      "Simulation intégrale de l'examen terminal de PST108 (3h00) : composez successivement les 3 sous-épreuves de 1h00 — Partie 1 (M. Éric LUCY : Bourdieu / Habermas / Honneth), Partie 2 (M. Francis VALLS : Goffman / Garfinkel / Dubet / IOD) et Partie 3 (Mme Véronique MAROT : Vygotski / Sosie / Abric / Lewin / Razran 1950 / Porter).",
    criteres: [
      "Partie 1 traitée en ≤ 60 min (cadre socio-critique & délibératif d'Éric Lucy)",
      "Partie 2 traitée en ≤ 60 min (cadre interactionniste & IOD de Francis Valls)",
      "Partie 3 traitée en ≤ 60 min (cadre développemental & psychosocial de Véronique Marot)",
      "Clarté des 3 sous-copies distinctes avec concepts définis et exemples situés dans chaque partie",
    ],
  },
};
