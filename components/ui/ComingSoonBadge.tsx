'use client';

import { motion } from 'framer-motion';

export default function ComingSoonBadge() {
  return (
    <motion.span
      className="ml-2 inline-block rounded-full bg-steel/20 px-3 py-0.5 align-middle font-mono text-[0.65rem] font-bold uppercase tracking-wider text-steel"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      Coming Soon
    </motion.span>
  );
}
