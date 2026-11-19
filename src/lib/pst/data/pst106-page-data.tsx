import type { BonusAuthorCard } from "@/components/pst/modules/shared/panels/Bonus";
import { FICHES } from "@/lib/pst/data/pst106-inline";

export const FICHES_FILTERS = [
  { key: "all", label: `Toutes (${FICHES.length})` },
  {
    key: "cours7",
    label: `✨ Cours 7 · Wuilleumier (18 nov) (${FICHES.filter((f) => f.cours === 7).length})`,
  },
  {
    key: "cours6",
    label: `Cours 6 · Roussan (12 nov) (${FICHES.filter((f) => f.cours === 6).length})`,
  },
  {
    key: "cours5",
    label: `Cours 5 · École russe (5 nov) (${FICHES.filter((f) => f.cours === 5).length})`,
  },
  {
    key: "cours4",
    label: `Cours 4 · Genre & Style (4 nov) (${FICHES.filter((f) => f.cours === 4).length})`,
  },
  {
    key: "cours3",
    label: `Cours 3 · Ergonomie & Cnam (30 oct) (${FICHES.filter((f) => f.cours === 3).length})`,
  },
  {
    key: "cours2",
    label: `Cours 2 · Taylorisme (28 oct) (${FICHES.filter((f) => f.cours === 2).length})`,
  },
  {
    key: "cours1",
    label: `Cours 1 · Fondements (15 oct) (${FICHES.filter((f) => f.cours === 1).length})`,
  },
  { key: "conceptions", label: "1. Conceptions & Fonctions" },
  { key: "wisner", label: "2. Ergonomie & Cnam" },
  { key: "clot", label: "3. Clinique de l'activité" },
  { key: "dejours", label: "4. Psychodynamique" },
  { key: "methode", label: "5. Méthodes d'intervention" },
  { key: "histoire", label: "6. Histoire & Pionniers Cnam" },
];

export const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "conceptions", label: "Conceptions" },
  { key: "wisner", label: "Wisner" },
  { key: "clot", label: "Clot" },
  { key: "dejours", label: "Dejours" },
  { key: "methode", label: "Méthodes" },
  { key: "histoire", label: "Histoire" },
  { key: "commun", label: "Commun" },
];

export const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "histoire", label: "Histoire" },
  { key: "wisner", label: "Wisner (Ergonomie)" },
  { key: "clot", label: "Clot (Clinique)" },
  { key: "dejours", label: "Dejours (Psychodynamique)" },
  { key: "methode", label: "Méthodes d'intervention" },
  { key: "comparer", label: "Comparateur" },
];

export const RECITS_COLORS: Record<string, string> = {
  histoire: "var(--histoire)",
  wisner: "var(--wisner)",
  clot: "var(--clot)",
  dejours: "var(--dejours)",
  comparer: "var(--accent)",
  methode: "var(--methode)",
  commun: "var(--muted)",
};

export const BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Georges Canguilhem — la normativité",
    color: "var(--accent)",
    body: (
      <>
        La santé n&apos;est pas le simple silence des organes, mais la capacité
        active de créer des normes et d&apos;agir sur son milieu.
        <br />
        <i>Où l&apos;utiliser ?</i> Pour étayer le pouvoir d&apos;agir et la
        santé chez Yves Clot.
      </>
    ),
  },
  {
    title: "Karl Marx — le travail comme transformation",
    color: "var(--clot)",
    body: (
      <>
        L&apos;homme se construit en transformant la matière extérieure par le
        biais d&apos;outils (médiation).
        <br />
        <i>Où l&apos;utiliser ?</i> Pour rappeler les fondements philosophiques
        d&apos;Yves Clot et Lev Vygotski.
      </>
    ),
  },
  {
    title: "Michel Foucault — le corps discipliné",
    color: "var(--dejours)",
    body: (
      <>
        Le Taylorisme et la psychotechnique historique comme instruments de
        discipline et d&apos;assujettissement des corps.
        <br />
        <i>Où l&apos;utiliser ?</i> Dans la critique de la psychotechnique
        positiviste.
      </>
    ),
  },
];
