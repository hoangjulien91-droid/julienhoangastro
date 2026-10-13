"use client";

import React, { useState, useEffect } from "react";
import { Check, Plus, X, ListTodo, Sparkles } from "lucide-react";
import { playSuccessSound } from "@/lib/pst/audio-feedback";

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
    title: "Maîtriser la distinction Tâche prescrite vs Activité réelle (Leplat / Wisner)",
    ue: "PST106",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t2",
    title: "Analyser les 2 jugements de reconnaissance : utilité et beauté (Dejours)",
    ue: "PST120",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t3",
    title: "Structurer le protocole d'auto-confrontation croisée et le rôle du genre",
    ue: "PST106",
    priority: "haute",
    isDone: false,
  },
  {
    id: "t4",
    title: "Vérifier l'article L. 6313-4 du Code du travail sur le bilan de compétences",
    ue: "PST123",
    priority: "normale",
    isDone: false,
  },
  {
    id: "t5",
    title: "Réviser la genèse instrumentale : instrumentation vs instrumentalisation (Rabardel)",
    ue: "PST124",
    priority: "normale",
    isDone: false,
  },
  {
    id: "t6",
    title: "Préparer les extraits de corpus dialogique et la controverse de métier",
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
        if (nextDone) playSuccessSound();
        return { ...t, isDone: nextDone };
      }
      return t;
    });
    saveTasks(next);
  }

  function handleDelete(id: string) {
    saveTasks(tasks.filter((t) => t.id !== id));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
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
    <div className="card p-5 bg-card/90 border border-border rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <ListTodo className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-serif font-bold text-foreground m-0">
                Carnet de Démarches &amp; Objectifs d'Étude
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border">
                {pendingCount} à traiter
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground m-0">
              Feuille de route opérationnelle pour la validation des 5 UE et du mémoire
            </p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="divide-y divide-border/50 max-h-[240px] overflow-y-auto pr-1 text-xs">
        {tasks.length === 0 ? (
          <p className="py-6 text-center text-muted-foreground italic">
            Toutes les démarches académiques sont accomplies.
          </p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-muted/50 transition-all ${
                t.isDone ? "opacity-45" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id)}
                  aria-label={t.isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}
                  className={`size-4.5 rounded-md border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    t.isDone
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs"
                      : "border-border bg-background hover:border-accent text-transparent"
                  }`}
                >
                  <Check className="size-3 stroke-[2.5]" />
                </button>

                <span
                  className={`truncate font-medium ${
                    t.isDone ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {t.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                  {t.ue}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  aria-label="Supprimer la tâche"
                  className="p-1 rounded-md text-muted-foreground hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Inline Form */}
      <form onSubmit={handleAdd} className="pt-2 border-t border-border/80 flex items-center gap-2">
        <select
          value={newUe}
          onChange={(e) => setNewUe(e.target.value)}
          aria-label="Unité d'enseignement"
          className="px-2 py-1.5 rounded-lg border border-border bg-background text-foreground font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-accent"
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
          className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          <Plus className="size-3.5" />
          <span>Ajouter</span>
        </button>
      </form>
    </div>
  );
}
