"use client";

import React from "react";
import type {
  Pst108AdMarot,
  Pst108DispositifMarot,
  Pst108Document,
  Pst108TeacherAd,
} from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  BookOpen,
  Brain,
  Check,
  Copy,
  ExternalLink,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export interface AdTeacherMarotSectionProps {
  teacherData: Pst108TeacherAd;
  marotTab: "ad_miossec" | "dispositifs" | "theorie" | "textes";
  onMarotTabChange: (tab: "ad_miossec" | "dispositifs" | "theorie" | "textes") => void;
  selectedAdDate: "04nov" | "10nov";
  onSelectAdDate: (date: "04nov" | "10nov") => void;
  selectedDispId: string;
  onSelectDispId: (id: string) => void;
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export function AdTeacherMarotSection({
  teacherData,
  marotTab,
  onMarotTabChange,
  selectedAdDate,
  onSelectAdDate,
  selectedDispId,
  onSelectDispId,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}: AdTeacherMarotSectionProps) {
  return (
    <div className="space-y-6">
      {/* Sous-onglets Marot */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("ad_miossec");
          }}
          className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "ad_miossec"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📝 AD du 04/11 &amp; 10/11 (Miossec) ✦
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("dispositifs");
          }}
          className={`flex-1 min-w-[180px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "dispositifs"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          🛠️ Les 3 Dispositifs Cliniques
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("theorie");
          }}
          className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "theorie"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📐 Vygotski vs Piaget &amp; Bakhtine
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("textes");
          }}
          className={`flex-1 min-w-[160px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "textes"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📚 Textes Téléchargés ({teacherData.documentsClefs.length})
        </button>
      </div>

      {/* 1. ACTIVITÉS DISTANTES DES 04/11 ET 10/11 (YVON MIOSSEC 2019) */}
      {marotTab === "ad_miossec" && (
        <div className="space-y-4">
          {/* Sélecteur de la partie d'AD */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSelectAdDate("04nov");
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedAdDate === "04nov"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
              }`}
            >
              📅 Séance du 04 novembre 2026 (Partie 1/2 : Problématique &amp; Rôle)
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSelectAdDate("10nov");
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedAdDate === "10nov"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
              }`}
            >
              📅 Séance du 10 novembre 2026 (Partie 2/2 : Effets santé &amp; Réfutation)
            </button>
          </div>

          {/* Rendu de l'AD choisie */}
          {teacherData.adSeancesMarot
            ?.filter((ad: Pst108AdMarot) => (selectedAdDate === "04nov" ? ad.id === "ad-marot-4nov" : ad.id === "ad-marot-10nov"))
            .map((ad: Pst108AdMarot) => (
              <div
                key={ad.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                        {ad.seanceDate} · {ad.partie}
                      </span>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        Mme MAROT
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-1">
                      {ad.titre}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                      Lecture officielle : <strong>{ad.lecturePrescrite}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onCopy(ad.texteCompletCopier, ad.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                  >
                    {copiedKey === ad.id ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span>Copié dans le presse-papier !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copier tout pour le Forum Moodle</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Objectif visé : </span>
                  {ad.objectif}
                </div>

                {/* Liste des questions officielles avec corrigé 18/20 */}
                <div className="space-y-4">
                  {ad.questions.map((q) => (
                    <div
                      key={q.num}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5 bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <HelpCircle className="size-3.5" />
                          <span>Question {q.num} : {q.titreQuestion}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onCopy(`【Question ${q.num} : ${q.titreQuestion}】\n\n${q.reponseRedigee18}`, `${ad.id}-q${q.num}`)}
                          className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === `${ad.id}-q${q.num}` ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                          <span>{copiedKey === `${ad.id}-q${q.num}` ? "Copié !" : "Copier la question"}</span>
                        </button>
                      </div>

                      <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold italic">
                        « {q.enonceOfficiel} »
                      </div>

                      <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {q.reponseRedigee18}
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {q.pointsCles.map((pk, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                          >
                            ✓ {pk}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 2. LES 3 DISPOSITIFS CLINIQUES D'INTERVENTION */}
      {marotTab === "dispositifs" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-900 dark:text-indigo-200">
            <span className="font-bold">Programme officiel de Mme Marot (Séances des 27/11 et 10/12) :</span> « Les dispositifs d&apos;entretien en psychologie clinique du travail : L&apos;instruction au sosie, l&apos;autoconfrontation simple, l&apos;autoconfrontation croisée. »
          </div>

          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            {teacherData.dispositifsMarot?.map((disp: Pst108DispositifMarot) => (
              <button
                key={disp.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectDispId(disp.id);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedDispId === disp.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-black"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {disp.nom}
              </button>
            ))}
          </div>

          {teacherData.dispositifsMarot
            ?.filter((disp: Pst108DispositifMarot) => disp.id === selectedDispId)
            .map((disp: Pst108DispositifMarot) => (
              <div
                key={disp.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Dispositif Clinique Cnam · Fondateurs : {disp.inventeur}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                      {disp.nom}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onCopy(
                        `【${disp.nom} - ${disp.inventeur}】\nProtocole : ${disp.protocole}\n\nCas concret : ${disp.casCliniqueConcret.titre} (${disp.casCliniqueConcret.profession})\n${disp.casCliniqueConcret.analyse}\n\nDéplacement clinique : ${disp.casCliniqueConcret.deplacementClinique}`,
                        disp.id,
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
                  >
                    {copiedKey === disp.id ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copier la fiche méthodologique</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white">Protocole d&apos;intervention : </span>
                  {disp.protocole}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50 dark:to-slate-800/50 border border-indigo-500/20 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Brain className="size-4 text-indigo-600 dark:text-indigo-400" />
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white m-0">
                        Cas Clinique de Référence : {disp.casCliniqueConcret.titre}
                      </h5>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                      {disp.casCliniqueConcret.profession}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {disp.casCliniqueConcret.analyse}
                  </p>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2">
                    <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                        Effet psychologique &amp; Déplacement clinique (18/20 à l&apos;examen) :
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium leading-relaxed">
                        {disp.casCliniqueConcret.deplacementClinique}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {disp.conceptsCles.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                    >
                      ✦ {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 3. THÉORIE : VYGOTSKI VS PIAGET & DIALOGISME BAKHTINIEN */}
      {marotTab === "theorie" && (
        <div className="space-y-4">
          {teacherData.slideMasterclass && (
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  Cadre Conceptuel Officiel Mme Véronique MAROT
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
                        Concepts clés :
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

      {/* 4. LES TEXTES FONDAMENTAUX DE MME MAROT */}
      {marotTab === "textes" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                Articles &amp; Textes de Référence de Mme Marot ({teacherData.documentsClefs.length})
              </h4>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Dossier local : <code className="text-indigo-600 font-mono text-[11px]">~/Downloads/</code>
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
                        {doc.externalUrl && (
                          <a
                            href={doc.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            <ExternalLink className="size-2.5" />
                            <span>Lien Cairn / Persée</span>
                          </a>
                        )}
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
                      {doc.externalUrl && (
                        <a
                          href={doc.externalUrl}
                          download
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                        >
                          <ExternalLink className="size-3" />
                          <span>Télécharger</span>
                        </a>
                      )}
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
