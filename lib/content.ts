// All PULSE Framework site content as typed constants

export const siteConfig = {
  name: 'Practical Informatics',
  tagline: 'PULSE Framework — Healthcare Technology Consulting',
  url: 'https://www.practicalinformatics.com',
  author: 'Marty Koepke',
  authorTitle: 'Healthcare Technology Consultant',
} as const;

export const links = {
  bookACall: 'https://tally.so/r/9qNRM5',
  accelerator: 'https://tally.so/r/xXVPgo',
  webApp: 'https://martypractical.gumroad.com/l/ebjqkf',
  methodology: '#methodology',
  community: '#',
  linkedin: 'https://www.linkedin.com/in/marty-koepke/',
  book: 'https://a.co/d/08QnZGaP',
  ehrDemo: 'https://sophiav2.vercel.app/',
  vytalPathDemo: 'https://vytalpathdemo.vercel.app/',
} as const;

export const navLinks = [
  { label: 'PULSE', href: '/pulse' },
  { label: 'Web App', href: '#toolkit' },
  { label: 'Work With Me', href: '#consulting' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const stats = [
  { number: '15+', label: 'Years in Healthcare' },
  { number: '2,200+', label: 'Care Sites' },
  { number: '25,000+', label: 'Clinicians Supported' },
] as const;

export const hero = {
  eyebrow: 'The PULSE Framework',
  headline: 'The bridge between the problem and the right solution.',
  subtitle: 'Technology projects fail in the gap between what leadership wants and what\'s actually happening. The PULSE Framework closes that gap — five phases that start with observation, not assumptions. Built from 15 years of healthcare informatics.',
  ctas: [
    { label: 'Read the PULSE Methodology', variant: 'shimmer' as const, action: 'methodology-modal' as const },
    { label: 'Find Where AI Fits', href: '/pulse', variant: 'spring' as const },
    { label: 'Get the Web App — $197', href: 'https://martypractical.gumroad.com/l/ebjqkf', variant: 'primary' as const },
    { label: 'Work With Me', href: '#consulting', variant: 'ghost' as const },
  ],
} as const;

export const pattern = {
  eyebrow: 'The Pattern',
  headline: 'This is how technology projects fail.',
  paragraphs: [
    'A leader sees a demo. Someone says "we need that." A team gets assembled. Requirements get written based on assumptions. Technology gets purchased. It doesn\'t fit how the work actually happens. Staff build workarounds. Leadership blames the tool. The cycle repeats.',
    'The gap is never between the technology and the requirements. The gap is between the requirements and reality.',
  ],
  pullquote: 'After 15 years and hundreds of implementations inside one of the nation\'s largest health systems, I found the same pattern: 50–60% of "technology problems" are actually training or process problems wearing a technology costume.',
  closing: 'The fix isn\'t better technology. It\'s a better framework.',
} as const;

export interface PulsePhase {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  checkpoint: string;
}

export const pulsePhases: PulsePhase[] = [
  {
    id: 'problem',
    letter: 'P',
    title: 'Problem',
    subtitle: "What's actually broken — and for whom?",
    color: '#4A90E2',
    description: "Before anything else, define the problem in plain language. Not the vendor's language. Not the executive summary version. The version that the person doing the work would recognize. Identify stakeholders, classify risk, and determine if AI governance applies.",
    checkpoint: 'Is the problem clearly defined and worth pursuing?',
  },
  {
    id: 'understand',
    letter: 'U',
    title: 'Understand',
    subtitle: 'What is actually happening?',
    color: '#4A90E2',
    description: "Go watch the work happen. Document every step, every workaround, every pain point. Categorize issues as People, Process, or Platform. Identify what can be fixed today. Map how data actually moves. Capture the questions that need answers before anyone designs a solution.",
    checkpoint: 'Do we understand reality well enough to define success?',
  },
  {
    id: 'landscape',
    letter: 'L',
    title: 'Landscape',
    subtitle: "What should be happening — and what's the gap?",
    color: '#4A90E2',
    description: "Align leadership on the desired state in operational terms, not vendor language. Translate vague outcomes into measurable success criteria. Map every gap between current and desired state. Classify each gap as People, Process, or Platform. Prioritize by impact and effort.",
    checkpoint: 'Is the gap real, and is the proposed direction justified?',
  },
  {
    id: 'solve',
    letter: 'S',
    title: 'Solve',
    subtitle: 'How do we close the gap?',
    color: '#E67E22',
    description: "Convert gaps into concrete action plans — separated by audience. People actions go to training leads. Process actions go to operations. Platform actions go to IT. Translate the same solution into language each stakeholder group understands. Document governance before go-live.",
    checkpoint: 'Has the solution been validated by the people who do the work, lead it, and build it?',
  },
  {
    id: 'enable',
    letter: 'E',
    title: 'Enable',
    subtitle: 'How do we make it stick?',
    color: '#4A90E2',
    description: "Implementation without adoption is just expensive decoration. Enable covers readiness checks, training design, communication planning, and post-implementation monitoring. Track outcomes at 30, 60, and 90 days. Monitor for equity disparities and AI drift. Close the loop.",
    checkpoint: 'Are we monitoring outcomes and ready to adjust?',
  },
];

export const startHere = {
  eyebrow: 'Start Here',
  headline: 'Start free. Go deeper when you\'re ready.',
  subtitle: 'The PULSE Framework gives you everything you need to run a structured technology evaluation — from understanding the problem to proving the solution worked.',
  methodology: {
    title: 'The PULSE Methodology Guide',
    description: 'Before the tools, there\'s the philosophy. The PULSE Methodology Guide defines the principles, governance model, and decision logic behind every phase. If you want to understand why PULSE works the way it does, start here.',
    note: 'Free. No email required.',
  },
  webApp: {
    title: 'The PULSE Web App',
    tagline: 'Five phases. One spreadsheet. Every initiative organized from problem to proof.',
    description: 'A structured five-phase path from problem definition to 90-day proof. The PULSE Web App automatically surfaces whether pain points are People, Process, or Platform issues — so you fix the right thing first. Technology comes last, and only when justified by evidence.',
    price: '$197',
    priceNote: 'One-time purchase. No subscription.',
    features: [
      { title: 'Key Insight Engine', description: 'Auto-calculates your People vs. Process vs. Platform breakdown — most teams discover the majority of their pain points aren\'t technology problems at all.' },
      { title: 'Structured Observation', description: 'Gemba-style observation sessions with confidence scoring, workflow step mapping, and pain point cataloging with severity, frequency, and waste type.' },
      { title: 'Analysis to Action', description: 'Three-lane action plans — People (training, roles), Process (workflow redesign, SOPs), Platform (technology) — each with owners and timelines.' },
      { title: 'Proof It Worked', description: '30/60/90-day outcome tracking against predefined success metrics. Control plans ensure improvements stick.' },
    ],
    coreInsight: '50\u201370% of \u201ctechnology problems\u201d are actually People or Process problems. The PULSE Web App helps you see this before you spend.',
  },
} as const;

export const twoLanes = {
  eyebrow: 'Two Ways In',
  headline: 'Organizations need both lanes.',
  subtitle: 'Every organization — especially in healthcare — needs two AI strategies running simultaneously. The PULSE Framework serves both.',
  lanes: [
    {
      id: 'org',
      title: 'Lane 1: Integrate Technology the Right Way',
      description: "Your organization is buying AI tools, implementing new platforms, and modernizing workflows. The question isn't whether to adopt — it's whether you're doing the work before the purchase that determines whether it actually works.",
      audience: 'For: CIOs, VPs, Directors, Operations Leaders',
      cta: { label: 'Work With Me', href: '#consulting' },
      accentColor: '#4A90E2',
    },
    {
      id: 'builder',
      title: 'Lane 2: Build With AI Yourself',
      description: "The barrier to entry for software development is essentially zero. Domain experts — informaticists, project managers, operations leaders — can now build real applications using AI-assisted tools. The skill isn't coding. It's knowing what to build and why.",
      audience: 'For: Domain experts, informaticists, project managers, curious professionals',
      cta: { label: 'Join From Curious to Capable', href: '#community' },
      accentColor: '#E67E22',
    },
  ],
} as const;

export const workWithMe = {
  eyebrow: 'Work With Me',
  headline: 'Work With Me',
  paragraphs: [
    'I partner with organizations to implement technology the right way — using the PULSE Framework. Every engagement follows the same five phases, scaled to the initiative.',
    'Whether you need a focused assessment of a single initiative or ongoing methodology support across your enterprise, it starts with a conversation.',
  ],
  ctaNote: 'No commitment. No pitch deck. Just a conversation about what you\'re trying to solve.',
} as const;

export const community = {
  eyebrow: 'Lane 2',
  headline: 'From Curious to Capable.',
  comingSoon: true,
  intro: "You're not behind on AI. You're mislabeled. If your career has been translating between the people who need something and the people who build it — you're already doing the hardest part. AI just makes you faster.",
  learnItems: [
    'How to write specifications clear enough that AI can build from them',
    'How to evaluate, refine, and iterate on AI-generated output',
    'How to build real applications (dashboards, automations, knowledge bases) with no-code and AI-assisted tools',
    'How to apply the PULSE Framework to your own projects',
    'How to move from consumer of technology to creator of solutions',
  ],
  audience: 'Clinical informaticists. Project managers. Business analysts. Operations leaders. Anyone with domain expertise and the curiosity to build.',
  accelerator: {
    title: 'Want hands-on guidance?',
    description: 'The 1:1 App Accelerator is an 8-week program where you build your first AI-powered application with direct coaching. From idea to deployed product.',
    price: '$2,000',
  },
} as const;

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  cardDescription: string;
  tags: string[];
  demoUrl?: string;
  screenshots?: string[];
  truth: string;
  translation: string;
  learned: string;
  copyright?: string;
}

export const projects: Project[] = [
  {
    id: 'activiteez',
    title: 'Activiteez',
    subtitle: 'Activity and resource management for multi-location organizations',
    cardDescription: 'Scheduling, inventory tracking, attendance, and multi-building data isolation. Built using the PULSE methodology with AI-assisted development.',
    tags: ['React', 'TypeScript', 'Supabase', 'Multi-tenant'],
    screenshots: [
      '/images/activiteez/Screenshot 2025-11-30 111812.png',
      '/images/activiteez/Screenshot 2025-11-30 114003.png',
      '/images/activiteez/Screenshot 2025-11-30 111841.png',
      '/images/activiteez/Screenshot 2025-11-30 111855.png',
    ],
    truth: "Senior living facilities manage dozens of recurring activities across multiple buildings — often with spreadsheets, paper calendars, and guesswork about supplies.",
    translation: "A platform that handles scheduling, inventory tracking with automatic consumption, attendance management, and multi-building data isolation. Built for the activity director who doesn't have an IT department.",
    learned: "Multi-tenant architecture sounds abstract until you're debugging why Building A can see Building B's bingo cards. I learned to think in contexts — and to let AI help me catch the edge cases I'd miss.",
  },
  {
    id: 'governiq',
    title: 'GovernIQ',
    subtitle: 'Enterprise work management and capacity planning',
    cardDescription: 'Configurable initiative tracking, governance workflows, and real-time capacity analytics. Fully custom-built.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    screenshots: [
      '/images/governiq/Screenshot 2025-11-30 100902.png',
      '/images/governiq/Screenshot 2025-11-30 100848.png',
      '/images/governiq/Screenshot 2025-11-30 101040.png',
      '/images/governiq/Screenshot 2025-11-28 200224.png',
    ],
    truth: "Organizations tracking dozens of initiatives across multiple teams struggle to see who's overloaded, what's stuck, and where to focus. Spreadsheets break down. Visibility disappears.",
    translation: "A configurable platform for initiative tracking, governance workflows, and real-time capacity analytics. Fully customizable fields, weights, and branding — no code changes required.",
    learned: "The hardest part of enterprise software isn't the features — it's making it flexible enough to fit how different organizations actually work. I built a system where admins can change everything without touching code.",
    copyright: '© 2025 Marty Koepke. U.S. Copyright Registration Case #1-15031668531. Developed independently using personal resources.',
  },
  {
    id: 'sophia',
    title: 'EHR Governance Assistant',
    subtitle: 'Process navigator and AI assistant for EHR governance',
    cardDescription: 'An intuitive process navigator that breaks down each governance stage into clear steps, combined with an AI assistant that provides real-time guidance through the governance process.',
    tags: ['React', 'AI Integration', 'Process Design'],
    demoUrl: 'https://sophiav2.vercel.app/',
    truth: "Enterprise EHR governance involves multiple committees, complex approval workflows, and dozens of stakeholders. People get lost trying to navigate the process.",
    translation: "An intuitive process navigator that breaks down each governance stage into clear steps, combined with an AI assistant that answers questions in plain language.",
    learned: 'The best documentation is the kind people actually use. I learned to design for the person who\'s frustrated and just wants to know "what happens next?"',
  },
  {
    id: 'vytalpath',
    title: 'VytalPath Academy',
    subtitle: 'Training platform for new healthcare staff',
    cardDescription: '1,000+ healthcare terms in plain language, step-by-step workflows, HIPAA modules, and smart search. Accessible, practical, and designed for the first 90 days.',
    tags: ['React', 'TypeScript', 'Supabase', 'Mobile-First'],
    demoUrl: 'https://vytalpathdemo.vercel.app/',
    truth: "New front office staff face an overwhelming first day — medical jargon, insurance workflows, HIPAA compliance, clinic procedures. The result is anxiety, mistakes, and high turnover.",
    translation: "A training and reference platform with 1,000+ healthcare terms in plain language, step-by-step workflows, HIPAA modules, and smart search. Accessible on phone or desktop.",
    learned: 'Training isn\'t about dumping information — it\'s about being there at the moment someone needs an answer. I built for the person Googling "what does PRN mean" during their first week.',
  },
];

export const background = {
  eyebrow: 'Background',
  headline: 'Healthcare is where I learned this.',
  bio: [
    "I spent 15 years inside one of the nation's largest nonprofit health systems — 140+ hospitals, 2,200+ ambulatory care sites, 25,000+ clinicians across multiple EHR platforms. My work spans governance facilitation, enterprise standards, and the kind of workflow analysis that only comes from watching people do the work.",
    "Four years in ICU critical care taught me what it feels like when technology doesn't work at the bedside. Fifteen years in clinical informatics taught me why it keeps happening.",
    "The PULSE Framework isn't something I invented in a workshop. It's the pattern I discovered after hundreds of implementations, distilled into a repeatable methodology that anyone can follow.",
    "Now I help organizations apply the method — and teach domain experts to build solutions themselves using AI.",
  ],
  bookLine: 'I wrote about the invisible work of the people who do this in',
  bookTitle: 'Between the Clicks: The Hidden Work of Healthcare Informatics',
  credentials: 'Master of Healthcare Administration | Lean Six Sigma Green Belt (pursuing Black Belt) | SAFe 6.0 Agilist | Certified Scrum Master',
  closing: "Same framework. Whether I'm helping a health system integrate ambient documentation or teaching a project manager to build their first dashboard — the process is PULSE.",
  domainTranslator: {
    title: 'The Domain Translator',
    paragraphs: [
      "The hardest part of any technology project isn't the technology. It's the translation. Clinical teams describe problems one way. Leadership frames priorities another way. IT speaks an entirely different language. The gap between those groups is where projects fail — not because anyone is wrong, but because no one is translating.",
      "A domain translator sits between all of them. Not belonging to any single group, but fluent in each. That's what I do. That's what the PULSE Framework systematizes. And it's the skill that matters most in the age of AI — because AI doesn't fail when the code is wrong. It fails when the question was wrong.",
    ],
  },
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is the PULSE Framework?',
    answer: "PULSE stands for Problem, Understand, Landscape, Solve, Enable. It's a structured methodology for implementing technology — especially AI — that starts with observing what's actually happening before deciding what to build. It was developed through nearly two decades of healthcare informatics experience.",
  },
  {
    question: "What's the difference between the Methodology Guide, the Diagnostic, and the Web App?",
    answer: "The Methodology Guide is the foundational philosophy — the principles, governance model, and decision logic behind PULSE. It's free and requires no email. The AI Fit Diagnostic is a free interactive tool that helps you determine which pain points are real AI candidates and which need people or process fixes first. The PULSE Web App ($197) is the full operational toolkit — 30 structured data tables, automated People/Process/Platform classification, dashboards, and 90-day outcome tracking.",
  },
  {
    question: "What's in the PULSE Web App?",
    answer: "A web application built on Google Sheets with 30 structured data tables, automated calculations, visual dashboards, and print-ready reports. It covers the complete PULSE methodology: initiative tracking, workflow observation, pain point cataloging, gap analysis, three-lane action planning (People, Process, Platform), and 30/60/90-day outcome monitoring. One-time purchase at $197 — no recurring costs.",
  },
  {
    question: 'Is this only for healthcare?',
    answer: "The methodology was developed in healthcare, but the pattern is universal. Any organization implementing technology — especially AI — faces the same gap between what leadership wants and what's actually happening on the ground. PULSE works anywhere that gap exists.",
  },
  {
    question: "What's From Curious to Capable?",
    answer: "A community for domain experts who want to learn to build with AI. Not a coding bootcamp — a space for people whose careers have been about translating between groups, and who are ready to use AI to build what they've been specifying for others.",
  },
  {
    question: 'Do I need coding experience to use the PULSE Web App?',
    answer: "No. The web app is designed for domain experts, not developers. If you can use a spreadsheet, you can use the web app. Your team interacts with a polished interface — they never see the underlying spreadsheet.",
  },
  {
    question: 'Why Google Sheets?',
    answer: "Because your team already has it. No procurement cycle. No new logins. No data leaving your organization. The web app runs on top of Sheets so your team interacts with a polished interface — they never see the spreadsheet. And if you ever outgrow it, the data is yours to export.",
  },
  {
    question: '$197 seems expensive for a spreadsheet.',
    answer: "It's not a spreadsheet. It's a web application with 30 structured data tables, automated calculations, a dashboard, print-ready reports, and a built-in methodology guide. Compare that to any SaaS tool doing a fraction of this at $50/month/user. This is a one-time purchase with no recurring costs.",
  },
  {
    question: 'What does "technology is always the last decision" mean?',
    answer: "It means that most technology projects fail not because of bad technology, but because the organization never clearly defined the problem, understood what was actually happening, or aligned on what success looks like. PULSE ensures those things happen first — so by the time you get to the technology decision, it's informed by reality.",
  },
];

export const footerCta = {
  headline: 'Start with the problem.',
  pulseLetters: 'P → U → L → S → E',
  orgPath: {
    title: 'For organizations',
    description: 'Read the PULSE Methodology Guide for free. Find where AI fits with the diagnostic. Get the Web App. Or book a call and let\'s talk about your specific challenge.',
  },
  builderPath: {
    title: 'For builders',
    description: 'Join a community of domain experts learning to build with AI. From Curious to Capable.',
  },
} as const;
