"use client";

import { useEffect } from "react";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-heading text-7xl font-black text-primary/10 select-none">
        :(
      </span>
      <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
        Something went off-orbit.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. Try reloading — if it keeps happening, let
        us know.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-heading text-sm font-semibold text-primary-foreground border-b-4 border-primary/40 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}