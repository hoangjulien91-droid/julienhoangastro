"use client";

import { useEffect, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { EXAM_SUBJECTS } from "@/lib/pst/data/pst123";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type ExamType,
  ExamSetupView,
} from "./exam/ExamSetupView";
import { ExamActiveView } from "./exam/ExamActiveView";
import { ExamDebriefView } from "./exam/ExamDebriefView";
import { ExamHistoryView } from "./exam/ExamHistoryView";

export type { ExamType };

function pickSubject(type: ExamType) {
  const pool =
    type === "random"
      ? EXAM_SUBJECTS
      : EXAM_SUBJECTS.filter((s) => s.type === type);
  const list = pool.length ? pool : EXAM_SUBJECTS;
  return list[Math.floor(Math.random() * list.length)] ?? EXAM_SUBJECTS[0];
}

interface ExamProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Exam({ store, onStoreChange }: ExamProps) {
  const [view, setView] = useState<"setup" | "active" | "debrief">("setup");
  const [examType, setExamType] = useState<ExamType>("random");
  const [duration, setDuration] = useState(45);
  const [subject, setSubject] = useState(() => EXAM_SUBJECTS[0]);
  const [draft, setDraft] = useState(() =>
    String(store.getMarks()["exam_draft_123"] ?? ""),
  );
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);

  function handleDraftChange(val: string) {
    setDraft(val);
    store.setMark("exam_draft_123", val);
  }

  useEffect(() => {
    if (view !== "active" || remaining <= 0 || paused) return;
    const iv = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(iv);
  }, [view, remaining, paused]);

  function start() {
    playClickSound();
    triggerHaptic("selection");
    setSubject(pickSubject(examType));
    setDraft("");
    setRemaining(duration * 60);
    setPaused(false);
    setChecked(new Set());
    setSaved(false);
    setView("active");
  }

  function finish() {
    playSuccessSound();
    triggerHaptic("success");
    setView("debrief");
  }

  function abandon() {
    playClickSound();
    triggerHaptic("selection");
    setView("setup");
  }

  function toggleCriterion(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
        playClickSound();
        triggerHaptic("selection");
      } else {
        next.add(i);
        playSuccessSound();
        triggerHaptic("success");
      }
      return next;
    });
  }

  function save() {
    if (!subject) return;
    store.addExam({
      score: checked.size,
      total: subject.criteria.length,
      date: new Date().toISOString().slice(0, 10),
      type: subject.type,
    });
    playSuccessSound();
    triggerHaptic("success");
    onStoreChange();
    setSaved(true);
  }

  function copyDraft() {
    if (
      !draft.trim() ||
      typeof navigator === "undefined" ||
      !navigator.clipboard
    )
      return;
    navigator.clipboard
      .writeText(
        `${subject ? (subject.titre || subject.t) + "\n\n" : ""}${draft}`,
      )
      .then(() => {
        playSuccessSound();
        triggerHaptic("success");
        setCopiedDraft(true);
        setTimeout(() => setCopiedDraft(false), 1800);
      })
      .catch(() => {});
  }

  const history = store.getExams();

  return (
    <div className="space-y-5">
      <p className="hint">
        Mets-toi en conditions réelles d&apos;examen : sujet tiré au sort ou
        choisi, chrono, zone de rédaction de brouillon, et auto-évaluation
        guidée avec corrigé d&apos;élite.
      </p>

      {/* 1. Setup Screen */}
      {view === "setup" && (
        <ExamSetupView
          examType={examType}
          onExamTypeChange={setExamType}
          duration={duration}
          onDurationChange={setDuration}
          onStart={start}
        />
      )}

      {/* 2. Active Exam Screen */}
      {view === "active" && subject && (
        <ExamActiveView
          subject={subject}
          remaining={remaining}
          duration={duration}
          paused={paused}
          draft={draft}
          copiedDraft={copiedDraft}
          onTogglePause={() => {
            playClickSound();
            triggerHaptic("selection");
            setPaused((p) => !p);
          }}
          onDraftChange={handleDraftChange}
          onCopyDraft={copyDraft}
          onAbandon={abandon}
          onFinish={finish}
        />
      )}

      {/* 3. Debrief & Self-evaluation Screen */}
      {view === "debrief" && subject && (
        <ExamDebriefView
          subject={subject}
          checked={checked}
          saved={saved}
          onToggleCriterion={toggleCriterion}
          onBackToMenu={() => setView("setup")}
          onSaveScore={save}
        />
      )}

      {/* 4. Past Exams History Card */}
      <ExamHistoryView
        history={history}
        onClearHistory={() => {
          store.clearExams();
          onStoreChange();
        }}
      />
    </div>
  );
}

export default Exam;
