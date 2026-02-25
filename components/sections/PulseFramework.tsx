'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pulsePhases } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';

export default function PulseFramework() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPhase = pulsePhases.find((p) => p.id === selectedId);

  return (
    <SectionWrapper id="method">
      <SectionEyebrow>The PULSE Framework</SectionEyebrow>
      <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
        The PATH to AI Readiness.
      </h2>
      <p className="mt-4 max-w-2xl text-base text-slate-400 md:text-lg">
        PULSE is a structured methodology for technology implementation that
        starts with observation, not assumptions. Five phases. One principle:
        understand what&apos;s actually happening before deciding what to build.
      </p>

      {/* Circuit Layout */}
      <div className="relative mt-16">
        {/* Connecting Line */}
        <div className="absolute top-8 right-8 left-8 hidden h-px bg-gradient-to-r from-steel/30 via-burnt/30 to-steel/30 md:block" />

        {/* Phase Nodes */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {pulsePhases.map((phase) => (
            <motion.div
              key={phase.id}
              layoutId={phase.id}
              className="group relative flex cursor-pointer flex-col items-center"
              onClick={() => setSelectedId(phase.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-2xl font-black transition-colors"
                style={{
                  borderColor: phase.color,
                  color: phase.color,
                  backgroundColor: `${phase.color}10`,
                }}
                whileHover={{
                  boxShadow: `0 0 30px ${phase.color}40`,
                }}
              >
                {phase.letter}
              </motion.div>
              <span className="mt-2 text-sm font-medium text-slate-400 transition-colors group-hover:text-white">
                {phase.title}
              </span>
              <span className="mt-0.5 hidden text-xs text-slate-600 md:block">
                {phase.subtitle}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selectedId && selectedPhase && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div
                layoutId={selectedId}
                className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-slate-900/90 p-8 backdrop-blur-xl"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Close Button */}
                <button
                  className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-white"
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Phase Letter + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-black"
                    style={{
                      color: selectedPhase.color,
                      backgroundColor: `${selectedPhase.color}15`,
                    }}
                  >
                    {selectedPhase.letter}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedPhase.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {selectedPhase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 leading-relaxed text-slate-300">
                  {selectedPhase.description}
                </p>

                {/* Governance Checkpoint */}
                <div className="scanline relative mt-6 rounded-lg border border-burnt/30 bg-slate-950/60 p-4">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-burnt"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-burnt">
                        Governance Checkpoint
                      </span>
                      <p className="mt-1 font-mono text-sm text-slate-300">
                        {selectedPhase.checkpoint}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Closing Line */}
      <p className="mt-12 text-center text-base italic text-slate-400">
        One framework. Five phases. Every technology decision starts here.
      </p>

      {/* Pathway Builder CTA */}
      <div className="mt-6 text-center">
        <a
          href="/pulse"
          className="inline-flex items-center gap-2 text-sm font-medium text-steel transition-colors hover:text-white"
        >
          Build your personalized PULSE pathway
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </SectionWrapper>
  );
}
