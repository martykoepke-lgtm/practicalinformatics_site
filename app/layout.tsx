import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Practical Informatics | PULSE Framework — Healthcare Technology Consulting",
  description:
    "The PULSE Framework helps organizations implement technology the right way — Problem, Understand, Landscape, Solve, Enable. Free Methodology Guide, AI Fit Diagnostic, and PULSE Web App. Healthcare consulting by Marty Koepke, MHA.",
  keywords: [
    "PULSE Framework",
    "healthcare technology consulting",
    "technology implementation",
    "EHR optimization",
    "clinical informatics",
    "AI readiness",
    "AI governance",
    "healthcare IT",
  ],
  authors: [{ name: "Marty Koepke" }],
  metadataBase: new URL("https://www.practicalinformatics.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.practicalinformatics.com/",
    title: "Practical Informatics | PULSE Framework — Healthcare Technology Consulting",
    description:
      "The bridge between the problem and the right solution. The PULSE Framework helps organizations implement technology the right way. Free Methodology Guide and AI Fit Diagnostic available.",
    images: ["/images/logo-long.png"],
    siteName: "Practical Informatics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical Informatics | PULSE Framework — Healthcare Technology Consulting",
    description:
      "The bridge between the problem and the right solution. The PULSE Framework helps organizations implement technology the right way. Free Methodology Guide and AI Fit Diagnostic available.",
    images: ["/images/logo-long.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="alternate" type="text/markdown" href="https://www.practicalinformatics.com/llms.txt" title="LLM-readable content" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Practical Informatics",
              alternateName: "Marty Koepke Consulting",
              description:
                "The PULSE Framework helps organizations implement technology the right way — Problem, Understand, Landscape, Solve, Enable. Healthcare technology consulting, free AI Fit Diagnostic, and the PULSE Web App.",
              url: "https://www.practicalinformatics.com",
              logo: "https://www.practicalinformatics.com/images/logo-long.png",
              image: "https://www.practicalinformatics.com/images/headshot.jpg",
              founder: {
                "@type": "Person",
                name: "Marty Koepke",
                jobTitle: "Healthcare Technology Consultant",
                description:
                  "Creator of the PULSE Framework. 15+ years in clinical informatics across 140+ hospitals and 2,200+ care sites. Author of Between the Clicks: Voices of Clinical Informatics.",
                knowsAbout: [
                  "PULSE Framework",
                  "Healthcare Technology",
                  "Clinical Informatics",
                  "EHR Optimization",
                  "Technology Implementation",
                  "AI Integration",
                  "AI Governance",
                  "Process Improvement",
                ],
              },
              areaServed: "United States",
              serviceType: [
                "PULSE Framework Consulting",
                "Healthcare Technology Consulting",
                "Technology Strategy",
                "AI Readiness Assessment",
                "AI Governance",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "PULSE Methodology Guide",
                    description:
                      "The foundational document of the PULSE Framework. Defines the principles, governance model, and decision logic behind every phase.",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    name: "PULSE Web App",
                    description:
                      "A web application with 30 structured data tables, automated People/Process/Platform classification, dashboards, and 90-day outcome tracking. Built on Google Sheets.",
                    price: "49",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    name: "Consulting",
                    description:
                      "I partner with organizations to run the PULSE Framework on their specific challenges.",
                    priceCurrency: "USD",
                  },
                ],
              },
              sameAs: ["https://www.linkedin.com/in/marty-koepke/"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://tally.so/r/9qNRM5",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the PULSE Framework?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PULSE stands for Problem, Understand, Landscape, Solve, Enable. It's a structured methodology for implementing technology — especially AI — that starts with observing what's actually happening before deciding what to build. It was developed through nearly two decades of healthcare informatics experience.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's the difference between the Methodology Guide, the Diagnostic, and the Web App?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Methodology Guide is the foundational philosophy — the principles, governance model, and decision logic behind PULSE. It's free and requires no email. The AI Fit Diagnostic is a free interactive tool that helps you determine which pain points are real AI candidates and which need people or process fixes first. The PULSE Web App ($49) is the full operational toolkit — 30 structured data tables, automated People/Process/Platform classification, dashboards, and 90-day outcome tracking.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's in the PULSE Web App?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A web application built on Google Sheets with 30 structured data tables, automated calculations, visual dashboards, and print-ready reports. It covers the complete PULSE methodology: initiative tracking, workflow observation, pain point cataloging, gap analysis, three-lane action planning (People, Process, Platform), and 30/60/90-day outcome monitoring. One-time purchase at $49 — no recurring costs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this only for healthcare?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The methodology was developed in healthcare, but the pattern is universal. Any organization implementing technology — especially AI — faces the same gap between what leadership wants and what's actually happening on the ground. PULSE works anywhere that gap exists.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What's From Curious to Capable?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A community for domain experts who want to learn to build with AI. Not a coding bootcamp — a space for people whose careers have been about translating between groups, and who are ready to use AI to build what they've been specifying for others.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need coding experience to use the PULSE Web App?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. The web app is designed for domain experts, not developers. If you can use a spreadsheet, you can use the web app. Your team interacts with a polished interface — they never see the underlying spreadsheet.",
                  },
                },
                {
                  "@type": "Question",
                  name: 'What does "technology is always the last decision" mean?',
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "It means that most technology projects fail not because of bad technology, but because the organization never clearly defined the problem, understood what was actually happening, or aligned on what success looks like. PULSE ensures those things happen first — so by the time you get to the technology decision, it's informed by reality.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
