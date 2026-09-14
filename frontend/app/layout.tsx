import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NyayaAI - Legal Action Navigator',
  description: 'Understand your rights. Know your next step.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
