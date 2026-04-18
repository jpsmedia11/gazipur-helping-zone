# Design Brief

## Direction

Gazipur Helping Zone — Warm, welcoming community service directory for Bengali residents, evoking approachability and local trust.

## Tone

Warm, editorial, and accessible. Terracotta primary with sage accents — community-centric warmth, not corporate coldness.

## Differentiation

Service category icons in accent color create visual rhythm and aid scannability for non-technical users; warm shadow treatment reinforces approachability.

## Color Palette

| Token      | OKLCH           | Role                           |
| ---------- | --------------- | ------------------------------ |
| background | 0.96 0.015 75   | Warm cream base                |
| foreground | 0.2 0.03 50     | Dark warm text                 |
| card       | 0.98 0.01 75    | Lifted card surfaces           |
| primary    | 0.45 0.12 30    | Trust & action (terracotta)    |
| accent     | 0.55 0.15 150   | Secondary highlights (sage)    |
| muted      | 0.92 0.02 75    | Section dividers & disabled    |

## Typography

- Display: Lora — warm serif for headings, logo, section titles (creates editorial, inviting hierarchy)
- Body: DM Sans — clean sans for UI labels, descriptions, contact info (readable, accessible)
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Warm shadows (rgba(101, 67, 33, 0.08-0.12)) on cards lift content subtly; clear card backgrounds differentiate layers without harsh borders; spacious layout creates breathing room.

## Structural Zones

| Zone    | Background | Border                    | Notes                              |
| ------- | ---------- | ------------------------- | ---------------------------------- |
| Header  | card       | `border-b border-primary` | Warm terracotta underline          |
| Content | background | —                         | Alternating sections with clarity  |
| Cards   | card       | —                         | Warm shadows, 6px radius           |
| Footer  | muted      | `border-t border-primary` | Subtle warm base with accent line  |

## Spacing & Rhythm

Spacious 3rem section gaps, 1.5rem card padding, 1rem between list items; card-based layout creates natural grouping; warm shadows add depth without visual clutter.

## Component Patterns

- Buttons: Primary (terracotta bg, warm shadow on hover), secondary (accent bg, text-primary), CTAs (WhatsApp/Call/Email in accent color)
- Cards: 6px corners, card background, warm shadow, 1.5rem padding, category icon in accent at top-right
- Badges: Category tags in accent background with warm text

## Motion

- Entrance: Fade-in on mount (transition-smooth, 0.3s cubic-bezier)
- Hover: Cards lift with increased shadow (warm-md), buttons scale slightly (1.02x)
- Decorative: None; focus on clarity and accessibility

## Constraints

- Light mode only; no dark mode (warm aesthetic is light-dependent)
- No gradients; flat colors maintain clarity for non-technical users
- Minimal animations; prioritize responsive reflow for mobile users

## Signature Detail

Warm terracotta service category icons as badge accents — creates instant visual hierarchy and aids rapid category discovery for non-technical Bengali residents.
