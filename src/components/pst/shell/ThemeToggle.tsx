"use client";

import { Sun, Moon, GraduationCap } from "lucide-react";
import { usePstTheme } from "./PstThemeProvider";

export function ThemeToggle() {
  const { dark, toggle } = usePstTheme();

  return (
    <button
      id="btnThemeToggle"
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      onClick={toggle}
      className="pst-cnam-link cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all"
    >
      {dark ? (
        <Sun className="size-3.5 text-amber-400 shrink-0" />
      ) : (
        <Moon className="size-3.5 text-slate-600 shrink-0" />
      )}
      <span className="text-xs">{dark ? "Clair" : "Sombre"}</span>
    </button>
  );
}

export function CnamLink() {
  return (
    <a
      className="pst-cnam-link flex items-center gap-1.5"
      href="https://lecnam.net/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Accéder à votre espace Cnam"
      title="Espace Compte Cnam"
    >
      <GraduationCap className="size-3.5 shrink-0" />
      <span>Espace Cnam</span>
    </a>
  );
}
