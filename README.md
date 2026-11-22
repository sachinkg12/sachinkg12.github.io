# Sachin Gupta — engineering and research portfolio

Public site: **https://sachinkg12.github.io/**

This is a separate website from [guptasachinn.com](https://www.guptasachinn.com/), which remains the publishing home for articles, illustrated lessons, and the full activity archive. This repository contains curated project case studies, a complete public bibliography, talks and keynotes, and a concise CV.

## Develop locally

Requires Node.js 22+ and Python 3. No npm packages need to be installed.

```sh
npm test
npm run dev
```

Open **http://127.0.0.1:4173/**. Rebuild with `npm run build` after source changes and refresh the browser. The build writes `dist/`; source files are in `site/` and `content/`.

## Update content

Edit **`content/portfolio.json`**. It contains the public profile, projects, papers, talks, keynote, and selected service records. Every project uses the same split-card layout, with a real screenshot or a clearly labeled concept diagram.

The **Professional CV** is the separately approved document-based layout in `site/cv.html`. It preserves the supplied CV's selected publications, career details, service, presentations, and education. Its content is a snapshot of the supplied CV; the broader portfolio bibliography and service inventory remain in `content/portfolio.json`. Provenance and distinctions are recorded in `docs/professional-cv-sources.md`.

The CV uses a compiled local stylesheet and script, with no browser-side styling compiler. When its utility classes change, regenerate the tracked `site/cv.css` with `npm run build:cv-css` (the optional compiler command uses Tailwind CSS 3.4.17). Ordinary content edits and `npm test` require no npm installation. Custom CV styles are in `site/cv.input.css`, and the theme is in `site/cv.tailwind.config.cjs`.

For papers, keep `status` as `Published`, `Accepted`, or `Preprint`. One work appears once: if an accepted or published paper also has an arXiv version, put that URL in `preprint`. Preserve author order, actual venue/track, and publication status. A software artifact DOI is separate from a paper DOI.

Source verification and asset provenance are documented in `docs/`. The initial bibliography was reconciled against the public author profile, publisher records, conference program, and arXiv author feed on November 21, 2026. The initial inventory has seven published papers, two accepted manuscripts, and one standalone preprint. Mentorship recognition is stored separately from the 23 completed research-service roles. The complete role list is published at `/research-service/`, grouped into area-chair work, reviewing and program committees, and artifact evaluation. Dates and counts follow the supplied role records; organiser contacts and tracking fields are not published.

## Publish

GitHub Pages serves the **`gh-pages` branch, root directory**. The `main` branch contains editable source; `gh-pages` contains only the verified static build. There is no custom domain or dependency on the guptasachinn.com deployment.

After committing source changes on `main`, publish with:

```sh
npm run publish:site
```

The command rebuilds and validates the site, prepares a temporary checkout, and pushes a normal commit to `gh-pages` without a force push. It uses the existing GitHub CLI credentials (`gh auth login`) and does not require workflow-creation permission. The first deployment was configured through GitHub's Pages API; later branch pushes publish automatically.

An optional Actions example is preserved at `deployment/pages-workflow.example.yml`. Enabling it would require workflow permission; the current deployment does not depend on it.

## Existing learning notes

The original Docsify entry, sidebar, and README are preserved under `legacy/`. Existing `ai/` and `docker/` files remain intact. The build serves a working archive at `/notes/` and preserves the old raw Markdown paths. Old `/#/...` bookmarks forward to `/notes/#/...`. The original root `index.html` is retained as a historical source file; The publish command deploys the generated `dist/index.html` to `gh-pages`.

## Checks

`npm test` builds every route and checks local links and fragments, image assets and alternate text, canonical URLs, duplicate IDs, complete paper coverage on the home and research pages, citations, the SCIS keynote, and byte-for-byte preservation of learning notes. Native browser checks cover navigation, search, status filters, citation copying, and the rendered project layouts.

The personal desk illustration was created with the built-in ImageGen tool, using the public GitHub portrait as a reference. Its prompt is recorded in `docs/illustration-prompt.txt`. HeapLens images are actual light-theme IntelliJ screenshots from its JetBrains Marketplace listing. Tanay Arora’s portfolio informed the layout direction; his artwork and content are not used in the published site.
