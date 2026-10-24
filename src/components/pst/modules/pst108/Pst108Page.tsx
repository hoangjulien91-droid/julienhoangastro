"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import {
  TabsShell,
  groupTabs,
  type TabDef,
} from "@/components/pst/shell/TabsShell";
import { Flashcards } from "@/components/pst/flashcards/Flashcards";
import { Qcm } from "@/components/pst/quiz/Qcm";
import { Pieges } from "@/components/pst/quiz/Pieges";
import { QuiCitations } from "@/components/pst/quiz/QuiCitations";
import { ErrorNotebook } from "@/components/pst/notebook/ErrorNotebook";
import { FeynmanSandbox } from "@/components/pst/feynman/FeynmanSandbox";
import {
  Dashboard,
  type DashboardAdvice,
} from "@/components/pst/modules/shared/panels/Dashboard";
import { Fiches } from "@/components/pst/modules/shared/panels/Fiches";
import { Lexique } from "@/components/pst/modules/shared/panels/Lexique";
import { Distinguer } from "@/components/pst/modules/shared/panels/Distinguer";
import { Cloze } from "@/components/pst/modules/shared/panels/Cloze";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { Simulateur } from "@/components/pst/modules/shared/panels/Simulateur";
import { Frise } from "@/components/pst/modules/shared/panels/Frise";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Mindmap } from "@/components/pst/modules/shared/panels/Mindmap";
import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { Atelier108 } from "./Atelier108";
import { RessourcesEnseignants108 } from "./panels/RessourcesEnseignants108";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import { Examen as SharedExamen } from "@/components/pst/modules/shared/panels/Examen";
import {
  Debats,
  type DebatAxis,
} from "@/components/pst/modules/shared/panels/Debats";
import {
  Bonus,
  type BonusAuthorCard,
  type BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import { Antiseche } from "@/components/pst/modules/shared/panels/Antiseche";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import {
  A,
  CASES,
  CLOZE,
  DISTINGUER,
  FICHES,
  FRISE_DATA,
  KW_DEFS,
  LEXIQUE,
  NODES,
  PARCOURS,
  PIEGES,
  PROTO,
  QCM_DATA,
  QUI,
  REDAC,
  REDAC_ITEMS,
  RECITS,
  SIM,
  ATELIER_SUJETS,
  ANTISECHE_GROUPS,
} from "@/lib/pst/data/pst108";
import { Outils } from "./panels/Outils";

const FICHE_FILTERS = [
  { key: "all", label: "Toutes les fiches (22)" },
  {
    key: "vygotski_piaget",
    label: "1. Vygotski, Piaget & Golse (Théories du langage & Clinique)",
  },
  {
    key: "bourdieu",
    label: "2. Pierre Bourdieu & Éric Lucy (Pouvoir & Insulte)",
  },
  {
    key: "habermas",
    label: "3. Jürgen Habermas (Agir communicationnel & Délibération)",
  },
  { key: "honneth", label: "4. Axel Honneth & SAMU Social (Reconnaissance)" },
  { key: "valls_iod", label: "5. Francis Valls & Denis Castra (Méthode IOD)" },
  {
    key: "linguistique",
    label: "6. Posture Cnam, Langage & Travail & Pragmatique",
  },
];

const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout le lexique" },
  { key: "vygotski_piaget", label: "Vygotski, Piaget & Golse" },
  { key: "bourdieu", label: "Bourdieu & Insulte" },
  { key: "habermas", label: "Habermas & Délibération" },
  { key: "honneth", label: "Honneth & SAMU" },
  { key: "valls_iod", label: "Valls (IOD)" },
  { key: "linguistique", label: "Langage, Travail & Pragmatique" },
];

const CARD_AXES = [
  "vygotski_piaget",
  "bourdieu",
  "habermas",
  "honneth",
  "valls_iod",
  "linguistique",
];
const EXAM_DATE = getExamDateTime("pst108") ?? "";
const EXAM_LABEL = getExamLabel("pst108") ?? "";

const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "vygotski_piaget", label: "Vygotski & Développement" },
  { key: "bourdieu", label: "Pouvoir & Insulte" },
  { key: "habermas", label: "Espace délibératif" },
  { key: "honneth", label: "Reconnaissance (SAMU)" },
  { key: "valls_iod", label: "Négociation IOD" },
  { key: "linguistique", label: "Pragmatique" },
];
const RECITS_COLORS: Record<string, string> = {
  vygotski_piaget: "var(--vygotski_piaget)",
  bourdieu: "var(--bourdieu)",
  habermas: "var(--habermas)",
  honneth: "var(--honneth)",
  valls_iod: "var(--valls_iod)",
  linguistique: "var(--linguistique)",
};

const PST108_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Dans l'analyse du « Lit de justice » par Sarah Hanley (citée par Bourdieu), pourquoi le roi s'exprime-t-il en présence du Parlement ?",
    opts: [
      "Pour engager un débat démocratique et recueillir les contre-propositions des magistrats",
      "Pour suspendre la délégation d'autorité et faire plier le Parlement par sa seule présence royale (acte d'institution)",
      "Pour demander l'avis juridique des avocats parisiens",
    ],
    ok: 1,
    expl: "Le lit de justice incarne le cérémonial du pouvoir absolu : le corps du roi annule toute contestation et impose l'enregistrement forcé des édits.",
  },
  {
    q: "Pourquoi le sociologue Robert Castel a-t-il préfacé l'ouvrage de Denis Castra et Francis Valls sur la Méthode IOD ?",
    opts: [
      "Parce qu'il considère que les chômeurs de longue durée doivent être isolés en centres de réadaptation",
      "Parce que la méthode IOD combat la désaffiliation en intégrant directement les personnes sans tri préalable dans le travail ordinaire",
      "Parce qu'il préconise la suppression pure et simple du salariat",
    ],
    ok: 1,
    expl: "Pour Robert Castel, l'accès à un emploi ordinaire négocié est la condition sine qua non de la citoyenneté sociale et de la protection contre l'exclusion.",
  },
  {
    q: "Selon l'hypothèse d'Edward Sapir et Benjamin Lee Whorf (relativisme linguistique) :",
    opts: [
      "Toutes les langues humaines partagent exactement le même vocabulaire professionnel",
      "La langue façonne les schèmes cognitifs et influence la perception du réel chez ses locuteurs",
      "Le langage n'a aucun lien avec la culture ni avec les pratiques sociales",
    ],
    ok: 1,
    expl: "Sapir-Whorf montre que les catégories de la langue prédéterminent en partie la façon dont les sujets pensent le travail et catégorisent le réel.",
  },
  {
    q: "Quelle différence fondamentale Noam Chomsky établit-il entre « compétence » et « performance » ?",
    opts: [
      "La compétence est le salaire horaire et la performance est le chiffre d'affaires",
      "La compétence est le système abstrait inné de règles grammaticales, la performance est l'usage concret situé de la parole",
      "La compétence n'existe que chez les cadres et la performance chez les ouvriers",
    ],
    ok: 1,
    expl: "Chomsky distingue la compétence linguistique idéale (générative) des performances réelles (souvent critiquée par Bourdieu pour son oubli du social).",
  },
];

const PST108_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Sarah Hanley — Le Lit de justice des rois de France",
    color: "var(--bourdieu)",
    body: (
      <>
        Historienne américaine montrant comment le cérémonial du{" "}
        <i>Lit de justice</i>
        &nbsp;met en scène l&apos;efficacité symbolique de l&apos;État : quand
        le roi siège en majesté, la délibération parlementaire s&apos;éteint
        devant l&apos;institution incarnée.
        <br />
        <i>Où l&apos;utiliser :</i> En dissertation sur Bourdieu pour illustrer
        comment l&apos;autorité statutaire confère aux énoncés leur force
        irrésistible (<i>Status est magistratus</i>).
      </>
    ),
  },
  {
    title: "Robert Castel — Désaffiliation & Droit commun (Préfacier IOD)",
    color: "var(--valls_iod)",
    body: (
      <>
        Théoricien de la société salariale et de la <i>désaffiliation</i>. Il
        préface Denis Castra et Francis Valls (
        <i>L&apos;insertion malgré tout</i>, 2007) en saluant le refus du tri
        des précaires et l&apos;action sur les milieux de travail réels.
        <br />
        <i>Où l&apos;utiliser :</i> Pour justifier sociologiquement la méthode
        IOD : l&apos;insertion n&apos;est pas une mise aux normes psychologiques
        de l&apos;individu, mais une réinsertion dans le droit commun du
        travail.
      </>
    ),
  },
  {
    title: "Edward Sapir & Benjamin Lee Whorf — Le Relativisme linguistique",
    color: "var(--linguistique)",
    body: (
      <>
        L&apos;hypothèse Sapir-Whorf démontre que le langage n&apos;est pas un
        simple reflet de la réalité : sa grammaire et ses catégories structurent
        la manière dont les locuteurs expérimentent et découpent le monde.
        <br />
        <i>Où l&apos;utiliser :</i> Pour appuyer l&apos;analyse
        ethnolinguistique des jargons de métier et des vocabulaires
        organisationnels imposés.
      </>
    ),
  },
  {
    title: "Noam Chomsky — Compétence vs Performance linguistique",
    color: "var(--habermas)",
    body: (
      <>
        Fonde la linguistique générative : la <i>compétence</i> est la maîtrise
        innée d&apos;un système universel de règles formelles, alors que la{" "}
        <i>performance</i> est son actualisation contingente.
        <br />
        <i>Où l&apos;utiliser :</i> Pour opposer la conception internaliste
        universelle de Chomsky à la <i>compétence légitime</i> socialement
        située démontrée par Bourdieu.
      </>
    ),
  },
];

const PST108_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Bourdieu vs Austin",
    title:
      "Pouvoir des mots ou pouvoir des institutions ? (Status est magistratus)",
    tension:
      "John Austin analyse le performatif comme une propriété interne du langage (« quand dire, c'est faire »). Pierre Bourdieu opère une rupture sociologique majeure : les mots ne tirent pas leur pouvoir de la langue ou de la grammaire, mais du mandat institutionnel et des rapports de pouvoir sociaux délégués au locuteur.",
    example:
      "Analyser l'insulte au travail (Éric Lucy, 2021) : elle ne blesse pas par sa sonorité lexicale, mais parce qu'elle actualise un rapport social de domination et un stigmate historique déjà institué.",
    exampleColor: "var(--bourdieu)",
  },
  {
    axis: "Axe 2 — Habermas : Théorie de l'agir",
    title:
      "Agir stratégique (succès & manipulation) vs Agir communicationnel (entente rationnelle)",
    tension:
      "Dans l'agir stratégique, la communication est instrumentalisée pour influencer, séduire ou contraindre autrui à des fins de rentabilité. Dans l'agir communicationnel, les acteurs recherchent une entente coopérative libre (Verständigung) en soumettant leurs arguments aux 4 prétentions à la validité.",
    example:
      "Opposer une rhétorique managériale descendante (agir stratégique masqué) à un véritable espace de controverse délibérative où salariés et encadrants évaluent la justesse et la vérité des règles de travail.",
    exampleColor: "var(--habermas)",
  },
  {
    axis: "Axe 3 — Axel Honneth : Reconnaissance morale",
    title:
      "Les 3 sphères de reconnaissance vs La réification comme oubli d'autrui",
    tension:
      "La dignité et la santé au travail reposent sur l'estime sociale et la reconnaissance de l'utilité du métier. La réification organisationnelle (Honneth, 2007) n'est pas une simple erreur de gestion : c'est un oubli actif de la reconnaissance originaire, réduisant le salarié à une ressource chiffrée.",
    example:
      "L'analyse par Éric Lucy (2020) des maraudes du SAMU social : l'échange verbal redonne au grand exclu son statut de sujet de droit et d'interlocution face à l'invisibilisation sociale.",
    exampleColor: "var(--honneth)",
  },
  {
    axis: "Axe 4 — Francis Valls & Denis Castra",
    title:
      "Idéologie de l'employabilité préalable vs Méthode IOD (intervention directe sans tri)",
    tension:
      "L'idéologie de l'employabilité culpabilise le chômeur en lui imputant un déficit de compétences et en multipliant les stages préparatoires sélectifs. La Méthode IOD (Castra & Valls) renverse cette logique : refus déontologique du tri préalable et négociation directe avec l'entreprise sur le travail réel.",
    example:
      "Montrer qu'un chargé de mission IOD n'évalue pas la personne mais les conditions concrètes du poste de travail pour adapter l'environnement organisationnel à l'intégration durable.",
    exampleColor: "var(--valls_iod)",
  },
];

export function Pst108Page() {
  const { store, bump } = usePstStore("pst108_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
  const [revisionTrigger, setRevisionTrigger] = useState(0);

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = useMemo(
    () => FICHES.map((f, i) => ({ id: "fc_" + i, axis: f.a })),
    [],
  );
  const cartes = useMemo(
    () =>
      FICHES.map((f, i) => ({
        id: "fc_" + i,
        axis: f.a,
        tag: A[f.a as keyof typeof A],
        a: f.ph,
        q: f.t,
        deep: f.ess,
      })),
    [],
  );

  const parcoursData = useMemo(
    () =>
      PARCOURS.map((p) => ({
        id: p.key,
        title: p.titre,
        fenetre: p.fenetre,
        desc: p.but,
        onglets: p.onglets as [string, string][],
        items: p.taches,
      })),
    [],
  );

  function goTab(panel: string) {
    setActiveTab(panel);
  }
  function triggerRevision() {
    setRevisionTrigger((v) => v + 1);
  }

  const axisRows = computeAxisRows(cards, CARD_AXES, store);
  const weak = weakestAxis(axisRows);
  const masteredCards = cards.filter((c) => store.getBox(c.id) >= 4).length;
  const qcmS = store.getScore("qcm");
  const examS = store.getScore("examen");

  let advice: DashboardAdvice;
  if (masteredCards < cards.length * 0.5) {
    advice = {
      title: "Commence par les cartes",
      text: "Passe les concepts de Bourdieu, Habermas, Honneth et Valls en répétition espacée Leitner.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (weak && weak.mast / weak.tot < 0.6) {
    advice = {
      title: "Consolide " + A[weak.ax as keyof typeof A],
      text: "C'est l'axe le moins maîtrisé. Refais ses cartes en ciblant, puis teste-toi.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Teste-toi au QCM",
      text: "Vérifie tes connaissances sur les 5 piliers du cours d'Éric Lucy et Francis Valls.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else if (!examS) {
    advice = {
      title: "Passe en conditions réelles",
      text: "Entraîne-toi sur une dissertation type CNAM (Bourdieu, Habermas, Honneth, IOD) avec auto-évaluation.",
      btn: "Examen blanc",
      panel: "examen",
      leitner: false,
    };
  } else {
    advice = {
      title: "Entraîne-toi sur les cas réels",
      text: "Maîtrise la négociation IOD et les situations concrètes de communication au travail.",
      btn: "Études de cas",
      panel: "cas",
      leitner: false,
    };
  }

  const tabs: TabDef[] = [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
        <div>
          {/* Fil conducteur de l'examen Cnam PST108 */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs mb-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
                <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Fil conducteur de l&apos;examen Cnam</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
                PST108 · Psychologie du langage et clinique du dialogue
              </span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
                Théories du langage (Vygotski vs Piaget) → Pouvoir symbolique (Bourdieu) → Délibération &amp; Reconnaissance (Habermas &amp; Honneth) → Méthode IOD (Valls)
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
                Le langage au travail est un instrument psychologique d&apos;action et de développement (Vygotski) :
                il engage la clinique du dialogue et la dispute professionnelle (Clot), des rapports de pouvoir institués (Bourdieu),
                l&apos;agir communicationnel (Habermas), la reconnaissance morale (Honneth) et la négociation sur le travail réel sans tri préalable (Valls &amp; Castra).
              </p>
            </div>
          </div>
          <Dashboard
            store={store}
            cards={cards}
            ficheCount={FICHES.length}
            authors={A}
            cardAxes={CARD_AXES}
            streakHint="Reviens chaque jour pour ancrer la psychologie du langage, la clinique du dialogue et la méthode IOD."
            toolboxTitle="Boîte à Outils d'Excellence PST108"
            toolboxDesc={
              <>
                Explore la <b>cartographie conceptuelle</b> (Bourdieu, Habermas,
                Honneth, IOD) et ordonne les étapes méthodologiques d&apos;une{" "}
                <b>intervention IOD en entreprise</b>.
              </>
            }
            mindmapLabel="Voir la cartographie"
            protocoleLabel="Ordonner l'intervention IOD"
            advice={advice}
            onStoreChange={bump}
            onGoTab={goTab}
            onTriggerRevision={triggerRevision}
          />
        </div>
      ),
    },
    {
      id: "fiches",
      label: "Fiches",
      content: (
        <Fiches
          store={store}
          onStoreChange={bump}
          data={FICHES}
          filters={FICHE_FILTERS}
          hint="Les 22 fiches condensées du cours PST108 (Vygotski, Piaget, Golse, Boutet, Bourdieu, Habermas, Honneth, Valls IOD). Clique pour déplier les détails."
        />
      ),
    },
    {
      id: "lexique",
      label: "Lexique",
      content: (
        <Lexique
          data={LEXIQUE}
          filters={LEXIQUE_FILTERS}
          authors={A}
          hint="Dictionnaire interactif des 38 concepts fondamentaux de la psychologie du langage, de la clinique du dialogue et de la méthode IOD."
        />
      ),
    },
    {
      id: "ressources",
      label: "Ressources profs ✦",
      content: <RessourcesEnseignants108 />,
    },
    {
      id: "cartes",
      label: "Cartes",
      content: (
        <Flashcards
          store={store}
          cartes={cartes}
          authors={A}
          onStoreChange={bump}
          revisionTrigger={revisionTrigger}
        />
      ),
    },
    {
      id: "qcm",
      label: "QCM",
      content: <Qcm store={store} data={QCM_DATA} onAnswered={bump} />,
    },
    {
      id: "qui",
      label: "Qui a dit quoi ?",
      content: (
        <QuiCitations
          store={store}
          data={QUI as unknown as [string, string, string][]}
          authors={A}
          onAnswered={bump}
        />
      ),
    },
    {
      id: "pieges",
      label: "Pièges V/F",
      content: (
        <Pieges
          store={store}
          data={PIEGES as unknown as [string, boolean, string][]}
          onAnswered={bump}
        />
      ),
    },
    {
      id: "distinguer",
      label: "Distinguer",
      content: (
        <Distinguer
          store={store}
          onAnswered={bump}
          data={DISTINGUER as never}
          hint="Distingue les concepts majeurs (agir stratégique vs communicationnel, pouvoir symbolique vs acte de langage, employabilité vs méthode IOD, etc.)."
        />
      ),
    },
    {
      id: "cloze",
      label: "Citations",
      content: (
        <Cloze
          data={CLOZE as never}
          authors={A}
          hint="Retiens les formules exactes des auteurs (Bourdieu, Habermas, Honneth, Castra & Valls). Clique sur chaque trou pour révéler le terme attendu."
        />
      ),
    },
    {
      id: "redac",
      label: "Rédaction",
      content: (
        <Redac
          data={REDAC_ITEMS as never}
          hint="Entraîne-toi sur les 12 sujets rédigés types de dissertation et d'annales (Bourdieu/Austin, Habermas, Honneth, IOD Castra & Valls, Insulte Éric Lucy, France Télécom). Réplique les plans et étudie les corrigés rédigés."
        />
      ),
    },
    {
      id: "simulateur",
      label: "Négociation IOD ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Simule une négociation IOD en entreprise : refuse le tri préalable, négocie sur les contraintes concrètes du poste et sécurise l'intégration sans stigmatisation."
        />
      ),
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={FRISE_DATA}
          hint="Repères historiques des théories de la communication et de l'action (de Bühler 1934 et Austin 1962 à Bourdieu 1982, Habermas 1981, Honneth 1992 et l'approche IOD 2007)."
        />
      ),
    },
    {
      id: "cas",
      label: "Études de cas ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyse des cas concrets de communication professionnelle (SAMU social par É. Lucy, insulte en équipe, négociation de poste IOD, controverse délibérative)."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Cartographie conceptuelle ✦",
      content: (
        <Mindmap
          nodes={NODES}
          defaultKey="bourdieu"
          hint="Cartographie interactive des 5 piliers du cours : clique sur un nœud pour observer ses ramifications théoriques et pratiques."
        />
      ),
    },
    {
      id: "protocole",
      label: "Démarche d'intervention IOD ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets les 7 étapes d'une démarche d'intervention IOD (Francis Valls & Denis Castra) dans le bon ordre méthodologique."
          referenceExplanation="La démarche IOD suit rigoureusement 7 étapes : 1) Prise de contact entreprise, 2) Visite de poste & analyse du travail réel, 3) Négociation des conditions d'accueil, 4) Mise en relation directe sans tri préalable, 5) Entretien d'embauche médiatisé, 6) Intégration sur le poste de travail, 7) Suivi bilatéral durable salarié-entreprise."
        />
      ),
    },
    {
      id: "atelier",
      label: "Annales & Atelier ✦",
      content: <Atelier108 />,
    },
    {
      id: "parcours",
      label: "Parcours ✦",
      content: (
        <Parcours
          store={store}
          onStoreChange={bump}
          onGoTab={goTab}
          data={parcoursData}
          examDate={EXAM_DATE}
          examLabel={EXAM_LABEL}
          hint="Ton plan de révision d'excellence structuré en 4 étapes pour dominer l'épreuve de PST108."
        />
      ),
    },
    {
      id: "debats",
      label: "Débats",
      content: (
        <Debats
          store={store}
          onStoreChange={bump}
          data={PST108_DEBATS}
          hint="Les 4 grands débats transversaux sur la communication au travail pour prendre de la hauteur et structurer tes dissertations à l'examen."
        />
      ),
    },
    {
      id: "recits",
      label: "Récits ",
      content: (
        <Recits
          store={store}
          onStoreChange={bump}
          data={RECITS}
          kwDefs={KW_DEFS}
          filters={RECITS_FILTERS}
          colors={RECITS_COLORS}
        />
      ),
    },
    { id: "outils", label: "Outils ✦", content: <Outils store={store} /> },
    {
      id: "antiseche",
      label: "Antisèche",
      content: (
        <Antiseche
          title="PST108 — Psychologie du langage et clinique du dialogue"
          subtitle="Fiche de synthèse d'examen — Vygotski, Piaget, Bourdieu, Habermas, Honneth & Valls"
          groups={ANTISECHE_GROUPS}
        />
      ),
    },
    {
      id: "examen",
      label: "Examen blanc ✦",
      content: (
        <SharedExamen
          store={store}
          onStoreChange={bump}
          data={REDAC_ITEMS as never}
          hint="Entraîne-toi en conditions réelles : un sujet type CNAM tiré au sort parmi les 12 annales et dissertations, un chronomètre, ton plan au brouillon, puis l'auto-évaluation guidée."
        />
      ),
    },
    {
      id: "bonus",
      label: "Bonus",
      content: (
        <Bonus
          store={store}
          hint="Auteurs d'ouverture théorique (Sarah Hanley, Robert Castel, Sapir-Whorf, Noam Chomsky) pour enrichir et singulariser votre copie d'examen."
          quizTitle="Mini-Quiz : Culture d'ouverture d'élite"
          authors={PST108_BONUS_AUTHORS}
          questions={PST108_BONUS_QUESTIONS}
        />
      ),
    },
    {
      id: "errors",
      label:
        store.getErrors().length > 0
          ? `Carnet d'Erreurs (${store.getErrors().length})`
          : "Carnet d'Erreurs",
      content: <ErrorNotebook store={store} onStoreChange={bump} />,
    },
    {
      id: "feynman",
      label: "Feynman Sandbox ",
      content: (
        <FeynmanSandbox store={store} moduleKey="pst108" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModuleLivePill unitId="pst108" />
      <header className="top">
        <div className="eyebrow">
          PST108 · Psychologie du langage et clinique du dialogue · V. MAROT,
          É. LUCY &amp; F. VALLS (Cnam)
        </div>
        <h1>Psychologie du langage et clinique du dialogue</h1>
        <ModuleIntro unitId="pst108">
          Validation&nbsp;:{" "}
          <b>
            Examen final sur table (2h00 — Choix entre Option A : Dissertation
            théorique ou Option B : Étude de situation de travail / Cas
            clinique)
          </b>
          . Révise activement l&apos;ensemble du programme officiel dispensé par{" "}
          <b>Mme Véronique MAROT</b> (le langage comme instrument psychologique
          d&apos;action et de pensée, la controverse Vygotski vs Piaget, la
          clinique du dialogue et les racines de la sémiotique chez Golse et Bion),{" "}
          <b>M. Éric LUCY</b> (la critique d&apos;Austin par <b>Pierre Bourdieu</b>
          , l&apos;acte d&apos;institution et le lit de justice de{" "}
          <b>Sarah Hanley</b>, l&apos;efficacité performative de l&apos;insulte
          en revue <i>Empan</i>, l&apos;agir communicationnel et les 4
          prétentions à la validité de <b>Jürgen Habermas</b>, les 3 sphères de
          la reconnaissance morale d&apos;
          <b>Axel Honneth</b> et l&apos;intervention en SAMU social) et de M.{" "}
          <b>Francis VALLS</b> (la méthode <b>IOD</b> d&apos;intervention sur
          les offres et les demandes, la critique radicale de
          l&apos;employabilité normative, le refus absolu du tri préalable et la
          préface de <b>Robert Castel</b>).{" "}
          <b>Consigne d&apos;excellence&nbsp;:</b> définir systématiquement les
          concepts avant de les confronter et rappeler que le langage au travail
          n&apos;est jamais un simple canal informatif&nbsp;: c&apos;est le lieu du pouvoir
          symbolique, de la délibération et de la reconnaissance.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Théories du langage</b>
            <span>Vygotski / Marot</span>
          </div>
          <div className="step s1">
            <b>Pouvoir symbolique</b>
            <span>Bourdieu / Lucy</span>
          </div>
          <div className="step s2">
            <b>Délibération &amp; Éthique</b>
            <span>Habermas / Honneth</span>
          </div>
          <div className="step s3">
            <b>Méthode IOD</b>
            <span>Valls &amp; Castra</span>
          </div>
        </div>
        <div className="stepbar" aria-hidden="true" />
      </header>
      <TabsShell
        tabs={groupTabs(tabs)}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </>
  );
}
