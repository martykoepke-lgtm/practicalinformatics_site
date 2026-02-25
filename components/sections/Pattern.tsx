'use client';

import { motion } from 'framer-motion';
import { pattern } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';

export default function Pattern() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>{pattern.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          {pattern.headline}
        </h2>

        <div className="mt-8 space-y-6">
          {pattern.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="text-base leading-relaxed text-slate-300 md:text-lg"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.blockquote
          className="my-10 border-l-4 border-steel py-2 pl-6 text-xl font-medium leading-snug text-white shadow-[inset_0_0_30px_rgba(74,144,226,0.05)] md:text-2xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {pattern.pullquote}
        </motion.blockquote>

        <motion.p
          className="text-lg font-semibold text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {pattern.closing}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
