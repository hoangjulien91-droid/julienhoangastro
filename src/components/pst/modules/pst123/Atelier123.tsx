"use client";

import { useEffect, useState } from "react";
import {
  CRITERES_EVALUATION_PST123,
} from "@/lib/pst/data/pst123-annales";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { MatriceDubarSainsaulieu } from "./panels/MatriceDubarSainsaulieu";
import { Atelier123AnnalesSection } from "./atelier/Atelier123AnnalesSection";
import { Atelier123MethodeSection } from "./atelier/Atelier123MethodeSection";
import { Atelier123BrouillonSection } from "./atelier/Atelier123BrouillonSection";
import { Atelier123OralSection } from "./atelier/Atelier123OralSection";

const DRAFT_DISSERT_KEY = "pst123_atelier_draft_dissert_v1";
const CHECKLIST_KEY = "pst123_atelier_checklist_v1";

export function Atelier123() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon" | "oral" | "matrice"
  >("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Oral Timer & Case state
  const [oralDuration, setOralDuration] = useState<number>(10 * 60); // 10 minutes default
  const [oralTimeRemaining, setOralTimeRemaining] = useState<number>(10 * 60);
  const [oralRunning, setOralRunning] = useState<boolean>(false);
  const [selectedOralCaseIdx, setSelectedOralCaseIdx] = useState<number>(0);
  const [oralChecklist, setOralChecklist] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Checklists
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    CRITERES_EVALUATION_PST123.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (oralRunning && oralTimeRemaining > 0) {
      timer = setInterval(() => {
        setOralTimeRemaining((t) => {
          if (t <= 1) {
            setOralRunning(false);
            playSuccessSound();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [oralRunning, oralTimeRemaining]);

  useEffect(() => {
    try {
      const rawChecklist = localStorage.getItem(CHECKLIST_KEY);
      if (rawChecklist) {
        const parsed = JSON.parse(rawChecklist);
        if (Array.isArray(parsed)) {
          setCheckedCriteria(
            CRITERES_EVALUATION_PST123.map((_, i) => Boolean(parsed[i])),
          );
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_DISSERT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem(
        "pst123_annale_drafts_v1",
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
        localStorage.setItem("pst123_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function copyCorrige(titre: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${titre}\n\n${cleanText}`);
      playSuccessSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  function toggleOralChecklist(id: number, checked: boolean) {
    const next = [...oralChecklist];
    next[id] = checked;
    setOralChecklist(next);
  }

  const doneCriteria = checkedCriteria.filter(Boolean).length;
  const pctCriteria = CRITERES_EVALUATION_PST123.length
    ? Math.round((doneCriteria * 100) / CRITERES_EVALUATION_PST123.length)
    : 0;

  const dissertWordCount = draftDissert.trim()
    ? draftDissert.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header informatif sur l'examen Cnam PST123 */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-500/25 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1.5 shadow-2xs mb-2">
              <span>
                Format d&apos;examen officiel · PST123 · Élisabeth LUCY
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 m-0">
              Atelier d&apos;Écriture &amp; Annales PST123 (Option A &amp;
              Option B)
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30">
            <span>2h00 sans documents</span>
            <span>•</span>
            <span>6 séances de référence</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          À l&apos;examen de PST123, l&apos;évaluation porte sur votre maîtrise
          des grilles d&apos;analyse sociologique et déontologique : l&apos;
          <b>Option A (Dissertation théorique)</b> ou l&apos;
          <b>Option B (Analyse de situation de travail / Cas clinique)</b>. Cet
          atelier rassemble <b>8 annales d&apos;examen rédigées</b>, leurs
          corrigés modèles d&apos;excellence, ainsi que la méthode dialectique
          complète (Dubar, Bourdieu, Sainsaulieu, Honneth &amp; Déontologie).
        </p>

        {/* Segmented Control */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-blue-500/20">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("annales");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "annales"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>📜 Annales : Sujets rédigés &amp; Cas cliniques</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              8 sujets
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("methode");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "methode"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>📐 Méthodologie &amp; Grilles d&apos;Analyse</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("brouillon");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "brouillon"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>✍️ Mon Brouillon d&apos;Entraînement</span>
            {dissertWordCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                {dissertWordCount} mots
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("oral");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "oral"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/15"
            }`}
          >
            <span>🎤 Simulateur Oral (Séances 4 &amp; 5)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("matrice");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "matrice"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-purple-500/15"
            }`}
          >
            <span>🧩 Matrice Dubar &amp; Sainsaulieu ✦</span>
          </button>
        </div>
      </div>

      {/* MODE 1 : ANNALES OFFICIELLES & CAS CLINIQUES */}
      {activeMode === "annales" && (
        <Atelier123AnnalesSection
          selectedSubjectIdx={selectedSubjectIdx}
          onSelectSubjectIdx={(idx) => {
            setSelectedSubjectIdx(idx);
            setShowCorrige(false);
          }}
          showCorrige={showCorrige}
          onToggleShowCorrige={() => setShowCorrige((v) => !v)}
          copied={copied}
          onCopyCorrige={copyCorrige}
          annaleDrafts={annaleDrafts}
          onUpdateAnnaleDraft={updateAnnaleDraft}
        />
      )}

      {/* MODE 2 : MÉTHODOLOGIE & GRILLES CONCEPTUELLES */}
      {activeMode === "methode" && (
        <Atelier123MethodeSection
          checkedCriteria={checkedCriteria}
          onToggleCriterion={toggleCriterion}
          doneCriteria={doneCriteria}
          pctCriteria={pctCriteria}
        />
      )}

      {/* MODE 3 : BROUILLON LIBRE DE COMPOSITION */}
      {activeMode === "brouillon" && (
        <Atelier123BrouillonSection
          draftDissert={draftDissert}
          onUpdateDraftDissert={updateDraftDissert}
          dissertWordCount={dissertWordCount}
        />
      )}

      {/* MODE 4 : PRÉSENTATION ORALE (SÉANCES 4 & 5 E. LUCY) */}
      {activeMode === "oral" && (
        <Atelier123OralSection
          oralDuration={oralDuration}
          onSetOralDuration={setOralDuration}
          oralTimeRemaining={oralTimeRemaining}
          onSetOralTimeRemaining={setOralTimeRemaining}
          oralRunning={oralRunning}
          onToggleOralRunning={() => {
            triggerHaptic("selection");
            playClickSound();
            setOralRunning((r) => !r);
          }}
          onResetOralTimer={() => {
            triggerHaptic("selection");
            playClickSound();
            setOralRunning(false);
            setOralTimeRemaining(oralDuration);
          }}
          selectedOralCaseIdx={selectedOralCaseIdx}
          onSelectOralCaseIdx={setSelectedOralCaseIdx}
          oralChecklist={oralChecklist}
          onToggleOralChecklist={toggleOralChecklist}
        />
      )}

      {/* MODE 5 : MATRICE DUBAR & SAINSAULIEU */}
      {activeMode === "matrice" && (
        <div className="space-y-5 animate-fadeIn">
          <MatriceDubarSainsaulieu />
        </div>
      )}
    </div>
  );
}
