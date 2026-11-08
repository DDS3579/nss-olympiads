import type { ReactNode } from "react";

export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-6 sm:pt-14">
      <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      {updated && <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>}
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
