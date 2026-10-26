"use client";

import { useEffect, useState } from "react";
import {
  ANNALES_PST123,
  METHODE_ANALYSE_PST123,
  CRITERES_EVALUATION_PST123,
  type AnnalePst123Item,
} from "@/lib/pst/data/pst123-annales";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { MatriceDubarSainsaulieu } from "./panels/MatriceDubarSainsaulieu";

const DRAFT_DISSERT_KEY = "pst123_atelier_draft_dissert_v1";
const CHECKLIST_KEY = "pst123_atelier_checklist_v1";

export function Atelier123() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon" | "oral" | "matrice"
  >("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Oral Timer & Case state
  const [oralDuration, setOralDuration] = useState<number>(10 * 60); // 10 minutes default
  const [oralTimeRemaining, setOralTimeRemaining] = useState<number>(10 * 60);
  const [oralRunning, setOralRunning] = useState<boolean>(false);
  const [selectedOralCaseIdx, setSelectedOralCaseIdx] = useState<number>(0);
  const [oralChecklist, setOralChecklist] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Checklists
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    CRITERES_EVALUATION_PST123.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (oralRunning && oralTimeRemaining > 0) {
      timer = setInterval(() => {
        setOralTimeRemaining((t) => {
          if (t <= 1) {
            setOralRunning(false);
            playSuccessSound();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [oralRunning, oralTimeRemaining]);

  const currentSubject: AnnalePst123Item =
    ANNALES_PST123[selectedSubjectIdx] ?? ANNALES_PST123[0];

  useEffect(() => {
    try {
      const rawChecklist = localStorage.getItem(CHECKLIST_KEY);
      if (rawChecklist) {
        const parsed = JSON.parse(rawChecklist);
        if (Array.isArray(parsed)) {
          setCheckedCriteria(
            CRITERES_EVALUATION_PST123.map((_, i) => Boolean(parsed[i])),
          );
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_DISSERT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem(
        "pst123_annale_drafts_v1",
      );
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

  function toggleCriterion(i: number) {
    setCheckedCriteria((c) => {
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

  function updateDraftDissert(val: string) {
    setDraftDissert(val);
    try {
      localStorage.setItem(DRAFT_DISSERT_KEY, val);
    } catch {
      /* ignore */
    }
  }

  function updateAnnaleDraft(subjectId: string, val: string) {
    setAnnaleDrafts((prev) => {
      const next = { ...prev, [subjectId]: val };
      try {
        localStorage.setItem("pst123_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function copyCorrige(titre: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(`${titre}\n\n${cleanText}`);
      playSuccessSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const doneCriteria = checkedCriteria.filter(Boolean).length;
  const pctCriteria = CRITERES_EVALUATION_PST123.length
    ? Math.round((doneCriteria * 100) / CRITERES_EVALUATION_PST123.length)
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
      {/* Header informatif sur l'examen Cnam PST123 */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-500/25 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1.5 shadow-2xs mb-2">
              <span>
                Format d&apos;examen officiel · PST123 · Élisabeth LUCY
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 m-0">
              Atelier d&apos;Écriture &amp; Annales PST123 (Option A &amp;
              Option B)
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30">
            <span>2h00 sans documents</span>
            <span>•</span>
            <span>6 séances de référence</span>
          </div>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          À l&apos;examen de PST123, l&apos;évaluation porte sur votre maîtrise
          des grilles d&apos;analyse sociologique et déontologique : l&apos;
          <b>Option A (Dissertation théorique)</b> ou l&apos;
          <b>Option B (Analyse de situation de travail / Cas clinique)</b>. Cet
          atelier rassemble <b>8 annales d&apos;examen rédigées</b>, leurs
          corrigés modèles d&apos;excellence, ainsi que la méthode dialectique
          complète (Dubar, Bourdieu, Sainsaulieu, Honneth &amp; Déontologie).
        </p>

        {/* Segmented Control */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-blue-500/20">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("annales");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "annales"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>📜 Annales : Sujets rédigés &amp; Cas cliniques</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              8 sujets
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("methode");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "methode"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>📐 Méthodologie &amp; Grilles d&apos;Analyse</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("brouillon");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "brouillon"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>✍️ Mon Brouillon d&apos;Entraînement</span>
            {dissertWordCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
                {dissertWordCount} mots
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("oral");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "oral"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
            }`}
          >
            <span>🎤 Présentation Orale (Séances 4 &amp; 5 E. Lucy)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveMode("matrice");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === "matrice"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-purple-500/15"
            }`}
          >
            <span>🧩 Matrice Dubar &amp; Sainsaulieu ✦</span>
          </button>
        </div>
      </div>

      {/* MODE 1 : ANNALES OFFICIELLES & CAS CLINIQUES */}
      {activeMode === "annales" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sélecteur horizontal des 8 sujets */}
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Sélectionnez un sujet d&apos;annale d&apos;examen PST123 :
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ANNALES_PST123.map((s, idx) => {
                const isSelected = idx === selectedSubjectIdx;
                const draft = annaleDrafts[s.id] || "";
                const words = draft.trim()
                  ? draft.trim().split(/\s+/).length
                  : 0;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      triggerHaptic("selection");
                      playClickSound();
                      setSelectedSubjectIdx(idx);
                      setShowCorrige(false);
                    }}
                    className={`shrink-0 min-w-[210px] max-w-[250px] px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-slate-900 dark:text-slate-100 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-blue-700 dark:text-blue-400">
                        Sujet {s.num} ·{" "}
                        {s.format === "dissertation"
                          ? "Dissert"
                          : s.format === "situation"
                            ? "Cas"
                            : "Texte"}
                      </span>
                      {words > 0 && (
                        <span className="text-[10px] text-emerald-600 font-mono">
                          {words} m.
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold truncate mt-0.5">
                      {s.type.toUpperCase()}
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
            {/* Titre & Format */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                  {currentSubject.format === "dissertation"
                    ? "Option A · Dissertation"
                    : currentSubject.format === "situation"
                      ? "Option B · Cas Clinique"
                      : "Option B · Texte en Support"}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {currentSubject.theme}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {currentSubject.titre}
              </h3>
            </div>

            {/* Encadré citation / situation support */}
            {currentSubject.citation && (
              <div className="p-4 sm:p-5 rounded-2xl border-l-4 border-blue-500 bg-gradient-to-br from-blue-500/10 to-emerald-500/5 dark:from-blue-500/15 dark:to-emerald-500/10">
                <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <span>💬 Citation de support</span>
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-slate-100 leading-snug">
                  {currentSubject.citation.texte}
                </blockquote>
                <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
                  <span className="text-blue-700 dark:text-blue-400 font-bold">
                    — {currentSubject.citation.auteur}
                  </span>
                  <span>•</span>
                  <span>{currentSubject.citation.source}</span>
                  {currentSubject.citation.annee && (
                    <>
                      <span>•</span>
                      <span className="font-mono">
                        ({currentSubject.citation.annee})
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

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
                    <span className="shrink-0 w-6 h-6 rounded-lg bg-blue-500/20 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critères attendus par le correcteur Cnam */}
            <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
              <summary className="font-bold text-blue-700 dark:text-blue-400 cursor-pointer select-none">
                🎯 Grille des attendus et critères de correction (clique pour
                déplier)
              </summary>
              <ul className="mt-3 space-y-1.5 list-disc pl-5 text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentSubject.criteria.map((cr, idx) => (
                  <li key={idx}>{cr}</li>
                ))}
              </ul>
            </details>

            {/* Plan conseillé */}
            <details className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-xs">
              <summary className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                🗺️ Démarche &amp; Plan de réponse conseillé (clique pour
                déplier)
              </summary>
              <div className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentSubject.planConseille.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  >
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
                      annaleWordCount >= 60
                        ? "text-emerald-600 font-bold"
                        : "text-slate-500"
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
                onChange={(e) =>
                  updateAnnaleDraft(currentSubject.id, e.target.value)
                }
                rows={6}
                placeholder={`Rédigez ici votre réponse au ${currentSubject.titre}...`}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
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
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  }`}
                >
                  <span>
                    {showCorrige
                      ? "Masquer la copie modèle"
                      : "✨ Dévoiler la Copie Modèle d'Excellence"}
                  </span>
                </button>

                {showCorrige && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        copyCorrige(
                          currentSubject.titre,
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
                Sujet {currentSubject.num} sur 8 · Cnam PST123
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

      {/* MODE 2 : MÉTHODOLOGIE & GRILLES CONCEPTUELLES */}
      {activeMode === "methode" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Comparatif Option A vs Option B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                Option A · Dissertation théorique
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Question de synthèse conceptuelle (Dubar, Bourdieu, Sainsaulieu,
                Honneth)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Déployer une argumentation académique en
                confrontant les auteurs socles. Analyser les tensions entre
                l&apos;incorporation des normes et l&apos;émancipation du sujet.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Option B · Analyse de situation / Cas clinique
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Diagnostic sociologique + Démarche déontologique
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Appliquer les grilles d&apos;analyse à un cas
                de restructuration ou de crise identitaire, poser un diagnostic
                d&apos;équipe et formaliser votre posture déontologique de
                psychologue.
              </p>
            </div>
          </div>

          {/* Méthode officielle en 4 étapes */}
          <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>
                📋 Méthodologie d&apos;examen en 4 temps (Élisabeth Lucy)
              </span>
            </h3>
            <div className="space-y-3">
              {METHODE_ANALYSE_PST123.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
                >
                  <div className="font-bold text-xs text-blue-700 dark:text-blue-400 mb-1.5">
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

          {/* Grilles synthétiques fondamentales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400">
                1. La matrice de Claude Dubar
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Double transaction :</b>
                <br />- <i>Relationnelle (pour autrui) :</i> Actes
                d&apos;attribution institutionnels (reconnaissance vs
                non-reconnaissance).
                <br />- <i>Biographique (pour soi) :</i> Actes
                d&apos;appartenance dans le temps (continuité vs rupture).
                <br />
                <b>4 Formes :</b> Promotion interne, Blocage interne, Conversion
                externe, Exclusion externe.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                2. L&apos;algorithme de Pierre Bourdieu
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <code>[(Dispositions + Capital) × Champ] = Habitus</code>
                <br />- <i>4 Capitaux :</i> Économique, Culturel (incorporé,
                objectivé, institutionnalisé), Social, Symbolique.
                <br />- <i>La double vérité du travail (1996) :</i> Exploitation
                objective vs Illusio subjective.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
                3. Les 4 modèles de Renaud Sainsaulieu
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <i>Fusionnel :</i> Camaraderie unanime de l&apos;atelier
                ouvrier.
                <br />- <i>Retrait :</i> Investissement hors-travail (famille),
                travail purement alimentaire.
                <br />- <i>Négociateur :</i> Expertise, rivalité pacifiée, débat
                démocratique.
                <br />- <i>Affinitaire :</i> Clans électifs, quête de proximité
                hiérarchique.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400">
                4. Les 3 sphères d&apos;Axel Honneth
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <i>Amour (intime) :</i> Confiance en soi (mépris : violences
                corporelles).
                <br />- <i>Droit (juridique) :</i> Respect de soi (mépris :
                exclusion civique).
                <br />- <i>Solidarité / Travail :</i> Estime de soi (mépris :
                invisibilisation, dévalorisation du care).
              </p>
            </div>
          </div>

          {/* Checklist d'auto-évaluation */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Checklist d&apos;auto-évaluation avant remise ({doneCriteria}/
                {CRITERES_EVALUATION_PST123.length})
              </span>
              <span className="font-bold text-xs text-blue-600">
                {pctCriteria}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${pctCriteria}%` }}
              />
            </div>
            <ul className="space-y-2 pt-1">
              {CRITERES_EVALUATION_PST123.map((c, i) => (
                <li key={i}>
                  <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedCriteria[i]}
                      onChange={() => toggleCriterion(i)}
                      className="mt-0.5 rounded border-slate-300"
                    />
                    <span
                      className={
                        checkedCriteria[i] ? "line-through opacity-60" : ""
                      }
                    >
                      {c}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MODE 3 : BROUILLON LIBRE DE COMPOSITION */}
      {activeMode === "brouillon" && (
        <div className="qbox p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Mon plan dialectique &amp; brouillon libre PST123
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rédigez votre introduction, problématique, plan d&apos;analyse
                et conclusion. Sauvegardé automatiquement.
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
- Accroche (tension contemporaine / crise identitaire) :
- Définition des concepts (Dubar, Bourdieu, Sainsaulieu, Honneth) :
- Problématique :
- Annonce du plan :

I. Première partie (Thèse / Diagnostic sociologique) :
- Processus relationnels (actes d'attribution, institutions, violences symboliques) :
- Processus biographiques (récit de soi, continuités/ruptures) :

II. Deuxième partie (Antithèse / Conflits de reconnaissance & dynamiques de pouvoir) :
- Formes identitaires résultantes (blocage, retrait, conversion) :
- Déni d'estime sociale et travail invisible :

III. Troisième partie (Dépassement / Posture et intervention du psychologue) :
- Triangulation du mandat (commande vs demande) :
- Cadre déontologique (consentement, secret, indépendance) :
- Restauration des espaces de délibération collective :

Conclusion :
- Réponse à la problématique :
- Ouverture sur l'éthique de la reconnaissance :"
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
          />
        </div>
      )}

      {/* MODE 4 : PRÉSENTATION ORALE (SÉANCES 4 & 5 E. LUCY) */}
      {activeMode === "oral" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Hero Banner Oral */}
          <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5">
                  <span>🎤 Séances 4 &amp; 5 · Présentation de Situation de Travail</span>
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                  Simulateur d&apos;Épreuve Orale &amp; Étude de Cas
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 m-0 max-w-2xl leading-relaxed">
                  Entraînez-vous à exposer oralement l&apos;analyse sociologique d&apos;une situation de travail en 10 ou 15 minutes, selon les critères stricts d&apos;Élisabeth Lucy.
                </p>
              </div>

              {/* Chrono Widget */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-sm flex flex-col items-center gap-2 shrink-0 min-w-[210px]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Chronomètre Oral
                </div>
                <div
                  className={`text-3xl font-mono font-black tracking-tight ${
                    oralTimeRemaining <= 60
                      ? "text-rose-600 animate-pulse"
                      : oralTimeRemaining <= 180
                        ? "text-amber-500"
                        : "text-indigo-600 dark:text-indigo-400"
                  }`}
                >
                  {String(Math.floor(oralTimeRemaining / 60)).padStart(2, "0")}:
                  {String(oralTimeRemaining % 60).padStart(2, "0")}
                </div>

                <div className="flex items-center gap-1.5 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic("selection");
                      playClickSound();
                      setOralRunning((r) => !r);
                    }}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-white cursor-pointer ${
                      oralRunning
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {oralRunning ? "Pause" : "Démarrer"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic("selection");
                      playClickSound();
                      setOralRunning(false);
                      setOralTimeRemaining(oralDuration);
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    title="Réinitialiser le chrono"
                  >
                    Reset
                  </button>
                </div>

                {/* Duration switch */}
                <div className="flex items-center gap-1 pt-1 text-[10px] font-mono">
                  <span className="text-slate-400">Durée :</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOralDuration(10 * 60);
                      setOralTimeRemaining(10 * 60);
                      setOralRunning(false);
                    }}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      oralDuration === 10 * 60
                        ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    10 min
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOralDuration(15 * 60);
                      setOralTimeRemaining(15 * 60);
                      setOralRunning(false);
                    }}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      oralDuration === 15 * 60
                        ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    15 min
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Oral Case Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
              1. Choisir une Situation de Travail d&apos;Entraînement :
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {[
                {
                  id: 0,
                  title: "L'Aide-Soignante faisant fonction de Cadre",
                  focus: "Transaction biographique rompue & Rejet des pairs",
                  desc: "Mme D., 45 ans, soignante dévouée promue cadre sans titre. Coincée entre loyauté soignante héritée et impératifs comptables.",
                },
                {
                  id: 1,
                  title: "Le Technicien Supérieur bloqué coefficient 300",
                  focus: "Identité bloquée (Dubar) & Violence symbolique",
                  desc: "M. T., 52 ans, autodidacte expert. L'arrivée de jeunes ingénieurs diplômés le relègue aux tâches subalternes.",
                },
                {
                  id: 2,
                  title: "L'Ingénieur R&D suite au rachat d'entreprise",
                  focus: "Perte de l'illusio (Bourdieu) & Modèle du retrait",
                  desc: "Mme V., 38 ans, chercheuse passionnée. Le nouveau management par KPI financiarise les projets et détruit le sens.",
                },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedOralCaseIdx(c.id);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedOralCaseIdx === c.id
                      ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-xs ring-2 ring-indigo-500/20"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      Cas n°{c.id + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0 leading-tight">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug m-0 pt-1">
                      {c.desc}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 mt-2 font-semibold">
                    Concepts : {c.focus}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trame d'Exposé Oral en 4 Temps */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
              <span>⏱ Trame recommandée pour l&apos;oral de 10–15 minutes :</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">
                    Temps 1 : Situation &amp; Tâche (2 à 3 min)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">00:00 - 02:30</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
                  <li>Présenter l&apos;acteur, son parcours et le contexte organisationnel.</li>
                  <li>Distinguer la prescription officielle (fiche de poste) et le travail réel.</li>
                  <li>Formuler la tension centrale vécue par le salarié.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">
                    Temps 2 : Double Transaction Dubar (4 à 5 min)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">02:30 - 07:00</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
                  <li><b>Transaction relationnelle</b> : Actes d&apos;attribution institutionnelle (catégorie, reconnaissance/stigmate).</li>
                  <li><b>Transaction biographique</b> : Actes d&apos;appartenance subjective (identité héritée vs visée).</li>
                  <li>Diagnostiquer la crise : écart entre l&apos;identité pour autrui et l&apos;identité pour soi.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">
                    Temps 3 : Pouvoir &amp; Modèles Sociaux (3 min)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">07:00 - 10:00</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
                  <li>Modèle culturel de Sainsaulieu : retrait, fusionnel, négociation, affinitaire.</li>
                  <li>Bourdieu : domination symbolique, dévaluation du capital culturel/spécifique.</li>
                  <li>Honneth : quelle sphère de reconnaissance est bafouée (droit, estime sociale) ?</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">
                    Temps 4 : Posture du Psychologue (2 à 3 min)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">10:00 - 12:30</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
                  <li>Triangulation de la commande managériale vs la demande du salarié.</li>
                  <li>Garanties déontologiques : consentement éclairé, secret professionnel, indépendance.</li>
                  <li>Préconisations : ouvrir des espaces de dialogue sur le métier.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Grille d'Auto-Évaluation de la Prestation Orale */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                  Grille d&apos;Évaluation de votre Oral (Barème officiel Cnam)
                </h4>
                <p className="text-xs text-slate-500 m-0">
                  Cochez les critères validés pendant votre simulation :
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-black text-indigo-600 dark:text-indigo-400">
                  {oralChecklist.filter(Boolean).length * 3 +
                    (oralChecklist[1] && oralChecklist[2] ? 2 : 0)}
                  /20
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 0,
                  label: "1. Présentation claire et contextualisée de la situation de travail réelle",
                  pts: "3 pts",
                },
                {
                  id: 1,
                  label: "2. Analyse rigoureuse de la transaction biographique (identité pour soi / héritée vs visée)",
                  pts: "4 pts",
                },
                {
                  id: 2,
                  label: "3. Analyse rigoureuse de la transaction relationnelle (identité pour autrui / attribution patronale)",
                  pts: "4 pts",
                },
                {
                  id: 3,
                  label: "4. Mobilisation d'un second auteur (Sainsaulieu, Bourdieu, Honneth ou Weber)",
                  pts: "3 pts",
                },
                {
                  id: 4,
                  label: "5. Respect du cadre déontologique du psychologue (Loi 1985, neutralité, mandat)",
                  pts: "3 pts",
                },
                {
                  id: 5,
                  label: "6. Maîtrise du temps imparti (10–15 min) et clarté de l'expression orale",
                  pts: "3 pts",
                },
              ].map((crit) => (
                <label
                  key={crit.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={oralChecklist[crit.id] || false}
                      onChange={(e) => {
                        triggerHaptic("selection");
                        playClickSound();
                        const next = [...oralChecklist];
                        next[crit.id] = e.target.checked;
                        setOralChecklist(next);
                      }}
                      className="size-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                      {crit.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                    {crit.pts}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 5 : MATRICE DUBAR & SAINSAULIEU */}
      {activeMode === "matrice" && (
        <div className="space-y-5 animate-fadeIn">
          <MatriceDubarSainsaulieu />
        </div>
      )}
    </div>
  );
}
