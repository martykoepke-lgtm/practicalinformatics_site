'use client';

import { motion } from 'framer-motion';
import { startHere, links } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';
import Button, { ArrowIcon } from '@/components/ui/Button';

interface StartHereProps {
  onOpenMethodology?: () => void;
}

export default function StartHere({ onOpenMethodology }: StartHereProps) {
  return (
    <SectionWrapper id="toolkit">
      <div className="text-center">
        <SectionEyebrow>{startHere.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          {startHere.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
          {startHere.subtitle}
        </p>
      </div>

      {/* Methodology Guide */}
      <motion.div
        className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white">{startHere.methodology.title}</h3>
        <p className="mt-3 text-slate-300">{startHere.methodology.description}</p>
        <div className="mt-6">
          <Button onClick={onOpenMethodology} variant="shimmer">
            Read the Methodology <ArrowIcon />
          </Button>
        </div>
        <p className="mt-3 text-xs italic text-slate-500">{startHere.methodology.note}</p>
      </motion.div>

      {/* AI Fit Diagnostic CTA */}
      <motion.div
        className="mx-auto mt-8 max-w-2xl rounded-2xl border border-burnt/20 bg-burnt/5 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-white">AI Fit Diagnostic</h3>
        <p className="mt-3 text-slate-300">
          Not sure where AI fits? This free diagnostic walks you through your pain
          points and tells you which ones are real AI candidates — and which ones need
          a people or process fix first. Then it builds your personalized PULSE pathway.
        </p>
        <div className="mt-6">
          <Button href="/pulse" variant="spring">
            Find Where AI Fits <ArrowIcon />
          </Button>
        </div>
        <p className="mt-3 text-xs italic text-slate-500">Free. Takes 5 minutes.</p>
      </motion.div>

      {/* PULSE Web App — $197 */}
      <motion.div
        className="mx-auto mt-8 max-w-2xl rounded-2xl border border-steel/20 bg-steel/5 p-8 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{startHere.webApp.title}</h3>
            <p className="mt-1 text-sm font-medium text-steel">
              {startHere.webApp.tagline}
            </p>
          </div>
          <div className="shrink-0 rounded-lg border border-steel/30 bg-steel/10 px-3 py-1.5 text-center">
            <span className="text-lg font-black text-white">{startHere.webApp.price}</span>
            <p className="text-[10px] text-slate-400">{startHere.webApp.priceNote}</p>
          </div>
        </div>

        <p className="mt-4 text-slate-300">{startHere.webApp.description}</p>

        {/* Feature highlights */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {startHere.webApp.features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <h4 className="text-sm font-bold text-white">{feature.title}</h4>
              <p className="mt-1 text-xs text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Core insight callout */}
        <div className="mt-6 rounded-lg border border-burnt/20 bg-burnt/5 px-4 py-3">
          <p className="text-sm italic text-slate-300">
            {startHere.webApp.coreInsight}
          </p>
        </div>

        <div className="mt-6">
          <Button href={links.webApp} variant="spring">
            Get the PULSE Web App <ArrowIcon />
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
