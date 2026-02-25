'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { methodologySections, methodologyMeta } from '@/lib/methodology-content';

interface MethodologyModalProps {
  onClose: () => void;
}

const phaseColors: Record<string, string> = {
  P: '#4A90E2',
  U: '#4A90E2',
  L: '#4A90E2',
  S: '#E67E22',
  E: '#4A90E2',
};

export default function MethodologyModal({ onClose }: MethodologyModalProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`methodology-${id}`);
    if (el && contentRef.current) {
      const container = contentRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: elTop - 16, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-white/10 px-8 pt-8 pb-6">
            {/* Close */}
            <button
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-steel">
              {methodologyMeta.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {methodologyMeta.title}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {methodologyMeta.subtitle}
            </p>

            {/* Table of Contents — scrollable pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {methodologySections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    activeSection === section.id
                      ? 'bg-steel/20 text-steel'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
                  }`}
                >
                  {section.number}. {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <div ref={contentRef} className="flex-1 overflow-y-auto px-8 py-6">
            <div className="space-y-10">
              {methodologySections.map((section) => (
                <div key={section.id} id={`methodology-${section.id}`}>
                  {/* Section Header */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-lg font-bold text-steel">
                      {section.number}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {section.title}
                    </h3>
                  </div>

                  {/* Section Content */}
                  <div className="mt-3 space-y-3">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed text-slate-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Guiding Principles (Section 4) */}
                  {section.principles && (
                    <ol className="mt-4 space-y-3">
                      {section.principles.map((principle, i) => {
                        const [title, ...rest] = principle.split('. ');
                        return (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="flex-shrink-0 font-mono font-bold text-steel">
                              {i + 1}
                            </span>
                            <span className="text-slate-300">
                              <strong className="text-white">{title}.</strong>{' '}
                              {rest.join('. ')}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  {/* Framework Structure Phases (Section 5) */}
                  {section.phases && (
                    <div className="mt-4 space-y-4">
                      {section.phases.map((phase) => (
                        <div
                          key={phase.letter}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="font-mono text-xl font-black"
                              style={{
                                color: phaseColors[phase.letter] || phase.color,
                                textShadow: `0 0 12px ${phaseColors[phase.letter] || phase.color}40`,
                              }}
                            >
                              {phase.letter}
                            </span>
                            <h4 className="text-base font-bold text-white">
                              {phase.title}
                            </h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-300">
                            {phase.description}
                          </p>
                          <div className="mt-3 space-y-1.5">
                            <p className="text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Key Activities:</span>{' '}
                              {phase.activities}
                            </p>
                            <p className="text-xs text-slate-400">
                              <span className="font-semibold text-burnt">Governance Checkpoint:</span>{' '}
                              {phase.checkpoint}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="mt-4 space-y-6">
                      {section.subsections.map((sub) => (
                        <div key={sub.id} className="pl-4 border-l-2 border-white/10">
                          <h4 className="text-sm font-bold text-slate-200">
                            {sub.title}
                          </h4>
                          <div className="mt-2 space-y-2">
                            {sub.content.map((paragraph, i) => (
                              <p key={i} className="text-sm leading-relaxed text-slate-400">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 border-t border-white/10 pt-6 text-center">
              <p className="text-xs text-slate-500">
                {methodologyMeta.copyright}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
