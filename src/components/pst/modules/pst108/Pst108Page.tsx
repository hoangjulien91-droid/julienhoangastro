"use client";

import { useEffect, useMemo, useState } from "react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import { TabsShell, groupTabs } from "@/components/pst/shell/TabsShell";
import type { Pst108ProfId } from "@/lib/pst/data/pst108-annales";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import {
  A,
  FICHES,
  PARCOURS,
  QCM_DATA,
} from "@/lib/pst/data/pst108";
import { CARD_AXES } from "@/lib/pst/data/pst108-page-data";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { getPst108TabDefs } from "./pst108TabDefs";

export function Pst108Page() {
  const { store, bump } = usePstStore("pst108_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
  const [examProf, setExamProf] = useState<Pst108ProfId>("lucy");
  const [revisionTrigger, setRevisionTrigger] = useState(0);

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
        hash.includes("pst108-s")
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
        q: (f as any).q || f.t,
        deep: f.ess,
        ex: f.ex,
        trap: f.trap,
      })),
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
      text: "Tu maîtrises les bases. Entraîne-toi à la rédaction, ou mets-toi en situation dans le Simulateur.",
      btn: "Aller à la Rédaction",
      panel: "redac",
      leitner: false,
    };
  }

  function goTab(panel: string) {
    setActiveTab(panel);
  }

  const tabs = useMemo(
    () =>
      getPst108TabDefs({
        store,
        bump,
        goTab,
        setActiveTab,
        setExamProf,
        triggerRevision,
        cards,
        cartes,
        parcoursData,
        advice,
        examProf,
        revisionTrigger,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      store,
      cards,
      cartes,
      parcoursData,
      advice,
      examProf,
      revisionTrigger,
    ],
  );

  return (
    <>
      <ModuleLivePill unitId="pst108" />
      <header className="top">
        <div className="eyebrow">
          PST108 · Psychologie du langage et clinique du dialogue · V. MAROT,
          É. LUCY &amp; F. VALLS (Cnam)
        </div>
        <h1>Psychologie du langage et clinique du dialogue</h1>
        <ModuleIntro unitId="pst108">
          Enseignants responsables : <b>Virginie MAROT</b> (dialogue &amp;
          intervention, maîtresse de conférences au Cnam),{" "}
          <b>Éric LUCY</b> (psychologie du langage &amp; clinique de l&apos;activité,
          chargé de cours) et <b>Francis VALLS</b> (méthode IOD, maître de
          conférences émérite). Examen officiel : <b>9 février 2027</b> (3
          épreuves distinctes de 1h00, 1 par enseignant). Couvre les 3 corpus :{" "}
          <i>Approches socio-historiques et cliniques du dialogue (Marot)</i>,{" "}
          <i>
            Psychologie du langage, pragmatique et clinique de l&apos;activité
            (Lucy)
          </i>{" "}
          et <i>Méthode IOD et intervention sur l&apos;emploi (Valls)</i>.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>1. Langage &amp; Dialogue</b>
            <span>Marot · Vygotski, Bakhtine &amp; Habermas</span>
          </div>
          <div className="step s1">
            <b>2. Clinique de l&apos;Activité</b>
            <span>Lucy · Austin, Bourdieu, Clot &amp; Dejours</span>
          </div>
          <div className="step s2">
            <b>3. Méthode IOD</b>
            <span>Valls · Castra, exclusion &amp; négociation</span>
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
