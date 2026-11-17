"use client";

import { useState } from "react";
import { BookOpen, Eye, EyeOff, Check, Copy } from "lucide-react";
import {
  INTRO_THEMES,
  INTRO_THEME_LABELS,
  type IntroThemeKey,
} from "@/lib/pst/data/pst106-outils";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function GenerateurIntroUniverselle() {
  const [theme, setTheme] = useState<IntroThemeKey>("activite");
  const [hintsHidden, setHintsHidden] = useState(false);
  const [copied, setCopied] = useState(false);

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
          Choisissez l&apos;une des grandes thématiques d&apos;examen pour
          charger l&apos;armature dialectique complète (Accroche ➔
          Définitions/Auteurs ➔ Problématique ➔ Plan) :
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
  );
}
