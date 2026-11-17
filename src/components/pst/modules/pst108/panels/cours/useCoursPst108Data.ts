import { useMemo } from "react";
import type { FicheItem } from "@/lib/pst/types";
import { FICHES } from "@/lib/pst/data/pst108";
import type { FichesFilter } from "@/components/pst/modules/shared/panels/Fiches";
import { PROF_CONFIGS, type ProfKey } from "./profConfigs";

export function useCoursPst108Data(selectedProf: ProfKey) {
  // Classification automatique et exhaustive des fiches par enseignant
  const fichesByProf = useMemo(() => {
    const marot: FicheItem[] = [];
    const valls: FicheItem[] = [];
    const lucy: FicheItem[] = [];

    FICHES.forEach((f) => {
      const t = f.t.toLowerCase();
      const a = f.a;

      // 1. M. Francis VALLS (IOD, Contrat de communication, Garfinkel, Wolton, Kahn, Boltanski, Goffman scène/stigmate)
      if (
        t.includes("iod") ||
        t.includes("ghiglione") ||
        t.includes("contrat de communication") ||
        t.includes("garfinkel") ||
        t.includes("wolton") ||
        t.includes("kahn") ||
        t.includes("boltanski") ||
        t.includes("thévenot") ||
        t.includes("justification") ||
        t.includes("stigmate") ||
        t.includes("goffman") ||
        t.includes("façade") ||
        t.includes("coulisses") ||
        t.includes("territoires du moi") ||
        a.includes("Francis VALLS") ||
        a.includes("Valls") ||
        a.includes("Ghiglione") ||
        a.includes("Wolton") ||
        a.includes("Garfinkel") ||
        a.includes("Boltanski") ||
        a.includes("Goffman")
      ) {
        valls.push(f);
      }
      // 2. M. Éric LUCY (Bourdieu, Habermas, Honneth, SAMU Social, Insulte)
      else if (
        t.includes("bourdieu") ||
        t.includes("habitus") ||
        t.includes("capital") ||
        t.includes("violence symbolique") ||
        t.includes("habermas") ||
        t.includes("agir communicationnel") ||
        t.includes("honneth") ||
        t.includes("reconnaissance") ||
        t.includes("samu") ||
        t.includes("insulte") ||
        t.includes("pragmatique") ||
        a.includes("Éric LUCY") ||
        a.includes("Lucy") ||
        a.includes("Bourdieu") ||
        a.includes("Habermas") ||
        a.includes("Honneth")
      ) {
        lucy.push(f);
      }
      // 3. Mme Véronique MAROT (Vygotski, Piaget, Golse, Sosie, Autoconfrontation, Psychosociologie, Moscovici, Razran)
      else {
        marot.push(f);
      }
    });

    return { marot, valls, lucy, all: FICHES };
  }, []);

  // Filtres thématiques contextualisés pour chaque enseignant
  const filtersForCurrentProf: FichesFilter[] = useMemo(() => {
    if (selectedProf === "marot") {
      return [
        { key: "all", label: `Toutes les fiches (${fichesByProf.marot.length})` },
        {
          key: "vygotski_piaget",
          label: "Vygotski vs Piaget, Langage égocentrique & Golse (4)",
        },
        {
          key: "clinique_activite",
          label: "Clinique de l'activité, Sosie & Dialogisme (4)",
        },
        {
          key: "psychosociologie",
          label: "Psychosociologie, Lewin, Moscovici & Razran 1950 (5)",
        },
        { key: "moi_intime", label: "Moi intime, Porter & EPI en atelier (3)" },
      ];
    }
    if (selectedProf === "valls") {
      return [
        { key: "all", label: `Toutes les fiches (${fichesByProf.valls.length})` },
        { key: "valls_iod", label: "Méthode IOD & Insertion directe (5)" },
        {
          key: "contrat_com",
          label: "Contrat de communication Ghiglione & Wolton (4)",
        },
        {
          key: "garfinkel_boltanski",
          label: "Ethnométhodologie Garfinkel & Cités Boltanski (4)",
        },
        { key: "goffman", label: "Goffman, Façade, Coulisses & Stigmate (4)" },
      ];
    }
    if (selectedProf === "lucy") {
      return [
        { key: "all", label: `Toutes les fiches (${fichesByProf.lucy.length})` },
        { key: "bourdieu", label: "Pierre Bourdieu & Capitaux symboliques (4)" },
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

  return {
    fichesByProf,
    filtersForCurrentProf,
    currentFiches,
    currentProfConfig,
    hintText,
  };
}
