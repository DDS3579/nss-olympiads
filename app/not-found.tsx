import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-heading text-[8rem] font-black leading-none text-primary/10 select-none">
        404
      </span>
      <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
        This page drifted off the map.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The Olympiad or page you're looking for doesn't exist. Let's get you back
        on track.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/olympiads"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-heading text-sm font-semibold text-primary-foreground border-b-4 border-primary/40 transition-all duration-150 active:translate-y-1 active:border-b-2 hover:brightness-105"
        >
          Browse Olympiads
        </Link>
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