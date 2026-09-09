import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Standalone smoke-test app (`npm run dev` / `npm run build`).
 *
 * Outputs to `dist-app/` so it can never collide with `dist/`, which belongs
 * to the library build in `vite.lib.config.ts` and is what `npm pack` ships.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-app',
  },
});
