"use client";

/**
 * Dark mode is intentionally scoped to /pst* routes and independent from the
 * rest of the site: next-themes is installed in this repo but has no
 * ThemeProvider wired into the root layout (dark mode is dormant site-wide).
 * Wiring into that global system would leak this feature's toggle onto every
 * other page — instead this provider owns its own "dark" class applied to a
 * local wrapper element, backed by the same localStorage key ('pst_theme')
 * the original Astro pages used.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface PstThemeContextValue {
  dark: boolean;
  toggle: () => void;
}

const PstThemeContext = createContext<PstThemeContextValue | null>(null);

export function PstThemeProvider({
  moduleKey,
  children,
}: {
  moduleKey?: string;
  children: ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const syncFromDomOrStorage = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem("theme") || window.localStorage.getItem("pst_theme");
      } catch {
        /* storage disabled */
      }
      const isDark =
        stored === "dark" ||
        (!stored && document.documentElement.classList.contains("dark"));
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    };

    syncFromDomOrStorage();
    window.addEventListener("pst:theme-changed", syncFromDomOrStorage);
    window.addEventListener("storage", syncFromDomOrStorage);
    return () => {
      window.removeEventListener("pst:theme-changed", syncFromDomOrStorage);
      window.removeEventListener("storage", syncFromDomOrStorage);
    };
  }, []);

  function toggle() {
    setDark((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem("theme", next ? "dark" : "light");
        window.localStorage.setItem("pst_theme", next ? "dark" : "light");
      } catch {
        /* storage disabled */
      }
      document.documentElement.classList.toggle("dark", next);
      window.dispatchEvent(new CustomEvent("pst:theme-changed"));
      return next;
    });
  }

  const classes = ["pst-scope", moduleKey, dark ? "dark" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <PstThemeContext.Provider value={{ dark, toggle }}>
      <div className={classes}>{children}</div>
    </PstThemeContext.Provider>
  );
}

export function usePstTheme(): PstThemeContextValue {
  const ctx = useContext(PstThemeContext);
  const [fallbackDark, setFallbackDark] = useState(false);

  useEffect(() => {
    if (ctx) return;
    const sync = () => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem("theme") || window.localStorage.getItem("pst_theme");
      } catch {
        /* storage disabled */
      }
      setFallbackDark(
        stored === "dark" ||
          document.documentElement.classList.contains("dark"),
      );
    };
    sync();
    window.addEventListener("pst:theme-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pst:theme-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, [ctx]);

  if (ctx) return ctx;

  return {
    dark: fallbackDark,
    toggle: () => {
      const next = !document.documentElement.classList.contains("dark");
      try {
        window.localStorage.setItem("theme", next ? "dark" : "light");
        window.localStorage.setItem("pst_theme", next ? "dark" : "light");
      } catch {
        /* storage disabled */
      }
      document.documentElement.classList.toggle("dark", next);
      setFallbackDark(next);
      window.dispatchEvent(new CustomEvent("pst:theme-changed"));
    },
  };
}
