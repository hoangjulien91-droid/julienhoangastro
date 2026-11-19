import { useMemo } from "react";
import type { FicheItem } from "@/lib/pst/types";
import { FICHES } from "@/lib/pst/data/pst108";
import type { FichesFilter } from "@/components/pst/modules/shared/panels/Fiches";
import { PROF_CONFIGS, type ProfKey } from "./profConfigs";

export function useCoursPst108Data(selectedProf: ProfKey) {
  // Classification automatique et exhaustive des fiches par enseignant
  // avec conservation de l'index d'origine (storageIdx) pour éviter toute collision localStorage.
  const fichesByProf = useMemo(() => {
    const marot: FicheItem[] = [];
    const valls: FicheItem[] = [];
    const lucy: FicheItem[] = [];
    const all: FicheItem[] = [];

    FICHES.forEach((raw, idx) => {
      const f: FicheItem = { ...raw, storageIdx: idx };
      all.push(f);
      const t = f.t.toLowerCase();
      const a = f.a;

      // 1. Mme Véronique MAROT (prioritaire si explicitement taguée Marot, ou corpus Vygotski/Piaget/Golse/Sosie/Cnam)
      if (
        t.includes("v. marot") ||
        t.includes("marot") ||
        a === "vygotski_piaget"
      ) {
        marot.push(f);
      }
      // 2. M. Francis VALLS (IOD, Communication, Ghiglione, Wolton, Kahn, Garfinkel, Dubet, Boltanski, Goffman)
      else if (
        a === "valls_iod" ||
        a === "valls_communication" ||
        t.includes("iod") ||
        t.includes("ghiglione") ||
        t.includes("wolton") ||
        t.includes("kahn") ||
        t.includes("garfinkel") ||
        t.includes("dubet") ||
        t.includes("boltanski") ||
        t.includes("goffman")
      ) {
        valls.push(f);
      }
      // 3. M. Éric LUCY (Bourdieu, Habermas, Honneth, SAMU Social, Insulte, Searle, Vanderveken, Cassin, Austin)
      else if (
        a === "bourdieu" ||
        a === "habermas" ||
        a === "honneth" ||
        t.includes("vanderveken") ||
        t.includes("cassin") ||
        t.includes("austin") ||
        t.includes("lucy") ||
        t.includes("samu") ||
        t.includes("insulte")
      ) {
        lucy.push(f);
      }
      // 4. Socle commun linguistique / Cnam (rattaché au bloc Marot)
      else {
        marot.push(f);
      }
    });

    return { marot, valls, lucy, all };
  }, []);

  // Filtres thématiques contextualisés pour chaque enseignant (avec prédicat exact)
  const filtersForCurrentProf: FichesFilter[] = useMemo(() => {
    const countWith = (list: FicheItem[], pred: (f: FicheItem) => boolean) =>
      list.filter(pred).length;

    if (selectedProf === "marot") {
      const list = fichesByProf.marot;
      const isVygPiaget = (f: FicheItem) => {
        const t = f.t.toLowerCase();
        return (
          t.includes("piaget") ||
          t.includes("vygotski") ||
          t.includes("golse") ||
          t.includes("posture clinique")
        );
      };
      const isClinique = (f: FicheItem) => {
        const t = f.t.toLowerCase();
        return (
          t.includes("sosie") ||
          t.includes("miossec") ||
          t.includes("boutet") ||
          t.includes("télégraphique") ||
          t.includes("novlangue")
        );
      };
      const isPsychosocio = (f: FicheItem) => {
        const t = f.t.toLowerCase();
        return (
          t.includes("psychosociologie") ||
          t.includes("lewin") ||
          t.includes("razran") ||
          t.includes("moscovici") ||
          t.includes("porter")
        );
      };
      return [
        { key: "all", label: `Toutes les fiches (${list.length})` },
        {
          key: "vygotski_piaget",
          label: `Vygotski vs Piaget, Golse & Posture (${countWith(list, isVygPiaget)})`,
          match: isVygPiaget,
        },
        {
          key: "clinique_activite",
          label: `Clinique de l'activité, Sosie & Langage (${countWith(list, isClinique)})`,
          match: isClinique,
        },
        {
          key: "psychosociologie",
          label: `Psychosociologie, Lewin, Moscovici & Porter (${countWith(list, isPsychosocio)})`,
          match: isPsychosocio,
        },
      ];
    }
    if (selectedProf === "valls") {
      const list = fichesByProf.valls;
      const isIod = (f: FicheItem) => f.a === "valls_iod";
      const isContratCom = (f: FicheItem) => {
        const t = f.t.toLowerCase();
        return (
          t.includes("ghiglione") ||
          t.includes("objectif vs enjeu") ||
          t.includes("informer") ||
          t.includes("wolton")
        );
      };
      const isGarfinkelBoltanski = (f: FicheItem) => {
        const t = f.t.toLowerCase();
        return (
          t.includes("garfinkel") ||
          t.includes("dubet") ||
          t.includes("évaluatives") ||
          t.includes("boltanski") ||
          t.includes("goffman")
        );
      };
      return [
        { key: "all", label: `Toutes les fiches (${list.length})` },
        {
          key: "valls_iod",
          label: `Méthode IOD, Wolton & Kahn (${countWith(list, isIod)})`,
          match: isIod,
        },
        {
          key: "contrat_com",
          label: `Contrat de communication Ghiglione & Wolton (${countWith(list, isContratCom)})`,
          match: isContratCom,
        },
        {
          key: "garfinkel_boltanski",
          label: `Garfinkel, Dubet, Boltanski & Goffman (${countWith(list, isGarfinkelBoltanski)})`,
          match: isGarfinkelBoltanski,
        },
      ];
    }
    if (selectedProf === "lucy") {
      const list = fichesByProf.lucy;
      const isBourdieu = (f: FicheItem) => f.a === "bourdieu";
      const isHabermas = (f: FicheItem) => f.a === "habermas";
      const isHonneth = (f: FicheItem) => f.a === "honneth";
      const isPragmatique = (f: FicheItem) => f.a === "linguistique";
      return [
        { key: "all", label: `Toutes les fiches (${list.length})` },
        {
          key: "bourdieu",
          label: `Pierre Bourdieu & Insulte (${countWith(list, isBourdieu)})`,
          match: isBourdieu,
        },
        {
          key: "habermas",
          label: `Jürgen Habermas & Délibération (${countWith(list, isHabermas)})`,
          match: isHabermas,
        },
        {
          key: "honneth",
          label: `Axel Honneth & SAMU Social (${countWith(list, isHonneth)})`,
          match: isHonneth,
        },
        {
          key: "linguistique",
          label: `Pragmatique : Austin, Vanderveken & Cassin (${countWith(list, isPragmatique)})`,
          match: isPragmatique,
        },
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
      { key: "valls_communication", label: "5. Valls : Ghiglione, Garfinkel, Goffman" },
      { key: "valls_iod", label: "6. Valls & Castra : Méthode IOD" },
      {
        key: "linguistique",
        label: "7. Langage & Travail, Pragmatique & Cassin",
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

  return {
    fichesByProf,
    filtersForCurrentProf,
    currentFiches,
    currentProfConfig,
    hintText,
  };
}
