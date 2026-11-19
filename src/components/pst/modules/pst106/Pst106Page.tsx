"use client";

import { useEffect, useMemo, useState } from "react";
import { triggerHaptic } from "@/lib/pst/audio-feedback";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import { TabsShell, groupTabs } from "@/components/pst/shell/TabsShell";
import {
  A,
  CARTES,
  QCM,
} from "@/lib/pst/data/pst106";
import {
  PIEGES,
  BONUS_QUIZ,
  PARCOURS,
} from "@/lib/pst/data/pst106-inline";
import type { BonusQuestion } from "@/components/pst/modules/shared/panels/Bonus";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import { getPst106TabDefs } from "./pst106TabDefs";

export function Pst106Page() {
  const { store, bump } = usePstStore("pst106_v1");
  const [activeTab, setActiveTab] = useState("accueil");

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes("seance") ||
        hash.includes("cours") ||
        hash.includes("pst106-s")
      ) {
        setActiveTab("seances");
      }
    }
    function handleSelectSeance() {
      setActiveTab("seances");
    }
    window.addEventListener("pst:select-seance", handleSelectSeance);
    return () =>
      window.removeEventListener("pst:select-seance", handleSelectSeance);
  }, []);

  const cartes = useMemo(
    () =>
      CARTES.map((c, i) => ({
        id: `pst106_${i}`,
        axis: c[0] as string,
        tag: A[c[0] as keyof typeof A] ?? (c[0] as string),
        q: c[1] as string,
        a: c[2] as string,
        deep: (c[4] as string) ?? "",
        category: c[3] as "coeur" | "bonus",
      })),
    [],
  );

  const qcmData = useMemo(
    () =>
      QCM.map((q) => ({
        q: q[0] as string,
        opts: q[1] as string[],
        correct: q[2] as number,
        exp: q[3] as string,
      })),
    [],
  );

  const piegesData = useMemo(
    () => PIEGES.map((p) => [p[0], p[1], p[2]] as [string, boolean, string]),
    [],
  );

  const parcoursData = useMemo(
    () =>
      PARCOURS.map((p) => ({
        id: p.key,
        title: p.titre,
        fenetre: p.fenetre,
        desc: p.but,
        onglets: p.onglets as [string, string][],
        items: p.taches,
      })),
    [],
  );

  const bonusQuestions: BonusQuestion[] = useMemo(
    () =>
      BONUS_QUIZ.filter((b) => b.type === "qcm").map((b) => ({
        q: b.question as string,
        opts: b.options as string[],
        ok: b.correct as number,
        expl: b.explain as string,
      })),
    [],
  );

  const [revisionTrigger, setRevisionTrigger] = useState(0);

  function triggerRevision() {
    setRevisionTrigger((v) => v + 1);
  }

  const axisRows = computeAxisRows(
    cartes.map((c) => ({ id: c.id, axis: c.axis })),
    ["histoire", "conceptions", "wisner", "clot", "dejours", "methode", "comparer"],
    store,
  );
  const weak = weakestAxis(axisRows);
  const masteredCards = cartes.filter((c) => store.getBox(c.id) >= 4).length;
  const qcmS = store.getScore("qcm");

  let advice: DashboardAdvice;
  if (masteredCards < cartes.length * 0.5) {
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
      text: "C'est l'auteur le moins maîtrisé. Refais ses cartes en ciblant, puis teste-toi.",
      btn: "Réviser " + A[weak.ax as keyof typeof A],
      panel: "cartes",
      leitner: false,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Teste-toi au QCM",
      text: "Tes cartes sont bien avancées. Vérifie au QCM (vise > 80%), le bilan te dira quoi retravailler.",
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
      text: "Tu maîtrises les bases. Entraîne-toi à structurer une réponse rédigée, ou mets-toi en posture de clinicien dans le Simulateur.",
      btn: "Aller à la Rédaction",
      panel: "redac",
      leitner: false,
    };
  }

  function goTab(panel: string) {
    triggerHaptic("selection");
    setActiveTab(panel);
  }

  const tabs = useMemo(
    () =>
      getPst106TabDefs({
        store,
        bump,
        goTab,
        triggerRevision,
        revisionTrigger,
        cartes,
        qcmData,
        piegesData,
        parcoursData,
        bonusQuestions,
        advice,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      store,
      revisionTrigger,
      cartes,
      qcmData,
      piegesData,
      parcoursData,
      bonusQuestions,
      advice,
    ],
  );

  return (
    <>
      <ModuleLivePill unitId="pst106" />
      <header className="top">
        <div className="eyebrow">
          PST106 · Clinique de l&apos;activité et psychologie du travail
        </div>
        <h1>Clinique de l&apos;activité &amp; psychologie du travail</h1>
        <ModuleIntro unitId="pst106">
          Enseignante responsable : <b>Pr. Christine LAGABRIELLE</b>{" "}
          (Professeure émérite, ancienne directrice du département PSTO,
          Directrice associée de <i>Le Travail Humain</i>). Examen officiel :{" "}
          <b>11 février 2027</b> (2h00 sans documents). Choix entre deux
          épreuves : <b>Option A (Dissertation classique)</b> ou{" "}
          <b>
            Option B (Question avec texte en support — 8 annales disponibles
            dans l&apos;Atelier)
          </b>
          . Couvre les 4 piliers du cours :{" "}
          <i>Conceptions &amp; Fonctions du travail (Arendt, Jahoda, Wallon)</i>
          , <i>Ergonomie &amp; Cnam (Wisner)</i>,{" "}
          <i>Clinique de l&apos;activité (Clot, CRTD)</i> et{" "}
          <i>Méthodologies d&apos;intervention (Autoconfrontations, Sosie)</i>.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>1. Conceptions</b>
            <span>philosophie &amp; Jahoda</span>
          </div>
          <div className="step s1">
            <b>2. Wisner</b>
            <span>ergonomie &amp; Cnam</span>
          </div>
          <div className="step s2">
            <b>3. Clot</b>
            <span>clinique &amp; pouvoir d&apos;agir</span>
          </div>
          <div className="step s3">
            <b>4. Méthodes</b>
            <span>autoconfrontations</span>
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
