import type { Metadata } from 'next';
import PolicyPage from '@/components/layout/PolicyPage';

export const metadata: Metadata = {
  title: 'Terms of Service | Practical Informatics',
  description: 'Terms of service for Practical Informatics and the PULSE Framework.',
};

export default function TermsPage() {
  return <PolicyPage title="Terms of Service" gettermsDocument="terms-of-service" />;
}
