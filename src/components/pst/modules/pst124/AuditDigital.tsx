"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Monitor,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";

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
    playClickSound();
    triggerHaptic("selection");
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

    if (opt.pouvoir > 0) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }

    setStats((prev) => ({
      acceptability: Math.max(0, Math.min(100, prev.acceptability + opt.accept)),
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
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-center animate-fadeIn">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
            success
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
          }`}
        >
          {success ? <CheckCircle2 className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
          <span>{success ? "Mission d'Audit Réussie !" : "Mission Échouée"}</span>
        </span>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed m-0 font-medium">
          {success
            ? "Vous avez déployé l'outil en préservant le pouvoir d'agir et en évitant l'aliénation numérique !"
            : "Les salariés sont épuisés ou l'outil est rejeté. Recommencez en appliquant les principes de la clinique de l'usage."}
        </p>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-center space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
              Acceptabilité
            </span>
            <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300">
              {stats.acceptability}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/60 text-center space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
              Aliénation
            </span>
            <div className="text-xl font-mono font-extrabold text-rose-700 dark:text-rose-300">
              {stats.alienation}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-center space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
              Pouvoir d&apos;agir
            </span>
            <div className="text-xl font-mono font-extrabold text-indigo-700 dark:text-indigo-300">
              {stats.pouvoirAgir}%
            </div>
          </div>
        </div>

        {success && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Award className="size-3.5" />
              <span>Badge Débloqué : Expert de l&apos;Audit Digital</span>
            </span>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="size-3.5" />
            <span>Recommencer l&apos;audit</span>
          </button>
        </div>
      </div>
    );
  }

  const sc = SCENARIOS[step];
  if (!sc) return null;

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Monitor className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Simulation d&apos;Audit Digital · Étape {step + 1} / {SCENARIOS.length}</span>
        </span>

        {/* Live Gauges */}
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono font-bold">
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Accept. {stats.acceptability}%
          </span>
          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Alién. {stats.alienation}%
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Agir {stats.pouvoirAgir}%
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
          {sc.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
          {sc.desc}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {sc.opts.map((o, idx) => {
          const isChosen = selected === idx;
          let btnCls = "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

          if (selected !== null) {
            if (isChosen) {
              btnCls = o.pouvoir > 0
                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold"
                : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
            } else {
              btnCls = "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500";
            }
          }

          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => choose(idx)}
              className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
            >
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{o.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback on selection */}
      {selected !== null && (
        <div className="space-y-3 pt-2 animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              (sc.opts[selected]?.pouvoir ?? 0) > 0
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              {(sc.opts[selected]?.pouvoir ?? 0) > 0 ? (
                <>
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Analyse clinique pertinente</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="size-3.5 text-rose-600" />
                  <span>Effet pervers sur l&apos;activité</span>
                </>
              )}
            </div>
            <p className="m-0 leading-relaxed">{sc.opts[selected]?.feedback}</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>{step + 1 >= SCENARIOS.length ? "Voir le bilan final" : "Étape suivante"}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
