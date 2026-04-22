# AIHAA Session Handoff — 22 April 2026

**For:** Next Claude chat session on this project
**From:** Previous session (extensive work completed)
**Context:** Syed Azri (client) building AIHAA water purifier website. This is handoff so next Claude can continue seamlessly.

---

## 🎯 IMMEDIATE NEXT ACTION

**Azri is currently in Claude Design (claude.ai/design).** He clicked into the interface, saw the onboarding options, but has NOT YET clicked "Set up design system."

**Next step needed:** Click "Set up design system" button → connect to GitHub repo → let Claude Design extract AIHAA brand tokens → then create first Home page prototype.

**Before proceeding, verify Git state:** Azri needs to run these commands in Claude Code terminal to confirm all work is pushed to GitHub (so Claude Design parses latest version):

```
cd "C:\Users\ACER\Desktop\AIHAA WEBSITE COMPANY\aihaa-website"
git status
git log --oneline -10
git remote -v
```

If `git status` shows uncommitted changes, commit + push FIRST before Claude Design setup.

---

## 📊 PROJECT STATE

### Repo Info
- **GitHub:** `https://github.com/Syedazriiskandar00/aihaa-website`
- **Active branch:** `feat/corporate-rebuild-2026-q2`
- **Latest commit (expected):** `4d769a2` (cartridge spacing tighten) or later if images commit happened
- **Main branch:** NOT YET merged — production not launched
- **Preview URL:** https://aihaa-website-git-feat-corporate-rebuild-2026-q2-sai-media.vercel.app

### Client
- **Name:** Syed Azri
- **Company:** AIHAA Marketing SDN BHD (SSM 1263314-X)
- **Location:** Muar, Johor, Malaysia
- **Plan:** Claude Max (has Claude Design access ✅)
- **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel auto-deploy
- **Language:** Azri communicates in **Bahasa Malaysia** primarily

### Brand Constants (DO NOT violate)
- **Colors:** `#0D0D0D` dark, `#FFFFFF` white, `#DAA520` gold, `#FFFDE7` soft lemon, `#B5C5A5` sage
- **Fonts:** Poppins (body), Playfair Display (editorial italic)
- **Tone:** Hybrid corporate — story + specs, premium not flashy
- **Tagline:** "Sekali Bayar. Selamanya Milik Anda."
- **Differentiator:** One-time payment vs Coway monthly rental

---

## ✅ COMPLETED IN RECENT SESSIONS

### Phase 1-7 (structural rebuild)
- All 5 pages rebuilt (Home, Produk Dalam, Produk Luar, Service, Tentang Kami)
- Product detail template with 7 sections (KitchenContextSplit, CapacityFunctionalities, FeaturesOverviewGrid, FilterCartridgeRow, HouseCrossSection, SevenLayerFiltration, PvdfMicronFunnel, SpecPriceDark)

### Recent session work (22 April 2026)
- ✅ Chatbot tested: 9/9 flows PASS (48 screenshots evidence)
- ✅ 2 UX fixes shipped (typing delay + stale quick-reply)
- ✅ Bug fixes: Penapis Boring RM650, UF Double Backwash 10 tahun warranty
- ✅ Hero Home replaced with IMG_0161 (banner biru "PENAPIS AIR PREMIUM HALAL JAKIM")
- ✅ Signature Collection replaced with IMG_0162 (clickable OUTDOOR/INDOOR navigation)
- ✅ FilterCartridgeRow 4 iterations:
  1. v1: Single image dark bg
  2. v2: 4 split images + arrow flow
  3. v3: Cream bg + 480px size + updated images
  4. v4: Tightened spacing (mb-10 → mb-5)
- ✅ Photoshoot brief PDF delivered (8 page editorial, 101 photos scope)
- ✅ Git repo 8+ commits pushed to remote

### Documentation Created
1. `SESSION_2026-04-21_CONTEXT.md` — master session context (in `tasks/` folder)
2. `PHOTOSHOOT_BRIEF_2026-04-21.md` — photography requirements 
3. `CLAUDE_DESIGN_REFERENCE.md` — Claude Design knowledge base (821 lines)

---

## 🚧 PENDING ITEMS

### Production Blockers (MUST fix before launch)
1. **WhatsApp number** — still placeholder `60000000000`, Azri needs to provide real number
2. **Phone number** — still placeholder
3. **Halal cert `MS 1500 / 6 126-03 / 2014`** — needs JAKIM verification or remove
4. **Ultra One category** — in PDF classified as indoor, in website code still outdoor. Needs reclassification:
   - `src/lib/data/products.ts` (category field)
   - `/produk-dalam` page (add Ultra One to list)
   - `/produk-luar` page (remove Ultra One)
   - `/product/ultra-one` template (change sage outdoor → dark indoor)
   - Navigation + sitemap

### Waiting on External
- **101 product photos from team Azri** — timeline "hari ni/esok" per Azri (told me this 22 April)
- Once received, need to wire to 13 product templates via Claude Code

### Current Task — Phase 8: Claude Design Enhancement
**Status:** Setup phase. Azri just accessed `claude.ai/design`.

**Roadmap agreed:**
```
1. Setup design system in Claude Design (link GitHub)  ← CURRENT
2. Create first prototype: Home page enhancement
3. Pick best variation from Claude Design
4. Handoff bundle to Claude Code
5. Implement on branch feat/phase-8-home
6. Verify preview URL
7. Merge to main
8. Repeat for other pages (produk dalam, produk luar, product detail, about, service)
```

**Timeline target:**
- Phase 8 done in 4-6 weeks iterative
- 1-2 sections per week cadence
- After Phase 8, launch production

---

## ⚠️ CRITICAL CONSTRAINTS (Lessons learned)

### Scope Protection (DO NOT touch without explicit approval)
- ❌ Chatbot (`src/components/Chatbot.tsx`) — launch-ready, tested
- ❌ Product data structure (`src/lib/data/products.ts`)
- ❌ Translation keys (`src/lib/i18n/translations.ts`) — reuse existing, don't create duplicates
- ❌ /faq, /promosi, /galeri, /contact pages
- ❌ Kenapa Pilih AIHAA, Testimoni, Hubungi Kami sections (Home page)
- ❌ Navigation header, Footer

### Anti-patterns to AVOID
- Dual-button cards (cluttered)
- Template grids repeated everywhere (boring)
- More than 10 gold accents per section (overused)
- Placeholder text in production
- Countdown timers >30 days (stale feel)
- Fake contact form (WhatsApp-only)

### Workflow rules
- **Azri uses Claude Code in VS Code terminal** (not extension — had timeout issues earlier, resolved by disabling MCP servers that were hanging)
- **Azri's Claude Code setup:** MCP servers disabled via renaming `mcpServers` → `mcpServers_disabled` in `~/.claude.json`
- **AUTORUN mode preferred** — Azri doesn't want approval prompts mid-task
- **Screenshot-based verification** — Azri prefers visual confirmation via Playwright MCP when available
- **Self-critique before prompts** — always flag risks BEFORE drafting prompt for Claude Code
- **Surgical commits** — 1 commit per logical change (easy revert)
- **Scope creep prevention** — explicit "JANGAN sentuh [X]" in prompts

### Azri's Communication Style
- **Bahasa Malaysia primary** — respond in BM, not English
- **Casual but direct** — "baik", "okay", "saya", "awak"
- **Visual learner** — prefers screenshots + previews over text explanations
- **Iteration-friendly** — comfortable with "let's try" approach, doesn't need perfect first attempt
- **Pragmatic** — "cara senang", "cepat", "simple" themes come up often

---

## 🗂️ FILE LOCATIONS REFERENCE

### Client's local project
```
C:\Users\ACER\Desktop\AIHAA WEBSITE COMPANY\aihaa-website\
├── src/
│   ├── app/
│   │   ├── page.tsx (home)
│   │   ├── produk-dalam/page.tsx
│   │   ├── produk-luar/page.tsx
│   │   ├── service/page.tsx
│   │   ├── tentang-kami/page.tsx
│   │   └── product/[id]/
│   │       ├── page.tsx
│   │       └── components/
│   │           ├── FilterCartridgeRow.tsx (recently updated)
│   │           ├── KitchenContextSplit.tsx
│   │           ├── CapacityFunctionalities.tsx
│   │           └── [4 more]
│   ├── components/
│   │   ├── Chatbot.tsx (launch-ready, DON'T TOUCH)
│   │   ├── home/
│   │   │   ├── HomeHero.tsx (recently replaced with client image)
│   │   │   ├── SignatureCollection.tsx (recently replaced, clickable)
│   │   │   └── [other Home sections]
│   │   └── sections/ (various)
│   └── lib/
│       ├── data/
│       │   ├── products.ts
│       │   └── services.ts (Penapis Boring RM650 fixed)
│       ├── i18n/
│       │   └── translations.ts
│       └── chatbot-flows.ts
├── public/
│   └── images/
│       ├── hero-main.jpg (client banner)
│       ├── product-collection.jpg (lineup for Signature Collection)
│       └── products/
│           └── cartridge/
│               ├── cartridge-sediment.png (cream bg, 1587x2245px)
│               ├── cartridge-antibacterial.png
│               ├── cartridge-pre-carbon.png
│               └── cartridge-post-carbon.png
└── tasks/
    ├── SESSION_2026-04-21_CONTEXT.md
    ├── PHOTOSHOOT_BRIEF_2026-04-21.md
    └── CLAUDE_DESIGN_REFERENCE.md (comprehensive knowledge base)
```

---

## 💬 IMMEDIATE INSTRUCTIONS FOR NEXT CLAUDE

When Azri starts new chat:

### Step 1: Read context files
Read these three files first (they're in project):
1. `tasks/CLAUDE_DESIGN_REFERENCE.md` — comprehensive Claude Design knowledge
2. `tasks/SESSION_2026-04-21_CONTEXT.md` — older session context
3. This handoff file

### Step 2: Verify current state
Ask Azri:
```
Confirm current state sebelum proceed:
1. Branch: feat/corporate-rebuild-2026-q2, latest commit?
2. All work pushed to GitHub?
3. Did you click "Set up design system" in Claude Design yet?
4. Any blockers from previous session to resolve first?
```

### Step 3: Help with Claude Design setup
If Azri clicked "Set up design system":
- Ask for screenshot of current screen
- Guide based on what's visible (don't assume UI flow)
- Goal: Connect GitHub repo, extract AIHAA brand tokens

If Azri hasn't clicked yet:
- Verify git is clean first (all pushed)
- Then guide to click "Set up design system"

### Step 4: Once design system setup
Use Home page enhancement prompt from `CLAUDE_DESIGN_REFERENCE.md` Section 11.1 — adapted for Azri's context. Generate 3 variations pattern.

### Step 5: Handoff to Claude Code
When Claude Design produces approved design:
- Use bundle export feature
- Draft Claude Code terminal prompt for Azri to paste
- Create feature branch `feat/phase-8-home`
- Build + verify + commit + push

---

## 🔑 KEY DECISIONS MADE (for context)

1. **Launch first, Phase 8 after** — don't delay production for polish
2. **Section-by-section Phase 8** — not page-by-page (consistency across pages)
3. **Claude Design for exploration, Claude Code for implementation** — separate tools, complementary
4. **Keep existing AIHAA brand** — don't pivot colors/fonts, just enhance
5. **Mobile-first always** — 70% traffic expected mobile (Malaysian market)

---

## 🛑 KNOWN ISSUES / WORKAROUNDS

### Claude Code extension in VS Code (resolved)
- Issue: Subprocess timeout 60000ms on startup
- Cause: MCP servers hanging (playwright, svgmaker, context-mode)
- Fix applied: Renamed `mcpServers` → `mcpServers_disabled` in `~/.claude.json`
- Workaround: Use Claude Code via terminal directly (`claude` command in PowerShell)

### File naming issues (lesson)
- When client downloaded images from chat, Windows added `.png` → resulted in `.png.png` double extension
- Fixed by PowerShell rename script
- Future: Always verify filenames match code references

### Canva edit workflow (lesson)
- Client edits images in Canva, replaces at folder, but git doesn't auto-detect until committed
- Always verify `git status` shows modifications after image replacement
- Explicit commit needed: `git add public/images/... && git commit`

---

## 📞 HOW TO RESPOND TO AZRI

**Language:** Bahasa Malaysia (same as him)

**Tone:** Professional but casual, direct, practical

**Format:**
- Use section headers
- Numbered action steps
- Tables for comparisons
- Short paragraphs, scannable
- Emoji sparingly (only for emphasis: ✅ ❌ ⚠️)

**Technical approach:**
- Always self-critique before drafting prompts
- Flag risks explicitly ("Risiko 1: ...")
- Explain WHY before HOW
- Assume Azri is smart but not deep-technical
- When in doubt, ask via `ask_user_input_v0` tool (he appreciates being consulted)

**Pattern to follow from prev session:**
```
1. Recap: "Lock. Decision [X] confirmed."
2. Self-critique: "Risiko yang saya kena flag..."
3. Plan: "Approach saya cadang..."
4. Ask permission or proceed: "Ready paste?" or "Tap jawapan"
5. Execute: detailed prompt/guide
6. Verify: "Share screenshot bila ready"
```

---

## 🎬 EXPECTED FIRST MESSAGE FROM AZRI

Likely one of:
1. "Saya dah masuk chat baru, awak dah check file context?" → Read the 3 files first
2. "Confirm state sekarang" → Run the verification checklist
3. "Continue dari mana kita stop" → Resume Claude Design setup
4. Screenshot of claude.ai/design → Guide setup

Be ready to pivot based on what Azri says.

---

*End of handoff. Next Claude: Read project files, acknowledge context briefly in BM, ask Azri's current state, proceed.*
