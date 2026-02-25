'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  diagnosticQuestions,
  scorePainPoint,
  generateInsights,
  getActionRecommendation,
  BUCKET_CONFIG,
  type PainPoint,
} from '@/lib/diagnostic-data';
import Button, { ArrowIcon } from '@/components/ui/Button';

type DiagnosticScreen = 'identify' | 'assess' | 'results';

interface AIDiagnosticProps {
  onComplete: (painPoints: PainPoint[]) => void;
}

export default function AIDiagnostic({ onComplete }: AIDiagnosticProps) {
  const [screen, setScreen] = useState<DiagnosticScreen>('identify');
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIdentifyComplete = useCallback((points: PainPoint[]) => {
    setPainPoints(points);
    setCurrentIndex(0);
    setScreen('assess');
  }, []);

  const handleAssessComplete = useCallback((scored: PainPoint[]) => {
    setPainPoints(scored);
    setScreen('results');
  }, []);

  return (
    <AnimatePresence mode="wait">
      {screen === 'identify' && (
        <motion.div
          key="identify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <IdentifyScreen onNext={handleIdentifyComplete} />
        </motion.div>
      )}

      {screen === 'assess' && (
        <motion.div
          key="assess"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <AssessScreen
            painPoints={painPoints}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onComplete={handleAssessComplete}
          />
        </motion.div>
      )}

      {screen === 'results' && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <ResultsScreen painPoints={painPoints} onNext={() => onComplete(painPoints)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Screen 1: Identify Pain Points ────────────────────────────

function IdentifyScreen({ onNext }: { onNext: (points: PainPoint[]) => void }) {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  function addItem() {
    const text = input.trim();
    if (!text || items.length >= 10) return;
    setItems([...items, text]);
    setInput('');
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function handleNext() {
    const points: PainPoint[] = items.map((text, i) => ({
      id: `pp-${i}`,
      text,
      scores: { fix: 0, ai: 0, inv: 0 },
      tags: [],
      answers: {},
      bucket: null,
    }));
    onNext(points);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">What&apos;s causing friction?</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          List the pain points, bottlenecks, or problems you&apos;re considering solving
          with technology. We&apos;ll assess each one to determine if it&apos;s a real AI
          candidate or a people/process fix.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Add 2&ndash;5 items for the best results.
        </p>

        {/* Privacy Notice */}
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
          <svg className="mt-0.5 flex-shrink-0 text-slate-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Everything you enter here stays in your browser only. Nothing is saved to a
            server or database. When you close or refresh this page, it&apos;s gone.
          </p>
        </div>

        {/* Input */}
        <div className="mt-6 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
              }
            }}
            placeholder="e.g., Nurses spend 20 minutes per shift on duplicate charting"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors focus:border-steel/50 focus:bg-white/[0.07]"
            maxLength={200}
          />
          <motion.button
            onClick={addItem}
            disabled={!input.trim() || items.length >= 10}
            className="cursor-pointer rounded-xl bg-steel px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-steel-dim disabled:cursor-not-allowed disabled:opacity-40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add
          </motion.button>
        </div>

        {/* Pain Point List */}
        <div className="mt-6 space-y-2">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-steel/20 text-xs font-bold text-steel">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-slate-300">{item}</span>
                <button
                  onClick={() => removeItem(i)}
                  className="cursor-pointer text-slate-600 transition-colors hover:text-red-400"
                  aria-label={`Remove ${item}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <p className="mt-6 text-center text-sm text-slate-600">
            No items yet. Add at least one pain point to continue.
          </p>
        )}

        {/* Next */}
        {items.length > 0 && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button variant="spring" onClick={handleNext}>
              Next: Assess These <ArrowIcon />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 2: Assess Each Pain Point ──────────────────────────

function AssessScreen({
  painPoints,
  currentIndex,
  setCurrentIndex,
  onComplete,
}: {
  painPoints: PainPoint[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  onComplete: (scored: PainPoint[]) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>[]>(
    painPoints.map(() => ({}))
  );

  const current = painPoints[currentIndex];
  const currentAnswers = answers[currentIndex] || {};
  const allAnswered = diagnosticQuestions.every(
    (q) => currentAnswers[q.id] !== undefined
  );

  function selectOption(questionId: string, optionIndex: number) {
    const updated = [...answers];
    updated[currentIndex] = { ...currentAnswers, [questionId]: optionIndex };
    setAnswers(updated);
  }

  function advanceOrFinish() {
    if (currentIndex < painPoints.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Score all pain points and complete
      const scored = painPoints.map((pp, i) => {
        const result = scorePainPoint(answers[i]);
        return {
          ...pp,
          scores: { fix: result.fix, ai: result.ai, inv: result.inv },
          tags: result.tags,
          answers: answers[i],
          bucket: result.bucket,
        };
      });
      onComplete(scored);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Assessing <span className="font-bold text-white">{currentIndex + 1}</span> of{' '}
          {painPoints.length}
        </span>
        <div className="flex gap-1">
          {painPoints.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i < currentIndex
                  ? 'bg-steel'
                  : i === currentIndex
                    ? 'bg-steel/60'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Current Pain Point */}
        <div className="mb-8 rounded-xl border border-steel/20 bg-steel/5 px-5 py-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-steel">
            Pain Point {currentIndex + 1}
          </span>
          <p className="mt-1 text-base font-medium text-white">{current.text}</p>
        </div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {diagnosticQuestions.map((question) => (
              <div key={question.id}>
                <h4 className="mb-3 text-sm font-semibold text-white">
                  {question.label}
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {question.options.map((option, optIdx) => {
                    const isSelected = currentAnswers[question.id] === optIdx;
                    return (
                      <motion.button
                        key={optIdx}
                        onClick={() => selectOption(question.id, optIdx)}
                        className={`cursor-pointer rounded-xl border p-3 text-left text-sm transition-colors ${
                          isSelected
                            ? 'border-steel/60 bg-steel/10 text-white'
                            : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-300'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Advance */}
        <motion.div
          className="mt-8 flex justify-center"
          animate={{ opacity: allAnswered ? 1 : 0.4 }}
        >
          <Button
            variant="spring"
            onClick={advanceOrFinish}
            disabled={!allAnswered}
            className={!allAnswered ? 'cursor-not-allowed opacity-50' : ''}
          >
            {currentIndex < painPoints.length - 1 ? (
              <>Next Pain Point <ArrowIcon /></>
            ) : (
              <>See Results <ArrowIcon /></>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Screen 3: Results ─────────────────────────────────────────

function ResultsScreen({
  painPoints,
  onNext,
}: {
  painPoints: PainPoint[];
  onNext: () => void;
}) {
  const buckets = {
    fix: painPoints.filter((p) => p.bucket === 'fix'),
    ai: painPoints.filter((p) => p.bucket === 'ai'),
    investigate: painPoints.filter((p) => p.bucket === 'investigate'),
  };

  const insights = generateInsights(painPoints);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Your Results</h2>
        <p className="mt-3 text-sm text-slate-400">
          Here&apos;s where each pain point landed based on your answers.
        </p>
        <p className="mt-2 text-[11px] text-slate-600">
          These results exist only in your browser. Nothing has been saved or sent anywhere.
        </p>
      </div>

      {/* Bucket Columns */}
      <div className="grid gap-6 md:grid-cols-3">
        {(['fix', 'ai', 'investigate'] as const).map((bucketKey) => {
          const config = BUCKET_CONFIG[bucketKey];
          const items = buckets[bucketKey];

          return (
            <div key={bucketKey}>
              {/* Bucket Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <h3 className="text-sm font-bold text-white">{config.label}</h3>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      color: config.color,
                      backgroundColor: `${config.color}15`,
                    }}
                  >
                    {items.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{config.description}</p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {items.length === 0 && (
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center text-xs text-slate-600">
                    No items in this category
                  </div>
                )}
                {items.map((point, i) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
                  >
                    <p className="text-sm font-medium text-white">{point.text}</p>

                    {/* Score Bar */}
                    <div className="mt-3 flex gap-1">
                      {point.scores.fix > 0 && (
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: BUCKET_CONFIG.fix.color,
                            width: `${(point.scores.fix / (point.scores.fix + point.scores.ai + point.scores.inv)) * 100}%`,
                          }}
                        />
                      )}
                      {point.scores.ai > 0 && (
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: BUCKET_CONFIG.ai.color,
                            width: `${(point.scores.ai / (point.scores.fix + point.scores.ai + point.scores.inv)) * 100}%`,
                          }}
                        />
                      )}
                      {point.scores.inv > 0 && (
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: BUCKET_CONFIG.investigate.color,
                            width: `${(point.scores.inv / (point.scores.fix + point.scores.ai + point.scores.inv)) * 100}%`,
                          }}
                        />
                      )}
                    </div>

                    {/* Action */}
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">
                      {getActionRecommendation(point)}
                    </p>

                    {/* Tags */}
                    {point.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {point.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pattern Insights */}
      {insights.length > 0 && (
        <motion.div
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-steel">
            Pattern Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-burnt">→</span>
                <p className="text-sm leading-relaxed text-slate-300">{insight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next CTA */}
      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="spring" onClick={onNext}>
          Build Your PULSE Pathway <ArrowIcon />
        </Button>
      </motion.div>
    </div>
  );
}
