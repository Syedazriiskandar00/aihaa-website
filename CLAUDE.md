# CLAUDE.md - The Brain (AIHAA Water Purifier Website)

## Project Goal
Build a world-class, international-grade website for AIHAA Water Purifier — a premium Malaysian water purification brand. The website must compete with global brands like Coway, Cuckoo, and A.O. Smith in design quality, UX, performance, and SEO.

## Critical Rule
BEFORE doing ANY work, read `tasks/lessons.md` first. Learn from past mistakes. Never repeat the same error twice. This is non-negotiable.

## Context Files (Read only what you need per task)

| File | When To Read |
|------|-------------|
| `me.md` | Starting a session, understanding owner context |
| `work.md` | Understanding AIHAA brand, products, pricing, market |
| `team.md` | Delegating tasks to sub-agents |
| `priorities.md` | ALWAYS read first — current phase, what's done, what's next |

## Rules (Read before executing)

| File | When To Read |
|------|-------------|
| `rules/workflow.md` | Before starting any task — know which phase you're in |
| `rules/tone.md` | Writing content, designing UI, reviewing for AI patterns |
| `rules/format.md` | Writing code, naming files, git commits, project structure |

## Task Tracking

| File | Purpose |
|------|---------|
| `tasks/todo.md` | Current task plan with checkable items (create if not exists) |
| `tasks/lessons.md` | Mistakes log — READ THIS FIRST before every session |

## Session Start Checklist

1. READ `tasks/lessons.md` — learn from past mistakes
2. READ `priorities.md` — know current phase and focus
3. READ `rules/workflow.md` — understand which phase you're in
4. CHECK `tasks/todo.md` — see what's pending
5. Only then start working

## Quality Standard
Every output must pass this test: "Would a Fortune 500 company use this on their website?" If the answer is no, redo it.

## Current Sprint — Q2 2026 Corporate Rebuild

Active feature branch: `feat/corporate-rebuild-2026-q2` (local only, do not push without explicit Azri approval). Source of truth docs in `tasks/2026-q2-corporate-rebuild/` — `IMPLEMENTATION_PLAN.md`, `SECTION_SPEC.md`, `PLACEHOLDERS.md`.

Phases shipped to the branch (as of 2026-04-18): Phase 1 `/service`, Phase 2 `/produk-luar`, Phase 3 `/produk-dalam`, Phase 4 homepage `/`, Phase 5 `/tentang-kami`. Product detail pages `/product/[slug]` still use the pre-rebuild template — deferred to a later phase.

Single-source modules introduced during the rebuild — reuse these, never re-hardcode:
- `src/lib/config/contact.ts` — WhatsApp + phone helpers. All `wa.me` URLs and `tel:` links must route through `whatsappUrl(msg)` or `telHref()`. The current value is the placeholder `60000000000` — real number is a one-line config edit away.
- `src/lib/data/products.ts` — the 13 AIHAA products (5 indoor + 8 outdoor) with bilingual `tagline` + `description`. Consumers use `indoorProducts`, `outdoorProducts`, `getProductBySlug(slug)`.
- `src/lib/i18n/translations.ts` — single flat file, type-safe via `TranslationKeys`. Locale codes are `"bm" | "en"` (never `"ms"`). New keys go here with both locales, snake_case, no nesting.
- `src/components/shared/` — reusable across pages (`SectionHeading`, `BrandLogoBadge`, `IndoorFilterRow`, `ProductPedestalLineup`).
- `src/components/home/` — homepage section components (hero, collection, testimonials).

Anti-hardcode rules:
- Prices are hardcoded as string constants inside component files, never in i18n.
- Brand identifiers (AIHAA, product names like `AIHAA BELLA`) are never translated.
- WhatsApp / phone numbers never inline — always import from `contact.ts`.

Routing IA (post-Phase-5): Navbar dropdown "Luar Rumah" → `/produk-luar`, "Dalam Rumah" → `/produk-dalam`, "Semua Penapis" → `/produk-luar` (stopgap pending `/water-purifier` redesign). Top-level nav includes Service, About, Contact.
