# Practical Informatics — Project Context

## What This Is

Marketing site for **Practical Informatics**, Marty Koepke's consulting practice. Built around the **PULSE Framework** — a structured methodology for technology implementation that starts with observation, not assumptions. Five phases: Problem, Understand, Landscape, Solve, Enable.

**Live URL:** https://www.practicalinformatics.com

## Architecture

Next.js 14+ (App Router) with TypeScript, Tailwind CSS, and Framer Motion. Dark "Industrial AI" aesthetic. Deployed to **Vercel**.

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Inter (body) + JetBrains Mono (code/checkpoints) |
| Deployment | Vercel |

## Design System

**Colors:**
- Background: `#020617` (Slate 950)
- Primary accent: `#4A90E2` (Steel Blue — from logo)
- Secondary/CTA: `#E67E22` (Burnt Orange — from logo)
- Text: White, Slate-200 (`#E2E8F0`), Slate-400 (`#94A3B8`)
- Glassmorphism: `bg-white/5 backdrop-blur-xl border-white/10`

**Global Effects:**
- SVG noise texture overlay (`noise-overlay` class)
- Mouse-following radial gradient (CursorGlow component)
- Glowing 1px section dividers (`glow-divider` class)
- Scanline animation on governance checkpoint boxes

## File Structure

```
practicalinformatics_site/
├── app/
│   ├── layout.tsx           # Root layout, fonts, SEO metadata, JSON-LD
│   ├── page.tsx             # Home — assembles all 12 sections
│   ├── globals.css          # Tailwind + custom utilities
│   ├── pulse/page.tsx       # PULSE Pathway Builder page
│   ├── privacy/page.tsx     # Policy pages (GetTerms embeds)
│   ├── terms/page.tsx
│   ├── cookies/page.tsx
│   ├── acceptable-use/page.tsx
│   └── returns/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Floating glass nav + PULSE scroll tracker
│   │   ├── Footer.tsx       # Minimalist footer
│   │   └── PolicyPage.tsx   # Shared policy page wrapper
│   ├── pulse/
│   │   ├── PathwayBuilder.tsx # Interactive pathway builder (intake → results)
│   │   ├── EmailGate.tsx      # Email capture gate (name/email → Google Sheet)
│   │   ├── AIDiagnostic.tsx   # 3-screen AI Fit Diagnostic flow
│   │   └── DiagnosticBridge.tsx # Bridge: diagnostic results → pathway builder
│   ├── sections/
│   │   ├── Hero.tsx         # Gradient headline + PULSE line SVG
│   │   ├── Pattern.tsx      # "How technology projects fail"
│   │   ├── PulseFramework.tsx # Interactive circuit (layoutId morph)
│   │   ├── StartHere.tsx    # Methodology Guide + Toolkit bento + Web App
│   │   ├── TwoLanes.tsx     # Org vs Builder lanes
│   │   ├── WorkWithMe.tsx   # Consulting + Book a Call
│   │   ├── Community.tsx    # From Curious to Capable (COMING SOON)
│   │   ├── WhatIBuilt.tsx   # 4 portfolio cards
│   │   ├── Background.tsx   # Bio + Domain Translator node graph
│   │   ├── FAQ.tsx          # Accordion
│   │   └── FooterCTA.tsx    # Final CTA section
│   ├── ui/
│   │   ├── Button.tsx       # Shimmer/spring/ghost/primary variants
│   │   ├── GlassCard.tsx    # Glassmorphism card
│   │   ├── ComingSoonBadge.tsx
│   │   ├── SectionWrapper.tsx # Section padding + fade-in + dividers
│   │   └── CursorGlow.tsx   # Mouse-following radial gradient
│   └── modals/
│       ├── WorkModal.tsx    # Portfolio detail modal
│       ├── MethodologyModal.tsx # PULSE Methodology Guide modal
│       └── Lightbox.tsx     # Image gallery
├── lib/
│   ├── content.ts           # All site content as typed constants
│   ├── methodology-content.ts # PULSE Methodology Guide (10 sections, typed)
│   ├── pathway-data.ts      # Pathway Builder data (30 sections, 5 phases)
│   └── diagnostic-data.ts   # AI Fit Diagnostic scoring engine + bridge mapping
├── public/
│   ├── images/
│   │   ├── headshot.jpg
│   │   ├── logo-long.png    # V2 long logo (nav, OG)
│   │   ├── logo-icon-v2.png # V2 icon logo
│   │   ├── logo-stack.png   # Original stack logo
│   │   ├── logo-icon.png    # Original icon logo
│   │   ├── activiteez/      # 5 screenshots
│   │   └── governiq/        # 5 screenshots
│   ├── llms.txt             # AI agent content file
│   ├── robots.txt
│   ├── sitemap.xml
│   └── googleefff2183f67c65a4.html
├── _archive/                # Old static HTML site files
├── CLAUDE.md
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts (auto-generated)
└── package.json
```

## Content Management

All site copy lives in `lib/content.ts` as typed TypeScript constants. Components import from this single source of truth. Content includes:
- Hero text, stat bar numbers
- Pattern section prose + pullquote
- PULSE phase definitions + governance checkpoints
- Start Here product descriptions
- Two Lanes copy
- Work With Me paragraphs
- Community learn items + accelerator details
- Portfolio projects (4 items with tags, screenshots, modal content)
- Background bio + Domain Translator text
- FAQ items (7 Q&As)
- Footer CTA copy

## Additional Pages

### `/pulse` — AI Fit Diagnostic + PULSE Pathway Builder
Multi-phase interactive tool with 4 screens:
1. **Email Gate**: Name/email capture → Google Sheet via Apps Script (`NEXT_PUBLIC_SHEET_ENDPOINT` env var). Returning users skip via localStorage.
2. **AI Fit Diagnostic**: Identify pain points → assess each with 7 scored questions → results in 3 buckets (Fix First / Good AI Candidate / Investigate More). Scoring engine in `lib/diagnostic-data.ts`.
3. **Bridge**: Auto-maps diagnostic results to PULSE tier + AI involvement. User answers one remaining question (vendor involvement).
4. **Pathway Builder**: Personalized checklist of 10–30 PULSE steps. Receives pre-filled values from bridge. Data in `lib/pathway-data.ts`.

## Site Sections (12 total, homepage)

1. **Hero** — Gradient H1, 3 CTAs (Methodology/AI Diagnostic/Work With Me), PULSE EKG SVG animation, stat bar
2. **The Pattern** — Narrative prose, Steel Blue pull quote border
3. **PULSE Framework** — Interactive circuit: 5 nodes, click → layoutId morph to glassmorphism modal with scanline governance checkpoint
4. **Start Here** — Methodology Guide card (opens modal), AI Fit Diagnostic CTA, PULSE Web App ($49 on Gumroad)
5. **Two Lanes** — Glass cards with accent glow (Steel Blue for orgs, Burnt Orange for builders)
6. **Work With Me** — Simple text + Book a Call CTA (spring hover)
7. **From Curious to Capable** — COMING SOON badge, learn list, accelerator callout card
8. **What I've Built** — 4 portfolio glass cards → WorkModal with lightbox
9. **Background** — Photo + bio, Domain Translator animated SVG node graph, glitch-reveal quote
10. **FAQ** — Accordion with AnimatePresence, Steel Blue active border
11. **Footer CTA** — Gradient "Start with the problem", glowing P→U→L→S→E letters, two-path CTAs
12. **Footer** — Fiber-optic divider, social links, copyright, policy links

## External URLs

| Destination | URL | Status |
|---|---|---|
| Book a Call | `https://tally.so/r/9qNRM5` | Live |
| 1:1 Accelerator | `https://tally.so/r/xXVPgo` | Live |
| PULSE Methodology | Modal (onClick) | **Active — opens MethodologyModal** |
| PULSE Web App | `https://martypractical.gumroad.com/l/ebjqkf` | Live ($49) |
| Community | `#` | **Placeholder** |
| LinkedIn | `https://www.linkedin.com/in/marty-koepke/` | Live |
| Between the Clicks | `https://a.co/d/08QnZGaP` | Live |
| EHR Demo | `https://sophiav2.vercel.app/` | Live |
| VytalPath Demo | `https://vytalpathdemo.vercel.app/` | Live |

## SEO

- JSON-LD: `ProfessionalService` + `FAQPage` schemas (in `app/layout.tsx`)
- Open Graph + Twitter Card meta tags
- Per-page metadata on policy routes
- `robots.txt` + `sitemap.xml` in `/public`
- Google Search Console verified
- AI agent content at `/llms.txt`

## Development

```bash
npm run dev    # Dev server at http://localhost:3000
npm run build  # Production build
npm run start  # Production server
```

## Deployment

Vercel. Push to main branch triggers auto-deploy.

## Known Placeholders

- Methodology Guide — Now opens as modal (no external link needed)
- `#` on community links — Needs URL when community launches
