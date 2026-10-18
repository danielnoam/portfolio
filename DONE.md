# Done

What the site already does, grouped by area, with the version each came
in. Details are in CHANGELOG.md.

## About page

- Electro Grid as the featured card, other projects two per row below (1.6.0)
- Headline "Unity developer" (1.6.0), with no hover swap (1.8.6)
- About text opens with the Technical Artist job at Superplay (1.8.6)
- Grey role line under every project tile: role, team, engine, platform (1.6.0)
- Résumé button with Email, Phone and LinkedIn, equal width, one row on desktop and two on phones (1.6.0)
- Project tiles share one 16:9 shape (1.6.0)
- Electro Grid card matches the tiles: image plus role line and Itch.io link (1.7.1)
- Contact details in a tooltip on hover (1.7.2)

## Project pages

- Every project page follows one recipe: role line, two-sentence overview, 3 to 4 short sections, Also list, Gallery (1.8.0)
- The five Archive pages use the same role line and a one-paragraph overview (1.8.0)
- Midnight Masquerade shows its two screenshots (1.8.0)
- Extra clips on Chicken Invaders (Timeline intro, upgrade store, boundary dither shader) (1.8.1)
- Project UMN "Look and feel" section with the environment clips (1.8.2)
- 2DPlatformer Gallery with nine clips (1.8.3)
- Project UMN player movement clip under The player (1.8.4)
- Project page headers and project thumbnails can be a looping video (1.8.5)
- Code buttons per section that open the real script (before 1.0.0)
- DNExtensions page merges Object Pooling, Controller Rumble and VFX & Transitions into one page (1.2.5)

## Galleries and showcase

- One `showcase` component for media and project grids or carousels, filtered by tag (1.1.0)
- Lightbox for images and video, with loading states and audio indicators (before 1.0.0)
- Grid tiles are a uniform 16:9; off-ratio assets cropped or padded to match (1.8.3)
- Two tiles per row on phones; portrait grids four across on desktop (1.8.3)
- Text-only project cards full width (1.8.3)
- All animated clips are looping MP4 videos instead of GIFs (1.8.5)

## Archive

- Archived page listing every project tagged `archived`, linked from the sidebar footer (1.2.0, 1.2.3)
- Midnight Masquerade, Bubblerena, Pixel Knight, School These Shits and Power Factory moved to the Archive (1.2.1, 1.2.4)
- Archived tiles show a grey role line from a `role:` frontmatter field (1.8.1)

## Navigation and layout

- Fixed sidebar on desktop, hamburger top bar on phones (before 1.0.0)
- Sidebar scrolls as one unit; bottom links always reachable, including with the phone address bar (1.0.2, 1.2.4)
- Sidebar title "Daniel Noam" (1.7.1)
- Two-column pages stay side by side on laptops and shrink together when zoomed in (1.6.0, 1.7.2)
- Phone padding uses the mobile token (1.2.6)
- Deep links work on refresh through the 404 redirect (1.2.0)

## Look and accessibility

- Locked to dark mode; light mode contrast fixed for when it returns (1.5.1)
- Respects reduced motion: no animated background, fades or smooth scroll (1.7.0)
- Visible keyboard focus ring; sidebar links reachable with Tab (1.7.0)
- Tighter typography and left-aligned section headings (1.7.0)
- Tabler line icons instead of emoji (1.7.0)
- No phone tap flash; every tappable thing has its own pressed state (1.7.3)

## Sharing and identity

- Link preview card for LinkedIn, WhatsApp and Slack; tab title "Daniel Noam - Unity Developer" (1.7.0)
- "DN" favicon and home-screen icon (1.7.1)

## Admin panel

- `/admin` edits pages and sections and publishes `config.js` as one commit (1.3.0)
- Opens from five taps on the version marker (1.3.1)
- Logs in with the GitHub token alone; repo derived from the URL (1.4.0)
- Token encrypted at rest, unlocked by Face ID / fingerprint (WebAuthn PRF) or a PIN (1.5.0)

## Site plumbing

- No build step; one base path constant in `js/core/config.js` (before 1.0.0)
- Visible version marker in the sidebar and this changelog (1.0.0)
- Shared DOM helpers and CSS de-duplication (1.0.1)
- GA4 analytics (before 1.0.0)
