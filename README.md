# Global Steel Australia — presentation concept

Next.js App Router, TypeScript and Tailwind CSS v4. Static export, no external runtime services. Seven primary pages: Home, Products, three catalogue categories, About and Contact. A bespoke CSS motion system avoids an animation-library dependency.

## Setup

Requires Node.js 20.9 or later and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production: `npm run build` produces `out/`. Run `npm run preview` to review the existing production export locally at the same address. Serve that folder with a static host supporting directory indexes; configure a 404 page from `out/404.html`. `npm start` is not used for static export. `npm run typecheck` verifies TypeScript; `node scripts/check-export.mjs` checks exported internal paths and assets.

## Design

Large editorial typography, a photographic reinforcement hero, asymmetric product imagery, fine rules and generous spacing establish an industrial corporate character. Clear category navigation and repeated enquiry paths prioritise commercial use. The original SVG logo is untouched. General Sans is the original website font, hosted locally with swap loading. Motion uses coordinated hero entrances and progressive viewport reveals, with reduced-motion support and no scroll hijacking.

The refined direction uses an asymmetric stone-and-photograph hero with an inset material detail, an oversized product feature with two supporting panels, interactive application tabs, a typographic 2022 company introduction and a dark photographic enquiry section. Shared catalogue, contact, footer and inner-page treatments carry the same direction throughout. `app/refined.css` contains this second design pass. Application tabs support touch/click, Up/Down arrows, Home and End, with a single keyboard tab stop and a labelled image panel.

## Brand provenance

Inspected https://www.globalsteelau.com.au/ and its Products, About Us, Contact Us, Steel Bar Products, Steel Mesh Products and Accessories pages on 1 November 2026. Browser computed styles and CSS custom properties verified these existing colours:

| Colour | Source token | Value |
| --- | --- | --- |
| Deep blue | daintree | `#01222C` |
| Pale blue | jagged-ice | `#BADFE4` |
| Warm stone | pearl-bush | `#EAE3DB` |
| White | white | `#FFFFFF` |
| Brown | arrowtown | `#9A806E` |
| Warm grey | flint | `#716864` |

The selected main palette is deep blue, pale blue, warm stone and white. Supporting neutral shades come from the existing token family. The downloaded original stylesheet is retained as `brand-source.css` for audit only; it is not used by the application. Official logo aspect ratio: 587.2257 / 101.3616; displayed with automatic height.

## Source and assets

All photography is reused from the original website's Webflow CDN. This is an owner presentation concept, not evidence that Global Steel completed the photographed work. Confirm original photography and font licensing before public release. Asset origins:

- Logo: `https://cdn.prod.website-files.com/67e48516b69fbca3f80e4123/67e494f1ec183b288dddd368_global-steel-logo-full-color-rgb.svg`
- Hero: `https://cdn.prod.website-files.com/67e48516b69fbca3f80e4123/67eb4a6ee0b2663761401a48_138.jpg`
- Steel bar: `https://cdn.prod.website-files.com/67e9e2f4d19735cfa7c44421/67fde08b827c2b353c97c25e_Reinforcement-Rods-Construction-Site-Steel-Rebar-Mar-16-2025.jpg`
- Mesh: `https://cdn.prod.website-files.com/67e9e2f4d19735cfa7c44421/67fe02cf5d0dc5e216e89373_Rectangular-Mesh.jpg`
- Accessories: `https://cdn.prod.website-files.com/67e9e2f4d19735cfa7c44421/67feebc1464b6bc0e779b5ed_Wire%20Bar%20Chairs.jpg`
- General Sans: `https://cdn.prod.website-files.com/67e48516b69fbca3f80e4123/67e48a217acfa8915dc9ac67_GeneralSans-Variable.ttf`
- Stylesheet: `https://cdn.prod.website-files.com/67e48516b69fbca3f80e4123/css/global-steel-8673f8.webflow.shared.761a64c61.min.css`

## Content decisions and launch requirements

- Established in 2022 and Indigenous ownership are supported by the original About page. The homepage's “20+ Years Experience” does not identify whose experience; omitted rather than presenting it as company history. “1000 Tonne Monthly Capacity” is on the existing site but not repeated in this concept; confirm currency before using it.
- ACRS wording describes the original site's product specialism, not a fabricated company certification. No badge has been created. Obtain current product documentation and confirm scope before release.
- The original identical dimensions tables appear across unrelated product categories. They have been excluded. Product sizes, grades, current availability and pricing require owner confirmation.
- Original “Bondek Formwork” description names Armourdeck; conservatively presented as steel decking / formwork pending owner confirmation of the actual brand/profile supplied.
- Original repeated “Alice Johnson” team cards, mismatched delivery copy under “Indigenous Owned”, and absolute best-price guarantees are omitted. No invented testimonials, projects, customers or team members.
- Original claims of same-day / four-hour delivery, overnight production and 24/7 support require service-area and availability clarification. This concept asks customers to confirm timing with the team.
- Australian scope is used consistently. Confirm New Zealand supply coverage before expanding it.
- Original contact details preserved: `globalsteelaus@gmail.com`, `+61 422 136 011`. The Contact page says Monday–Friday 8 am–5 pm, while the Quote page says Monday–Saturday 6 am–5 pm. This concept uses Contact-page hours; owner confirmation is required. No street address was verified; none is invented.
- Instagram and Facebook URLs come from the original site's footer. Profiles have not been independently authenticated.
- No downloadable catalogue or certification resource was found among the inspected accessible pages; none has been invented. Add approved PDFs once supplied.
- Confirm the legal trading name, ABN, privacy notice, licensing and all commercial claims with the business before public release.

## Quote form

The form is explicitly a demonstration. Native browser validation covers required fields, email format and minimum requirements length. Submission generates a review state locally; nothing is sent or stored. “Open email draft” opens the visitor's configured email client, where they must send it themselves.

To accept live enquiries, implement a server endpoint or approved form provider with server-side validation, spam protection, rate limiting, delivery monitoring and appropriate privacy/retention handling. Display success only after confirmed server acceptance, show retryable errors, and preserve input on failure. There is no upload control or unsupported attachment promise.

## Indexing and hosting

All page metadata specifies `noindex,nofollow`; `public/robots.txt` disallows crawling. These are presentation safeguards, not authentication. Use private/password-protected hosting for owner review. Remove indexing restrictions only after approval. A Sites registration was attempted but the connector returned a transport error; do not assume a hosted site exists or retry creation without reconciling that state.

See `QA.md` for actual verification results and remaining limits.
