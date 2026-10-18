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
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],

  features: { componentsManifest: true },

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
    // Story UI: keep Vite's own module watcher alive on macOS. Storybook's story
    // INDEX watcher and Vite's MODULE watcher are different watchers. Measured on
    // a Storybook running for seven hours: a story rewritten on disk was never
    // re-transformed — still serving the previous bytes after 90 seconds — so a
    // repair was re-checked against the render it was meant to replace. With
    // polling the same edit was served in 1 second.
    if (process.platform === 'darwin') {
      config.server = {
        ...config.server,
        watch: { ...(config.server?.watch ?? {}), usePolling: true, interval: 300 },
      };
    }
    return config;
  },
};

export default config;