"use client";

import {
  BarChart3,
  ListFilter,
  Calendar,
  Printer,
  Search,
  HelpCircle,
  Car,
  GraduationCap,
  Laptop,
  Layers,
  Building2,
  Video,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./planning.css";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  computeGlobalPlanningTotals,
  computePresenceDaysRemaining,
  computeVisioDaysRemaining,
  isoWeekKey,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
import { PlanningGrid } from "./PlanningGrid";
import { PlanningList } from "./PlanningList";

// v2 : Visio décochée par défaut (cf. defaultFilters) — bump pour que ce
// nouveau défaut s'applique même aux navigateurs qui avaient déjà persisté
// l'ancien filtre (Visio cochée) sous v1.
const FILTERS_KEY = "pst_planning_filters_v2";
const VIEW_KEY = "pst_planning_view_v1";

type TypePresetMode = "presentiel" | "visio" | "examens" | "all" | "custom";

function getTypePreset(types: Set<PlanningEventType>): TypePresetMode {
  const hasCours = types.has("COURS");
  const hasExamen = types.has("EXAMEN");
  const hasVisio = types.has("WEBCONF");

  if (hasCours && hasExamen && hasVisio) return "all";
  if (hasCours && hasExamen && !hasVisio) return "presentiel";
  if (!hasCours && !hasExamen && hasVisio) return "visio";
  if (!hasCours && hasExamen && !hasVisio) return "examens";
  return "custom";
}

interface StoredFilters {
  units: PlanningUnitId[];
  types: PlanningEventType[];
  sessions: (1 | 2)[];
}

function defaultFilters(): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    // Visio décochée par défaut — seuls Cours et Examens s'affichent
    // au premier chargement.
    types: new Set<PlanningEventType>(["COURS", "EXAMEN"]),
    sessions: new Set([1, 2]),
  };
}

function loadFilters(): PlanningFilters {
  try {
    const raw = window.localStorage.getItem(FILTERS_KEY);
    if (!raw) return defaultFilters();
    const parsed = JSON.parse(raw) as StoredFilters;
    return {
      units: new Set(parsed.units),
      types: new Set(parsed.types),
      sessions: new Set(parsed.sessions),
    };
  } catch {
    return defaultFilters();
  }
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function PlanningContent() {
  const [filters, setFilters] = useState<PlanningFilters>(defaultFilters);
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [todayWeekKey, setTodayWeekKey] = useState<string | null>(null);
  const [todayIso, setTodayIso] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Charge les préférences persistées côté client uniquement (évite un
  // mismatch d'hydratation SSR/localStorage, même pattern que PstThemeProvider).
  useEffect(() => {
    setFilters(loadFilters());
    const storedView = window.localStorage.getItem(VIEW_KEY);
    if (storedView === "grid" || storedView === "list") {
      setActiveView(storedView);
    }
    const iso = new Date().toISOString().slice(0, 10);
    setTodayIso(iso);
    setTodayWeekKey(isoWeekKey(iso));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const stored: StoredFilters = {
        units: Array.from(filters.units),
        types: Array.from(filters.types),
        sessions: Array.from(filters.sessions),
      };
      window.localStorage.setItem(FILTERS_KEY, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [filters, hydrated]);

  function setView(v: "grid" | "list") {
    setActiveView(v);
    try {
      window.localStorage.setItem(VIEW_KEY, v);
    } catch {
      // ignore
    }
  }

  function toggleUnit(u: PlanningUnitId) {
    setFilters((f) => ({ ...f, units: toggleInSet(f.units, u) }));
  }
  function toggleType(t: PlanningEventType) {
    setFilters((f) => ({ ...f, types: toggleInSet(f.types, t) }));
  }
  function toggleSession(s: 1 | 2) {
    setFilters((f) => ({ ...f, sessions: toggleInSet(f.sessions, s) }));
  }

  function applyTypePreset(preset: TypePresetMode) {
    let nextTypes: Set<PlanningEventType>;
    if (preset === "presentiel") {
      nextTypes = new Set(["COURS", "EXAMEN"]);
    } else if (preset === "visio") {
      nextTypes = new Set(["WEBCONF"]);
    } else if (preset === "examens") {
      nextTypes = new Set(["EXAMEN"]);
    } else if (preset === "all") {
      nextTypes = new Set(["COURS", "EXAMEN", "WEBCONF"]);
    } else {
      return;
    }
    setFilters((f) => ({ ...f, types: nextTypes }));
  }

  const activePreset = getTypePreset(filters.types);
  const totals = computeGlobalPlanningTotals();
  const presenceRemaining = computePresenceDaysRemaining();
  const visioRemaining = computeVisioDaysRemaining();
  const activeFilterCount =
    filters.units.size + filters.types.size + filters.sessions.size;
  const totalFilterCount = UNIT_ORDER.length + 3 + 2;

  return (
    <div className="planning-wrap">
      <ModulesNav active="planning" />
      <div className="header">
        <div className="eyebrow">
          CNAM Nouvelle-Aquitaine · Année universitaire 2026–2027 · Provisoire
        </div>
        <div className="header-row">
          <div>
            <h1>
              Frise du planning
              <br />
              Titre RNCP 7 – Psychologue du travail
            </h1>
            <div className="subtitle">
              5 UE, du 12 octobre 2026 au 17 juin 2027 – vue frise ou vue liste,
              filtrable.
            </div>
          </div>
          <div className="route-sig">
            <svg width="220" height="86" viewBox="0 0 220 86">
              <line
                x1="20"
                y1="60"
                x2="200"
                y2="60"
                stroke="#c9bda2"
                strokeWidth="2"
                strokeDasharray="1,6"
                strokeLinecap="round"
              />
              <circle cx="20" cy="60" r="5" fill="currentColor" />
              <text x="20" y="78" textAnchor="middle" className="route-label">
                Anglet
              </text>
              <circle cx="110" cy="60" r="6" fill="#7d2d3f" />
              <text x="110" y="78" textAnchor="middle" className="route-label">
                Bordeaux
              </text>
              <circle cx="200" cy="60" r="6" fill="#bd7a2c" />
              <text x="200" y="78" textAnchor="middle" className="route-label">
                Dax
              </text>
            </svg>
          </div>
        </div>
        <div className="legend">
          <div className="legend-item">
            <span className="swatch t-cours">C</span> Cours présentiel –
            Bordeaux (Dax pour PST106)
          </div>
          <div className="legend-item">
            <span className="swatch t-examen">E</span> Examen (session normale)
            – Dax
          </div>
          <div className="legend-item">
            <span className="swatch" style={{ background: "#a3231f" }}>
              R
            </span>{" "}
            Rattrapage (session 2) – Dax
          </div>
          <div className="legend-item">
            <span className="swatch t-visio">V</span> Web-conférence
          </div>
        </div>
      </div>

      <div className="stickybar">
        <div className="toolbar">
          <button
            className={`view-btn view-btn-grid${activeView === "grid" ? " active" : ""}`}
            onClick={() => setView("grid")}
          >
            <BarChart3 className="inline-block mr-1.5 align-text-bottom size-4" />
            Vue frise
          </button>
          <button
            className={`view-btn view-btn-list${activeView === "list" ? " active" : ""}`}
            onClick={() => setView("list")}
          >
            <ListFilter className="inline-block mr-1.5 align-text-bottom size-4" />
            Vue liste
          </button>
          <button
            className="view-btn"
            onClick={() =>
              downloadIcs(
                PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)),
              )
            }
            title="Exporter les séances filtrées au format .ics (Google/Apple/Outlook Calendar)"
          >
            <Calendar className="inline-block mr-1.5 align-text-bottom size-4" />
            Exporter .ics
          </button>
          <button className="view-btn print-btn" onClick={() => window.print()}>
            <Printer className="inline-block mr-1.5 align-text-bottom size-4" />
            Imprimer / PDF
          </button>
        </div>

        <div className="preset-group">
          <span className="preset-label">Affichage cumulatif :</span>
          <div className="preset-buttons">
            <button
              type="button"
              className={`preset-btn p-cours-btn${filters.types.has("COURS") ? " active" : ""}`}
              onClick={() => toggleType("COURS")}
              title="Ajouter ou masquer les cours présentiels"
            >
              <Building2 className="inline-block mr-1.5 align-text-bottom size-3.5" />
              {filters.types.has("COURS")
                ? "✓ Cours présentiels"
                : "+ Cours présentiels"}
            </button>
            <button
              type="button"
              className={`preset-btn p-examen-btn${filters.types.has("EXAMEN") ? " active" : ""}`}
              onClick={() => toggleType("EXAMEN")}
              title="Ajouter ou masquer les examens"
            >
              <GraduationCap className="inline-block mr-1.5 align-text-bottom size-3.5" />
              {filters.types.has("EXAMEN") ? "✓ Examens" : "+ Examens"}
            </button>
            <button
              type="button"
              className={`preset-btn p-visio-btn${filters.types.has("WEBCONF") ? " active" : ""}`}
              onClick={() => toggleType("WEBCONF")}
              title="Ajouter ou masquer les webconférences (visio)"
            >
              <Video className="inline-block mr-1.5 align-text-bottom size-3.5" />
              {filters.types.has("WEBCONF")
                ? "✓ Webconférences"
                : "+ Webconférences"}
            </button>
            <button
              type="button"
              className={`preset-btn preset-btn-all${
                filters.types.has("COURS") &&
                filters.types.has("EXAMEN") &&
                filters.types.has("WEBCONF")
                  ? " active"
                  : ""
              }`}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  types: new Set(["COURS", "EXAMEN", "WEBCONF"]),
                }))
              }
              title="Afficher tous les types d'événements à la fois"
            >
              <Globe className="inline-block mr-1.5 align-text-bottom size-3.5" />
              Tout afficher
            </button>
          </div>
        </div>
        <details className="filters-accordion">
          <summary>
            <span className="flex items-center gap-1.5">
              <Search className="size-4" />
              Filtres{" "}
              <span className="filters-count">
                {activeFilterCount}/{totalFilterCount} actifs
              </span>
            </span>
          </summary>
          <div className="filters">
            <div className="filter-group">
              <span className="flabel">UE</span>
              {UNIT_ORDER.map((u) => (
                <label className="pill p-unit" key={u}>
                  <input
                    type="checkbox"
                    checked={filters.units.has(u)}
                    onChange={() => toggleUnit(u)}
                  />
                  <span>{u.toUpperCase()}</span>
                </label>
              ))}
            </div>
            <div className="filter-group">
              <span className="flabel">Type</span>
              <label className="pill p-cours">
                <input
                  type="checkbox"
                  checked={filters.types.has("COURS")}
                  onChange={() => toggleType("COURS")}
                />
                <span>Cours</span>
              </label>
              <label className="pill p-examen">
                <input
                  type="checkbox"
                  checked={filters.types.has("EXAMEN")}
                  onChange={() => toggleType("EXAMEN")}
                />
                <span>Examens</span>
              </label>
              <label className="pill p-visio">
                <input
                  type="checkbox"
                  checked={filters.types.has("WEBCONF")}
                  onChange={() => toggleType("WEBCONF")}
                />
                <span>Visio</span>
              </label>
            </div>
            <div className="filter-group">
              <span className="flabel">Session</span>
              <label className="pill p-cours">
                <input
                  type="checkbox"
                  checked={filters.sessions.has(1)}
                  onChange={() => toggleSession(1)}
                />
                <span>Normale</span>
              </label>
              <label className="pill p-rattrap">
                <input
                  type="checkbox"
                  checked={filters.sessions.has(2)}
                  onChange={() => toggleSession(2)}
                />
                <span>Rattrapage</span>
              </label>
            </div>
          </div>
        </details>
      </div>

      <details className="howto-accordion">
        <summary className="flex items-center gap-2">
          <HelpCircle className="text-amber-600 shrink-0 size-4" />
          <span>Comment lire ce planning ? (Légende détaillée)</span>
        </summary>
        <div className="howto-content">
          <b>Lire une puce :</b> 2 lettres = jour de semaine, nombre = jour du
          mois. Couleur = type de séance.{" "}
          <b style={{ color: "#b8862f" }}>Doré pointillé</b> = jour PST120 à
          confirmer · puce <b style={{ color: "#a3231f" }}>rouge foncé</b> =
          session de rattrapage · contour{" "}
          <b style={{ color: "#3d7a54" }}>vert</b> = 2 jours <u>consécutifs</u>{" "}
          (1 seul trajet possible, avec nuitée sur place) · soulignement{" "}
          <b>gris</b> = journée complète (matin + après-midi le <u>même</u>{" "}
          jour, pas d'hébergement nécessaire). Case surlignée verte = semaine en
          cours.
        </div>
      </details>

      <div className="totals">
        <div className="total-card c1">
          <div className="icon">
            <Car className="size-6" />
          </div>
          <div className="num">
            {presenceRemaining.lundi === presenceRemaining.mardi
              ? presenceRemaining.lundi
              : `${presenceRemaining.lundi}–${presenceRemaining.mardi}`}
          </div>
          <div className="lbl">Jours de présentiel restants</div>
          <div className="sub">
            {presenceRemaining.lundi === presenceRemaining.mardi
              ? "quel que soit le jour retenu pour PST120 (hors rattrapage, conditionnel)"
              : `${presenceRemaining.lundi} si PST120=lundi, ${presenceRemaining.mardi} si mardi (hors rattrapage, conditionnel)`}
          </div>
        </div>
        <div className="total-card c2">
          <div className="icon">
            <GraduationCap className="size-6" />
          </div>
          <div className="num">{totals.examenDays}</div>
          <div className="lbl">Jours d&apos;examen</div>
          <div className="sub">session normale</div>
        </div>
        <div className="total-card c3">
          <div className="icon">
            <Laptop className="size-6" />
          </div>
          <div className="num">{visioRemaining}</div>
          <div className="lbl">Jours de visio restants</div>
          <div className="sub">aucun déplacement</div>
        </div>
        <div className="total-card c5">
          <div className="icon">
            <Layers className="size-6" />
          </div>
          <div className="num">
            {totals.clusterDaysLundi === totals.clusterDaysMardi
              ? totals.clusterDaysLundi
              : `${totals.clusterDaysLundi}–${totals.clusterDaysMardi}`}
          </div>
          <div className="lbl">Jours en cluster</div>
          <div className="sub">
            {totals.clusterDaysLundi === totals.clusterDaysMardi
              ? "quel que soit le jour retenu pour PST120"
              : `${totals.clusterDaysLundi} si PST120=lundi, ${totals.clusterDaysMardi} si mardi (+${totals.clusterDaysMardi - totals.clusterDaysLundi} via le pont du rattrapage, conditionnel)`}
          </div>
        </div>
      </div>

      {/* Les deux vues restent montées et basculent en CSS pur (cf.
          planning.css, .view-switch) : sous 720px, la liste est forcée par
          media query indépendamment de `activeView`/JS, pour ne jamais
          afficher — même une fraction de seconde — la frise 1700px de large
          sur mobile (l'ancienne détection isMobile en useEffect provoquait
          un flash à chaque chargement mobile). */}
      <div className="view-switch" data-view={activeView}>
        <div className="pv-grid">
          <PlanningGrid filters={filters} todayWeekKey={todayWeekKey} />
        </div>
        <div className="pv-list">
          <PlanningList filters={filters} todayIso={todayIso} />
        </div>
      </div>

      <div className="footnotes">
        <h3>Notes de lecture</h3>
        <p>
          · <b>PST120</b> affiche deux options par semaine (lundi <i>et</i>{" "}
          mardi, 18h–21h) tant que le jour réel du groupe n&apos;est pas
          confirmé – repère-toi via le contour doré. Sur l&apos;année complète,
          lundi et mardi totalisent le même nombre de jours de présentiel (25),
          donc ce n&apos;est pas ce nombre qui doit trancher. La vraie
          différence est le rattrapage du 12/04 (PST106 + PST123) : si ton
          groupe PST120 est le mardi, la séance du 13/04 crée un pont avec le
          rattrapage PST108 du 14/04 — 3 jours consécutifs à enchaîner (12→14),
          contre un simple aller-retour isolé le 12/04 si ton groupe est le
          lundi. D&apos;où les 3 &quot;jours en cluster&quot; de plus au mardi
          ci-dessus.
        </p>
        <p>
          · <b>Examens (session normale)</b> : chaque UE a sa propre date –
          PST108 le 09/02 (mardi), PST123 le 10/02 (mercredi), PST106 le 11/02
          (jeudi) : 3 jours consécutifs à Dax, déjà comptés dans le &quot;jours
          en cluster&quot; ci-dessus. PST120 (14/06) et PST124 (17/06) ont
          chacune une seule date, à des jours différents.
        </p>
        <p>
          · <b>Rattrapage</b> : PST106 et PST123 partagent la même date de
          rattrapage (12/04, lundi) ; PST108 a la sienne 2 jours plus tard
          (14/04, mercredi). PST120/PST124 n&apos;ont pas de rattrapage. Le
          total &quot;jours de présentiel&quot; ci-dessus{" "}
          <b>n&apos;inclut pas</b> le rattrapage (conditionnel). Si tu passes un
          rattrapage le 12/04 <b>et</b> que ton groupe PST120 est le lundi, ce
          trajet est &quot;gratuit&quot; (déjà sur place ce jour-là).
        </p>
        <p>
          · <b>PST106</b> : seul le groupe de Mme LUTUMBA Priska est suivi ici
          (le groupe parallèle de Mme LAGABRIELLE Christine n&apos;est pas
          affiché), cours en présentiel à <b>Dax</b> (et non à Bordeaux comme
          les autres UE) — 2 jours de présentiel (05/12, 16/01) et 9 jours de
          visio.
        </p>
      </div>
    </div>
  );
}
