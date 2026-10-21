"use client";

import { useState } from "react";
import {
  Sparkles,
  Clock,
  BookOpen,
  Copy,
  Check,
  Layers,
  Eye,
  EyeOff,
  ShieldCheck,
  Scale,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  SYNTH_COMPARISONS,
  SYNTH_AXES,
  INTRO_THEMES,
  INTRO_THEME_LABELS,
  MEMO_METHODO,
  ARME_ULTIME,
  type SynthAxisKey,
  type IntroThemeKey,
} from "@/lib/pst/data/pst106-outils";
import { SosieWidget } from "./SosieWidget";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface Outils106Props {
  store: PstStore;
  onStoreChange: () => void;
}

export function Outils106({ store, onStoreChange }: Outils106Props) {
  const [axis, setAxis] = useState<SynthAxisKey>("objectif");
  const [theme, setTheme] = useState<IntroThemeKey>("activite");
  const [hintsHidden, setHintsHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const synth = SYNTH_COMPARISONS[axis];
  const intro = INTRO_THEMES[theme];

  function copyIntro() {
    triggerHaptic("success");
    playSuccessSound();
    const text = [intro.step1, intro.step2, intro.step3, intro.step4]
      .map((s) => s.replace(/<[^>]+>/g, ""))
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted-foreground italic leading-relaxed m-0 px-1">
        Une sélection d&apos;outils interactifs d&apos;élite conçue pour éliminer les pièges récurrents de l&apos;examen PST106 et structurer vos écrits académiques.
      </p>

      {/* 1. Comparateur de Synthèse */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Comparateur Tripartite (Wisner · Clot · Dejours)</span>
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            Comparateur Conceptuel Synchronisé
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
            Le correcteur Cnam attend une mise en tension systématique des 3 courants sur les notions clés. Sélectionnez une thématique pour comparer les prismes doctrinaux :
          </p>
        </div>

        {/* Axis selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {SYNTH_AXES.map((a) => {
            const isActive = axis === a.key;
            return (
              <button
                key={a.key}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs scale-102"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
                }`}
                onClick={() => {
                  triggerHaptic("light");
                  playClickSound();
                  setAxis(a.key);
                }}
              >
                {a.label}
              </button>
            );
          })}
        </div>

        {/* 3 Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {(
            [
              { key: "wisner", name: "Alain Wisner (Ergonomie)", border: "border-l-cyan-600" },
              { key: "clot", name: "Yves Clot (Clinique de l'Activité)", border: "border-l-indigo-600" },
              { key: "dejours", name: "Christophe Dejours (Psychodynamique)", border: "border-l-amber-600" },
            ] as const
          ).map((author) => (
            <div
              key={author.key}
              className={`p-4 rounded-2xl border border-border bg-card shadow-xs space-y-2 border-l-4 ${author.border}`}
            >
              <div className="font-serif font-bold text-sm text-foreground">
                {synth[author.key].title}
              </div>
              <div
                className="text-xs text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: synth[author.key].desc }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Générateur d'Introduction Universelle */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <BookOpen className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Dissertation PST106 · Cadrage Dialectique</span>
          </span>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all cursor-pointer shadow-2xs"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              setHintsHidden((h) => !h);
            }}
          >
            {hintsHidden ? (
              <>
                <Eye className="size-3 text-muted-foreground" />
                <span>Afficher le texte</span>
              </>
            ) : (
              <>
                <EyeOff className="size-3 text-muted-foreground" />
                <span>Masquer pour s&apos;entraîner</span>
              </>
            )}
          </button>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            Générateur d&apos;Introduction Universelle
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
            Choisissez l&apos;une des grandes thématiques d&apos;examen pour charger l&apos;armature dialectique complète (Accroche ➔ Définitions/Auteurs ➔ Problématique ➔ Plan) :
          </p>
        </div>

        {/* Theme pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {INTRO_THEME_LABELS.map((t) => {
            const isActive = theme === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs scale-102"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
                }`}
                onClick={() => {
                  triggerHaptic("light");
                  playClickSound();
                  setTheme(t.key);
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 4 Steps Skeleton */}
        <div className="space-y-3 pt-1">
          {[
            {
              step: "Étape 1",
              label: "Accroche & Mise en Tension des Courants",
              border: "border-l-indigo-600",
              text: intro.step1,
              hidden: "[Accroche masquée — cliquez pour révéler]",
            },
            {
              step: "Étape 2",
              label: "Cadrage Théorique & Auteurs de Référence",
              border: "border-l-cyan-600",
              text: intro.step2,
              hidden: "[Définitions masquées — cliquez pour révéler]",
            },
            {
              step: "Étape 3",
              label: "Problématique Ciselée & Paradoxe Central",
              border: "border-l-amber-600",
              text: intro.step3,
              hidden: "[Problématique masquée — cliquez pour révéler]",
            },
            {
              step: "Étape 4",
              label: "Annonce du Plan Dialectique en 3 Parties",
              border: "border-l-emerald-600",
              text: intro.step4,
              hidden: "[Annonce de plan masquée — cliquez pour révéler]",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border border-border bg-card shadow-xs space-y-1.5 border-l-4 ${s.border}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {s.step}
                </span>
                <span className="text-xs font-semibold text-foreground">
                  {s.label}
                </span>
              </div>

              {hintsHidden ? (
                <p
                  className="text-xs text-muted-foreground italic m-0 blur-xs cursor-pointer select-none hover:blur-none transition-all"
                  onClick={(e) => e.currentTarget.classList.remove("blur-xs")}
                >
                  {s.hidden}
                </p>
              ) : (
                <div
                  className="text-xs text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.text }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Copy Introduction Button */}
        <div className="pt-1">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
            onClick={copyIntro}
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-300" />
                <span>Introduction copiée dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copier l&apos;introduction complète rédigée</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Mémo Méthodologique de l'Examen */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Layers className="size-3 text-slate-600 dark:text-slate-400" />
            <span>Démarche Empirique &amp; Rigueur Clinique</span>
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            Mémo Méthodologique des Dispositifs de Terrain
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
            Contrastes fondamentaux des méthodologies à restituer impérativement pour illustrer la rigueur de chaque école face au travail réel :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {MEMO_METHODO.map((m) => (
            <div
              key={m.key}
              className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3"
            >
              <h4 className="text-sm font-serif font-bold text-foreground m-0">
                {m.title}
              </h4>
              <ul className="space-y-2 m-0 pl-0 list-none text-xs text-muted-foreground">
                {m.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-foreground">{it.b}</strong> : {it.t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Repère Clé d'Analyse Clinique (Arme Ultime) */}
      <div className="p-5 sm:p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Repère Clé d&apos;Analyse Clinique</span>
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-serif font-bold text-amber-950 dark:text-amber-200 m-0">
          {ARME_ULTIME.title}
        </h3>

        <p
          className="text-xs text-muted-foreground leading-relaxed m-0"
          dangerouslySetInnerHTML={{ __html: ARME_ULTIME.intro }}
        />

        <ul className="space-y-1.5 m-0 pl-0 list-none text-xs text-foreground">
          {ARME_ULTIME.points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 leading-relaxed">
              <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>
                <strong className="font-semibold text-foreground">{p.b}</strong> : {p.t}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Atelier Instruction au Sosie */}
      <SosieWidget store={store} onStoreChange={onStoreChange} />
    </div>
  );
}
