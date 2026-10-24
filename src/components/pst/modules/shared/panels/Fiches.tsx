"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  CAPSULES_FEYNMAN,
  type CapsuleFeynman,
} from "@/lib/pst/data/capsules-feynman";
import { prepareTextForSpeech } from "@/lib/pst/speech-service";
import {
  Zap,
  Sparkles,
  Headphones,
  Eye,
  EyeOff,
  Palette,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Star,
} from "lucide-react";

export interface FichesFilter {
  key: string;
  label: string;
}

interface FichesProps {
  store: PstStore;
  onStoreChange: () => void;
  data: FicheItem[];
  filters: FichesFilter[];
  hint: string;
}

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function Fiches({
  store,
  onStoreChange,
  data,
  filters,
  hint,
}: FichesProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [viewMode, setViewMode] = useState<
    "accordion" | "reader" | "feynman60s"
  >("accordion");
  const [readerIdx, setReaderIdx] = useState(0);
  const [selfTestBlur, setSelfTestBlur] = useState(false);
  const [maskKeywords, setMaskKeywords] = useState(false);
  const [revealedBlurSet, setRevealedBlurSet] = useState<Set<number>>(
    new Set(),
  );
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const marks = store.getMarks();
  const mastered = data.filter((_, i) => !!marks["fiche_mastery_" + i]).length;
  const favCount = data.filter((_, i) => !!marks["fiche_fav_" + i]).length;
  const total = data.length;
  const remaining = total - mastered;
  const pct = total ? Math.round((mastered * 100) / total) : 0;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      data
        .map((f, i) => ({ f, i }))
        .filter(({ f, i }) => {
          const isM = !!marks["fiche_mastery_" + i];
          const isFav = !!marks["fiche_fav_" + i];
          if (onlyUnmastered && isM) return false;
          if (onlyFavs && !isFav) return false;
          const matchA = filter === "all" || f.a === filter;
          const noteText = String(marks["note_fiche_" + i] ?? "");
          const hay = (
            f.t +
            " " +
            f.ess +
            " " +
            f.ph +
            " " +
            noteText
          ).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, q, onlyUnmastered, onlyFavs, marks],
  );

  const safeReaderIdx =
    visible.length > 0 ? Math.min(readerIdx, visible.length - 1) : 0;

  function toggleMastery(i: number) {
    const cur = !!store.getMarks()["fiche_mastery_" + i];
    store.setMark("fiche_mastery_" + i, !cur);
    if (!cur) playSuccessSound();
    else playClickSound();
    onStoreChange();
  }

  function updateFicheNote(i: number, text: string) {
    store.setMark("note_fiche_" + i, text);
    onStoreChange();
  }

  function toggleSpeakFiche(f: FicheItem, i: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIdx === i) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanEss = f.ess.replace(/<[^>]*>/g, " ");
    const text = `${f.t}. L'essentiel : ${cleanEss}. Formule clé : ${f.ph}. Exemple : ${f.ex}. Attention au piège d'examen : ${f.trap}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(i);
    window.speechSynthesis.speak(utter);
  }

  function getActiveUeCode(): string {
    if (typeof window === "undefined") return "PST106";
    const match = window.location.pathname.match(
      /\/pst\/(106|108|120|123|124)/,
    );
    return match?.[1] ? `PST${match[1]}` : "PST106";
  }

  function exportFicheToJournal(f: FicheItem, i: number) {
    try {
      const noteVal = String(marks["note_fiche_" + i] ?? "").trim();
      const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const cleanEss = f.ess.replace(/<[^>]*>/g, "");
      const entry = {
        id: `fiche-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        context: `Fiche de synthèse — ${f.t}`,
        ue: getActiveUeCode(),
        observation: `${cleanEss}\nFormule clé : « ${f.ph} »`,
        concept: f.t,
        posture: noteVal || `Exemple : ${f.ex} | Piège : ${f.trap}`,
      };
      const next = Array.isArray(list) ? [entry, ...list] : [entry];
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      setExportedIdx(i);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  function playAllFormulasStream() {
    playClickSound();
    const fullText = data
      .map(
        (f, i) =>
          `Notion ${i + 1} sur ${data.length} : ${f.t}. Auteur : ${f.a}. Formule clé à retenir : ${f.ph}. Attention au piège d'examen : ${f.trap}.`,
      )
      .join(" \n\n— Notion suivante —\n\n ");

    window.dispatchEvent(
      new CustomEvent("pst:play-audio", {
        detail: {
          title: `Formules Clés du Module (${data.length} notions)`,
          author: "Lecture Continue SM-2",
          text: fullText,
        },
      }),
    );
  }

  const allVisibleOpen =
    visible.length > 0 && visible.every(({ i }) => openSet.has(i));

  function toggleExpandAll() {
    if (allVisibleOpen) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(visible.map(({ i }) => i)));
    }
  }

  function findCapsuleForFiche(f: FicheItem): CapsuleFeynman {
    const titleLow = f.t.toLowerCase();
    const found = CAPSULES_FEYNMAN.find((c) => {
      const cLow = c.titre.toLowerCase();
      const auteurPart = c.auteur.toLowerCase().split(" ")[0] || "";
      return (
        titleLow.includes(cLow) ||
        (c.motsObligatoires &&
          c.motsObligatoires.some((m) => titleLow.includes(m.toLowerCase()))) ||
        (auteurPart.length > 3 && titleLow.includes(auteurPart))
      );
    });

    if (found) return found;

    const cleanEss = prepareTextForSpeech(f.ess);
    const firstSentence = cleanEss.split(". ")[0] || f.ph;
    let authorDisplay = f.a || "Auteur";
    if (authorDisplay === "linguistique") authorDisplay = "Sciences du langage & Ergonomie";
    else if (authorDisplay === "vygotski_piaget") authorDisplay = "Lev Vygotski & Jean Piaget";
    else if (authorDisplay === "bourdieu") authorDisplay = "Pierre Bourdieu";
    else if (authorDisplay === "habermas") authorDisplay = "Jürgen Habermas";
    else if (authorDisplay === "honneth") authorDisplay = "Axel Honneth";
    else if (authorDisplay === "valls_iod") authorDisplay = "Francis Valls & Denis Castra";
    else authorDisplay = authorDisplay.charAt(0).toUpperCase() + authorDisplay.slice(1);

    return {
      id: `dyn-${f.t}`,
      moduleKey: "pst108",
      titre: f.t,
      auteur: authorDisplay,
      intuitionMetaphore: firstSentence,
      formuleMatrice: f.ph,
      casReelApplication: f.ex,
      piegeExamen: f.trap,
      citationCle: `« ${f.ph} »`,
      motsObligatoires: [f.t.split(":")[0]?.trim() || f.t],
    };
  }

  function findSchemaForFiche(f: FicheItem): string | null {
    const hay = (f.a + " " + f.t + " " + f.ess + " " + f.ph).toLowerCase();
    if (
      hay.includes("leplat") ||
      hay.includes("jean-marie hoc") ||
      (hay.includes("tâche") && hay.includes("régulation"))
    )
      return "schema-leplat-regulation";
    if (
      hay.includes("clot") ||
      hay.includes("genre professionnel") ||
      hay.includes("réel de l'activité") ||
      hay.includes("clinique de l'activité")
    )
      return "schema-clot-activite-reelle";
    if (
      hay.includes("dejours") ||
      hay.includes("jugement d'utilité") ||
      hay.includes("jugement de beauté") ||
      hay.includes("psychodynamique") ||
      hay.includes("sublimation")
    )
      return "schema-dejours-reconnaissance";
    if (
      hay.includes("bourdieu") ||
      hay.includes("habitus") ||
      hay.includes("capital symbolique") ||
      hay.includes("sens pratique") ||
      hay.includes("illusio")
    )
      return "schema-bourdieu-algorithme";
    if (
      hay.includes("habermas") ||
      hay.includes("agir communicationnel") ||
      hay.includes("prétention à la validité") ||
      hay.includes("monde vécu")
    )
      return "schema-habermas-validite";
    if (
      hay.includes("honneth") ||
      hay.includes("sphères de la reconnaissance") ||
      (hay.includes("estime de soi") && hay.includes("solidarité"))
    )
      return "schema-honneth-spheres";
    if (
      hay.includes("iod") ||
      hay.includes("valls") ||
      hay.includes("castra") ||
      hay.includes("entonnoir")
    )
      return "schema-valls-iod";
    if (
      hay.includes("dubar") ||
      hay.includes("double transaction") ||
      hay.includes("transaction biographique")
    )
      return "schema-dubar-double-transaction";
    if (
      hay.includes("sainsaulieu") ||
      hay.includes("modèle fusionnel") ||
      hay.includes("modèle négociateur") ||
      hay.includes("cultures d'entreprise")
    )
      return "schema-sainsaulieu-matrice";
    if (
      hay.includes("castel") ||
      hay.includes("désaffiliation") ||
      hay.includes("zone de vulnérabilité")
    )
      return "schema-castel-desaffiliation";
    return null;
  }

  function playCapsuleAudio(capsule: CapsuleFeynman) {
    playClickSound();
    const text = prepareTextForSpeech(
      `Capsule 60 secondes : ${capsule.titre}, par ${capsule.auteur}. L'intuition clé : ${capsule.intuitionMetaphore}. La formule essentielle : ${capsule.formuleMatrice}. Exemple d'application : ${capsule.casReelApplication}. Attention au piège d'examen : ${capsule.piegeExamen}.`,
      { author: capsule.auteur, title: capsule.titre },
    );
    window.dispatchEvent(
      new CustomEvent("pst:play-audio", {
        detail: {
          title: `Capsule 60s : ${capsule.titre}`,
          author: capsule.auteur,
          text,
        },
      }),
    );
  }

  function renderFicheCard(f: FicheItem, i: number, forceOpen = false) {
    const isM = !!marks["fiche_mastery_" + i];
    const isOpen = forceOpen || openSet.has(i);
    const noteVal = String(marks["note_fiche_" + i] ?? "");
    const isBlurred = selfTestBlur && !revealedBlurSet.has(i);
    const isSpeaking = speakingIdx === i;
    const capsule = findCapsuleForFiche(f);
    const matchedSchemaId = findSchemaForFiche(f);
    const wordCount = (f.ess + " " + f.ph + " " + f.ex + " " + f.trap)
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/).length;
    const readMinutes = Math.max(1, Math.round(wordCount / 140));
    const processedEss = maskKeywords
      ? f.ess.replace(
          /<(b|strong)>([\s\S]*?)<\/\1>/gi,
          '<span class="px-1 rounded bg-amber-500/20 text-transparent hover:text-inherit active:text-inherit select-none hover:select-auto transition-colors cursor-pointer border-b border-dashed border-amber-500/60" title="Survoler ou toucher pour révéler le mot-clé">$2</span>',
        )
      : f.ess;

    return (
      <details
        key={i}
        className={`fcard${isM ? " mastered" : ""}`}
        style={{ borderLeftColor: `var(--${f.a})` }}
        open={isOpen}
        onToggle={(e) => {
          if (forceOpen) return;
          const nextOpen = (e.target as HTMLDetailsElement).open;
          setOpenSet((prev) => {
            const next = new Set(prev);
            if (nextOpen) next.add(i);
            else next.delete(i);
            return next;
          });
        }}
      >
        <summary className="flex items-center gap-2">
          <span
            className="dot shrink-0"
            style={{ background: `var(--${f.a})` }}
          />
          <span className="ttl">{f.t}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              playClickSound();
              const cur = !!store.getMarks()["fiche_fav_" + i];
              store.setMark("fiche_fav_" + i, !cur);
              onStoreChange();
            }}
            className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${
              marks["fiche_fav_" + i]
                ? "text-amber-500 hover:bg-amber-500/10"
                : "text-slate-400 hover:text-amber-500 hover:bg-amber-500/10"
            }`}
            title="Épingler cette fiche en favori ⭐"
          >
            <Star
              className={`size-3.5 ${
                marks["fiche_fav_" + i] ? "fill-amber-400 text-amber-500" : ""
              }`}
            />
          </button>
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[10px] shrink-0">
            ~{readMinutes} min
          </span>
          {isM && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
              ✓ Maîtrisée
            </span>
          )}
          {noteVal.trim() && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-semibold">
              Note
            </span>
          )}
          <SmartBridgeBadge conceptQuery={f.t} />
          <span className="arrow ml-auto">▼</span>
        </summary>
        <div className="fbody">
          <div
            onClick={() => {
              if (isBlurred) {
                playClickSound();
                setRevealedBlurSet((prev) => new Set(prev).add(i));
              }
            }}
            style={
              isBlurred
                ? {
                    filter: "blur(6px)",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "filter 0.2s ease",
                  }
                : { transition: "filter 0.2s ease" }
            }
            title={
              isBlurred
                ? "Cliquer pour révéler la synthèse (Mode Auto-Test actif)"
                : undefined
            }
          >
            {/* 1. BLOC SYNTHÈSE & FORMULE MATRICE */}
            <div className="space-y-3">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-100 flex items-start gap-2.5 shadow-2xs">
                <span className="p-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
                  💡
                </span>
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                    Formule Clé d&apos;Examen :
                  </span>
                  <span className="leading-snug block">{f.ph}</span>
                </div>
              </div>

              <div
                className="ess text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: processedEss }}
              />
            </div>
          </div>
          {isBlurred && (
            <button
              type="button"
              className="btn small my-1.5 text-[11px]"
              onClick={() => {
                playClickSound();
                setRevealedBlurSet((prev) => new Set(prev).add(i));
              }}
            >
              Révéler la synthèse et la formule clé
            </button>
          )}

          {/* 2. BLOC ÉPREUVE : EXEMPLE & PIÈGE D'EXAMEN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-1">
              <span className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <span>🔎</span>
                <span>Cas d&apos;illustration clinique :</span>
              </span>
              <p className="m-0 text-slate-700 dark:text-slate-300 leading-relaxed">
                {f.ex}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Piège d&apos;examen classique :</span>
              </span>
              <p className="m-0 text-slate-700 dark:text-slate-300 leading-relaxed">
                {f.trap}
              </p>
            </div>
          </div>

          {/* Capsule Feynman 60s - iOS Glass Card */}
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-500/20 dark:border-indigo-400/20 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Capsule Feynman 60s</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-200">
                  {capsule.auteur}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playCapsuleAudio(capsule);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                title="Écouter la synthèse audio de 60s"
              >
                <Headphones className="w-3 h-3" />
                <span>Écouter 60s</span>
              </button>
            </div>

            <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 space-y-1.5">
              <p>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  💡 Intuition :{" "}
                </span>
                {capsule.intuitionMetaphore}
              </p>
              {capsule.motsObligatoires &&
                capsule.motsObligatoires.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Mots clés 18/20 :
                    </span>
                    {capsule.motsObligatoires.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-1.5 py-0.5 rounded-md bg-white/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-[10px] font-semibold text-indigo-800 dark:text-indigo-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {matchedSchemaId && (
            <div className="mt-2.5 p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-blue-500/10 border border-cyan-500/25 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <Palette className="size-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>Schéma Vectoriel SVG Disponible</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase">
                      18/20
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
                    Modèle graphique canonique interactif pour mémoire visuelle
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-schemas", {
                      detail: { schemaId: matchedSchemaId },
                    }),
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                title="Ouvrir le schéma vectoriel haute définition"
              >
                <Eye className="size-3.5" />
                <span>Voir le Schéma SVG</span>
              </button>
            </div>
          )}

          {/* 3. BLOC ACTIONS & MÉMO DE TERRAIN */}
          <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <input
              type="text"
              value={noteVal}
              onChange={(e) => updateFicheNote(i, e.target.value)}
              placeholder="Ajouter un mémo personnel ou exemple de terrain..."
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                type="button"
                onClick={() => toggleSpeakFiche(f, i)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer min-h-[36px]"
                title="Écouter la fiche en synthèse vocale"
              >
                <Headphones className="size-3 text-amber-500" />
                <span>{isSpeaking ? "Arrêter" : "Écouter"}</span>
              </button>
              <button
                type="button"
                onClick={() => exportFicheToJournal(f, i)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer min-h-[36px]"
                title="Envoyer cette fiche et votre mémo dans le Carnet de Terrain"
              >
                <span>{exportedIdx === i ? "✓ Au carnet" : "→ Carnet"}</span>
              </button>
              <button
                type="button"
                onClick={() => toggleMastery(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                  isM
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
                }`}
              >
                {isM ? "✓ Maîtrisée" : "Marquer maîtrisée"}
              </button>
            </div>
          </div>
        </div>
      </details>
    );
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="fiches-controls-card">
        <div className="fiche-progress-container">
          <div className="fiche-progress-header">
            <span className="fiche-progress-title">
              Progression de mémorisation
            </span>
            <span className="fiche-progress-stats">
              {mastered} / {total} fiches maîtrisées ({pct}%)
            </span>
          </div>
          <div className="fiche-progress-bar">
            <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="fiches-filter-row">
          <div className="fiche-search-wrapper">
            <input
              type="text"
              className="fiche-search-input"
              placeholder="Rechercher une notion, une formule clé, un auteur ou une note..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="fiche-search-clear"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </div>
          <div className="chips flex items-center justify-between flex-wrap gap-2 mt-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className="chip shrink-0"
                  aria-pressed={filter === f.key}
                  onClick={() => {
                    setFilter(f.key);
                    setReaderIdx(0);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 w-full justify-between flex-wrap">
              <button
                type="button"
                onClick={playAllFormulasStream}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="Écouter toutes les formules clés et pièges de ce module en lecture continue"
              >
                <Headphones className="size-3.5 text-amber-600 dark:text-amber-400" />
                <span>▶ Écouter les {data.length} formules clés du module</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  className="chip"
                  aria-pressed={viewMode === "feynman60s"}
                  onClick={() => {
                    playClickSound();
                    setViewMode((m) =>
                      m === "feynman60s" ? "accordion" : "feynman60s",
                    );
                  }}
                  title="Mode Capsules Feynman 60s : visualisez les synthèses éclair et écoutez-les en podcast audio"
                >
                  {viewMode === "feynman60s"
                    ? "✓ Capsules 60s (Feynman)"
                    : "⚡️ Capsules 60s"}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={viewMode === "reader"}
                  onClick={() => {
                    playClickSound();
                    setViewMode((m) =>
                      m === "accordion" ? "reader" : "accordion",
                    );
                  }}
                  title="Basculer en mode liseuse fiche par fiche"
                >
                  {viewMode === "reader"
                    ? "✓ Mode Liseuse 1/1"
                    : "Mode Liseuse 1/1"}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={maskKeywords}
                  onClick={() => {
                    playClickSound();
                    setMaskKeywords((v) => !v);
                  }}
                  title="Mode Texte à trous : masquer uniquement les concepts en gras pour réciter activement"
                >
                  {maskKeywords ? "✓ Mots-clés masqués" : "Masquer mots-clés"}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={selfTestBlur}
                  onClick={() => {
                    playClickSound();
                    setSelfTestBlur((v) => !v);
                    setRevealedBlurSet(new Set());
                  }}
                  title="Flouter l'essentiel et la formule clé pour vous auto-interroger"
                >
                  {selfTestBlur ? "✓ Auto-test actif" : "Auto-test (Flouter)"}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={onlyFavs}
                  onClick={() => {
                    playClickSound();
                    setOnlyFavs((v) => !v);
                    setReaderIdx(0);
                  }}
                >
                  {onlyFavs
                    ? `✓ ⭐ Favoris (${favCount})`
                    : `⭐ Favoris (${favCount})`}
                </button>
                <button
                  type="button"
                  className="chip"
                  aria-pressed={onlyUnmastered}
                  onClick={() => {
                    setOnlyUnmastered((v) => !v);
                    setReaderIdx(0);
                  }}
                >
                  {onlyUnmastered
                    ? `✓ À maîtriser (${remaining})`
                    : `À maîtriser (${remaining})`}
                </button>
                {viewMode === "accordion" && (
                  <button
                    type="button"
                    className="chip"
                    onClick={toggleExpandAll}
                  >
                    {allVisibleOpen ? "Tout replier" : "Tout déplier"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="hint">Aucune fiche trouvée pour ces critères.</p>
      ) : viewMode === "reader" ? (
        <div
          onTouchStart={(e) => {
            const t = e.touches[0];
            if (!t) return;
            touchStartRef.current = { x: t.clientX, y: t.clientY };
          }}
          onTouchEnd={(e) => {
            const start = touchStartRef.current;
            const t = e.changedTouches[0];
            if (!start || !t) return;
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
              if (dx < 0 && safeReaderIdx < visible.length - 1) {
                playClickSound();
                setReaderIdx((idx) => idx + 1);
              } else if (dx > 0 && safeReaderIdx > 0) {
                playClickSound();
                setReaderIdx((idx) => idx - 1);
              }
            }
            touchStartRef.current = null;
          }}
          className="space-y-4 animate-in fade-in"
        >
          {visible[safeReaderIdx] &&
            renderFicheCard(
              visible[safeReaderIdx]!.f,
              visible[safeReaderIdx]!.i,
              true,
            )}

          {/* Barre de navigation Liseuse Zen */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs shadow-xs">
            <button
              type="button"
              disabled={safeReaderIdx <= 0}
              onClick={() => {
                playClickSound();
                setReaderIdx((idx) => Math.max(0, idx - 1));
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-30 flex items-center gap-1 cursor-pointer font-semibold transition-all active:scale-95"
            >
              <ChevronLeft className="size-4 text-amber-500" />
              <span>Précédente</span>
            </button>

            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
              Fiche {safeReaderIdx + 1} / {visible.length}
            </span>

            <button
              type="button"
              disabled={safeReaderIdx >= visible.length - 1}
              onClick={() => {
                playClickSound();
                setReaderIdx((idx) => Math.min(visible.length - 1, idx + 1));
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 disabled:opacity-30 flex items-center gap-1 cursor-pointer font-bold transition-all active:scale-95"
            >
              <span>Suivante</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : viewMode === "feynman60s" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map(({ f, i }) => {
            const cap = findCapsuleForFiche(f);
            return (
              <div
                key={i}
                className="p-5 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3.5 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                      {cap.auteur}
                    </span>
                    <button
                      type="button"
                      onClick={() => playCapsuleAudio(cap)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
                      title="Écouter le podcast 60s de cette notion"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Écouter 60s</span>
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cap.titre}
                  </h3>
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                    <p className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Intuition Feynman :
                    </p>
                    <p>{cap.intuitionMetaphore}</p>
                  </div>
                  <div className="text-xs space-y-1.5 pt-1">
                    <p className="text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        🎯 Formule clé :{" "}
                      </span>
                      {cap.formuleMatrice}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        🏢 Cas réel :{" "}
                      </span>
                      {cap.casReelApplication}
                    </p>
                    <p className="text-rose-700 dark:text-rose-400 font-medium">
                      <span className="font-bold">
                        ⚠️ Piège d&apos;examen :{" "}
                      </span>
                      {cap.piegeExamen}
                    </p>
                  </div>
                </div>

                {cap.motsObligatoires && cap.motsObligatoires.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Mots clés 18/20 :
                    </span>
                    {cap.motsObligatoires.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {findSchemaForFiche(f) && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        window.dispatchEvent(
                          new CustomEvent("pst:open-schemas", {
                            detail: { schemaId: findSchemaForFiche(f) },
                          }),
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/25 transition-all cursor-pointer"
                    >
                      <Palette className="size-3.5" />
                      <span>Schéma SVG 18/20</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div id="fichesHost">
          {visible.map(({ f, i }) => renderFicheCard(f, i, false))}
        </div>
      )}
    </div>
  );
}
