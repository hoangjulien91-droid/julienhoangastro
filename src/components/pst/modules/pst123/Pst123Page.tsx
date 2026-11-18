"use client";

import { useEffect, useMemo, useState } from "react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import { TabsShell, groupTabs } from "@/components/pst/shell/TabsShell";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import {
  A,
  FICHES,
  FRISE,
  PARCOURS,
  PIEGES,
  QCM_BANK,
} from "@/lib/pst/data/pst123";
import { CARD_AXES } from "@/lib/pst/data/pst123-page-data";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { getPst123TabDefs } from "./pst123TabDefs";

export function Pst123Page() {
  const { store, bump } = usePstStore("pst123_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
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
        hash.includes("pst123-s")
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
      FICHES.map((f, i) => {
        const rawQ = (f as any).q || f.t;
        const formattedQ = rawQ.endsWith("?")
          ? rawQ
          : `Quels sont les concepts clés, la thèse doctrinale et les apports fondamentaux de : ${rawQ} ?`;
        return {
          id: "fc_" + i,
          axis: f.a,
          tag: A[f.a as keyof typeof A] ?? f.a,
          a: f.ph,
          q: formattedQ,
          deep: f.ess,
          ex: (f as any).ex,
          trap: (f as any).trap,
        };
      }),
    [],
  );
  const qcmData = useMemo(
    () =>
      QCM_BANK.map((q) => ({
        q: q.q,
        opts: q.opts,
        correct: q.ok,
        exp: q.expl,
      })),
    [],
  );
  const piegesData = useMemo(
    () => PIEGES.map((p) => [p[0], p[1], p[2]] as [string, boolean, string]),
    [],
  );
  const friseData = useMemo(
    () => FRISE.map((f) => ({ annee: f.y, titre: f.t, desc: f.d })),
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
      getPst123TabDefs({
        store,
        bump,
        goTab,
        triggerRevision,
        revisionTrigger,
        cards,
        cartes,
        qcmData,
        piegesData,
        friseData,
        parcoursData,
        advice,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      store,
      cards,
      cartes,
      qcmData,
      piegesData,
      friseData,
      parcoursData,
      advice,
      revisionTrigger,
    ],
  );

  return (
    <>
      <ModuleLivePill unitId="pst123" />
      <header className="top">
        <div className="eyebrow">
          PST123 · 2026 - 2027 Semestre 1 · M. Éric LUCY (Cnam)
        </div>
        <h1>Le psychologue, le travail et l&apos;emploi</h1>
        <ModuleIntro unitId="pst123">
          Validation&nbsp;:{" "}
          <b>
            Examen final sur table (2h00 — Choix entre Option A : Dissertation
            théorique ou Option B : Analyse de situation de travail)
          </b>
          . Révise activement les 6 séances fondamentales du cours de Mme
          M. Éric LUCY&nbsp;: les notions d&apos;identité en sciences humaines
          (Piaget, Durkheim, Parsons, Goffman, Becker, Weber, Merton), la double
          transaction identitaire de <b>Claude Dubar</b> (biographique vs
          relationnelle, actes d&apos;attribution vs appartenance),
          l&apos;habitus, les capitaux et la double vérité du travail de{" "}
          <b>Pierre Bourdieu</b>, les 4 modèles relationnels d&apos;accès au
          pouvoir de <b>Renaud Sainsaulieu</b> (retrait, fusionnel, négociateur,
          affinitaire), la reconnaissance morale et le travail invisible d&apos;
          <b>Axel Honneth</b>, ainsi que l&apos;histoire sociologique et la
          déontologie du psychologue du travail (<b>Thomas Le Bianic</b>, Loi de
          1985, Code révisé 2021). <b>Consigne d&apos;excellence&nbsp;:</b>{" "}
          définir systématiquement les concepts avant de les discuter et
          articuler dialectiquement les dimensions subjectives (pour soi) et
          objectives (pour autrui).
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Claude Dubar</b>
            <span>Double Transaction</span>
          </div>
          <div className="step s1">
            <b>Pierre Bourdieu</b>
            <span>Habitus &amp; Illusio</span>
          </div>
          <div className="step s2">
            <b>R. Sainsaulieu</b>
            <span>4 Modèles de Pouvoir</span>
          </div>
          <div className="step s3">
            <b>Axel Honneth</b>
            <span>3 Sphères &amp; Posture</span>
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
