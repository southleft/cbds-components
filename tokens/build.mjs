import fs from "node:fs";
import path from "node:path";
import StyleDictionary from "style-dictionary";

const outDir = path.resolve("src/styles");
fs.mkdirSync(outDir, { recursive: true });

// Convert to kebab case for CSS variable names
const toKebab = s => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/\./g, "-").replace(/[_\s]+/g, "-").toLowerCase();

// Register custom transform for Tenet prefixed kebab names
StyleDictionary.registerTransform({
  name: "name/tenet-kebab",
  type: "name",
  transform: prop => `tenet-${toKebab(prop.path.join("-"))}`
});

function build() {
  // Build light theme
  const lightSD = new StyleDictionary({
    source: ["tokens/source/tenet.tokens.json"],
    platforms: {
      css: {
        transforms: ["attribute/cti", "name/tenet-kebab", "color/css"],
        buildPath: "src/styles/",
        files: [{
          destination: "tokens.css",
          format: "css/variables",
          options: { 
            selector: ":root", 
            outputReferences: true 
          }
        }]
      }
    }
  });

  // Build dark theme
  const darkSD = new StyleDictionary({
    source: ["tokens/source/tenet.tokens.dark.json"],
    platforms: {
      css: {
        transforms: ["attribute/cti", "name/tenet-kebab", "color/css"],
        buildPath: "src/styles/",
        files: [{
          destination: "tokens.dark.css",
          format: "css/variables",
          options: { 
            selector: ":root[data-theme='dark']", 
            outputReferences: true 
          }
        }]
      }
    }
  });

  console.log("Building light theme tokens...");
  lightSD.buildAllPlatforms();
  
  console.log("Building dark theme tokens...");
  darkSD.buildAllPlatforms();

  // Generate TypeScript definitions from light file
  setTimeout(() => {
    try {
      const css = fs.readFileSync("src/styles/tokens.css", "utf8");
      const vars = Array.from(css.matchAll(/--([a-z0-9-]+):/g)).map(m => `--${m[1]}`);
      const dts = `export type TenetVar = ${vars.map(v => `'${v}'`).join(" | ")};\n`;
      fs.writeFileSync("src/styles/tokens.d.ts", dts);
      console.log("TypeScript definitions generated.");
    } catch (err) {
      console.warn("Could not generate TypeScript definitions:", err.message);
    }
  }, 100);
}

build();