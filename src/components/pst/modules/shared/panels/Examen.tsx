"use client";

import { useEffect, useState, useMemo } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { RedacItem } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { ExamTimerBar } from "./exam/ExamTimerBar";
import { ExamDraftArea } from "./exam/ExamDraftArea";
import { ExamCorrectionRubric } from "./exam/ExamCorrectionRubric";

interface ExamenProps {
  store: PstStore;
  onStoreChange: () => void;
  data: RedacItem[];
  hint: string;
}

const TARGET_SECONDS = 30 * 60;

const CANONICAL_TERMS = [
  "Clot",
  "Dejours",
  "Wisner",
  "Bourdieu",
  "Habermas",
  "Honneth",
  "Valls",
  "Castra",
  "Dubar",
  "Sainsaulieu",
  "Bobillier",
  "Rabardel",
  "Leplat",
  "Canguilhem",
  "pouvoir d'agir",
  "travail réel",
  "travail prescrit",
  "genre professionnel",
  "reconnaissance",
  "sublimation",
  "métis",
  "coopération",
  "agir communicationnel",
  "pouvoir symbolique",
  "méthode IOD",
  "double transaction",
  "genèse instrumentale",
  "acceptation située",
  "autoconfrontation",
  "déontologie",
];

export function Examen({ store, onStoreChange, data, hint }: ExamenProps) {
  const [subjectIdx, setSubjectIdx] = useState(0);
  const subject = (data[subjectIdx] ?? data[0]) as RedacItem;
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [draft, setDraft] = useState(() =>
    String(store.getMarks()["exam_draft_0"] ?? ""),
  );
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scoreShown, setScoreShown] = useState(false);

  useEffect(() => {
    setDraft(String(store.getMarks()["exam_draft_" + subjectIdx] ?? ""));
  }, [subjectIdx, store]);

  function handleDraftChange(val: string) {
    setDraft(val);
    store.setMark("exam_draft_" + subjectIdx, val);
  }

  useEffect(() => {
    if (finished || paused) return;
    const iv = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(iv);
  }, [finished, paused]);

  function selectSubject(nextIdx: number) {
    playClickSound();
    triggerHaptic("selection");
    setSubjectIdx(nextIdx);
    setElapsed(0);
    setPaused(false);
    setFinished(false);
    setChecked(new Set());
    setScoreShown(false);
  }

  function newSubject() {
    const nextIdx = (subjectIdx + 1) % data.length;
    selectSubject(nextIdx);
  }

  function finish() {
    playSuccessSound();
    triggerHaptic("success");
    setFinished(true);
  }

  function toggleAttendu(i: number) {
    playClickSound();
    triggerHaptic("selection");
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function computeScore() {
    playSuccessSound();
    triggerHaptic("success");
    store.recordScore("examen", checked.size, subject[1].length);
    onStoreChange();
    setScoreShown(true);
  }

  const pctTime = Math.min(100, Math.round((elapsed * 100) / TARGET_SECONDS));
  const isOverTime = elapsed > TARGET_SECONDS;

  // Extraction automatique des concepts/auteurs attendus dans le sujet
  const expectedKeywords = useMemo(() => {
    const rawText = (subject[1].join(" ") + " " + (subject[2] ?? "")).replace(
      /&rsquo;|&apos;/g,
      "'",
    );
    const boldMatches = Array.from(
      rawText.matchAll(/<(?:b|strong)>([^<]{3,38})<\/(?:b|strong)>/gi),
    ).map((m) => m[1]!.replace(/[:.,;()]/g, "").trim());
    const pool = [...boldMatches];
    const lowRaw = rawText.toLowerCase();
    for (const term of CANONICAL_TERMS) {
      if (lowRaw.includes(term.toLowerCase())) {
        pool.push(term);
      }
    }
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const item of pool) {
      const k = item.toLowerCase();
      if (
        k.length >= 4 &&
        !seen.has(k) &&
        !/^(partie|introduction|conclusion|étape)/i.test(k)
      ) {
        seen.add(k);
        unique.push(item);
      }
      if (unique.length >= 8) break;
    }
    return unique;
  }, [subject]);

  const draftLower = draft.toLowerCase();
  const matchedKeywordsCount = expectedKeywords.filter((kw) =>
    draftLower.includes(kw.toLowerCase()),
  ).length;

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      <div id="examenHost" className="space-y-4">
        {/* Top Timer & Header Card */}
        <ExamTimerBar
          subjectIdx={subjectIdx}
          totalSubjects={data.length}
          pctTime={pctTime}
          isOverTime={isOverTime}
          elapsed={elapsed}
          paused={paused}
          finished={finished}
          onTogglePause={() => setPaused((p) => !p)}
        />

        {/* Subject Card & Draft Area */}
        <ExamDraftArea
          data={data}
          subjectIdx={subjectIdx}
          subject={subject}
          draft={draft}
          onDraftChange={handleDraftChange}
          onSelectSubject={selectSubject}
          onNewSubject={newSubject}
          finished={finished}
          onFinish={finish}
          onContinueWriting={() => setFinished(false)}
          expectedKeywords={expectedKeywords}
          matchedKeywordsCount={matchedKeywordsCount}
          draftLower={draftLower}
        />

        {/* Correction Rubric & Model Solution */}
        {finished && (
          <ExamCorrectionRubric
            subject={subject}
            checked={checked}
            onToggleAttendu={toggleAttendu}
            onComputeScore={computeScore}
            scoreShown={scoreShown}
          />
        )}
      </div>
    </div>
  );
}
