# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/),
and the project adheres to [Semantic Versioning](https://semver.org/).

The top entry below must always match the `version` constant in
`js/core/config.js`, which is rendered at the bottom of the sidebar.

## [1.1.0] - 2026-07-01

### Added

- Unified `showcase` component (`<div class="showcase" data-layout="grid|carousel">`)
  that decouples layout from data source. Either layout can now be populated by
  **inline `<figure>` media** or a **tag-filtered project list** (via
  `data-tags`/`data-exclude-tags`), giving all four combinations: media grid,
  project grid, media carousel, and project carousel. Click action follows the
  item type — media opens the lightbox, projects navigate. `data-columns="N"`
  sets grid columns.

### Changed

- Replaced `AutoCarousel` (`js/ui/autoCarousel.js`) with
  `ShowcaseManager` (`js/ui/showcaseManager.js`); the lightbox collector and
  About-page hover backgrounds now target `.showcase`. Migrated all gallery
  (`.image-gallery`) and carousel (`.auto-carousel`) blocks in `content/` to the
  new `showcase` tag; the About project grid no longer needs `no-lightbox`.

## [1.0.2] - 2026-07-01

### Fixed

- Sidebar navigation: the section links (e.g. the GameJams projects) were
  trapped behind a nested, near-invisible scrollbar inside `#main-nav`, so the
  bottom items looked missing. The sidebar now scrolls as a single unit — the
  nav sizes to its content and the whole column scrolls when it doesn't fit,
  keeping the bottom links and version marker reachable at every viewport
  height, on desktop and in the mobile menu.

## [1.0.1] - 2026-07-01

### Changed

- Refactor/cleanup pass (no visitor-facing behavior change): extracted shared
  DOM/path helpers into `js/core/domUtils.js` (`observeContentChanges`,
  `getPageName`/`getSectionName`, `getContentId`, `pageRouteUrl`) and removed
  the duplicated boilerplate across the manager modules.
- `backgroundManager` now dispatches effects via a lookup map instead of a
  12-case switch; `lightboxManager` uses a single video/audio extension list.
- CSS de-duplication: removed a duplicate `.page-logo` rule and dead
  `@media` overrides in `sidebar.css`, dropped the double Prism stylesheet
  load, and moved hardcoded status colors into `--color-error/success/firefly`.

### Removed

- Committed `.idea/` IDE folder (now gitignored) and the 4 MB `logo.psd`
  source; stray leftover `console.log` and unused CSS variables.

### Fixed

- Stray trailing `\` after the module `<script>` tag in `index.html`.

## [1.0.0] - 2026-06-30

### Added

- Visible version marker at the bottom of the sidebar, sourced from a single
  `version` constant in `js/core/config.js`.
- This `CHANGELOG.md` to track changes alongside the in-app version.
