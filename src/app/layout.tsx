import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

// Import fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Coreon | AI Orchestration Platform',
  description: 'Enterprise AI orchestration platform designed for regulated environments. Configure task-specific agents that collaborate within flexible, governed workflows.',
  keywords: ['AI', 'orchestration', 'enterprise', 'agents', 'compliance', 'regulated', 'governance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
} 