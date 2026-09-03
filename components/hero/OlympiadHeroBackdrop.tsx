type BackdropProps = { activeIndex: number | null }

/* ---- Layer 2: faint scientific diagrams (one per Olympiad, index-matched) ---- */
const DIAGRAMS: { pos: string; svg: React.ReactNode }[] = [
  {
    // 0 · Mathematics — sigma / integral
    pos: "left-[21%] top-[12%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M88 26 H42 L70 60 L42 94 H88" />
        <path d="M46 110 h44" opacity="0.55" />
        <path d="M100 30 c -5 1 -6 6 -6 11 v 34 c 0 5 1 10 6 11" opacity="0.8" />
      </svg>
    ),
  },
  {
    // 1 · Physics — projectile / vectors
    pos: "left-[74%] top-[7%] w-32 xl:w-36",
    svg: (
      <svg viewBox="0 0 140 110" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 90 Q 70 12 128 90" strokeDasharray="3 5" />
        <circle cx="12" cy="90" r="3" fill="currentColor" stroke="none" />
        <line x1="12" y1="90" x2="46" y2="52" />
        <path d="M46 52 l-10 2 M46 52 l-2 10" />
        <path d="M34 90 a 22 22 0 0 1 7 -15" opacity="0.6" />
        <line x1="8" y1="102" x2="134" y2="102" opacity="0.45" />
      </svg>
    ),
  },
  {
    // 2 · Chemistry — benzene ring
    pos: "left-[88%] top-[62%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 130 120" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="65,28 94,45 94,79 65,96 36,79 36,45" />
        <circle cx="65" cy="62" r="19" opacity="0.55" />
        <line x1="94" y1="45" x2="118" y2="31" />
        <circle cx="121" cy="29" r="4" />
        <line x1="36" y1="79" x2="14" y2="92" />
        <circle cx="11" cy="94" r="3" opacity="0.7" />
      </svg>
    ),
  },
  {
    // 3 · Biology — double helix
    pos: "left-[35%] top-[78%] w-24 xl:w-28",
    svg: (
      <svg viewBox="0 0 110 130" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M34 6 C 82 30 82 54 34 78 C 14 88 14 106 38 124" />
        <path d="M76 6 C 28 30 28 54 76 78 C 96 88 96 106 72 124" />
        <line x1="46" y1="20" x2="64" y2="20" opacity="0.65" />
        <line x1="52" y1="34" x2="58" y2="34" opacity="0.65" />
        <line x1="47" y1="64" x2="63" y2="64" opacity="0.65" />
        <line x1="40" y1="92" x2="70" y2="92" opacity="0.65" />
        <line x1="42" y1="108" x2="68" y2="108" opacity="0.65" />
      </svg>
    ),
  },
  {
    // 4 · Astronomy — orbits
    pos: "left-[57%] top-[12%] w-32 xl:w-36",
    svg: (
      <svg viewBox="0 0 140 110" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="70" cy="55" r="5" fill="currentColor" stroke="none" />
        <ellipse cx="70" cy="55" rx="60" ry="19" transform="rotate(-16 70 55)" />
        <ellipse cx="70" cy="55" rx="42" ry="13" transform="rotate(22 70 55)" opacity="0.55" />
        <circle cx="124" cy="34" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="32" cy="70" r="1.8" fill="currentColor" stroke="none" opacity="0.8" />
      </svg>
    ),
  },
  {
    // 5 · Informatics — graph theory
    pos: "left-[6%] top-[63%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 130 110" fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="22" y1="26" x2="78" y2="14" />
        <line x1="78" y1="14" x2="116" y2="44" />
        <line x1="22" y1="26" x2="54" y2="58" />
        <line x1="78" y1="14" x2="54" y2="58" />
        <line x1="116" y1="44" x2="54" y2="58" />
        <line x1="54" y1="58" x2="28" y2="94" />
        <line x1="54" y1="58" x2="98" y2="92" />
        <line x1="28" y1="94" x2="98" y2="92" />
        <line x1="116" y1="44" x2="98" y2="92" />
        <circle cx="22" cy="26" r="3.5" />
        <circle cx="78" cy="14" r="3.5" />
        <circle cx="116" cy="44" r="3.5" />
        <circle cx="54" cy="58" r="4" fill="currentColor" fillOpacity="0.25" />
        <circle cx="28" cy="94" r="3" />
        <circle cx="98" cy="92" r="3" />
      </svg>
    ),
  },
  {
    // 6 · Geometry — circumscribed triangle
    pos: "left-[63%] top-[76%] w-28 xl:w-32",
    svg: (
      <svg viewBox="0 0 130 120" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="65" cy="62" r="46" opacity="0.75" />
        <polygon points="65,16 103,89 27,89" />
        <circle cx="65" cy="62" r="1.6" fill="currentColor" stroke="none" />
        <line x1="65" y1="62" x2="103" y2="89" strokeDasharray="2 3" opacity="0.6" />
        <line x1="65" y1="16" x2="65" y2="62" strokeDasharray="2 3" opacity="0.35" />
      </svg>
    ),
  },
]

export function OlympiadHeroBackdrop({ activeIndex }: BackdropProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ───────────── LAYER 1 · ATMOSPHERE ───────────── */}
      {/* subtle indigo wash at top */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(30,44,82,0.5),transparent_60%)]" />

      {/* huge breathing cyan glow — lit-from-behind, centered below "start." */}
      <div
        className="hero-motion hero-breathe absolute left-1/2 top-[62%] h-[80vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(40,184,242,0.14), rgba(40,184,242,0.05) 55%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      {/* cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_55%,rgba(3,7,16,0.55)_100%)]" />

      {/* film grain */}
      <div className="hero-grain absolute inset-0 opacity-[0.022]" />

      {/* ───────────── LAYER 2 · ACADEMIC UNIVERSE ───────────── */}

      {/* giant ghosted 7 — the seven Olympiads */}
      <div className="absolute inset-x-0 top-[44%] flex -translate-y-1/2 justify-center">
        <span
          className="select-none font-heading text-[58vw] font-black leading-none text-[#f3f6fb]/[0.028] md:text-[42vw]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 64%, transparent 96%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 64%, transparent 96%)",
          }}
        >
          7
        </span>
      </div>

      {/* scientific constellation — 4 corner clusters, center kept clean */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* top-left cluster */}
        <g
          className="hero-motion"
          style={{ animation: "hero-drift 17s ease-in-out -3s infinite" }}
          stroke="rgba(142,157,181,0.14)"
          strokeWidth="1"
        >
          <path d="M96 118 L168 74 L238 142 L146 196 Z" />
          <path d="M168 74 L306 92 L338 186 L238 142" />
          <path d="M58 210 L96 118" />
          <circle cx="96" cy="118" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="168" cy="74" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="146" cy="196" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="306" cy="92" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="338" cy="186" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="58" cy="210" r="1.4" fill="rgba(243,246,251,0.24)" stroke="none" />
          {/* glowing node */}
          <circle cx="238" cy="142" r="7" fill="rgba(40,184,242,0.12)" stroke="none" />
          <circle
            cx="238" cy="142" r="2" fill="rgba(127,220,251,0.8)" stroke="none"
            className="hero-motion" style={{ animation: "hero-pulse 5s ease-in-out infinite" }}
          />
        </g>

        {/* top-right cluster */}
        <g
          className="hero-motion"
          style={{ animation: "hero-drift 21s ease-in-out -9s infinite" }}
          stroke="rgba(142,157,181,0.14)"
          strokeWidth="1"
        >
          <path d="M1344 110 L1272 66 L1202 134 L1294 188 Z" />
          <path d="M1272 66 L1134 84 L1102 178 L1202 134" />
          <path d="M1382 202 L1344 110" />
          <circle cx="1344" cy="110" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1272" cy="66" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1294" cy="188" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1134" cy="84" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1102" cy="178" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1382" cy="202" r="1.4" fill="rgba(243,246,251,0.24)" stroke="none" />
          <circle cx="1202" cy="134" r="7" fill="rgba(40,184,242,0.12)" stroke="none" />
          <circle
            cx="1202" cy="134" r="2" fill="rgba(127,220,251,0.8)" stroke="none"
            className="hero-motion" style={{ animation: "hero-pulse 6s ease-in-out -2s infinite" }}
          />
        </g>

        {/* bottom-left cluster */}
        <g
          className="hero-motion"
          style={{ animation: "hero-drift 19s ease-in-out -6s infinite" }}
          stroke="rgba(142,157,181,0.14)"
          strokeWidth="1"
        >
          <path d="M104 712 L176 772 L246 700 L152 652 Z" />
          <path d="M246 700 L312 758" />
          <path d="M76 632 L152 652" />
          <circle cx="104" cy="712" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="176" cy="772" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="152" cy="652" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="312" cy="758" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="76" cy="632" r="1.4" fill="rgba(243,246,251,0.24)" stroke="none" />
          <circle cx="246" cy="700" r="7" fill="rgba(40,184,242,0.12)" stroke="none" />
          <circle
            cx="246" cy="700" r="2" fill="rgba(127,220,251,0.8)" stroke="none"
            className="hero-motion" style={{ animation: "hero-pulse 4.5s ease-in-out -1s infinite" }}
          />
        </g>

        {/* bottom-right cluster */}
        <g
          className="hero-motion"
          style={{ animation: "hero-drift 23s ease-in-out -12s infinite" }}
          stroke="rgba(142,157,181,0.14)"
          strokeWidth="1"
        >
          <path d="M1336 724 L1264 784 L1194 712 L1288 664 Z" />
          <path d="M1194 712 L1148 770" />
          <path d="M1378 644 L1288 664" />
          <circle cx="1336" cy="724" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1264" cy="784" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1288" cy="664" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1148" cy="770" r="1.6" fill="rgba(243,246,251,0.3)" stroke="none" />
          <circle cx="1378" cy="644" r="1.4" fill="rgba(243,246,251,0.24)" stroke="none" />
          <circle cx="1194" cy="712" r="7" fill="rgba(40,184,242,0.12)" stroke="none" />
          <circle
            cx="1194" cy="712" r="2" fill="rgba(127,220,251,0.8)" stroke="none"
            className="hero-motion" style={{ animation: "hero-pulse 5.5s ease-in-out -3.5s infinite" }}
          />
        </g>

        {/* sparse survey marks */}
        <g fill="rgba(243,246,251,0.18)" stroke="none">
          <circle cx="420" cy="150" r="1.2" />
          <circle cx="1010" cy="140" r="1.2" />
          <circle cx="205" cy="470" r="1.2" />
          <circle cx="1245" cy="480" r="1.2" />
          <circle cx="390" cy="838" r="1.2" />
          <circle cx="1064" cy="846" r="1.2" />
        </g>
        <g stroke="rgba(142,157,181,0.18)" strokeWidth="1">
          <path d="M505 93 h10 M510 88 v10" />
          <path d="M935 83 h10 M940 78 v10" />
          <path d="M55 415 h10 M60 410 v10" />
          <path d="M1385 425 h10 M1390 420 v10" />
        </g>
      </svg>

      {/* perspective grid — fades out before reaching the headline */}
      <div
        className="absolute inset-x-0 bottom-[-1px] h-[36%] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 95%)",
        }}
      >
        <div
          className="absolute bottom-[-58%] left-1/2 h-[170%] w-[190%]"
          style={{
            transform: "translateX(-50%) perspective(620px) rotateX(61deg)",
            transformOrigin: "50% 100%",
            backgroundImage:
              "linear-gradient(rgba(126,164,204,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(126,164,204,0.11) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      {/* faint science diagrams — hover a node to illuminate its diagram */}
      {DIAGRAMS.map((d, i) => {
        const active = activeIndex === i
        return (
          <div
            key={i}
            className={`absolute hidden md:block transition-all duration-700 ${d.pos} ${
              active ? "text-[#28b8f2] opacity-40" : "text-[#f3f6fb] opacity-[0.05]"
            }`}
            style={active ? { filter: "drop-shadow(0 0 14px rgba(40,184,242,0.35))" } : undefined}
          >
            {d.svg}
          </div>
        )
      })}

      {/* ───────────── LAYER 3 · DEPTH OBJECTS (study artifacts) ───────────── */}

      {/* Mathematics problem sheet — left edge */}
      <div className="absolute left-[2.5%] top-[31%] hidden -rotate-6 opacity-[0.22] lg:block">
        <div
          className="hero-motion hero-float w-[190px] rounded-xl border border-white/[0.08] bg-[#0c1730]/50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[3px]"
          style={{ animationDelay: "-2s" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#f3f6fb]/75">Mathematics</span>
            <span className="text-[8.5px] uppercase tracking-[0.14em] text-[#8e9db5]/70">Set 04</span>
          </div>
          <div className="mt-2.5 space-y-1.5 font-mono text-[10px] leading-snug text-[#f3f6fb]/70">
            <p>Let f : ℝ → ℝ satisfy</p>
            <p>f(x) + 2f(1 − x) = x²</p>
            <p className="text-[#7fdcfb]/80">∫₀¹ f(x) dx = ?</p>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-px w-full bg-white/[0.07]" />
            <div className="h-px w-3/4 bg-white/[0.07]" />
          </div>
        </div>
      </div>

      {/* Physics vector card — right edge */}
      <div className="absolute right-[2.5%] top-[27%] hidden rotate-[5deg] opacity-[0.22] lg:block">
        <div
          className="hero-motion hero-float w-[175px] rounded-xl border border-white/[0.08] bg-[#0c1730]/50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[3px]"
          style={{ animationDelay: "-5s" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#f3f6fb]/75">Physics</span>
            <span className="text-[8.5px] uppercase tracking-[0.14em] text-[#8e9db5]/70">Mechanics</span>
          </div>
          <svg viewBox="0 0 150 64" className="mt-2 w-full text-[#f3f6fb]/60" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8 54 Q 75 -18 142 54" strokeDasharray="3 4" />
            <circle cx="8" cy="54" r="2.5" fill="currentColor" stroke="none" />
            <line x1="8" y1="54" x2="40" y2="20" />
            <path d="M40 20 l-9 2.5 M40 20 l-2.5 9" />
            <line x1="4" y1="60" x2="146" y2="60" opacity="0.5" />
          </svg>
          <p className="mt-2 font-mono text-[10px] text-[#f3f6fb]/70">v₀ = 12 m/s · θ = 30°</p>
        </div>
      </div>

      {/* Proof card — bottom-left edge */}
      <div className="absolute bottom-[9%] left-[7%] hidden rotate-[3deg] opacity-[0.18] lg:block">
        <div
          className="hero-motion hero-float w-[200px] rounded-xl border border-white/[0.08] bg-[#0c1730]/50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[3px]"
          style={{ animationDelay: "-7s", animationDuration: "10s" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#f3f6fb]/75">Analysis</span>
            <span className="text-[8.5px] uppercase tracking-[0.14em] text-[#8e9db5]/70">Proof</span>
          </div>
          <div className="mt-2.5 space-y-1 font-mono text-[9.5px] leading-relaxed text-[#f3f6fb]/65">
            <p>Let ε &gt; 0. Choose N ∈ ℕ with</p>
            <p>1/N &lt; ε. Then ∀ n ≥ N,</p>
            <p>|aₙ − L| &lt; ε.&nbsp;&nbsp;∎</p>
          </div>
        </div>
      </div>
    </div>
  )
}