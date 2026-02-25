import type { Metadata } from 'next';
import PolicyPage from '@/components/layout/PolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Practical Informatics',
  description: 'Privacy policy for Practical Informatics and the PULSE Framework.',
};

export default function PrivacyPage() {
  return <PolicyPage title="Privacy Policy" gettermsDocument="privacy" />;
}
