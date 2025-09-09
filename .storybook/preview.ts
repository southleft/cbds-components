import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/tokens.dark.css";
import "../src/styles/reset.css";
import "../src/styles/theme.css";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Light or dark theme",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" }
      ]
    }
  }
};

const withTheme = (Story, context) => {
  const theme = context.globals.theme;
  document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  return Story();
};

export const decorators = [withTheme];

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;