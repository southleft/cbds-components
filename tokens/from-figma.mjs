/**
 * Builds the canonical W3C DTCG token file from a live Figma variable dump.
 *
 * The dump is produced by the Figma Console MCP plugin bridge (figma_execute),
 * not by figma_export_tokens — that tool serves a cached snapshot that can lag
 * behind the file. Reading through the bridge always reflects current state.
 *
 * Usage: node tokens/from-figma.mjs <dump.json>
 */
import fs from "node:fs";
import path from "node:path";

const dumpPath = process.argv[2];
if (!dumpPath) {
  console.error("usage: node tokens/from-figma.mjs <dump.json>");
  process.exit(1);
}

const envelope = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
const { collections, variables } = envelope.result ?? envelope;

const slug = (s) =>
  String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const segments = (name) => name.split("/").map(slug);

/** DTCG $type for a variable, derived from its Figma type and name. */
function dtcgType(v) {
  if (v.t === "COLOR") return "color";
  if (v.t === "BOOLEAN") return "boolean";
  // Weights are stored as their Figma style name ("Semi Bold"), not a number,
  // so they arrive as STRING — type them by name, not by Figma's storage type.
  if (/^weight-|^font-weight-/.test(v.n)) return "fontWeight";
  if (v.t === "STRING") {
    if (v.n.startsWith("easing/")) return "cubicBezier";
    if (/^font-family|^font-default|^font-secondary/.test(v.n)) return "fontFamily";
    return "string";
  }
  // FLOAT
  if (v.n.startsWith("duration/")) return "duration";
  if (/^(spacing|corner-radius|icon-size|component-size|border-width)\//.test(v.n)) return "dimension";
  if (/^font-size|^line-height/.test(v.n)) return "dimension";
  return "number";
}

/** Renders a raw Figma value into its DTCG representation. */
function dtcgValue(v, raw) {
  const type = dtcgType(v);
  if (type === "duration") return `${raw}ms`;
  if (type === "dimension") return `${raw}px`;
  if (type === "cubicBezier") {
    const m = String(raw).match(/-?\d*\.?\d+/g);
    return m && m.length === 4 ? m.map(Number) : raw;
  }
  return raw;
}

// name -> DTCG path, so aliases can be rewritten as {group.a.b} references
const pathOf = new Map();
for (const v of variables) {
  const group = slug(collections[v.c].name);
  pathOf.set(collections[v.c].name + "::" + v.n, [group, ...segments(v.n)].join("."));
}

function aliasRef(a) {
  const key = a.ac + "::" + a.a;
  const p = pathOf.get(key);
  return p ? `{${p}}` : null;
}

const tree = {};
let aliasCount = 0, rawCount = 0, unresolved = [];

for (const v of variables) {
  const col = collections[v.c];
  const group = slug(col.name);
  const segs = segments(v.n);
  let node = (tree[group] ??= {});
  for (const s of segs.slice(0, -1)) node = (node[s] ??= {});
  const leaf = segs[segs.length - 1];

  const modeNames = col.modes;
  const defaultMode = modeNames[0];
  const type = dtcgType(v);

  const render = (modeVal) => {
    if (modeVal && typeof modeVal === "object" && "a" in modeVal) {
      const ref = aliasRef(modeVal);
      if (!ref) { unresolved.push(`${v.n} -> ${modeVal.ac}/${modeVal.a}`); return null; }
      aliasCount++;
      return ref;
    }
    rawCount++;
    return dtcgValue(v, modeVal);
  };

  const token = { $type: type, $value: render(v.m[defaultMode]) };
  if (v.d) token.$description = v.d;

  // Modes are not part of the DTCG core spec; carry them in $extensions so the
  // build can emit one stylesheet per mode without losing the default value.
  if (modeNames.length > 1) {
    const modes = {};
    for (const m of modeNames) if (m in v.m) modes[m] = render(v.m[m]);
    token.$extensions = { "com.figma.modes": modes };
  }
  if (v.s && v.s !== "ALL_SCOPES") {
    token.$extensions = { ...(token.$extensions ?? {}), "com.figma.scopes": v.s.split("|") };
  }
  node[leaf] = token;
}

const doc = {
  $description:
    "CBDS design tokens, generated from the CBDS UI Kit Demo Figma file. " +
    "Canonical source of truth — do not hand-edit; regenerate from Figma instead.",
  $extensions: {
    "com.figma.source": { file: "CBDS UI Kit Demo", fileKey: "WofZT8xaxXuc2Q6Je9S4XE" },
    "com.figma.collections": collections.map((c) => ({ name: c.name, modes: c.modes })),
    generatedAt: new Date().toISOString().slice(0, 10),
  },
  ...tree,
};

const outDir = path.resolve("tokens/dtcg");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "tokens.tokens.json");
fs.writeFileSync(outFile, JSON.stringify(doc, null, 2) + "\n");

console.log(`DTCG written: ${outFile}`);
console.log(`  collections: ${collections.length}`);
console.log(`  tokens:      ${variables.length}  (${aliasCount} alias refs, ${rawCount} literals)`);
if (unresolved.length) {
  console.warn(`  UNRESOLVED ALIASES (${unresolved.length}):`);
  unresolved.slice(0, 10).forEach((u) => console.warn("    " + u));
}
