# Normes & Règles Fondamentales du Projet (Gravées dans le Marbre)

Ce document régit les standards obligatoires de développement et d'intégration pédagogique pour la plateforme **PST (Psychologie du Travail — Titre RNCP Cnam)**.

---

## 1. Règle d'or n°1 : La « Fiche L'Essentiel » est Obligatoire pour Tout Nouveau Cours

> [!IMPORTANT]
> **Norme absolue** : Tout nouveau cours ou séance intégré dans la plateforme (`PST106`, `PST108`, `PST120`, `PST123`, `PST124`) **DOIT impérativement** s'accompagner de sa **Fiche L'Essentiel du Cours** dans [`src/lib/pst/data/essentiel-cours.ts`](file:///Users/ikerketa/web/julienhoangastro-1/src/lib/pst/data/essentiel-cours.ts).
>
> **Aucun cours ne peut être ajouté sans son encart synthétique.**

### Structure obligatoire d'une Fiche L'Essentiel (`EssentielCoursCard`) :
Pour chaque nouvelle entrée dans `ESSENTIEL_COURS_DATA` :
```typescript
{
  id: "${moduleKey}-s${numeroSeance}",      // ex: "pst106-s4"
  unitId: "${moduleKey}",                   // ex: "pst106"
  seanceId: "${moduleKey}-s${numeroSeance}",// ex: "pst106-s4"
  coursNum: ${numeroSeance},                // ex: 4
  badge: "PST... · Cours X (Date)",
  titre: "Titre de la séance",
  filConducteur: "Thèse centrale / fil conducteur du cours en 1 phrase claire",
  ceQuIlFautSavoir: [
    // 4 points clés expliquant le fond du cours et ses déplacements théoriques
  ],
  ceQuIlFautRetenir: [
    // 4 points formulés pour la copie d'examen (punchlines, formules clés, repères Cnam)
  ],
  auteursCles: [
    // Liste d'auteurs incontournables mobilisés avec leur apport exact
    { nom: "Nom Auteur", apport: "Apport et concept fondateur" }
  ],
  conceptsCles: [
    // 4 à 6 notions indispensables définies de façon concise
    { terme: "Concept", definitionCourte: "Définition courte et opératoire" }
  ],
  piegeExamen: "Le contre-sens ou piège d'examen classique sanctionné par l'enseignant"
}
```

### Couplage automatique avec l'interface :
Une fois ajoutée dans `essentiel-cours.ts`, la fiche est automatiquement active dans :
1. **L'accueil de l'UE ([`Dashboard.tsx`](file:///Users/ikerketa/web/julienhoangastro-1/src/components/pst/modules/shared/panels/Dashboard.tsx))** : apparaît dans le sélecteur `Cours X`.
2. **La séance de cours ([`SeancesCoursPanel.tsx`](file:///Users/ikerketa/web/julienhoangastro-1/src/components/pst/modules/shared/panels/SeancesCoursPanel.tsx))** : remplace le callout brut par l'encart Bento avec toggle `L'Essentiel` / `Détail`.
3. **L'en-tête de module ([`ModuleIntro.tsx`](file:///Users/ikerketa/web/julienhoangastro-1/src/components/pst/shell/ModuleIntro.tsx))** : accessible via le bouton haut `✨ L'Essentiel du Cours`.
4. **L'onglet Fiches ([`Fiches.tsx`](file:///Users/ikerketa/web/julienhoangastro-1/src/components/pst/modules/shared/panels/Fiches.tsx))** : contextualisé selon le filtre de cours sélectionné.
5. **La palette de recherche globale ([`PstCommandPalette.tsx`](file:///Users/ikerketa/web/julienhoangastro-1/src/components/pst/shell/PstCommandPalette.tsx))** : searchable instantanément via <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>.

---

## 2. Règle d'or n°2 : Architecture des Cours en 4 Couches & Interdiction des Verbatims Bruts Fleuves

> [!IMPORTANT]
> **Norme absolue de traitement des retranscriptions** : Lorsque l'utilisateur fournit dans le chat une retranscription brute de cours (audio-to-text de 2h à 3h30), celle-ci sert **exclusivement de matière première d'extraction**.
>
> **Il est formellement interdit d'injecter un pavé brut de 3 heures de speech-to-text dans le code source (`seances-cours.ts`).** Tout cours doit être distillé selon l'architecture académique à **4 couches** :

1. **Couche 1 — Fiche « L'Essentiel du Cours » ([`essentiel-cours.ts`](file:///Users/ikerketa/web/julienhoangastro-1/src/lib/pst/data/essentiel-cours.ts))** :
   - Fil conducteur, 4 points *Ce qu'il faut savoir*, 4 points *Ce qu'il faut retenir*, auteurs clés, concepts clés et piège d'examen.
2. **Couche 2 — Synthèse Académique Structurée ([`seances-cours.ts`](file:///Users/ikerketa/web/julienhoangastro-1/src/lib/pst/data/seances-cours.ts))** :
   - `resumeExecutif` (6 à 7 points de synthèse panoramique),
   - `syntheseSections` (plan détaillé du cours avec auteurs et concepts par sous-partie),
   - `tableauxComparatifs` (confrontation visuelle des modèles théoriques),
   - `rectificationsExamen` (erreurs courantes de copie vs rectifications attendues au Cnam).
3. **Couche 3 — « Verbatims d'Or & Citations du Prof » (`transcriptionIntegraleVerbatim` dans [`seances-cours.ts`](file:///Users/ikerketa/web/julienhoangastro-1/src/lib/pst/data/seances-cours.ts))** :
   - Découpé en 4 à 6 chapitres thématiques `[1. Titre du thème]`.
   - Contient **uniquement les 8 à 12 punchlines exactes, cas cliniques vécus et avertissements méthodologiques de l'enseignant** au format horodaté `[HH:MM:SS] NOM DU PROF : « ... »`.
   - Zéro bruit oral (pas d'appels nominaux, réglages micro/caméra, hésitations ni répétitions).
4. **Couche 4 — Consignes & Travaux à Préparer (`consignesOralesProf` dans [`seances-cours.ts`](file:///Users/ikerketa/web/julienhoangastro-1/src/lib/pst/data/seances-cours.ts))** :
   - Extraction exhaustive des Activités Distantes (AD), lectures obligatoires, échéances Moodle et modalités d'examen.

---

## 3. Philosophie UX & Performance : « Zéro Lourdeur »

1. **Aucun bloatware ni dépendance superflue** : Les fonctionnalités s'appuient sur l'existant (React, Tailwind CSS, Lucide icons, Web Audio API, Service Worker natif).
2. **Pas d'I/O bloquant synchrone** :
   - Éviter `localStorage.getItem` dans les boucles de rendu ou les gestionnaires de clic rapides (utiliser un cache mémoire comme dans `audio-feedback.ts`).
   - Débouncer la saisie utilisateur avec sauvegarde (`FeynmanSandbox.tsx`).
3. **Confort Mobile d'abord** :
   - Le planning mobile (`< 768px`) filtre par défaut uniquement sur `COURS` et `WEBCONF` (sans écraser les filtres desktop).
   - Les interactions tactiles supportent le balayage swipe et l'appui long (450 ms) pour les actions clés (ex: favoris flashcards).
4. **Accessibilité clavier Pro** :
   - Raccourcis <kbd>J</kbd> / <kbd>K</kbd> pour la navigation séquentielle (fiches, cours, flashcards).
   - Raccourci <kbd>F</kbd> pour les favoris.

---

## 4. Checklist de Validation Obligatoire Avant Tout Commit

Avant de finaliser ou pusher toute modification :
```bash
npm run type-check   # tsc --noEmit : doit afficher 0 erreur
npm run lint         # eslint : doit afficher 0 avertissement
npm run build        # astro build : 100% de réussite
```
