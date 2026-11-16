"use client";

import { useMemo } from "react";
import { INDEX, MODULES } from "@/lib/pst/hub-stats";
import { PLANNING_EVENTS } from "@/lib/pst/data/planning";
import { PONTS } from "@/lib/pst/data/ponts";
import { DEFINITIONS_CANONIQUES } from "@/lib/pst/data/definitions-canoniques";
import { MATCHS_AUTEURS } from "@/lib/pst/data/match-auteurs";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { formatFrDate } from "@/lib/pst/planning-stats";
import { PST106_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst106";
import { PST108_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst108";
import { PST123_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst123";
import { ESSENTIEL_COURS_DATA } from "@/lib/pst/data/essentiel-cours";
import { PstStore } from "@/lib/pst/store";

const AUTHORS = [
  {
    name: "Yves Clot",
    mod: "pst106",
    desc: "Clinique de l'activité, réel, genre et style",
  },
  {
    name: "Christophe Dejours",
    mod: "pst120",
    desc: "Psychodynamique du travail, souffrance, reconnaissance",
  },
  {
    name: "Alain Wisner",
    mod: "pst106",
    desc: "Ergonomie, travail prescrit vs réel",
  },
  {
    name: "Claude Dubar",
    mod: "pst123",
    desc: "Double transaction, identité pour soi vs autrui",
  },
  {
    name: "Pierre Bourdieu",
    mod: "pst123",
    desc: "Habitus, capital, champ, double vérité du travail",
  },
  {
    name: "Renaud Sainsaulieu",
    mod: "pst123",
    desc: "Modèles relationnels, l'identité au travail",
  },
  {
    name: "Axel Honneth",
    mod: "pst123",
    desc: "Théorie de la reconnaissance, mépris social",
  },
  {
    name: "Lev Vygotski",
    mod: "pst108",
    desc: "Théorie historico-culturelle, médiation sémiotique",
  },
  {
    name: "Jürgen Habermas",
    mod: "pst108",
    desc: "Agir communicationnel, prétentions à la validité",
  },
  {
    name: "Karl Bühler",
    mod: "pst108",
    desc: "Organon du langage, expression, appel, représentation",
  },
  {
    name: "Suzanne Pacaud",
    mod: "pst106",
    desc: "Sélection psychotechnique et régulation réelle",
  },
  {
    name: "Frederick Herzberg",
    mod: "pst106",
    desc: "Théorie bifactorielle, facteurs d'hygiène et motivation",
  },
  {
    name: "Jacques Leplat",
    mod: "pst106",
    desc: "Activité vs tâche, régulation ergonomique",
  },
  {
    name: "Pascale Molinier",
    mod: "pst120",
    desc: "Idéologies défensives, éthique du care",
  },
  {
    name: "Pierre Rabardel",
    mod: "pst124",
    desc: "Genèse instrumentale, artefact et schèmes",
  },
  {
    name: "Georges Canguilhem",
    mod: "pst120",
    desc: "Le normal et le pathologique, santé normative",
  },
  {
    name: "Thomas Le Bianic",
    mod: "pst123",
    desc: "Identité et autonomisation des psychologues du travail",
  },
];

export function useCommandPaletteSearch(query: string, isOpen: boolean) {
  const trimmed = query.trim().toLowerCase();

  const matchedWorkshops = useMemo(() => {
    if (!trimmed) return MODULES;
    return MODULES.filter(
      (m) =>
        m.id.toLowerCase().includes(trimmed) ||
        m.title.toLowerCase().includes(trimmed) ||
        m.subject.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  const matchedGlossary = useMemo(() => {
    if (!trimmed) return [];
    return INDEX.glossaire
      .filter(
        (g) =>
          g.w.toLowerCase().includes(trimmed) ||
          g.def.toLowerCase().includes(trimmed),
      )
      .slice(0, 10);
  }, [trimmed]);

  const matchedSessions = useMemo(() => {
    if (!trimmed) return [];
    return PLANNING_EVENTS.filter((ev) => {
      const hay = [
        ev.unit,
        ev.date,
        formatFrDate(ev.date),
        ev.day,
        ev.type,
        ev.teacher ?? "",
        ev.room ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 8);
  }, [trimmed]);

  const matchedConcepts = useMemo(() => {
    if (!trimmed) return [];
    return PONTS.filter((p) => {
      const hay = (p.c + " " + Object.values(p.m).join(" ")).toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 6);
  }, [trimmed]);

  const matchedDefinitions = useMemo(() => {
    if (!trimmed) return [];
    return DEFINITIONS_CANONIQUES.filter((d) => {
      const hay = [
        d.terme,
        d.auteur,
        d.modules.join(" "),
        d.definitionOfficielle,
        ...(d.motsClesObligatoires || []),
        d.exemplePratique,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 5);
  }, [trimmed]);

  const matchedDuels = useMemo(() => {
    if (!trimmed) return [];
    return MATCHS_AUTEURS.filter((m) => {
      const hay = [
        m.titre,
        m.auteurA.nom,
        m.auteurB.nom,
        m.auteurA.diagnosticSituation,
        m.auteurB.diagnosticSituation,
        m.situationTravailReel,
        m.syntheseDialectiqueExamen,
        ...(m.motsClesCopies || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 3);
  }, [trimmed]);

  const matchedSchemas = useMemo(() => {
    if (!trimmed) return [];
    return SCHEMAS_MATRICES.filter((s) => {
      const hay = [
        s.titre,
        s.auteur,
        s.formuleCle,
        s.moduleKey,
        s.descriptionPedagogique,
        "schéma schema matrice svg dessin",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 4);
  }, [trimmed]);

  const matchedEssentiels = useMemo(() => {
    if (!trimmed) return [];
    return ESSENTIEL_COURS_DATA.filter((e) => {
      const hay = [
        e.badge,
        e.titre,
        e.filConducteur,
        e.ceQuIlFautSavoir.join(" "),
        e.ceQuIlFautRetenir.join(" "),
        e.auteursCles.map((a) => `${a.nom} ${a.apport}`).join(" "),
        e.conceptsCles.map((c) => `${c.terme} ${c.definitionCourte}`).join(" "),
        e.piegeExamen,
        "essentiel cours fiche resume synthese retenir savoir",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(trimmed);
    }).slice(0, 4);
  }, [trimmed]);

  const matchedResources = useMemo(() => {
    if (!trimmed || trimmed.length < 2) return [];
    const all = [
      ...PST106_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/106#ressources",
        mod: "PST106",
      })),
      ...PST108_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/108#ressources",
        mod: "PST108",
      })),
      ...PST123_OFFICIAL_RESOURCES.map((r) => ({
        ...r,
        uPath: "/pst/123#ressources",
        mod: "PST123",
      })),
    ];
    return all
      .filter((r) => {
        const hay = [
          r.title,
          r.authors,
          r.description,
          r.keyTakeaway,
          r.tags.join(" "),
          r.localFile || "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(trimmed);
      })
      .slice(0, 5);
  }, [trimmed]);

  const matchedAuthors = useMemo(() => {
    if (!trimmed) return AUTHORS.slice(0, 4);
    return AUTHORS.filter(
      (a) =>
        a.name.toLowerCase().includes(trimmed) ||
        a.desc.toLowerCase().includes(trimmed),
    );
  }, [trimmed]);

  const allErrors = useMemo(() => {
    if (!isOpen || typeof window === "undefined") return [];
    const keysMap: Record<string, string> = {
      "106": "pst106_v1",
      "108": "pst108_atelier_v10",
      "120": "pst120_atelier_v10",
      "123": "pst123_atelier_v10",
      "124": "pst124_atelier_v10",
    };
    const items: Array<{
      id: string;
      modNum: string;
      question: string;
      correctAnswer: string;
      type: string;
    }> = [];
    Object.entries(keysMap).forEach(([modNum, key]) => {
      try {
        const store = new PstStore(key);
        const errs = store.getErrors();
        errs.forEach((e) => {
          items.push({
            id: e.id,
            modNum,
            question: e.question,
            correctAnswer: e.correctAnswer,
            type: e.type,
          });
        });
      } catch {
        /* ignore */
      }
    });
    return items;
  }, [isOpen]);

  const matchedErrors = useMemo(() => {
    if (!trimmed) return allErrors.slice(0, 4);
    return allErrors
      .filter(
        (e) =>
          e.question.toLowerCase().includes(trimmed) ||
          e.correctAnswer.toLowerCase().includes(trimmed) ||
          e.type.toLowerCase().includes(trimmed) ||
          `pst${e.modNum}`.includes(trimmed),
      )
      .slice(0, 6);
  }, [allErrors, trimmed]);

  return {
    trimmed,
    matchedWorkshops,
    matchedGlossary,
    matchedSessions,
    matchedConcepts,
    matchedDefinitions,
    matchedDuels,
    matchedSchemas,
    matchedEssentiels,
    matchedResources,
    matchedAuthors,
    matchedErrors,
  };
}
