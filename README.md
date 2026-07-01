# Daniel Noam — Portfolio

A personal portfolio site for game / Unity development work, built as a
**no-build vanilla-JS single-page app** and hosted on GitHub Pages at
[danielnoam.github.io/portfolio](https://danielnoam.github.io/portfolio/).

There is no bundler, framework, or install step — the files are served
exactly as committed.

## Project layout

```
index.html            Entry point (loads config.js, then js/main.js as a module)
404.html              SPA deep-link redirect (derives the base path at runtime)
css/main.css          Imports every stylesheet in css/{core,layout,components,effects}
js/
  core/config.js      Single source of truth: version, baseUrl, navigation, page structure
  core/router.js      Client-side routing (History API + the 404 redirect trick)
  main.js             App bootstrap — wires up the manager modules
  ui/ effects/ content/  Feature modules (navigation, lightbox, backgrounds, markdown, …)
content/              Page content as Markdown (content/<section>/<page>/content.md)
assets/               Images, resume PDF, favicons
```

### Configuration

`js/core/config.js` is the one place to edit for content and navigation:

- `version` — bumped on every deploy (see below); rendered at the bottom of
  the sidebar as the visible deploy marker.
- `baseUrl` — the project-page prefix (`/portfolio`); the repo name lives
  here and nowhere else.
- `navigation` / `structure` — the sidebar links and the Games/Unity/GameJams
  page groups. Each page points at a `content/.../content.md` folder.

## Local development

Module scripts and `fetch` need a real origin, so serve over HTTP rather than
opening `file://`. Any static server works; because it's a project page the
site expects to live under `/portfolio/`. Then open
`http://localhost:5173/portfolio/` and check the console for path 404s.

Check both layouts — the site is responsive (sidebar on desktop, a hamburger
top bar on mobile).

## Deploy

Hosted via **Settings → Pages → Deploy from a branch** (`main`, `/root`), so
**a push to `main` is the deploy** — Pages rebuilds within a minute or two.

On every change (even small ones):

1. Bump `version` in `js/core/config.js` (semver: feature → minor,
   fix/tweak → patch).
2. Add a matching top entry to [`CHANGELOG.md`](./CHANGELOG.md) — its top
   heading must equal the in-app version.
3. Verify locally at desktop and mobile widths.
4. Push to `main`, then load the live URL and confirm the sidebar version
   marker shows the new number.
