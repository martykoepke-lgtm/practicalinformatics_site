import type { Metadata } from 'next';
import PolicyPage from '@/components/layout/PolicyPage';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | Practical Informatics',
  description: 'Acceptable use policy for Practical Informatics and the PULSE Framework.',
};

export default function AcceptableUsePage() {
  return <PolicyPage title="Acceptable Use Policy" gettermsDocument="acceptable-use" />;
}
