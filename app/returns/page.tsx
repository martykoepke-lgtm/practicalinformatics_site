import type { Metadata } from 'next';
import PolicyPage from '@/components/layout/PolicyPage';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Practical Informatics',
  description: 'Return and refund policy for Practical Informatics and the PULSE Framework.',
};

export default function ReturnsPage() {
  return <PolicyPage title="Return & Refund Policy" gettermsDocument="return" />;
}
