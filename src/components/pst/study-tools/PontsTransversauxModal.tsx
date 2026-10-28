"use client";

import { useState, useMemo } from "react";
import {
  X,
  GitFork,
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  Scale,
  ShieldCheck,
  Brain,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { PONTS, MODULE_LABELS, type Pont } from "@/lib/pst/data/ponts";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PontsTransversauxModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConcept?: string;
}

interface CourantTheorique {
  id: string;
  nom: string;
  auteurs: string[];
  uePrincipale: string;
  accent: string;
  statutReel: string;
  collectifGenre: string;
  methodeIntervention: string;
  conflitCentral: string;
  questionExamen: string;
  piegeEviter: string;
}

const COURANTS_THEORIQUES: CourantTheorique[] = [
  {
    id: "clinique-activite",
    nom: "Clinique de l'activité",
    auteurs: ["Yves Clot", "Dominique Lhuilier", "Lidia Prot"],
    uePrincipale: "PST106",
    accent: "#891B29",
    statutReel:
      "Le réel de l'activité déborde l'activité réalisée : c'est ce qui ne se fait pas, ce qu'on cherche à faire, ce qu'on fait pour ne pas faire ce qui est à faire. Le réel résiste et ouvre le pouvoir d'agir.",
    collectifGenre:
      "Le 'genre professionnel' est la mémoire impersonnelle du métier, ressource et boîte à outils pour le style personnel. Quand le genre est appauvri, le collectif devient mortifère.",
    methodeIntervention:
      "Auto-confrontation simple puis croisée (vidéo), Instruction au sosie (Oddone), mise en délibération des controverses de métier.",
    conflitCentral:
      "Conflit entre activité empêchée / contrariée et pouvoir d'agir ; tension entre genre (mémoire collective) et style (signature du sujet).",
    questionExamen:
      "« En quoi l'auto-confrontation croisée restaure-t-elle le pouvoir d'agir des professionnels face à un travail empêché ? »",
    piegeEviter:
      "Confondre activité réalisée (la trace visible) et réel de l'activité (l'ensemble des possibles et des empêchements).",
  },
  {
    id: "psychodynamique",
    nom: "Psychodynamique du travail",
    auteurs: ["Christophe Dejours", "Pascale Molinier", "Isabelle Gernet"],
    uePrincipale: "PST120",
    accent: "#7a5aa6",
    statutReel:
      "Le réel est ce qui se fait connaître à celui qui travaille par sa résistance à la maîtrise et au savoir. Il impose l'endurance de la souffrance et l'intelligence rusée (métis).",
    collectifGenre:
      "Le collectif repose sur des 'règles de métier' et des accords normatifs protecteurs. Construction de stratégies collectives de défense contre la souffrance (déni viril, cynisme).",
    methodeIntervention:
      "Enquête en psychodynamique du travail : espace de délibération collective fondé sur le volontariat, la levée des défenses et l'analyse de la parole partagée.",
    conflitCentral:
      "Conflit entre l'organisation prescrite du travail et la santé mentale ; dynamique souffrance ↔ plaisir conditionnée par la reconnaissance.",
    questionExamen:
      "« Analysez les deux formes du jugement dans la dynamique de la reconnaissance et leur impact sur le basculement pathologique. »",
    piegeEviter:
      "Réduire la souffrance au travail à un stress individuel ou biologique, en occultant les stratégies défensives collectives et la lutte pour la reconnaissance.",
  },
  {
    id: "ergonomie-activite",
    nom: "Ergonomie de langue française",
    auteurs: ["Alain Wisner", "Jacques Leplat", "François Daniellou"],
    uePrincipale: "PST106",
    accent: "#0e7c86",
    statutReel:
      "Disparité indépassable entre tâche (ce qui est prescrit par l'ingénieur/gestionnaire) et activité (ce que déploie l'opérateur en situation pour pallier les aléas).",
    collectifGenre:
      "Régulation collective des contraintes : le travail n'est jamais purement individuel, il s'inscrit dans un milieu de travail et une structure socio-technique.",
    methodeIntervention:
      "Analyse ergonomique du travail (AET) : observations systématiques en situation naturelle, verbalisations simultanées, chronogrammes, analyse des variabilités.",
    conflitCentral:
      "Écart tâche prescrite vs activité réelle ; inadéquation des dispositifs techniques et managériaux face aux charges physiques, cognitives et organisationnelles.",
    questionExamen:
      "« Pourquoi la tâche prescrite ne peut-elle jamais anticiper la totalité de l'activité de travail ? Développez les concepts de régulation et de variabilité. »",
    piegeEviter:
      "Considérer l'écart au prescrit comme une faute, une négligence ou une anomalie, alors qu'il est la condition même de la réussite de la production.",
  },
  {
    id: "historico-culturel",
    nom: "Clinique du dialogue & Approche historico-culturelle",
    auteurs: ["Lev Vygotski", "Mikhaïl Bakhtine", "John L. Austin"],
    uePrincipale: "PST108",
    accent: "#b0501e",
    statutReel:
      "Le langage n'est pas un code statique mais un instrument d'action sur autrui et sur soi (médiation sémiotique). La pensée ne s'exprime pas dans le mot, elle s'y accomplit.",
    collectifGenre:
      "Le genre discursif (Bakhtine) structure l'intercompréhension professionnelle. La controverse réglée permet d'élucider les malentendus de métier.",
    methodeIntervention:
      "Clinique du dialogue : analyse des échanges verbaux, autoconfrontation aux énoncés, méthode IOD (refus du tri, négociation sans faux-semblant).",
    conflitCentral:
      "Conflit entre langage institutionnel figé (monologique) et dialogisme vivant des opérateurs ; violence de l'injonction paradoxale.",
    questionExamen:
      "« En confrontant Austin et Bourdieu, montrez d'où provient l'efficacité performative d'un énoncé sur le lieu de travail. »",
    piegeEviter:
      "Croire que les problèmes d'organisation se résolvent par de la simple « communication bienveillante », sans toucher au cadre statutaire et au travail réel.",
  },
  {
    id: "sociologie-critique",
    nom: "Sociologie de l'identité & Domination symbolique",
    auteurs: ["Pierre Bourdieu", "Claude Dubar", "Renaud Sainsaulieu"],
    uePrincipale: "PST123",
    accent: "#b48325",
    statutReel:
      "Les identités professionnelles se construisent à l'intersection de deux transactions : transaction biographique (pour soi) et transaction relationnelle (par autrui et les institutions).",
    collectifGenre:
      "Les cultures d'atelier et modèles identitaires (fusionnel, affinitaire, négocié, retrait) façonnent le rapport au pouvoir et la solidarité au travail.",
    methodeIntervention:
      "Enquête sociologique et analyse qualitative des trajectoires professionnelles, déconstruction des violences symboliques et des catégorisations abusives.",
    conflitCentral:
      "Tension entre identité attribuée par l'institution (souvent stigmatisante) et identité revendiquée par le sujet ; blocage des promotions et des reconnaissances.",
    questionExamen:
      "« Pourquoi l'attribution de l'identité par les institutions ne peut-elle s'analyser en dehors des systèmes d'action et des rapports de force ? (Dubar) »",
    piegeEviter:
      "Considérer l'identité comme une essence psychologique figée plutôt que comme une négociation dialectique permanente.",
  },
  {
    id: "deontologie-ethique",
    nom: "Déontologie & Cadre Régalien de l'Intervention",
    auteurs: [
      "Code de Déontologie (1996/2021)",
      "Loi du 25 juillet 1985",
      "Thomas Le Bianic",
    ],
    uePrincipale: "PST123",
    accent: "#1e3a8a",
    statutReel:
      "Le psychologue n'est ni le bras armé de la direction ni l'avocat complaisant des salariés. Il fonde son mandat sur le consentement éclairé, le secret professionnel et la rigueur scientifique.",
    collectifGenre:
      "Préservation du collectif par la restitution partagée et le refus du tri ou de la sélection discriminatoire sous couvert de psychologie.",
    methodeIntervention:
      "Triangulation contractuelle (commanditaire / opérateurs / clinicien), contractualisation claire des limites de mission, restitution anonymisée sur le travail réel.",
    conflitCentral:
      "Conflit entre injonction managériale de normalisation (recherche de 'profils adaptés' ou coaching de souffrance individuelle) et éthique de l'émancipation collective.",
    questionExamen:
      "« Quelles sont les règles déontologiques cardinales garantissant l'indépendance du psychologue face à une commande de gestion du stress ? »",
    piegeEviter:
      "Accepter une mission sans clarifier au préalable que les conclusions porteront sur l'organisation et non sur la fragilité supposée des individus.",
  },
  {
    id: "techno-ergonomie",
    nom: "Psychologie Ergonomique des Transformations Digitales",
    auteurs: ["Pierre Rabardel", "Marc-Eric Bobillier Chaumon", "Fred Davis"],
    uePrincipale: "PST124",
    accent: "#059669",
    statutReel:
      "L'artefact technique (le logiciel, l'algorithme) ne devient un instrument psychologique que lorsque le sujet l'investit de schèmes d'action situés.",
    collectifGenre:
      "Les technologies numériques peuvent enrichir le collectif ou au contraire l'isoler par la traçabilité algorithmique et l'infobésité.",
    methodeIntervention:
      "Démarche d'acceptation située : co-conception avec les utilisateurs finaux, simulation sur prototypes réels, préservation des marges de manœuvre.",
    conflitCentral:
      "Conflit entre prescription automatisée invisible et pouvoir d'agir créatif des opérateurs ; technostress et surveillance numérique.",
    questionExamen:
      "« En vous appuyant sur Rabardel, distinguez artefact et instrument. Quelles sont les conséquences d'un déficit d'instrumentation dans le déploiement d'un ERP ? »",
    piegeEviter:
      "Réduire l'acceptabilité à une simple courbe de résistance au changement qu'il suffirait de vaincre par de la formation descendante.",
  },
];

const REGLES_OR_TRANSVERSALES = [
  {
    num: "1",
    titre: "Éviter le syncrétisme naïf",
    regle:
      "Ne mélangez pas les méthodologies sans expliciter leur rupture épistémologique. La clinique de l'activité (Clot) vise le pouvoir d'agir par l'autoconfrontation vidéo ; la psychodynamique (Dejours) analyse la sublimation et les défenses collectives par la parole en groupe. On ne cherche pas des défenses pulsionnelles avec un sosie de Clot.",
  },
  {
    num: "2",
    titre: "L'écart Prescrit / Réel comme fil d'Ariane",
    regle:
      "C'est le concept universel qui traverse les 5 UE : Wisner en ergonomie (tâche vs activité), Clot en clinique (activité réalisée vs réel de l'activité), Dejours en psychodynamique (le réel qui résiste à la maîtrise), Austin/Bourdieu en langage (procédure formelle vs autorité réelle), et Rabardel en digital (logiciel prévu vs usages effectifs).",
  },
  {
    num: "3",
    titre: "Triangulation déontologique obligatoire",
    regle:
      "Dans toute copie ou étude de cas impliquant une demande de la direction (ex: absentéisme, RPS, réorganisation), refusez systématiquement la psychologisation individuelle. L'intervention du psychologue porte sur l'organisation du travail et la délibération collective, jamais sur l'adaptation des faibles.",
  },
  {
    num: "4",
    titre: "Faire dialoguer les auteurs plutôt que réciter",
    regle:
      "Les meilleures copies (16-19/20) mettent en scène une véritable controverse : posez Austin, puis critiquez-le avec Bourdieu ; analysez la souffrance avec Dejours, puis montrez comment Clot chercherait à relancer l'activité empêchée pour la transformer.",
  },
];

export function PontsTransversauxModal({
  isOpen,
  onClose,
  defaultConcept,
}: PontsTransversauxModalProps) {
  const [activeTab, setActiveTab] = useState<"ponts" | "courants" | "regles">(
    "ponts",
  );
  const [searchQuery, setSearchQuery] = useState(defaultConcept || "");
  const [filterPair, setFilterPair] = useState<string>("all");
  const [selectedCourantId, setSelectedCourantId] = useState<string>(
    COURANTS_THEORIQUES[0].id,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPonts = useMemo(() => {
    return PONTS.filter((p) => {
      // Filtre paire d'UE
      if (filterPair !== "all") {
        const [modA, modB] = filterPair.split("-");
        const hasA = Object.keys(p.m).includes(modA);
        const hasB = Object.keys(p.m).includes(modB);
        if (!hasA || !hasB) return false;
      }
      // Filtre recherche textuelle
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      if (p.c.toLowerCase().includes(q)) return true;
      return Object.values(p.m).some((v) => v.toLowerCase().includes(q));
    });
  }, [searchQuery, filterPair]);

  if (!isOpen) return null;

  function copyPont(p: Pont) {
    triggerHaptic("success");
    playSuccessSound();
    const text = `Passerelle transversale : ${p.c}\n\n${Object.entries(p.m)
      .map(
        ([mod, desc]) => `${MODULE_LABELS[mod] || mod.toUpperCase()} : ${desc}`,
      )
      .join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(p.c);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const activeCourant =
    COURANTS_THEORIQUES.find((c) => c.id === selectedCourantId) ||
    COURANTS_THEORIQUES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* EN-TÊTE MODAL */}
        <div className="flex items-center justify-between p-3.5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 gap-2 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md shrink-0">
              <GitFork className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 truncate">
                  Articulations &amp; Synergies
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">
                  Transversalité RNCP 7
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 m-0 truncate">
                Ponts &amp; Passerelles Inter-PST
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ONGLETS PRINCIPAUX DE LA MODALE */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap shrink-0">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("ponts");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "ponts"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <GitFork className="size-3.5 text-amber-500" />
              <span>17 Ponts<span className="hidden sm:inline"> Conceptuels</span> ({PONTS.length})</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("courants");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "courants"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Brain className="size-3.5 text-rose-500" />
              <span>Matrice 7 Courants<span className="hidden sm:inline"> Théoriques</span></span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("regles");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "regles"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>4 Règles d'Or<span className="hidden sm:inline"> pour l'Examen</span></span>
            </span>
          </button>
        </div>

        {/* CORPS DE CONTENU */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* ========================================================================= */}
          {/* TAB 1 : LES 17 PONTS CONCEPTUELS CLÉS                                     */}
          {/* ========================================================================= */}
          {activeTab === "ponts" && (
            <div className="space-y-4">
              {/* Barre de recherche & Filtres de paires */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    placeholder="Chercher un concept transversal (ex. Dejours, Vygotski, Prescrit/Réel, Reconnaissance...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { key: "all", label: "Toutes les synergies" },
                    {
                      key: "pst106-pst120",
                      label: "PST106 ↔ PST120 (Clot / Dejours)",
                    },
                    {
                      key: "pst108-pst123",
                      label: "PST108 ↔ PST123 (Langage / Identité)",
                    },
                    {
                      key: "pst106-pst124",
                      label: "PST106 ↔ PST124 (Outils / Digital)",
                    },
                  ].map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => {
                        triggerHaptic("selection");
                        playClickSound();
                        setFilterPair(p.key);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                        filterPair === p.key
                          ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Liste des cartes de passerelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredPonts.length === 0 ? (
                  <div className="col-span-full p-8 text-center text-xs text-slate-500">
                    Aucune passerelle conceptuelle trouvée pour cette recherche.
                  </div>
                ) : (
                  filteredPonts.map((p) => (
                    <div
                      key={p.c}
                      className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-amber-500/50 transition-all shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                          <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 m-0">
                            <Sparkles className="size-3.5 text-amber-500 shrink-0" />
                            <span>{p.c}</span>
                          </h3>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => copyPont(p)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                              title="Copier les correspondances"
                            >
                              {copiedId === p.c ? (
                                <Check className="size-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Répercussions par module */}
                        <div className="space-y-1.5">
                          {Object.entries(p.m).map(([modId, text]) => {
                            const label =
                              MODULE_LABELS[modId] || modId.toUpperCase();
                            return (
                              <div
                                key={modId}
                                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs flex items-start gap-2"
                              >
                                <span className="font-mono font-bold text-[10px] text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                                  {modId.toUpperCase()}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <span className="font-semibold block text-[11px] text-slate-500 dark:text-slate-400">
                                    {label}
                                  </span>
                                  <p className="m-0 text-slate-800 dark:text-slate-200 leading-snug">
                                    {text}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Liens rapides vers les ateliers */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">
                          Consulter l'atelier :
                        </span>
                        <div className="flex items-center gap-1.5">
                          {Object.keys(p.m).map((modId) => (
                            <Link
                              key={modId}
                              href={`/pst/${modId.replace("pst", "")}/`}
                              className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-slate-200/70 dark:bg-slate-800 hover:bg-amber-600 hover:text-white transition-colors"
                            >
                              {modId.toUpperCase()}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2 : MATRICE DES 7 COURANTS THÉORIQUES                                 */}
          {/* ========================================================================= */}
          {activeTab === "courants" && (
            <div className="space-y-4">
              {/* Sélecteur de Courants */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {COURANTS_THEORIQUES.map((c) => {
                  const isSelected = c.id === selectedCourantId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        triggerHaptic("selection");
                        playClickSound();
                        setSelectedCourantId(c.id);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                        isSelected
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <span>{c.nom}</span>
                      <span className="ml-1 opacity-75 font-mono text-[10px]">
                        ({c.uePrincipale})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Fiche Détaillée du Courant Théorique Sélectionné */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white bg-slate-900 dark:bg-slate-700">
                        {activeCourant.uePrincipale}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        Auteurs majeurs : {activeCourant.auteurs.join(", ")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-slate-100 m-0">
                      {activeCourant.nom}
                    </h3>
                  </div>

                  <Link
                    href={`/pst/${activeCourant.uePrincipale.toLowerCase().replace("pst", "")}/`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Ouvrir l'Atelier {activeCourant.uePrincipale}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      1. Définition du Statut du « Réel » :
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                      {activeCourant.statutReel}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      2. Rôle du Collectif &amp; Genre :
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                      {activeCourant.collectifGenre}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      3. Méthodologie d'Intervention :
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                      {activeCourant.methodeIntervention}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px] block">
                      4. Conflit Central Élucidé :
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                      {activeCourant.conflitCentral}
                    </p>
                  </div>
                </div>

                {/* Question Examen & Piège */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[10px] block">
                      🎯 Question d'examen type :
                    </span>
                    <p className="font-serif italic text-slate-800 dark:text-slate-200 m-0">
                      {activeCourant.questionExamen}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-500/20">
                    <span className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[10px] block">
                      ⚠️ Piège impardonnable à éviter en copie :
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 m-0">
                      {activeCourant.piegeEviter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3 : 4 RÈGLES D'OR POUR L'EXAMEN & LA SOUTENANCE                     */}
          {/* ========================================================================= */}
          {activeTab === "regles" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 text-xs">
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  <span>
                    Comment mobiliser plusieurs PST sans commettre de
                    contre-sens
                  </span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed">
                  Le jury du Cnam et les correcteurs de dissertation valorisent
                  hautement la capacité à tisser des passerelles transversales,
                  à condition de respecter scrupuleusement les frontières
                  épistémologiques propres à chaque courant.
                </p>
              </div>

              <div className="space-y-3">
                {REGLES_OR_TRANSVERSALES.map((r) => (
                  <div
                    key={r.num}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                      <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black flex items-center justify-center">
                        {r.num}
                      </span>
                      <span className="text-sm font-serif">{r.titre}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7 m-0">
                      {r.regle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
