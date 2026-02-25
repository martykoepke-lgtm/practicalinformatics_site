// PULSE Pathway Builder data — 30 sections across 5 phases

export interface PathwaySection {
  id: number;
  name: string;
  phase: string;
  type: 'core' | 'governance' | 'ai' | 'facilitation' | 'vendor';
  tab: string;
  time: string;
  what: string;
  done: string;
  tiers: number[];
  ai: boolean;
  vendor: boolean;
}

export interface PathwayPhase {
  key: string;
  label: string;
  color: string;
}

export const PHASES: PathwayPhase[] = [
  { key: 'P', label: 'Problem', color: '#4A90E2' },
  { key: 'U', label: 'Understand', color: '#4A90E2' },
  { key: 'L', label: 'Landscape', color: '#4A90E2' },
  { key: 'S', label: 'Solve', color: '#E67E22' },
  { key: 'E', label: 'Enable', color: '#4A90E2' },
];

export const TYPE_STYLES: Record<string, { label: string; color: string }> = {
  core: { label: 'Core', color: '#4A90E2' },
  governance: { label: 'Governance', color: '#E67E22' },
  ai: { label: 'AI', color: '#A855F7' },
  facilitation: { label: 'Facilitation', color: '#22D3EE' },
  vendor: { label: 'Vendor', color: '#F59E0B' },
};

export const TIER_INFO = [
  {
    tier: 1,
    label: 'Tier 1 — Standard',
    description: 'Operational improvements with no PHI exposure, no clinical decision-making impact, and no AI components. Governance checkpoints are self-assessed by the project team.',
  },
  {
    tier: 2,
    label: 'Tier 2 — Elevated',
    description: 'Initiatives involving PHI, clinical workflow changes, or integration with existing AI tools. Governance checkpoints require documented review by a designated governance lead.',
  },
  {
    tier: 3,
    label: 'Tier 3 — Critical',
    description: 'New AI implementation, clinical decision support, algorithmic recommendations affecting patient care, or cross-system data sharing. Governance checkpoints require formal review with documented sign-off from clinical, compliance, privacy, and IT security stakeholders.',
  },
];

export const SECTIONS: PathwaySection[] = [
  // ===== PROBLEM PHASE =====
  {
    id: 1,
    name: 'Problem Statement',
    phase: 'P',
    type: 'core',
    tab: 'Initiative Log',
    time: '1–2 hours',
    what: 'Define the problem in plain language — the version the person doing the work would recognize. Not the vendor pitch. Not the executive summary.',
    done: 'A written problem statement that a frontline worker would read and say "yes, that\'s the problem."',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 2,
    name: 'Stakeholder Identification',
    phase: 'P',
    type: 'core',
    tab: 'Stakeholder Directory',
    time: '1–2 hours',
    what: 'Identify everyone affected by or involved in the initiative. Map who owns the problem, who experiences it, and who will be asked to change.',
    done: 'A stakeholder directory with names, roles, relationship to the problem, and communication preferences.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 3,
    name: 'Risk Classification',
    phase: 'P',
    type: 'governance',
    tab: 'Initiative Log',
    time: '30–60 min',
    what: 'Classify the initiative by governance tier (1: Standard, 2: Elevated, 3: Critical) based on scope, patient impact, data sensitivity, AI involvement, and organizational reach.',
    done: 'Governance tier assigned with documented rationale. This determines the depth of the remaining PULSE pathway.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 4,
    name: 'AI Governance Screening',
    phase: 'P',
    type: 'ai',
    tab: 'AI Initiative Screening',
    time: '1–2 hours',
    what: 'Determine if the initiative involves AI/ML. Screen for algorithmic risk, training data concerns, explainability requirements, and regulatory triggers.',
    done: 'AI screening form completed. If AI is involved, additional governance steps are flagged throughout the pathway.',
    tiers: [2, 3],
    ai: true,
    vendor: false,
  },
  {
    id: 5,
    name: 'Governance Checkpoint: Problem',
    phase: 'P',
    type: 'governance',
    tab: 'Governance Templates',
    time: '30 min',
    what: 'Formal checkpoint: Is the problem clearly defined and worth pursuing? Review with sponsor or governance body.',
    done: 'Go/no-go decision documented. If go, proceed to Understand phase.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },

  // ===== UNDERSTAND PHASE =====
  {
    id: 6,
    name: 'Workflow Observation',
    phase: 'U',
    type: 'core',
    tab: 'Workflow Tracker',
    time: '4–8 hours',
    what: 'Go watch the work happen. Document every step, every workaround, every decision point. Map the actual workflow — not the one in the policy manual.',
    done: 'Step-by-step workflow documented from direct observation, including time estimates and decision points.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 7,
    name: 'Pain Point Catalog',
    phase: 'U',
    type: 'core',
    tab: 'Pain Point Log',
    time: '2–4 hours',
    what: 'Catalog every pain point, workaround, and friction point observed. Classify each as People, Process, or Platform.',
    done: 'Pain point log with P/P/P classification and auto-calculated ratios showing the true distribution of problems.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 8,
    name: 'Data Flow Mapping',
    phase: 'U',
    type: 'core',
    tab: 'Data Flow Tracker',
    time: '2–4 hours',
    what: 'Trace how data actually moves through the current process. Where does it originate? Where does it get stuck? Where is it duplicated or lost?',
    done: 'Data flow map showing origin, handoffs, transformations, and known failure points.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 9,
    name: 'Stakeholder Interviews',
    phase: 'U',
    type: 'facilitation',
    tab: 'Stakeholder Directory',
    time: '4–8 hours',
    what: 'Structured interviews with key stakeholders. Use the Field Guide interview templates. Capture what they think the problem is, what they\'ve tried, and what success looks like to them.',
    done: 'Interview summaries linked to stakeholder directory. Themes and contradictions identified.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 10,
    name: 'Quick Wins Identification',
    phase: 'U',
    type: 'core',
    tab: 'Quick Wins Tracker',
    time: '1–2 hours',
    what: 'From your observations and pain points, identify things that can be fixed right now without a technology decision. Training gaps, process ambiguities, communication breakdowns.',
    done: 'Quick wins list with owners, target dates, and expected impact. These build credibility while the larger initiative progresses.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 11,
    name: 'AI Data Readiness Assessment',
    phase: 'U',
    type: 'ai',
    tab: 'AI Initiative Screening',
    time: '2–4 hours',
    what: 'If AI is involved: assess the quality, completeness, and bias potential of available training/input data. Map data sources and identify gaps.',
    done: 'Data readiness scorecard completed. Known data gaps and bias risks documented.',
    tiers: [3],
    ai: true,
    vendor: false,
  },
  {
    id: 12,
    name: 'Governance Checkpoint: Understand',
    phase: 'U',
    type: 'governance',
    tab: 'Governance Templates',
    time: '30–60 min',
    what: 'Formal checkpoint: Do we understand reality well enough to define success? Present findings to sponsor or governance body.',
    done: 'Understanding validated. P/P/P distribution reviewed. Quick wins approved. Go/no-go for Landscape phase.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },

  // ===== LANDSCAPE PHASE =====
  {
    id: 13,
    name: 'Desired State Definition',
    phase: 'L',
    type: 'core',
    tab: 'Gap Analysis Matrix',
    time: '2–4 hours',
    what: 'Align leadership on what "done" looks like in operational terms. Not vendor promises — measurable outcomes that frontline workers would recognize as improvement.',
    done: 'Desired state documented with specific, measurable success criteria tied to observed pain points.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 14,
    name: 'Gap Analysis',
    phase: 'L',
    type: 'core',
    tab: 'Gap Analysis Matrix',
    time: '2–4 hours',
    what: 'Map every gap between the current state (from Understand) and the desired state. Classify each gap as People, Process, or Platform. Prioritize by impact and effort.',
    done: 'Gap analysis matrix with P/P/P classification, priority ranking, and clear linkage to observed problems.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 15,
    name: 'Success Criteria Definition',
    phase: 'L',
    type: 'core',
    tab: 'Gap Analysis Matrix',
    time: '1–2 hours',
    what: 'Translate the desired state into measurable KPIs. Define what you\'ll measure at 30, 60, and 90 days. Agree on thresholds for success vs. failure.',
    done: 'Success criteria document with specific metrics, measurement methods, and decision thresholds.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 16,
    name: 'Vendor Landscape Scan',
    phase: 'L',
    type: 'vendor',
    tab: 'Recommendation Builder',
    time: '4–8 hours',
    what: 'If the gap analysis reveals Platform needs: survey the vendor landscape. Map capabilities against your specific gaps — not against a generic feature checklist.',
    done: 'Vendor comparison matrix scored against your actual gaps and success criteria. No vendor selected yet — just options mapped.',
    tiers: [2, 3],
    ai: false,
    vendor: true,
  },
  {
    id: 17,
    name: 'Algorithmic Impact Assessment',
    phase: 'L',
    type: 'ai',
    tab: 'AI Risk Assessment',
    time: '2–4 hours',
    what: 'If AI is involved: assess potential impact on equity, access, clinical outcomes, and workforce. Use the algorithmic risk assessment template.',
    done: 'Impact assessment completed. Risk level documented. Mitigation strategies identified for each risk area.',
    tiers: [3],
    ai: true,
    vendor: false,
  },
  {
    id: 18,
    name: 'Governance Checkpoint: Landscape',
    phase: 'L',
    type: 'governance',
    tab: 'Governance Templates',
    time: '30–60 min',
    what: 'Formal checkpoint: Is the gap real, and is the proposed direction justified? Present gap analysis and proposed approach to governance body.',
    done: 'Direction approved. Technology approach (if any) authorized. Budget and timeline expectations set.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },

  // ===== SOLVE PHASE =====
  {
    id: 19,
    name: 'Action Plan: People',
    phase: 'S',
    type: 'core',
    tab: 'Action Planner',
    time: '2–4 hours',
    what: 'Convert People-classified gaps into concrete actions: training plans, role clarifications, communication plans. Assign to training leads and managers.',
    done: 'People action plan with owners, timelines, and deliverables. Written in language training leads understand.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 20,
    name: 'Action Plan: Process',
    phase: 'S',
    type: 'core',
    tab: 'Action Planner',
    time: '2–4 hours',
    what: 'Convert Process-classified gaps into concrete actions: workflow redesigns, policy updates, handoff improvements. Assign to operations leads.',
    done: 'Process action plan with owners, timelines, and deliverables. Written in language operations teams understand.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 21,
    name: 'Action Plan: Platform',
    phase: 'S',
    type: 'core',
    tab: 'Action Planner',
    time: '2–4 hours',
    what: 'Convert Platform-classified gaps into concrete actions: configuration changes, integrations, new tool implementations. Assign to IT teams.',
    done: 'Platform action plan with owners, timelines, and deliverables. Written in language IT teams understand.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 22,
    name: 'Vendor Selection & Contracting',
    phase: 'S',
    type: 'vendor',
    tab: 'Recommendation Builder',
    time: '8–20 hours',
    what: 'If a vendor is needed: finalize selection based on gap-mapped scoring. Negotiate contracts with clear SLAs tied to your success criteria.',
    done: 'Vendor selected with documented rationale. Contract includes SLAs tied to your measurable success criteria.',
    tiers: [2, 3],
    ai: false,
    vendor: true,
  },
  {
    id: 23,
    name: 'Solution Brief',
    phase: 'S',
    type: 'facilitation',
    tab: 'Governance Templates',
    time: '2–4 hours',
    what: 'Translate the complete solution into a brief that each stakeholder group can understand. Clinical version, leadership version, IT version — same solution, different language.',
    done: 'Solution brief with audience-specific versions. Each stakeholder group confirms understanding.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 24,
    name: 'Governance Checkpoint: Solve',
    phase: 'S',
    type: 'governance',
    tab: 'Governance Templates',
    time: '30–60 min',
    what: 'Formal checkpoint: Has the solution been validated by the people who do the work, lead it, and build it?',
    done: 'Solution validated across all stakeholder groups. Implementation authorized. Go/no-go for Enable phase.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },

  // ===== ENABLE PHASE =====
  {
    id: 25,
    name: 'Readiness Assessment',
    phase: 'E',
    type: 'core',
    tab: 'Monitoring Dashboard',
    time: '2–4 hours',
    what: 'Before go-live: verify that all action plans are complete, training is scheduled, communication has gone out, and support resources are in place.',
    done: 'Readiness checklist completed. All prerequisites verified. Go-live date confirmed.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 26,
    name: 'Training & Communication',
    phase: 'E',
    type: 'facilitation',
    tab: 'Action Planner',
    time: '4–16 hours',
    what: 'Execute training plans and communication campaigns. Ensure every affected person knows what\'s changing, why, and where to get help.',
    done: 'Training completed with attendance tracked. Communication delivered across all channels. Support resources accessible.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 27,
    name: '30-Day Monitoring',
    phase: 'E',
    type: 'core',
    tab: 'Monitoring Dashboard',
    time: 'Ongoing',
    what: 'Track success metrics at 30 days. Compare against baseline from Understand phase. Identify early adoption issues or unexpected impacts.',
    done: '30-day report with metrics vs. baseline. Issues identified and escalated. Adjustments planned if needed.',
    tiers: [1, 2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 28,
    name: '60/90-Day Monitoring',
    phase: 'E',
    type: 'core',
    tab: 'Monitoring Dashboard',
    time: 'Ongoing',
    what: 'Continue tracking at 60 and 90 days. Assess sustained adoption, outcome trends, and whether the initiative is meeting success criteria.',
    done: '60/90-day reports. Sustained outcomes verified. Initiative closed or transitioned to operations.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
  {
    id: 29,
    name: 'AI Drift & Bias Monitoring',
    phase: 'E',
    type: 'ai',
    tab: 'AI Drift Monitoring',
    time: 'Ongoing',
    what: 'If AI is involved: monitor for model drift, output degradation, equity disparities, and unintended bias in outcomes.',
    done: 'Drift monitoring dashboard active. Alert thresholds set. Equity metrics tracked alongside performance metrics.',
    tiers: [3],
    ai: true,
    vendor: false,
  },
  {
    id: 30,
    name: 'Governance Checkpoint: Enable',
    phase: 'E',
    type: 'governance',
    tab: 'Governance Templates',
    time: '30–60 min',
    what: 'Final checkpoint: Are we monitoring outcomes and ready to adjust? Confirm ongoing ownership and escalation paths.',
    done: 'Initiative formally closed or transitioned. Lessons learned documented. Governance loop complete.',
    tiers: [2, 3],
    ai: false,
    vendor: false,
  },
];

/** Filter sections based on intake answers */
export function getFilteredSections(
  tier: number,
  hasAI: boolean,
  hasVendor: boolean
): PathwaySection[] {
  return SECTIONS.filter((s) => {
    if (!s.tiers.includes(tier)) return false;
    if (s.ai && !hasAI) return false;
    if (s.vendor && !hasVendor) return false;
    return true;
  });
}

/** Calculate estimated timeline from filtered sections */
export function getTimeline(sections: PathwaySection[]): string {
  let minHours = 0;
  let maxHours = 0;

  for (const s of sections) {
    if (s.time === 'Ongoing') continue;
    const match = s.time.match(/(\d+)[\u2013–-](\d+)/);
    if (match) {
      minHours += parseInt(match[1], 10);
      maxHours += parseInt(match[2], 10);
    } else {
      const single = s.time.match(/(\d+)/);
      if (single) {
        const val = parseInt(single[1], 10);
        minHours += val;
        maxHours += val;
      }
    }
  }

  if (maxHours <= 8) return `${minHours}–${maxHours} hours`;
  const minDays = Math.ceil(minHours / 8);
  const maxDays = Math.ceil(maxHours / 8);
  return `${minDays}–${maxDays} working days`;
}
