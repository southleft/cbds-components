import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],

  tags: {
    "voice-canvas-internal": {
      defaultFilterSelection: "exclude",
    },
  },

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],

  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ['../public']
};

export default config;