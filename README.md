# Daniel Noam — Portfolio

A personal portfolio site for game / Unity development work, built as a
**no-build vanilla-JS single-page app** and hosted on GitHub Pages at
[danielnoam.github.io/portfolio](https://danielnoam.github.io/portfolio/).

There is no bundler, framework, or install step — the files are served
exactly as committed.

## Project layout

```
index.html            Entry point (loads config.js, then js/main.js as a module)
admin.html            Admin panel for editing pages/sections (see below)
404.html              SPA deep-link redirect (derives the base path at runtime)
css/main.css          Imports every stylesheet in css/{core,layout,components,effects}
css/admin.css         Standalone styles for admin.html
js/
  core/config.js      Single source of truth: version, baseUrl, navigation, page structure
  core/router.js      Client-side routing (History API + the 404 redirect trick)
  main.js             App bootstrap — wires up the manager modules
  ui/ effects/ content/  Feature modules (navigation, lightbox, backgrounds, markdown, …)
  admin/              Admin panel modules (auth, GitHub client, config rewriting, UI)
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

## Admin panel

[`/admin`](https://danielnoam.github.io/portfolio/admin) edits the `structure`
block above from a browser instead of by hand. It can add, remove, rename,
reorder and hide pages, move them between sections, and add or remove
sections. Publishing rewrites `js/core/config.js` and pushes it to the deploy
branch as one commit — which is the deploy — optionally bumping the version
and adding the matching `CHANGELOG.md` entry at the same time. New pages get
a starter `content.md`; their body is still written by hand.

Everything outside the `structure` block (comments, `uiSettings`,
`navigation`) is left byte-for-byte alone, so the panel and hand-editing can
be mixed freely.

### How the login works

The site is static, so there is no server to authenticate against — the
GitHub token *is* the credential. **Setup** (once per device) takes the
token and a PIN, and stores the token encrypted in `localStorage`.
**Unlocking** afterwards is Face ID / a fingerprint, or the PIN.

The owner, repository and branch are never asked for: a project page is
served from `<owner>.github.io/<repo>/`, which is all the panel needs, so it
reads them off its own URL (falling back to `danielnoam/portfolio` on `main`
during local development).

#### Where the key comes from

Encryption is only worth anything if the key isn't sitting next to the
ciphertext, so no key is ever stored. It is rebuilt at unlock time from
something you supply:

- **PIN** — PBKDF2-SHA256 (600k iterations) stretches the digits into an
  AES-GCM key. The high iteration count is deliberate: a PIN has little
  entropy, so each guess needs to be expensive for anyone brute-forcing a
  copied vault offline. A longer PIN is meaningfully better than a 4-digit
  one.
- **Passkey** — WebAuthn's PRF extension returns a secret held by the
  device's authenticator and released only after Face ID / a fingerprint. It
  never touches disk at all.

The token is encrypted separately under each, so either unlocks it and
neither can derive the other. A wrong PIN fails AES-GCM's integrity check —
there is no stored answer to compare against or skip past.

Biometric unlock needs both a platform authenticator and PRF support; where
either is missing the panel says so and the PIN carries on working. If you
skip it at setup, an **Add Face ID** button appears in the header while
you're logged in.

#### Still worth doing

Use a **fine-grained personal access token** scoped to this repository alone,
with **Contents: Read and write**, and **give it an expiry date**. Encryption
protects the token at rest on your device; the scope and expiry are what
bound the damage if it ever escapes some other way.

"Start over with a new token" on the login screen erases the vault — use it
on any device that isn't yours.

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

Publishing from the admin panel does steps 1, 2 and 4 for you (the patch bump
and changelog entry are a checkbox on the publish dialog), and its commit is
the push.
