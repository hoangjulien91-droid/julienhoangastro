"use client";

import { useEffect, useState } from "react";
import {
  ATELIER_SQUELETTE,
  ATELIER_CRITERES,
  ANNALES_TEXTES_106,
  METHODE_TEXTE_SUPPORT,
  CRITERES_TEXTE_SUPPORT,
  type AnnaleTexteItem,
} from "@/lib/pst/data/pst106";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

const CHECKLIST_KEY = "pst106_atelier_checklist_v1";
const DRAFT_KEY = "pst106_atelier_draft_v1";
const CHECKLIST_TEXTE_KEY = "pst106_atelier_checklist_texte_v1";

export function Atelier106() {
  const [activeMode, setActiveMode] = useState<"annales" | "methode" | "brouillon">("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Checklists
  const [checkedDissert, setCheckedDissert] = useState<boolean[]>(() =>
    ATELIER_CRITERES.map(() => false),
  );
  const [checkedTexte, setCheckedTexte] = useState<boolean[]>(() =>
    CRITERES_TEXTE_SUPPORT.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<number, string>>({});

  const currentSubject: AnnaleTexteItem = ANNALES_TEXTES_106[selectedSubjectIdx] ?? ANNALES_TEXTES_106[0];

  useEffect(() => {
    try {
      const rawDissert = localStorage.getItem(CHECKLIST_KEY);
      if (rawDissert) {
        const parsed = JSON.parse(rawDissert);
        if (Array.isArray(parsed)) {
          setCheckedDissert(ATELIER_CRITERES.map((_, i) => Boolean(parsed[i])));
        }
      }
      const rawTexte = localStorage.getItem(CHECKLIST_TEXTE_KEY);
      if (rawTexte) {
        const parsed = JSON.parse(rawTexte);
        if (Array.isArray(parsed)) {
          setCheckedTexte(CRITERES_TEXTE_SUPPORT.map((_, i) => Boolean(parsed[i])));
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem("pst106_annale_drafts_v1");
      if (savedAnnaleDraftsRaw) {
        const parsedDrafts = JSON.parse(savedAnnaleDraftsRaw);
        if (parsedDrafts && typeof parsedDrafts === "object") {
          setAnnaleDrafts(parsedDrafts);
        }
      }
    } catch {
      /* ignore */
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggleDissertCheck(i: number) {
    setCheckedDissert((c) => {
      const next = c.map((v, idx) => (idx === i ? !v : v));
      if (next[i]) playSuccessSound();
      try {
        localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function toggleTexteCheck(i: number) {
    setCheckedTexte((c) => {
      const next = c.map((v, idx) => (idx === i ? !v : v));
      if (next[i]) playSuccessSound();
      try {
        localStorage.setItem(CHECKLIST_TEXTE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function updateDraftDissert(val: string) {
    setDraftDissert(val);
    try {
      localStorage.setItem(DRAFT_KEY, val);
    } catch {
      /* ignore */
    }
  }

  function updateAnnaleDraft(subjectId: number, val: string) {
    setAnnaleDrafts((prev) => {
      const next = { ...prev, [subjectId]: val };
      try {
        localStorage.setItem("pst106_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function toggleSpeechCorrige(titre: string, corrigeHtml: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, " ");
    const utter = new SpeechSynthesisUtterance(
      `Corrigé d'excellence pour le sujet : ${titre}. ${cleanText}`,
    );
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }

  function copyCorrige(titre: string, citation: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${titre}\n\nCitation : ${citation}\n\n${cleanText}`);
      playSuccessSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  // Progress metrics
  const doneDissert = checkedDissert.filter(Boolean).length;
  const pctDissert = ATELIER_CRITERES.length
    ? Math.round((doneDissert * 100) / ATELIER_CRITERES.length)
    : 0;

  const doneTexte = checkedTexte.filter(Boolean).length;
  const pctTexte = CRITERES_TEXTE_SUPPORT.length
    ? Math.round((doneTexte * 100) / CRITERES_TEXTE_SUPPORT.length)
    : 0;

  const currentAnnaleDraft = annaleDrafts[currentSubject.id] || "";
  const annaleWordCount = currentAnnaleDraft.trim()
    ? currentAnnaleDraft.trim().split(/\s+/).length
    : 0;
  const dissertWordCount = draftDissert.trim()
    ? draftDissert.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header informatif sur l'examen Cnam */}
      <div
        className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-rose-500/10 to-amber-500/10 backdrop-blur-xl shadow-xs"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Format d&apos;examen officiel · Pr. Christine Lagabrielle
            </div>
            <h2 className="text-base sm:text-lg font-bold mt-0.5 text-slate-900 dark:text-slate-100">
              Atelier d&apos;Écriture &amp; Annales Officielles (Option A &amp; B)
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <span>2h00 sans documents</span>
            <span>•</span>
            <span>Session 1 : 11 fév. 2027</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          À l&apos;examen, vous aurez <b>toujours le choix</b> entre deux options :
          l&apos;<b>Option A (Dissertation classique)</b> et l&apos;<b>Option B (Question avec texte en support)</b>.
          Cet atelier rassemble les <b>8 sujets authentiques d&apos;annales avec texte en support</b>, leurs corrigés rédigés d&apos;excellence, ainsi que la méthode dialectique complète.
        </p>

        {/* Segmented Control */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-amber-500/20">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("annales");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "annales"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>📜 Annales : Sujets avec texte (Option B)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              8 sujets
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("methode");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "methode"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>📐 Méthodologie &amp; Squelette dialectique</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveMode("brouillon");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "brouillon"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-500/15"
            }`}
          >
            <span>✍️ Mon Brouillon Libre (Dissertation)</span>
            {dissertWordCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                {dissertWordCount} mots
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MODE 1 : ANNALES AVEC TEXTE EN SUPPORT (OPTION B) */}
      {activeMode === "annales" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sélecteur horizontal des 8 sujets */}
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Sélectionnez un sujet d&apos;annale authentique du Cnam :
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {ANNALES_TEXTES_106.map((s, idx) => {
                const isSelected = idx === selectedSubjectIdx;
                const draft = annaleDrafts[s.id] || "";
                const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedSubjectIdx(idx);
                      setShowCorrige(false);
                      if (speaking) {
                        window.speechSynthesis?.cancel();
                        setSpeaking(false);
                      }
                    }}
                    className={`shrink-0 min-w-[200px] max-w-[240px] px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-slate-100 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-amber-700 dark:text-amber-400">
                        Sujet {s.id}
                      </span>
                      {words > 0 && (
                        <span className="text-[10px] text-emerald-600 font-mono">
                          {words} m.
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold truncate mt-0.5">
                      {s.citation.auteur}
                    </div>
                    <div className="text-[11px] opacity-75 truncate">
                      {s.theme}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche détaillée du sujet sélectionné */}
          <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
            {/* Titre & Thème */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-2">
                <span>Thème clé</span>
                <span>•</span>
                <span>{currentSubject.theme}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {currentSubject.titre}
              </h3>
            </div>

            {/* Encadré citation support */}
            <div
              className="p-4 sm:p-5 rounded-2xl border-l-4 border-amber-500 bg-gradient-to-br from-amber-500/10 to-rose-500/5 dark:from-amber-500/15 dark:to-rose-500/10"
            >
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <span>💬 Citation de support à analyser</span>
              </div>
              <blockquote className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-slate-100 leading-snug">
                {currentSubject.citation.texte}
              </blockquote>
              <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
                <span className="text-amber-700 dark:text-amber-400 font-bold">
                  — {currentSubject.citation.auteur}
                </span>
                <span>•</span>
                <span>{currentSubject.citation.source}</span>
                {currentSubject.citation.annee && (
                  <>
                    <span>•</span>
                    <span className="font-mono">({currentSubject.citation.annee})</span>
                  </>
                )}
              </div>
            </div>

            {/* Concepts clés & Auteurs associés */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Concepts à mobiliser :
              </span>
              {currentSubject.conceptsCles.map((c, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Questions officielles d'examen */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Questions d&apos;examen à traiter :
              </div>
              <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
                {currentSubject.questions.map((q, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critères attendus par le jury Cnam */}
            <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
              <summary className="font-bold text-amber-700 dark:text-amber-400 cursor-pointer select-none">
                🎯 Grille des attendus et critères de correction Cnam (clique pour déplier)
              </summary>
              <ul className="mt-3 space-y-1.5 list-disc pl-5 text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentSubject.criteres.map((cr, idx) => (
                  <li key={idx}>{cr}</li>
                ))}
              </ul>
            </details>

            {/* Plan conseillé */}
            <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
              <summary className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                🗺️ Démarche &amp; Plan de réponse conseillé (clique pour déplier)
              </summary>
              <div className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentSubject.planConseille.map((step, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {step}
                  </div>
                ))}
              </div>
            </details>

            {/* Zone de brouillon personnel pour ce sujet */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span>Mon entraînement rédigé (sauvegarde automatique)</span>
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold ${
                      annaleWordCount >= 60 ? "text-emerald-600 font-bold" : "text-slate-500"
                    }`}
                  >
                    {annaleWordCount} mot{annaleWordCount > 1 ? "s" : ""}
                  </span>
                  {annaleWordCount > 0 && (
                    <button
                      type="button"
                      onClick={() => updateAnnaleDraft(currentSubject.id, "")}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Effacer
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={currentAnnaleDraft}
                onChange={(e) => updateAnnaleDraft(currentSubject.id, e.target.value)}
                rows={6}
                placeholder={`Rédigez ici votre analyse de la citation de ${currentSubject.citation.auteur} et vos réponses aux questions Q1 à Q${currentSubject.questions.length}...`}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
              />
            </div>

            {/* Actions Corrigé : Lecture Audio & Déplier Copie Modèle */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setShowCorrige((v) => !v);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    showCorrige
                      ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                      : "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                  }`}
                >
                  <span>{showCorrige ? "Masquer la copie modèle" : "✨ Dévoiler la Copie Modèle d'Excellence"}</span>
                </button>

                {showCorrige && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        toggleSpeechCorrige(
                          currentSubject.titre,
                          currentSubject.corrige,
                        )
                      }
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{speaking ? "⏹️ Arrêter la lecture" : "🔊 Écouter"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copyCorrige(
                          currentSubject.titre,
                          currentSubject.citation.texte,
                          currentSubject.corrige,
                        )
                      }
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{copied ? "✅ Copié !" : "📋 Copier"}</span>
                    </button>
                  </>
                )}
              </div>

              <div className="text-[11px] text-slate-500">
                Sujet {currentSubject.id} sur 8 · Cnam
              </div>
            </div>

            {/* Rendu du corrigé modèle rédigé */}
            {showCorrige && (
              <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Copie modèle rédigée (Standard 18+/20 Cnam)
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                    Rédaction intégrale
                  </span>
                </div>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentSubject.corrige }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2 : MÉTHODOLOGIE & SQUELETTE DIALECTIQUE */}
      {activeMode === "methode" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Tableau comparatif Option A vs Option B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                Option A · Dissertation classique
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Sujet théorique ou comparatif (ex: Clot vs Dejours)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Construire un plan dialectique en 2 ou 3 parties (I. Le prescrit et ses limites / II. L&apos;épreuve du réel / III. Le développement du pouvoir d&apos;agir et la dispute professionnelle).
              </p>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
                Idéal si vous aimez déployer une pensée libre et argumentée.
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Option B · Question avec texte en support
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Citation clé + Série de sous-questions guidées
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Déconstruire la citation sans paraphraser, définir les concepts implicites, traiter chaque sous-question avec rigueur et proposer des perspectives cliniques d&apos;intervention.
              </p>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
                Idéal si vous préférez être guidé par une série de questions précises.
              </div>
            </div>
          </div>

          {/* Les 4 étapes de la méthode pour le texte en support */}
          <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>📋 Méthode officielle de l&apos;épreuve avec texte en support</span>
            </h3>
            <div className="space-y-3">
              {METHODE_TEXTE_SUPPORT.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
                >
                  <div className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-1.5">
                    {step.etape}
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.regles.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Squelette de la dissertation */}
          <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>🏛️ Squelette dialectique universel de dissertation</span>
            </h3>
            <div className="space-y-3">
              {ATELIER_SQUELETTE.map(([title, desc], i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60"
                >
                  <div className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-1">
                    {i + 1}. {title}
                  </div>
                  <p
                    className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0"
                    dangerouslySetInnerHTML={{ __html: desc ?? "" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Les 2 Checklists d'auto-évaluation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Checklist Texte en support */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Checklist Texte en Support ({doneTexte}/{CRITERES_TEXTE_SUPPORT.length})
                </span>
                <span className="font-bold text-xs text-amber-600">{pctTexte}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${pctTexte}%` }}
                />
              </div>
              <ul className="space-y-2 pt-1">
                {CRITERES_TEXTE_SUPPORT.map((c, i) => (
                  <li key={i}>
                    <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedTexte[i]}
                        onChange={() => toggleTexteCheck(i)}
                        className="mt-0.5 rounded border-slate-300"
                      />
                      <span className={checkedTexte[i] ? "line-through opacity-60" : ""}>
                        {c}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checklist Dissertation */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Checklist Dissertation ({doneDissert}/{ATELIER_CRITERES.length})
                </span>
                <span className="font-bold text-xs text-amber-600">{pctDissert}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${pctDissert}%` }}
                />
              </div>
              <ul className="space-y-2 pt-1">
                {ATELIER_CRITERES.map((c, i) => (
                  <li key={i}>
                    <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedDissert[i]}
                        onChange={() => toggleDissertCheck(i)}
                        className="mt-0.5 rounded border-slate-300"
                      />
                      <span className={checkedDissert[i] ? "line-through opacity-60" : ""}>
                        {c}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3 : BROUILLON LIBRE DE DISSERTATION */}
      {activeMode === "brouillon" && (
        <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Mon plan dialectique &amp; brouillon libre
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rédigez votre introduction, problématique, plan I / II / III et conclusion. Sauvegardé automatiquement.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-bold ${
                  dissertWordCount >= 60 ? "text-emerald-600" : "text-slate-500"
                }`}
              >
                {dissertWordCount} mot{dissertWordCount > 1 ? "s" : ""}
              </span>
              {dissertWordCount > 0 && (
                <button
                  type="button"
                  onClick={() => updateDraftDissert("")}
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          <textarea
            value={draftDissert}
            onChange={(e) => updateDraftDissert(e.target.value)}
            rows={14}
            placeholder="Introduction :
- Accroche (tension contemporaine / paradoxe) :
- Définition des termes clés & auteurs :
- Problématique :
- Annonce du plan dialectique :

I. Première partie (thèse / le prescrit / la tâche) :
II. Deuxième partie (antithèse / le réel de l'activité / l'obstacle) :
III. Troisième partie (dépassement / pouvoir d'agir / dispute professionnelle & santé) :

Conclusion :
- Réponse à la problématique :
- Ouverture sur l'intervention clinique :"
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none resize-y"
          />
        </div>
      )}
    </div>
  );
}
