"use client";

import { useMemo, useState } from "react";
import type { AMap, ClozeItem } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { ClozeHeader } from "./cloze/ClozeHeader";
import { ClozeCard } from "./cloze/ClozeCard";

interface ClozeProps {
  data: ClozeItem[];
  authors: AMap;
  hint: string;
}

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’\-]/g, " ");
}

export function Cloze({ data, authors, hint }: ClozeProps) {
  const [mode, setMode] = useState<"flash" | "input">("flash");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [inputs, setInputs] = useState<
    Record<string, { value: string; checked: boolean }>
  >({});

  const allBlankKeys = useMemo(() => {
    const keys: string[] = [];
    data.forEach(([, segments], ci) => {
      segments.forEach((sg, si) => {
        if (typeof sg !== "string") {
          keys.push(`${ci}-${si}`);
        }
      });
    });
    return keys;
  }, [data]);

  const totalBlanks = allBlankKeys.length;
  const revealedCount = revealed.size;
  const pctRevealed =
    totalBlanks > 0 ? Math.round((revealedCount * 100) / totalBlanks) : 0;

  // Calcul score mode saisie
  const checkedInputsCount = Object.values(inputs).filter(
    (x) => x.checked,
  ).length;
  const correctInputsCount = useMemo(() => {
    let count = 0;
    data.forEach(([, segments], ci) => {
      segments.forEach((sg, si) => {
        if (typeof sg !== "string") {
          const key = `${ci}-${si}`;
          const item = inputs[key];
          if (item?.checked && norm(item.value) === norm(sg.h)) {
            count++;
          }
        }
      });
    });
    return count;
  }, [data, inputs]);

  const pctAccuracy =
    checkedInputsCount > 0
      ? Math.round((correctInputsCount * 100) / checkedInputsCount)
      : 0;

  function toggle(key: string) {
    playClickSound();
    triggerHaptic("selection");
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleInputChange(key: string, val: string) {
    setInputs((prev) => ({
      ...prev,
      [key]: { value: val, checked: false },
    }));
  }

  function checkInput(key: string, target: string) {
    const curVal = inputs[key]?.value || "";
    const isOk = norm(curVal) === norm(target);
    if (isOk) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("warning");
    }
    setInputs((prev) => ({
      ...prev,
      [key]: { value: curVal, checked: true },
    }));
  }

  function revealSingleInput(key: string, target: string) {
    playClickSound();
    triggerHaptic("selection");
    setInputs((prev) => ({
      ...prev,
      [key]: { value: target, checked: true },
    }));
  }

  function resetAll() {
    playClickSound();
    triggerHaptic("selection");
    setRevealed(new Set());
    setInputs({});
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Actions Header */}
      <ClozeHeader
        mode={mode}
        onSetMode={setMode}
        revealedCount={revealedCount}
        totalBlanks={totalBlanks}
        pctRevealed={pctRevealed}
        checkedInputsCount={checkedInputsCount}
        correctInputsCount={correctInputsCount}
        pctAccuracy={pctAccuracy}
        onRevealAll={() => setRevealed(new Set(allBlankKeys))}
        onHideAll={() => setRevealed(new Set())}
        onResetAll={resetAll}
      />

      {/* Cloze Cards List */}
      <div id="clozeHost" className="space-y-4">
        {data.map(([axis, segments], ci) => (
          <ClozeCard
            key={ci}
            axis={axis}
            segments={segments}
            ci={ci}
            authors={authors}
            mode={mode}
            revealed={revealed}
            inputs={inputs}
            norm={norm}
            onToggle={toggle}
            onInputChange={handleInputChange}
            onCheckInput={checkInput}
            onRevealSingleInput={revealSingleInput}
          />
        ))}
      </div>
    </div>
  );
}
