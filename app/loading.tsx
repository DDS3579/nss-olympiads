export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <div className="absolute inset-3 rounded-full bg-primary/10" />
      </div>
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Loading
      </p>
    </div>
  );
}