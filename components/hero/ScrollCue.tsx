export function ScrollCue() {
  return (
    <a
      href="#how"
      aria-label="Scroll to How it works"
      className="absolute inset-x-0 bottom-4 z-10 hidden flex-col items-center gap-2.5 pb-1 transition-opacity duration-300 hover:opacity-70 md:flex"
    >
      <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        Explore
      </span>
      <span className="relative block h-9 w-px overflow-hidden rounded-full bg-white/[0.07]">
        <span
          className="hero-motion absolute left-0 top-0 h-3.5 w-px bg-gradient-to-b from-transparent via-[#28b8f2] to-transparent"
          style={{ animation: "hero-scroll-line 2.4s ease-in-out infinite" }}
        />
      </span>
    </a>
  );
}
