"use client";

import React, { useState, type FormEvent } from "react";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { verifyPstPassword, persistPstSession } from "@/lib/pst/access-gate";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface PstAccessGateProps {
  onUnlock: () => void;
}

/**
 * Écran de verrouillage par mot de passe pour l'ensemble des routes /pst*.
 * Bloque le rendu du contenu pédagogique tant que la session n'est pas validée.
 */
export function PstAccessGate({ onUnlock }: PstAccessGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isChecking) return;

    setError(null);
    setIsChecking(true);
    playClickSound();

    try {
      const ok = await verifyPstPassword(password);
      if (ok) {
        persistPstSession(remember);
        playSuccessSound();
        onUnlock();
      } else {
        setError("Code d'accès incorrect. Veuillez vérifier votre saisie.");
      }
    } catch {
      setError("Impossible de vérifier le code d'accès sur ce navigateur.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="size-14 rounded-2xl bg-[#891B29]/10 dark:bg-[#891B29]/25 border border-[#891B29]/20 flex items-center justify-center text-[#891B29] dark:text-rose-300 shadow-xs">
            <Lock className="size-7" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#891B29]/10 text-[#891B29] dark:bg-rose-950/60 dark:text-rose-300 border border-[#891B29]/15">
            <ShieldCheck className="size-3.5" />
            Accès Restreint · Cnam PST
          </span>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Espace Réservé — Psychologie du Travail
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Cet espace regroupe les synthèses de cours, retranscriptions et outils de révision PST. Saisissez le code d&apos;accès partagé pour continuer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="pst-access-password"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300"
            >
              Code d&apos;accès
            </label>
            <div className="relative">
              <input
                id="pst-access-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Saisissez le code d'accès…"
                autoComplete="current-password"
                autoFocus
                required
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 pr-11 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#891B29]/40 focus:border-[#891B29] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "Masquer le code d'accès"
                    : "Afficher le code d'accès"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/70 px-3.5 py-2.5 text-xs font-medium text-rose-700 dark:text-rose-300"
            >
              {error}
            </div>
          )}

          <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded border-slate-300 dark:border-slate-700 accent-[#891B29] cursor-pointer"
            />
            <span>Rester connecté sur cet appareil (30 jours)</span>
          </label>

          <button
            type="submit"
            disabled={isChecking || !password.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#891B29] hover:bg-[#731521] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 px-4 shadow-sm transition-all cursor-pointer"
          >
            <span>{isChecking ? "Vérification…" : "Déverrouiller l'espace PST"}</span>
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Retour à l&apos;accueil</span>
          </a>
          <span>Accès privé · Julien Hoang</span>
        </div>
      </div>
    </div>
  );
}
