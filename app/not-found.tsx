import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { getSubjectIndex } from "@/lib/data";
import { strong } from "@/lib/color";
import { mailto } from "@/lib/site-config";

export default function NotFound() {
  const subjects = getSubjectIndex();
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <span
        aria-hidden
        className="select-none font-heading text-[7rem] font-black leading-none text-primary/10 sm:text-[9rem]"
      >
        404
      </span>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
        This page drifted off the map.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Search for a topic, or jump straight to
        an Olympiad.
      </p>

      <form action="/search" role="search" className="mt-8 flex w-full max-w-md gap-2">
        <label htmlFor="nf-q" className="sr-only">
          Search the hub
        </label>
        <input
          id="nf-q"
          name="q"
          type="search"
          placeholder="Try “optics” or “IMO”"
          className="h-12 min-w-0 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          <Search aria-hidden className="h-4 w-4" /> Search
        </button>
      </form>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {subjects.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/olympiads/${s.slug}`}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-secondary"
              style={{ color: strong(s.colorVar) }}
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3 font-heading text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" /> Back to Home
        </Link>
        <a
          href={mailto("Broken link", "Page I tried to open:\n")}
          className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Report a broken link
        </a>
      </div>
    </div>
  );
}
