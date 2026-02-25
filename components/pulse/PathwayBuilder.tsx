'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PHASES,
  TYPE_STYLES,
  TIER_INFO,
  getFilteredSections,
  getTimeline,
  type PathwaySection,
} from '@/lib/pathway-data';
import Button, { ArrowIcon } from '@/components/ui/Button';

type Screen = 'intake' | 'results';

interface PathwayBuilderProps {
  initialTier?: number;
  initialHasAI?: boolean;
  initialHasVendor?: boolean;
}

export default function PathwayBuilder({
  initialTier,
  initialHasAI,
  initialHasVendor,
}: PathwayBuilderProps = {}) {
  const hasInitialValues =
    initialTier !== undefined && initialHasAI !== undefined && initialHasVendor !== undefined;

  const [screen, setScreen] = useState<Screen>(hasInitialValues ? 'results' : 'intake');
  const [tier, setTier] = useState<number | null>(initialTier ?? null);
  const [hasAI, setHasAI] = useState<boolean | null>(initialHasAI ?? null);
  const [hasVendor, setHasVendor] = useState<boolean | null>(initialHasVendor ?? null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const filteredSections = useMemo(() => {
    if (tier === null || hasAI === null || hasVendor === null) return [];
    return getFilteredSections(tier, hasAI, hasVendor);
  }, [tier, hasAI, hasVendor]);

  const timeline = useMemo(() => getTimeline(filteredSections), [filteredSections]);

  const progress = filteredSections.length
    ? Math.round((completed.size / filteredSections.length) * 100)
    : 0;

  const canBuild = tier !== null && hasAI !== null && hasVendor !== null;

  function handleBuild() {
    if (!canBuild) return;
    setCompleted(new Set());
    setExpanded(null);
    setScreen('results');
  }

  function handleStartOver() {
    setScreen('intake');
    setTier(null);
    setHasAI(null);
    setHasVendor(null);
    setCompleted(new Set());
    setExpanded(null);
  }

  function toggleComplete(id: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleExpand(id: number) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  // Group sections by phase
  const sectionsByPhase = useMemo(() => {
    const grouped: Record<string, PathwaySection[]> = {};
    for (const phase of PHASES) {
      grouped[phase.key] = filteredSections.filter((s) => s.phase === phase.key);
    }
    return grouped;
  }, [filteredSections]);

  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        {screen === 'intake' ? (
          <motion.div
            key="intake"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <IntakeScreen
              tier={tier}
              setTier={setTier}
              hasAI={hasAI}
              setHasAI={setHasAI}
              hasVendor={hasVendor}
              setHasVendor={setHasVendor}
              canBuild={canBuild}
              onBuild={handleBuild}
            />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen
              sections={filteredSections}
              sectionsByPhase={sectionsByPhase}
              completed={completed}
              expanded={expanded}
              progress={progress}
              timeline={timeline}
              onToggleComplete={toggleComplete}
              onToggleExpand={toggleExpand}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Intake Screen ───────────────────────────────────────────────

function IntakeScreen({
  tier,
  setTier,
  hasAI,
  setHasAI,
  hasVendor,
  setHasVendor,
  canBuild,
  onBuild,
}: {
  tier: number | null;
  setTier: (t: number) => void;
  hasAI: boolean | null;
  setHasAI: (v: boolean) => void;
  hasVendor: boolean | null;
  setHasVendor: (v: boolean) => void;
  canBuild: boolean;
  onBuild: () => void;
}) {
  return (
    <div className="space-y-12">
      {/* Question 1: Risk Tier */}
      <div>
        <h3 className="mb-2 text-lg font-bold text-white">
          What&apos;s the governance tier for this initiative?
        </h3>
        <p className="mb-6 text-sm text-slate-400">
          Higher tiers require more governance rigor and include additional PULSE steps.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {TIER_INFO.map((t) => (
            <motion.button
              key={t.tier}
              onClick={() => setTier(t.tier)}
              className={`relative cursor-pointer rounded-2xl border p-6 text-left backdrop-blur-xl transition-colors ${
                tier === t.tier
                  ? 'border-steel/60 bg-steel/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tier === t.tier && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  layoutId="tier-glow"
                  style={{ boxShadow: '0 0 30px rgba(74, 144, 226, 0.15)' }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative">
                <div className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-steel">
                  Tier {t.tier}
                </div>
                <div className="mb-2 text-sm font-semibold text-white">
                  {t.label.split(' — ')[1]}
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  {t.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Question 2: AI Involvement */}
      <div>
        <h3 className="mb-2 text-lg font-bold text-white">
          Does this initiative involve AI or machine learning?
        </h3>
        <p className="mb-6 text-sm text-slate-400">
          AI initiatives require additional governance, data readiness, and monitoring steps.
        </p>
        <div className="flex gap-4">
          <ToggleCard
            label="Yes"
            description="Adds AI screening, data readiness, impact assessment, and drift monitoring"
            selected={hasAI === true}
            onClick={() => setHasAI(true)}
            accentColor="#A855F7"
          />
          <ToggleCard
            label="No"
            description="Standard PULSE pathway without AI-specific steps"
            selected={hasAI === false}
            onClick={() => setHasAI(false)}
          />
        </div>
      </div>

      {/* Question 3: Vendor Involvement */}
      <div>
        <h3 className="mb-2 text-lg font-bold text-white">
          Will this involve a vendor or external product?
        </h3>
        <p className="mb-6 text-sm text-slate-400">
          Vendor involvement adds landscape scanning, selection, and contracting steps.
        </p>
        <div className="flex gap-4">
          <ToggleCard
            label="Yes"
            description="Adds vendor landscape scan, selection criteria, and contracting"
            selected={hasVendor === true}
            onClick={() => setHasVendor(true)}
            accentColor="#F59E0B"
          />
          <ToggleCard
            label="No"
            description="Internal build or process-only changes"
            selected={hasVendor === false}
            onClick={() => setHasVendor(false)}
          />
        </div>
      </div>

      {/* Build CTA */}
      <motion.div
        className="flex justify-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: canBuild ? 1 : 0.4 }}
      >
        <Button
          variant="spring"
          onClick={onBuild}
          disabled={!canBuild}
          className={!canBuild ? 'cursor-not-allowed opacity-50' : ''}
        >
          Build My Pathway <ArrowIcon />
        </Button>
      </motion.div>
    </div>
  );
}

function ToggleCard({
  label,
  description,
  selected,
  onClick,
  accentColor,
}: {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  accentColor?: string;
}) {
  const borderColor = selected
    ? accentColor
      ? `${accentColor}60`
      : 'rgba(74, 144, 226, 0.6)'
    : undefined;
  const bgColor = selected
    ? accentColor
      ? `${accentColor}10`
      : 'rgba(74, 144, 226, 0.1)'
    : undefined;

  return (
    <motion.button
      onClick={onClick}
      className={`flex-1 cursor-pointer rounded-2xl border p-5 text-left backdrop-blur-xl transition-colors ${
        selected
          ? 'border-steel/60 bg-steel/10'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
      style={
        selected && accentColor
          ? { borderColor, backgroundColor: bgColor }
          : undefined
      }
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-1 text-base font-bold text-white">{label}</div>
      <p className="text-xs leading-relaxed text-slate-400">{description}</p>
    </motion.button>
  );
}

// ─── Results Screen ──────────────────────────────────────────────

function ResultsScreen({
  sections,
  sectionsByPhase,
  completed,
  expanded,
  progress,
  timeline,
  onToggleComplete,
  onToggleExpand,
  onStartOver,
}: {
  sections: PathwaySection[];
  sectionsByPhase: Record<string, PathwaySection[]>;
  completed: Set<number>;
  expanded: number | null;
  progress: number;
  timeline: string;
  onToggleComplete: (id: number) => void;
  onToggleExpand: (id: number) => void;
  onStartOver: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Your PULSE Pathway</h3>
            <p className="mt-1 text-sm text-slate-400">
              {sections.length} steps &middot; Est. {timeline}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progress}%</div>
            <div className="text-xs text-slate-500">
              {completed.size}/{sections.length} complete
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-steel to-steel-dim"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              boxShadow: progress > 0 ? '0 0 12px rgba(74, 144, 226, 0.4)' : undefined,
            }}
          />
        </div>
      </div>

      {/* Phase Groups */}
      {PHASES.map((phase) => {
        const phaseSections = sectionsByPhase[phase.key];
        if (!phaseSections || phaseSections.length === 0) return null;

        const phaseCompleted = phaseSections.filter((s) => completed.has(s.id)).length;

        return (
          <div key={phase.key}>
            {/* Phase Header */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black"
                style={{
                  color: phase.color,
                  backgroundColor: `${phase.color}15`,
                }}
              >
                {phase.key}
              </div>
              <div>
                <h4 className="font-bold text-white">{phase.label}</h4>
                <span className="text-xs text-slate-500">
                  {phaseCompleted}/{phaseSections.length} complete
                </span>
              </div>
              {/* Phase connecting line */}
              <div
                className="ml-2 flex-1 border-t"
                style={{ borderColor: `${phase.color}20` }}
              />
            </div>

            {/* Section Cards */}
            <div className="space-y-3 pl-2">
              {phaseSections.map((section, i) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  isCompleted={completed.has(section.id)}
                  isExpanded={expanded === section.id}
                  phaseColor={phase.color}
                  onToggleComplete={() => onToggleComplete(section.id)}
                  onToggleExpand={() => onToggleExpand(section.id)}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Start Over */}
      <div className="flex justify-center pt-4">
        <Button variant="ghost" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
}

// ─── Section Card ────────────────────────────────────────────────

function SectionCard({
  section,
  isCompleted,
  isExpanded,
  phaseColor,
  onToggleComplete,
  onToggleExpand,
  delay,
}: {
  section: PathwaySection;
  isCompleted: boolean;
  isExpanded: boolean;
  phaseColor: string;
  onToggleComplete: () => void;
  onToggleExpand: () => void;
  delay: number;
}) {
  const typeStyle = TYPE_STYLES[section.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className={`rounded-xl border backdrop-blur-xl transition-colors ${
        isCompleted
          ? 'border-steel/30 bg-steel/5'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {/* Card Header */}
      <div
        className="flex cursor-pointer items-center gap-3 p-4"
        onClick={onToggleExpand}
      >
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all ${
            isCompleted
              ? 'border-steel bg-steel shadow-[0_0_8px_rgba(74,144,226,0.3)]'
              : 'border-slate-600 bg-transparent hover:border-slate-400'
          }`}
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          )}
        </button>

        {/* Section Name */}
        <span
          className={`flex-1 text-sm font-medium transition-colors ${
            isCompleted ? 'text-slate-500 line-through' : 'text-white'
          }`}
        >
          {section.name}
        </span>

        {/* Type Badge */}
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: typeStyle.color,
            backgroundColor: `${typeStyle.color}15`,
          }}
        >
          {typeStyle.label}
        </span>

        {/* Expand Arrow */}
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="flex-shrink-0 text-slate-500"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </div>

      {/* Expandable Detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-4 pb-4 pt-3">
              {/* What */}
              <p className="text-sm leading-relaxed text-slate-300">
                {section.what}
              </p>

              {/* Done Definition */}
              <div
                className="mt-3 rounded-lg border p-3"
                style={{
                  borderColor: `${phaseColor}20`,
                  backgroundColor: `${phaseColor}05`,
                }}
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Definition of Done
                </span>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {section.done}
                </p>
              </div>

              {/* Meta Row */}
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {section.time}
                </span>
                <span className="font-mono">
                  Tab: {section.tab}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
