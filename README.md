# NexaRCM — Medical Billing & Revenue Cycle Management Website

A premium, multi-page marketing website for a US-focused medical billing and
revenue cycle management (RCM) company. Built with React, TypeScript, Vite,
React Router, Lucide icons, and Motion for animation.

> **Note on branding.** `NexaRCM` is a placeholder brand. Every company name,
> contact detail, color, and social link lives in one file —
> `src/data/brand.ts` — so the real business can be swapped in quickly.

---

## 1. Requirements

You only need:

- **Node.js 18 or newer** (developed on Node 24)
- **npm** (ships with Node)

Check your versions:

```bash
node -v
npm -v
```

## 2. Setup

From the project folder:

```bash
npm install
```

> On Windows, if PowerShell blocks `npm`, use `npm.cmd install` instead.

## 3. Run the development server

```bash
npm run dev
```

Then open the URL Vite prints, by default:

```
http://localhost:5173
```

To use a different port:

```bash
npm run dev -- --port 3000
```

## 4. Build for production

```bash
npm run build
```

This runs the TypeScript compiler first (`tsc`) and then bundles the app into
the `dist/` folder. Type errors fail the build, so a green build means the
code is type-safe.

Preview the production build locally:

```bash
npm run preview
```

## 5. Deploy

The output in `dist/` is a static site and can be hosted on Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3, or any static host.

**Client-side routing needs a rewrite rule.** Without it, opening a nested URL
directly (for example `/services/denial-management`) returns a 404 from the
host instead of the app.

- **Netlify** — `public/_redirects` is already included and deployed with the
  site. No further configuration needed.
- **Vercel** — add a `vercel.json` at the project root:

  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/" }]
  }
  ```

- **Other hosts** — configure the server to serve `index.html` for any path
  that does not match a real file (often called an "SPA fallback" or
  "clean URLs" rule).

## 6. Customizing the brand and contact information

Everything you need to change lives in **`src/data/brand.ts`**:

```ts
export const BRAND = {
  name: "NexaRCM",
  tagline: "Precision Revenue Cycle Management for US Healthcare Providers",
  description: "...",
  colors: {
    primary: "#0f172a",
    secondary: "#1e293b",
    accent: "#10b981",
    light: "#f1f5f9",
    dark: "#020617",
    muted: "#64748b",
    accentDark: "#059669",
  },
  contact: {
    phone: "+1 (800) 555-0123",
    email: "hello@nexarcm.com",
    address: "123 Healthcare Plaza, Boston, MA 02108",
    hours: "Mon-Fri: 9AM - 6PM EST",
  },
  social: {
    linkedin: "https://linkedin.com/company/nexarcm",
    twitter: "https://twitter.com/nexarcm",
  },
};
```

`BRAND` is consumed by the header, the footer, the contact page, and the
privacy and terms pages. Changing it once updates the whole site.

### Colors

The design tokens are in **`src/styles/tokens.css`**. The palette is
expressed as CSS custom properties, so re-theming the site means editing
these values:

```css
:root {
  --navy-950: #020617;
  --navy-850: #0f172a;
  --teal-600: #0d9488;
  --teal-500: #14b8a6;
  --color-accent: var(--teal-500);
}
```

Change the `teal-*` scale and the `navy-*` scale and the entire site follows.

### Logo

The logo is text-based so it scales cleanly and needs no asset. It is split
into two parts in `src/components/layout/Header.tsx` and `Footer.tsx`:

```tsx
<span className="logo__text">{BRAND.name.replace(/RCM$/, "")}</span>
<span className="logo__accent">RCM</span>
```

To use an image logo instead, replace that markup with an `<img>` and point
`src` at a file in `src/assets/`.

### Favicon and social preview

- `public/favicon.svg` — the browser tab icon.
- `public/og-image.svg` — the preview image used by link previews. The
  reference lives in `index.html` (`<meta property="og:image">`).

### Page titles and meta descriptions

Static metadata for the whole site is in `index.html`. For per-page titles and
descriptions, add a small `useEffect` in each page that sets
`document.title`, or introduce a `usePageMeta` hook. This build keeps the
base metadata in `index.html` and does not yet include per-page overrides.

## 7. Connecting the quote form to a real submission service

**Right now, the quote request form and the contact form do not send anything
anywhere.** Both are fully functional on the front end — validation,
multi-step navigation, review screen — but there is no backend attached, and
the site says so explicitly rather than showing a false success message.

This is deliberate. Do not connect a form provider until you have decided
which one, because the choice affects what information leaves your server.

### Option A — A hosted form service (fastest)

Services like Formspree, Basin, or Netlify Forms receive the POST request and
forward it to your inbox. The site never needs a backend.

1. Create an account and a form endpoint. You get a URL like
   `https://formspree.io/f/abcdwxyz`.
2. Open `src/pages/RequestAQuote.tsx` and `src/pages/Contact.tsx`.
3. Point the form's `action` at your endpoint, or send the data with
   `fetch`:

   ```ts
   const response = await fetch('https://formspree.io/f/abcdwxyz', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
     body: JSON.stringify(values),
   });

   if (!response.ok) throw new Error('Submission failed');
   setStatus('success');
   ```

4. Replace the "not connected" notice in the component with a real success
   state, and only show it after `response.ok`.

### Option B — Netlify Forms (no third-party account)

If you deploy to Netlify, add a hidden field to the form and give it a `name`:

```html
<input type="hidden" name="form-name" value="quote-request" />
```

Netlify picks the form up at deploy time and stores submissions in the site
admin panel. Set the form's `action` to `"/"` and add `method="POST"`.

### Option C — Your own endpoint

Set `action` to a URL on your own server and accept a `POST` with
`application/json` (or `application/x-www-form-urlencoded`). Validate the
payload server-side before storing anything, and apply rate limiting.

### What information would be shared

Only the business inquiry fields the visitor typed in: name, business email,
practice name, phone, practice details, and their message. The forms
deliberately never ask for patient names, medical records, diagnoses, dates
of birth, insurance member IDs, or claim documents. Keep it that way if you
connect a provider — this site is a marketing site, not a clinical system, and
collecting PHI through a marketing form creates obligations you do not want.

### Environment variables

If you need to keep the endpoint URL out of the source, use Vite's built-in
support and put it in a `.env.local` file (which is git-ignored):

```
VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
```

Then read it with `import.meta.env.VITE_FORM_ENDPOINT`.

**Important:** Vite inlines `VITE_`-prefixed variables into the client
bundle. They are visible to anyone who opens the developer tools. Never put
an API secret, a password, or a private key in a `VITE_` variable — use a
server-side proxy for anything sensitive.

## 8. Project structure

```text
nexarcm/
  public/
    _redirects          # Netlify SPA fallback
    favicon.svg         # Browser tab icon
    og-image.svg        # Link preview image
  scripts/
    fix-encoding.mjs    # One-off tool: normalizes files to UTF-8
  src/
    components/
      layout/           # Header, Footer, Layout, Breadcrumbs, PageTransition
      pages/            # Shared templates for service and article pages
      ui/               # Button, Card, Accordion, Badge, SectionHeading
    data/               # All content: brand, services, specialties, FAQs, articles
    hooks/              # useReveal, useScrollToTop, useMediaQuery
    pages/              # One file per route (plus services/ and resources/ subfolders)
    styles/             # tokens.css (design tokens) and global.css (reset + base)
    App.tsx             # Route table
    main.tsx            # Entry point
  index.html
  package.json
  tsconfig.json
  vite.config.ts
```

### Data files — where to edit content

| File | What it controls |
| --- | --- |
| `src/data/brand.ts` | Brand name, contact details, social links, palette |
| `src/data/services.ts` | Service list, summary text, `confirmed` flag, links |
| `src/data/serviceDetails.ts` | Full content for each service page (benefits, process, FAQs) |
| `src/data/specialties.ts` | Specialty list and descriptions |
| `src/data/faqs.ts` | FAQ entries and categories |
| `src/data/resources.ts` | Resource center cards and categories |
| `src/data/articles.ts` | Full article bodies for the three educational guides |
| `src/styles/tokens.css` | Colors, type scale, spacing, radii, shadows, motion |

### Services that need confirmation

`services.ts` and `serviceDetails.ts` carry a `confirmed` flag. Services with
`confirmed: false` — currently **credentialing** — are labelled in the UI as
requiring confirmation rather than being presented as confirmed offerings.
Flip the flag to `true` once the business confirms the service.

Specialties in `specialties.ts` are all currently `confirmed: false` for the
same reason.

## 9. Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services` | Services overview |
| `/services/medical-billing` | Medical billing |
| `/services/revenue-cycle-management` | Revenue cycle management |
| `/services/denial-management` | Denial management & appeals |
| `/services/claims-management` | Claims submission & tracking |
| `/services/credentialing` | Credentialing (flagged as needing confirmation) |
| `/services/payment-posting` | Payment posting & reconciliation |
| `/services/eligibility-verification` | Eligibility verification |
| `/services/accounts-receivable` | A/R follow-up |
| `/specialties` | Specialties served |
| `/about` | About us |
| `/how-it-works` | How it works (interactive step navigation) |
| `/resources` | Resource center (search + filters) |
| `/resources/medical-billing-basics` | Article: Medical Billing Basics |
| `/resources/understanding-claim-denials` | Article: Understanding Claim Denials |
| `/resources/revenue-cycle-management` | Article: Revenue Cycle Management Explained |
| `/faq` | FAQ (search + category filters + accordion) |
| `/contact` | Contact |
| `/request-a-quote` | Four-step quote request |
| `/privacy` | Privacy policy (starter, for legal review) |
| `/terms` | Terms of service (starter, for legal review) |
| anything else | 404 page with a link home |

## 10. Accessibility and quality notes

- Semantic landmarks, a skip link, and labelled form controls throughout.
- Keyboard-operable Services dropdown (Arrow Down opens and moves focus into
  the list, Escape closes), mobile drawer (Escape closes, body scroll is
  locked while it is open, clicking the backdrop closes it).
- `prefers-reduced-motion` disables the page transition, the reveal
  animations, and the header dropdown animation.
- All animations are CSS or Motion based and never block navigation.
- Sample figures in the dashboard visual are labelled as illustrative.

## 11. Known limitations

- **No backend.** The quote and contact forms do not deliver anywhere yet —
  see section 7.
- **No per-page `<title>`/meta.** Only site-wide metadata in `index.html`.
- **No analytics or tracking.** Deliberately, for privacy. No pixels, no
  third-party scripts beyond the Google Fonts stylesheet.
- **Placeholder content.** The brand name, contact details, address, social
  links, About-page story, and team profiles are all placeholders for the
  business to replace. No client names, testimonials, certifications, or
  performance figures are included, because none have been confirmed.
- **No image assets.** The hero uses a CSS/SVG dashboard illustration rather
  than stock photography, so there are no image licensing questions to
  resolve. Real photography can be added under `src/assets/`.
- **Legal pages are drafts.** `src/pages/Privacy.tsx` and
  `src/pages/Terms.tsx` are starter documents and are marked as requiring
  business and legal review.
- **Accessibility has not been audited by a screen-reader user.** It is built
  to WCAG-friendly patterns, but formal testing and an audit have not been
  performed.
- `scripts/fix-encoding.mjs` is a one-off maintenance utility that normalizes
  source files to UTF-8. It is safe to delete once the repository is clean.
