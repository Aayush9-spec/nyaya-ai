import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NyayaAI — AI-Powered Legal Action Navigator',
  description: 'GenAI-powered legal assistance platform. Simplify complex legal documents, compare contracts, highlight risks, and get actionable next steps. Built for the PromptWars AI for Legal Assistance & Access challenge.',
  keywords: ['legal AI', 'document analysis', 'contract comparison', 'legal assistance', 'NyayaAI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F7F8FC] text-[#111827] font-sans antialiased min-h-screen">
        {/* Skip to main content — accessibility best practice */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <div id="main-content" role="main" aria-label="NyayaAI Application">
          {children}
        </div>
      </body>
    </html>
  );
}

