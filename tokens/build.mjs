import fs from "node:fs";
import path from "node:path";
import StyleDictionary from "style-dictionary";

const outDir = path.resolve("src/styles");
fs.mkdirSync(outDir, { recursive: true });

// Convert to kebab case for CSS variable names
const toKebab = s => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/\./g, "-").replace(/[_\s]+/g, "-").toLowerCase();

// Register custom transform for CBDS prefixed kebab names
StyleDictionary.registerTransform({
  name: "name/cbds-kebab",
  type: "name",
  transform: prop => `cbds-${toKebab(prop.path.join("-"))}`
});

// Transform for spacing tokens (convert to rem)
StyleDictionary.registerTransform({
  name: "spacing/rem",
  type: "value",
  filter: token => {
    const pathStr = token.path.join("-");
    // Only apply to actual spacing tokens, not icon/component sizes
    return pathStr.includes("spacing") && 
           !pathStr.includes("icon") && 
           !pathStr.includes("component");
  },
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value / 16}rem`;
  }
});

// Transform for icon-size tokens (add px unit)
StyleDictionary.registerTransform({
  name: "iconSize/px",
  type: "value",
  filter: token => token.path[0] === "icon-size",
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value}px`;
  }
});

// Transform for component-size tokens (add px unit)
StyleDictionary.registerTransform({
  name: "componentSize/px",
  type: "value",
  filter: token => token.path[0] === "component-size",
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value}px`;
  }
});

// Transform for corner-radius tokens (add px unit)
StyleDictionary.registerTransform({
  name: "cornerRadius/px",
  type: "value",
  filter: token => token.path[0] === "corner-radius",
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value}px`;
  }
});

// Transform for line-height tokens (add px unit)
StyleDictionary.registerTransform({
  name: "lineHeight/px",
  type: "value",
  filter: token => token.path.includes("lineHeights") || token.path.includes("line-heights"),
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value}px`;
  }
});

// Transform for font-size tokens (add px unit)
StyleDictionary.registerTransform({
  name: "fontSize/px",
  type: "value",
  filter: token => token.path.includes("fontSize") || token.path.includes("font-size"),
  transform: token => {
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value}px`;
  }
});

StyleDictionary.registerTransform({
  name: "shadow/css-shorthand",
  type: "value", 
  filter: token => token.type === "boxShadow",
  transform: token => {
    const shadow = token.value;
    if (typeof shadow !== 'object') return shadow;
    
    const x = shadow.x || 0;
    const y = shadow.y || 0;
    const blur = shadow.blur || 0;
    const spread = shadow.spread || 0;
    const color = shadow.color || '#000000';
    
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }
});

StyleDictionary.registerTransform({
  name: "typography/css-shorthand",
  type: "value",
  filter: token => token.type === "typography",
  transform: token => {
    const typo = token.value;
    if (typeof typo !== 'object') return typo;
    
    // Return individual properties instead of shorthand
    return {
      fontFamily: typo.fontFamily,
      fontSize: typo.fontSize,
      fontWeight: typo.fontWeight,
      lineHeight: typo.lineHeight,
      letterSpacing: typo.letterSpacing,
    };
  }
});

// Function to clean up invalid references in Token Studio tokens
function cleanTokenReferences(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(cleanTokenReferences);
  }
  
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.includes('{undefined}')) {
      // Skip tokens with undefined references
      continue;
    }
    
    if (typeof value === 'object' && value !== null) {
      if (value.value && typeof value.value === 'object') {
        // Check if this is a typography token with undefined references
        const typographyValue = value.value;
        if (typeof typographyValue === 'object') {
          let hasUndefined = false;
          for (const prop of Object.values(typographyValue)) {
            if (typeof prop === 'string' && prop.includes('{undefined}')) {
              hasUndefined = true;
              break;
            }
          }
          if (hasUndefined) {
            continue; // Skip this entire token
          }
        }
      }
      cleaned[key] = cleanTokenReferences(value);
    } else {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
}

// Function to load and merge Token Studio JSON files
function loadTokenStudioTokens() {
  const tokensDir = path.resolve("tokens/json");
  
  try {
    // Load all token files
    const globalTokens = JSON.parse(fs.readFileSync(path.join(tokensDir, "global.json"), "utf8"));
    const primitiveColors = JSON.parse(fs.readFileSync(path.join(tokensDir, "colour primitive/Mode 1.json"), "utf8"));
    const primitiveNumbers = JSON.parse(fs.readFileSync(path.join(tokensDir, "number primitive/Mode 1.json"), "utf8"));
    const lightSemanticColors = JSON.parse(fs.readFileSync(path.join(tokensDir, "colour semantic/Light.json"), "utf8"));
    const darkSemanticColors = JSON.parse(fs.readFileSync(path.join(tokensDir, "colour semantic/Dark.json"), "utf8"));
    
    // Clean up invalid references
    const cleanedGlobalTokens = cleanTokenReferences(globalTokens);
    const cleanedPrimitiveColors = cleanTokenReferences(primitiveColors);
    const cleanedPrimitiveNumbers = cleanTokenReferences(primitiveNumbers);
    const cleanedLightSemanticColors = cleanTokenReferences(lightSemanticColors);
    const cleanedDarkSemanticColors = cleanTokenReferences(darkSemanticColors);
    
    // Merge primitive tokens
    const primitiveTokens = {
      ...cleanedPrimitiveColors,
      ...cleanedPrimitiveNumbers,
      ...cleanedGlobalTokens
    };
    
    // Create light theme tokens
    const lightTokens = {
      ...primitiveTokens,
      ...cleanedLightSemanticColors
    };
    
    // Create dark theme tokens
    const darkTokens = {
      ...primitiveTokens,
      ...cleanedDarkSemanticColors
    };
    
    return { lightTokens, darkTokens };
  } catch (error) {
    console.error("Error loading Token Studio tokens:", error);
    throw error;
  }
}

// Transform group for different token types
// Order matters - value transforms should come before name transforms
const tokenTransformGroup = [
  "attribute/cti",
  "color/css",
  "lineHeight/px",
  "fontSize/px",
  "iconSize/px",      // Apply unit transforms before name transform
  "componentSize/px", // Apply unit transforms before name transform
  "cornerRadius/px",  // Apply unit transforms before name transform
  "spacing/rem",
  "shadow/css-shorthand",
  "name/cbds-kebab"  // Name transform should be last
];

function build() {
  try {
    const { lightTokens, darkTokens } = loadTokenStudioTokens();
    
    // Write temporary token files for Style Dictionary
    const tempDir = path.resolve("tokens/temp");
    fs.mkdirSync(tempDir, { recursive: true });
    
    fs.writeFileSync(path.join(tempDir, "light.json"), JSON.stringify(lightTokens, null, 2));
    fs.writeFileSync(path.join(tempDir, "dark.json"), JSON.stringify(darkTokens, null, 2));
    
    // Build light theme
    console.log("Building light theme tokens...");
    const lightSD = new StyleDictionary({
      source: [path.join(tempDir, "light.json")],
      platforms: {
        css: {
          transforms: tokenTransformGroup,
          buildPath: "src/styles/",
          files: [{
            destination: "tokens.css",
            format: "css/variables",
            options: { 
              selector: ":root", 
              outputReferences: true 
            },
            filter: token => {
              // Filter out certain token types that should be handled specially
              if (token.type === "typography") return false;
              return true;
            }
          }]
        }
      }
    });

    // Build dark theme
    console.log("Building dark theme tokens...");
    const darkSD = new StyleDictionary({
      source: [path.join(tempDir, "dark.json")],
      platforms: {
        css: {
          transforms: tokenTransformGroup,
          buildPath: "src/styles/",
          files: [{
            destination: "tokens.dark.css",
            format: "css/variables",
            options: { 
              selector: ":root[data-theme='dark']", 
              outputReferences: true 
            },
            filter: token => {
              // Only include semantic tokens for dark theme, not primitives
              const isSemanticToken = token.path.some(p => 
                ['bg', 'text', 'icon', 'border', 'utility'].includes(p)
              );
              if (token.type === "typography") return false;
              return isSemanticToken;
            }
          }]
        }
      }
    });

    // Build the platforms
    lightSD.buildAllPlatforms();
    darkSD.buildAllPlatforms();

    // Generate TypeScript definitions from light file
    setTimeout(() => {
      try {
        const css = fs.readFileSync("src/styles/tokens.css", "utf8");
        const vars = Array.from(css.matchAll(/--([a-z0-9-]+):/g)).map(m => `--${m[1]}`);
        const dts = `export type CBDSToken = ${vars.map(v => `'${v}'`).join(" | ")};\n`;
        fs.writeFileSync("src/styles/tokens.d.ts", dts);
        console.log("TypeScript definitions generated.");
      } catch (err) {
        console.warn("Could not generate TypeScript definitions:", err.message);
      }
    }, 100);

    // Clean up temporary files
    setTimeout(() => {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log("Temporary files cleaned up.");
      } catch (err) {
        console.warn("Could not clean up temporary files:", err.message);
      }
    }, 200);

  } catch (error) {
    console.error("Error building tokens:", error);
    process.exit(1);
  }
}

build();