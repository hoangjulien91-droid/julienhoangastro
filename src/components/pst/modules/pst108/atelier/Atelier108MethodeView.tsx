"use client";

import {
  METHODE_ANALYSE_PST108,
  CRITERES_EVALUATION_PST108,
} from "@/lib/pst/data/pst108-annales";

interface Atelier108MethodeViewProps {
  checkedCriteria: boolean[];
  onToggleCriterion: (i: number) => void;
  doneCriteria: number;
  pctCriteria: number;
}

export function Atelier108MethodeView({
  checkedCriteria,
  onToggleCriterion,
  doneCriteria,
  pctCriteria,
}: Atelier108MethodeViewProps) {
  return (
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
            <b>Objectif :</b> Déployer une confrontation dialectique rigoureuse
            (ex. Austin vs Bourdieu, agir stratégique vs communicationnel,
            employabilité vs IOD). Articuler la critique sociologique et la
            pragmatique du langage.
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
            <b>Objectif :</b> Analyser une interaction réelle (Gérard au SAMU
            social, procès France Télécom, négociation IOD d&apos;offre
            d&apos;emploi). Dévoiler la violence symbolique et formaliser des
            préconisations déontologiques.
          </p>
        </div>
      </div>

      {/* Méthode officielle en 4 étapes */}
      <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>
            📋 Méthodologie officielle d&apos;examen en 4 temps (Éric Lucy &amp;
            Francis Valls)
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
            - <b>Marché linguistique :</b> La parole est un capital symbolique
            procurant un profit de distinction.
            <br />- <b>Status est magistratus :</b> L&apos;efficacité
            performative dérive de l&apos;institution mandataire (rituel du lit
            de justice de Sarah Hanley).
            <br />- <b>L&apos;Insulte (Éric Lucy, 2021) :</b> Violence
            symbolique réactivant des stigmates préconstruits ; hexis de la «
            grande gueule » vs « fine bouche ».
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            2. Jürgen Habermas (Agir communicationnel)
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            - <b>Agir stratégique :</b> Orienté vers le succès (Erfolg),
            manipulation et instrumentalisation d&apos;autrui.
            <br />- <b>Agir communicationnel :</b> Orienté vers l&apos;entente
            (Verständigung) par des raisons argumentées.
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
            - <b>3 Sphères morales :</b> Amour (confiance en soi), Droit (respect
            de soi), Solidarité/Travail (estime de soi).
            <br />- <b>3 Mépris :</b> Atteinte physique, Déni de droits
            statutaires, Humiliation / Invisibilisation du métier.
            <br />- <b>Réification (2007) :</b> « Oubli de la reconnaissance »
            préalable de l&apos;humain comme sujet.
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
            <br />- <b>4 Règles déontologiques :</b> Refus du tri, non-mise en
            concurrence, accès direct au droit commun salarial, médiation
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
                  onChange={() => onToggleCriterion(i)}
                  className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div
                  className={checkedCriteria[i] ? "line-through opacity-60" : ""}
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
  );
}
