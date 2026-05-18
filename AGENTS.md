# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a vanilla JavaScript/HTML/CSS static web application ("Distribuciones Muestrales — Recurso Interactivo") for teaching sampling distributions. It has **no build step**, **no package manager**, and **no test framework**.

### Running the app

Serve the project root with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser. ES Modules require HTTP — `file://` will not work.

### Known issue

`index.html` line 31 has a malformed import path:
```js
import { initRouter } from '.router.js';  // BUG: missing "/" → should be './router.js'
```
This prevents the app from bootstrapping (the header/footer render from static HTML, but the SPA router never initializes). All other module imports throughout the codebase use correct `./` relative paths.

### Lint / Test / Build

- **Lint:** No linter is configured. You can add one (e.g., `npx eslint .`) if needed.
- **Tests:** No test framework exists. Grading logic is in `grader.js` and could be unit-tested with any JS test runner.
- **Build:** There is no build step — files are served as-is.

### External dependencies

- **MathJax 3** is loaded from `cdn.jsdelivr.net` at runtime (requires internet).
- **Google Apps Script** (`Code.gs`) is optional for remote persistence to Google Sheets.

### File structure

All source files are in the project root (flat structure, no `src/` directory):
- `index.html` — Entry point / shell
- `router.js` — Hash-based SPA router
- `ui.js` — View renderers (teoria, practica, resultados)
- `ui_practice.js` — Practice card component
- `bank_media.js`, `bank_varianza.js`, `bank_proporcion.js` — Item banks
- `grader.js` — Auto-grading logic
- `storage.js` — localStorage persistence (+ optional remote)
- `utils.js` — Math utilities (CDF, inverse CDF, chi-square)
- `styles.css` — All styles
- `Code.gs` — Google Apps Script (optional, not used locally)
