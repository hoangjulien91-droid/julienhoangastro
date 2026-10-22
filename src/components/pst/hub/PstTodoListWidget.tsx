"use client";

import React, { useState, useEffect } from "react";
import { Check, Plus, X, ListTodo, Sparkles } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface AcademicTask {
  id: string;
  title: string;
  ue: string;
  priority: "haute" | "normale";
  isDone: boolean;
}

const STORAGE_KEY = "pst_academic_todos_v1";

const DEFAULT_TASKS: AcademicTask[] = [
  {
    id: "t1",
    title:
      "Maîtriser la distinction Tâche prescrite vs Activité réelle (Leplat / Wisner)",
    ue: "PST106",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t2",
    title:
      "Analyser les 2 jugements de reconnaissance : utilité et beauté (Dejours)",
    ue: "PST120",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t3",
    title:
      "Structurer le protocole d'auto-confrontation croisée et le rôle du genre",
    ue: "PST106",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t4",
    title:
      "Vérifier l'article L. 6313-4 du Code du travail sur le bilan de compétences",
    ue: "PST123",
    priority: "normale",
    isDone: false,
  },
  {
    id: "t5",
    title:
      "Réviser la genèse instrumentale : instrumentation vs instrumentalisation (Rabardel)",
    ue: "PST124",
    priority: "normale",
    isDone: false,
  },
  {
    id: "t6",
    title:
      "Préparer les extraits de corpus dialogique et la controverse de métier",
    ue: "PST108",
    priority: "normale",
    isDone: false,
  },
];

export function PstTodoListWidget() {
  const [tasks, setTasks] = useState<AcademicTask[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUe, setNewUe] = useState("PST106");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setTasks(JSON.parse(raw));
      } else {
        setTasks(DEFAULT_TASKS);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } catch {
      setTasks(DEFAULT_TASKS);
    }
  }, []);

  function saveTasks(next: AcademicTask[]) {
    setTasks(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
    } catch {
      // quota
    }
  }

  function handleToggle(id: string) {
    const next = tasks.map((t) => {
      if (t.id === id) {
        const nextDone = !t.isDone;
        if (nextDone) {
          triggerHaptic("success");
          playSuccessSound();
        } else {
          triggerHaptic("selection");
          playClickSound();
        }
        return { ...t, isDone: nextDone };
      }
      return t;
    });
    saveTasks(next);
  }

  function handleDelete(id: string) {
    triggerHaptic("error");
    playClickSound();
    saveTasks(tasks.filter((t) => t.id !== id));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    triggerHaptic("success");
    playSuccessSound();
    const item: AcademicTask = {
      id: `task_${Date.now()}`,
      title: newTitle.trim(),
      ue: newUe,
      priority: "haute",
      isDone: false,
    };
    saveTasks([item, ...tasks]);
    setNewTitle("");
  }

  const pendingCount = tasks.filter((t) => !t.isDone).length;

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20 shadow-2xs">
            <ListTodo className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                Carnet de Démarches &amp; Objectifs d'Étude
              </h3>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-amber-700 dark:text-amber-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                {pendingCount} à traiter
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
              Feuille de route opérationnelle pour la validation des 5 UE et du
              mémoire
            </p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[240px] overflow-y-auto pr-1 text-xs">
        {tasks.length === 0 ? (
          <p className="py-6 text-center text-slate-400 dark:text-slate-500 italic">
            Toutes les démarches académiques sont accomplies.
          </p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-white/60 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-all ${
                t.isDone ? "opacity-45" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id)}
                  aria-label={
                    t.isDone
                      ? "Marquer comme non terminé"
                      : "Marquer comme terminé"
                  }
                  className={`size-5 rounded-xl border flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-2xs active:scale-90 ${
                    t.isDone
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:border-amber-500 text-transparent"
                  }`}
                >
                  <Check className="size-3 stroke-[2.5]" />
                </button>

                <span
                  className={`truncate font-semibold ${
                    t.isDone
                      ? "line-through text-slate-400 dark:text-slate-500"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {t.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  {t.ue}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  aria-label="Supprimer la tâche"
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Inline Form */}
      <form
        onSubmit={handleAdd}
        className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center gap-2"
      >
        <select
          value={newUe}
          onChange={(e) => setNewUe(e.target.value)}
          aria-label="Unité d'enseignement"
          className="px-2.5 py-2 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-2xs"
        >
          <option value="PST106">PST106</option>
          <option value="PST108">PST108</option>
          <option value="PST120">PST120</option>
          <option value="PST123">PST123</option>
          <option value="PST124">PST124</option>
          <option value="MÉMOIRE">MÉMOIRE</option>
        </select>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Ajouter une démarche, lecture ou objectif d'étude..."
          className="flex-1 px-3.5 py-2 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-inner"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-3.5 py-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Plus className="size-3.5" />
          <span>Ajouter</span>
        </button>
      </form>
    </div>
  );
}
