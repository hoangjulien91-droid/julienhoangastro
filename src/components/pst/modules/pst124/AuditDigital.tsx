"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";

interface AuditOption {
  text: string;
  accept: number;
  alien: number;
  pouvoir: number;
  feedback: string;
}
interface AuditScenario {
  title: string;
  desc: string;
  opts: AuditOption[];
}

const SCENARIOS: AuditScenario[] = [
  {
    title: "Étape 1 : Choix de la méthode d'introduction",
    desc: "Votre direction souhaite déployer Slack/Teams pour réduire les e-mails. Comment lancez-vous le projet ?",
    opts: [
      {
        text: "Déploiement obligatoire le weekend avec coupure automatique des serveurs mails.",
        accept: -20,
        alien: 30,
        pouvoir: -20,
        feedback:
          "Méthode directive sans concertation. La coupure crée un sentiment d'empêchement pour ceux qui ont des urgences.",
      },
      {
        text: "Co-conception de la charte des usages avec des groupes de salariés volontaires.",
        accept: 30,
        alien: -10,
        pouvoir: 20,
        feedback:
          "Excellent ! Vous ouvrez des espaces de délibération sur l'usage de l'outil.",
      },
    ],
  },
  {
    title: "Étape 2 : Surcharge informationnelle & notifications",
    desc: "Certains salariés se plaignent d'être inondés de notifications et de messages hors temps de travail. Quelle action menez-vous ?",
    opts: [
      {
        text: "Bloquer l'accès technique de l'application à distance après 20h.",
        accept: -10,
        alien: 20,
        pouvoir: -10,
        feedback:
          "L'interdiction technique rigide aliène les salariés en niant la variabilité de leur activité réelle.",
      },
      {
        text: "Instaurer des débats d'équipe réguliers sur la charge de travail et la priorisation.",
        accept: 20,
        alien: -20,
        pouvoir: 20,
        feedback:
          "Parfait ! Réguler la charge par le dialogue redonne du pouvoir d'agir sur l'organisation.",
      },
    ],
  },
  {
    title: "Étape 3 : Résistances et contournements (Catachrèses)",
    desc: "Vous constatez que des salariés contournent l'outil officiel en utilisant des messageries grand public (WhatsApp) pour collaborer rapidement. Que faites-vous ?",
    opts: [
      {
        text: "Menacer de sanctions et faire bloquer l'usage des téléphones personnels au travail.",
        accept: -30,
        alien: 40,
        pouvoir: -30,
        feedback:
          "Destructeur ! Vous niez l'intelligence pratique des salariés qui cherchent juste à faire du bon travail.",
      },
      {
        text: "Analyser ces usages informels comme des catachrèses utiles pour enrichir le nouvel outil.",
        accept: 30,
        alien: -10,
        pouvoir: 30,
        feedback:
          "Brillant ! C'est la genèse instrumentale en action : les usages réels modifient l'artefact technique.",
      },
    ],
  },
];

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
    setStep(0);
    setStats({ acceptability: 50, alienation: 30, pouvoirAgir: 50 });
    setSelected(null);
  }

  function choose(idx: number) {
    if (selected !== null) return;
    const sc = SCENARIOS[step];
    const opt = sc?.opts[idx];
    if (!opt) return;
    setSelected(idx);
    setStats((prev) => ({
      acceptability: prev.acceptability + opt.accept,
      alienation: prev.alienation + opt.alien,
      pouvoirAgir: prev.pouvoirAgir + opt.pouvoir,
    }));
  }

  function next() {
    setStep((s) => s + 1);
    setSelected(null);
  }

  if (step >= SCENARIOS.length) {
    const success =
      stats.acceptability >= 70 &&
      stats.alienation <= 40 &&
      stats.pouvoirAgir >= 60;
    if (success && !store.getBadges().includes("audit_digital")) {
      store.unlockBadge("audit_digital");
      onStoreChange();
    }
    return (
      <div
        style={{
          padding: 15,
          borderRadius: "var(--r)",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        <h4
          style={{
            margin: "0 0 10px",
            color: success ? "var(--good)" : "var(--bad)",
            fontSize: 15,
          }}
        >
          {success ? "🎉 Mission Réussie !" : "❌ Mission Échouée"}
        </h4>
        <p style={{ fontSize: 13, margin: "0 0 15px" }}>
          {success
            ? "Vous avez déployé l'outil en préservant le pouvoir d'agir et en évitant l'aliénation numérique !"
            : "Les salariés sont épuisés ou l'outil est rejeté. Recommencez en appliquant les principes de la clinique de l'usage."}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <div
            style={{
              background: "var(--card)",
              padding: 8,
              borderRadius: 8,
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              Acceptabilité
            </div>
            <div
              style={{ fontSize: 18, fontWeight: 700, color: "var(--good)" }}
            >
              {stats.acceptability}%
            </div>
          </div>
          <div
            style={{
              background: "var(--card)",
              padding: 8,
              borderRadius: 8,
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              Aliénation
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--bad)" }}>
              {stats.alienation}%
            </div>
          </div>
          <div
            style={{
              background: "var(--card)",
              padding: 8,
              borderRadius: 8,
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              Pouvoir d&apos;agir
            </div>
            <div
              style={{ fontSize: 18, fontWeight: 700, color: "var(--sante)" }}
            >
              {stats.pouvoirAgir}%
            </div>
          </div>
        </div>
        {success && (
          <div
            className="chip"
            style={{
              marginBottom: 15,
              background: "var(--bonusbg)",
              color: "var(--bonusink)",
              fontWeight: 700,
            }}
          >
            🏆 Badge Débloqué : Expert de l&apos;Audit Digital
          </div>
        )}
        <button
          className="btn small"
          style={{ marginTop: 10 }}
          onClick={restart}
        >
          Recommencer
        </button>
      </div>
    );
  }

  const sc = SCENARIOS[step];
  if (!sc) return null;

  return (
    <div>
      <h4 style={{ margin: "0 0 6px", fontSize: 14 }}>{sc.title}</h4>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 12px" }}>
        {sc.desc}
      </p>
      {sc.opts.map((o, idx) => {
        const isSelected = selected === idx;
        return (
          <button
            key={idx}
            className="btn ghost audit-opt-btn"
            style={{
              textAlign: "left",
              justifyContent: "flex-start",
              width: "100%",
              height: "auto",
              padding: 12,
              marginBottom: 8,
              fontSize: 12.5,
              lineHeight: 1.4,
              opacity: selected !== null && !isSelected ? 0.5 : 1,
            }}
            disabled={selected !== null}
            onClick={() => choose(idx)}
          >
            {o.text}
          </button>
        );
      })}
      {selected !== null && (
        <>
          <div
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 8,
              fontSize: 12.5,
              background: "var(--paper)",
              border: "1px solid var(--line)",
            }}
          >
            {sc.opts[selected]?.feedback}
          </div>
          <button
            className="btn small solid"
            style={{ marginTop: 10 }}
            onClick={next}
          >
            {step + 1 >= SCENARIOS.length
              ? "Voir le bilan"
              : "Étape suivante →"}
          </button>
        </>
      )}
    </div>
  );
}
