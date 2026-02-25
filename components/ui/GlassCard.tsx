'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  glowColor,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={
        glowColor
          ? {
              borderColor: 'rgba(255,255,255,0.2)',
              boxShadow: `0 0 40px ${glowColor}15, 0 20px 60px ${glowColor}10`,
            }
          : { borderColor: 'rgba(255,255,255,0.15)' }
      }
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
