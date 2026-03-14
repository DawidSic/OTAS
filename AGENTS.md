# AGENT OPERATIONS GUIDE

01. **Purpose** – This file aligns autonomous or semi-autonomous agents with the expectations of the OtterdalVatne static site project so changes remain deliberate, reviewable, and consistent.
02. The repository is a lightweight frontend stack (vanilla HTML, SCSS, CSS, and JavaScript) with no bundler or dependency manifest; everything runs directly in the browser.
03. Because there is no backend, avoid introducing server code or frameworks unless explicitly requested; keep contributions framework-agnostic and portable.
04. Always prefer incremental edits that preserve the current visual identity (industrial concrete textures, Montserrat/Roboto typography, earthy green and red accents).
05. Document any non-trivial automation you add inside this file so future agents inherit the workflow instantly.

06. **Repository Map** – key paths:
07. `index.html` – primary landing page markup driving navigation, hero, services, projects, and contact sections.
08. `prosjekter.html` – secondary page with extended project listings; follow the same structural and stylistic rules as `index.html`.
09. `script.js` – legacy navigation toggle and project accordion logic that runs globally.
10. `app.js` – newer mobile menu controller that focuses on accessibility (ARIA attributes, focus trapping, backdrop behavior).
11. `style.scss` – source-of-truth styles using nested SCSS, gradients, and mix of fixed/background imagery.
12. `css/style.css` – compiled output that ships to production; never hand-edit this file because it is generated from `style.scss`.
13. `styles.css` – experimental alternate theme (CSS custom properties, system fonts); coordinate with maintainers before deleting or replacing it.
14. `assets/` – static images (hero, services cards, logos); optimize via lossless compression when adding new assets and keep filenames lowercase with hyphens.
15. Root has no `package.json`; if you introduce tooling, include the manifest plus documentation updates here.

16. **Local Environment**
17. Target Node.js ≥ 20 if you add tooling; otherwise only a modern browser is required.
18. Install `sass` and `serve` (or any preferred static server) locally for predictable builds:
19. `npm install --global sass serve`
20. Keep dependencies minimal; prefer `devDependencies` for linters or bundlers and explain why they are needed.
21. Use `.nvmrc` if you introduce Node-specific workflows so other agents can match versions easily.

22. **Build & Asset Compilation**
23. Source styles live in `style.scss`; compile before committing generated CSS.
24. One-off build: `npx sass style.scss css/style.css --style=expanded`
25. Production build: `npx sass style.scss css/style.css --style=compressed --no-source-map`
26. Watch mode while iterating: `npx sass --watch style.scss:css/style.css`
27. When editing `styles.css`, treat it as a deliberate alternate entry point; if you regenerate it, keep a matching command documented in your PR.
28. Do not check in `.sass-cache`; add it to `.gitignore` if tooling starts generating it.

29. **Local Preview Commands**
30. Lightweight HTTP server: `npx serve . -l 4173`
31. Alternative: `npx http-server . -c-1 -p 4173` (disables caching which is helpful for CSS edits)
32. Open `http://localhost:4173` in multiple breakpoints to validate responsive behavior (mobile nav, services grid, contact layout).
33. After toggling `script.js` logic, reload with cache disabled to ensure new JavaScript executes.
34. When debugging CSS stacking contexts, use browser devtools to inspect pseudo-elements; there is no build step rewriting selectors, so what you see is what ships.

35. **Linting & Formatting**
36. There is no repo-level configuration yet; adopt Prettier for formatting and Stylelint/ESLint if you introduce larger JS features.
37. Suggested formatter check: `npx prettier --check "**/*.{html,js,scss,css}"`
38. Auto-fix formatting: `npx prettier --write "**/*.{html,js,scss,css}"`
39. SCSS lint (if you add `.stylelintrc`): `npx stylelint "**/*.{scss,css}"`
40. JavaScript lint (once `.eslintrc` exists): `npx eslint . --ext .js`
41. Keep indentation consistent with the surrounding file (SCSS prefers tabs, `app.js` uses two spaces; match the local style rather than enforcing a repo-wide rule unless you codify it).
42. Use single quotes in JS when not required otherwise; attribute selectors in `app.js` intentionally use double quotes to keep HTML-like readability.
43. Document any new lint command inside this file and in `README` to avoid confusion.

44. **Testing & Quality Assurance**
45. There is no automated test harness today; rely on manual browser verification for UI flows (burger menu, project accordion, contact form focus states).
46. When you introduce tests, prefer lightweight tools such as Vitest + Testing Library for unit DOM logic or Playwright for E2E.
47. Example unit test run (single file): `npx vitest run app/menu.spec.ts`
48. Example E2E test run (single spec): `npx playwright test tests/navigation.spec.ts`
49. Until those suites exist, document manual steps in your PR (e.g., "Resize to 360px width, toggle menu, ensure scroll locking works").
50. If you add integrations (contact form backend, analytics), stub network calls so manual smoke tests remain easy without credentials.
51. Always verify the year auto-update in `script.js` after touching footer markup.

52. **JavaScript Style Guide**
53. Keep scripts modular; wrap standalone behavior in IIFEs or ES modules to avoid leaking globals because both `script.js` and `app.js` load on every page.
54. Prefer `const` and `let`; avoid `var` entirely.
55. Query DOM nodes once and re-use references (`const btn = document.getElementById('toggleProjects')`).
56. Mirror `app.js` patterns: guard early if selectors fail, store ARIA state in `aria-expanded`, and restore focus when closing overlays.
57. Keep animations hardware-accelerated; use `requestAnimationFrame` as in `script.js` for measured transitions.
58. Debounce expensive listeners; if you add scroll or resize observers, clean them up when not needed.
59. Keep functions small and pure where possible; derive side effects (class toggles, inline styles) from arguments rather than hidden state.
60. Use `dataset` APIs for feature flags (`data-menu-link` etc.) instead of relying solely on class names.
61. Prefer descriptive naming: `slideDown`, `closeMenu`, `setupProjectFilters`.
62. Error handling: fail loud in dev (throw or `console.error`) when essential DOM hooks are missing, but guard gracefully in production by exiting early.

63. **SCSS & CSS Style Guide**
64. `style.scss` mixes nested selectors with BEM-like naming; maintain that nesting depth of 3 or fewer to keep compiled CSS readable.
65. Keep gradients and imagery defined near the relevant block; reuse shared tokens via SCSS variables or CSS custom properties when available.
66. Respect existing color palette: dark greens (`#41a867`), deep reds, charcoal backgrounds, whitesmoke accents.
67. Prefer rem units for spacing/typography; only fall back to px for border radii or when interfacing with raster imagery.
68. Group responsive overrides under the component they affect near the bottom of the file; follow the existing mobile-first approach.
69. When editing pseudo-elements, remember they provide hover/focus affordances for the burger menu and cards—test both light and dark backgrounds.
70. Avoid inline styles in HTML except when cards require dynamic background images; keep everything else in SCSS.
71. If you add new SCSS partials, name them `_component.scss`, update an `@use` or `@import` block at the top, and ensure the build command includes them.
72. Optimize background images (use `background-size: cover`, `background-position`); keep file paths relative to root because CSS is served from `/css`.

73. **HTML & Accessibility**
74. Maintain semantic sections (`<section>`, `<nav>`, `<main>`, `<footer>`).
75. Localize Norwegian copy consistently; keep diacritics intact.
76. Use descriptive link text; avoid "click here".
77. Keep ARIA attributes in sync with interactive elements (buttons controlling accordions must have `aria-controls` and `aria-expanded`).
78. Ensure buttons remain keyboard operable; always provide focus outlines (custom or default) for interactive components.
79. Respect existing responsive layout: hero occupies full viewport height, services cards stack on mobile, contact section uses two-column layout on desktop.
80. If you add forms, pair `<label>` with `for` attributes and include validation messages.
81. Keep script tags at the end of body to avoid blocking rendering since there is no bundler handling async/defer.

82. **Assets & Performance**
83. Compress JPEG/PNG assets before committing (aim < 300KB for hero, < 150KB for cards).
84. Use descriptive filenames with lowercase and hyphens, e.g., `betongsaging-industrial.jpg`.
85. Add `loading="lazy"` to non-critical images when you introduce inline `<img>`.
86. Cache busting is manual; if you change `css/style.css`, consider appending a query param in HTML (`/css/style.css?v=2026-03-12`) when necessary.
87. Avoid adding large libraries; if you must, use a CDN script tag and justify it in your PR description plus this guide.
88. Minimize inline SVG duplication by extracting shared icons into `<symbol>` sprites or reusing CSS masks.

89. **Content Updates & Localization**
90. Keep service names and headings consistent between `index.html` and `prosjekter.html`.
91. Maintain Norwegian tone; double-check translations with existing copy before mixing Bokmål/Nynorsk inconsistently.
92. When adding new sections, update both the mobile nav (`script.js` toggled list) and desktop nav if/when it is enabled.
93. For new CTA buttons, ensure color contrast ratio ≥ 4.5:1 against the background; use `#41a867` or `#7a1e1e` with white text for consistency.
94. Remember to update meta tags (`<title>`, description, Open Graph) if the page focus changes.

95. **Workflow Expectations**
96. Branch naming suggestion: `feature/short-description` or `fix/issue-id` so humans reviewing PRs see intent instantly.
97. Keep commits focused; reference the affected component/section in the message (e.g., "Improve projects accordion keyboard support").
98. When touching generated files (e.g., `css/style.css`), commit the source (`style.scss`) and compiled output together.
99. Run `git status` before committing to ensure no stray assets or cache directories are added.
100. Update this guide whenever you introduce new tooling, commands, or style conventions; place additions near the relevant section.

101. **Manual QA Checklist per Change**
102. Load the page at desktop (≥ 1280px), tablet (~768px), and mobile (~375px) widths.
103. Toggle the burger menu, ensuring scroll locking works (`document.documentElement.style.overflow = 'hidden'`).
104. Expand and collapse "Se alle prosjekter"; verify the button label swaps between "Se alle prosjekter" and "Skjul" and `aria-expanded` updates.
105. Submit the contact form with empty required fields to confirm browser-native validation still fires if you adjusted markup.
106. Focus-trap check: after closing the menu via Escape or clicking the backdrop, focus should return to the menu button.
107. Confirm the footer year auto-updates after any script changes.

108. **Troubleshooting Tips**
109. If SCSS compilation fails, look for stray trailing commas inside nested blocks or missing semicolons at the property level.
110. When background images do not appear, verify relative paths from `css/style.css` (they begin at the site root because of the leading slash).
111. If the burger menu stays open, ensure `navBtn` is not `null`; the markup must include `.burger-btn` and `.nav` simultaneously.
112. When animations feel jumpy, double-check that inline height transitions reset to `auto` after `transitionend` fires as seen in `slideDown`.
113. If you add new JS modules, remember that browsers without bundlers need `<script type="module">` plus relative imports.
114. Safari-specific issues often stem from `background-attachment: fixed`; test there if you modify hero backgrounds.

115. **Security & Privacy**
116. Avoid introducing external analytics or fonts without documenting the data they collect.
117. Never hardcode secrets; there is no backend so API keys should not be added here.
118. Sanitize any user-generated content if you later attach a backend (e.g., escaping form submissions before rendering anywhere).
119. Respect GDPR/ Norwegian privacy guidelines; update `Personvern` references if data practices change.

120. **Cursor / Copilot Rules**
121. No `.cursor/rules` or `.github/copilot-instructions.md` files are present at this time; follow the conventions in this document as the source of truth until official rules are added.
122. If new AI-specific rule files are introduced, summarize their expectations here immediately so autonomous agents stay compliant.

123. **Adding Tooling**
124. Before adding bundlers (Vite, Parcel, etc.), consider whether plain ES modules suffice; the site currently loads instantly because there is no JavaScript build step.
125. If you add Vite, document commands such as `npm run dev`, `npm run build`, and `npm run test` here with single-test variants.
126. Keep third-party dependencies evergreen; note the version and reason for adoption inside your PR description and optionally here.

127. **Documentation Standards**
128. Update `README.md` (create one if missing) whenever you add significant features; keep `AGENTS.md` focused on workflow and style, not product marketing.
129. Use Markdown lists or tables for clarity; keep line length under ~110 characters for diffs that are easy to review in terminals.
130. Whenever you add or change commands, provide both the command and a short rationale or expected outcome.

131. **Working With Images & Fonts**
132. Fonts are loaded from Google Fonts (Montserrat & Roboto); avoid adding more than one additional family to keep performance high.
133. For new hero imagery, provide both mobile and desktop crops; mobile uses `background-image: url('/assets/hero-mobile.png')`.
134. When exporting PNGs, keep transparency for overlays so gradient stacking works.
135. Store SVG logos inline only if they require dynamic color changes; otherwise keep them under `assets/` and reference via CSS backgrounds.

136. **Performance Budget**
137. Keep total JS under 25KB minified; current scripts are tiny, so avoid bringing in large utilities for simple tasks.
138. Keep above-the-fold CSS lean; if you add large sections, consider splitting seldom-used styles into another stylesheet loaded later.
139. Aim for Lighthouse performance ≥ 90; audit after major visual changes using Chrome DevTools (`Lighthouse` tab) even though there is no automated CI yet.

140. **Deployment Considerations**
141. The project is static-host friendly (Netlify, Vercel, GitHub Pages). Ensure relative URLs continue to work when served from root.
142. If you add SPA-style routing, ensure fallback rules exist for the static host; document required redirects here.
143. Always test asset paths after deployment because leading slashes assume the site is hosted at the domain root.

144. **Before You Finish a Task**
145. Re-run `npx sass style.scss css/style.css --style=expanded` to sync compiled output unless you are certain nothing in SCSS changed.
146. Run your formatter command of choice (Prettier or editor-integrated) across touched files.
147. Smoke test the UI in at least one Chromium-based browser and Firefox.
148. Update this guide if workflows changed, then include the updates in your PR to keep other agents aligned.
149. Leave helpful PR descriptions summarizing intent, commands run, and manual QA performed; it speeds up both human and automated reviewers.
150. Celebrate small wins—consistency over time keeps this lightweight stack maintainable for everyone.
