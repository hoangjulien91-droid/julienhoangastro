"use client";

import { useEffect, useMemo, useState } from "react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import { TabsShell, groupTabs } from "@/components/pst/shell/TabsShell";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import { A, FICHES } from "@/lib/pst/data/pst124";
import { CARD_AXES } from "@/lib/pst/data/pst124-page-data";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { getPst124TabDefs } from "./pst124TabDefs";

export function Pst124Page() {
  const { store, bump } = usePstStore("pst124_atelier_v10");
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
      title: "Consolide " + A[weak.ax as keyof typeof A],
      text: "C'est l'axe le moins maîtrisé. Refais ses cartes en ciblant, puis teste-toi.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Teste-toi au QCM",
      text: "Tes cartes avancent bien. Vérifie au QCM (vise > 80 %) : le bilan te dira quoi retravailler.",
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
      getPst124TabDefs({
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
      <ModuleLivePill unitId="pst124" />
      <header className="top">
        <div className="eyebrow">
          PST124 · Semestre 2 (2026 - 2027) · Clinique des Usages &amp;
          Transformations Digitales (Cnam)
        </div>
        <h1>Transformations digitales et clinique des usages</h1>
        <ModuleIntro unitId="pst124">
          Module dispensé au Semestre 2. Révise les 4 piliers théoriques fondés
          par Pierre Rabardel, Marc-Éric Bobillier Chaumon et l&apos;ergonomie
          des technologies émergentes : <i>Genèse instrumentale</i>,{" "}
          <i>Acceptation située</i>, <i>Technologies capacitantes</i>, et{" "}
          <i>Clinique de l&apos;usage &amp; Délibération</i>.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>1. Artefact &amp; Instrument</b>
            <span>Rabardel · Genèse instrumentale</span>
          </div>
          <div className="step s1">
            <b>2. Acceptation Située</b>
            <span>Bobillier Chaumon · 4 Dimensions de l&apos;usage</span>
          </div>
          <div className="step s2">
            <b>3. Environnements Capacitants</b>
            <span>Falzon &amp; Sen · Pouvoir d&apos;agir numérique</span>
          </div>
          <div className="step s3">
            <b>4. Conduite de Projet</b>
            <span>Démarche participative &amp; Délibération</span>
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
