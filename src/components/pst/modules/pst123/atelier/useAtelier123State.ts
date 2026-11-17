"use client";

import { useEffect, useState } from "react";
import { CRITERES_EVALUATION_PST123 } from "@/lib/pst/data/pst123-annales";
import { playSuccessSound } from "@/lib/pst/audio-feedback";

const DRAFT_DISSERT_KEY = "pst123_atelier_draft_dissert_v1";
const CHECKLIST_KEY = "pst123_atelier_checklist_v1";

export function useAtelier123State() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon" | "oral" | "matrice"
  >("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Oral Timer & Case state
  const [oralDuration, setOralDuration] = useState<number>(10 * 60);
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

  return {
    activeMode,
    setActiveMode,
    selectedSubjectIdx,
    setSelectedSubjectIdx,
    showCorrige,
    setShowCorrige,
    copied,
    oralDuration,
    setOralDuration,
    oralTimeRemaining,
    setOralTimeRemaining,
    oralRunning,
    setOralRunning,
    selectedOralCaseIdx,
    setSelectedOralCaseIdx,
    oralChecklist,
    toggleOralChecklist,
    checkedCriteria,
    toggleCriterion,
    doneCriteria,
    pctCriteria,
    draftDissert,
    updateDraftDissert,
    annaleDrafts,
    updateAnnaleDraft,
    copyCorrige,
    dissertWordCount,
  };
}
