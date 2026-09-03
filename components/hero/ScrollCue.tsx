export function ScrollCue() {
  return (
    <a
      href="#why"
      aria-label="Scroll to Why Olympiads"
      className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-2.5 pb-1 transition-opacity duration-300 hover:opacity-70"
    >
      <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.4em] text-muted-foreground/80">
        Explore
      </span>
      <span className="relative block h-9 w-px overflow-hidden rounded-full bg-white/[0.07]">
        <span
          className="hero-motion absolute left-0 top-0 h-3.5 w-px bg-gradient-to-b from-transparent via-[#28b8f2] to-transparent"
          style={{ animation: "hero-scroll-line 2.4s ease-in-out infinite" }}
        />
      </span>
    </a>
  )
}