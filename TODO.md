# TODO

Only what's left. Shipped work moves to DONE.md, turned-down work to
DROPPED.md. Live version: 1.8.4.

## Next

### 1. Positioning and About (release 1.9.0)
Decided 2026-10-18: "Unity developer" leads, for now. The bio is still
about high school, and the draft text and tags below wait on his OK.
- **About text.** The 2026-10-05 draft was rejected; ask what was wrong
  with it (tone, facts, salesy) before writing another. Three sentences for
  the chosen role, in `content/about/content.md`.
- **Remove the header hover swap** ("Unity developer" to "game
  programmer"). Proposed 2026-10-07, never answered. Delete the
  `hover-text` span in `content/about/content.md` and its CSS. Ship with
  the About text, or drop it if he says no.
- **Skill tags.** "AI Workflows", "Unreal", "Photoshop" are listed;
  Shader Graph, VFX Graph and URP are not. Proposed set: C#, Unity, Shader
  Graph, VFX Graph, URP, Editor tooling, Git, Blender. Same release.

### 2. Speed and security pass (release 1.8.5)
Found while applying the new rules (2026-10-17). Measure page weight and
load time at 390px before and after.
- **Heavy GIFs.** Several are 30 to 40 MB (`project-umn/menu.gif` 39 MB,
  `bubblerena/poppingbubbles3.gif` 36 MB, `project-umn/robot1.gif` 30 MB).
  Convert GIFs over ~5 MB to muted looping MP4 (H.264, plays on iPhone
  Safari) and swap the tags; keep a poster frame.
- **Pin marked.** `index.html` loads `marked` from jsDelivr with no version
  or integrity hash, so any new upstream release runs on the site. Pin an
  exact version with an SRI hash, or vendor the file into `js/vendor/`.

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
