'use client';

import { workWithMe, links } from '@/lib/content';
import SectionWrapper, { SectionEyebrow } from '@/components/ui/SectionWrapper';
import Button, { ArrowIcon } from '@/components/ui/Button';

export default function WorkWithMe() {
  return (
    <SectionWrapper id="consulting">
      <div className="mx-auto max-w-2xl">
        <SectionEyebrow>{workWithMe.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          {workWithMe.headline}
        </h2>

        <div className="mt-6 space-y-4">
          {workWithMe.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-slate-300 md:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <Button href={links.bookACall} variant="spring">
            Book a Call <ArrowIcon />
          </Button>
          <p className="mt-3 text-sm text-slate-500">{workWithMe.ctaNote}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
