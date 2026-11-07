# Verification record

## Design refinement — 3 November 2026

- Rebuilt homepage composition, product range, capability presentation, interactive applications, company introduction and shared quote section. Refined supporting pages, catalogue rows, contact styling, navigation and footer.
- Final production build and TypeScript checks passed after visual adjustments.
- All seven primary pages checked at 360, 390, 768, 1024, 1440 and 1920 px: no horizontal overflow in all 42 combinations.
- Interactive applications tested with mouse/click and ArrowDown: selected state, displayed image and keyboard focus moved correctly from Commercial to Fabrication.
- Original branding, verified facts, demo enquiry behaviour and noindex safeguards are preserved. No new commercial claims, project evidence or external dependencies were introduced.
- Visual review covered the new desktop hero, product composition and applications panel, plus the mobile homepage.

Completed on 1 November 2026 against the production static export in the Codex in-app Chromium browser.

- `npm run build`: passed; all seven primary pages exported, plus framework 404 artifacts. A workspace-root inference issue was resolved by explicitly setting `outputFileTracingRoot` to this project.
- `npm run typecheck`: passed after final application changes.
- `node scripts/check-export.mjs`: passed, 348 internal link / asset references across 9 exported HTML files, no missing targets.
- Browser checks covered Home, Products, Steel Bar, Steel Mesh, Accessories, About and Contact at 360, 390, 768, 1024, 1440 and 1920 px. One initial 360 px Accessories-heading overflow was corrected with fluid type and a constrained grid track. The repaired page was rechecked at 360 px: document width 345 px within a 360 px viewport. All other combinations passed the original overflow check.
- Source logo remains the original SVG; browser computed header background confirmed `rgb(1, 34, 44)`. Original colour tokens were inspected through computed custom properties and the downloaded stylesheet.
- Every primary page had a descriptive title and an H1. The homepage robots metadata was verified as `noindex, nofollow`; the layout applies it globally, and robots.txt disallows crawling.
- All observed images loaded without broken assets. Explicit image dimensions and fixed image containers reserve layout space; below-fold images use lazy loading. Hero WebP is 440,914 bytes versus the original 1,742,460-byte JPEG.
- Desktop and mobile homepage composition and the narrow Accessories page were visually inspected. Product and capability sections were inspected after reveal animations. Screenshots are saved in `qa/`.
- Mobile menu opened, exposed its navigation, and navigated to Contact / Quote. Escape closed it and returned focus to the toggle. Focus containment, visible focus rules, inert hidden navigation and labelled inputs are implemented. Full screen-reader testing was not performed.
- Empty form submission was blocked by native validation, with required-field messages. Valid dummy values produced the honest local review state, zero invalid fields and the expected encoded email draft link. No email was sent. The draft destination is the verified business email.
- Reduced-motion CSS was inspected in the browser: animations and transitions disabled, automatic scroll behaviour and reveal opacity restored. The observer also exits for reduced-motion preferences. An OS-level reduced-motion toggle and JavaScript-disabled browser session were not exercised. Content is present in server-rendered HTML; reveal classes are added progressively by JavaScript.
- Real iOS / Android devices, assistive technologies and live enquiry delivery remain outside this verification pass.

## Hosting status

The Sites creation call returned a transport error. A later complete Sites listing succeeded and contained no matching Global Steel project. No deployment occurred and no hosted URL is claimed. The local implementation and production export are complete. Do not create duplicate projects during recovery; reconcile the current account first.

## Before public release

Connect and validate a real enquiry backend, confirm source-content ambiguities (especially opening hours and product specifications), obtain approved privacy information and verify asset licences. Keep private review hosting and noindex until business approval. See README.md for the detailed handover.
