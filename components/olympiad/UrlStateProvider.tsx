"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_FILTERS,
  countActive,
  readFilters,
  writeFilters,
  type Filters,
} from "@/lib/url-state";

type FiltersContextValue = {
  f: Filters;
  /** patch one or more filters; "push" for clicks (Back works), "replace" for typing */
  set: (patch: Partial<Filters>, mode?: "push" | "replace") => void;
  reset: () => void;
  active: number;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function UrlStateProvider({ slug, children }: { slug: string; children: ReactNode }) {
  // Server + first client render use defaults → no hydration mismatch.
  const [f, setF] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    // Mount: URL wins; if no level is present, restore the student's last choice (T4.3 writes it).
    let initial = readFilters(window.location.search);
    if (initial.level === "all") {
      try {
        const saved = window.localStorage.getItem(`nss:v2:level:${slug}`);
        if (saved) {
          initial = { ...initial, level: saved };
          writeFilters(initial, "replace");
        }
      } catch {
        /* ignore */
      }
    }
    setF(initial);

    const onPop = () => setF(readFilters(window.location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [slug]);

  const set = useCallback(
    (patch: Partial<Filters>, mode: "push" | "replace" = "replace") => {
      setF((prev) => {
        const next = { ...prev, ...patch };
        writeFilters(next, mode);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setF(DEFAULT_FILTERS);
    writeFilters(DEFAULT_FILTERS, "push");
  }, []);

  const active = useMemo(() => countActive(f), [f]);

  return (
    <FiltersContext.Provider value={{ f, set, reset, active }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const c = useContext(FiltersContext);
  if (!c) throw new Error("useFilters must be used inside UrlStateProvider");
  return c;
}
