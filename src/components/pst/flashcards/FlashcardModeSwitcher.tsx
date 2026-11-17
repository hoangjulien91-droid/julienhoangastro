import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface FlashcardModeSwitcherProps {
  mode: "classic" | "swipe";
  onChange: (m: "classic" | "swipe") => void;
}

export function FlashcardModeSwitcher({
  mode,
  onChange,
}: FlashcardModeSwitcherProps) {
  return (
    <div
      id="swipeModeToggle"
      className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/40 border border-border/70 mb-4"
    >
      <button
        type="button"
        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
          mode === "classic"
            ? "bg-card text-foreground shadow-xs border border-border/80"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => {
          triggerHaptic("light");
          playClickSound();
          onChange("classic");
        }}
      >
        Répétition Leitner (SM-2)
      </button>
      <button
        type="button"
        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
          mode === "swipe"
            ? "bg-card text-foreground shadow-xs border border-border/80"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => {
          triggerHaptic("light");
          playClickSound();
          onChange("swipe");
        }}
      >
        Classer (Swipe Game)
      </button>
    </div>
  );
}
