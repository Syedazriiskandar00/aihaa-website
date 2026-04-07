# Workflow Rules — AIHAA Website Project

## GOLDEN RULE
**Before doing ANY work, read `tasks/lessons.md` first.** This is the single most important rule. Past mistakes are expensive. Learning from them is free.

## Orchestration Principles

### 1. Lessons First (NEW — Most Important)
- EVERY session starts by reading `tasks/lessons.md`
- EVERY sub-agent receives relevant lessons before starting work
- EVERY mistake gets logged immediately — no exceptions
- EVERY lesson includes: what went wrong, why, and the fix
- Review lessons weekly and merge duplicates

### 2. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or design decisions)
- If something goes sideways, STOP and re-plan immediately
- Write detailed specs upfront — ambiguity causes rework
- Write plan to `tasks/todo.md` with checkable items before starting
- For AIHAA: every UI change needs a plan (what changes, which files, expected result)

### 3. Subagent Strategy
- Use subagents to keep main context window clean
- One task per subagent for focused execution
- ALWAYS pass relevant lessons from `tasks/lessons.md` to subagent
- ALWAYS pass AIHAA brand context (colors, fonts, tone) to UI/content agents
- Read `team.md` for routing rules

### 4. Self-Improvement Loop
- After ANY correction from user: update `tasks/lessons.md` immediately
- Write the lesson as a rule that prevents the same mistake
- Format: `[DATE] [CATEGORY] What happened → What to do instead`
- Categories: DESIGN, CODE, CONTENT, STRUCTURE, PERFORMANCE, GIT

### 5. Verification Before Done
- Never mark a task complete without proving it works
- For UI tasks: open in browser at 375px, 768px, and 1024px
- For code tasks: run build, check for errors, test functionality
- For content tasks: read out loud — does it sound human and premium?
- Ask: "Would Coway or Apple put this on their website?" If no, redo it.

### 6. International Quality Standard
- Every page must look like it belongs on a Fortune 500 website
- Compare against: coway-official-malaysia.my, cuckoo.com.my, aosmith.com
- No template-looking layouts, no generic stock photo vibes
- Animations must be smooth and purposeful, not decorative
- Typography must be consistent and well-spaced

### 7. Autonomous Bug Fixing
- When given a bug report: just fix it
- Point at logs, errors, failing tests — then resolve
- Zero context switching required from user
- Go fix failing builds without being told how

## Task Management

1. **Read Lessons**: Check `tasks/lessons.md` for relevant patterns
2. **Plan First**: Write plan to `tasks/todo.md` with checkable items
3. **Verify Plan**: Check with user before starting implementation
4. **Track Progress**: Mark items complete as you go
5. **Explain Changes**: High-level summary at each step
6. **Test Output**: Verify in browser / run build / check responsive
7. **Capture Lessons**: Update `tasks/lessons.md` after any correction

## Core Principles

- **Lessons First**: Read past mistakes before starting any work
- **Simplicity First**: Make every change as simple as possible
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary
- **International Grade**: Every output must match global brand standards

---

## AIHAA Website Project Phases

Follow this EXACT order. Do NOT skip steps. VERIFY before moving to next phase.

### PHASE 1 - PROJECT SETUP (project-organizer) ✅ DONE
- Set up Next.js 15 project structure
- Generated via same.new, pushed to GitHub
- Repo: Syedazriiskandar00/aihaa-website

### PHASE 2 - UX PLANNING (ux-specialist) ✅ DONE
- 5 pages planned: Home, Water Purifier, Product Detail, Promotions, Contact
- User journey: Homepage → Browse Products → Product Detail → WhatsApp Enquiry
- CTA strategy: WhatsApp as primary conversion action

### PHASE 3 - DESIGN AND CONTENT (ui-designer + copywriter) ✅ DONE (Draft)
- Initial design generated via same.new
- Dark navy (#0A1628) + gold (#D4A843) theme applied
- 13 products listed with placeholder images
- All 5 pages built with basic content

### PHASE 3.5 - DESIGN POLISH (ui-designer + copywriter + humanizer) 🔄 CURRENT
- Replace placeholder images with real product photos
- Polish UI to international standard
- Rewrite content with anti-AI rules
- Verify responsive design on all breakpoints
- Add micro-animations and hover effects
- VERIFY: Open every page, compare against Coway quality level

### PHASE 4 - BACKEND (backend-dev)
- Connect contact form to Supabase
- Set up product data in database (optional — can use static data)
- Lead capture and storage
- VERIFY: Form submits correctly, data stored securely

### PHASE 5 - SYSTEMS (automation-specialist + chatbot-builder)
- WhatsApp CTA with real business number
- WhatsApp notification on form submission
- Optional: Product recommendation chatbot
- VERIFY: WhatsApp opens with pre-filled message, notifications work

### PHASE 6 - SEO + PERFORMANCE + ANALYTICS (seo-specialist + performance-optimizer + analytics-setup)
- Meta tags for all 5 pages (title, description, OG tags)
- Schema markup: Product, LocalBusiness, Organization
- Sitemap.xml and robots.txt
- Image optimization: WebP, lazy loading, responsive sizes
- Target: Lighthouse 90+ on all metrics
- Google Analytics 4: page views, CTA clicks, form submissions
- VERIFY: Lighthouse audit, schema validation, GA4 real-time test

### PHASE 7 - HUMANIZE (humanizer)
- Review ALL pages for AI-generated patterns
- Content check: read every paragraph out loud
- Design check: does any section look template-ish?
- Compare against `rules/tone.md` anti-AI rules
- VERIFY: Show to a non-tech person — do they think a human made this?

### PHASE 8 - QUALITY + SECURITY (qa-tester + security-auditor)
- Test all pages on: iPhone SE, iPhone 14, iPad, Desktop
- Test contact form: valid input, invalid input, empty fields
- Test all navigation links and product cards
- Security: form validation, XSS prevention, env vars secured
- VERIFY: Zero critical bugs, zero security vulnerabilities

### PHASE 9 - FINAL CLEANUP (project-organizer)
- Remove unused files, components, and imports
- Remove all console.log statements
- Verify clean build with zero warnings
- Optimize bundle size
- Final git commit with clean history
- VERIFY: `npm run build` succeeds with no warnings

### PHASE 10 - DEPLOY (devops-eng)
- Deploy to Vercel
- Connect custom domain (when ready)
- Setup redirects and 404 page
- Final test on production URL
- VERIFY: All pages load, all features work, SSL active

---

## Error Recovery Flow

### qa-tester finds bugs:
- Design bug → ui-designer fix → qa-tester re-test
- Functionality bug → backend-dev fix → qa-tester re-test
- System bug → relevant specialist fix → qa-tester re-test

### security-auditor finds vulnerabilities:
- Any security issue → backend-dev fix → security-auditor re-audit

### humanizer finds AI content:
- Copy issue → copywriter rewrite → humanizer re-review
- Design issue → ui-designer redesign → humanizer re-review

### performance-optimizer finds slow loading:
- Image/CSS/JS issue → fix → re-run Lighthouse

### Loop limit: Maximum 3 rounds per issue. After 3 rounds, flag to user.

### After ANY recovery: Update `tasks/lessons.md` with what went wrong and the fix.

---

## Don'ts Checklist (Read Before Every Task)

### Design Don'ts
- Don't use same card height/width for everything
- Don't make perfectly symmetrical layouts on every section
- Don't use same button style everywhere without variation
- Don't forget mobile-first — design for 375px FIRST
- Don't use generic placeholder images in production

### Code Don'ts
- Don't leave console.log in any commit
- Don't commit .env files
- Don't skip TypeScript types — no `any` allowed
- Don't write inline styles when Tailwind class exists
- Don't skip error handling on API calls and form submissions

### Content Don'ts
- Don't start sentences with "Kami menyediakan" or "Selamat datang"
- Don't use buzzwords: "inovatif", "komprehensif", "holistik", "cutting-edge"
- Don't write generic content that could apply to any water purifier brand
- Don't make all testimonials sound the same

### Git Don'ts
- Don't commit without descriptive message
- Don't push directly to main without testing
- Don't commit node_modules or build folders
