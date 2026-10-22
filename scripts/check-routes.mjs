const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:5173';

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
  '/favicon.svg',
  '/og-image.svg',
];

let failures = 0;

for (const route of ROUTES) {
  try {
    const res = await fetch(`${BASE}${route}`);
    const body = res.ok ? await res.text() : '';
    const isSpa = route.endsWith('.svg') ? true : body.includes('<div id="root">');
    const status = res.status === 200 && isSpa ? 'OK  ' : 'FAIL';
    if (status === 'FAIL') failures += 1;
    console.log(`${status} ${res.status}  ${route}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL err   ${route}  ${error.message}`);
  }
}

console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes OK`);
process.exit(failures === 0 ? 0 : 1);
