# Layout and Responsive Behavior

Contents: breakpoints · page shell · band-by-band behavior · mobile rules · height strategy · testing matrix

## Breakpoints (Tailwind defaults)

| Name | Min width | Typical device |
|---|---|---|
| base | 0 | phones (design for 375px) |
| `sm` | 640px | large phones |
| `md` | 768px | tablets |
| `lg` | 1024px | laptops, bento goes 2-column |
| `xl` | 1280px | desktops |

Write the phone layout first, then add overrides upward.

## Page shell (`App.jsx`)

```jsx
<div className={`${darkMode ? "bg-black text-white" : "bg-white"}
  w-full min-h-screen flex flex-col gap-5
  px-1 md:px-[100px] lg:px-[130px] xl:px-[150px]
  py-6 md:py-8 lg:py-10`}>
  <Container1 />   {/* hero */}
  <Container2 />   {/* bento */}
  <Divider>ITERATE. BUILD. DEPLOY.</Divider>
  <Container3 />   {/* projects + github */}
  <Divider>RECOGNITION | SOCIALS</Divider>
  <Container4 />   {/* certs + contact */}
  <ChatBot />
  <footer className="mt-10 pt-6 border-t text-center text-[11px] font-mono ...">
    © Your Name | Personal Portfolio 2026
  </footer>
</div>
```
Key idea: **horizontal padding is almost zero on phones (`px-1`) and grows to 100/130/150px** so cards use the full phone width but desktop gets generous margins. Consider `px-3` on phones for breathing room. Sections are stacked with `gap-5`. Single page, no router, no navbar.

## Band 1: Hero (`Container1`)

- Wrapper `h-[95vh] w-full flex flex-col`. Top divider caption sits at the very top (slightly pulled up with negative margin), a `<main>` with `flex-1 flex items-center justify-center` centers the content vertically, and the `SOLVING THROUGH CODE` divider sits in the `<footer>` at the bottom.
- Content row: `flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-center`.
  - **Phone:** portrait on top (centered), then text centered.
  - **md+:** portrait left, text right, text left-aligned (`md:items-start`).
- Portrait sizes: `h-56 w-56` (phone) -> `sm:h-64 sm:w-69` -> `md:h-80 md:w-55` -> `lg:h-100 lg:w-75`. Always `object-cover`.
- Name: `text-4xl` -> `md:text-5xl` -> `lg:text-6xl`; centered on phones (`text-center sm:text-left`).
- Buttons: `flex-col sm:flex-row`, each `w-full sm:w-auto`.
- Safer alternative to `h-[95vh]`: `min-h-[100svh]` so mobile browser bars and long names do not clip content.

## Band 2: Bento (`Container2`)

```jsx
<div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-4">
  <div className="flex flex-col gap-4"> <Experience/> <Education/> </div>
  <div className="flex flex-col gap-4"> <About/> <TechStack/> </div>
</div>
```
- **Below `lg`:** one column, order is Experience -> Education -> About -> Tech Stack. Consider reordering on mobile so About comes first (`order-first` on the right column, or `lg:order-none`).
- **`lg+`:** 35% / 65% columns. Remove the original's odd `w-[98.4%]` hack on the right column; the grid already sizes it.
- Inner scroll areas keep cards from growing too tall: Experience list `max-h-[280px]`, Tech Stack `max-h-[300px]`, both `overflow-y-auto custom-scroll`.

## Band 3: Projects + GitHub (`Container3`)

- Projects card holds a scroll region `h-[800px] overflow-y-auto space-y-4`. On phones, an 800px nested scroller can fight with page scroll; prefer `max-h-[70svh] md:max-h-[800px]`.
- Each project article: `flex flex-col lg:flex-row gap-4`.
  - Image box: `w-full lg:w-100 h-70 flex-shrink-0` (400px wide on desktop, full width and 280px tall on phones), image `h-full object-contain`.
  - Text column `flex-1`.
- Card padding `px-2 sm:px-6 py-6` (tight on phones).
- GitHub calendar sits in `flex justify-center overflow-x-auto px-4 py-4`, so the 53-week graph **scrolls horizontally inside its panel on phones** instead of breaking the page. Block size 24 with margin 4 and `blockRadius={0}` (square cells) matches the style. Use `blockSize={14}` on small screens if you prefer fitting without scrolling.
- Remove the original's negative margin `mr-[-15px]` on the wrapper; it causes horizontal overflow.

## Band 4: Certifications + Contact (`Container4`)

```jsx
<div className="flex flex-col lg:flex-row gap-5">
  <div className="flex-1"><Certifications/></div>
  <div className="flex-1"><Contact/></div>
</div>
```
Contact has its own inner split: `flex flex-col gap-4 md:gap-5 md:flex-row` so "Find me on" and "Get in touch" are stacked on phones and side by side from `md`.

## Chatbot responsive rules

- Panel: `fixed bottom-24 right-4 md:right-6 w-[90%] sm:max-w-sm md:w-auto h-[60vh] max-h-[500px]`. On phones it spans 90% of the width; give desktop an explicit width such as `md:w-96` (the original's `md:w-auto` can collapse).
- Button `fixed bottom-6 right-6 w-12 h-12`, banner `fixed bottom-24 right-6`. Use `z-50`. Respect iOS safe area: add `pb-[env(safe-area-inset-bottom)]` where needed.

## Mobile rules of thumb

1. No horizontal page scroll. Wide things (calendar, long tags) scroll inside their own `overflow-x-auto` box. Check with DevTools at 320 and 375px.
2. Tap targets at least 44x44px (the theme switch is 56x28 and small; pad the hit area).
3. Divider captions are 8px on phones and `whitespace-nowrap`: keep captions short so they never overflow.
4. Use `svh`/`dvh` instead of `vh` for full-height areas on mobile.
5. Images: serve WebP, set `loading="lazy"` on below-the-fold images, give them explicit aspect space to avoid layout shift.
6. Hover effects (video swap, image zoom) do not exist on touch. Provide a tap fallback: toggle the video on `onClick`/`onTouchStart` or autoplay once.
7. Keep font sizes at least 12px for readable text; 8-9px is reserved for decorative labels.

## Testing matrix

Check at **375, 414, 768, 1024, 1280, 1536px** in both themes: hero fits without clipping, bento columns switch at 1024, project image/text stack below 1024, no sideways scroll, chat panel does not cover the input on a phone keyboard, divider captions do not wrap.
