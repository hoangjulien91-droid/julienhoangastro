"use client";

import {
  Users,
  Building2,
  GraduationCap,
  ExternalLink,
  Headphones,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import type { Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";

interface Ad108TeacherHeaderProps {
  activeProf: "lucy" | "valls" | "marot";
  onSelectProf: (prof: "lucy" | "valls" | "marot") => void;
  teacherData: Pst108TeacherAd;
}

export function Ad108TeacherHeader({
  activeProf,
  onSelectProf,
  teacherData,
}: Ad108TeacherHeaderProps) {
  return (
    <>
      {/* ── SÉLECTEUR DES 3 PROFESSEURS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSelectProf("marot");
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "marot"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Users className="size-4 shrink-0" />
          <div className="text-left">
            <div>Mme Véronique MAROT ✦</div>
            <div className="text-[10px] font-normal opacity-80">
              Sosie, Autoconfrontation &amp; AD 04/11 &amp; 10/11
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSelectProf("valls");
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "valls"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Building2 className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Francis VALLS ✦</div>
            <div className="text-[10px] font-normal opacity-80">
              Approche psychosociale &amp; Exercices 1-2-3
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSelectProf("lucy");
          }}
          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeProf === "lucy"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30 font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
          }`}
        >
          <GraduationCap className="size-4 shrink-0" />
          <div className="text-left">
            <div>M. Éric LUCY (31 docs &amp; AD)</div>
            <div className="text-[10px] font-normal opacity-80">
              Pragmatique, Reconnaissance &amp; Tour de Babel
            </div>
          </div>
        </button>
      </div>

      {/* ── EN-TÊTE DU MODULE DE L'ENSEIGNANT CHOISI ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                {teacherData.prof}
              </h4>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Moodle : {teacherData.moodleSectionId}
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

        {/* Podcast Philorama (pour Lucy) */}
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
    </>
  );
}
