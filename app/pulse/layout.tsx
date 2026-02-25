import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Fit Diagnostic & PULSE Pathway Builder | Practical Informatics',
  description:
    'Find where AI actually fits. This free diagnostic helps you determine which pain points are real AI candidates — then builds a personalized PULSE Framework pathway.',
  openGraph: {
    title: 'AI Fit Diagnostic & PULSE Pathway Builder | Practical Informatics',
    description:
      'Not every problem needs AI. Find out which of yours do — then get a step-by-step implementation checklist.',
    url: 'https://www.practicalinformatics.com/pulse',
    images: [{ url: '/images/logo-long.png' }],
  },
};

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
