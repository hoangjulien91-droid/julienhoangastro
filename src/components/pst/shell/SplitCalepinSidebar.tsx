"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NotebookPen, BookOpen, Send, Search } from "lucide-react";
import { toast } from "sonner";
import { INDEX } from "@/lib/pst/hub-stats";
import { playSuccessSound } from "@/lib/pst/audio-feedback";

interface SplitCalepinSidebarProps {
  moduleKey: string;
}

export function SplitCalepinSidebar({ moduleKey }: SplitCalepinSidebarProps) {
  const [sideTab, setSideTab] = useState<"notes" | "lexique">("notes");
  const [scratchNotes, setScratchNotes] = useState("");
  const [sideSearch, setSideSearch] = useState("");
  const scratchSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const savedNote = localStorage.getItem(`pst_scratch_${moduleKey}`) ?? "";
      setScratchNotes(savedNote);
    } catch {
      // ignore
    }
  }, [moduleKey]);

  useEffect(() => {
    return () => {
      if (scratchSaveTimerRef.current) {
        clearTimeout(scratchSaveTimerRef.current);
      }
    };
  }, []);

  function handleSaveScratch(val: string) {
    setScratchNotes(val);
    if (scratchSaveTimerRef.current) {
      clearTimeout(scratchSaveTimerRef.current);
    }
    scratchSaveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(`pst_scratch_${moduleKey}`, val);
      } catch {
        // ignore
      }
    }, 300);
  }

  function sendScratchToFieldJournal() {
    if (!scratchNotes.trim()) return;
    try {
      const raw = localStorage.getItem("pst_field_journal_v1");
      const current = raw ? JSON.parse(raw) : [];
      const now = new Date();
      const stamp = `${now.toLocaleDateString("fr-FR")} · ${now
        .toTimeString()
        .slice(0, 5)}`;
      const next = [
        {
          id: "fj-" + Date.now(),
          timestamp: stamp,
          ue: moduleKey.toUpperCase(),
          category: "note_reflexive",
          operatorCode: `Split-View ${moduleKey.toUpperCase()}`,
          content: scratchNotes.trim(),
        },
        ...current,
      ];
      localStorage.setItem("pst_field_journal_v1", JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(
        `Notes envoyées vers la Chronique de Terrain (${moduleKey.toUpperCase()})`,
      );
    } catch {
      // ignore
    }
  }

  const sideGlossary = useMemo(() => {
    const q = sideSearch.trim().toLowerCase();
    const list = INDEX.glossaire.filter((g) =>
      q
        ? g.w.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)
        : g.m === moduleKey,
    );
    return list.slice(0, 25);
  }, [sideSearch, moduleKey]);

  return (
    <aside
      aria-label="Panneau latéral Double Écran : Calepin et Glossaire"
      className="hidden lg:flex lg:col-span-4 sticky top-20 flex-col rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-md overflow-hidden"
    >
      {/* Segmented Switcher Notes / Lexique */}
      <div className="p-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/50 flex items-center justify-between gap-2">
        <div className="grid grid-cols-2 gap-1 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl w-full text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSideTab("notes")}
            className={`py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              sideTab === "notes"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <NotebookPen className="size-3.5 text-amber-600" />
            <span>Calepin {moduleKey.toUpperCase()}</span>
          </button>
          <button
            type="button"
            onClick={() => setSideTab("lexique")}
            className={`py-1.5 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              sideTab === "lexique"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <BookOpen className="size-3.5 text-amber-600" />
            <span>Glossaire ({sideGlossary.length})</span>
          </button>
        </div>
      </div>

      {sideTab === "notes" ? (
        <div className="p-3.5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold">
              Synthèse &amp; arguments d&apos;examen ({moduleKey.toUpperCase()})
            </span>
            <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
              Auto-sauvegardé
            </span>
          </div>
          <textarea
            value={scratchNotes}
            onChange={(e) => handleSaveScratch(e.target.value)}
            rows={12}
            aria-label={`Calepin de notes ${moduleKey.toUpperCase()}`}
            placeholder={`Notez ici vos articulations théoriques, citations clés ou plans de copie pendant votre lecture de ${moduleKey.toUpperCase()}...`}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500 resize-y"
          />
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {scratchNotes.length} caract.
            </span>
            <button
              type="button"
              onClick={sendScratchToFieldJournal}
              disabled={!scratchNotes.trim()}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="size-3.5" />
              <span>Vers Chronique Terrain</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 space-y-2.5 max-h-[70vh] flex flex-col">
          <div className="relative">
            <Search className="size-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              aria-label="Chercher dans tout le glossaire PST"
              value={sideSearch}
              onChange={(e) => setSideSearch(e.target.value)}
              placeholder="Chercher dans tout le glossaire PST..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="overflow-y-auto space-y-2 pr-1 flex-1">
            {sideGlossary.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6 m-0">
                Aucun terme trouvé pour « {sideSearch.trim()} ».
              </p>
            ) : (
              sideGlossary.map((g, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs"
                >
                  <div className="flex items-center justify-between gap-1 font-bold text-slate-900 dark:text-slate-100 mb-0.5">
                    <span>{g.w}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {g.m.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-snug">
                    {g.def}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
