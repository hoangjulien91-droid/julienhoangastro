"use client";

import React from "react";
import type {
  Pst108CaseValls,
  Pst108Document,
  Pst108ExerciseValls,
  Pst108TeacherAd,
} from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  HelpCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export interface AdTeacherVallsSectionProps {
  teacherData: Pst108TeacherAd;
  vallsTab: "exercices" | "cas" | "theorie" | "docs";
  onVallsTabChange: (tab: "exercices" | "cas" | "theorie" | "docs") => void;
  selectedExNum: number;
  onSelectExNum: (num: number) => void;
  expandedCasId: string | null;
  onToggleExpandedCasId: (id: string | null) => void;
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export function AdTeacherVallsSection({
  teacherData,
  vallsTab,
  onVallsTabChange,
  selectedExNum,
  onSelectExNum,
  expandedCasId,
  onToggleExpandedCasId,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}: AdTeacherVallsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("exercices");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "exercices"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          ✍️ Les 3 Exercices Distanciel
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("cas");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "cas"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          🎯 Les {teacherData.etudesDeCas?.length || 5} Études de Cas Cliniques
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("theorie");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "theorie"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📐 Théorie : Ghiglione vs Shannon
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("docs");
          }}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "docs"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📚 Documents &amp; SAVPJJ
        </button>
      </div>

      {/* 1. LES 3 EXERCICES DU DISTANCIEL DE VALLS */}
      {vallsTab === "exercices" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold">Consignes officielles de M. Valls :</span> « En prévision de nos échanges à distance, merci de prendre connaissance des consignes ci-jointes pour chacun des 3 exercices suivants et de dégager pour vous-même et/ou de rédiger des premiers éléments de réponse. »
          </div>

          <div className="flex gap-2">
            {teacherData.exercicesDistanciel?.map((ex: Pst108ExerciseValls) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectExNum(ex.num);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedExNum === ex.num
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Exercice {ex.num} · {ex.num === 1 ? "R.L. KAHN" : ex.num === 2 ? "Le goût des autres" : "Corps & Voix"}
              </button>
            ))}
          </div>

          {teacherData.exercicesDistanciel
            ?.filter((ex: Pst108ExerciseValls) => ex.num === selectedExNum)
            .map((ex: Pst108ExerciseValls) => (
              <div
                key={ex.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Exercice {ex.num} · Référence : {ex.auteurRef}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                      {ex.titre}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() => onCopy(ex.modeleReponse18.syntheseForum, `ex-${ex.num}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                  >
                    {copiedKey === `ex-${ex.num}` ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span>Copié dans le presse-papier !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copier pour la Webconférence</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white">Contexte d&apos;analyse : </span>
                  {ex.contexte}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                    <HelpCircle className="size-3.5" />
                    <span>Questions posées par M. Valls :</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 pl-4 list-disc font-medium">
                    {ex.questionsOfficielles.map((q, idx) => (
                      <li key={idx} className="leading-snug">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ex.conceptsAPrivilegier.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                    >
                      ✦ {c}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-800/50 border border-emerald-500/25 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <h5 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200 m-0">
                      Proposition de réponse rédigée d&apos;excellence (Critères 18/20) :
                    </h5>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {ex.modeleReponse18.analyseDetaillee}
                  </div>

                  <div className="space-y-1 pt-2 border-t border-emerald-500/20">
                    <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                      Points clés à valoriser lors de la webconférence :
                    </div>
                    <ul className="text-[11px] text-emerald-800 dark:text-emerald-400 space-y-0.5 pl-4 list-disc">
                      {ex.modeleReponse18.pointsClesExamen.map((pk, idx) => (
                        <li key={idx}>{pk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 2. LES 4 ÉTUDES DE CAS CLINIQUES DE VALLS */}
      {vallsTab === "cas" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
            <span className="font-bold">Scènes d&apos;interlocution de M. Valls :</span> « Au travers de situations concrètes d&apos;échanges verbaux tendus ou asymétriques, nous mettons au jour la co-construction de la référence, la rupture des scripts et la pluralité des grandeurs en jeu. »
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacherData.etudesDeCas?.map((cas: Pst108CaseValls) => (
              <div
                key={cas.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-800/50">
                      {cas.auteurRef}
                    </span>
                  </div>
                  <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                    {cas.titre}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {cas.contexte}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Analyse clinique du psychologue :
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cas.analyseClinique}
                  </p>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="size-3 shrink-0" />
                    <span>{cas.notionCle}</span>
                  </div>

                  {cas.questionsOfficielles && cas.questionsOfficielles.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Questions officielles posées par M. Valls :
                      </div>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc pl-4 space-y-0.5">
                        {cas.questionsOfficielles.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {cas.transcriptionDialogue && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          onToggleExpandedCasId(expandedCasId === cas.id ? null : cas.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
                      >
                        <MessageSquare className="size-3.5" />
                        <span>{expandedCasId === cas.id ? "Masquer le verbatim intégral" : "Lire la transcription intégrale du dialogue"}</span>
                        <ChevronDown className={`size-3 transition-transform ${expandedCasId === cas.id ? "rotate-180" : ""}`} />
                      </button>
                      {expandedCasId === cas.id && (
                        <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed border border-slate-800">
                          {cas.transcriptionDialogue}
                        </pre>
                      )}
                    </div>
                  )}

                  {cas.fichierTelechargeable && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      <a
                        href={cas.fichierTelechargeable}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors"
                      >
                        <FileText className="size-3.5" />
                        <span>Télécharger le support officiel</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. THÉORIE & SCHÉMAS */}
      {vallsTab === "theorie" && (
        <div className="space-y-4">
          {teacherData.slideMasterclass && (
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  Cadre Conceptuel Officiel M. Francis Valls
                </span>
                <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-0.5">
                  {teacherData.slideMasterclass.titre}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {teacherData.slideMasterclass.axes.map((axe) => (
                  <div
                    key={axe.num}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                          {axe.num}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                          {axe.titre}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {axe.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                      <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                        Points clés du cours :
                      </div>
                      <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                        {axe.notionsCles.map((nc, idx) => (
                          <li key={idx} className="leading-snug">
                            {nc}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {axe.auteurs.map((aut, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          >
                            {aut}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. DOCUMENTS RESSOURCES DE VALLS */}
      {vallsTab === "docs" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                Documents du cours de M. Valls ({teacherData.documentsClefs.length})
              </h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Section Moodle : <code className="text-indigo-600 font-mono text-[11px]">68130</code>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {teacherData.documentsClefs.map((doc: Pst108Document) => {
              const isExpanded = selectedDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isExpanded
                      ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                      : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {doc.type} · {doc.annee}
                        </span>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {doc.auteur}
                        </span>
                      </div>
                      <h5 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                        {doc.titre}
                      </h5>
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                        <FileText className="size-3 shrink-0" />
                        <span>{doc.fichierLocal}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          onSelectDocId(isExpanded ? null : doc.id);
                        }}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        {isExpanded ? "Replier" : "Fiche synthèse"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onCopy(
                            `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                            doc.id,
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                      >
                        {copiedKey === doc.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                        {doc.resumePedagogique}
                      </p>
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                        <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                            Notion Maîtresse 18/20 :
                          </div>
                          <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                            {doc.concept18}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
