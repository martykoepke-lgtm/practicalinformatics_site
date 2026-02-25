'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { background, links } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';

function DomainTranslatorGraph() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nodes = [
    { label: 'Clinical / Domain', x: 100, y: 40 },
    { label: 'Leadership', x: 300, y: 40 },
    { label: 'IT', x: 200, y: 160 },
  ];

  return (
    <div ref={ref} className="relative mx-auto mt-8 h-64 max-w-md">
      <svg viewBox="0 0 400 220" className="h-full w-full">
        {/* Connection lines */}
        {[
          { x1: 100, y1: 55, x2: 300, y2: 55 },
          { x1: 100, y1: 55, x2: 200, y2: 160 },
          { x1: 300, y1: 55, x2: 200, y2: 160 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#4A90E2"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0.2, strokeDashoffset: 0 }}
            animate={
              isInView
                ? { opacity: 0.6, strokeDashoffset: [0, -8] }
                : { opacity: 0.2 }
            }
            transition={{
              strokeDashoffset: { duration: 1, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.5, delay: 0.5 },
            }}
          />
        ))}

        {/* Outer nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y + 15}
              r="28"
              fill="rgba(74, 144, 226, 0.08)"
              stroke="#4A90E2"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
            />
            <motion.text
              x={node.x}
              y={node.y + 18}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
              fontFamily="inherit"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}

        {/* Central Translator node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <circle
            cx="200"
            cy="85"
            r="22"
            fill="rgba(230, 126, 34, 0.15)"
            stroke="#E67E22"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="83"
            textAnchor="middle"
            fill="#E67E22"
            fontSize="8"
            fontWeight="bold"
          >
            Domain
          </text>
          <text
            x="200"
            y="93"
            textAnchor="middle"
            fill="#E67E22"
            fontSize="8"
            fontWeight="bold"
          >
            Translator
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export default function Background() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-12 md:grid-cols-5">
        {/* Photo */}
        <div className="flex items-start justify-center md:col-span-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/headshot.jpg"
              alt="Marty Koepke — Healthcare Technology Consultant and creator of the PULSE Framework"
              width={400}
              height={500}
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-3">
          <SectionEyebrow>{background.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            {background.headline}
          </h2>

          <div className="mt-6 space-y-4">
            {background.bio.map((p, i) => {
              if (i === 3) {
                return (
                  <p key={i} className="text-slate-300">
                    {background.bookLine}{' '}
                    <a
                      href={links.book}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="italic text-steel underline decoration-steel/30 underline-offset-2 transition-colors hover:text-white"
                    >
                      {background.bookTitle} →
                    </a>
                  </p>
                );
              }
              return (
                <p key={i} className="text-slate-300">
                  {p}
                </p>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-slate-500">
            {background.credentials}
          </div>

          <p className="mt-4 text-sm italic text-slate-400">{background.closing}</p>

          {/* Domain Translator Section */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <h3 className="text-xl font-bold text-white">
              {background.domainTranslator.title}
            </h3>
            {background.domainTranslator.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-slate-300">
                {p}
              </p>
            ))}

            <DomainTranslatorGraph />

            <motion.p
              className="mt-6 text-center font-mono text-sm italic text-slate-400"
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{
                opacity: 1,
                clipPath: 'inset(0 0% 0 0)',
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              &ldquo;AI doesn&apos;t fail when the code is wrong. It fails when
              the question was wrong.&rdquo;
            </motion.p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
