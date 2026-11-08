/** Used inside next/og ImageResponse (satori) — keep to plain SVG primitives. */
export function IconArt({ size }: { size: number }) {
  const c = 256;
  const ringR = 150;
  const dots = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return { x: c + Math.cos(a) * ringR, y: c + Math.sin(a) * ringR };
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 512 512">
        <circle
          cx={c}
          cy={c}
          r={ringR}
          fill="none"
          stroke="#28b8f2"
          strokeOpacity="0.4"
          strokeWidth="6"
          strokeDasharray="2 16"
          strokeLinecap="round"
        />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="24" fill="#28b8f2" />
        ))}
        <circle cx={c} cy={c} r="42" fill="#7fdcfb" />
      </svg>
    </div>
  );
}
