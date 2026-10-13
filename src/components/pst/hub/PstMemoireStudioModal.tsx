import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  FileText,
  ShieldCheck,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Scale,
  Eye,
  RotateCcw,
  CheckSquare,
  Square,
  Hash,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface PstMemoireStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StudioProjection = "jury_cnam" | "commanditaire_terrain" | "journal_clinique";

interface MemoireSection {
  id: string;
  number: string;
  title: string;
  ueRef: string;
  guidance: string;
  placeholder: string;
}

const MEMOIRE_SECTIONS: MemoireSection[] = [
  {
    id: "commande_demande",
    number: "I",
    title: "De la Commande Sociale à la Demande d'Intervention",
    ueRef: "PST106 · PST123",
    guidance:
      "Distinguez la commande initiale (direction/RH/CSE) des demandes implicites des opérateurs. Explicitez la reformulation ergonomique et clinique opérée lors du cadrage.",
    placeholder:
      "1. Contexte socio-technique et historique de la structure...\n2. Formulation initiale de la commande institutionnelle...\n3. Déplacement vers l'analyse du travail réel et reformulation de la demande...",
  },
  {
    id: "cadre_theorique",
    number: "II",
    title: "Problématisation & Articulation Clinique / Ergonomique",
    ueRef: "PST106 · PST123 · PST124",
    guidance:
      "Mettez en tension au moins deux courants du CNAM (ex: Ergonomie de l'activité & Clinique de l'activité, ou Psychodynamique du travail & Genèse instrumentale).",
    placeholder:
      "1. État de l'art ciblé (distinction Tâche prescrite / Activité réelle — Leplat & Hoc, 1983)...\n2. Apports de la Clinique de l'activité (Quatre dimensions du métier — Clot, 2008) ou de la Psychodynamique (Dejours, 1993)...\n3. Hypothèses cliniques et ergonomiques guidant l'investigation...",
  },
  {
    id: "dispositif_methodologique",
    number: "III",
    title: "Dispositif Méthodologique, Cadre Déontologique & Corpus",
    ueRef: "PST106 · PST108 · PST120",
    guidance:
      "Justifiez le dispositif d'observation et d'entretien (autoconfrontation simple/croisée, instruction au sosie, chroniques d'activité) et les garanties d'anonymat (Code de déontologie 2021).",
    placeholder:
      "1. Architecture du dispositif d'intervention (Comité de pilotage, Groupe de métier)...\n2. Garanties déontologiques : consentement éclairé, volontariat, confidentialité des verbatims...\n3. Protocole de recueil des traces d'activité et d'analyse dialogique (Bakhtine / Vygotski)...",
  },
  {
    id: "analyse_empirique",
    number: "IV",
    title: "Analyse Clinique du Travail Réel & Controverses de Métier",
    ueRef: "PST106 · PST123 · PST124",
    guidance:
      "Analysez précisément des séquences d'activité situées et des extraits de dialogues professionnels. Montrez comment l'activité empêchée ou les dilemmes éthiques sont mis en mouvement.",
    placeholder:
      "1. Chronique et observables de la situation de travail choisie (variabilités, régulations, catachrèses)...\n2. Analyse micro-dialogique des verbatims d'autoconfrontation (dilemmes de métier, controverse sur le travail bien fait)...\n3. Effets développementaux observés sur le pouvoir d'agir individuel et collectif...",
  },
  {
    id: "preconisations_reflexivite",
    number: "V",
    title: "Transformations Durables & Posture Réflexive du Praticien",
    ueRef: "PST108 · PST123 · PST124",
    guidance:
      "Dépassez le catalogue de recommandations descendantes : détaillez les transformations co-construites (organisationnelles, techniques, dialogiques) et votre propre posture d'intervenant.",
    placeholder:
      "1. Pistes de transformation co-construites avec le collectif et instituées en Comité de pilotage...\n2. Pérennisation des espaces de discussion sur le travail (délibération sur la qualité du travail)...\n3. Retour réflexif sur les limites de l'intervention, les résistances rencontrées et la posture clinique...",
  },
];

interface GuardCheckItem {
  id: string;
  label: string;
  category: string;
  rule: string;
}

const RNCP_GUARD_CHECKS: GuardCheckItem[] = [
  {
    id: "distinction_commande_demande",
    label: "Passage explicite de la commande institutionnelle à la demande co-construite",
    category: "Cadrage",
    rule: "Exigence Jury CNAM",
  },
  {
    id: "ecart_prescrit_reel",
    label: "Analyse documentée de l'écart Tâche prescrite / Activité réelle (situations situées)",
    category: "Ergonomie",
    rule: "PST106 / Leplat & Hoc",
  },
  {
    id: "verbatims_anonymises",
    label: "Verbatims authentiques intégralement anonymisés (aucun nom ni site identifiable)",
    category: "Déontologie",
    rule: "Code 2021 · Art. 7 & 19",
  },
  {
    id: "consentement_volontariat",
    label: "Mention explicite du volontariat et du consentement éclairé des opérateurs",
    category: "Éthique",
    rule: "Principe I · Respect",
  },
  {
    id: "dialogue_courants",
    label: "Mise en dialogue critique d'au moins 2 courants (Clinique, PDT, Ergonomie, Genèse)",
    category: "Épistémologie",
    rule: "Attendu RNCP Niveau 7",
  },
  {
    id: "refus_psittacisme",
    label: "Concepts théoriques systématiquement reliés à des observables empiriques du terrain",
    category: "Rigueur",
    rule: "Anti-psittacisme",
  },
  {
    id: "normes_apa7",
    label: "Citations dans le texte et bibliographie finale conformes aux normes APA 7e édition",
    category: "Académique",
    rule: "Standard APA 7",
  },
  {
    id: "posture_reflexive",
    label: "Analyse réflexive de la place de l'intervenant et des effets sur le cadre social",
    category: "Posture",
    rule: "Compétence RNCP 7",
  },
];

const STORAGE_KEY = "pst_memoire_studio_v1";

interface StudioStorageState {
  title: string;
  terrainOrg: string;
  academicYear: string;
  projection: StudioProjection;
  sections: Record<string, string>;
  checks: Record<string, boolean>;
}

const DEFAULT_STATE: StudioStorageState = {
  title: "Intervention clinique et ergonomique sur la régulation de la charge et le pouvoir d'agir",
  terrainOrg: "Secteur médico-social / Industrie de process (Anonymisé)",
  academicYear: "2026-2027",
  projection: "jury_cnam",
  sections: {
    commande_demande:
      "L'intervention trouve son origine dans une commande formulée par la direction d'établissement, initialement centrée sur « l'accompagnement au changement suite à la réorganisation des plannings et la montée d'indicateurs d'absentéisme ». \n\nConformément à la démarche d'analyse ergonomique et clinique du travail (Wisner, 1995 ; Clot, 2008), les premiers entretiens exploratoires et observations ouvertes ont permis de déplacer cette commande centrée sur les individus vers une demande d'analyse des contradictions organisationnelles entravant la réalisation d'un « travail bien fait ».",
    cadre_theorique:
      "Notre cadre théorique articule deux perspectives complémentaires de l'école du CNAM :\n- D'une part, l'ergonomie de l'activité (Leplat & Hoc, 1983 ; Daniellou, 2005), afin d'objectiver l'écart irréductible entre la tâche prescrite par les nouveaux logiciels de planification et l'activité réelle de régulation déployée par les professionnels face aux variabilités du terrain.\n- D'autre part, la clinique de l'activité (Clot, 1999, 2008), qui permet d'appréhender la souffrance non comme un déficit individuel d'adaptation, mais comme une « activité empêchée » liée à l'affaiblissement du genre professionnel (dimension transpersonnelle du métier).",
    dispositif_methodologique:
      "Le dispositif méthodologique repose sur une architecture tripartite garantissant la sécurité déontologique des participants (Code de déontologie des psychologues, révision 2021) :\n1. Un Comité de Pilotage paritaire (Direction, CSE, SST) garant du cadre institué.\n2. Un Groupe de Métier composé de 6 professionnels volontaires.\n3. Deux cycles d'observations situées suivis d'autoconfrontations simples puis croisées, où les traces de l'activité deviennent l'objet d'un dialogue contradictoire sur les critères de qualité du travail.",
    analyse_empirique:
      "L'analyse des séquences d'activité met en lumière de nombreuses catachrèses (Rabardel, 1995) : les opérateurs détournent les fiches de liaison numériques pour maintenir une coordination orale indispensable à la sécurité du collectif.\n\nLors des séances d'autoconfrontation croisée, une controverse majeure émerge autour de la gestion des urgences : ce qui apparaissait initialement comme un conflit interpersonnel se révèle être un dilemme de métier entre respect strict de la cadence prescrite et préservation de la qualité relationnelle avec l'usager.",
    preconisations_reflexivite:
      "Plutôt qu'un catalogue de préconisations prescriptives externes, l'intervention a permis d'instituer deux transformations co-construites :\n- La révision des marges de manœuvre temporelles lors des relèves d'équipe, redonnant une fonction délibérative aux transmissions.\n- L'intégration d'un temps d'analyse des situations critiques animé par les référents métier.\n\nSur le plan réflexif, le maintien d'une posture de tiers-garant du cadre dialogique a nécessité de résister aux demandes d'évaluation individuelle pour maintenir le travail réel au centre des délibérations.",
  },
  checks: {
    distinction_commande_demande: true,
    ecart_prescrit_reel: true,
    verbatims_anonymises: true,
    consentement_volontariat: true,
    dialogue_courants: true,
    refus_psittacisme: false,
    normes_apa7: false,
    posture_reflexive: true,
  },
};

export const PstMemoireStudioModal: React.FC<PstMemoireStudioModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<StudioStorageState>(DEFAULT_STATE);
  const [activeSectionId, setActiveSectionId] = useState<string>(MEMOIRE_SECTIONS[0].id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setState((prev) => ({
            ...prev,
            ...parsed,
            sections: { ...prev.sections, ...(parsed.sections || {}) },
            checks: { ...prev.checks, ...(parsed.checks || {}) },
          }));
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const updateState = (updater: (prev: StudioStorageState) => StudioStorageState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      } catch {
        // Ignore quota error
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const totalWords = useMemo(() => {
    const allText = Object.values(state.sections).join(" ").trim();
    if (!allText) return 0;
    return allText.split(/\s+/).length;
  }, [state.sections]);

  const checkedCount = useMemo(() => {
    return RNCP_GUARD_CHECKS.filter((c) => state.checks[c.id]).length;
  }, [state.checks]);

  const guardReadinessPct = Math.round((checkedCount / RNCP_GUARD_CHECKS.length) * 100);

  // Deterministic fingerprint for local academic traceability
  const integrityFingerprint = useMemo(() => {
    const raw = `${state.title}|${state.projection}|${totalWords}|${checkedCount}`;
    let hash = 2166136261;
    for (let i = 0; i < raw.length; i++) {
      hash ^= raw.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `CNAM-RNCP7-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
  }, [state.title, state.projection, totalWords, checkedCount]);

  if (!isOpen) return null;

  const projectionMeta: Record<
    StudioProjection,
    { label: string; subtitle: string; headerBadge: string }
  > = {
    jury_cnam: {
      label: "Jury CNAM RNCP 7",
      subtitle: "Version académique intégrale (articulation théorico-clinique & bibliographie APA 7)",
      headerBadge: "DOSSIER SOUTENANCE RNCP NIVEAU 7 · CNAM",
    },
    commanditaire_terrain: {
      label: "Restitution Commanditaire / CSE",
      subtitle: "Synthèse opérationnelle centrée sur le travail réel, anonymisée et orientée transformations",
      headerBadge: "RAPPORT DE RESTITUTION PARITAIRE · COPIL / CSE",
    },
    journal_clinique: {
      label: "Journal d'Observation Clinique",
      subtitle: "Chroniques d'activité, observables ergonomiques et notes réflexives confidentielles",
      headerBadge: "CARNET DE TERRAIN CONFIDENTIEL · SECRET PROFESSIONNEL",
    },
  };

  const buildMarkdownExport = () => {
    const pMeta = projectionMeta[state.projection];
    const lines = [
      `# ${state.title}`,
      `**Format** : ${pMeta.headerBadge}`,
      `**Terrain / Structure** : ${state.terrainOrg}`,
      `**Année universitaire** : ${state.academicYear}`,
      `**Empreinte d'intégrité méthodologique** : \`${integrityFingerprint}\` (${guardReadinessPct}% conformité RNCP 7)`,
      "",
      "---",
      "",
    ];

    MEMOIRE_SECTIONS.forEach((sec) => {
      lines.push(`## ${sec.number}. ${sec.title} (${sec.ueRef})`);
      lines.push("");
      lines.push(state.sections[sec.id] || "*[Section en cours de rédaction]*");
      lines.push("");
    });

    lines.push("---");
    lines.push("## Grille de Conformité Méthodologique & Déontologique (Pre-Defense Guard)");
    RNCP_GUARD_CHECKS.forEach((chk) => {
      const mark = state.checks[chk.id] ? "[x]" : "[ ]";
      lines.push(`- ${mark} **${chk.label}** (${chk.rule})`);
    });

    return lines.join("\n");
  };

  const handleCopyMarkdown = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(buildMarkdownExport());
      setCopied(true);
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    playClickSound();
    const md = buildMarkdownExport();
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Memoire_CNAM_RNCP7_${state.projection}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleReset = () => {
    playClickSound();
    updateState(() => DEFAULT_STATE);
  };

  const activeSection =
    MEMOIRE_SECTIONS.find((s) => s.id === activeSectionId) || MEMOIRE_SECTIONS[0];

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 lg:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-memoire-studio-title"
    >
      <div className="relative w-full max-w-7xl h-[92vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Studio Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold">
                  STUDIO MÉMOIRE & DOSSIER RNCP 7
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <Hash className="w-3 h-3 text-emerald-500" />
                  {integrityFingerprint}
                </span>
              </div>
              <h2
                id="pst-memoire-studio-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight"
              >
                Atelier d'Écriture Académique &amp; Verrou de Pré-Soutenance CNAM
              </h2>
            </div>
          </div>

          {/* Projection Selector + Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden md:flex items-center p-0.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
              {(
                [
                  ["jury_cnam", "Jury CNAM"],
                  ["commanditaire_terrain", "Restitution COPIL"],
                  ["journal_clinique", "Journal Clinique"],
                ] as [StudioProjection, string][]
              ).map(([projKey, label]) => (
                <button
                  key={projKey}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    updateState((prev) => ({ ...prev, projection: projKey }));
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    state.projection === projKey
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copier .MD
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Exporter Dossier
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Imprimer / Générer PDF A4"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer le studio mémoire"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Sommaire Structurel + RNCP 7 Pre-Defense Guard */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-4 overflow-y-auto flex flex-col gap-5">
            {/* Sommaire Structurel */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  1. Architecture du Mémoire (5 Parties)
                </span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {totalWords} mots
                </span>
              </div>

              <div className="space-y-1.5">
                {MEMOIRE_SECTIONS.map((sec) => {
                  const isSelected = sec.id === activeSectionId;
                  const secWords = (state.sections[sec.id] || "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setActiveSectionId(sec.id);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-xs"
                          : "bg-transparent border-slate-200/70 dark:border-slate-800/80 hover:bg-white/60 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            Partie {sec.number}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {sec.ueRef}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">
                          {sec.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {secWords} m.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pre-Defense Guard */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Verrou Déontologique RNCP 7
                  </span>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    guardReadinessPct === 100
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {guardReadinessPct}% ({checkedCount}/{RNCP_GUARD_CHECKS.length})
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                <div
                  className={`h-full transition-all duration-300 ${
                    guardReadinessPct === 100 ? "bg-emerald-500" : "bg-indigo-500"
                  }`}
                  style={{ width: `${guardReadinessPct}%` }}
                />
              </div>

              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                {RNCP_GUARD_CHECKS.map((chk) => {
                  const isChecked = !!state.checks[chk.id];
                  return (
                    <button
                      key={chk.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        updateState((prev) => ({
                          ...prev,
                          checks: { ...prev.checks, [chk.id]: !isChecked },
                        }));
                      }}
                      className={`w-full text-left p-2 rounded-lg border text-xs transition-all flex items-start gap-2 ${
                        isChecked
                          ? "bg-emerald-500/5 border-emerald-500/20 text-slate-800 dark:text-slate-200"
                          : "bg-slate-50 dark:bg-slate-950/50 border-slate-200/70 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug">{chk.label}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-mono text-slate-400">
                          {chk.category} · {chk.rule}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Sauvegarde locale instantanée</span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser modèle
              </button>
            </div>
          </div>

          {/* Right Column: Paper/Ink Continuous Academic Editor */}
          <div className="lg:col-span-8 p-4 sm:p-6 overflow-y-auto bg-slate-100/70 dark:bg-[#070A10]">
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-[#FBF9F5] dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              {/* Document Header */}
              <div className="border-b border-slate-300/80 dark:border-slate-800 pb-5 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-indigo-500/20 dark:text-indigo-300 font-semibold">
                    {projectionMeta[state.projection].headerBadge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Année {state.academicYear}
                  </span>
                </div>

                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Intitulé du Mémoire / Dossier d'Intervention
                </label>
                <input
                  type="text"
                  value={state.title}
                  onChange={(e) =>
                    updateState((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full text-base sm:text-lg font-bold bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Terrain d'intervention (Anonymisé)
                    </label>
                    <input
                      type="text"
                      value={state.terrainOrg}
                      onChange={(e) =>
                        updateState((prev) => ({ ...prev, terrainOrg: e.target.value }))
                      }
                      className="w-full text-xs bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Objectif de la projection active
                    </label>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5">
                      {projectionMeta[state.projection].subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Section Editor */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Partie {activeSection.number} · {activeSection.ueRef}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeSection.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {MEMOIRE_SECTIONS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSectionId(s.id)}
                        className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors ${
                          s.id === activeSectionId
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300"
                        }`}
                      >
                        {s.number}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Methodological Guidance Callout */}
                <div className="mb-3 p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/20 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      Attendu méthodologique CNAM :
                    </strong>{" "}
                    {activeSection.guidance}
                  </p>
                </div>

                <textarea
                  rows={12}
                  value={state.sections[activeSection.id] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateState((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        [activeSection.id]: val,
                      },
                    }));
                  }}
                  placeholder={activeSection.placeholder}
                  className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm leading-relaxed text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-serif"
                />
              </div>

              {/* Continuous Preview Summary */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-indigo-500" />
                  <span>
                    Code de déontologie des psychologues (2021) · Secret professionnel & Anonymisation stricte
                  </span>
                </div>
                <span className="font-mono">
                  Total corpus : <strong>{totalWords}</strong> mots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PstMemoireStudioModal;
