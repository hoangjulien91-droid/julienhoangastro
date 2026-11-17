"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { SCENARIOS_AUDIT_DIGITAL } from "@/lib/pst/data/pst124-audit-data";
import { AuditDigitalResultCard } from "./audit/AuditDigitalResultCard";
import { AuditDigitalStepCard } from "./audit/AuditDigitalStepCard";

interface AuditDigitalProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function AuditDigital({ store, onStoreChange }: AuditDigitalProps) {
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState({
    acceptability: 50,
    alienation: 30,
    pouvoirAgir: 50,
  });
  const [selected, setSelected] = useState<number | null>(null);

  function restart() {
    playClickSound();
    triggerHaptic("selection");
    setStep(0);
    setStats({ acceptability: 50, alienation: 30, pouvoirAgir: 50 });
    setSelected(null);
  }

  function choose(idx: number) {
    if (selected !== null) return;
    const sc = SCENARIOS_AUDIT_DIGITAL[step];
    const opt = sc?.opts[idx];
    if (!opt) return;
    setSelected(idx);

    if (opt.pouvoir > 0) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }

    setStats((prev) => ({
      acceptability: Math.max(
        0,
        Math.min(100, prev.acceptability + opt.accept),
      ),
      alienation: Math.max(0, Math.min(100, prev.alienation + opt.alien)),
      pouvoirAgir: Math.max(0, Math.min(100, prev.pouvoirAgir + opt.pouvoir)),
    }));
  }

  function next() {
    playClickSound();
    triggerHaptic("selection");
    setStep((s) => s + 1);
    setSelected(null);
  }

  if (step >= SCENARIOS_AUDIT_DIGITAL.length) {
    const success =
      stats.acceptability >= 70 &&
      stats.alienation <= 40 &&
      stats.pouvoirAgir >= 60;

    if (success && !store.getBadges().includes("audit_digital")) {
      store.unlockBadge("audit_digital");
      onStoreChange();
    }

    return (
      <AuditDigitalResultCard
        success={success}
        stats={stats}
        onRestart={restart}
      />
    );
  }

  const sc = SCENARIOS_AUDIT_DIGITAL[step];
  if (!sc) return null;

  return (
    <AuditDigitalStepCard
      sc={sc}
      step={step}
      totalSteps={SCENARIOS_AUDIT_DIGITAL.length}
      stats={stats}
      selected={selected}
      onChoose={choose}
      onNext={next}
    />
  );
}
