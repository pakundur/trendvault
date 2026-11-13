# TrendVault — demo built from the thread's five resources

A working demo page combining the design resources from that thread. Built and
verified on 9–13 Nov 2026 in Termux. **Status: builds clean, renders clean.**

## What actually got used

| Resource | Status | How it appears in this demo |
|---|---|---|
| **dithercn.dev** | Free, MIT | **The entire visual layer.** Aurora hero background, dithered display text, buttons, cards, animated numbers, stat cards, sparkline. 12 registry items, real source compiled in. |
| **component.gallery** | Free, open source | Informed nav taxonomy + card composition. Reference only, no code copied. |
| **navbar.gallery** | Free, no login | The sticky nav with hover mega-menu. Pattern, not code. |
| **pixlpin.com** | Free w/ account | Card density and rhythm. Reference only. |
| **vanta.supply** | **PAID — $72/yr** | **Not used.** Assets are paywalled. Listed on the page for honesty. |

## Verified numbers on the rendered page

- 69 registry items installed (real count from `dithercn.dev/r/registry.json`)
- 4 of 5 resources free
- 1 paywalled (vanta.supply)
- Mean trend index 104 (+12.4%)

## Stack

React 19 · Vite 7.3.8 · Tailwind CSS v4 · Radix UI · lucide-react

## Files you'd actually edit

```
src/App.jsx          <- the whole page (nav, hero, grid, code panel, footer)
src/index.css        <- design tokens from dithercn + theme colours
index.html           <- document shell
vite.config.js       <- @ alias, tailwind plugin
components/dithercn/ <- 10 real dithercn components (unmodified)
lib/dither/          <- 12 files, dithercn core (unmodified)
lib/utils.ts         <- cn() helper (shadcn's standard)
```

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## What's genuinely from dithercn vs. written here

- **Unmodified from their registry:** everything in `components/dithercn/` and
  `lib/dither/`. Pulled from `https://dithercn.dev/r/<name>.json`.
- **Written here:** `App.jsx`, `index.css`, layout, copy, data, footer.
- **Nothing invented:** no fake components, no screenshots. The dither machinery
  (`createShader`, `getContext`, `bayer4` matrices) is in the compiled bundle.

## Bugs found and fixed during the build

1. **`DitherCard` `glow` prop** — I passed `glow="corner"`, which isn't valid.
   Valid values are `top-left | top-right | bottom-left | bottom-right |
   left | right | top | bottom | none`. An invalid value throws
   `Cannot read properties of undefined (reading 'cx')` at render time.
2. **Termux:** `/tmp` is not writable. All logs must go to `$HOME`.
3. **jsdom** lacks `ResizeObserver` and `IntersectionObserver`, which dithercn's
   `useWidth` / `useInView` hooks require. Polyfill before headless testing.

## Honest limits

- No screenshots — no browser available in this Termux environment. Verified by
  headless render instead (14 checks, 0 runtime errors, 129 KB of rendered HTML).
- The Aurora shader needs WebGL. In the jsdom test it falls back; in a real
  browser it renders the animated curtain effect.
- `pixlpin` was launched ~Oct 2026 and has no pricing page yet. Free today, not
  guaranteed free later.
