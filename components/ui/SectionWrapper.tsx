'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  showDivider?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  showDivider = true,
}: SectionWrapperProps) {
  return (
    <>
      <section
        id={id}
        className={`relative px-6 py-20 md:px-12 lg:px-16 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-6xl"
        >
          {children}
        </motion.div>
      </section>
      {showDivider && <div className="glow-divider" />}
    </>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-steel">
      {children}
    </span>
  );
}
