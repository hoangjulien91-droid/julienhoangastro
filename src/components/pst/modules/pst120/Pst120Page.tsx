"use client";

import { useEffect, useMemo, useState } from "react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import { TabsShell, groupTabs } from "@/components/pst/shell/TabsShell";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import { A, FICHES } from "@/lib/pst/data/pst120";
import { CARD_AXES } from "@/lib/pst/data/pst120-page-data";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { getPst120TabDefs } from "./pst120TabDefs";

export function Pst120Page() {
  const { store, bump } = usePstStore("pst120_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
  const [revisionTrigger, setRevisionTrigger] = useState(0);

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = useMemo(
    () => FICHES.map((f, i) => ({ id: "fc_" + i, axis: f.a })),
    [],
  );
  const cartes = useMemo(
    () =>
      FICHES.map((f, i) => ({
        id: "fc_" + i,
        axis: f.a,
        tag: A[f.a as keyof typeof A],
        a: f.ph,
        q: f.t,
        deep: f.ess,
      })),
    [],
  );

  function goTab(panel: string) {
    setActiveTab(panel);
  }
  function triggerRevision() {
    setRevisionTrigger((v) => v + 1);
  }

  const axisRows = computeAxisRows(cards, CARD_AXES, store);
  const weak = weakestAxis(axisRows);
  const masteredCards = cards.filter((c) => store.getBox(c.id) >= 4).length;
  const qcmS = store.getScore("qcm");

  let advice: DashboardAdvice;
  if (masteredCards < cards.length * 0.5) {
    advice = {
      title: "Commence par les cartes",
      text: "Passe les notions en rappel actif (répétition espacée) et marque honnêtement ta confiance.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (weak && weak.mast / weak.tot < 0.6) {
    advice = {
      title: "Axe faible détecté : " + A[weak.ax as keyof typeof A],
      text: `Moins de 60% des notions de cet axe sont maîtrisées. Concentre tes révisions sur l'axe ${A[weak.ax as keyof typeof A]}.`,
      btn: "Réviser cet axe",
      panel: "cartes",
      leitner: true,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Améliore ton score QCM",
      text: "Ton score QCM n'a pas encore atteint les 80% requis pour l'excellence pédagogique.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else if (!store.getScore("distinguer")) {
    advice = {
      title: "Travaille les confusions",
      text: "Bon niveau ! Attaque le mode Distinguer : c'est là que se gagnent les points face aux pièges.",
      btn: "Mode Distinguer",
      panel: "distinguer",
      leitner: false,
    };
  } else {
    advice = {
      title: "Passe en conditions réelles",
      text: "Tu maîtrises les bases. Entraîne-toi à la rédaction, ou mets-toi en situation dans le Simulateur.",
      btn: "Aller à la Rédaction",
      panel: "redac",
      leitner: false,
    };
  }

  const tabs = useMemo(
    () =>
      getPst120TabDefs({
        store,
        bump,
        goTab,
        triggerRevision,
        revisionTrigger,
        cards,
        cartes,
        advice,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, cards, cartes, advice, revisionTrigger],
  );

  return (
    <>
      <ModuleLivePill unitId="pst120" />
      <header className="top">
        <div className="eyebrow">
          PST120 · Semestre 2 (2026 - 2027) · Christophe DEJOURS &amp; Équipe
          Clinique (Cnam)
        </div>
        <h1>Psychodynamique et psychopathologie du travail</h1>
        <ModuleIntro unitId="pst120">
          Module dispensé au Semestre 2. Révise les 4 piliers théoriques fondés
          par le Pr Christophe Dejours : <i>Souffrance &amp; Défenses</i>,{" "}
          <i>Plaisir &amp; Sublimation</i>, <i>Reconnaissance &amp; Justice</i>,{" "}
          et <i>Méthodologie de l&apos;enquête clinique</i>.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>1. Souffrance &amp; Défenses</b>
            <span>Stratégies individuelles et collectives</span>
          </div>
          <div className="step s1">
            <b>2. Plaisir &amp; Sublimation</b>
            <span>L&apos;intelligence du corps (Métis)</span>
          </div>
          <div className="step s2">
            <b>3. Reconnaissance</b>
            <span>Utilité &amp; Beauté du geste</span>
          </div>
          <div className="step s3">
            <b>4. Enquête Clinique</b>
            <span>Méthodologie de l&apos;intervention</span>
          </div>
        </div>
        <div className="stepbar" aria-hidden="true" />
      </header>
      <TabsShell
        tabs={groupTabs(tabs)}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </>
  );
}
