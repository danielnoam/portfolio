# Portfolio

Daniel Noam's portfolio: a no-build vanilla JS single-page site on GitHub
Pages at danielnoam.github.io/portfolio. See README.md for the layout,
the admin panel and the deploy steps.

## Before anything

- `git pull --ff-only` first.
- Read **TODO.md** (what's left), **DONE.md** (what the site already does)
  and **DROPPED.md** (what was turned down and why) before suggesting or
  building anything. **NOTES.md** says why things are the way they are;
  search it before changing something that looks arbitrary.
- **CHANGELOG.md** is every release in plain words. Its top entry matches
  `version` in `js/core/config.js`.

## Working with Daniel

### Notes files

- TODO.md holds only what's left, grouped into releases or sections, each
  item with a short plan of how it would be built.
- Whenever something ships, or Daniel says he doesn't want it, take it out
  of TODO.md in the same change: shipped work becomes a line in DONE.md and
  the changelog, a no becomes a line in DROPPED.md with his reason. Remove
  anything stale or already covered. Never leave done work in TODO.md.
- DONE.md gets a line for every feature a release adds, grouped by area,
  with the version it came in.
- The project's shared folder keeps copies at
  `/mnt/project-files/portfolio-review/TODO.md` and `DONE.md`. Copy the
  repo's versions over them after every change so they match.
- Before suggesting ideas, check DONE.md, TODO.md and DROPPED.md so nothing
  shipped, planned or turned down is suggested again.
- "Show the todo": show it short. The next items numbered, then the later
  and parked groups in one line each.

### How he likes the work done

- Merge to main without asking once the checks are green (see Shipping for
  what green means here).
- "Don't build yet" or "fixes only": commit locally and don't push until he
  says build.
- "Add to TODO" means plan it, not build it. Small asks he lists without
  that, build now.
- Several asks go out as one release, or a few grouped releases, not many
  small ones.
- A new look, a reworked page or a big change: show or explain it first
  (screenshots or a mock) and wait for his OK before building.
- Secure and private as far as it can go: least access (the admin panel's
  token is fine-grained, this repo only, Contents read/write, with an
  expiry), nothing leaves the visitor's device that isn't already a stated
  choice (today: only GA4), untrusted content
  stays sandboxed. Say any trade-off plainly and write it in NOTES.md.
- Works on phones and on a computer. For this site that means phone
  browsers (Android Chrome, iPhone Safari) and desktop browsers. If
  something can't work on one, give it that platform's nearest equivalent
  (hover has a tap or always-visible version). Anything that needs a real
  iPhone to check goes on the iOS list in TODO.md.
- Speed matters: measure before and after anything that could make pages
  heavier or slower (page weight, largest asset, load time at 390px).
- After shipping, tell him in a line or two what to try on his phone,
  especially anything that couldn't be tested without it.
- Be direct. Push back when an idea or plan is weak, and say what was
  checked and what is a guess.
- He writes short messages from his phone, sometimes cut off. An ambiguous
  fragment is not a go-ahead to build; confirm first.

### Project rules

- Desktop and phone (390px) screenshots with every change that touches
  what visitors see, in the thread.
- Page recipe (approved 2026-10-12): a grey role line under the hero
  ("Solo · Unity C# · PC"), a two-sentence overview of what he built, then
  3 to 4 short prose sections with plain titles, each one idea in about
  two sentences with its clips and code under it, an "Also" list for the
  rest, and a Gallery.
- Plain titles over clever ones. Concise over complete. Active voice, no
  boasting, no script names in page text.
- Never ship a page with placeholder media; park it until the clips exist.
- The site stays dark (`uiSettings.allowLightMode: false`) until light mode
  is redone.
- Don't touch the résumé until he sends what it should say.

## Shipping

1. Bump `version` in `js/core/config.js` (feature: minor, fix or tweak:
   patch) and add the matching top entry to CHANGELOG.md in plain,
   visitor-facing words. Changes that only touch repo notes (these files,
   README, skills) don't bump the version.
2. Update TODO.md, DONE.md, DROPPED.md and NOTES.md in the same commit, and
   copy TODO.md and DONE.md to the shared folder.
3. Verify locally: serve the repo under `/portfolio/`, check the changed
   pages at desktop (1440) and phone (390) width with no console errors or
   404s. Take the screenshots.
4. Open a PR from the session's branch. The repo has no CI on PRs, so
   "green" means step 3 passed and the PR merges cleanly. Merge it without
   asking, then delete the branch.
5. Confirm the "pages build and deployment" run on main is green and the
   live sidebar shows the new version.
