import { Metadata } from 'next';
import { LearnProviders } from '@/components/learn/LearnProviders';

export const metadata: Metadata = {
  title: 'Learn SQL - PostgresGUI',
  description: 'Master PostgreSQL through interactive lessons and hands-on challenges',
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LearnProviders>
      {children}
    </LearnProviders>
  );
}
