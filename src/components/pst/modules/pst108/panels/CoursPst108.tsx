"use client";

import { useState, useMemo } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { FICHES } from "@/lib/pst/data/pst108";
import {
  Fiches,
  type FichesFilter,
} from "@/components/pst/modules/shared/panels/Fiches";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  Users,
  Building2,
  GraduationCap,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  PROF_CONFIGS,
  type ProfKey,
} from "./cours/profConfigs";
import { TeacherSpotlightCard } from "./cours/TeacherSpotlightCard";

interface CoursPst108Props {
  store: PstStore;
  onStoreChange: () => void;
  onGoTab?: (panel: string) => void;
  onLaunchExam?: (prof: "lucy" | "valls" | "marot") => void;
}

export function CoursPst108({
  store,
  onStoreChange,
  onGoTab,
  onLaunchExam,
}: CoursPst108Props) {
  const [selectedProf, setSelectedProf] = useState<ProfKey>("marot");

  // Classification automatique et exhaustive des fiches par enseignant
  const fichesByProf = useMemo(() => {
    const marot: FicheItem[] = [];
    const valls: FicheItem[] = [];
    const lucy: FicheItem[] = [];

    FICHES.forEach((f) => {
      const t = f.t.toLowerCase();
      const a = f.a;

      if (
        a === "vygotski_piaget" ||
        t.includes("marot") ||
        t.includes("golse") ||
        t.includes("piaget") ||
        t.includes("vygotski") ||
        t.includes("clot") ||
        t.includes("boutet & fraenkel") ||
        t.includes("dispositifs cliniques") ||
        t.includes("psychosociologie de la communication") ||
        t.includes("miossec")
      ) {
        marot.push(f);
      } else if (
        a === "valls_iod" ||
        a === "valls_communication" ||
        t.includes("valls") ||
        t.includes("iod") ||
        t.includes("ghiglione") ||
        t.includes("wolton") ||
        t.includes("kahn") ||
        t.includes("savpjj")
      ) {
        valls.push(f);
      } else {
        lucy.push(f);
      }
    });

    return { marot, valls, lucy, all: FICHES };
  }, []);

  // Filtres personnalisés pour chaque enseignant
  const filtersForCurrentProf = useMemo((): FichesFilter[] => {
    if (selectedProf === "marot") {
      return [
        {
          key: "all",
          label: `Toutes les fiches de Mme Marot (${fichesByProf.marot.length})`,
        },
        { key: "vygotski_piaget", label: "Vygotski, Piaget & Golse (5)" },
        { key: "clinique", label: "Dispositifs d'entretien (Sosie, AC) (2)" },
        {
          key: "psychosociale",
          label: "Psychosociologie, Razran 1950 & Porter (2)",
        },
      ];
    }
    if (selectedProf === "valls") {
      return [
        {
          key: "all",
          label: `Toutes les fiches de M. Valls (${fichesByProf.valls.length})`,
        },
        { key: "valls_iod", label: "Méthode IOD sans tri & Négociation (2)" },
        {
          key: "ghiglione_wolton",
          label: "Contrat Ghiglione & Incommunication Wolton (2)",
        },
        { key: "cas_kahn", label: "Tensions de rôles Kahn & Cas cliniques (1)" },
      ];
    }
    if (selectedProf === "lucy") {
      return [
        {
          key: "all",
          label: `Toutes les fiches de M. Lucy (${fichesByProf.lucy.length})`,
        },
        { key: "bourdieu", label: "Pierre Bourdieu & Pouvoir symbolique (4)" },
        { key: "habermas", label: "Jürgen Habermas & Agir communicationnel (4)" },
        {
          key: "honneth",
          label: "Axel Honneth & Théorie de la reconnaissance (3)",
        },
        { key: "samu_socle", label: "SAMU Social, Insulte & Pragmatique (3)" },
      ];
    }
    return [
      {
        key: "all",
        label: `Toutes les fiches transversales (${FICHES.length})`,
      },
      { key: "vygotski_piaget", label: "1. Vygotski, Piaget, Golse & Marot" },
      { key: "bourdieu", label: "2. Bourdieu & Pouvoir symbolique (Lucy)" },
      { key: "habermas", label: "3. Habermas & Agir communicationnel (Lucy)" },
      { key: "honneth", label: "4. Honneth & SAMU Social (Lucy)" },
      { key: "valls_iod", label: "5. Valls, Ghiglione, Wolton & Méthode IOD" },
      {
        key: "linguistique",
        label: "6. Langage & Travail, Pragmatique & France Télécom",
      },
    ];
  }, [selectedProf, fichesByProf]);

  // Fiches filtrées selon le prof actif
  const currentFiches = useMemo(() => {
    return fichesByProf[selectedProf];
  }, [selectedProf, fichesByProf]);

  const currentProfConfig =
    selectedProf !== "all" ? PROF_CONFIGS[selectedProf] : null;

  const hintText =
    selectedProf === "marot"
      ? `Les ${fichesByProf.marot.length} fiches de cours de Mme Véronique MAROT (Vygotski vs Piaget, Bernard Golse, Sosie, Autoconfrontation, Psychosociologie Abric/Lewin/4 défenses, Moscovici, Razran 1950, Moi intime & Porter) — Sous-épreuve 1h00.`
      : selectedProf === "valls"
        ? `Les ${fichesByProf.valls.length} fiches de cours de M. Francis VALLS (Contrat Ghiglione, Wolton, Kahn 1958, Garfinkel, Dubet, Boltanski, Goffman Scène/Coulisses/Face/Stigmate & Méthode IOD sans tri préalable) — Sous-épreuve 1h00.`
        : selectedProf === "lucy"
          ? `Les ${fichesByProf.lucy.length} fiches de cours de M. Éric LUCY (Pierre Bourdieu, Jürgen Habermas, Axel Honneth, l'insulte en SAMU Social et documents ressources) — Sous-épreuve 1h00.`
          : `Les ${FICHES.length} fiches complètes du cours PST108 réparties entre les 3 enseignants (3 × 1h00 = 3h00 à l'examen).`;

  return (
    <div className="space-y-6">
      {/* ── BANNIÈRE D'ENTÊTE GÉNÉRALE ─────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-indigo-500/10 via-rose-500/5 to-emerald-500/5 border border-indigo-500/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="size-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="size-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                PST108 · Cours Magistraux &amp; Fiches d&apos;Excellence
              </span>
              <h2 className="text-base sm:text-xl font-serif font-black text-slate-900 dark:text-white m-0">
                Le Cours des 3 Enseignants du Cnam
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              ✦ {FICHES.length} Fiches au total
            </span>
            {onGoTab && (
              <>
                <button
                  type="button"
                  onClick={() => onGoTab("seances")}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="size-3.5 text-amber-600 dark:text-amber-400" />
                  <span>3 Séances Intégrales</span>
                </button>
                <button
                  type="button"
                  onClick={() => onGoTab("ad")}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Activités Distantes (AD)</span>
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
          L&apos;enseignement de PST108 est assuré par{" "}
          <b>trois professeurs distincts</b> et validé par un{" "}
          <b>
            examen final de 3h00 divisé en 3 petits examens de 1h00 chacun
          </b>{" "}
          (1h00 M. Lucy · 1h00 M. Valls · 1h00 Mme Marot). Choisissez un
          enseignant pour réviser ses cours et lancer sa sous-épreuve dédiée.
        </p>

        {/* ── SÉLECTEUR INTERACTIF DES 3 PROFESSEURS ───────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
          {/* Mme Véronique MAROT */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedProf("marot");
            }}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer border ${
              selectedProf === "marot"
                ? "bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border-rose-500/50 shadow-sm font-black"
                : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <Users className="size-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <div className="min-w-0">
              <div className="truncate">Mme MAROT ✦</div>
              <div className="text-[10px] font-normal opacity-80 truncate">
                {fichesByProf.marot.length} fiches · Langage &amp; Sosie
              </div>
            </div>
          </button>

          {/* M. Francis VALLS */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedProf("valls");
            }}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer border ${
              selectedProf === "valls"
                ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border-emerald-500/50 shadow-sm font-black"
                : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <Building2 className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="min-w-0">
              <div className="truncate">M. VALLS ✦</div>
              <div className="text-[10px] font-normal opacity-80 truncate">
                {fichesByProf.valls.length} fiches · IOD &amp; Ghiglione
              </div>
            </div>
          </button>

          {/* M. Éric LUCY */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedProf("lucy");
            }}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer border ${
              selectedProf === "lucy"
                ? "bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-indigo-500/50 shadow-sm font-black"
                : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <GraduationCap className="size-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
            <div className="min-w-0">
              <div className="truncate">M. LUCY ✦</div>
              <div className="text-[10px] font-normal opacity-80 truncate">
                {fichesByProf.lucy.length} fiches · Bourdieu &amp; Habermas
              </div>
            </div>
          </button>

          {/* TOUT LE CORPUS PST108 */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedProf("all");
            }}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer border ${
              selectedProf === "all"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-500/50 shadow-sm font-black"
                : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <Layers className="size-5 shrink-0 text-amber-500" />
            <div className="min-w-0">
              <div className="truncate">Toutes les fiches</div>
              <div className="text-[10px] font-normal opacity-80 truncate">
                {FICHES.length} fiches transversales
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── CARTE SPOTLIGHT DE L'ENSEIGNANT SÉLECTIONNÉ ───────────────────── */}
      {currentProfConfig && (
        <TeacherSpotlightCard
          config={currentProfConfig}
          fichesCount={currentFiches.length}
          onLaunchExam={onLaunchExam}
          onGoTab={onGoTab}
        />
      )}

      {/* ── CORPUS DES FICHES DU PROFESSEUR (MOTEUR FICHES RÉUTILISABLE) ─── */}
      <div className="pt-2">
        <Fiches
          store={store}
          onStoreChange={onStoreChange}
          data={currentFiches}
          filters={filtersForCurrentProf}
          hint={hintText}
        />
      </div>
    </div>
  );
}
