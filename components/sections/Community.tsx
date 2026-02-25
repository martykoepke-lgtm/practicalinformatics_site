'use client';

import { motion } from 'framer-motion';
import { community, links } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';
import ComingSoonBadge from '@/components/ui/ComingSoonBadge';
import GlassCard from '@/components/ui/GlassCard';
import Button, { ArrowIcon } from '@/components/ui/Button';

export default function Community() {
  return (
    <SectionWrapper id="community">
      <div className="opacity-85">
        <SectionEyebrow>{community.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          {community.headline} <ComingSoonBadge />
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate-400 md:text-lg">
          {community.intro}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {/* What you'll learn */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-bold text-white">What you&apos;ll learn:</h3>
            <ul className="mt-4 space-y-3">
              {community.learnItems.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="mt-1 text-steel">→</span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-slate-400">
              <strong className="text-slate-300">Who it&apos;s for:</strong>{' '}
              {community.audience}
            </p>

            <div className="mt-6">
              <Button href={links.community} variant="ghost" className="opacity-70">
                Join From Curious to Capable <ArrowIcon />
              </Button>
            </div>
          </div>

          {/* Accelerator Callout */}
          <div className="md:col-span-2">
            <GlassCard className="p-6" glowColor="#E67E22">
              <h3 className="text-lg font-bold text-white">
                {community.accelerator.title}
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                {community.accelerator.description}
              </p>
              <p className="mt-4 text-2xl font-bold text-burnt">
                {community.accelerator.price}
              </p>
              <div className="mt-4">
                <Button href={links.accelerator} variant="spring">
                  Learn More <ArrowIcon />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
