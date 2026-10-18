# TODO

Only what's left. Shipped work moves to DONE.md, turned-down work to
DROPPED.md. Live version: 1.8.6.

## Next

### 1. Pin the Markdown library (release 1.8.7)
`index.html` loads `marked` from jsDelivr with no version. jsDelivr
currently serves v15.0.12 (checked 2026-10-18) because newer versions
dropped the `marked.min.js` file, so the site works by accident. Pin
`marked@15.0.12` with an SRI hash, or vendor the file into `js/vendor/`.

### 2. Re-encode the large MP4s
Measure first. The existing videos were never compressed for the web:
`chicken-invaders-remake/Gameplay1.mp4` is 40 MB, `Gameplay2.mp4` 30 MB
(also the About hover background), and Electro Grid and Shaders pages
carry 66 MB each. Re-encode at H.264 CRF 23 with faststart, same as the
GIF conversion, and compare side by side before swapping.

## Waiting on Daniel's media or details

- **Roboformer page** (repo danielnoam/ProjectWallE). Text draft approved:
  `/mnt/project-files/portfolio-review/roboformer-draft.md`. Needs 4 to 6
  gameplay shots, a short gameplay clip, model renders and VFX clips. Then
  build it with the page recipe and add it to the About grid above
  Chicken Invaders.
- **Shaders page rebuild.** More and better shaders since the page was
  made. Needs short clips of each; then rebuild with the page recipe (one
  line on the technique per shader, graph screenshot where it helps).
- **DNExtensions page.** Rebuilt in PR #5 (branch
  `claude/project-thread-5oojo7`). Needs Helpful Editor clips (Hierarchy,
  Inspector) and fresh clips of the newer tools. Then merge main in,
  renumber it to the next minor, re-screenshot, merge.
- **Disney Solitaire page** (Superplay, Technical Artist since May 2026):
  profiling, atlasing, editor tooling, animations, particles. Needs what
  the NDA allows to show. Even one paragraph and the store link works.
- **Hextalia page** (EpLap Studio, hex tower defense on Steam, planned
  Q1 2027). Needs his dates and tasks (more Unity dev than tech art).
- **Résumé.** Don't touch until he sends the wording. Draft on branch
  `claude/resume-techart`: both links point to `Resume-TechArt.pdf`, PDF
  rebuilt with the Superplay job. Still to add: Hextalia, education end
  date, DNExtensions. PDF source:
  `/mnt/project-files/portfolio-review/resume/resume-techart-source.html`,
  printed to Letter in Chromium.

## Parked

- **Flatter project pages.** Every section is a grey card. Cosmetic now
  that pages are short; revisit only if he asks.
- **About page network background.** The only generic background left.
  Optional; the 2026-10-06 review said leave it.

## iOS

Nothing yet. The site runs in iPhone Safari today; anything that can only
be checked on a real iPhone goes here.
