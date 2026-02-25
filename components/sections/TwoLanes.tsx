'use client';

import { twoLanes } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';

export default function TwoLanes() {
  return (
    <SectionWrapper>
      <div className="text-center">
        <SectionEyebrow>{twoLanes.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          {twoLanes.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
          {twoLanes.subtitle}
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-2">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-1/2 hidden h-px w-8 -translate-x-1/2 bg-gradient-to-r from-steel/30 to-burnt/30 md:block" />

        {twoLanes.lanes.map((lane) => (
          <GlassCard
            key={lane.id}
            className="p-8"
            glowColor={lane.accentColor}
          >
            <h3 className="text-xl font-bold text-white">{lane.title}</h3>
            <p className="mt-4 text-slate-300">{lane.description}</p>
            <p className="mt-4 text-sm italic text-slate-500">{lane.audience}</p>
            <a
              href={lane.cta.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-[gap] hover:gap-3"
              style={{ color: lane.accentColor }}
            >
              {lane.cta.label}
              <span>→</span>
            </a>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
