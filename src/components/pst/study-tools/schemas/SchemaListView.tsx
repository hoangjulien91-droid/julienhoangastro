import type { SchemaMatrice } from "@/lib/pst/data/schemas-matrices";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface SchemaListViewProps {
  schemas: SchemaMatrice[];
  selectedSchemaId: string;
  onSelectSchemaId: (id: string) => void;
}

export function SchemaListView({
  schemas,
  selectedSchemaId,
  onSelectSchemaId,
}: SchemaListViewProps) {
  return (
    <div className="space-y-1.5">
      {schemas.map((s) => {
        const isSelected = selectedSchemaId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectSchemaId(s.id);
            }}
            className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer space-y-1 block ${
              isSelected
                ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-[1.02]"
                : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-cyan-500/15 text-cyan-800 dark:text-cyan-200"
                }`}
              >
                {s.moduleKey.toUpperCase()}
              </span>
              <span className="text-[10px] opacity-80">{s.annee}</span>
            </div>
            <div className="font-bold leading-snug truncate">{s.titre}</div>
            <div
              className={`text-[11px] truncate ${
                isSelected ? "text-cyan-100" : "text-slate-500"
              }`}
            >
              {s.auteur}
            </div>
          </button>
        );
      })}
    </div>
  );
}
