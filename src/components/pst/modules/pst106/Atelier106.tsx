"use client";

import { useEffect, useState } from "react";
import {
  ATELIER_CRITERES,
  ANNALES_TEXTES_106,
  CRITERES_TEXTE_SUPPORT,
  type AnnaleTexteItem,
} from "@/lib/pst/data/pst106";
import {
  playClickSound,
  playSuccessSound,
} from "@/lib/pst/audio-feedback";
import { Atelier106AnnalesView } from "./atelier/Atelier106AnnalesView";
import { Atelier106MethodeView } from "./atelier/Atelier106MethodeView";
import { Atelier106BrouillonView } from "./atelier/Atelier106BrouillonView";

const CHECKLIST_KEY = "pst106_atelier_checklist_v1";
const DRAFT_KEY = "pst106_atelier_draft_v1";
const CHECKLIST_TEXTE_KEY = "pst106_atelier_checklist_texte_v1";

export function Atelier106() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon"
  >("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Checklists
  const [checkedDissert, setCheckedDissert] = useState<boolean[]>(() =>
    ATELIER_CRITERES.map(() => false),
  );
  const [checkedTexte, setCheckedTexte] = useState<boolean[]>(() =>
    CRITERES_TEXTE_SUPPORT.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<number, string>>({});

  const currentSubject: AnnaleTexteItem =
    ANNALES_TEXTES_106[selectedSubjectIdx] ?? ANNALES_TEXTES_106[0];

  useEffect(() => {
    try {
      const rawDissert = localStorage.getItem(CHECKLIST_KEY);
      if (rawDissert) {
        const parsed = JSON.parse(rawDissert);
        if (Array.isArray(parsed)) {
          setCheckedDissert(ATELIER_CRITERES.map((_, i) => Boolean(parsed[i])));
        }
      }
      const rawTexte = localStorage.getItem(CHECKLIST_TEXTE_KEY);
      if (rawTexte) {
        const parsed = JSON.parse(rawTexte);
        if (Array.isArray(parsed)) {
          setCheckedTexte(
            CRITERES_TEXTE_SUPPORT.map((_, i) => Boolean(parsed[i])),
          );
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem(
        "pst106_annale_drafts_v1",
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

  function toggleDissertCheck(i: number) {
    setCheckedDissert((c) => {
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

  function toggleTexteCheck(i: number) {
    setCheckedTexte((c) => {
      const next = c.map((v, idx) => (idx === i ? !v : v));
      if (next[i]) playSuccessSound();
      try {
        localStorage.setItem(CHECKLIST_TEXTE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function updateDraftDissert(val: string) {
    setDraftDissert(val);
    try {
      localStorage.setItem(DRAFT_KEY, val);
    } catch {
      /* ignore */
    }
  }

  function updateAnnaleDraft(subjectId: number, val: string) {
    setAnnaleDrafts((prev) => {
      const next = { ...prev, [subjectId]: val };
      try {
        localStorage.setItem("pst106_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function copyCorrige(titre: string, citation: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(
        `${titre}\n\nCitation : ${citation}\n\n${cleanText}`,
      );
      playSuccessSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  // Progress metrics
  const doneDissert = checkedDissert.filter(Boolean).length;
  const pctDissert = ATELIER_CRITERES.length
    ? Math.round((doneDissert * 100) / ATELIER_CRITERES.length)
    : 0;

  const doneTexte = checkedTexte.filter(Boolean).length;
  const pctTexte = CRITERES_TEXTE_SUPPORT.length
    ? Math.round((doneTexte * 100) / CRITERES_TEXTE_SUPPORT.length)
    : 0;

  const dissertWordCount = draftDissert.trim()
    ? draftDissert.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header informatif sur l'examen Cnam */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-rose-500/10 to-amber-500/10 backdrop-blur-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Format d&apos;examen officiel · Pr. Christine Lagabrielle
            </div>
            <h2 className="text-base sm:text-lg font-bold mt-0.5 text-slate-900 dark:text-slate-100">
              Atelier d&apos;Écriture &amp; Annales Officielles (Option A &amp;
              B)
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <span>2h00 sans documents</span>
            <span>•</span>
            <span>Session 1 : 11 fév. 2027</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          À l&apos;examen, vous aurez <b>toujours le choix</b> entre deux
          options : l&apos;<b>Option A (Dissertation classique)</b> et l&apos;
          <b>Option B (Question avec texte en support)</b>. Cet atelier rassemble
          les{" "}
          <b>8 sujets authentiques d&apos;annales avec texte en support</b>,
          leurs corrigés rédigés d&apos;excellence, ainsi que la méthode
          dialectique complète.
        </p>

        {/* Segmented Control */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-amber-500/20">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("annales");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "annales"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>📜 Annales : Sujets avec texte (Option B)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              8 sujets
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("methode");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "methode"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>📐 Méthodologie &amp; Squelette dialectique</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("brouillon");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "brouillon"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>✍️ Mon Brouillon Libre (Dissertation)</span>
            {dissertWordCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                {dissertWordCount} mots
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MODE 1 : ANNALES AVEC TEXTE EN SUPPORT (OPTION B) */}
      {activeMode === "annales" && (
        <Atelier106AnnalesView
          selectedSubjectIdx={selectedSubjectIdx}
          onSelectSubject={(idx) => {
            setSelectedSubjectIdx(idx);
            setShowCorrige(false);
          }}
          currentSubject={currentSubject}
          annaleDrafts={annaleDrafts}
          onUpdateDraft={updateAnnaleDraft}
          showCorrige={showCorrige}
          onToggleCorrige={() => setShowCorrige((v) => !v)}
          copied={copied}
          onCopyCorrige={copyCorrige}
        />
      )}

      {/* MODE 2 : MÉTHODOLOGIE & SQUELETTE DIALECTIQUE */}
      {activeMode === "methode" && (
        <Atelier106MethodeView
          checkedTexte={checkedTexte}
          onToggleTexteCheck={toggleTexteCheck}
          pctTexte={pctTexte}
          doneTexte={doneTexte}
          checkedDissert={checkedDissert}
          onToggleDissertCheck={toggleDissertCheck}
          pctDissert={pctDissert}
          doneDissert={doneDissert}
        />
      )}

      {/* MODE 3 : BROUILLON LIBRE DE DISSERTATION */}
      {activeMode === "brouillon" && (
        <Atelier106BrouillonView
          draftDissert={draftDissert}
          onUpdateDraftDissert={updateDraftDissert}
          dissertWordCount={dissertWordCount}
        />
      )}
    </div>
  );
}
