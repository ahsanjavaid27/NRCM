// Server-side render smoke test.
// Renders every route through the real React tree to catch runtime errors
// (bad imports, undefined data lookups, invalid hooks) that a TypeScript
// compile would not detect.
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROUTES = [
  '/',
  '/services',
  '/services/medical-billing',
  '/services/revenue-cycle-management',
  '/services/denial-management',
  '/services/claims-management',
  '/services/credentialing',
  '/services/payment-posting',
  '/services/eligibility-verification',
  '/services/accounts-receivable',
  '/specialties',
  '/about',
  '/how-it-works',
  '/resources',
  '/resources/medical-billing-basics',
  '/resources/understanding-claim-denials',
  '/resources/revenue-cycle-management',
  '/faq',
  '/contact',
  '/request-a-quote',
  '/privacy',
  '/terms',
  '/this-route-does-not-exist',
];

// The app is compiled to an SSR bundle first:
//   npx vite build --ssr src/ssr-entry.tsx --outDir dist-ssr
const { App } = await import('../dist-ssr/ssr-entry.mjs');

let failures = 0;

for (const route of ROUTES) {
  try {
    const html = renderToString(
      createElement(StaticRouter, { location: route }, createElement(App)),
    );
    const ok = html.length > 200 && html.includes('<header');
    if (!ok) {
      failures += 1;
      console.log(`FAIL  ${route}  (rendered ${html.length} chars, no header found)`);
    } else {
      console.log(`OK    ${route}  (${html.length} chars)`);
    }
  } catch (error) {
    failures += 1;
    console.log(`FAIL  ${route}\n      ${error.message}`);
  }
}

console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes rendered successfully.`);
process.exit(failures === 0 ? 0 : 1);
