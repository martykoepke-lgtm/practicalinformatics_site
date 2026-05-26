import type { Metadata } from "next";
import Image from "next/image";
import Section, { SoftDivider } from "@/components/ui/Section";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import BuiltThings from "@/components/sections/BuiltThings";
import { META, ABOUT, SITE } from "@/lib/content";
import { MARTYKOEPKE_URL, SOCIAL } from "@/lib/links";

export const metadata: Metadata = {
  title: META.about.title,
  description: META.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: META.about.title,
    description: META.about.description,
    url: `${SITE.url}/about`,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#marty-koepke`,
  name: "Marty Koepke",
  jobTitle: "Informatics Consultant",
  description: META.about.description,
  url: `${SITE.url}/about`,
  image: `${SITE.url}/images/headshot.jpg`,
  homeLocation: {
    "@type": "Place",
    name: "Mokelumne Hill, California",
  },
  worksFor: {
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
  },
  knowsAbout: [
    "Clinical Informatics",
    "Healthcare Informatics",
    "Business Process Optimization",
    "Workflow Design",
    "Artificial Intelligence Implementation",
    "Small Business Consulting",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Master of Health Administration",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Lean Six Sigma Green Belt",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "SAFe 6.0 Agilist",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Certified Scrum Master",
    },
  ],
  author: {
    "@type": "Book",
    name: "Between the Clicks: The Hidden Work of Healthcare Informatics",
  },
  sameAs: [SOCIAL.linkedin, MARTYKOEPKE_URL],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero — warm tan tone, headshot + headline */}
      <Section tone="cream-dim" width="wide">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
            <Image
              src="/images/headshot.jpg"
              alt="Marty Koepke"
              width={280}
              height={280}
              priority
              className="mx-auto h-[240px] w-[240px] rounded-full object-cover md:h-[280px] md:w-[280px]"
            />
            <h1 className="text-center font-serif text-3xl leading-snug text-forest sm:text-4xl md:text-left md:text-5xl">
              {ABOUT.heroHeadline}
            </h1>
          </div>
        </Reveal>
      </Section>

      {/* The story — light, generous prose */}
      <Section tone="cream" width="narrow">
        <RevealGroup className="space-y-6">
          {ABOUT.story.map((p, i) => (
            <RevealItem key={i}>
              <p className="text-lg leading-relaxed text-charcoal">{p}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* How I work — FOREST band, principles in cream + gold */}
      <Section tone="forest">
        <Reveal>
          <p className="text-center font-serif text-sm uppercase tracking-[0.18em] text-gold">
            Principles
          </p>
          <h2 className="mt-2 text-center text-3xl text-cream sm:text-4xl">
            How I work
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-10 md:grid-cols-2">
          {ABOUT.principles.map((p) => (
            <RevealItem key={p.headline}>
              <h3 className="font-serif text-2xl text-cream">{p.headline}</h3>
              <p className="mt-3 leading-relaxed text-cream/80">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Credentials — quiet light section */}
      <Section tone="cream" width="narrow">
        <Reveal>
          <div className="rounded-lg border border-tan bg-cream-dim p-7">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Background
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal">
              {ABOUT.credentials}
            </p>
            <p className="mt-4 text-sm text-moss">
              For my healthcare informatics work, speaking, and writing, visit{" "}
              <a
                href={MARTYKOEPKE_URL}
                className="underline decoration-gold underline-offset-4 hover:text-forest"
              >
                martykoepke.com
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <SoftDivider />

      {/* Things I've built — dynamic modal, click to see more + launch demo */}
      <Section tone="cream-dim">
        <Reveal>
          <h2 className="text-2xl text-forest sm:text-3xl">
            A few things I&apos;ve built
          </h2>
          <p className="mt-3 max-w-2xl text-moss">
            Part of doing the thinking is being able to build the fix. These
            are working systems I designed and shipped myself — tap a card for
            details and to launch the demo.
          </p>
        </Reveal>
        <div className="mt-10">
          <BuiltThings />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
