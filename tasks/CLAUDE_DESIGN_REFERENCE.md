# Claude Design — Knowledge Base untuk AIHAA Project

**Document version:** 1.0 · **Last updated:** 22 April 2026
**Compiled for:** Syed Azri, AIHAA Marketing SDN BHD
**Purpose:** Permanent reference untuk Phase 8 design enhancement workflow. Save dalam repo supaya Claude (saya) boleh read setiap next session.

---

## 1. APA ITU CLAUDE DESIGN

Claude Design adalah **AI-powered visual creation tool** dari Anthropic Labs, launched **17 April 2026** sebagai research preview. Powered by **Claude Opus 4.7** (vision model paling kuat Anthropic).

**Access:** `claude.ai/design` atau palette icon di sidebar kiri claude.ai

**Availability:**
- Pro plan ✅
- Max plan ✅ (Azri guna ni)
- Team plan ✅ (admin kena enable)
- Enterprise plan ✅ (default off, admin kena enable)
- Free plan ❌ (tiada access)

**Usage limits:** Separate quota dari Claude chat dan Claude Code. Tidak count against other limits.

---

## 2. KENAPA PENTING UNTUK AIHAA

3 capability unique yang Claude Design bawa ke AIHAA project:

### 2.1 Design System Auto-Extract dari Codebase

Claude Design boleh baca GitHub repo `Syedazriiskandar00/aihaa-website` masa onboarding, automatic extract:
- **Colors:** #0D0D0D dark, #DAA520 gold, #FFFDE7 soft lemon, #B5C5A5 sage
- **Typography:** Poppins (body), Playfair Display (editorial)
- **Component patterns:** buttons, cards, section layouts
- **Design tokens:** spacing, border radius, shadows

Setiap design generate selepas tu **automatic match** AIHAA brand. Tak perlu specify colors/fonts setiap kali.

### 2.2 Handoff Direct ke Claude Code

Current workflow AIHAA (sebelum Claude Design):
```
Saya (chat) → draft prompt manual → Azri paste Claude Code → implement
```

Workflow baru dengan Claude Design:
```
Azri describe → Claude Design generate → Azri refine → handoff bundle → Claude Code terima → implement
```

**No manual prompt writing.** Bundle include HTML/CSS, component specs, design tokens, responsive breakpoints, animation specs.

### 2.3 Interactive Prototype, Bukan Static Mockup

Output adalah **live HTML** — clickable, testable, shareable sebelum implement. Bukan PNG/Figma image yang team kena imagine interaction.

---

## 3. INTERFACE & MENTAL MODEL

### 3.1 Layout

```
┌─────────────────────┬──────────────────────────────────┐
│                     │                                  │
│   CHAT              │   CANVAS                         │
│   (left panel)      │   (right panel)                  │
│                     │                                  │
│   - Conversation    │   - Live design preview          │
│   - Prompt input    │   - Interactive elements         │
│   - Inline comments │   - Adjustment sliders           │
│   - History         │   - Direct text editing          │
│                     │                                  │
└─────────────────────┴──────────────────────────────────┘
```

### 3.2 Workflow Pattern

```
1. Start project (describe goal)
   ↓
2. Add context (codebase link, reference images, docs)
   ↓
3. Prompt (what to create)
   ↓
4. Claude generate first version on canvas
   ↓
5. Iterate (chat + inline comments + sliders)
   ↓
6. Share / Export / Handoff
```

---

## 4. KEY FEATURES — WHAT IT CAN DO

### 4.1 Input Types

- **Text prompts** — describe in natural language
- **Reference images** — upload screenshots for style guidance
- **Documents** — DOCX, PPTX, XLSX files as context
- **Codebase** — point to GitHub repo or specific subfolder
- **Web capture** — grab elements from live URL

### 4.2 Output Types

- **Web pages** (landing, home, product pages)
- **Mobile app screens**
- **Dashboards & internal tools**
- **Pitch decks** (slide decks)
- **Marketing one-pagers**
- **Interactive prototypes** (with animations, state)
- **Short videos** (animated)

### 4.3 Refinement Methods

**4 ways to edit:**

| Method | Best for | When to use |
|--------|----------|-------------|
| **Chat** | Broad structural changes | "Make color scheme darker", "Rearrange dashboard" |
| **Inline comments** | Targeted component fixes | Click button → "make this smaller" |
| **Direct text edits** | Copy changes | Edit headline text directly on canvas |
| **Adjustment sliders** | Fine-tune properties | Drag spacing/color/size sliders |

### 4.4 Export Formats

- **Claude Code bundle** (`.tar` archive with README + spec files)
- **Standalone HTML** (working prototype)
- **Canva** (editable, collaborative)
- **PDF** (presentation)
- **PPTX** (PowerPoint)
- **Organization URL** (internal share)

### 4.5 Collaboration

- **Private** — only you can see
- **View-only** — org can review without editing
- **Edit access** — colleagues join Claude conversation in real-time

---

## 5. BEST PRACTICES (dari expert guides)

### 5.1 Good Prompt Structure

Good prompt includes **4 components:**

1. **Goal** — what you're building
2. **Layout** — how things arranged
3. **Content** — what info to display
4. **Audience** — who will use it

**Example:**
```
❌ BAD: "Design a landing page"

✅ GOOD: "Design a landing page for AIHAA water purifier 
Malaysian market. Hero with big product image + tagline 'Sekali 
bayar, selamanya milik anda'. Below hero: 4 feature cards 
(halal, warranty, install, support). Then testimonials. Footer 
with WhatsApp CTA. Target: 40-55 year old Malaysian families 
deciding between renting Coway vs buying AIHAA outright."
```

### 5.2 Start Simple, Layer Complexity

**Phase 1:** Core layout + content
**Phase 2:** Interactions + states
**Phase 3:** Edge cases + polish

Don't ask for everything in first prompt. Claude responds well to **incremental requests**.

### 5.3 Be Specific with Feedback

```
❌ "This doesn't look right"
✅ "Tighten spacing between form fields to 8px"

❌ "Make it better"
✅ "Reduce heading weight from 700 to 500, add 16px bottom margin"

❌ "Bigger"
✅ "Increase cartridge image height from 280px to 480px"
```

### 5.4 Reference Design System by Name

Kalau component dah ada dalam system, reference by name:

```
✅ "Use the Primary Button component"
✅ "Apply the Card layout pattern from our design system"
✅ "Use font-editorial for the title"
```

### 5.5 Think Responsive Early

Specify breakpoints dalam prompt:

```
✅ "Mobile-first, responsive across mobile (390px), tablet 
(768px), desktop (1440px). On mobile: stack single column. 
On desktop: 3-column grid."
```

### 5.6 Use Inline Comments vs Chat

**Rule of thumb:**

| Change type | Use |
|-------------|-----|
| Component-level fix | Inline comment |
| Structural / layout | Chat |
| Style system-wide | Chat |
| Single element tweak | Inline comment |
| New section | Chat |

**Don't describe element location in chat** ("the button on the right side of the header") when inline comment is 10x faster.

### 5.7 Branch for Exploration

Bila nak try different direction tanpa lose current work:

```
"Save what we have and try a completely different approach — 
more minimalist with heavy whitespace."
```

Claude save current version, create new branch. Boleh refer back to previous iterations.

### 5.8 Token Management

Claude Design guna token-based pricing. Tips:

- **Plan strategically** — allocate tokens by project priority
- **Use granular editing** — tweak specific elements instead of re-render whole design
- **Track usage** — monitor remaining tokens regularly
- **Use templates** — start dari pre-built templates when available

---

## 6. ADVANCED TRICKS (PRO LEVEL)

### 6.1 Context Engineering

**Principle:** Context > prompt wording. Structure context properly, prompts become less important.

Build context in this order:
1. **Identity** — AIHAA brand, tone, audience
2. **Constraints** — must/must-not rules
3. **Inspirations** — reference images/URLs
4. **Goal** — specific outcome

### 6.2 Multi-Variation Exploration

Strong prompt pattern untuk explore wider:

```
Generate 5 variations of [section] with different approaches:
1. Minimal editorial (subtle, premium)
2. Dramatic luxury (bigger animations, gold-heavy)
3. Playful warm (friendlier, approachable)
4. Technical precision (data-forward, grid-heavy)
5. Storytelling narrative (scroll-triggered reveal)

Each should use AIHAA brand tokens but express different 
personality.
```

Azri pick best, iterate from that. **10x faster dari generate-and-refine 5 times.**

### 6.3 Reference Image + Brand Merge

```
Here's a screenshot of [Hijrah Water's Komitmen Halal section] 
I like for editorial feel.

Design our AIHAA Komitmen Halal section with similar structure 
and typography weight, but:
- Use AIHAA dark + gold palette (not Hijrah's cream + green)
- Apply Poppins + Playfair Display fonts
- Keep our existing content copy
- Mobile-responsive
```

### 6.4 Web Capture for Enhancement

Better dari design from scratch when enhancing existing:

```
[Use web capture on current hero URL]
Enhance this hero section with motion + micro-interactions:
- Scroll-triggered fade-in for headline
- Subtle parallax on product image (5-10% movement)
- CTA button gradient hover
Preserve layout, content, brand colors unchanged.
```

### 6.5 Interview Mode

Untuk tasks ambiguous atau large, biar Claude interview you first:

```
Start: "I want to redesign the AIHAA home page. Interview me 
about goals, constraints, inspirations before generating anything."

Claude asks:
- What's the primary conversion action?
- Who's the target user demographic?
- What's the current bounce rate?
- Any sections performing well to keep?
- Any brand rules to strictly follow?
```

Structured answers → better first draft than jumping straight to prompt.

### 6.6 Stakes-Based Prompting

For tasks needing careful reasoning:

```
This is the AIHAA home page hero — the first impression for 
every customer. It drives WhatsApp conversion. A bad design 
here directly loses leads. Please think carefully about:
- Visual hierarchy that guides eye to CTA
- Mobile experience (70% traffic)
- Trust signals (halal, warranty, SSM)
- Cultural appropriateness for Malaysian Muslim audience
```

Naming stakes + audience + failure mode = better careful output.

### 6.7 Progressive Commitment

Don't commit to design direction at first prompt. Use pattern:

```
1. Generate 3 rough directions (low commitment)
   ↓
2. Pick 1 direction, ask for 2 refinements
   ↓
3. Pick best refinement, iterate details
   ↓
4. Final polish + responsive variations
   ↓
5. Handoff
```

### 6.8 Design System Maintenance

For multi-system organizations:

```
Teams can maintain more than one design system.
```

For AIHAA, potential systems:
- **System A** — Indoor products (dark editorial)
- **System B** — Outdoor products (sage tone)
- **System C** — Service page (informational)

Switch system per project based on context.

---

## 7. WORKFLOW — AIHAA PHASE 8 ENHANCEMENT

Specific workflow untuk enhance AIHAA pages using Claude Design:

### 7.1 Setup (One-Time, ~15 min)

```
1. Login claude.ai dengan Max plan
2. Click palette icon (sidebar kiri)
3. First-time onboarding:
   - Choose "Set up design system"
   - Link GitHub: Syedazriiskandar00/aihaa-website
   - Select subfolder: src/components/
   - Wait 5-10 min for parse
4. Verify extracted design system:
   - Colors: #0D0D0D, #DAA520, #FFFDE7, #B5C5A5
   - Fonts: Poppins, Playfair Display
   - Components: buttons, cards, sections
5. Name design system: "AIHAA Q2 2026"
```

### 7.2 Per-Page Enhancement Cycle (~1-2 hours/page)

**Step 1: Web capture current state**
```
Use web capture tool
URL: https://[preview-url]/[page]
Capture: full page + key sections
```

**Step 2: Analyze & brief**
```
Prompt: "Analyze this current [Home/Product/About] page. 
Identify:
1. What's working (preserve)
2. What feels flat/static (enhance)
3. Opportunities for motion/interaction
4. Mobile issues"

Claude provides critique.
```

**Step 3: Generate variations**
```
Prompt: "Enhance this page with:
- Scroll-triggered reveal animations
- Subtle parallax on hero
- Interactive product cards (hover states)
- Smooth section transitions
- Gold accent line draw-in animations

Preserve: all content, brand colors, mobile responsive.

Generate 3 variations:
1. Minimal editorial motion
2. Dramatic luxury
3. Playful warm"
```

**Step 4: Pick + iterate**
```
- Review 3 variations on canvas
- Click favorite
- Chat: "Let's go with variation 2. Now reduce gold accent 
  intensity by 30%, and slow animations from 400ms to 600ms 
  for more premium feel."
- Inline comments for specific fixes
- Sliders for spacing/color fine-tune
```

**Step 5: Verify interactive**
```
- Test hover states (mouse over elements)
- Test scroll triggers (scroll through canvas)
- Test responsive (resize preview)
- Confirm animations smooth, not janky
```

**Step 6: Handoff to Claude Code**
```
- Click "Handoff to Claude Code" button
- Claude packages design bundle (tar archive)
- Download bundle file
- Open Claude Code terminal in AIHAA project
- Paste: "Implement the design from [bundle filename]. 
  Target file: [component path]. Create branch feat/phase-8-
  [section-name]. Build + verify + push."
```

**Step 7: QA + merge**
```
- Wait 10-15 min Claude Code execute
- Vercel auto-deploy preview
- Test preview URL manually
- Take Playwright screenshot (if Playwright MCP available)
- Compare before/after
- If good → merge to main
- If issues → iterate (back to Step 3 or 4)
```

### 7.3 Recommended Page Order

1. **Home** (biggest impact, medium complexity) — START HERE
2. **Produk Dalam + Luar** (listing pages, simple)
3. **Product Detail** (Phase 7 complex, high impact)
4. **About Us** (storytelling opportunity)
5. **Service** (info-heavy)
6. **Support pages** (FAQ, Promosi, Galeri, Contact)

---

## 8. KNOWN LIMITATIONS (Research Preview)

Be aware of these issues (from official docs):

### 8.1 Comment Persistence Bug
> Inline comments occasionally disappear before Claude reads them.

**Workaround:** Paste comment text directly into chat instead.

### 8.2 Compact View Save Errors
> The compact layout mode can trigger save errors.

**Workaround:** Switch to full view, retry save.

### 8.3 Large Codebase Lag
> Linking very large repositories may cause lag or browser issues.

**Workaround:** Link specific subdirectories (`src/components/`) instead of entire monorepo.

### 8.4 Not Yet a Figma Replacement
For professional design teams that:
- Run pixel-perfect design reviews
- Manage design tokens at scale
- Work where Figma is source of truth

Claude Design **does not replace** that workflow yet.

### 8.5 No GA Timeline
Research preview — no commitment on when it becomes production-ready or if pricing changes.

### 8.6 Separate Usage Quota
Claude Design usage tracked separately from chat and Claude Code. Monitor all 3 quotas.

---

## 9. COMPARATIVE POSITIONING

Where Claude Design fits among design tools:

| Tool | Best for | Claude Design comparison |
|------|----------|-------------------------|
| **Figma** | Pixel-perfect pro design, design reviews | Figma still wins for established design team workflow |
| **Lovable** | Full-stack app generation | Lovable wins for DB + auth + backend |
| **v0 (Vercel)** | React component scaffolding | v0 faster for isolated components |
| **Canva** | Marketing assets, non-designers | Canva still has library + templates advantage |
| **Claude Code** | Production code implementation | Complementary — use both in handoff chain |

**Claude Design sweet spot:**
- Exploration phase (before commitment)
- Design-to-code with codebase context
- Non-designer creators (founders, PMs)
- Teams where Figma is overkill

---

## 10. AIHAA-SPECIFIC CONSIDERATIONS

### 10.1 Brand Voice Constants

Jangan biar Claude Design stray dari:

- **Tagline:** "Sekali Bayar. Selamanya Milik Anda."
- **Language:** Bahasa Malaysia primary, English secondary
- **Tone:** Hybrid corporate (story + specs)
- **Differentiator:** Sekali bayar vs sewa bulanan (Coway comparison)
- **Trust signals:** Halal JAKIM, 2-year warranty, SSM verified

### 10.2 Reference Sites (Azri approved aesthetics)

- **Hijrah Water** (hijrahwater.com.my) — halal commitment framing
- **Wells Malaysia Signature Collection** — product hero aesthetic
- **Coway Malaysia** — service feature framing

### 10.3 Anti-Patterns (Lessons Learned)

**DO NOT generate these patterns:**
- Dual-button cards (cluttered)
- Template grids repeated everywhere (boring)
- >10 gold accents per section (overused)
- Placeholder text in production
- Countdown timers >30 days (stale feel)
- Fake contact form (WhatsApp only)

### 10.4 Scope Protection

**NEVER auto-redesign these without explicit Azri approval:**
- Chatbot (tested, launch-ready)
- Product data structure (`src/lib/data/products.ts`)
- Translation keys (`src/lib/i18n/translations.ts`)
- Scope-protected pages: `/faq`, `/promosi`, `/galeri`, `/contact`

### 10.5 Production Blockers to Maintain

Website has these placeholders. Claude Design work **tidak patut sentuh:**
- WhatsApp number `60000000000` (Azri will replace)
- Phone placeholder
- Halal cert `MS 1500 / 6 126-03 / 2014` (verify pending)
- Ultra One category (PDF says indoor, code says outdoor)

---

## 11. PROMPT LIBRARY — READY-TO-USE

Simpan prompts ni, guna berulang untuk AIHAA work.

### 11.1 Home Hero Enhancement

```
Context: AIHAA water purifier home page hero. Current has 
banner image + 2 CTA buttons (WhatsApp, Lihat Produk). 

Goal: Enhance with premium motion while preserving layout and 
content.

Add:
- Scroll-triggered headline reveal (slide up + fade)
- Subtle parallax on banner image (5-8% scroll speed)
- CTA button gradient glow on hover
- Gold accent line draws in when section enters viewport
- Smooth section transition to next section below

Constraints:
- Mobile-first responsive
- Duration 600-800ms (premium pacing)
- Easing: ease-out
- No distracting animations (brand = premium calm, not flashy)

Use AIHAA design system (dark + gold).
```

### 11.2 Product Detail Enhancement

```
Context: AIHAA product detail page. 7 sections: Hero, Kitchen 
Context Split, Capacity & Functionalities, Features Overview 
Grid, Filter Cartridge Row, Spec & Price, Related Products.

Goal: Add editorial motion to make product exploration feel 
premium.

For each section, apply:
1. Hero — product image fade-in + title typewriter effect
2. Kitchen Context Split — slide in from sides (left/right)
3. Capacity — icon count-up animation
4. Features Grid — staggered card reveal (100ms delay each)
5. Filter Cartridge Row — arrow flow animation (water drop moving)
6. Spec & Price — blueprint grid fade-in + price pulse
7. Related Products — horizontal slide on scroll

Constraints:
- All animations viewport-triggered (Intersection Observer)
- Respect prefers-reduced-motion accessibility
- Mobile: simplify animations (reduce duration 50%)
```

### 11.3 About Page Storytelling

```
Context: AIHAA /tentang-kami page. Founder story (2018-2026 
timeline), Halal commitment, team intro, CSR activities.

Goal: Transform static content into scrolling narrative that 
emotionally engages visitors.

Apply:
- Founder quote section: scroll-locked typography reveal
- Timeline 2018→2026: horizontal scroll interaction  
- Halal JAKIM badge: subtle glow + certified stamp effect
- Team photo: hover reveal individual names
- CSR cards: scroll-triggered count-up stats

Tone: Warm, family-oriented, Malaysian Muslim values.
Preserve: all copy, halal cert number, team member names.
```

---

## 12. HANDOFF BEST PRACTICES (to Claude Code)

Saat export ke Claude Code, include this in instruction:

```
Implement design from [bundle-filename.tar]. 

Context:
- Target component: [path/to/component.tsx]
- Existing branch: feat/corporate-rebuild-2026-q2 (create sub-branch)
- Match existing code patterns in neighboring components
- Preserve all props, children, and existing translation keys
- Keep TypeScript types strict

Build requirements:
- npm run build must pass zero errors/warnings
- Lighthouse Performance 90+ maintained
- Mobile responsive verified
- Browser support: modern evergreen (Chrome/Edge/Firefox/Safari latest 2)

Commit strategy:
- One commit per logical section (easy revert)
- Message format: "feat(section): [description]"
- Push to new branch feat/phase-8-[page]-[section]

Verification:
- Playwright MCP screenshot before/after (if available)
- Manual test preview URL on Vercel
```

---

## 13. ACCESSIBILITY GUIDELINES

Semua design generate kena follow:

- **WCAG AA compliance** minimum
- **Color contrast** 4.5:1 body text, 3:1 large text
- **Keyboard navigation** full support
- **Screen reader** proper ARIA labels
- **Respect motion preferences** (`prefers-reduced-motion`)
- **Focus indicators** visible
- **Touch targets** minimum 44x44px mobile

Prompt pattern untuk ensure accessibility:
```
After generating design, review it for accessibility. 
List any WCAG AA violations and fix them. Especially check:
- Color contrast ratios
- Motion safety
- Keyboard flow
- Screen reader experience
```

---

## 14. SECURITY & PRIVACY

### 14.1 Data Handling

- **Pro/Max plans:** Data may be used for training (read privacy policy)
- **Team/Enterprise:** No training on your data (default)
- **Sensitive projects:** Use Team/Enterprise tier

### 14.2 Codebase Privacy

- Link **specific subdirectories** not entire repo
- Exclude `.env` files, secrets, API keys
- AIHAA is public repo anyway — low risk

### 14.3 Client Data

- Don't upload real customer data to Claude Design prompts
- Use placeholder data for testing
- Real data only goes live via Claude Code → production

---

## 15. QUICK REFERENCE CARD

### Access & Setup
```
URL: claude.ai/design
Icon: Palette in left sidebar
Plan required: Pro/Max/Team/Enterprise
AIHAA plan: Max ✅
```

### First Prompt Template
```
Context: [brand + product + audience]
Goal: [specific outcome]
Layout: [structure]
Content: [what to display]
Constraints: [must-have rules]
Inspiration: [reference if any]
Variations: [how many + directions]
```

### Common Commands (in chat)
```
"Save what we have and try different approach"
"Apply this change across the whole design"
"Explain your design decisions"
"Review for accessibility issues"
"Show me 3 variations of [section]"
"Handoff to Claude Code"
```

### Export Options
```
- Claude Code bundle (.tar)
- Standalone HTML
- Canva (editable)
- PDF
- PPTX
- Organization URL
```

### When to Use vs Alternatives
```
✅ Claude Design — Exploration, codebase-aware, AI-first workflow
✅ Claude Code — Production implementation
✅ Figma — Professional design team, pixel-perfect
✅ Canva — Marketing assets, templates
✅ Lovable — Full-stack app with DB
```

---

## 16. REFERENCE LINKS

- **Official docs:** https://support.claude.com/en/articles/14604416-get-started-with-claude-design
- **Anthropic announcement:** https://www.anthropic.com/news/claude-design-anthropic-labs
- **Start URL:** https://claude.ai/design

---

## 17. SESSION NOTES FOR NEXT CONVERSATION

**For Claude (me) to reference in future sessions:**

- Azri is on **Max plan** ✅ (has Claude Design access)
- AIHAA repo: `Syedazriiskandar00/aihaa-website`
- Current branch: `feat/corporate-rebuild-2026-q2`
- Phase 8 (Claude Design enhancement) starts **after production launch**
- Launch blockers pending: WhatsApp number, phone, Halal cert, Ultra One reclassify
- Team Azri handling photography (101 photo target, timeline hari ni/esok per Azri)

**Workflow to use when Azri says "let's use Claude Design":**
1. Verify Azri has setup design system (ask)
2. Identify specific page/section to enhance
3. Generate prompt using structure in Section 11
4. Azri paste in Claude Design
5. Review variations together
6. Claude Code handoff prompt using Section 12 pattern
7. Verify preview URL after deploy

**Files in repo Azri may reference:**
- `tasks/SESSION_2026-04-21_CONTEXT.md` — master session context
- `tasks/PHOTOSHOOT_BRIEF_2026-04-21.md` — photoshoot requirements
- `tasks/CLAUDE_DESIGN_REFERENCE.md` — this file

---

*End of document. Keep in `tasks/` folder of AIHAA project repo. Update as new Claude Design features/bugs discovered.*
