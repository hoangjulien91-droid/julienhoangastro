"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  Calendar,
  Sparkles,
  Copy,
  Layers,
  ArrowRight,
  Brain,
  Quote,
  GraduationCap,
  ExternalLink,
  Headphones,
  Check,
  Building2,
  Users,
  Compass,
  AlertTriangle,
} from "lucide-react";
import { PST108_AD_DATA, type Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

export function ActivitesDistantes108() {
  const [activeProf, setActiveProf] = useState<"lucy" | "valls" | "marot">("lucy");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const teacherData: Pst108TeacherAd = PST108_AD_DATA[activeProf];

  function handleCopy(text: string, key: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 3000);
      playSuccessSound();
    }
  }

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM PST108 ───────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-amber-500/15 border border-indigo-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Semestre 1 · Année 2026-2027</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/30">
              3 Enseignants Responsables
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            PST108 · Psychologie du Langage &amp; Clinique du Dialogue
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) &amp; Documents Ressources des Professeurs
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            Tous les documents du dossier officiel de téléchargement (26 fichiers) sont indexés et articulés selon les 3 modules de vos professeurs : 
            <strong> M. Éric LUCY</strong> (Pragmatique, Reconnaissance &amp; Pouvoir), 
            <strong> M. Francis VALLS</strong> (Clinique de l&apos;insertion &amp; Méthode IOD), et 
            <strong> Mme Véronique MAROT</strong> (Sciences du langage &amp; Sémiotique).
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DES 3 PROFESSEURS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("lucy");
            setSelectedDocId(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "lucy"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <GraduationCap className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Éric LUCY</div>
            <div className="text-[10px] font-normal opacity-80">Pragmatique &amp; Reconnaissance</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("valls");
            setSelectedDocId(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "valls"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Building2 className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Francis VALLS</div>
            <div className="text-[10px] font-normal opacity-80">Méthode IOD &amp; Insertion</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveProf("marot");
            setSelectedDocId(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "marot"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Users className="size-4 shrink-0" />
          <div className="text-left">
            <div>Mme Véronique MAROT</div>
            <div className="text-[10px] font-normal opacity-80">Langage &amp; Sémiotique</div>
          </div>
        </button>
      </div>

      {/* ── EN-TÊTE DU MODULE DE L'ENSEIGNANT CHOISI ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                {teacherData.prof}
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Section Moodle : {teacherData.moodleSectionId}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {teacherData.role} · <em>{teacherData.themeGeneral}</em>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={teacherData.moodleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
            >
              <span>Accéder à l&apos;espace Moodle</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {/* Ressource Audio (ex: Philorama pour Lucy) */}
        {teacherData.audioResource && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 mt-0.5">
                <Headphones className="size-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {teacherData.audioResource.title}
                  </span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-200">
                    {teacherData.audioResource.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {teacherData.audioResource.summary}
                </p>
              </div>
            </div>
            <a
              href={teacherData.audioResource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs shrink-0"
            >
              <span>Écouter le podcast</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        )}
      </div>

      {/* ── MASTERCLASS SLIDE : LA TOUR DE BABEL (OU DISPOSITIF THÉORIQUE) ─ */}
      {teacherData.slideMasterclass && (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="size-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="text-sm sm:text-base font-serif font-black text-slate-900 dark:text-white m-0">
                  {teacherData.slideMasterclass.titre}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Cadre de référence officiel : {teacherData.slideMasterclass.oeuvreArt} ({teacherData.slideMasterclass.annee})
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
              Programme Examen RNCP 7
            </span>
          </div>

          {/* Les 3 grands axes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
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
                    Notions maîtresses :
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

      {/* ── DOCUMENTS CLEFS DU DOSSIER TÉLÉCHARGEMENT (26 FICHIERS) ─────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
              Documents &amp; Articles Ressources à Mobiliser ({teacherData.documentsClefs.length})
            </h4>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Dossier local : <code className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">~/Downloads/documents ressources-20261025/</code>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {teacherData.documentsClefs.map((doc) => {
            const isExpanded = selectedDocId === doc.id;
            return (
              <div
                key={doc.id}
                className={`p-4 rounded-xl border transition-all ${
                  isExpanded
                    ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20"
                    : "bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
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
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <FileText className="size-3" />
                      <span>{doc.fichierLocal}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedDocId(isExpanded ? null : doc.id);
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      {isExpanded ? "Replier" : "Fiche synthèse"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `【${doc.titre} - ${doc.auteur} (${doc.annee})】\n${doc.resumePedagogique}\n\nPoint Clé 18/20 : ${doc.concept18}`,
                          doc.id,
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50"
                      title="Copier la fiche pour le devoir ou l'examen"
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

                {/* Contenu pédagogique déplié */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                        <Quote className="size-3 text-indigo-500" />
                        <span>Résumé analytique pour le cours :</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                        {doc.resumePedagogique}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                      <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                          Notion Maîtresse 18/20 pour l&apos;examen RNCP 7 :
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
    </div>
  );
}
