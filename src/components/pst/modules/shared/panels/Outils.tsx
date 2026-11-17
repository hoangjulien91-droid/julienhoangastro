"use client";

import { useState, type ReactNode } from "react";
import {
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { EncartOutilsExclusifsUe } from "@/components/pst/shell/EncartOutilsExclusifsUe";
import type { UeId } from "@/lib/pst/data/outils-par-ue";
import { ComparateurSynoptiqueSection } from "./outils/ComparateurSynoptiqueSection";
import { GenerateurIntroSection } from "./outils/GenerateurIntroSection";
import { ArmeUltimeSection } from "./outils/ArmeUltimeSection";

export interface SynthAxisOption {
  key: string;
  label: string;
}
export interface SynthAxisData {
  [axisKey: string]: Record<string, string>;
}
export interface ComparateurColumn {
  key: string;
  label: string;
  color: string;
}

export interface IntroThemeOption {
  key: string;
  label: string;
}
export interface IntroStepData {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
export interface IntroData {
  [themeKey: string]: IntroStepData;
}
export interface IntroCues {
  [themeKey: string]: string[];
}

export interface ArmeUltime {
  title: string;
  intro: ReactNode;
  items: ReactNode[];
}

interface OutilsProps {
  unitId?: UeId;
  hint: string;
  comparateurTitle: string;
  comparateurHint: string;
  synthAxes: SynthAxisOption[];
  comparateurColumns: ComparateurColumn[];
  comparateurData: SynthAxisData;
  defaultSynthAxis: string;
  introThemes: IntroThemeOption[];
  introData: IntroData;
  introCues: IntroCues;
  defaultIntroTheme: string;
  specialWidget?: ReactNode;
  arme: ArmeUltime;
}

export function Outils({
  unitId,
  hint,
  comparateurTitle,
  comparateurHint,
  synthAxes,
  comparateurColumns,
  comparateurData,
  defaultSynthAxis,
  introThemes,
  introData,
  introCues,
  defaultIntroTheme,
  specialWidget,
  arme,
}: OutilsProps) {
  const [synthAxis, setSynthAxis] = useState(defaultSynthAxis);
  const [introTheme, setIntroTheme] = useState(defaultIntroTheme);
  const [introHidden, setIntroHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const intro = introData[introTheme];
  const cues = introCues[introTheme] ?? [];

  function copyIntro() {
    if (!intro) return;
    const raw = [intro.step1, intro.step2, intro.step3, intro.step4].join(
      "\n\n",
    );
    navigator.clipboard.writeText(raw).then(() => {
      playSuccessSound();
      triggerHaptic("success");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-6">
      {unitId && <EncartOutilsExclusifsUe unitId={unitId} allowUeSwitch />}
      {hint && <p className="hint">{hint}</p>}

      {/* 1. Comparateur Théorique & Clinique */}
      <ComparateurSynoptiqueSection
        title={comparateurTitle}
        hint={comparateurHint}
        synthAxes={synthAxes}
        columns={comparateurColumns}
        data={comparateurData}
        activeAxis={synthAxis}
        onSelectAxis={setSynthAxis}
      />

      {/* 2. Générateur d'Introduction Universelle */}
      <GenerateurIntroSection
        introThemes={introThemes}
        activeTheme={introTheme}
        onSelectTheme={setIntroTheme}
        introHidden={introHidden}
        onToggleIntroHidden={() => setIntroHidden((h) => !h)}
        intro={intro}
        cues={cues}
        copied={copied}
        onCopyIntro={copyIntro}
      />

      {/* Special module widget if present */}
      {specialWidget}

      {/* 3. Ressource Méthodologique / Arme Ultime */}
      {arme && <ArmeUltimeSection arme={arme} />}
    </div>
  );
}
