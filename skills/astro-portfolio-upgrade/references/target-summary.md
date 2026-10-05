# Target Design Summary (fallback if `react-portfolio-builder` is unavailable)

- **Type:** one monospace stack for everything: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
- **Accent:** orange only. Divider/accent text about `#f97316`; links `orange-400` (dark) / `orange-600` (light) at ~70% opacity; chips light `#fff7ed` bg + `#fed7aa` border, dark `rgba(249,115,22,.10)` bg + `rgba(249,115,22,.30)` border; tiles `rgba(154,52,18,.10)` bg + `rgba(234,88,12,.30)` border.
- **Surfaces:** light page white, card white; dark page black, card `#0f0f0f`; inner panels light `#f9fafb`/`#f3f4f6`, dark `#1a1a1a`/`#0a0a0a`. Card border `rgba(154,52,18,.30)`. Shadows: light `0 4px 12px rgba(0,0,0,.08)`, dark `0 8px 32px rgba(0,0,0,.4)`.
- **Text:** light heading black, body `#374151`, muted `#6b7280`; dark heading white, body `#d1d5db`, muted `#9ca3af`.
- **Shape:** flat, square corners; `rounded` only on portrait (small), dots, avatars, theme switch pill.
- **Card:** padding 24px, 1px border; title uppercase, bold, tight, ~18px.
- **Divider caption:** orange, 8px (10px at lg), letter-spacing 0.4em, uppercase, nowrap, flanked by 1px lines fading from transparent to orange (~70% opacity), whole divider at 80% opacity.
- **Hero:** name bold 36 to 60px; role uppercase tracking 0.25 to 0.3em; buttons uppercase bold tracking 0.2em, padding 16px 40px; primary black-on-white inverted per theme; secondary 1px translucent border; theme pill 56x28.
- **Timeline:** rail 2px gray; dots 12px with ring; active orange; `Current` badge peach.
- **Tech chips:** 9px uppercase group labels + hairline; chips 12px text, padding 4px 8px.
- **Featured card:** media left (~40%), text right; title orange; description 14px, justified, relaxed; chips; `View Project ↗ | View Code ↗`.
- **GitHub palette:** light `#ebedf0 #ffedd5 #fed7aa #fb923c #ea580c`; dark `#161616 #431407 #7c2d12 #c2410c #f97316`; square cells.
- **Page padding:** phones ~4 to 12px; md 100px; lg 130px; xl 150px; vertical gap 20px.
- **Breakpoints:** md 768, lg 1024, xl 1280; bento switches to 35/65 at lg.
- **Chat:** square 48px button bottom-right (z-50) with bounce; teaser bubble above after 2s; panel `fixed bottom-24 right-4`, up to ~384px wide on desktop, 90% width on phones, max-height ~500px.
- **Motion:** theme ripple 0.7s via clip-path circle; hover scale 1.05 on buttons; always respect reduced motion.
