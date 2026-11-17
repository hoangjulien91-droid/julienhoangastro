"use client";

import { useEffect, useState } from "react";
import {
  ANNALES_PST108,
  CRITERES_EVALUATION_PST108,
  type AnnalePst108Item,
  type Pst108ProfId,
} from "@/lib/pst/data/pst108-annales";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Atelier108AnnalesView } from "./atelier/Atelier108AnnalesView";
import { Atelier108MethodeView } from "./atelier/Atelier108MethodeView";
import { Atelier108BrouillonView } from "./atelier/Atelier108BrouillonView";

const DRAFT_DISSERT_KEY = "pst108_atelier_draft_dissert_v1";
const CHECKLIST_KEY = "pst108_atelier_checklist_v1";

export function Atelier108() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon"
  >("annales");
  const [profFilter, setProfFilter] = useState<"all" | Pst108ProfId>("all");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    ANNALES_PST108[0].id,
  );
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Checklists
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    CRITERES_EVALUATION_PST108.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<string, string>>({});

  const filteredSubjects =
    profFilter === "all"
      ? ANNALES_PST108
      : ANNALES_PST108.filter((s) => s.prof === profFilter);
  const currentSubjectIdxInFiltered = Math.max(
    0,
    filteredSubjects.findIndex((s) => s.id === selectedSubjectId),
  );
  const currentSubject: AnnalePst108Item =
    filteredSubjects[currentSubjectIdxInFiltered] ??
    filteredSubjects[0] ??
    ANNALES_PST108[0];

  useEffect(() => {
    try {
      const rawChecklist = localStorage.getItem(CHECKLIST_KEY);
      if (rawChecklist) {
        const parsed = JSON.parse(rawChecklist);
        if (Array.isArray(parsed)) {
          setCheckedCriteria(
            CRITERES_EVALUATION_PST108.map((_, i) => Boolean(parsed[i])),
          );
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_DISSERT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem(
        "pst108_annale_drafts_v1",
      );
      if (savedAnnaleDraftsRaw) {
        const parsedDrafts = JSON.parse(savedAnnaleDraftsRaw);
        if (parsedDrafts && typeof parsedDrafts === "object") {
          setAnnaleDrafts(parsedDrafts);
        }
      }
    } catch {
      /* ignore */
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggleCriterion(i: number) {
    setCheckedCriteria((c) => {
      const next = c.map((v, idx) => (idx === i ? !v : v));
      if (next[i]) playSuccessSound();
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function updateDraftDissert(val: string) {
    setDraftDissert(val);
    try {
      localStorage.setItem(DRAFT_DISSERT_KEY, val);
    } catch {
      /* ignore */
    }
  }

  function updateAnnaleDraft(subjectId: string, val: string) {
    setAnnaleDrafts((prev) => {
      const next = { ...prev, [subjectId]: val };
      try {
        localStorage.setItem("pst108_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function copyCorrige(titre: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(
        `${titre}\n\nCORRIGÉ D'EXCELLENCE :\n${cleanText}`,
      );
      setCopied(true);
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  function handleSelectProfFilter(nextFilter: "all" | Pst108ProfId) {
    setProfFilter(nextFilter);
    const nextList =
      nextFilter === "all"
        ? ANNALES_PST108
        : ANNALES_PST108.filter((s) => s.prof === nextFilter);
    if (
      nextList.length > 0 &&
      !nextList.some((s) => s.id === selectedSubjectId)
    ) {
      setSelectedSubjectId(nextList[0].id);
      setShowCorrige(false);
    }
  }

  const doneCriteria = checkedCriteria.filter(Boolean).length;
  const pctCriteria = Math.round(
    (doneCriteria / CRITERES_EVALUATION_PST108.length) * 100,
  );

  return (
    <div className="space-y-6">
      {/* HEADER DE L'ATELIER PST108 */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs mb-2">
              <span>
                ✦ Atelier d&apos;Écriture &amp; Annales Officielles PST108
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 tracking-tight m-0">
              Entraînement Intensif à l&apos;Épreuve sur Table 3h00 (3 × 1h00 par
              prof)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Examen terminal de 3h00 divisé en 3 sous-épreuves de 1h00 : M.
              Éric LUCY, M. Francis VALLS et Mme Véronique MAROT.{" "}
              {ANNALES_PST108.length} annales rédigées (1h00 par partie), grille
              critériée CNAM et copies modèles d&apos;excellence (18+/20).
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("annales");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "annales"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              📚 {ANNALES_PST108.length} Annales (3 Profs)
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("methode");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "methode"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              📐 Méthode &amp; Grille
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("brouillon");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "brouillon"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              ✍️ Brouillon Libre
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1 : ANNALES TYPES ET CORRIGÉS D'EXCELLENCE */}
      {activeMode === "annales" && (
        <Atelier108AnnalesView
          filteredSubjects={filteredSubjects}
          currentSubject={currentSubject}
          currentSubjectIdxInFiltered={currentSubjectIdxInFiltered}
          profFilter={profFilter}
          onSelectProfFilter={handleSelectProfFilter}
          onSelectSubjectId={(id) => {
            setSelectedSubjectId(id);
            setShowCorrige(false);
          }}
          annaleDrafts={annaleDrafts}
          onUpdateAnnaleDraft={updateAnnaleDraft}
          showCorrige={showCorrige}
          onToggleCorrige={() => setShowCorrige((v) => !v)}
          copied={copied}
          onCopyCorrige={copyCorrige}
        />
      )}

      {/* MODE 2 : MÉTHODOLOGIE & GRILLES CONCEPTUELLES */}
      {activeMode === "methode" && (
        <Atelier108MethodeView
          checkedCriteria={checkedCriteria}
          onToggleCriterion={toggleCriterion}
          doneCriteria={doneCriteria}
          pctCriteria={pctCriteria}
        />
      )}

      {/* MODE 3 : BROUILLON LIBRE DE COMPOSITION */}
      {activeMode === "brouillon" && (
        <Atelier108BrouillonView
          draftDissert={draftDissert}
          onUpdateDraftDissert={updateDraftDissert}
        />
      )}
    </div>
  );
}
