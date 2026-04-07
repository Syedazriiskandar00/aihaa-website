# Code Format Rules — AIHAA Website

## General Standards
- ALWAYS use TypeScript — no `.js` or `.jsx` files in the project
- ALWAYS use Tailwind CSS for styling — no inline styles, no CSS modules
- ALWAYS implement mobile-first responsive design (375px → 768px → 1024px → 1280px)
- ALWAYS handle errors with try/catch on async operations
- ALWAYS validate form inputs on both client and server side
- NEVER commit .env or .env.local files to Git
- NEVER leave console.log in any commit (use proper error logging if needed)
- NEVER use `any` type in TypeScript — define proper types
- NEVER use `var` — always `const` or `let`

## File Naming Conventions
- Components: PascalCase → `HeroSection.tsx`, `ProductCard.tsx`, `NavBar.tsx`
- Utilities/Helpers: camelCase → `formatPrice.ts`, `useProducts.ts`
- Pages/Routes: kebab-case → `water-purifier/`, `product/[id]/`
- Config files: lowercase with dots → `.eslintrc.json`, `tailwind.config.ts`
- Constants: UPPER_SNAKE_CASE for values, camelCase for file names → `const MAX_PRODUCTS = 12`
- Types: PascalCase with descriptive names → `Product.ts`, `ContactFormData.ts`
- Images: kebab-case → `neon-water-purifier.webp`, `aihaa-logo.svg`

## Next.js 15 Project Structure (AIHAA)
```
aihaa-website/
├── CLAUDE.md                    # Brain file — read first
├── me.md                        # Owner context
├── work.md                      # AIHAA brand details
├── team.md                      # Sub-agent routing
├── priorities.md                # Current phase and focus
├── rules/
│   ├── workflow.md              # Workflow phases
│   ├── tone.md                  # Content and design tone
│   └── format.md                # This file — code standards
├── tasks/
│   ├── todo.md                  # Current task checklist
│   └── lessons.md               # Mistakes log — READ FIRST
├── app/
│   ├── layout.tsx               # Root layout (navbar, footer)
│   ├── page.tsx                 # Home page
│   ├── water-purifier/
│   │   └── page.tsx             # Product listing
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx         # Product detail
│   ├── promotions/
│   │   └── page.tsx             # Promotions page
│   └── contact/
│       └── page.tsx             # Contact page
├── components/
│   ├── ui/                      # Base UI (Button, Input, Card, Badge)
│   ├── layout/                  # Layout (Navbar, Footer, MobileMenu)
│   └── sections/                # Page sections (Hero, Benefits, ProductGrid, Stats)
├── lib/
│   ├── constants.ts             # Colors, product data, config
│   ├── utils.ts                 # Helper functions
│   └── supabase.ts              # Supabase client (when needed)
├── hooks/                       # Custom React hooks
├── types/
│   ├── product.ts               # Product type definitions
│   └── form.ts                  # Form data types
├── public/
│   ├── images/
│   │   ├── products/            # Product photos (WebP format)
│   │   ├── certifications/      # Halal, RoHS, TUV logos
│   │   └── brand/               # AIHAA logo, favicon
│   └── fonts/                   # Custom fonts if needed
├── .env.local                   # Environment variables (NOT in git)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## AIHAA Design Tokens (Use These Everywhere)
```typescript
// lib/constants.ts
export const COLORS = {
  bg: {
    primary: '#FFFFFF',       // Main background (light sections)
    surface: '#F5F5F5',       // Cards, secondary surfaces
    dark: '#0D0D0D',          // Hero, navbar, footer, CTA
    darkAlt: '#1A1A1A',       // Cards in dark sections
  },
  gold: {
    primary: '#DAA520',       // Main accent
    dark: '#B8860B',          // Gradient start
    light: '#F0D060',         // Gradient end / highlight
    mutedLight: 'rgba(218, 165, 32, 0.15)', // Borders on light bg
    mutedDark: 'rgba(218, 165, 32, 0.3)',   // Borders on dark bg
  },
  text: {
    onLight: '#0D0D0D',      // Text on light backgrounds
    onDark: '#FFFFFF',        // Text on dark backgrounds
    mutedLight: '#717171',    // Muted text on light bg
    mutedDark: '#999999',     // Muted text on dark bg
  },
} as const;
```

## Tailwind Custom Classes (Add to tailwind.config.ts)
```typescript
// Extend Tailwind with AIHAA brand colors
colors: {
  dark: { DEFAULT: '#0D0D0D', alt: '#1A1A1A' },
  surface: '#F5F5F5',
  gold: { DEFAULT: '#DAA520', light: '#F0D060', dark: '#B8860B' },
  muted: { DEFAULT: '#717171', dark: '#999999' },
}
```

## Component Standards
- Every component must have TypeScript interface for props
- Use `'use client'` directive only when component needs interactivity
- Server components by default (Next.js 15 standard)
- Keep components under 200 lines — split if larger
- Extract reusable logic into custom hooks

## Supabase Rules (When Implemented)
- ALWAYS set up RLS policies on every table
- Use UUID for primary keys
- Always include `created_at` and `updated_at` timestamps
- Use soft deletes (`deleted_at` nullable timestamp)
- Environment variables for ALL keys — never hardcode
- Parameterized queries to prevent SQL injection

## Git Rules
- Commit messages must be descriptive and concise
- Format: `feat: add hero section with animated wave logo`
- Prefixes: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`
- NEVER commit: secrets, .env files, node_modules, .next folder
- Branch strategy: `main` (production), `develop` (staging), `feature/*` (features)
- Example: `feature/product-detail-page`, `fix/mobile-navbar-menu`

## Responsive Breakpoints
- Mobile: 375px (PRIMARY design target — design here first)
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px
- Test ALL breakpoints before marking any UI task complete

## Performance Standards
- Lighthouse score: 90+ minimum on ALL metrics
- Page load: Under 3 seconds on 4G connection
- Images: WebP format, compressed, lazy loaded, with width/height attributes
- Fonts: Preloaded, `font-display: swap`
- CSS: Purge unused Tailwind classes (automatic with Tailwind v4)
- JS: Code split, defer non-critical scripts
- Use Next.js `<Image>` component for ALL images — never raw `<img>` tags

## Accessibility Standards
- All images must have meaningful `alt` text
- All interactive elements must be keyboard accessible
- Color contrast ratio: minimum 4.5:1 for text
- Form inputs must have associated labels
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
