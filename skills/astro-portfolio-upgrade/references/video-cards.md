# The Existing Video-Card Grid

Contents: default stance · removing duplicates · optional tidy-ups · performance plan · what not to do

## Default stance
Leave the video cards as they are: same grid, same look, same behavior. Only remove the cards for projects that are now featured (EduTool x2, Voting System, Apptel). Remaining projects: agrifresh, assessmentgenerator, chatly, googleclassroom, gown, helpertool, jollibee, motordev, personalapp, starbucks, sweetify.

## Removing duplicates safely
1. Find where the cards come from: a data array, hard-coded markup, or both.
2. Remove the four entries (and any matching entries in lists used by `public/scripts/main.js`, such as hover-play handlers, intersection observers, or filters).
3. Check that the grid still fills rows sensibly: 11 cards in 3 columns leaves the last row with 2 cards. Mention this to the user; offer options (leave as is, or add/feature another project). Do not invent a card.
4. Keep the `.mp4` files unless told to delete. Report that four files are now unused and how much space they take.

## Optional improvements (do only when asked)
Fifteen videos are the heaviest part of the site. If the user asks to speed it up, in this order:
1. **Do not load videos until needed:** `preload="none"`, add a `poster` image per video, start loading only when the card scrolls near the viewport.
2. **Play on hover (desktop) or when mostly in view (touch), pause when off screen.** Only one or two videos should play at once.
3. **Compress:** short loops (3 to 6 seconds), about 480 to 720px wide, H.264 MP4, no audio track, target under about 1.5 MB each. Suggest a tool/command for the user to run; do not overwrite originals, write compressed copies to a new folder first.
4. **Reduce motion:** respect `prefers-reduced-motion` by showing the poster only.
5. **Consider external hosting** (a media CDN) if total size stays large.
Each step is a separate request. Do them one at a time and report file sizes before and after.

## Cards: consistency with the new block
If the user wants the grid to feel like part of the same section, only adjust spacing between the featured block and the grid (a clear gap and, if needed, a quiet sub-heading). Do not change card styling.

## What not to do
- Do not convert the video cards to images.
- Do not delete or rename video files.
- Do not change `main.js` behavior beyond removing the four entries.
- Do not add a carousel, filters, or modals.
