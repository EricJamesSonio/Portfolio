# Quality Checklist (run before reporting done)

## Build and code
- [ ] `npm run build` succeeds; `npx astro check` has no new errors
- [ ] No console errors in the browser; no 404s for images (except the intentionally missing ones, which show placeholders)
- [ ] New CSS lives in its own file following the repo's convention; no overly generic selectors that restyle other sections
- [ ] No duplicated project in both featured and video grid
- [ ] `public/scripts/main.js` still works after removing entries

## Visual
- [ ] Matches existing colors, fonts, borders; looks native
- [ ] Mockup: laptop + overlapping phone, screenshots cropped from the top, no stretched images
- [ ] Placeholder phone looks intentional, not broken
- [ ] Spacing between featured block, video grid, and neighbors is consistent

## Responsive (check 320, 375, 414, 768, 900, 1024, 1280, 1536)
- [ ] One column at 900px and below; two columns above
- [ ] No horizontal page scroll anywhere
- [ ] Text does not collide with the mockup; tags and links wrap
- [ ] Navbar still works with the new content height; anchors still land correctly

## Accessibility
- [ ] Alt text on every screenshot; placeholder labeled
- [ ] Headings in order (section h2, project h3)
- [ ] Links keyboard focusable with visible focus; external links use `rel="noreferrer"`
- [ ] Text contrast at least 4.5:1; reduced-motion respected

## Performance
- [ ] Images lazy-loaded with async decoding
- [ ] No new JavaScript added for the featured block
- [ ] Oversized images (over about 500 KB) listed in the report

## Content and privacy
- [ ] No invented descriptions, tech, or URLs; every `TODO` is listed in the report
- [ ] No phone numbers, addresses, or keys added anywhere

## Final report must include
Files created, files edited, items removed, missing images, `TODO` content, notes about the 11-card grid, and suggested next steps (for example video optimization).
