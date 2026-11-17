"use client";

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { RedacItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  REDAC_DRAFTS_KEY,
  getDefaultIntro,
  buildCompiledIntro,
  type IntroComponents,
} from "@/lib/pst/data/redac-data";
import { RedacPilotBar } from "./redac/RedacPilotBar";
import { RedacSubjectCard } from "./redac/RedacSubjectCard";

interface RedacProps {
  data: RedacItem[];
  hint: string;
}

export function Redac({ data, hint }: RedacProps) {
  const [openPlan, setOpenPlan] = useState<Set<number>>(new Set());
  const [openCorrige, setOpenCorrige] = useState<Set<number>>(new Set());
  const [doneItems, setDoneItems] = useState<Set<string>>(new Set());
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Exam Timer State
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  // Filter & Blind Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [blindMode, setBlindMode] = useState(true);

  // Atelier Intro & Grille Cnam
  const [openAtelier, setOpenAtelier] = useState<Set<number>>(new Set());
  const [openGrid, setOpenGrid] = useState<Set<number>>(new Set());
  const [gridScores, setGridScores] = useState<
    Record<string, { c1: boolean; c2: boolean; c3: boolean; c4: boolean }>
  >({});
  const [introInputs, setIntroInputs] = useState<
    Record<string, IntroComponents>
  >({});

  function toggleGridCriterion(
    subjectKey: string,
    crit: "c1" | "c2" | "c3" | "c4",
  ) {
    playClickSound();
    setGridScores((prev) => {
      const current = prev[subjectKey] ?? {
        c1: false,
        c2: false,
        c3: false,
        c4: false,
      };
      return {
        ...prev,
        [subjectKey]: {
          ...current,
          [crit]: !current[crit],
        },
      };
    });
  }

  const insertIntroIntoDraft = useCallback((subjectKey: string, subjectTitle: string) => {
    playSuccessSound();
    const cur = introInputs[subjectKey] ?? getDefaultIntro(subjectTitle);
    const compiled = buildCompiledIntro(cur);

    setDrafts((prev) => {
      const existing = prev[subjectKey] ?? "";
      const next = compiled + existing;
      try {
        window.localStorage.setItem(
          REDAC_DRAFTS_KEY,
          JSON.stringify({ ...prev, [subjectKey]: next }),
        );
      } catch {
        // ignore
      }
      return { ...prev, [subjectKey]: next };
    });
  }, [introInputs]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(REDAC_DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setDrafts(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Timer Tick Effect
  useEffect(() => {
    if (!timerActive || timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setTimerActive(false);
      playSuccessSound();
      return;
    }
    const id = setInterval(() => {
      setTimerSeconds((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [timerActive, timerSeconds]);

  function startExamTimer(minutes: number) {
    playClickSound();
    const secs = minutes * 60;
    setTimerSeconds(secs);
    setTimerActive(true);
  }

  function toggleTimerActive() {
    playClickSound();
    setTimerActive((a) => !a);
  }

  function resetTimer() {
    playClickSound();
    setTimerActive(false);
    setTimerSeconds(null);
  }

  function updateDraft(subjectKey: string, val: string) {
    setDrafts((prev) => {
      const next = { ...prev, [subjectKey]: val };
      try {
        window.localStorage.setItem(REDAC_DRAFTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function toggleIdxInSet(
    setter: React.Dispatch<React.SetStateAction<Set<number>>>,
    idx: number,
  ) {
    playClickSound();
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function toggleDone(key: string) {
    playClickSound();
    setDoneItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function copyCorrige(subject: string, corrige: string, idx: number) {
    const cleanText = corrige.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${subject}\n\n${cleanText}`);
      playSuccessSound();
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      // ignore
    }
  }

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data;
    return data.filter(([subj, pts, corr]) => {
      return (
        subj.toLowerCase().includes(q) ||
        corr.toLowerCase().includes(q) ||
        pts.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [data, searchQuery]);

  const totalPoints = data.reduce((acc, [, pts]) => acc + pts.length, 0);
  const doneCount = doneItems.size;
  const pct = totalPoints > 0 ? Math.round((doneCount * 100) / totalPoints) : 0;

  return (
    <div className="space-y-4">
      <p className="hint">{hint}</p>

      {/* 1. BARRE DE PILOTAGE ÉPREUVE (Minuteur, Progression & Mode Aveugle) */}
      <RedacPilotBar
        doneCount={doneCount}
        totalPoints={totalPoints}
        pct={pct}
        timerSeconds={timerSeconds}
        timerActive={timerActive}
        onStartTimer={startExamTimer}
        onToggleTimer={toggleTimerActive}
        onResetTimer={resetTimer}
        blindMode={blindMode}
        onToggleBlindMode={() => {
          playClickSound();
          setBlindMode((b) => !b);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. LISTE DES SUJETS DE DISSERTATION */}
      <div id="redacHost" className="space-y-4">
        {filteredData.map(([subject, points, corrige], idx) => {
          const originalIdx = data.findIndex(([s]) => s === subject);
          const activeIdx = originalIdx >= 0 ? originalIdx : idx;
          const planOpen = openPlan.has(activeIdx);
          const corrigeOpen = openCorrige.has(activeIdx);
          const draftKey = subject.slice(0, 48);
          const draftVal = drafts[draftKey] ?? "";

          return (
            <RedacSubjectCard
              key={activeIdx}
              subject={subject}
              points={points}
              corrige={corrige}
              activeIdx={activeIdx}
              totalSubjects={data.length}
              draftVal={draftVal}
              onUpdateDraft={(val) => updateDraft(draftKey, val)}
              planOpen={planOpen}
              onTogglePlan={() => toggleIdxInSet(setOpenPlan, activeIdx)}
              corrigeOpen={corrigeOpen}
              onToggleCorrige={() => toggleIdxInSet(setOpenCorrige, activeIdx)}
              atelierOpen={openAtelier.has(activeIdx)}
              onToggleAtelier={() => toggleIdxInSet(setOpenAtelier, activeIdx)}
              gridOpen={openGrid.has(activeIdx)}
              onToggleGrid={() => toggleIdxInSet(setOpenGrid, activeIdx)}
              gridScore={
                gridScores[draftKey] ?? {
                  c1: false,
                  c2: false,
                  c3: false,
                  c4: false,
                }
              }
              onToggleCriterion={(crit) => toggleGridCriterion(draftKey, crit)}
              doneItems={doneItems}
              onToggleDone={toggleDone}
              introInput={introInputs[draftKey] ?? getDefaultIntro(subject)}
              onChangeIntro={(field, value) => {
                setIntroInputs((prev) => ({
                  ...prev,
                  [draftKey]: {
                    ...(prev[draftKey] ?? getDefaultIntro(subject)),
                    [field]: value,
                  },
                }));
              }}
              onInsertIntro={() => insertIntroIntoDraft(draftKey, subject)}
              onCopyCorrige={() => copyCorrige(subject, corrige, activeIdx)}
              isCopied={copiedIdx === activeIdx}
            />
          );
        })}
      </div>
    </div>
  );
}
