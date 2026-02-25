'use client';

import { useState } from 'react';
import { projects } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import WorkModal from '@/components/modals/WorkModal';

export default function WhatIBuilt() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const project = projects.find((p) => p.id === selectedProject);

  return (
    <SectionWrapper id="work">
      <div className="text-center">
        <SectionEyebrow>What I&apos;ve Built</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          The framework in practice.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          I don&apos;t just teach the PULSE Framework — I use it. These are
          applications I built by observing real problems, defining what needed to
          exist, and directing AI to build it.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <GlassCard
            key={p.id}
            className="p-6"
            glowColor="#4A90E2"
            onClick={() => setSelectedProject(p.id)}
          >
            <h3 className="text-lg font-bold text-white">{p.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{p.subtitle}</p>
            <p className="mt-3 text-sm text-slate-300">{p.cardDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel">
              {p.demoUrl ? 'View Demo' : 'View Details'} →
            </span>
          </GlassCard>
        ))}
      </div>

      {project && (
        <WorkModal
          project={project}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionWrapper>
  );
}
