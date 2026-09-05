/**
 * CBDS token build.
 *
 *   Figma variables ──> tokens/dtcg/tokens.tokens.json  (W3C DTCG, canonical)
 *   Figma styles    ──> tokens/json/global.json          (elevation + text styles)
 *                                    │
 *                                    ▼
 *                     src/styles/tokens.css          (:root — light)
 *                     src/styles/tokens.dark.css     ([data-theme='dark'])
 *                     src/styles/tokens.brutalist.css([data-theme='brutalist'])
 *                     src/styles/tokens.d.ts
 *
 * Regenerate the DTCG from Figma with:
 *   node tokens/from-figma.mjs <dump.json>
 *
 * The build also reports drift: any --cbds-* variable a component references
 * that no token actually defines.
 */
import fs from "node:fs";
import path from "node:path";

const DTCG_PATH = "tokens/dtcg/tokens.tokens.json";
const GLOBAL_PATH = "tokens/json/global.json";
const OUT_DIR = "src/styles";

// Collection groups are a Figma organizing concept, not part of the public
// token name — `color-semantic.bg.brand.default` ships as `--cbds-bg-brand-default`.
const COLLECTION_GROUPS = new Set([
  "color-primitive", "color-semantic", "number-primitive",
  "text-primitive", "text-semantic", "motion-primitive",
]);

const varName = (segs) => `--cbds-${segs.join("-")}`;
const publicPath = (segs) =>
  COLLECTION_GROUPS.has(segs[0]) ? segs.slice(1) : segs;

/* ------------------------------------------------------------------ values */

const px = (v) => parseFloat(v);

// Figma stores weights as their style names; CSS wants the numeric axis.
const FONT_WEIGHTS = {
  thin: 100, extralight: 200, light: 300, regular: 400, normal: 400,
  medium: 500, semibold: 600, "semi-bold": 600, bold: 700,
  extrabold: 800, black: 900,
};

function renderValue(token, segs) {
  const raw = token.$value;
  const type = token.$type;
  const name = segs.join("-");

  if (typeof raw === "string" && raw.startsWith("{") && raw.endsWith("}")) {
    const target = publicPath(raw.slice(1, -1).split("."));
    return `var(${varName(target)})`;
  }
  if (type === "cubicBezier" && Array.isArray(raw)) return `cubic-bezier(${raw.join(", ")})`;
  if (type === "duration") return String(raw);
  if (type === "fontWeight") {
    const key = String(raw).toLowerCase().replace(/\s+/g, "");
    return String(FONT_WEIGHTS[key] ?? FONT_WEIGHTS[String(raw).toLowerCase()] ?? raw);
  }
  if (type === "boolean") return String(raw);
  if (type === "dimension") {
    const n = px(raw);
    // Spacing ships in rem so it scales with the user's root font size.
    if (name.startsWith("spacing")) {
      const sign = n < 0 ? "-" : "";
      return `${sign}${Math.abs(n) / 16}rem`;
    }
    // Line heights are absolute px in Figma, not multipliers: font-size-100 is
    // 12px against line-height-100 of 16px (1.33), rising to 1.60 at the top of
    // the ramp. Emitting them unitless would compute 16 * font-size.
    return `${n}px`;
  }
  return String(raw);
}

/* ------------------------------------------------------------- DTCG walking */

function collect(node, segs, out, modeName) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (!value || typeof value !== "object") continue;
    const next = [...segs, key];
    if ("$value" in value) {
      const modes = value.$extensions?.["com.figma.modes"];
      let token = value;
      if (modeName) {
        // Theme files carry only what that theme actually overrides. A token
        // with a single mode is theme-independent and belongs in :root only.
        if (!modes || !(modeName in modes)) continue;
        token = { ...value, $value: modes[modeName] };
      }
      const pub = publicPath(next);
      out.push({
        name: varName(pub),
        value: renderValue(token, pub),
        description: value.$description ?? "",
        hasModes: Boolean(modes),
      });
    } else {
      collect(value, next, out, modeName);
    }
  }
}

/* ------------------------------------------- Figma styles (global.json) */

function collectGlobal(out) {
  if (!fs.existsSync(GLOBAL_PATH)) return;
  const g = JSON.parse(fs.readFileSync(GLOBAL_PATH, "utf8"));

  for (const [key, tok] of Object.entries(g.elevation ?? {})) {
    const s = tok.value;
    out.push({
      name: `--cbds-elevation-${key}`,
      value: `${s.x}px ${s.y}px ${s.blur}px ${s.spread ?? 0}px ${s.color}`,
      description: "Elevation shadow, from the Figma effect style of the same name.",
    });
  }
  // Tokens Studio exported the family as `fontFamilies.inter`; the public name
  // is role-based so the typeface can change without touching component CSS.
  for (const [key, tok] of Object.entries(g.fontFamilies ?? {})) {
    out.push({
      name: key === "inter" ? "--cbds-font-family-primary" : `--cbds-font-family-${key}`,
      value: tok.value,
      description: "Primary typeface, from the Figma text styles.",
    });
  }
  // Legacy Tokens Studio spellings, kept so older component CSS keeps resolving.
  // Prefer the semantic text tokens (label/font-medium, body/line-height-large)
  // over these auto-numbered indices in new work.
  for (const [key, tok] of Object.entries(g.lineHeights ?? {}))
    out.push({ name: `--cbds-line-heights-${key}`, value: `${parseFloat(tok.value)}px`, description: "" });
  for (const [key, tok] of Object.entries(g.fontSize ?? {}))
    out.push({ name: `--cbds-font-size-${key}`, value: `${parseFloat(tok.value)}px`, description: "" });
}

/* -------------------------------------------------------------- emit */

const banner = (note) =>
  `/**\n * CBDS design tokens — generated from Figma. Do not edit directly.\n * ${note}\n */\n\n`;

function emit(file, selector, tokens, note) {
  const seen = new Set();
  const lines = [];
  for (const t of tokens) {
    if (seen.has(t.name)) continue;
    seen.add(t.name);
    lines.push(`  ${t.name}: ${t.value};`);
  }
  const css = banner(note) + `${selector} {\n${lines.join("\n")}\n}\n`;
  fs.writeFileSync(path.join(OUT_DIR, file), css);
  return seen;
}

function main() {
  if (!fs.existsSync(DTCG_PATH)) {
    console.error(`Missing ${DTCG_PATH}. Run: node tokens/from-figma.mjs <dump.json>`);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const dtcg = JSON.parse(fs.readFileSync(DTCG_PATH, "utf8"));

  // Light: every token at its default mode, plus the style-derived tokens.
  const light = [];
  collect(dtcg, [], light, null);
  collectGlobal(light);
  const defined = emit("tokens.css", ":root", light, "Light theme + primitives.");

  // Theme overrides: only tokens that actually declare that mode.
  for (const [mode, file, selector] of [
    ["Dark", "tokens.dark.css", ":root[data-theme='dark']"],
    ["Brutalist", "tokens.brutalist.css", ":root[data-theme='brutalist']"],
  ]) {
    const themed = [];
    collect(dtcg, [], themed, mode);
    emit(file, selector, themed, `${mode} theme overrides.`);
    console.log(`  ${file}: ${themed.length} overrides`);
  }

  // Types
  const names = [...defined].sort();
  fs.writeFileSync(
    path.join(OUT_DIR, "tokens.d.ts"),
    `// Generated from Figma. Do not edit directly.\n` +
      `export type CBDSToken =\n${names.map((n) => `  | '${n}'`).join("\n")};\n`
  );

  console.log(`  tokens.css: ${defined.size} custom properties`);

  // Drift check: does every token a component references actually exist?
  const cssFiles = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".module.css")) cssFiles.push(p);
    }
  };
  if (fs.existsSync("src/components")) walk("src/components");
  const used = new Set();
  for (const f of cssFiles)
    for (const m of fs.readFileSync(f, "utf8").matchAll(/var\((--cbds-[a-z0-9-]+)/g)) used.add(m[1]);
  const missing = [...used].filter((u) => !defined.has(u)).sort();
  if (missing.length) {
    console.warn(`\n  DRIFT: ${missing.length} token(s) referenced by components but not defined:`);
    missing.forEach((m) => console.warn(`    ${m}`));
  } else {
    console.log(`  drift: none — all ${used.size} referenced tokens resolve`);
  }
}

main();
