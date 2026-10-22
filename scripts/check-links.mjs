import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXTS = new Set(['.ts', '.tsx', '.css']);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist') continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

const files = walk('src');

// Collect every `to="..."` / `href="/..."` / `to={"/..."}` literal.
const linkPattern = /(?:to|href)\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*"([^"]+)"\s*\}|\{\s*`([^`]+)`\s*\})/g;

const found = new Map();

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const value = match[1] ?? match[2] ?? match[3] ?? match[4];
    if (!value) continue;
    if (!value.startsWith('/')) continue;
    if (!found.has(value)) found.set(value, new Set());
    found.get(value).add(file.replace(/\\/g, '/'));
  }
}

// Known-good route prefixes. Any link that does not resolve to one of these
// patterns is reported.
const KNOWN = [
  '/',
  '/services',
  '/specialties',
  '/about',
  '/how-it-works',
  '/resources',
  '/faq',
  '/contact',
  '/request-a-quote',
  '/privacy',
  '/terms',
];

const DYNAMIC = [
  /^\/services\/[a-z0-9-]+$/,
  /^\/resources\/[a-z0-9-]+$/,
];

// Pull real slugs out of the data modules so we can be strict.
const services = readFileSync('src/data/services.ts', 'utf8');
const serviceHrefs = [...services.matchAll(/href:\s*"(\/services\/[a-z0-9-]+)"/g)].map((m) => m[1]);

const articles = readFileSync('src/data/articles.ts', 'utf8');
const articleSlugs = [...articles.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => `/resources/${m[1]}`);

const valid = new Set([...KNOWN, ...serviceHrefs, ...articleSlugs]);

let broken = 0;
console.log(`Found ${found.size} distinct internal links.\n`);

for (const [link, sources] of [...found.entries()].sort()) {
  // Template literals such as `/resources/${guide.slug}` are resolved at
  // runtime from the data modules, so they are checked by pattern instead.
  if (link.includes('${')) {
    const matchesPattern = DYNAMIC.some((re) =>
      re.test(link.replace(/\$\{[^}]+\}/g, 'dynamic-slug')),
    );
    console.log(
      `${matchesPattern ? 'OK  ' : 'BROKEN'} ${link}   (dynamic)${
        matchesPattern ? '' : `   referenced in: ${[...sources].join(', ')}`
      }`,
    );
    if (!matchesPattern) broken += 1;
    continue;
  }

  const isKnown = valid.has(link) || DYNAMIC.some((re) => re.test(link));
  if (isKnown) {
    console.log(`OK   ${link}`);
  } else {
    broken += 1;
    console.log(`BROKEN ${link}   referenced in: ${[...sources].join(', ')}`);
  }
}

console.log(`\n${broken === 0 ? 'No broken internal links.' : `${broken} broken internal link(s).`}`);
process.exit(broken === 0 ? 0 : 1);
