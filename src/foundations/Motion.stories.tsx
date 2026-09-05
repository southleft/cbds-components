import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

/**
 * Motion tokens come from the `motion primitive` collection in Figma, which was
 * created from the interaction annotations on Accordion, Chip, Progress bar and
 * Dropdown. The annotations name these tokens directly, so the design file and
 * this stylesheet agree on the numbers.
 */

const DURATIONS = [
  { token: "--cbds-duration-instant", name: "duration/instant", use: "Near-instant state change. The medium Accordion 'snap'." },
  { token: "--cbds-duration-fast", name: "duration/fast", use: "Hover, focus, and small colour or opacity changes." },
  { token: "--cbds-duration-base", name: "duration/base", use: "The default for disclosure and most component transitions." },
  { token: "--cbds-duration-slow", name: "duration/slow", use: "Deliberate motion on large surfaces. Use sparingly." },
];

const EASINGS = [
  { token: "--cbds-easing-standard", name: "easing/standard", use: "Default for elements moving within the viewport." },
  { token: "--cbds-easing-entrance", name: "easing/entrance", use: "Elements entering the screen. Decelerates." },
  { token: "--cbds-easing-exit", name: "easing/exit", use: "Elements leaving. Accelerates away — quicker than entrances." },
  { token: "--cbds-easing-ease-in-out", name: "easing/ease-in-out", use: "Reversible state changes where neither direction dominates." },
  { token: "--cbds-easing-bounce", name: "easing/bounce", use: "Overshoot for playful emphasis. The small Accordion open." },
];

const ALL_TOKENS = [...DURATIONS, ...EASINGS].map((t) => t.token);

/** Reads the live computed value of each token so the page shows what CSS resolved. */
function useTokenValues() {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(ALL_TOKENS.map((t) => [t, cs.getPropertyValue(t).trim()])));
  }, []);
  return values;
}

const shell: React.CSSProperties = {
  padding: 32,
  background: "var(--cbds-bg-base)",
  color: "var(--cbds-text-primary)",
  fontFamily: "var(--cbds-font-family-primary), system-ui, sans-serif",
  minHeight: "100vh",
};
const h2: React.CSSProperties = {
  fontSize: 20, fontWeight: 600, margin: "0 0 4px",
};
const note: React.CSSProperties = {
  fontSize: 14, color: "var(--cbds-text-secondary)", margin: "0 0 20px", maxWidth: "68ch",
};
const row: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(180px, 220px) 90px 1fr",
  gap: 20,
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid var(--cbds-border-tertiary)",
};
const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 13,
};

function MotionSpecimens() {
  const [playing, setPlaying] = useState(0);
  const values = useTokenValues();

  return (
    <div style={shell}>
      {/* The contract every motion token carries: honour the user's preference. */}
      <style>{`@media (prefers-reduced-motion: reduce) {
        .cbds-motion-dot { transition-duration: 1ms !important; }
      }`}</style>
      <h2 style={h2}>Motion</h2>
      <p style={note}>
        Generated from the <code style={mono}>motion primitive</code> collection in Figma.
        Press replay to run every specimen. Every transition built from these tokens must
        collapse to an instant state change under <code style={mono}>prefers-reduced-motion</code>.
      </p>

      <button
        onClick={() => setPlaying((n) => n + 1)}
        style={{
          marginBottom: 24,
          padding: "8px 16px",
          borderRadius: "var(--cbds-corner-radius-100)",
          border: "1px solid var(--cbds-border-control-default)",
          background: "var(--cbds-bg-surface-primary)",
          color: "var(--cbds-text-primary)",
          font: "inherit",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Replay
      </button>

      <h3 style={{ ...h2, fontSize: 16, marginTop: 8 }}>Duration</h3>
      <p style={note}>Held constant easing (standard) so only the timing differs.</p>
      {DURATIONS.map((d) => (
        <div style={row} key={d.token}>
          <div>
            <div style={mono}>{d.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--cbds-text-secondary)", marginTop: 2 }}>{d.use}</div>
          </div>
          <div style={{ ...mono, color: "var(--cbds-text-secondary)" }}>{values[d.token] || "—"}</div>
          <Track key={`${d.token}-${playing}`} duration={`var(${d.token})`} easing="var(--cbds-easing-standard)" />
        </div>
      ))}

      <h3 style={{ ...h2, fontSize: 16, marginTop: 32 }}>Easing</h3>
      <p style={note}>Held constant duration (slow) so only the curve differs.</p>
      {EASINGS.map((e) => (
        <div style={row} key={e.token}>
          <div>
            <div style={mono}>{e.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--cbds-text-secondary)", marginTop: 2 }}>{e.use}</div>
          </div>
          <div style={{ ...mono, color: "var(--cbds-text-secondary)", fontSize: 11 }}>
            {(values[e.token] || "—").replace("cubic-bezier", "")}
          </div>
          <Track key={`${e.token}-${playing}`} duration="var(--cbds-duration-slow)" easing={`var(${e.token})`} />
        </div>
      ))}
    </div>
  );
}

/** A dot that travels the width of its track once, on mount. */
function Track({ duration, easing }: { duration: string; easing: string }) {
  const [at, setAt] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setAt(1));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      style={{
        position: "relative",
        height: 28,
        background: "var(--cbds-bg-surface-secondary)",
        borderRadius: "var(--cbds-corner-radius-100)",
        overflow: "hidden",
        // Establishes the query container so the dot can travel the track's width.
        containerType: "inline-size",
      }}
    >
      <div
        className="cbds-motion-dot"
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "var(--cbds-bg-brand-default)",
          transform: `translateX(calc(${at} * (100cqw - 28px)))`,
          transition: `transform ${duration} ${easing}`,
        }}
      />
    </div>
  );
}

const meta: Meta<typeof MotionSpecimens> = {
  title: "Foundations/Motion",
  component: MotionSpecimens,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Duration and easing tokens, generated from the `motion primitive` collection in Figma. " +
          "The values here are the same ones the interaction annotations on Accordion, Chip, " +
          "Progress bar and Dropdown reference by name.",
      },
    },
  },
};
export default meta;

export const Specimens: StoryObj<typeof MotionSpecimens> = {};
