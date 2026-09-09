import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

/**
 * Library build — packages `src/components` for consumption in a product.
 *
 * Distinct from `vite.config.ts`, which builds the standalone smoke-test app.
 * Only what `src/index.ts` exports ends up in the bundle, so Storybook, the
 * stories, Story UI and `src/main.tsx` never ship.
 */
export default defineConfig({
  plugins: [react()],
  // public/ holds assets for the smoke-test app, not the package.
  publicDir: false,
  css: {
    modules: {
      // Locals are already BEM-prefixed (cbds-c-chip), so the hash alone scopes them.
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // One stylesheet for the whole library rather than per-component chunks.
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      /* Peers and runtime deps resolve from the consuming app. React in
         particular must not be bundled — two copies break hooks. */
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@phosphor-icons/react',
        'clsx',
      ],
      output: {
        assetFileNames: 'styles.css',
      },
    },
  },
});
