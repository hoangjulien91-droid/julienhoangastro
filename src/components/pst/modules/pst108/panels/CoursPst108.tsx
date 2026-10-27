"use client";

import { useState, useMemo } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { FICHES, type A } from "@/lib/pst/data/pst108";
import { Fiches, type FichesFilter } from "@/components/pst/modules/shared/panels/Fiches";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  Users,
  Building2,
  GraduationCap,
  Layers,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface CoursPst108Props {
  store: PstStore;
  onStoreChange: () => void;
  onGoTab?: (panel: string) => void;
}

type ProfKey = "marot" | "valls" | "lucy" | "all";

interface ProfConfig {
  key: ProfKey;
  nom: string;
  titreCourt: string;
  role: string;
  volumeHoraire: string;
  themeGeneral: string;
  moodleUrl: string;
  moodleSection: string;
  filConducteur: string;
  notionsCles: string[];
  colorBorder: string;
  colorBg: string;
  colorText: string;
  icon: typeof Users;
}

const PROF_CONFIGS: Record<"marot" | "valls" | "lucy", ProfConfig> = {
  marot: {
    key: "marot",
    nom: "Mme Véronique MAROT",
    titreCourt: "Sciences du langage & Clinique",
    role: "Enseignante-chercheuse, spécialiste du langage et du développement",
    volumeHoraire: "Volume officiel : 17 Heures (Webconférences & AD 04/11 & 10/11)",
    themeGeneral: "Sciences du langage, Théories de l'acquisition (Vygotski vs Piaget), Dialogisme (Bakhtine) & Dispositifs cliniques (Sosie, Autoconfrontation)",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68135",
    moodleSection: "Section Moodle 68135",
    filConducteur:
      "Le langage est d'emblée social et constitue un instrument psychologique d'action. De l'inversion vygotskienne (l'apprentissage tire le développement) et des racines psychanalytiques (Golse & Freud) aux dispositifs cliniques de terrain (Oddone, Cahour, Clot) et à l'approche psychosociale (Lewin, défenses de la mémoire, Razran 1950, Porter).",
    notionsCles: [
      "Vygotski vs Piaget (ZPD & Primat du social)",
      "Freud (Jeu de la bobine / Fort-Da) & Golse",
      "Dispositifs : Sosie, Autoconfrontation simple & croisée",
      "Bakhtine (Destinataire, Sub-destinataire, Sur-destinataire)",
      "Psychosociologie : Lewin, Scotomisation & Razran (1950)",
      "Grille de Porter (Écoute compréhensive) & Proxémique en angle",
      "Yvon Miossec (2019) : Le travail sur le travail & controverse réglée",
    ],
    colorBorder: "border-rose-500/30",
    colorBg: "bg-rose-500/10",
    colorText: "text-rose-700 dark:text-rose-400",
    icon: Users,
  },
  valls: {
    key: "valls",
    nom: "M. Francis VALLS",
    titreCourt: "Psychosociale & Méthode IOD",
    role: "Maître de conférences, praticien de l'insertion et concepteur de la méthode IOD avec Denis Castra",
    volumeHoraire: "Volume officiel : Cours magistraux, TD & Exercices distanciel",
    themeGeneral: "Approche psychosociale de la communication, Contrat de communication (Ghiglione), Dominique Wolton & Méthode IOD sans tri préalable",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68130",
    moodleSection: "Section Moodle 68130",
    filConducteur:
      "La communication au travail est régie par un contrat psychosocial tacite (Ghiglione). Le récepteur n'est jamais passif : il négocie et produit de l'incommunication (Wolton). Dans le champ de l'emploi, rupture avec la sélection par l'employabilité au profit de la négociation directe sur les contraintes du poste réel (Méthode IOD).",
    notionsCles: [
      "Contrat de communication (Rodolphe Ghiglione 1986)",
      "Dominique Wolton (Incommunication, Récepteur actif & Négociation)",
      "Shannon & Weaver vs Norbert Wiener (Cybernétique & Rétroaction)",
      "Robert L. Kahn (1958) : Tensions de rôles & Rôle transmis vs perçu",
      "4 Cas cliniques : Berlinguer, Dallas 1984 911 Garfinkel, CMS Mme U, Fûts bosselés",
      "Méthode IOD (Denis Castra & Francis Valls) : Insertion sans tri préalable",
      "Évaluation des pratiques en travail social (SAVPJJ)",
    ],
    colorBorder: "border-emerald-500/30",
    colorBg: "bg-emerald-500/10",
    colorText: "text-emerald-700 dark:text-emerald-400",
    icon: Building2,
  },
  lucy: {
    key: "lucy",
    nom: "M. Éric LUCY",
    titreCourt: "Théorie critique & Délibération",
    role: "Sociologue et linguiste de terrain, spécialiste de la pragmatique et de l'exclusion",
    volumeHoraire: "Volume officiel : CM & Séminaires de recherche clinique",
    themeGeneral: "Pouvoir symbolique (Bourdieu), Agir communicationnel (Habermas), Théorie de la reconnaissance (Honneth) & Enquête SAMU Social",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68124",
    moodleSection: "Section Moodle 68124 (26 documents ressources)",
    filConducteur:
      "La parole n'est pas magique : son efficacité performative dépend exclusivement du pouvoir délégué par l'institution (Bourdieu contre Austin). Pour déjouer l'agir stratégique et le mépris, l'organisation doit instaurer l'éthique de la discussion (Habermas) et garantir la reconnaissance mutuelle dans ses trois sphères morales (Honneth).",
    notionsCles: [
      "Séance 2 (Lucy) : Les 5 Actes de langage de Searle (Assertif, Directif, Promissif, Expressif, Déclaratif)",
      "Performatif & Conditions de félicité (Austin 1962, Cassin 2018, Status est magistratus)",
      "Sémiotique du signe : Stoïciens (Lekton), Port-Royal (Prédicats) & Saussure (Axe syntagmatique vs paradigmatique)",
      "Neuropsychologie & Clinique du travail : Aphasies Broca/Wernicke vs souffrance au travail & Ritournelle (Deleuze)",
      "Pierre Bourdieu : Marché linguistique, Capital symbolique & Lit de justice",
      "Critique d'Austin : Les conditions sociales de la performativité",
      "Jürgen Habermas : Agir communicationnel vs Agir stratégique (4 prétentions à la validité)",
      "Axel Honneth : 3 sphères de reconnaissance (Affective, Juridique, Sociale) & Mépris au travail",
      "Éric Lucy : L'insulte performative (2021) & Enquête clinique en SAMU Social (2020)",
      "Masterclass Bruegel (1563) : La Tour de Babel et le risque permanent de la mésentente",
    ],
    colorBorder: "border-indigo-500/30",
    colorBg: "bg-indigo-500/10",
    colorText: "text-indigo-700 dark:text-indigo-400",
    icon: GraduationCap,
  },
};

export function CoursPst108({ store, onStoreChange, onGoTab }: CoursPst108Props) {
  const [selectedProf, setSelectedProf] = useState<ProfKey>("marot");

  // Classification automatique et exhaustive des 28 fiches par enseignant
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
        { key: "all", label: `Toutes les fiches de Mme Marot (${fichesByProf.marot.length})` },
        { key: "vygotski_piaget", label: "Vygotski, Piaget & Golse (5)" },
        { key: "clinique", label: "Dispositifs d'entretien (Sosie, AC) (2)" },
        { key: "psychosociale", label: "Psychosociologie, Razran 1950 & Porter (2)" },
      ];
    }
    if (selectedProf === "valls") {
      return [
        { key: "all", label: `Toutes les fiches de M. Valls (${fichesByProf.valls.length})` },
        { key: "valls_iod", label: "Méthode IOD sans tri & Négociation (2)" },
        { key: "ghiglione_wolton", label: "Contrat Ghiglione & Incommunication Wolton (2)" },
        { key: "cas_kahn", label: "Tensions de rôles Kahn & Cas cliniques (1)" },
      ];
    }
    if (selectedProf === "lucy") {
      return [
        { key: "all", label: `Toutes les fiches de M. Lucy (${fichesByProf.lucy.length})` },
        { key: "bourdieu", label: "Pierre Bourdieu & Pouvoir symbolique (4)" },
        { key: "habermas", label: "Jürgen Habermas & Agir communicationnel (4)" },
        { key: "honneth", label: "Axel Honneth & Théorie de la reconnaissance (3)" },
        { key: "samu_socle", label: "SAMU Social, Insulte & Pragmatique (3)" },
      ];
    }
    return [
      { key: "all", label: `Toutes les fiches transversales (${FICHES.length})` },
      { key: "vygotski_piaget", label: "1. Vygotski, Piaget, Golse & Marot" },
      { key: "bourdieu", label: "2. Bourdieu & Pouvoir symbolique (Lucy)" },
      { key: "habermas", label: "3. Habermas & Agir communicationnel (Lucy)" },
      { key: "honneth", label: "4. Honneth & SAMU Social (Lucy)" },
      { key: "valls_iod", label: "5. Valls, Ghiglione, Wolton & Méthode IOD" },
      { key: "linguistique", label: "6. Langage & Travail, Pragmatique & France Télécom" },
    ];
  }, [selectedProf, fichesByProf]);

  // Fiches filtrées selon le prof actif
  const currentFiches = useMemo(() => {
    return fichesByProf[selectedProf];
  }, [selectedProf, fichesByProf]);

  const currentProfConfig = selectedProf !== "all" ? PROF_CONFIGS[selectedProf] : null;

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

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              ✦ 28 Fiches au total
            </span>
            {onGoTab && (
              <button
                type="button"
                onClick={() => onGoTab("ad")}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
                <span>Voir les Activités Distantes (AD)</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
          L&apos;enseignement de PST108 est assuré par <b>trois professeurs distincts</b>, chacun développant un paradigme théorique et des attendus d&apos;examen spécifiques. Choisissez un enseignant pour afficher ses fiches dédiées ou explorez la vue transversale.
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
                {fichesByProf.valls.length} fiches · Psychosociale &amp; IOD
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

          {/* Vue transversale */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedProf("all");
            }}
            className={`flex items-center gap-2.5 p-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer border ${
              selectedProf === "all"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 dark:border-slate-600 shadow-sm font-black"
                : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800"
            }`}
          >
            <Layers className="size-5 shrink-0 text-slate-600 dark:text-slate-300" />
            <div className="min-w-0">
              <div className="truncate">Vue Transversale</div>
              <div className="text-[10px] font-normal opacity-80 truncate">
                {FICHES.length} fiches complètes
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── HERO BANNER DU PROFESSEUR ACTIF ─────────────────────────────────── */}
      {currentProfConfig && (
        <div
          className={`p-5 rounded-2xl border ${currentProfConfig.colorBorder} ${currentProfConfig.colorBg} shadow-xs space-y-3.5`}
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs border border-slate-200 dark:border-slate-800">
                <currentProfConfig.icon className={`size-5 ${currentProfConfig.colorText}`} />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                    {currentProfConfig.nom}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {currentProfConfig.moodleSection}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {currentProfConfig.role} · <span className="font-semibold">{currentProfConfig.volumeHoraire}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentProfConfig.moodleUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-300/70 dark:border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-1 shadow-2xs"
              >
                <span>Accès Moodle officiel</span>
                <ExternalLink className="size-3 text-indigo-500" />
              </a>
              {onGoTab && (
                <button
                  type="button"
                  onClick={() => onGoTab("ad")}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span>Travaux AD de ce prof</span>
                  <ArrowRight className="size-3" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
              <Compass className="size-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Fil conducteur de l&apos;enseignant pour l&apos;examen :</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
              {currentProfConfig.filConducteur}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Notions &amp; Dispositifs clés de cet enseignant :
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentProfConfig.notionsCles.map((notion, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  ✦ {notion}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── COMPOSANT FICHES INTÉGRÉ ───────────────────────────────────────── */}
      <Fiches
        store={store}
        onStoreChange={onStoreChange}
        data={currentFiches}
        filters={filtersForCurrentProf}
        hint={
          selectedProf === "marot"
            ? "Les 9 fiches de cours de Mme Véronique MAROT (Sciences du langage, Vygotski vs Piaget, Bernard Golse & Freud, Clinique du dialogue, Sosie, Autoconfrontation, Psychosociologie Lewin/Razran 1950 & Miossec 2019)."
            : selectedProf === "valls"
            ? "Les 5 fiches de cours de M. Francis VALLS (Approche psychosociale, Contrat de communication de Ghiglione, Dominique Wolton, Robert L. Kahn 1958, les 4 cas cliniques et la Méthode IOD sans tri préalable)."
            : selectedProf === "lucy"
            ? "Les 14 fiches de cours de M. Éric LUCY (Pierre Bourdieu, Jürgen Habermas, Axel Honneth, l'insulte en SAMU Social et les 26 documents ressources)."
            : "Les 28 fiches complètes du cours PST108 pour réviser l'ensemble du programme de manière transversale."
        }
      />
    </div>
  );
}
