import type { Preview } from "@storybook/react-vite";
import "../src/styles/tokens.css";
import "../src/styles/tokens.dark.css";
import "../src/styles/tokens.brutalist.css";
import "../src/styles/reset.css";
import "../src/styles/theme.css";

/**
 * The three modes come straight from the `color semantic` collection in Figma.
 * Each maps to a `[data-theme]` selector emitted by `npm run tokens`.
 */
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Color mode — mirrors the Figma color semantic collection",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      dynamicTitle: true,
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
        { value: "brutalist", title: "Brutalist" },
      ],
    },
  },
};

const THEMES = ["light", "dark", "brutalist"] as const;
type Theme = (typeof THEMES)[number];

const withTheme = (Story, context) => {
  const theme: Theme = THEMES.includes(context.globals.theme) ? context.globals.theme : "light";
  document.documentElement.setAttribute("data-theme", theme);
  // Keep the UA in step so form controls and scrollbars match the token set.
  document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
  return Story();
};

export const decorators = [withTheme];

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: ["Welcome", "Foundations", "Primitives", "Atomics", "*"],
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
