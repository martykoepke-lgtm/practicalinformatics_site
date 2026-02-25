'use client';

import { motion } from 'framer-motion';
import { footerCta, links } from '@/lib/content';
import Button, { ArrowIcon } from '@/components/ui/Button';

const pulseColors = ['#4A90E2', '#4A90E2', '#4A90E2', '#E67E22', '#4A90E2'];

interface FooterCTAProps {
  onOpenMethodology?: () => void;
}

export default function FooterCTA({ onOpenMethodology }: FooterCTAProps) {
  return (
    <section className="relative px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {footerCta.headline}
        </motion.h2>

        {/* PULSE Letters */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {['P', 'U', 'L', 'S', 'E'].map((letter, i) => (
            <motion.span
              key={letter}
              className="font-mono text-lg font-black"
              style={{
                color: pulseColors[i],
                textShadow: `0 0 20px ${pulseColors[i]}60`,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {letter}
              {i < 4 && (
                <span className="ml-3 text-slate-600">→</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Two-path CTA */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Organizations */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white">
              {footerCta.orgPath.title}
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              {footerCta.orgPath.description}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={onOpenMethodology} variant="shimmer">
                Read the Methodology <ArrowIcon />
              </Button>
              <Button href="/pulse" variant="spring">
                Find Where AI Fits <ArrowIcon />
              </Button>
              <Button href={links.webApp} variant="ghost">
                Get the Web App <ArrowIcon />
              </Button>
              <Button href={links.bookACall} variant="ghost">
                Book a Call <ArrowIcon />
              </Button>
            </div>
          </div>

          {/* Builders */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white">
              {footerCta.builderPath.title}
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              {footerCta.builderPath.description}
            </p>
            <div className="mt-6">
              <Button href={links.community} variant="ghost">
                Join the Community <ArrowIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
