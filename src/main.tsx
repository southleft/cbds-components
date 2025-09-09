import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/tokens.dark.css";
import "./styles/reset.css";
import "./styles/theme.css";
import { Card } from "./components/Card/Card";
import { Button } from "./components/Button/Button";
import { TextField } from "./components/TextField/TextField";

/**
 * Demo app showcasing Tenet UI components
 * This runs outside of Storybook for standalone testing
 */
function App() {
  return (
    <div style={{ padding: "24px" }}>
      <Card title="Demo Form">
        <TextField label="Name" placeholder="Enter your name" />
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "16px" }}>
          <Button variant="primary">Submit</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </Card>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
