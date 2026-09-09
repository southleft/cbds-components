/**
 * Copy the generated token stylesheets into the package output.
 *
 * Component CSS Modules are bundled by Vite into `dist/styles.css`, but the
 * token layer is global side-effect CSS that no component imports, so the
 * bundler never sees it. Without this step the package ships components whose
 * every `var(--cbds-*)` resolves to nothing.
 */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "src/styles";
const OUT = "dist/tokens";

const FILES = [
  "tokens.css",
  "tokens.dark.css",
  "tokens.brutalist.css",
  "theme.css",
  "reset.css",
];

await mkdir(OUT, { recursive: true });
for (const file of FILES) {
  await copyFile(path.join(SRC, file), path.join(OUT, file));
}

console.log(`Copied ${FILES.length} token stylesheets to ${OUT}/`);
