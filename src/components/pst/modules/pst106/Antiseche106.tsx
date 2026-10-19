"use client";

import { useState } from "react";
import {
  ANTISECHE_HISTOIRE,
  ANTISECHE_MATRICE,
  ANTISECHE_AUTEURS,
  ANTISECHE_DEJOURS,
  ANTISECHE_BONUS,
  ANTISECHE_EXEMPLES,
  ANTISECHE_METHODE,
  ANTISECHE_PHILOSOPHES,
  ANTISECHE_JAHODA,
  ANTISECHE_SUPER,
  ANTISECHE_HOFSTEDE,
  ANTISECHE_GAY_LUSSAC,
  ANTISECHE_EMBOITEMENT,
  type PhilosopheItem,
} from "@/lib/pst/data/pst106-antiseche";

function AuthorBlock({
  color,
  title,
  lines,
}: {
  color: string;
  title: string;
  lines: { b: string; t: string }[];
}) {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs">
      <div
        className="sec"
        style={{
          color,
          fontWeight: 700,
          fontSize: 13,
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        {title}
      </div>
      {lines.map((l, i) => (
        <p
          className="mini"
          key={i}
          style={{ fontSize: 12.5, lineHeight: 1.5, margin: "0 0 6px" }}
        >
          <b>{l.b} : </b>
          <span dangerouslySetInnerHTML={{ __html: l.t }} />
        </p>
      ))}
    </div>
  );
}

export function Antiseche106() {
  const [hideAnswers, setHideAnswers] = useState(false);
  const [philosopheFilter, setPhilosopheFilter] = useState<
    "all" | "alienation" | "emancipation" | "realite"
  >("all");

  function mask(text: string) {
    if (!hideAnswers) return <>{text}</>;
    return (
      <span
        style={{
          color: "transparent",
          borderBottom: "1px solid #999",
          background: "#f0f0f0",
          userSelect: "none",
        }}
        className="rounded px-1"
      >
        {text}
      </span>
    );
  }

  const filteredPhilosophes = ANTISECHE_PHILOSOPHES.filter(
    (p) => philosopheFilter === "all" || p.axe === philosopheFilter,
  );

  return (
    <div className="space-y-4">
      <p className="anti-intro text-sm text-slate-600 dark:text-slate-300">
        Une <b>antisèche complète et dense</b> : concepts, philosophes,
        fonctions psychologiques du travail (Jahoda), histoire du CNAM, matrices
        comparatives et méthodes d&apos;examen. Imprime-la (ou enregistre-la en
        PDF) pour t&apos;entraîner à la <b>reproduire à la main</b> — l&apos;exercice de
        mémorisation le plus efficace.{" "}
        <span className="text-amber-700 dark:text-amber-400 font-semibold">
          Rappel : c&apos;est un outil d&apos;entraînement, non autorisé le jour J.
        </span>
      </p>

      {/* Barre d'action print & test */}
      <div
        className="anti-bar flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
            onClick={() => window.print()}
          >
            Imprimer / Exporter PDF
          </button>
          <button
            type="button"
            className="btn ghost px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer"
            onClick={() => setHideAnswers((h) => !h)}
          >
            {hideAnswers ? "Afficher les réponses" : "Masquer les réponses (mode test)"}
          </button>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          Programme PST106 · Cnam 2026/2027
        </div>
      </div>

      <div id="antiSheet" className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            PST106 — Antisèche Clinique &amp; Psychologie du travail
          </h2>
          <div className="sub text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Lagabrielle · Wisner · Clot · Dejours · Jahoda · Gay-Lussac — à maîtriser de mémoire
          </div>
        </div>

        {/* SECTION 1: HISTOIRE & PSYCHOTECHNIQUE */}
        <div>
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
            ① Histoire &amp; Psychotechnique (Question probable 1)
          </div>
          <table className="w-full text-xs sm:text-sm">
            <tbody>
              {ANTISECHE_HISTOIRE.map((row, i) => (
                <tr key={i} className="border-b border-slate-200/70 dark:border-slate-800">
                  <th scope="row" className="text-left font-semibold py-1.5 pr-3 text-slate-900 dark:text-slate-200">
                    {row.th}
                  </th>
                  <td
                    className="py-1.5 text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: row.td }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION 2: LA MATRICE 3 COURANTS */}
        <div>
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
            ② La matrice — 3 courants (Cœur de l&apos;examen)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700">
                  {ANTISECHE_MATRICE.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`text-left py-2 px-2.5 font-bold ${
                        i === 1
                          ? "cErg text-blue-700 dark:text-blue-400"
                          : i === 2
                            ? "cAct text-emerald-700 dark:text-emerald-400"
                            : i === 3
                              ? "cPsy text-purple-700 dark:text-purple-400"
                              : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ANTISECHE_MATRICE.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200/60 dark:border-slate-800">
                    <th scope="row" className="text-left py-2 px-2.5 font-semibold text-slate-900 dark:text-slate-100">
                      {row.axe}
                    </th>
                    <td className="cErg py-2 px-2.5 text-slate-700 dark:text-slate-300">{mask(row.erg)}</td>
                    <td className="cAct py-2 px-2.5 text-slate-700 dark:text-slate-300">{mask(row.act)}</td>
                    <td className="cPsy py-2 px-2.5 text-slate-700 dark:text-slate-300">{mask(row.psy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: LE TRAVAIL SELON 8 PHILOSOPHES + ARENDT */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
            <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
              ③ Le travail selon les philosophes (Exercice de cours &amp; Slides)
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-[11px]">
              <button
                type="button"
                onClick={() => setPhilosopheFilter("all")}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  philosopheFilter === "all"
                    ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                Tous (9)
              </button>
              <button
                type="button"
                onClick={() => setPhilosopheFilter("alienation")}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  philosopheFilter === "alienation"
                    ? "bg-rose-700 text-white"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100"
                }`}
              >
                Aliénation (4)
              </button>
              <button
                type="button"
                onClick={() => setPhilosopheFilter("emancipation")}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  philosopheFilter === "emancipation"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                }`}
              >
                Émancipation (4)
              </button>
              <button
                type="button"
                onClick={() => setPhilosopheFilter("realite")}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  philosopheFilter === "realite"
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100"
                }`}
              >
                Lien au réel (1)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPhilosophes.map((p) => {
              const badgeBg =
                p.axe === "alienation"
                  ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                  : p.axe === "emancipation"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300";

              return (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col justify-between space-y-2.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                        {p.auteur}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        {p.dates}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${badgeBg}`}
                      >
                        {p.axeLabel}
                      </span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-300 pt-1">
                      {mask(p.these)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                    <div className="text-[10.5px] italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg leading-snug">
                      {p.citation}
                    </div>
                    <div className="text-[10.5px] text-amber-800 dark:text-amber-300 font-medium pt-0.5">
                      <span className="font-bold text-[9.5px] uppercase tracking-wide opacity-80">
                        Portée clinique :{" "}
                      </span>
                      {p.relevance}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: FONCTIONS LATENTES DU TRAVAIL & MARIENTHAL (MARIE JAHODA) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-50 dark:via-slate-900 to-amber-500/5 border border-amber-500/30">
          <div className="sec font-bold text-amber-800 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-1.5">
            ④ {ANTISECHE_JAHODA.titre}
          </div>
          <p
            className="text-xs text-slate-700 dark:text-slate-300 mb-3"
            dangerouslySetInnerHTML={{ __html: ANTISECHE_JAHODA.intro }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-3">
            {ANTISECHE_JAHODA.fonctions.map((f) => (
              <div
                key={f.num}
                className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {f.num}
                  </span>
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                    {f.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {mask(f.desc)}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-xs text-slate-600 dark:text-slate-400 italic pt-1 border-t border-amber-200/60 dark:border-amber-900/40"
            dangerouslySetInnerHTML={{ __html: ANTISECHE_JAHODA.conclusionMarienthal }}
          />
        </div>

        {/* SECTION 5: STADES DE CARRIERE & CULTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Donald Super */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-2.5">
            <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
              ⑤ {ANTISECHE_SUPER.titre}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ANTISECHE_SUPER.stades.map((st) => (
                <div
                  key={st.nom}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{st.nom}</span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                      {st.age}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                    {mask(st.desc)}
                  </p>
                </div>
              ))}
            </div>
            <p
              className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1"
              dangerouslySetInnerHTML={{ __html: ANTISECHE_SUPER.transitions }}
            />
          </div>

          {/* Geert Hofstede & Louche */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-2.5">
            <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
              ⑥ {ANTISECHE_HOFSTEDE.titre}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ANTISECHE_HOFSTEDE.dims.map((dim) => (
                <div
                  key={dim.sigle}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                    <span className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[9px]">
                      {dim.sigle}
                    </span>
                    <span className="truncate">{dim.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                    {mask(dim.desc)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
              Ces 4 dimensions conditionnent l&apos;acceptation du contrôle, du conflit et de la coopération dans les collectifs réels.
            </p>
          </div>
        </div>

        {/* SECTION 6: HISTOIRE DU 41 RUE GAY-LUSSAC & ARBRE DES CAUSES */}
        <div>
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
            ⑦ Histoire du CNAM (41, rue Gay-Lussac), Enquêtes &amp; Arbre des Causes
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700">
                  <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">Auteur / Date</th>
                  <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">Concept Clé</th>
                  <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">Apport Fondateur pour l&apos;Examen</th>
                </tr>
              </thead>
              <tbody>
                {ANTISECHE_GAY_LUSSAC.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200/60 dark:border-slate-800">
                    <td className="py-2 px-2 font-bold whitespace-nowrap text-amber-800 dark:text-amber-400">
                      {row.auteur}
                    </td>
                    <td className="py-2 px-2 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.concept}
                    </td>
                    <td className="py-2 px-2 text-slate-700 dark:text-slate-300 leading-snug">
                      <span dangerouslySetInnerHTML={{ __html: mask(row.apport) as unknown as string }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 7: L'EMBOÎTEMENT DE LA CLINIQUE DU TRAVAIL (DOMINIQUE LHUILIER) */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
            ⑧ {ANTISECHE_EMBOITEMENT.titre}
          </div>
          <div className="p-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              {ANTISECHE_EMBOITEMENT.niveaux[0].nom}
              <span className="text-[11px] font-normal text-slate-500">({ANTISECHE_EMBOITEMENT.niveaux[0].desc})</span>
            </div>

            <div className="ml-3 sm:ml-5 p-3 rounded-lg border-2 border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                {ANTISECHE_EMBOITEMENT.niveaux[1].nom}
                <span className="text-[11px] font-normal text-amber-700 dark:text-amber-400">({ANTISECHE_EMBOITEMENT.niveaux[1].desc})</span>
              </div>

              <div className="ml-3 sm:ml-5 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-md border border-purple-300 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/40 text-xs">
                  <div className="font-bold text-purple-900 dark:text-purple-300">
                    Psychodynamique du Travail (Dejours)
                  </div>
                  <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-0.5 leading-tight">
                    Souffrance, stratégies de défense collectives, sublimation et reconnaissance (beauté/utilité).
                  </p>
                </div>
                <div className="p-2.5 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40 text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300">
                    Clinique de l&apos;Activité (Clot)
                  </div>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 leading-tight">
                    Pouvoir d&apos;agir, réel de l&apos;activité, activité empêchée, genre/style et controverse de métier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 8: WISNER, CLOT, DEJOURS & BONUS */}
        <div>
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
            ⑨ Synthèse des 3 Piliers Cliniques &amp; Auteurs d&apos;Ouverture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
            {ANTISECHE_AUTEURS.map((auteur) => (
              <AuthorBlock
                key={auteur.title}
                color={auteur.color}
                title={auteur.title}
                lines={auteur.lines}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
            <AuthorBlock
              color={ANTISECHE_DEJOURS.color}
              title={ANTISECHE_DEJOURS.title}
              lines={ANTISECHE_DEJOURS.lines}
            />
            <AuthorBlock
              color="var(--ink)"
              title={ANTISECHE_BONUS.title}
              lines={ANTISECHE_BONUS.lines}
            />
          </div>
        </div>

        {/* SECTION 9: EXEMPLES CLINIQUES */}
        <div>
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
            ⑩ Exemples cliniques concrets à placer le jour J
          </div>
          <table className="w-full text-xs sm:text-sm border-collapse">
            <tbody>
              {ANTISECHE_EXEMPLES.map((row, i) => (
                <tr key={i} className="border-b border-slate-200/70 dark:border-slate-800">
                  <th
                    scope="row"
                    className="py-1.5 pr-3 text-left font-semibold whitespace-nowrap"
                    style={row.color ? { color: row.color } : undefined}
                  >
                    {row.th}
                  </th>
                  <td className="py-1.5 text-slate-700 dark:text-slate-300">{row.td}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION 10: METHODE DE REPONSE */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-1">
            ⑪ Méthode de réponse rédigée (Jour J — ~15 min/question)
          </div>
          <p
            className="mini text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: ANTISECHE_METHODE }}
          />
        </div>
      </div>
    </div>
  );
}
