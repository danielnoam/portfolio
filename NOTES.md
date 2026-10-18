# Notes

Why things are the way they are, newest first. Each entry starts with a
bold title and its date or version so a search finds it.

**"Unity developer" leads the site (2026-10-18).** Daniel picked it over
tech art or a split, "for now". The Superplay tech-art job still belongs
in the About text and on its own page; it just isn't the headline.

**Project rules and notes files (2026-10-17).** Daniel's working rules
live in CLAUDE.md under "Working with Daniel", with TODO, DONE, DROPPED,
NOTES and CHANGELOG beside it. His new rule to merge without asking once
checks are green replaces the old "wait for push to main". The repo has no
CI on PRs, so green means the local desktop and phone check passed and the
PR merges cleanly. Notes-only changes don't bump the version: visitors see
nothing different. The Android/iOS rule reads as phone and desktop
browsers for this site.

**Privacy trade-offs on the site (2026-10-17).** Two things send visitor
data off the device: GA4 (Google sees page views) and the `marked`
library loaded from jsDelivr (jsDelivr sees the request). Daniel chose GA4
over heavier analytics tools. `marked` is unpinned, which is
a supply-chain risk as well; pinning it is in TODO.md.

**Profiling and atlasing go on Disney Solitaire (2026-10-12).** They came
up as job requirements. His real optimization work is on that game, and a
section written to match a keyword reads as padding.

**Uniform 16:9 tiles (1.8.3).** Mixed tile heights made every gallery look
unfinished. Landscape media fills the tile; assets that cropping would cut
(HUD strips, the reticle, settings screens) are padded instead. Portrait
clips keep their shape in their own four-across grid.

**Role lines instead of titles (1.6.0, 1.8.1).** The landing-page research
found the strongest junior portfolios put role, team and engine under each
project. The image already carries the name, so the line replaces the
title. Archived tiles read the line from a `role:` frontmatter field and
fall back to the title.

**The page recipe (1.8.0).** Pages were documentation: Chicken Invaders
was 1,500 words and over 14 phone screens. Daniel approved a role line,
two-sentence overview, 3 to 4 short sections with plain titles and an Also
list. He found three-sentence paragraphs too long and clever titles worse
than plain ones.

**Pressed states instead of the tap highlight (1.7.3).** The browser's
grey tap flash looked broken on dark cards. Each tappable thing dims or
presses in instead; with reduced motion it only dims.

**Inline SVG icons (1.7.0).** Tabler icons (MIT) drawn inline, so they
take the text colour and need no icon font or network request.

**Dark lock (1.5.1).** Light mode failed WCAG contrast and followed the OS
with no toggle, so many recruiters got the broken version by default.
Contrast was fixed, then the site was locked dark so only one theme needs
checking. `uiSettings.allowLightMode` turns it back on.

**Admin token vault (1.5.0).** The site has no server, so the GitHub token
is the credential. It's encrypted separately under a passkey (WebAuthn
PRF, key never on disk) and a PIN (PBKDF2-SHA256, 600k iterations, high
because a PIN has little entropy). Neither can derive the other. Use a
fine-grained token for this repo only, Contents read/write, with an
expiry: that bounds the damage if it leaks some other way.

**No build step (from the start).** Served exactly as committed on GitHub
Pages. A framework rewrite was considered and dropped (see DROPPED.md).
The base path lives in one constant (`BASE_URL` in `js/core/config.js`) so
the repo name appears once.
