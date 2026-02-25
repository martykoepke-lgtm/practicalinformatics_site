import type { Metadata } from 'next';
import PolicyPage from '@/components/layout/PolicyPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | Practical Informatics',
  description: 'Cookie policy for Practical Informatics and the PULSE Framework.',
};

export default function CookiesPage() {
  return <PolicyPage title="Cookie Policy" gettermsDocument="cookies" />;
}
