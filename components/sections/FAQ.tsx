'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq">
      <div className="text-center">
        <SectionEyebrow>Common Questions</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Frequently Asked
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-xl border transition-colors ${
                isOpen
                  ? 'border-steel/30 bg-white/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <h3 className="pr-4 text-base font-semibold text-white">
                  {item.question}
                </h3>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 text-slate-500"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 px-5 pb-5 pt-4">
                      <p className="leading-relaxed text-slate-300">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
