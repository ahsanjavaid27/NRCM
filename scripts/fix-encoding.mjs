import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'public'];
const ROOT_FILES = [
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.node.json',
  'README.md',
  '.gitignore',
];
const EXTS = new Set(['.ts', '.tsx', '.css', '.html', '.json', '.md', '.svg']);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

const strict = new TextDecoder('utf-8', { fatal: true });
const cp = new TextDecoder('windows-1252');

// Mojibake -> correct unicode (applied after decoding to ensure round-trip correctness).
const REPLACEMENTS = [
  ['\u00e2\u20ac\u201d', '\u2014'], // em dash
  ['\u00e2\u20ac\u201c', '\u2013'], // en dash
  ['\u00e2\u20ac\u2122', '\u2019'], // right single quote
  ['\u00e2\u20ac\u0153', '\u201c'], // left double quote
  ['\u00e2\u20ac\u0152', '\u201d'], // right double quote
  ['\u00e2\u20ac\u2020', '\u2026'], // ellipsis
  ['\u00e2\u20ac\u0178', '\u00ff'],
  ['\u00c2\u00b7', '\u00b7'], // middle dot
  ['\u00c2\u00a0', '\u00a0'],
];

function repair(text) {
  let t = text;
  for (const [from, to] of REPLACEMENTS) {
    if (!t.includes(from)) continue;
    t = t.split(from).join(to);
  }
  return t;
}

const dirs = ROOTS.flatMap((r) => walk(r));
for (const f of ROOT_FILES) {
  try {
    statSync(f);
    dirs.push(f);
  } catch {
    /* not present */
  }
}

console.log(`Scanning ${dirs.length} files for encoding issues...`);

let fixed = 0;
for (const file of dirs) {
  const buf = readFileSync(file);
  let text = null;
  let wasInvalid = false;
  try {
    text = strict.decode(buf);
  } catch {
    wasInvalid = true;
    text = cp.decode(buf);
  }
  const repaired = repair(text);
  if (wasInvalid || repaired !== text) {
    writeFileSync(file, repaired, 'utf8');
    fixed += 1;
    console.log(`Fixed: ${file.replace(/\\/g, '/')}`);
  }
}

console.log(`Done. ${fixed} file(s) updated.`);
