# Umikaze-海風 — delivery check

2026-09-14, exact dist output verified locally at port 4202.

| Requirement | Evidence | Result |
| --- | --- | --- |
| Original identity and licensed materials | Existing logo and garden/dog photographs; real Instagram food photographs | PASS |
| Brief homepage and separate details | Four routes: top, menu, guide, access | PASS |
| Weekly menu photos, no old course | Three linked historical examples, current menu clearly directed to Instagram; no course text | PASS |
| Updated hours and parking | Sheet-based seasonal hours; Tuesday closure, weather notice, tandem parking | PASS |
| Dog visit requirements | Vaccinations, veterinary phone check, WanPass, small-dog priority and larger dogs on lead | PASS |
| Clear Instagram direction | Desktop header, mobile fixed link and full-width section on all four pages | PASS |
| PC visual quality | Four pages visually inspected at default desktop viewport, including photos and opening-hours layout | PASS |
| Mobile visual quality | All four pages at 390px; all four pages measured at 320px without horizontal overflow or text bounds outside viewport | PASS |
| Interactions | Desktop route navigation; mobile open/close, Escape, navigation; FAQ pointer open and keyboard close | PASS |
| Resources and actual served output | 5 HTML documents, 105 local links, 14 image variants plus all styles/scripts checked for matching local-server bytes | PASS |
| Errors and accessibility basics | No browser error/warning logs; image alternative text and dimensions, visible focus, reduced-motion alternative | PASS |

No reservation sent, no Instagram post/reaction made, no existing domain modified. External destinations are preserved from the supplied shop sources. No automatic Instagram feed or real-time opening status is claimed. Original asset sources and detailed fact precedence are retained in an ignored local source note.

## Local motion update — 2026-09-14

- Replaced the still split hero with the original shop's 15.06-second garden/terrace/dog film. No stock or generated video was substituted. The user's permission covers the original website materials.
- Responsive H.264 MP4s: 1440×810 desktop, approximately 3.2 MiB; 576×720 mobile center crop, approximately 1.8 MiB. Both have fast-start metadata and no audio stream. Both decoded through the final frame without errors. A lightweight garden-frame poster remains available.
- Added clipped heading entrances, staggered section/photo entrances, scroll-linked garden-image movement, and link/photo hover transitions. Motion-reduction settings disable decorative movement and automatic video loading. No new production dependencies.
- Actual in-app browser: desktop at 1271px, mobile at 390px and 320px; confirmed advancing video time, looping, muted/inline settings, correct mobile source, play/pause buttons, and offscreen pause. The mobile video button is not covered by the fixed Instagram link.
- Confirmed menu navigation, scroll-to-about, photo/stamp layout, completed reveal opacity, no horizontal overflow, and no browser warning/error logs. Checked secondary-page regression at narrow widths.
- `npm test`: preference changes, data saver, explicit play, paused-state persistence, background/offscreen pause/resume, blocked autoplay, failed-source poster, and pages without video. These exceptional cases are exercised in a DOM-behavior harness without modifying the user's operating-system settings.
- `node scripts/verify.mjs http://127.0.0.1:4202/`: five HTML documents, 111 local references, 17 media assets, all styles and scripts; actual served bytes match the local output. Video-size budgets and playback attributes pass. `git diff --check` passes.
- Scope: local preview only. No commit, remote push, or hosted-site deployment performed for this motion request.

## GitHub Pages release correction — 2026-09-15

- Cause confirmed through the Pages API: legacy publishing selected `main:/`, where no site `index.html` exists. The resulting public page rendered README content.
- Changed the repository's Pages source to GitHub Actions. The workflow builds and validates the site, then uploads only `dist/`, including both optimized hero videos.
- Preserved all four pages, their content, styling, images, and motion behavior. Existing Sites configuration and its source remote remain unchanged.
- Pre-publication checks passed: production build, motion behavior tests, 111 local references, 17 media assets, video-size budgets, and identical served bytes for every page/media/style/script at the exact `/Umikaze/` path prefix. Default root hosting also passes.
- The 404 home link now uses the deployment base path. Tested project-root return, project-relative assets, nested links, and rejection of links outside that base path.
- Publication has a required post-deployment check of the exact public root URL, all five HTML files, every media asset, all styles, and JavaScript against the built bytes. MP4 response types are checked too. The workflow's terminal result records live verification separately from a successful build or source push.

## Rainy-day notice correction — 2026-09-15

- Per the user's current instruction, rainy days mean temporary closure, including takeout. Removed the prior rain-only takeout and handmade-shop-open statements.
- Updated the homepage notice, menu notice, guide FAQ, and access hours notice. Other hours, contact links, photos, layout, and video remain unchanged.
- Added regression checks requiring the closure notice on all four content pages, the takeout suspension on menu/guide, and no obsolete rainy-day policy.
- Passed root and `/Umikaze/` builds, motion tests, static verification, and exact served-byte verification at the production path prefix: five HTML files, 111 local references, and 17 media assets.
- Actual browser checks: desktop FAQ opened successfully; 390px mobile FAQ, menu notice, and access hours were visually inspected for readable, unclipped text.
- The user authorized commit, push, and publication. The existing GitHub Pages workflow and its mandatory live verification are retained; the separate Sites copy is outside this release.
