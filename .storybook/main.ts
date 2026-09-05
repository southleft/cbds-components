import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(ts|tsx)",
    '../src/stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'
  ],

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
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // Story UI: Exclude from dependency optimization to handle CSS imports correctly
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        ...(config.optimizeDeps?.exclude || []),
        '@tpitre/story-ui'
      ],
      // Excluding '@tpitre/story-ui' means Vite serves it (and everything it
      // imports) unbundled and never interops the CommonJS-only packages on
      // that path — '@radix-ui/themes' imports CJS-only 'classnames', which
      // otherwise fails in the browser with "does not provide an export named
      // 'default'" and the Story UI workspace never mounts. The '>' chains
      // tell Vite to pre-bundle those packages anyway.
      include: [
        ...(config.optimizeDeps?.include || []),
        '@tpitre/story-ui > @radix-ui/themes > classnames'
      ]
    };
    return config;
  },
};

export default config;