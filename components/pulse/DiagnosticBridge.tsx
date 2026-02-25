'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TIER_INFO } from '@/lib/pathway-data';
import { mapToBridgeRecommendation, BUCKET_CONFIG, type PainPoint } from '@/lib/diagnostic-data';
import Button, { ArrowIcon } from '@/components/ui/Button';

interface DiagnosticBridgeProps {
  painPoints: PainPoint[];
  onComplete: (result: { tier: number; hasAI: boolean; hasVendor: boolean }) => void;
}

export default function DiagnosticBridge({ painPoints, onComplete }: DiagnosticBridgeProps) {
  const recommendation = useMemo(() => mapToBridgeRecommendation(painPoints), [painPoints]);

  const [tier, setTier] = useState<number>(recommendation.suggestedTier);
  const [hasVendor, setHasVendor] = useState<boolean | null>(null);

  const canProceed = hasVendor !== null;

  // Count by bucket
  const fixCount = painPoints.filter((p) => p.bucket === 'fix').length;
  const aiCount = painPoints.filter((p) => p.bucket === 'ai').length;
  const invCount = painPoints.filter((p) => p.bucket === 'investigate').length;

  return (
    <motion.div
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Your PULSE Recommendation</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Based on your diagnostic results, here&apos;s what we recommend for your
          PULSE Pathway. You can adjust the tier if needed.
        </p>

        {/* Results Summary */}
        <div className="mt-6 flex gap-4">
          {([
            { key: 'fix' as const, count: fixCount },
            { key: 'ai' as const, count: aiCount },
            { key: 'investigate' as const, count: invCount },
          ]).filter(({ count }) => count > 0).map(({ key, count }) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: BUCKET_CONFIG[key].color }}
              />
              <span className="text-xs text-slate-400">
                <span className="font-bold text-white">{count}</span> {BUCKET_CONFIG[key].label}
              </span>
            </div>
          ))}
        </div>

        {/* Reasoning */}
        <div className="mt-6 rounded-xl border border-steel/20 bg-steel/5 px-5 py-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel">
            Recommendation
          </span>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {recommendation.reasoning}
          </p>
        </div>

        {/* Tier Selection (pre-filled, overridable) */}
        <div className="mt-8">
          <h3 className="mb-2 text-sm font-bold text-white">
            Governance Tier
          </h3>
          <p className="mb-4 text-xs text-slate-400">
            Pre-selected based on your results. Change it if your situation requires a different level of governance.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {TIER_INFO.map((t) => (
              <motion.button
                key={t.tier}
                onClick={() => setTier(t.tier)}
                className={`relative cursor-pointer rounded-xl border p-4 text-left backdrop-blur-xl transition-colors ${
                  tier === t.tier
                    ? 'border-steel/60 bg-steel/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tier === t.tier && t.tier === recommendation.suggestedTier && (
                  <span className="absolute -top-2 right-3 rounded-full bg-steel/20 px-2 py-0.5 text-[10px] font-bold text-steel">
                    Recommended
                  </span>
                )}
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
                  Tier {t.tier}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {t.label.split(' — ')[1]}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Involvement (auto-determined) */}
        <div className="mt-8">
          <h3 className="mb-2 text-sm font-bold text-white">
            AI Involvement
          </h3>
          <div className={`rounded-xl border p-4 ${
            recommendation.hasAI
              ? 'border-purple-500/30 bg-purple-500/5'
              : 'border-white/10 bg-white/[0.03]'
          }`}>
            <span className="text-sm font-semibold text-white">
              {recommendation.hasAI ? 'Yes — AI components detected' : 'No — no AI components detected'}
            </span>
            <p className="mt-1 text-xs text-slate-400">
              {recommendation.hasAI
                ? 'Your diagnostic results include AI candidates. Additional governance steps for AI screening, data readiness, and monitoring will be included.'
                : 'No items scored as AI candidates. Your pathway will focus on people and process improvements.'}
            </p>
          </div>
        </div>

        {/* Vendor Question */}
        <div className="mt-8">
          <h3 className="mb-2 text-sm font-bold text-white">
            Will this involve a vendor or external product?
          </h3>
          <p className="mb-4 text-xs text-slate-400">
            Vendor involvement adds landscape scanning, selection, and contracting steps.
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Yes', value: true, description: 'Adds vendor evaluation and contracting steps' },
              { label: 'No', value: false, description: 'Internal build or process-only changes' },
            ].map((opt) => (
              <motion.button
                key={opt.label}
                onClick={() => setHasVendor(opt.value)}
                className={`flex-1 cursor-pointer rounded-xl border p-4 text-left backdrop-blur-xl transition-colors ${
                  hasVendor === opt.value
                    ? opt.value
                      ? 'border-amber-500/60 bg-amber-500/10'
                      : 'border-steel/60 bg-steel/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-sm font-bold text-white">{opt.label}</div>
                <p className="mt-1 text-xs text-slate-400">{opt.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          animate={{ opacity: canProceed ? 1 : 0.4 }}
        >
          <Button
            variant="spring"
            onClick={() => onComplete({ tier, hasAI: recommendation.hasAI, hasVendor: hasVendor! })}
            disabled={!canProceed}
            className={!canProceed ? 'cursor-not-allowed opacity-50' : ''}
          >
            Generate My Pathway <ArrowIcon />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
