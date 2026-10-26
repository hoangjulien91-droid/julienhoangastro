"use client";

import { useEffect, useState } from "react";
import {
  ANNALES_PST108,
  METHODE_ANALYSE_PST108,
  CRITERES_EVALUATION_PST108,
  type AnnalePst108Item,
} from "@/lib/pst/data/pst108-annales";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

const DRAFT_DISSERT_KEY = "pst108_atelier_draft_dissert_v1";
const CHECKLIST_KEY = "pst108_atelier_checklist_v1";

export function Atelier108() {
  const [activeMode, setActiveMode] = useState<
    "annales" | "methode" | "brouillon"
  >("annales");
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  // Checklists
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    CRITERES_EVALUATION_PST108.map(() => false),
  );

  // Drafts
  const [draftDissert, setDraftDissert] = useState("");
  const [annaleDrafts, setAnnaleDrafts] = useState<Record<string, string>>({});

  const currentSubject: AnnalePst108Item =
    ANNALES_PST108[selectedSubjectIdx] ?? ANNALES_PST108[0];

  useEffect(() => {
    try {
      const rawChecklist = localStorage.getItem(CHECKLIST_KEY);
      if (rawChecklist) {
        const parsed = JSON.parse(rawChecklist);
        if (Array.isArray(parsed)) {
          setCheckedCriteria(
            CRITERES_EVALUATION_PST108.map((_, i) => Boolean(parsed[i])),
          );
        }
      }
      const savedDraftDissert = localStorage.getItem(DRAFT_DISSERT_KEY);
      if (savedDraftDissert) setDraftDissert(savedDraftDissert);

      const savedAnnaleDraftsRaw = localStorage.getItem(
        "pst108_annale_drafts_v1",
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
        localStorage.setItem("pst108_annale_drafts_v1", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function copyCorrige(titre: string, corrigeHtml: string) {
    const cleanText = corrigeHtml.replace(/<[^>]*>/g, "");
    try {
      navigator.clipboard.writeText(
        `${titre}\n\nCORRIGÉ D'EXCELLENCE :\n${cleanText}`,
      );
      setCopied(true);
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const currentAnnaleDraft = annaleDrafts[currentSubject.id] || "";
  const annaleWordCount = currentAnnaleDraft.trim()
    ? currentAnnaleDraft.trim().split(/\s+/).length
    : 0;

  const doneCriteria = checkedCriteria.filter(Boolean).length;
  const pctCriteria = Math.round(
    (doneCriteria / CRITERES_EVALUATION_PST108.length) * 100,
  );

  return (
    <div className="space-y-6">
      {/* HEADER DE L'ATELIER PST108 */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/20 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs mb-2">
              <span>
                ✦ Atelier d&apos;Écriture &amp; Annales Officielles PST108
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 tracking-tight m-0">
              Entraînement Intensif à l&apos;Épreuve sur Table (2h00)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Aligné sur les 6 séances fondamentales et les publications de M.
              Éric LUCY (Empan 2021, Le Sociographe 2020) et M. Francis VALLS
              (Méthode IOD). 8 annales rédigées, grille critériée CNAM et copies
              modèles d&apos;excellence (18+/20).
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("annales");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "annales"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              📚 8 Annales Types
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("methode");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "methode"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              📐 Méthode &amp; Grille
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveMode("brouillon");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeMode === "brouillon"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              ✍️ Brouillon Libre
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1 : ANNALES TYPES ET CORRIGÉS D'EXCELLENCE */}
      {activeMode === "annales" && (
        <div className="space-y-6">
          {/* SÉLECTEUR DE SUJETS PAR BOUTONS PILLS */}
          <div className="flex flex-wrap gap-2 pb-2">
            {ANNALES_PST108.map((subject, idx) => {
              const isSelected = idx === selectedSubjectIdx;
              const hasDraft = Boolean((annaleDrafts[subject.id] || "").trim());
              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedSubjectIdx(idx);
                    setShowCorrige(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
                  }`}
                >
                  <span className="opacity-70 font-mono text-[10px]">
                    S{idx + 1}
                  </span>
                  <span className="truncate max-w-[170px] sm:max-w-[210px]">
                    {subject.titre.replace(/^Sujet \d+ : /, "")}
                  </span>
                  {hasDraft && (
                    <span
                      className="w-2 h-2 rounded-full bg-amber-400"
                      title="Brouillon en cours"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* FICHE DU SUJET ACTIF */}
          <div className="qbox p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5 animate-fadeIn">
            {/* Header du sujet */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  {currentSubject.session}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Épreuve 2h00
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                PST108 · É. Lucy &amp; F. Valls (Cnam)
              </div>
            </div>

            {/* Titre */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
              {currentSubject.titre}
            </h3>

            {/* Citation ou contexte officiel */}
            {currentSubject.contexteCitation && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                «&nbsp;
                {currentSubject.contexteCitation.replace(
                  /^[«\s]+|[»\s]+$/g,
                  "",
                )}
                &nbsp;»
              </div>
            )}

            {/* Questions d'examen */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Questions d&apos;examen officiel (CNAM) :
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                {currentSubject.questions.map((q, qIdx) => (
                  <li key={qIdx}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Concepts clés et pièges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40">
                <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">
                  💡 Concepts indispensables à mobiliser :
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {currentSubject.conceptsCles.join(" · ")}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                  ⚠️ Piège majeur à éviter :
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {currentSubject.piegesAEviter[0]}
                </span>
              </div>
            </div>

            {/* Plan conseillé (2 parties, 4 sous-parties) */}
            <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Structure dialectique attendue (I.A, I.B / II.A, II.B)
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                  Plan en 4 sous-parties
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {currentSubject.planConseille.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 space-y-1.5"
                  >
                    <div className="font-bold text-xs text-amber-900 dark:text-amber-300">
                      {p.partie}
                    </div>
                    <ul className="text-[11px] space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-3.5 leading-relaxed">
                      {p.sousParties.map((sp, spIdx) => (
                        <li key={spIdx}>{sp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Espace brouillon interactif du candidat */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span>✍️ Mon brouillon / Ma composition pour ce sujet :</span>
                </label>
                <div className="flex items-center gap-3 text-xs">
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
                placeholder={`Rédigez ici votre réponse ou votre ébauche pour : ${currentSubject.titre}...`}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
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
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
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
                          currentSubject.corrigeExcellence,
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
                Sujet {selectedSubjectIdx + 1} sur {ANNALES_PST108.length} ·
                Cnam PST108
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
                  dangerouslySetInnerHTML={{
                    __html: currentSubject.corrigeExcellence,
                  }}
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
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                Option A · Dissertation théorique
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Question de synthèse conceptuelle (Bourdieu, Habermas, Honneth,
                Valls)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Déployer une confrontation dialectique
                rigoureuse (ex. Austin vs Bourdieu, agir stratégique vs
                communicationnel, employabilité vs IOD). Articuler la critique
                sociologique et la pragmatique du langage.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Option B · Étude de situation de travail / Cas clinique
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Diagnostic de communication + Posture déontologique
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Objectif :</b> Analyser une interaction réelle (Gérard au
                SAMU social, procès France Télécom, négociation IOD d&apos;offre
                d&apos;emploi). Dévoiler la violence symbolique et formaliser
                des préconisations déontologiques.
              </p>
            </div>
          </div>

          {/* Méthode officielle en 4 étapes */}
          <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>
                📋 Méthodologie officielle d&apos;examen en 4 temps (Éric Lucy
                &amp; Francis Valls)
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {METHODE_ANALYSE_PST108.map((m) => (
                <div
                  key={m.num}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1"
                >
                  <div className="font-bold text-xs text-indigo-700 dark:text-indigo-400">
                    Étape {m.num} : {m.titre}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Grilles synthétiques fondamentales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                1. Pierre Bourdieu &amp; Éric Lucy (Pouvoir symbolique)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <b>Marché linguistique :</b> La parole est un capital
                symbolique procurant un profit de distinction.
                <br />- <b>Status est magistratus :</b> L&apos;efficacité
                performative dérive de l&apos;institution mandataire (rituel du
                lit de justice de Sarah Hanley).
                <br />- <b>L&apos;Insulte (Éric Lucy, 2021) :</b> Violence
                symbolique réactivant des stigmates préconstruits ; hexis de la
                « grande gueule » vs « fine bouche ».
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                2. Jürgen Habermas (Agir communicationnel)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <b>Agir stratégique :</b> Orienté vers le succès (Erfolg),
                manipulation et instrumentalisation d&apos;autrui.
                <br />- <b>Agir communicationnel :</b> Orienté vers
                l&apos;entente (Verständigung) par des raisons argumentées.
                <br />- <b>4 Prétentions universelles à la validité :</b>{" "}
                Intelligibilité, Vérité factuelle, Justesse normative, Sincérité
                subjective.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
                3. Axel Honneth (Lutte pour la reconnaissance)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <b>3 Sphères morales :</b> Amour (confiance en soi), Droit
                (respect de soi), Solidarité/Travail (estime de soi).
                <br />- <b>3 Mépris :</b> Atteinte physique, Déni de droits
                statutaires, Humiliation / Invisibilisation du métier.
                <br />- <b>Réification (2007) :</b> « Oubli de la reconnaissance
                » préalable de l&apos;humain comme sujet.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400">
                4. Francis Valls &amp; Denis Castra (Méthode IOD)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                - <b>Rupture avec l&apos;employabilité :</b> Refus du ciblage
                déficitaire des demandeurs d&apos;emploi.
                <br />- <b>Intervention sur l&apos;offre :</b> Adapter
                l&apos;entreprise et le poste de travail réel.
                <br />- <b>4 Règles déontologiques :</b> Refus du tri, non-mise
                en concurrence, accès direct au droit commun salarial, médiation
                bilatérale.
              </p>
            </div>
          </div>

          {/* Checklist d'auto-évaluation */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Checklist d&apos;auto-évaluation avant remise ({doneCriteria}/
                {CRITERES_EVALUATION_PST108.length})
              </span>
              <span className="font-bold text-xs text-indigo-600 font-mono">
                {pctCriteria}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${pctCriteria}%` }}
              />
            </div>
            <ul className="space-y-2 pt-1">
              {CRITERES_EVALUATION_PST108.map((c, i) => (
                <li key={c.id}>
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedCriteria[i]}
                      onChange={() => toggleCriterion(i)}
                      className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div
                      className={
                        checkedCriteria[i] ? "line-through opacity-60" : ""
                      }
                    >
                      <span className="font-bold">
                        {c.label} ({c.points}) :
                      </span>{" "}
                      <span className="text-slate-500">{c.description}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MODE 3 : BROUILLON LIBRE DE COMPOSITION */}
      {activeMode === "brouillon" && (
        <div className="qbox p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Mon plan dialectique &amp; brouillon libre PST108
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rédigez votre introduction, problématique, plan d&apos;analyse
                et conclusion. Sauvegardé automatiquement.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500 font-mono">
                {draftDissert.trim()
                  ? draftDissert.trim().split(/\s+/).length
                  : 0}{" "}
                mots
              </span>
              {draftDissert.trim() && (
                <button
                  type="button"
                  onClick={() => updateDraftDissert("")}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          <textarea
            value={draftDissert}
            onChange={(e) => updateDraftDissert(e.target.value)}
            rows={16}
            placeholder="Structurez ici votre devoir :

1. INTRODUCTION (Accroche sur la communication au travail, définitions des concepts clés, tension dialectique, problématique, annonce du plan en 2 parties).
2. PREMIÈRE PARTIE : I.A (...) et I.B (...)
3. SECONDE PARTIE : II.A (...) et II.B (...)
4. CONCLUSION (Bilan dialectique, ouverture sur la posture déontologique du psychologue du travail et l'intervention réelle sans tri)..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
          />
        </div>
      )}
    </div>
  );
}
