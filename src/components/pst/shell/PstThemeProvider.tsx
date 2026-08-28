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
    const stored = window.localStorage.getItem("pst_theme");
    if (stored) {
      setDark(stored === "dark");
    }
  }, []);

  function toggle() {
    setDark((prev) => {
      const next = !prev;
      window.localStorage.setItem("pst_theme", next ? "dark" : "light");
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

export function usePstTheme() {
  const ctx = useContext(PstThemeContext);
  if (!ctx)
    throw new Error("usePstTheme must be used within a PstThemeProvider");
  return ctx;
}
