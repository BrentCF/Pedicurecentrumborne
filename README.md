# Floot Design System

A reproducible record of the **Floot** project-management application — built by **Visscher Traffic** on the Lovable.app platform (React · Vite · Tailwind CSS · shadcn/ui).

> Floot — *Projectmanagement voor verkeersmaatregelen.*
> Project management for traffic-safety measures, detours and work orders. The product is **in Dutch**.

---

## Sources

This system was distilled from a single source: a thorough UI/UX design analysis written by **Codeless Factory** in May 2026.

| Source | Location |
| --- | --- |
| Original analysis | `uploads/Floot_Design_Analyse_v2.docx` (and extracted text in `uploads/floot_doc_text.txt`) |
| Live product | https://visscher-flow.lovable.app |
| Internal design system page (in product) | `/design-system` (colors, typography, components) |

> ⚠️ **No codebase or Figma file was attached.** Every spec below is taken directly from the analysis document, which was itself written from the live application and the in-product `/design-system` page. If a real source-of-truth (repo or Figma) is available, please attach it so logos, icons, and components can be lifted verbatim instead of reconstructed.

---

## Index

| File / folder | What's in it |
| --- | --- |
| `README.md` | This file — context, content, visual & iconography rules |
| `SKILL.md` | Cross-compatible Agent Skill manifest (use with Claude Code) |
| `colors_and_type.css` | All design tokens as CSS custom properties (drop into any prototype) |
| `fonts/` | Webfont fallbacks (Inter via Google Fonts — see ⚠️ below) |
| `assets/` | Logo, brand marks, generic placeholder imagery |
| `preview/` | Small HTML cards shown in the Design System tab |
| `ui_kits/floot/` | Pixel-faithful React (JSX) recreation of the Floot web app |

---

## 1 · Brand identity

Floot's brand is **utilitarian and confident**. It looks like good production software — not a marketing site. The product belongs to a traffic-engineering company, and the look telegraphs that: a near-black sidebar that reads as **equipment** rather than chrome, a single bright blue for action, a single Floot-orange highlight that does double duty as the logo accent and the "warning / attention" status color.

**Logotype.** `floot` set in **bold italic** in white, followed by an orange double chevron `>>`. Always on the dark sidebar background `#18181B`. The chevron is the visual anchor of the brand — every other accent on the app is blue; the orange chevron is the only piece of warmth.

**Tagline.** *"Powered by Visscher Traffic"*. Floot is the application; Visscher Traffic is the company.

---

## 2 · Content fundamentals

### Language and audience
- **All product copy is Dutch.** Any prototypes, slide decks, or assets generated against this system **must also be in Dutch** unless the user explicitly asks for English.
- The audience is **traffic-engineering professionals** doing day-to-day project administration: planners, calculators, fitters in the field. Copy is practical, never breezy.

### Tone
- **Direct, declarative, professional.** Reads like a contractor's clipboard, not a SaaS landing page.
- **No marketing language**, no hype words, no exclamation points, no slogans inside the app.
- Sentence-style microcopy with the verb up front: *"Project toevoegen"*, *"Groep toevoegen"*, *"Filters"*. Not *"+ Add a new project to your workspace"*.

### Person & address
- **Second-person imperative (`u`-form implicit via verb)** for buttons and forms — Dutch business-formal.
- Status and metadata are stated as nouns or noun-phrases: *"In voorbereiding"*, *"Te calculeren"*, *"Calculatie definitief"*, *"Offerte verstuurd"*, *"In uitvoering"*, *"Gereed"*, *"Vervallen"*, *"Financieel afgehandeld"*.
- Never *we* / *wij*. The app is a tool, not a personality.

### Casing
- **Sentence case** for page titles, button labels, menu items, headings. *"Werkbegroting"*, not *"WERKBEGROTING"* or *"Werk Begroting"*.
- **UPPERCASE with letter-spacing** ONLY for table column headers and small metadata labels (`text-xs`, `tracking-wide`, muted gray): *"ORGANISATIE"*, *"UITVOERDATUM"*, *"PERIODE"*, *"STATUS"*.
- Project codes are uppercase alphanumeric, no spaces: `B250744`, `B250692`.

### Emoji & symbols
- **No emoji anywhere.** Not in microcopy, not in empty states.
- A single unicode glyph is in use: the bullet **`•`** as the colored dot inside status pills.
- The double chevron **`>>`** is treated as a logo character, not a navigation symbol.

### Examples lifted from the live app
- Page title: **`B250744 - Den Haag Binckhorst`** (project code, en-dash, location)
- Section label: **`EXTERNE PAGINA'S`** (uppercase + Dutch apostrophe)
- Button: **`+ Project toevoegen`** (Plus icon flush left, no period)
- Status pill: **`• In uitvoering`** (dot + sentence-case state)
- Sidebar account: **`Demo · demo@visschertraffic.nl`**

### Numbers and dates
- **Dutch numeric format**: comma as decimal separator (€ 12.450,00). Thousand separator is a period.
- **Date range**: `dd-mm-yyyy → dd-mm-yyyy` in the period column.
- Project counts shown literally: *"1215 projecten"*.

---

## 3 · Visual foundations

Floot is a **flat, low-chroma, high-density admin product**. The whole visual system is built on top of stock Tailwind + shadcn/ui defaults, with two brand colors layered on. There are no illustrations, no gradients, no photography in product. Everything that isn't a typographic element is a 1-pixel stroke or a tinted-10%-on-white pill.

### Color
- **One bright blue** (`#2563EB`) carries all action: buttons, links, active tabs, focus rings, the "info" semantic.
- **One brand orange** (`#F97316`) carries the logo chevron, the "warning" semantic, and the *Te calculeren* / weekend-uurtype contexts. It is **never** used for primary action.
- Sidebar is **near-black `#18181B`** and stays dark in every mode, including dark mode. The rest of the canvas is **`#F5F5F5`** with white **`#FFFFFF`** cards and tables on top.
- The **status palette is rich** (9 project states + task variants) but every status pill follows the same recipe: a saturated dot color + the same color at 10% as background + the same color for text. Never multi-color, never bordered.

### Typography
- **Single family**: Tailwind's `font-sans` (system-ui). On real users' machines this resolves to **Inter** (macOS / Chromium) or **Segoe UI** (Windows). For our prototypes we load Inter explicitly from Google Fonts so every export matches.
- **Three weights**: 400 regular, 600 semibold, 700 bold. No light, no black, no italics (other than the logotype).
- **Two-axis hierarchy**: a Tailwind scale `text-xs` → `text-5xl`, leaning **small**. The most common sizes in product are `text-sm` (body / table) and `text-xs` (labels). `text-3xl` is reserved for page titles.

### Backgrounds & imagery
- **No background photography. No hand-drawn illustration. No repeating texture. No gradients.** The canvas is `#F5F5F5`, panels are `#FFFFFF`, sidebar is `#18181B`. That's it.
- The only "filled" surfaces inside the app are status-pill backgrounds (single hue at 10% opacity) and the occasional row tint (`#FFF7ED` orange for expanded werkbegroting group rows).
- For decks or marketing-adjacent surfaces, do not invent imagery — leave full-bleed photo slots empty with `<image-slot placeholder="…">` and ask the user.

### Layout
- **Two-column app shell** that is **not** customisable: a fixed 96 px dark sidebar on the left, fluid content on the right. No top bar. Sidebar is **not collapsible** in the current version.
- Content padding is consistently `px-8` (32 px) horizontally.
- Tables fill the width and scroll vertically; their headers do **not** stick.

### Corner radii
- The system has three radii in real use: **`6px`** (everything — buttons, inputs, cards, nav items), **`12px`** (cards, modals, dropdowns when "soft"), and **`9999px`** (pill — status badges, the sidebar search field, avatars).
- Tables and inputs inside tables are square (`radius: 0`).

### Borders
- One default stroke: **`1px solid #EDEDED`**. Cards, inputs, modal edges, table row separators — all the same hairline.
- A stronger stroke (`#C2C2C2`) exists for emphasis but is rarely used in product.

### Shadows / elevation
- **Four steps**: `none` → `0 1px 2px /5%` (cards at rest) → `0 4px 6px /10%` (dropdowns, tooltips) → `0 10px 15px /10%` (modals, drawers).
- A **focus ring** `0 0 0 3px rgba(37,99,235,0.30)` lifts inputs and buttons on keyboard focus.
- No inner shadows. No coloured shadows. No glow.

### Cards
- White, `1px solid #EDEDED`, **`rounded-lg`** (≈ 12 px), `p-6` (24 px) standard padding, `shadow-sm` at rest.
- An optional `#F9FAFB` section header strip at the top of a card carries the title.

### Hover / press states
- **Buttons** darken their fill by one Tailwind step on hover (primary `#2563EB` → `#1D4ED8`). Secondary/ghost go from transparent → `#F5F5F5`.
- **Table rows** shift to `#F9FAFB`.
- **Sidebar nav items** shift from `#18181B` → `#27272A`.
- **Links** turn primary-blue and underline.
- **No scale transforms on press**, no haptic-style bounce. Floot is desktop-first office software.
- All transitions are **`150 ms`** with Tailwind's default ease curve. Hover-link colour change is **`100 ms`**.

### Loading
- A blank white screen with the centered `floot >>` logo and the word *"Laden..."* in primary blue. No spinners, no skeletons. Data is expected to load fast.

### Dark mode
- A moon/sun switch exists top-right in the content area; the **sidebar stays dark in both modes**. Most of the cards in this system are documented in light mode (the default).

### Transparency & blur
- **Used very sparingly.** The only transparent surfaces are the 10%-on-white status pill backgrounds (which are baked-in hex values, not actual `rgba`), and the focus ring (30% blue). **No backdrop-blur, no glass-morphism.**

### Animation
- Animation is **functional only**: hover colour changes (150 ms ease), focus ring fade-in, dropdown / modal mount (fade + tiny y-shift). No bounce, no spring, no parallax, no scroll-linked effects.

---

## 4 · Iconography

### Library
Floot uses **[Lucide React](https://lucide.dev/)** (the default icon set for shadcn/ui and Lovable). Every icon in the product is a Lucide SVG.

- **Style**: stroke-only, no filled icons.
- **Stroke width**: `1.5` (Lucide default — do **not** use the 2 px or 1 px variants).
- **Sizes**:
  - 16 px (`w-4 h-4`) — sidebar nav, inline-in-button, table cells. The default.
  - 12–14 px — small inline indicators (ExternalLink in sidebar section labels, the MapPin inside a coloured circle in werkbegroting rows).
  - 20 px (`w-5 h-5`) — standalone action buttons.
- **Colour**: `currentColor` — every icon inherits the surrounding text colour. In the dark sidebar, inactive icons are `#A1A1AA` and active icons are `#FFFFFF`. Inside a primary button, icons are white; inside a secondary/ghost button, near-black.

### How to use icons in this design system
- Load Lucide from CDN — already done in `ui_kits/floot/index.html`:
  ```html
  <script src="https://unpkg.com/lucide@latest"></script>
  ```
  Then `<i data-lucide="check-square"></i>` and call `lucide.createIcons()`.
- For static screenshots (e.g. preview cards), the same CDN works.
- **Never** redraw a Lucide icon by hand.

### Icons actually used in product
| Lucide name | Where in Floot |
| --- | --- |
| `check-square` / `square` | Taken-nav, checkbox column |
| `layout-grid` | Projecten-nav |
| `file-text` | Werkbon, bestanden-tab |
| `package` | Product templates |
| `wrench` | Werkzaamheid templates |
| `box` | Materialen |
| `database` | Stamdata |
| `users` | Accounts |
| `palette` / `settings` | Designsysteem |
| `message-square` | Feedback |
| `map-pin` | Location icon in werkbegroting rows (white in a coloured circle) |
| `grip-vertical` | Drag handle in tables |
| `chevron-right` / `chevron-down` | Expand / dropdown |
| `search` | Sidebar search + table search |
| `plus` | Add project / group |
| `sliders-horizontal` | Filters |
| `external-link` | External-pages indicator |
| `moon` / `sun` | Dark/light mode switch |

### Logo & brand marks
- A vector wordmark **(`assets/floot-logo.svg`)** is included. ⚠️ **This is reconstructed from spec** (italic-bold `floot` + orange double chevron on dark) because no original SVG was provided — replace it with the real file when available.
- A favicon placeholder is included for completeness.

### Emoji / unicode
- **No emoji.** If you see one in a prototype, remove it.
- The only unicode glyph used as an icon is the bullet `•` inside status pills (this is the glyph in text, not an SVG).

---

## 5 · Reproduction checklist (from the source doc)

✅ Brand colors, semantic colors, all 9 project-status pills, type scale, weights, line heights, spacing 4 px grid, radii, shadows, focus ring, sidebar metrics, button variants × sizes, input states, badge anatomy, table row anatomy, Lucide icon catalogue, full URL map, project-detail tabs.

⚠️ **Open / not in source doc**: modal & drawer specifics, in-modal form patterns, exact animation durations beyond 150 ms, responsive tablet / mobile breakpoints, real logo SVG, illustration system (probably none — to be confirmed).
