import { createRoot } from "react-dom/client";
import { House } from "@phosphor-icons/react";
import "./styles/tokens.css";
import "./styles/tokens.dark.css";
import "./styles/tokens.brutalist.css";
import "./styles/reset.css";
import "./styles/theme.css";
import { Chip, Icon, ProgressBar } from "./components";

/* eslint-disable react-refresh/only-export-components -- entry point, not a refresh boundary */

/**
 * Standalone smoke test for the component library, outside Storybook.
 * Run `npm run storybook` for the real thing.
 */
function App() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Icon icon={House} />
        <Chip label="Primitives" />
        <Chip label="Atomics" type="neutral" variant="outline" />
      </div>
      <ProgressBar value={60} label="Progress" showValue />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
