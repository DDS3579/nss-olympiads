import { AlertTriangle } from "lucide-react";

/** Amber callout for access:"caveat" records — exact text from the data, never hidden. */
export function AccessNote({ note }: { note?: string }) {
  if (!note) return null;
  return (
    <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-700 dark:text-amber-400">
      <AlertTriangle aria-hidden className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
      <span>{note}</span>
    </p>
  );
}
