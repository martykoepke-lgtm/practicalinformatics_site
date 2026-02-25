'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CursorGlow from '@/components/ui/CursorGlow';
import EmailGate from '@/components/pulse/EmailGate';
import AIDiagnostic from '@/components/pulse/AIDiagnostic';
import DiagnosticBridge from '@/components/pulse/DiagnosticBridge';
import PathwayBuilder from '@/components/pulse/PathwayBuilder';
import type { PainPoint } from '@/lib/diagnostic-data';

type Screen = 'gate' | 'diagnostic' | 'bridge' | 'pathway';

const screenConfig: Record<Screen, { eyebrow: string; headline: string; subtitle: string }> = {
  gate: {
    eyebrow: 'AI Fit Diagnostic',
    headline: 'Where Does AI Actually Fit?',
    subtitle: 'Not every problem needs AI. This diagnostic helps you figure out which pain points are real AI candidates — and which ones need a people or process fix first.',
  },
  diagnostic: {
    eyebrow: 'AI Fit Diagnostic',
    headline: 'Where Does AI Actually Fit?',
    subtitle: 'Identify your pain points, answer a few questions about each one, and get a clear recommendation.',
  },
  bridge: {
    eyebrow: 'Your Results',
    headline: 'Build Your PULSE Pathway',
    subtitle: 'Based on your diagnostic results, we\'ll generate a personalized implementation checklist scaled to your initiative.',
  },
  pathway: {
    eyebrow: 'PULSE Pathway Builder',
    headline: 'Your Personalized Pathway',
    subtitle: 'A step-by-step checklist of PULSE Framework steps tailored to your initiative.',
  },
};

const STEPS: { key: Screen; label: string }[] = [
  { key: 'gate', label: 'Start' },
  { key: 'diagnostic', label: 'Diagnose' },
  { key: 'bridge', label: 'Configure' },
  { key: 'pathway', label: 'Pathway' },
];

export default function PulsePage() {
  const [screen, setScreen] = useState<Screen>('gate');
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [bridgeResult, setBridgeResult] = useState<{
    tier: number;
    hasAI: boolean;
    hasVendor: boolean;
  } | null>(null);

  // Check localStorage for returning users
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('pulse_access')) {
      setScreen('diagnostic');
    }
  }, []);

  const currentConfig = screenConfig[screen];
  const currentStepIndex = STEPS.findIndex((s) => s.key === screen);

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        {/* Mini Hero — updates per screen */}
        <section className="relative px-6 pt-32 pb-8 text-center md:px-12">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-steel">
              {currentConfig.eyebrow}
            </span>
            <h1 className="mt-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-5xl">
              {currentConfig.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
              {currentConfig.subtitle}
            </p>

            {/* Step Indicator */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {STEPS.map((step, i) => (
                <div key={step.key} className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                      i < currentStepIndex
                        ? 'bg-steel text-white'
                        : i === currentStepIndex
                          ? 'border border-steel/60 bg-steel/20 text-steel'
                          : 'border border-white/10 bg-white/5 text-slate-600'
                    }`}
                  >
                    {i < currentStepIndex ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-px w-6 transition-colors ${
                        i < currentStepIndex ? 'bg-steel/40' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <a
              href="/"
              className="mt-4 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-steel"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to home
            </a>
          </div>
        </section>

        <div className="glow-divider" />

        {/* Content Area */}
        <section className="relative px-6 py-16 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            {screen === 'gate' && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EmailGate onComplete={() => setScreen('diagnostic')} />
              </motion.div>
            )}

            {screen === 'diagnostic' && (
              <motion.div
                key="diagnostic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AIDiagnostic
                  onComplete={(scored) => {
                    setPainPoints(scored);
                    setScreen('bridge');
                  }}
                />
              </motion.div>
            )}

            {screen === 'bridge' && (
              <motion.div
                key="bridge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DiagnosticBridge
                  painPoints={painPoints}
                  onComplete={(result) => {
                    setBridgeResult(result);
                    setScreen('pathway');
                  }}
                />
              </motion.div>
            )}

            {screen === 'pathway' && bridgeResult && (
              <motion.div
                key="pathway"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PathwayBuilder
                  initialTier={bridgeResult.tier}
                  initialHasAI={bridgeResult.hasAI}
                  initialHasVendor={bridgeResult.hasVendor}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <div className="glow-divider" />
      </main>
      <Footer />
    </>
  );
}
