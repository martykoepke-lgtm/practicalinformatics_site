'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'shimmer' | 'spring' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const baseClasses =
  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-steel text-white hover:bg-steel-dim shadow-[0_4px_15px_rgba(74,144,226,0.3)]',
  shimmer:
    'relative border border-white/20 text-white bg-transparent hover:bg-white/5',
  spring:
    'bg-burnt text-white hover:bg-burnt-dim shadow-[0_4px_15px_rgba(230,126,34,0.3)]',
  ghost:
    'border border-white/10 text-slate-300 bg-transparent hover:bg-white/5 hover:border-white/20',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionProps =
    variant === 'spring'
      ? {
          whileHover: {
            scale: 1.05,
            boxShadow: '0 8px 30px rgba(230, 126, 34, 0.4)',
          },
          whileTap: { scale: 0.98 },
          transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
        }
      : variant === 'shimmer'
        ? {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
          }
        : {
            whileHover: { scale: 1.02, y: -1 },
            whileTap: { scale: 0.98 },
          };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {variant === 'shimmer' && (
          <span className="absolute inset-0 rounded-xl overflow-hidden">
            <span className="absolute inset-0 rounded-xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_0%,rgba(74,144,226,0.3)_10%,transparent_20%)] animate-[shimmer-rotate_3s_linear_infinite]" />
          </span>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {variant === 'shimmer' && (
        <span className="absolute inset-0 rounded-xl overflow-hidden">
          <span className="absolute inset-0 rounded-xl bg-[conic-gradient(from_var(--shimmer-angle,0deg),transparent_0%,rgba(74,144,226,0.3)_10%,transparent_20%)] animate-[shimmer-rotate_3s_linear_infinite]" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
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
  );
}

export function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
