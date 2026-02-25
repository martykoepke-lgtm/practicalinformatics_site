'use client';

import { motion } from 'framer-motion';
import { hero, stats, links } from '@/lib/content';
import Button, { ArrowIcon } from '@/components/ui/Button';

interface HeroProps {
  onOpenMethodology?: () => void;
}

export default function Hero({ onOpenMethodology }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* PULSE Line Animation */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-20">
        <svg
          viewBox="0 0 1200 100"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 L200,50 L250,20 L280,80 L310,30 L340,70 L370,50 L500,50 L550,25 L580,75 L610,35 L640,65 L670,50 L900,50 L950,20 L980,80 L1010,30 L1040,70 L1070,50 L1200,50"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.path
            d="M0,50 L200,50 L250,20 L280,80 L310,30 L340,70 L370,50 L500,50 L550,25 L580,75 L610,35 L640,65 L670,50 L900,50 L950,20 L980,80 L1010,30 L1040,70 L1070,50 L1200,50"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="4"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Eyebrow */}
        <motion.p
          className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-steel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {hero.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button onClick={onOpenMethodology} variant="shimmer">
            Read the PULSE Methodology <ArrowIcon />
          </Button>
          <Button href="/pulse" variant="spring">
            Find Where AI Fits <ArrowIcon />
          </Button>
          <Button href={links.webApp} variant="primary">
            Get the Web App — $197 <ArrowIcon />
          </Button>
          <Button href="#consulting" variant="ghost">
            Work With Me <ArrowIcon />
          </Button>
        </motion.div>

        {/* Stat Bar */}
        <motion.div
          className="flex items-center justify-center gap-8 border-t border-white/10 pt-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold text-white md:text-2xl">
                {stat.number}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
