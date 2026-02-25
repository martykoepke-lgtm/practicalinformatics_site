// AI Fit Diagnostic — scoring engine, question definitions, bridge mapping

export interface DiagnosticOption {
  label: string;
  fix: number;
  ai: number;
  inv: number;
  tag?: string;
}

export interface DiagnosticQuestion {
  id: string;
  label: string;
  options: DiagnosticOption[];
}

export interface PainPoint {
  id: string;
  text: string;
  scores: { fix: number; ai: number; inv: number };
  tags: string[];
  answers: Record<string, number>; // questionId → selected option index
  bucket: 'fix' | 'ai' | 'investigate' | null;
}

export interface BridgeRecommendation {
  suggestedTier: number;
  hasAI: boolean;
  reasoning: string;
}

// ─── Questions ─────────────────────────────────────────────────

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'variation',
    label: 'How much does this process vary from case to case?',
    options: [
      { label: 'High variation — every case is different', fix: 2, ai: 0, inv: 0, tag: 'variation' },
      { label: 'Moderate — common patterns with exceptions', fix: 0, ai: 1, inv: 1 },
      { label: 'Low — standardized and repeatable', fix: 0, ai: 2, inv: 0 },
    ],
  },
  {
    id: 'compliance',
    label: 'How regulated or compliance-sensitive is this area?',
    options: [
      { label: 'Highly regulated — strict compliance requirements', fix: 2, ai: 0, inv: 0, tag: 'compliance' },
      { label: 'Moderate — some regulatory oversight', fix: 1, ai: 0, inv: 1 },
      { label: 'Low — internal policies only', fix: 0, ai: 1, inv: 0 },
      { label: 'None — no regulatory considerations', fix: 0, ai: 2, inv: 0 },
    ],
  },
  {
    id: 'dataLocation',
    label: 'Where does the data for this process live?',
    options: [
      { label: 'Scattered across paper, email, and tribal knowledge', fix: 2, ai: 0, inv: 0, tag: 'data' },
      { label: 'Mostly digital but fragmented across systems', fix: 1, ai: 0, inv: 1 },
      { label: 'Centralized in one system', fix: 0, ai: 2, inv: 0 },
      { label: 'Already structured and API-ready', fix: 0, ai: 3, inv: 0, tag: 'data' },
    ],
  },
  {
    id: 'dataNorm',
    label: 'How standardized is the data?',
    options: [
      { label: 'Highly inconsistent — free text, no standards', fix: 2, ai: 0, inv: 0, tag: 'data' },
      { label: 'Somewhat standardized — mix of structured and free text', fix: 0, ai: 0, inv: 1 },
      { label: 'Well-standardized — consistent fields and formats', fix: 0, ai: 2, inv: 0 },
      { label: 'Already normalized and coded', fix: 0, ai: 3, inv: 0, tag: 'data' },
    ],
  },
  {
    id: 'aiIntent',
    label: 'What role would AI play?',
    options: [
      { label: 'AI as the decision-maker', fix: 0, ai: 0, inv: 2, tag: 'doer' },
      { label: 'AI as an assistant or recommender', fix: 0, ai: 2, inv: 0, tag: 'observer' },
      { label: 'AI for automation of routine tasks', fix: 0, ai: 3, inv: 0, tag: 'doer' },
    ],
  },
  {
    id: 'repetitive',
    label: 'How repetitive is this task?',
    options: [
      { label: 'Rarely repeats — mostly ad hoc', fix: 1, ai: 0, inv: 0 },
      { label: 'Sometimes — periodic but not daily', fix: 0, ai: 1, inv: 1 },
      { label: 'Highly repetitive — happens constantly', fix: 0, ai: 2, inv: 0 },
    ],
  },
  {
    id: 'observed',
    label: 'Has someone watched this process happen in person?',
    options: [
      { label: 'No — we\'re working from descriptions and assumptions', fix: 1, ai: 0, inv: 2 },
      { label: 'Yes — we\'ve directly observed the workflow', fix: 0, ai: 2, inv: 0, tag: 'observer' },
    ],
  },
];

// ─── Scoring ───────────────────────────────────────────────────

export function scorePainPoint(
  answers: Record<string, number>
): { fix: number; ai: number; inv: number; tags: string[]; bucket: 'fix' | 'ai' | 'investigate' } {
  let fix = 0;
  let ai = 0;
  let inv = 0;
  const tags: string[] = [];

  for (const question of diagnosticQuestions) {
    const selectedIndex = answers[question.id];
    if (selectedIndex === undefined) continue;
    const option = question.options[selectedIndex];
    if (!option) continue;

    fix += option.fix;
    ai += option.ai;
    inv += option.inv;
    if (option.tag && !tags.includes(option.tag)) {
      tags.push(option.tag);
    }
  }

  let bucket: 'fix' | 'ai' | 'investigate';
  if (fix > ai && fix > inv) {
    bucket = 'fix';
  } else if (ai > fix && ai > inv) {
    bucket = 'ai';
  } else {
    bucket = 'investigate';
  }

  return { fix, ai, inv, tags, bucket };
}

// ─── Action Recommendations ────────────────────────────────────

export function getActionRecommendation(point: PainPoint): string {
  if (!point.bucket) return '';

  const hasDataTag = point.tags.includes('data');
  const hasObserverTag = point.tags.includes('observer');
  const hasDoerTag = point.tags.includes('doer');

  switch (point.bucket) {
    case 'fix':
      if (hasDataTag) {
        return 'Start by standardizing and centralizing your data. This is a prerequisite before any AI conversation.';
      }
      return 'This is a people or process problem. Fix the workflow, training, or communication gap first — technology won\'t help here yet.';

    case 'ai':
      if (hasObserverTag && hasDoerTag) {
        return 'Strong AI candidate with both observation and automation potential. Start with the observer/assistant use case, then expand.';
      }
      if (hasObserverTag) {
        return 'Good fit for AI as an assistant or recommender. The process is observed and understood — AI can augment human decisions.';
      }
      if (hasDoerTag) {
        return 'Candidate for AI automation. The process is repetitive and data-ready. Ensure governance is in place before automating.';
      }
      return 'This looks like a viable AI use case. Your data and process maturity support it.';

    case 'investigate':
      if (hasDoerTag) {
        return 'You want AI to make decisions, but the foundation isn\'t there yet. Investigate data readiness and observe the process before proceeding.';
      }
      return 'More information needed. Spend time observing the actual workflow and assessing data readiness before committing to a direction.';
  }
}

// ─── Pattern Insights ──────────────────────────────────────────

export function generateInsights(painPoints: PainPoint[]): string[] {
  const scored = painPoints.filter((p) => p.bucket !== null);
  if (scored.length === 0) return [];

  const insights: string[] = [];

  const fixCount = scored.filter((p) => p.bucket === 'fix').length;
  const aiCount = scored.filter((p) => p.bucket === 'ai').length;
  const invCount = scored.filter((p) => p.bucket === 'investigate').length;

  // Distribution insight
  if (fixCount > 0 && fixCount >= scored.length / 2) {
    insights.push(
      `${fixCount} of ${scored.length} items need people/process fixes before any technology decision. This is the most common pattern — and exactly what PULSE is designed to catch.`
    );
  }
  if (aiCount > 0 && aiCount >= scored.length / 2) {
    insights.push(
      `${aiCount} of ${scored.length} items show strong AI readiness. Your data maturity and process standardization are in good shape.`
    );
  }
  if (invCount > 0 && invCount >= scored.length / 2) {
    insights.push(
      `${invCount} of ${scored.length} items need more investigation. This usually means the process hasn't been directly observed yet — start there.`
    );
  }

  // Tag-based insights
  const allTags = scored.flatMap((p) => p.tags);
  const dataTagCount = allTags.filter((t) => t === 'data').length;
  const observerTagCount = allTags.filter((t) => t === 'observer').length;
  const doerTagCount = allTags.filter((t) => t === 'doer').length;

  if (dataTagCount >= 3) {
    insights.push(
      'Data readiness is a recurring theme. Consider a data standardization initiative before individual AI projects.'
    );
  }

  if (observerTagCount > doerTagCount && observerTagCount >= 2) {
    insights.push(
      'Your AI use cases lean toward "observer" mode — AI assisting and recommending rather than deciding. This is the safest starting pattern.'
    );
  }

  if (doerTagCount > observerTagCount && doerTagCount >= 2) {
    insights.push(
      'Your AI use cases lean toward automation and decision-making. This requires stronger governance — PULSE Tier 3 is recommended.'
    );
  }

  return insights;
}

// ─── Bridge: Diagnostic → Pathway Builder ──────────────────────

export function mapToBridgeRecommendation(painPoints: PainPoint[]): BridgeRecommendation {
  const scored = painPoints.filter((p) => p.bucket !== null);
  if (scored.length === 0) {
    return { suggestedTier: 1, hasAI: false, reasoning: 'No scored items.' };
  }

  const fixCount = scored.filter((p) => p.bucket === 'fix').length;
  const aiCount = scored.filter((p) => p.bucket === 'ai').length;
  const invCount = scored.filter((p) => p.bucket === 'investigate').length;

  const allTags = scored.flatMap((p) => p.tags);
  const hasDoerTags = allTags.includes('doer');
  const hasObserverTags = allTags.includes('observer');

  // All Fix First → Tier 1, no AI
  if (fixCount === scored.length) {
    return {
      suggestedTier: 1,
      hasAI: false,
      reasoning:
        'All items are people/process problems. Start with Tier 1 (Standard) — focus on workflow fixes, training, and process improvements before any technology decisions.',
    };
  }

  // AI candidates with doer tags → Tier 3
  if (aiCount > 0 && hasDoerTags && !hasObserverTags) {
    return {
      suggestedTier: 3,
      hasAI: true,
      reasoning:
        'Your AI use cases involve automation and decision-making. Tier 3 (Critical) includes full AI governance — screening, impact assessment, drift monitoring, and bias tracking.',
    };
  }

  // AI candidates with both doer + observer, or significant AI count → Tier 3
  if (aiCount >= scored.length / 2 && hasDoerTags) {
    return {
      suggestedTier: 3,
      hasAI: true,
      reasoning:
        'Multiple AI candidates with automation intent. Tier 3 (Critical) ensures proper governance for AI decision-making and monitoring.',
    };
  }

  // Mix of Fix + AI (observer-heavy) → Tier 2
  if (aiCount > 0 || invCount > 0) {
    return {
      suggestedTier: 2,
      hasAI: true,
      reasoning:
        'A mix of process fixes and AI opportunities. Tier 2 (Elevated) adds data readiness assessment, stakeholder interviews, and governance checkpoints — the right level for AI-assisted workflows.',
    };
  }

  // Fallback
  return {
    suggestedTier: 1,
    hasAI: false,
    reasoning: 'Based on your assessment, start with standard PULSE governance.',
  };
}

// ─── Bucket Display Config ─────────────────────────────────────

export const BUCKET_CONFIG = {
  fix: {
    label: 'Fix First',
    color: '#E67E22',
    description: 'These are people or process problems — fix the workflow before adding technology.',
  },
  ai: {
    label: 'Good AI Candidate',
    color: '#4A90E2',
    description: 'Data and process maturity support AI. These are ready for the next step.',
  },
  investigate: {
    label: 'Investigate More',
    color: '#94A3B8',
    description: 'More observation and data assessment needed before committing to a direction.',
  },
} as const;
