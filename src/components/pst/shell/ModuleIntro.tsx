"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  CalendarPlus,
  MapPin,
  Video,
  BookOpen,
  Swords,
  ShieldCheck,
  Printer,
  Flame,
  ShieldAlert,
  HeartHandshake,
  Layers,
  Quote,
  History,
  Compass,
} from "lucide-react";
import { PLANNING_EVENTS, type PlanningUnitId } from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
  getExamEvent,
  getNextUnitEvent,
  summarizeUnit,
} from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";

interface ModuleIntroProps {
  children: ReactNode;
  unitId?: PlanningUnitId;
}

export function ModuleIntro({ children, unitId }: ModuleIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [targetLabel, setTargetLabel] = useState<string | null>(null);
  const [nextLabel, setNextLabel] = useState<string | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [todayIso, setTodayIso] = useState<string | null>(null);

  const [nextDaysLeft, setNextDaysLeft] = useState<number | null>(null);

  const unitEvents = useMemo(
    () =>
      unitId
        ? PLANNING_EVENTS.filter((e) => e.unit === unitId).sort((a, b) =>
            (a.date + a.start).localeCompare(b.date + b.start),
          )
        : [],
    [unitId],
  );

  const unitSummary = useMemo(
    () => (unitId ? summarizeUnit(unitId) : null),
    [unitId],
  );

  useEffect(() => {
    const now = new Date();
    const localIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setTodayIso(localIso);
    if (!unitId) return;
    const target = getExamEvent(unitId);
    if (!target) return;

    const parts = target.date.split("-");
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    if (!y || !m || !d) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(y, m - 1, d);
    const diff = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    const totalUnitEvents = unitEvents.length;
    const loc = eventLocation(target) ?? "ENF";
    const prefix =
      target.type === "EXAMEN"
        ? "Examen session 1"
        : totalUnitEvents > 1
          ? `Clôture UE (${totalUnitEvents} séances)`
          : "Ouverture UE S2";

    setTargetLabel(
      `${prefix} : ${target.day} ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y} (${loc})`,
    );
    setDaysLeft(diff);

    const nextEv = getNextUnitEvent(unitId);
    if (nextEv) {
      const [nyStr, nmStr, ndStr] = nextEv.date.split("-");
      const ny = Number(nyStr);
      const nm = Number(nmStr);
      const nd = Number(ndStr);
      const nextDateObj = new Date(ny, nm - 1, nd);
      const nextDiff = Math.ceil(
        (nextDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      setNextDaysLeft(nextDiff);
      const nextPlace =
        nextEv.type === "COURS"
          ? `Cours Cnam Bègles${nextEv.room ? ` — ${nextEv.room}` : ""}`
          : nextEv.type === "WEBCONF"
            ? "Webconférence (BigBlueButton)"
            : "Activités distantes (ENF)";
      setNextLabel(
        `Prochaine séance : ${nextEv.day} ${ndStr}/${nmStr}/${nyStr} (${nextEv.start}–${nextEv.end} · ${nextPlace})`,
      );
    } else {
      setNextLabel(null);
      setNextDaysLeft(null);
    }
  }, [unitId, unitEvents.length]);

  return (
    <div>
      {unitId && targetLabel && daysLeft !== null && (
        <div className="mb-3">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 rounded-xl text-xs font-semibold text-amber-900 dark:text-amber-300 flex-wrap">
            {nextLabel && (
              <span className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                <Calendar className="size-3.5 text-amber-600 dark:text-amber-400" />
                <span>{nextLabel}</span>
                {nextDaysLeft !== null && (
                  <span className="px-2 py-0.5 bg-amber-600 text-white rounded-md font-bold text-[11px] inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {nextDaysLeft <= 0 ? "Aujourd'hui" : `J-${nextDaysLeft}`}
                  </span>
                )}
              </span>
            )}
            <span
              className={`flex items-center gap-1.5 ${
                nextLabel
                  ? "text-slate-600 dark:text-slate-300 font-medium border-l border-amber-500/30 pl-2.5"
                  : ""
              }`}
            >
              <GraduationCap className="text-amber-600 dark:text-amber-400 size-4" />
              <span>{targetLabel}</span>
              {!nextLabel && (
                <span className="px-2 py-0.5 bg-amber-600 text-white rounded-md font-bold text-[11px] inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {daysLeft < 0 ? "Passé" : `J-${daysLeft}`}
                </span>
              )}
            </span>
            {unitEvents.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSchedule((s) => !s)}
                className="ml-1 px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>
                  Planning UE ({unitEvents.length} séa.
                  {unitSummary ? ` · ${unitSummary.totalHours}h` : ""})
                </span>
                {showSchedule ? (
                  <ChevronUp className="size-3" />
                ) : (
                  <ChevronDown className="size-3" />
                )}
              </button>
            )}
          </div>

          {showSchedule && unitEvents.length > 0 && (
            <div className="mt-2.5 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2.5 pb-2 border-b border-slate-200/70 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Calendrier officiel {unitId.toUpperCase()} —{" "}
                  {unitSummary?.coursCount
                    ? `${unitSummary.coursCount} cours Bègles · `
                    : ""}
                  {unitSummary?.visioCount
                    ? `${unitSummary.visioCount} webconf. · `
                    : ""}
                  {unitSummary?.distantCount
                    ? `${unitSummary.distantCount} act. distantes`
                    : ""}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    downloadIcs(unitEvents, `planning-${unitId}-cnam.ics`)
                  }
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <CalendarPlus className="size-3" />
                  <span>Exporter {unitId.toUpperCase()} (.ics)</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
                {unitEvents.map((ev, i) => {
                  const isPast = todayIso !== null && ev.date < todayIso;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border text-xs flex flex-col justify-between gap-1 ${
                        isPast
                          ? "opacity-55 bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800"
                          : ev.type === "COURS"
                            ? "bg-amber-500/10 border-amber-500/30"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 font-bold text-slate-900 dark:text-slate-100">
                        <span>
                          {ev.day.slice(0, 3)}. {formatFrDate(ev.date)}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {ev.start}–{ev.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                        {ev.type === "COURS" ? (
                          <MapPin className="size-3 shrink-0" />
                        ) : ev.type === "WEBCONF" ? (
                          <Video className="size-3 shrink-0" />
                        ) : (
                          <BookOpen className="size-3 shrink-0" />
                        )}
                        <span className="truncate">
                          {ev.type === "COURS"
                            ? `Cnam Bègles — ${ev.room ?? ""}`
                            : ev.type === "WEBCONF"
                              ? "Webconférence (BigBlueButton)"
                              : "Activités distantes (ENF)"}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {ev.teacher}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Barre d'outils rapides d'entraînement */}
      <div className="mb-3.5 p-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-xs shadow-2xs">
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 shrink-0">
          Outils Flash :
        </span>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-800 dark:text-rose-200 border border-rose-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Match des Auteurs (Duels Dialectiques 1 vs 1)"
        >
          <Swords className="size-3 text-rose-600 dark:text-rose-400" />
          <span>Match Auteurs 1v1</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-definitions"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border border-indigo-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Coffre des Définitions Clés (Auto-Test 18/20)"
        >
          <ShieldCheck className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Définitions 18/20</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pst:open-fiche-poche", {
                detail: unitId ? { module: unitId } : undefined,
              }),
            )
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Fiche Mémo de Poche A4 (Imprimable)"
        >
          <Printer className="size-3 text-emerald-600 dark:text-emerald-400" />
          <span>Mémo Poche A4</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-speed-run"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Sprint Chronométré 3 Min"
        >
          <Flame className="size-3 text-amber-600 dark:text-amber-400" />
          <span>Sprint 3m</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-detective"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-800 dark:text-purple-200 border border-purple-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Détective des Pièges d'Examen"
        >
          <ShieldAlert className="size-3 text-purple-600 dark:text-purple-400" />
          <span>Pièges 18/20</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pst:open-sujets-dissertation"),
            )
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border border-indigo-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Générateur de Sujets de Dissertation & Plans Modèles 18/20"
        >
          <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Dissertation</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-roleplay"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-800 dark:text-teal-200 border border-teal-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Simulateur d'Entretien & Négociation IOD en Jeu de Rôle"
        >
          <HeartHandshake className="size-3 text-teal-600 dark:text-teal-400" />
          <span>Jeu de Rôle</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-schemas"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 border border-cyan-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Schémas Vectoriels & Matrices SVG 18/20 (Mémoire Visuelle)"
        >
          <Layers className="size-3 text-cyan-600 dark:text-cyan-400" />
          <span>Schémas SVG</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-blind-test"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-800 dark:text-violet-200 border border-violet-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Défi Citations Mystères & Blind-Test Auteurs"
        >
          <Quote className="size-3 text-violet-600 dark:text-violet-400" />
          <span>Citations Mystères</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-chronologie"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Frise Historique & Généalogie des Théories (1880-2026)"
        >
          <History className="size-3 text-emerald-600 dark:text-emerald-400" />
          <span>Frise Histoire</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-800 dark:text-purple-200 border border-purple-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Le Palais de la Mémoire Tri-Module 18/20 (PST 106-108-123)"
        >
          <Compass className="size-3 text-purple-600 dark:text-purple-400" />
          <span>Palais Mémoire</span>
        </button>
      </div>

      <div className={`sub-intro${expanded ? " expanded" : ""}`}>
        <p className="sub">{children}</p>
        <button
          type="button"
          className="sub-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      </div>
    </div>
  );
}
