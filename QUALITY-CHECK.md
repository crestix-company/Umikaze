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
