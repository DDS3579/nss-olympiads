"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

  // Mirrors `f` so `set` can compute the next filters inside the event
  // handler. Doing that in a setState updater would run during React's render
  // phase, and the writeFilters() → history.pushState() call there updates the
  // Router mid-render ("Cannot update a component while rendering…").
  const fRef = useRef<Filters>(DEFAULT_FILTERS);

  const apply = useCallback((next: Filters) => {
    fRef.current = next;
    setF(next);
  }, []);

  // The URL is the single source of truth. Re-read it on mount, when the
  // subject changes, and on Back/Forward.
  useEffect(() => {
    apply(readFilters(window.location.search));
    const onPop = () => apply(readFilters(window.location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [slug, apply]);

  const set = useCallback(
    (patch: Partial<Filters>, mode: "push" | "replace" = "replace") => {
      const next = { ...fRef.current, ...patch };
      apply(next);
      writeFilters(next, mode);
    },
    [apply]
  );

  const reset = useCallback(() => {
    apply(DEFAULT_FILTERS);
    writeFilters(DEFAULT_FILTERS, "push");
  }, [apply]);

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
