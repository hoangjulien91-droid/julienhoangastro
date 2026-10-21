"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { BuhlerOrganonDiagram } from "@/components/pst/visuals/PstDiagrams";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";
import { Sparkles, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { playSuccessSound, playReviewSound, playClickSound } from "@/lib/pst/audio-feedback";

interface BuhlerOrganonProps {
  store: PstStore;
}

export function BuhlerOrganon({ store }: BuhlerOrganonProps) {
  const [repVal, setRepVal] = useState(33);
  const [expVal, setExpVal] = useState(33);
  const [appVal, setAppVal] = useState(34);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );

  const total = repVal + expVal + appVal;

  function validate() {
    playClickSound();
    if (total !== 100) {
      playReviewSound();
      setResult({
        ok: false,
        msg: `Erreur : La somme doit faire exactement 100%. Actuellement : ${total}%.`,
      });
      return;
    }
    const good =
      Math.abs(repVal - 20) <= 5 &&
      Math.abs(expVal - 50) <= 5 &&
      Math.abs(appVal - 30) <= 5;
    if (good) {
      playSuccessSound();
      setResult({
        ok: true,
        msg: "Analyse Parfaite ! Représentation (~20% : le fait technique des plannings imposés), Expression (~50% : la souffrance/saturation exprimée « J'en peux plus »), Appel (~30% : demande implicite de régulation ou d'aide). Badge Débloqué : Expert de l'Organon.",
      });
      store.unlockBadge("buhler_expert");
    } else {
      playReviewSound();
      setResult({
        ok: false,
        msg: "Analyse Imprécise. Pensez-y : « J'en peux plus » exprime une émotion très forte (Expression dominante, ~50%), « plannings imposés par l'algorithme » désigne le fait technique (Représentation, ~20%), et la détresse appelle à une action de la part de l'interlocuteur (Appel, ~30%). Ajustez les curseurs sur le triangle SVG et réessayez.",
      });
    }
  }

  return (
    <div className="qbox space-y-4 my-6 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 m-0">
              Le Modèle de l&apos;Organon de Karl Bühler (1934)
            </h3>
            <span className="text-[11px] text-slate-500">
              Modélisation sémiotique : Symbole, Symptôme &amp; Signal
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("pst:open-schemas", {
                detail: { schemaId: "schema-buhler-organon", moduleKey: "pst108" },
              }),
            );
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-200 hover:bg-amber-500/25 transition-all cursor-pointer"
        >
          <Sparkles className="size-3.5" />
          <span>Fiche Schéma Examen 18/20</span>
        </button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
        Observez le <strong>triangle vectoriel interactif</strong> ci-dessous. Ajustez les curseurs pour calibrer les 3 forces sémiotiques de l&apos;Organon selon le verbatim de salarié. La somme doit atteindre exactement 100%.
      </p>

      {/* SVG Interactive Triangle connected in real time to sliders */}
      <SvgFullScreenViewer
        title="Modèle de l'Organon de Karl Bühler"
        subtitle="Représentation, Expression, Appel (Triangle sémiotique du langage au travail)"
        buttonLabel="Plein écran (Organon)"
      >
        <BuhlerOrganonDiagram repVal={repVal} expVal={expVal} appVal={appVal} />
      </SvgFullScreenViewer>

      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Verbatim Card */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-l-4 border-amber-500 shadow-xs text-center italic text-xs sm:text-sm font-serif font-medium text-slate-900 dark:text-slate-100">
          « J&apos;en peux plus de ces plannings imposés par l&apos;algorithme, c&apos;est insupportable ! »
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 gap-3.5">
          {[
            {
              label: "1. Représentation (Darstellung) ➔ SYMBOLE des faits objectifs",
              value: repVal,
              set: setRepVal,
              color: "accent-sky-500",
              textColor: "text-sky-600 dark:text-sky-400",
            },
            {
              label: "2. Expression (Ausdruck) ➔ SYMPTÔME de la détresse du locuteur",
              value: expVal,
              set: setExpVal,
              color: "accent-rose-500",
              textColor: "text-rose-600 dark:text-rose-400",
            },
            {
              label: "3. Appel (Appell) ➔ SIGNAL vers l'interlocuteur pour agir",
              value: appVal,
              set: setAppVal,
              color: "accent-emerald-500",
              textColor: "text-emerald-600 dark:text-emerald-400",
            },
          ].map((slider) => (
            <div key={slider.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={slider.textColor}>{slider.label}</span>
                <span className="font-mono font-bold">{slider.value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider.value}
                className={`w-full cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg ${slider.color}`}
                onChange={(e) => slider.set(Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        {/* Controls & Validation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 flex-wrap gap-2">
          <div className="text-xs font-bold">
            <span>Somme des 3 pôles : </span>
            <span
              className={`font-mono text-sm font-black px-2 py-0.5 rounded-lg ${
                total === 100
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-500/20 text-rose-700 dark:text-rose-300"
              }`}
            >
              {total}% / 100%
            </span>
          </div>

          <button
            type="button"
            onClick={validate}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Valider l&apos;Analyse Sémiotique
          </button>
        </div>

        {/* Feedback Alert */}
        {result && (
          <div
            className={`p-3.5 rounded-2xl border text-xs leading-relaxed space-y-1 ${
              result.ok
                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-900 dark:text-emerald-200"
                : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-500/40 text-rose-900 dark:text-rose-200"
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {result.ok ? (
                <CheckCircle2 className="size-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="size-4 text-rose-600" />
              )}
              <span>{result.ok ? "Analyse Validée !" : "Ajustement Nécessaire"}</span>
            </div>
            <p className="m-0">{result.msg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
