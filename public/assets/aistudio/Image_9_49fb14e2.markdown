---
name: Tactile Postal Modern
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad6ff'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#efebff'
  surface-container-high: '#e9e5ff'
  surface-container-highest: '#e3dfff'
  on-surface: '#181445'
  on-surface-variant: '#484555'
  inverse-surface: '#2d2a5b'
  inverse-on-surface: '#f3eeff'
  outline: '#797587'
  outline-variant: '#c9c4d8'
  surface-tint: '#5f3de2'
  primary: '#4514c9'
  on-primary: '#ffffff'
  primary-container: '#5d3be0'
  on-primary-container: '#d9d0ff'
  inverse-primary: '#c9beff'
  secondary: '#782dd5'
  on-secondary: '#ffffff'
  secondary-container: '#924df0'
  on-secondary-container: '#fffbff'
  tertiary: '#454454'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d5b6c'
  on-tertiary-container: '#d7d4e8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#c9beff'
  on-primary-fixed: '#1b0063'
  on-primary-fixed-variant: '#4618ca'
  secondary-fixed: '#eddcff'
  secondary-fixed-dim: '#d7baff'
  on-secondary-fixed: '#280056'
  on-secondary-fixed-variant: '#6100be'
  tertiary-fixed: '#e4e0f5'
  tertiary-fixed-dim: '#c7c4d8'
  on-tertiary-fixed: '#1b1a29'
  on-tertiary-fixed-variant: '#464555'
  background: '#fcf8ff'
  on-background: '#181445'
  surface-variant: '#e3dfff'
typography:
  display-lg:
    fontFamily: Roboto Flex
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Roboto Flex
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Roboto Flex
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Roboto Flex
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Roboto Flex
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Roboto Flex
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Roboto Flex
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Roboto Flex
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Roboto Flex
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-stamp:
    fontFamily: Roboto Flex
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.14em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system synthesizes vintage postal-ephemera tactility with crisp, vibrant digital execution. Built for a digital-to-physical memory discovery and postcard dispatch service, the interface bridges analogue romance (postal cancellation stamps, perforated borders, deckled paper grain, warm travel ephemera) with high-efficiency utility.

The aesthetic fuses **Tactile / Skeuomorphic** nuances—cardstock offsets, delicate stamp serrations, muted ink textures—with a clean **Corporate / Modern** baseline that ensures frictionless photo uploads, address management, and one-tap checkout. The visual experience must feel warm, tangible, clear, and reassuringly transparent.

## Colors

The palette revolves around deep Electric Indigo (#5D3BE0) as the primary brand beacon, supported by vibrant Hyacinth Blue (#9E5AFD) for secondary interactive highlights and expressive touches.

- **Primary (`#5D3BE0`):** Anchors core actions, buttons, focused states, and prominent branded badging.
- **Secondary (`#9E5AFD`):** Applied for progressive indicators, subtle accents, active toggles, and delicate postal badge ribbons.
- **Tonal Lilacs & Paper Bases (`#F5F3FF`, `#EDE9FE`):** Serve as surface-container tiers, mimicking crisp linen stationery and light envelope cardstocks while keeping the canvas airy and contemporary.
- **Neutral & Ink (`#1E1B4B`, `#2E1065`):** Charcoal-indigo ink shades replace harsh blacks for long-form readability, body text, and stamped graphic treatments. Pure white (`#FFFFFF`) represents the pristine postcard face and high-elevation surface layers.

## Typography

Typography relies on clean, geometric grotesque proportions using the versatile Roboto family to anchor the design system with modern legibility and structural discipline.

- **Headlines & Display:** Weighted at 700 with subtle negative tracking to balance bold, punchy impact with modern clarity.
- **Ephemera Metadata (`label-stamp`):** Set in uppercase with wide tracking (`0.14em`) to evoke airmail franking, vintage datestamps, and authentic postcard coordinates.
- **Body & Long-form:** Retains open counters and a balanced 1.5 line-height ratio, ensuring high clarity across physical proofing views and checkout summaries.

## Layout & Spacing

A 12-column responsive fluid grid governs desktop and tablet canvases, condensing to a structured 4-column flow on mobile viewports.

- **Breakpoints:** Mobile (under 768px), Tablet (768px–1024px), Desktop (above 1024px).
- **Rhythm:** An 8px spatial grid standardizes margins, gutters, and element gaps. Compact groupings (such as postcard metadata, postage stamp indicators, and date fields) rely strictly on `space-xs` and `space-sm`.
- **Containers & Spacing:** Postcard canvases maintain fixed 3:2 and 4:6 aspect ratios within flexible containers, preserving print-proportional previews across all layout densities.

## Elevation & Depth

Depth in this design system is tactile and print-inspired rather than synthetic. It relies on subtle paper-stock separation, layered cards, and ambient tinted shadows:

- **Level 0 (Flat Ground):** `#F5F3FF` base canvas background with zero displacement.
- **Level 1 (Stationery & Containers):** Pure white (`#FFFFFF`) surfaces resting over tinted grounds, framed by a delicate 1px border (`#EDE9FE`) and an ambient tinted drop shadow: `0 2px 8px -2px rgba(30, 27, 75, 0.06)`.
- **Level 2 (Physical Postcards & Floating Previews):** Multi-layered cardstock illusion achieved via dual shadows: `0 4px 12px -2px rgba(93, 59, 224, 0.08), 0 12px 24px -4px rgba(30, 27, 75, 0.12)`.
- **Level 3 (Modals, Overlays, and Stamp Pickers):** Elevated dialogue containers with crisp borders and deep atmospheric diffusion: `0 20px 40px -8px rgba(30, 27, 75, 0.22)`.

## Shapes

The interface balances soft, friendly consumer touchpoints with precise postal cardstock geometry:

- **Base Radius (0.5rem / 8px):** Standard buttons, text input fields, and preview thumbnails.
- **Container Radius (1rem / 16px):** Postcard editor panels, elevated cards, and address book modals.
- **Special Decorative Profiles:** Postage stamps and postal vignettes employ simulated perforated edges via subtle scallop mask cutouts or fine 1px dashed separators (`#9E5AFD` at 30% opacity).

## Components

### Buttons
- **Primary:** Solid `#5D3BE0` fill, white text, 8px border-radius, `space-md` horizontal padding. Hover shifts to `#4c2ec4` with an elevated paper shadow.
- **Secondary:** Transparent fill with 1.5px border in `#5D3BE0`, text in `#5D3BE0`. On hover, fills with `#EDE9FE`.
- **Postal Stamp Action:** Squarish aspect ratio, subtle notched/serrated visual border, `#F5F3FF` background, interactive Hyacinth hover state.

### Input Fields & Address Blocks
- **Fields:** Pure white surface, 1px border (`#EDE9FE`), charcoal text (`#1E1B4B`). Focus introduces a crisp 2px stroke in `#5D3BE0` without outline distortion.
- **Postcard Address Form:** Lined stationery aesthetic featuring horizontal underline dividers and subtle airmail insignia indicators.

### Cards & Postcard Viewports
- **Photo Card:** Clean white envelope frame with a 6px or 8px paper border framing user photographs.
- **Reverse Flip View:** Simulates physical card stock with a vertical center divider line, stamp placement box in the upper right, and handwritten-style typography allowances for custom user messages.

### Chips & Filter Tags
- Pill-shaped (`rounded-full`), `#EDE9FE` background, `#1E1B4B` text. Selected state inverts to `#5D3BE0` fill with pure white label text.

### Checkboxes & Radios
- 4px radius for checkboxes, full circle for radios. Default state has a 1.5px stroke in `#9E5AFD`; active state fills with `#5D3BE0` with a pure white glyph.