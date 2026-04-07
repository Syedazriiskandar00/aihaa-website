# Sub-Agent Team (17 Agents) — AIHAA Website Project

## Critical Rule
Before delegating to ANY agent, read `tasks/lessons.md` first. Pass relevant lessons to the agent so they don't repeat past mistakes.

## Agent List

| Agent | Role | Model | AIHAA Focus |
|-------|------|-------|-------------|
| ux-specialist | User journey, wireframe, page structure | sonnet | Water purifier buyer journey, rental vs purchase flow |
| ui-designer | Visual design, layout, responsive, animations | sonnet | Dark navy + gold premium aesthetic, international quality |
| copywriter | Website content, sales copy, CTA text | sonnet | Malaysian market tone, anti-AI writing, bilingual BM/EN |
| backend-dev | Database, API, Supabase, authentication | sonnet | Lead capture, product database, contact form backend |
| seo-specialist | Meta tags, schema markup, sitemap, page speed | sonnet | "water purifier Malaysia" keywords, local SEO |
| humanizer | Review output, fix AI-generated patterns | sonnet | Make AIHAA feel like a real premium brand, not AI-built |
| qa-tester | Test features, responsive, forms, find bugs | sonnet | Test all 5 pages, product cards, contact form, mobile |
| security-auditor | Check vulnerabilities, secure data | sonnet | Form submission security, XSS prevention |
| devops-eng | Deploy, CI/CD, GitHub, hosting | sonnet | Vercel deployment, GitHub Actions, domain setup |
| project-organizer | Setup project structure AND cleanup | sonnet | Next.js 15 structure, pre-deploy cleanup |
| automation-specialist | Workflow automation, integrations | sonnet | WhatsApp notification on form submit, lead routing |
| booking-specialist | Appointment scheduling | sonnet | Product demo booking, installation scheduling |
| chatbot-builder | WhatsApp bot, web chat widget | sonnet | Product recommendation bot, FAQ chatbot |
| ai-voice-agent | Retell AI, Twilio voice, call flows | sonnet | AI reception for product enquiries |
| crm-automation | Lead management, follow-ups | sonnet | Lead tracking from website to WhatsApp to close |
| performance-optimizer | Website speed, Core Web Vitals | sonnet | Image optimization, lazy loading, Lighthouse 90+ |
| analytics-setup | Google Analytics, tracking, conversions | sonnet | Track product views, CTA clicks, form submissions |

## Routing Rules (Auto-Delegate)

### project-organizer
- Starting the AIHAA project (setup Next.js 15 structure)
- Before deployment (cleanup unused files, console.logs)
- Reorganizing components or pages

### ux-specialist
- Planning new pages or redesigning existing ones
- Mapping the customer journey: Homepage → Product → WhatsApp enquiry
- Before ui-designer starts ANY new page
- Planning rental vs purchase decision flow

### ui-designer
- Building or modifying ANY UI component, page, or layout
- Implementing the dark navy + gold design system
- Product cards, hero sections, navbar, footer
- Responsive design for mobile (375px priority)
- Animations and micro-interactions
- MUST follow anti-AI design rules from `rules/tone.md`

### copywriter
- Writing ANY text that customers will read
- Product descriptions, headlines, CTAs, benefit cards
- WhatsApp message templates for promotions
- MUST follow anti-AI writing rules from `rules/tone.md`
- MUST write in Malaysian market tone (BM/EN mix or formal depending on context)

### backend-dev
- Supabase tables, API endpoints, authentication
- Contact form submission handler
- Product data management
- Lead capture and storage

### seo-specialist
- Meta tags for all 5 pages
- Schema markup (Product, LocalBusiness, Organization)
- Sitemap generation
- Target keywords: "water purifier Malaysia", "penapis air", "AIHAA water purifier"

### performance-optimizer
- Image compression (WebP format, lazy loading)
- Bundle size reduction
- Core Web Vitals optimization
- Target: Lighthouse 90+ on all pages

### analytics-setup
- Google Analytics 4 setup
- Track: page views, product card clicks, CTA button clicks, form submissions
- Conversion goals: WhatsApp click, form submit, product page view

### humanizer
- Review AFTER copywriter and ui-designer finish
- Check for AI patterns in both content and design
- Read all text out loud — does it sound like a real person?
- Check design — does it look template-ish or unique?
- MUST reference anti-AI rules from `rules/tone.md`

### qa-tester
- Test all 5 pages on mobile (375px), tablet (768px), desktop (1024px+)
- Test contact form submission
- Test all navigation links
- Test product card interactions
- Test floating WhatsApp button
- Test promotional banner dismiss

### security-auditor
- Form input validation and sanitization
- XSS and CSRF prevention
- Environment variable security
- Pre-production security review

### devops-eng
- Push to GitHub (Syedazriiskandar00/aihaa-website)
- Deploy to Vercel
- Configure custom domain when ready
- Setup CI/CD with GitHub Actions

### automation-specialist
- WhatsApp notification when contact form submitted
- Lead routing automation

### booking-specialist
- Product demo appointment scheduling (future phase)

### chatbot-builder
- WhatsApp product recommendation bot (future phase)

### ai-voice-agent
- AI reception for phone enquiries (future phase)

### crm-automation
- Lead tracking pipeline: Website → WhatsApp → Follow-up → Close (future phase)
