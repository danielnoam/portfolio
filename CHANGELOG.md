# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/),
and the project adheres to [Semantic Versioning](https://semver.org/).

The top entry below must always match the `version` constant in
`js/core/config.js`, which is rendered at the bottom of the sidebar.

## [1.4.0] - 2026-08-12

### Changed

- The admin panel now logs in with the GitHub token alone. The password step
  is gone, along with the owner/repository/branch fields — the repository is
  derived from where the panel is served (`<owner>.github.io/<repo>/`), so
  there is nothing to fill in and nothing to keep in sync if the repo is
  renamed. The login screen is a single field with a show/hide toggle.
- The token is kept in `localStorage` and reused, so returning to the panel
  goes straight to the editor instead of asking again; logging out removes
  it. A stored token that has expired or been revoked is discarded on the
  spot rather than failing on every load.
- Because the token is now stored as-is rather than encrypted, anything with
  access to the browser can read it. Use a fine-grained token limited to this
  repository with Contents: Read and write, and give it an expiry date.

### Removed

- `js/admin/adminAuth.js` and the password vault it implemented (PBKDF2 →
  AES-GCM), the 30-minute idle lock, and the secure-context requirement the
  browser crypto imposed.

## [1.3.1] - 2026-08-12

### Added

- A way into the admin panel from a phone without typing the URL: tapping the
  sidebar's version marker five times quickly opens it. The marker keeps its
  plain-text styling and cursor, so nothing advertises it to visitors; it
  stays silent through the first two taps (an accidental double tap looks
  like nothing happened) and then counts down the remaining taps in the
  accent colour so the sequence is followable on a touch screen. Pausing for
  1.5s resets it. The panel is still password-locked — this is convenience,
  not access.

## [1.3.0] - 2026-08-12

### Added

- Admin panel at `/admin` (`admin.html`) for editing the sidebar without
  hand-editing `js/core/config.js`. It adds, removes, renames, reorders and
  hides pages, moves them between sections, and adds or removes sections —
  then writes `config.js` back to the deploy branch as a single commit, which
  is what triggers the Pages build. New pages get a starter `content.md`.
- Password login for that panel. The site is static and has no server to
  authenticate against, so setup stores a GitHub token encrypted with a
  password (PBKDF2-SHA256 → AES-GCM, via WebCrypto) in `localStorage`; after
  that, logging in is password-only. The password is never stored, the token
  is only ever decrypted into memory, and the session locks after 30 minutes
  idle.
- Publishing validates before it commits: duplicate or reserved page
  addresses are rejected, since the router resolves `/<slug>` from the last
  segment of a page's folder and a collision would make a page unreachable.
  Every change is listed in plain language for review first, and the version
  bump plus this changelog entry can be written as part of the same commit.

### Changed

- `404.html` now sends `/admin` straight to `admin.html` instead of handing
  it to the SPA router, which has no route for it.

## [1.2.7] - 2026-07-06

### Changed

- Mobile image galleries: every item used to take a full-width row, wasting
  space on portrait screenshots/videos. `LightboxManager` now tags each
  gallery figure `is-portrait` once its real media dimensions are known, and
  the mobile grid pairs two portrait items per row while landscape items
  still span the full row.

## [1.2.6] - 2026-07-06

### Fixed

- Excessive mobile padding: `#content` and `.project-card` kept their desktop
  padding (32px) on mobile instead of using the existing `--mobile-padding`
  token, adding ~128px of horizontal padding on a 375px phone. Also fixed the
  same never-revisited-on-mobile pattern in `.content-two-column` (About/
  Utilities pages), `.contact-group.large .contact-card`, and `.page-content`
  list indentation.

## [1.2.5] - 2026-07-02

### Changed

- Merged Object Pooling, Controller Rumble, and VFX & Transitions into the
  Editor Utilities page as panels alongside Editor Tools and Inspector &
  Serialization, and renamed that page to "DNExtensions". Removed the three
  standalone pages and their sidebar entries.

## [1.2.4] - 2026-07-02

### Fixed

- Sidebar scrolling on mobile: switched the fixed sidebar to `100dvh` (dynamic
  viewport height) with `overscroll-behavior: contain`, so the bottom nav items
  are reachable regardless of the mobile address bar showing/hiding.

### Changed

- Moved "School These Sh*ts" and "Power Factory" to the Archive (hidden from
  their sections, `archived` tag added) so they appear on the Archived page.
  GameJams now has no visible projects, so that section no longer renders.

## [1.2.3] - 2026-07-01

### Changed

- Moved the Archived link into the sidebar footer (with Resume/Itch/Github)
  instead of a standalone band in the nav, so it reads as a secondary
  destination. `bottomLinks` now supports content links, not just external ones.

## [1.2.2] - 2026-07-01

### Changed

- Set the bottom static nav links (Archived) in their own divider-separated
  group so they no longer read as part of the last section above them.

## [1.2.1] - 2026-07-01

### Changed

- Moved Midnight Masquerade, Bubblerena, and Pixel Knight to the Archived page:
  tagged them `archived` and hid them from the main nav (Midnight Masquerade and
  Bubblerena moved out of GameJams into the hidden Archive group; Pixel Knight
  was already there). GameJams now lists Power Factory only.

## [1.2.0] - 2026-07-01

### Added

- New **Archived** page, linked at the bottom of the sidebar nav, showing a
  gallery of every project tagged `archived` (a showcase grid with
  `data-tags="archived"`). Tagging is additive — a page stays in its normal
  section and also appears here. Add the tag to a page's frontmatter to list it.
- `navigation.staticLinksBottom` config slot for content links pinned to the end
  of the nav list; the router now deep-links standalone static pages (not just
  `structure` pages), so `/portfolio/archived` resolves on refresh and via the
  404 redirect.

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
