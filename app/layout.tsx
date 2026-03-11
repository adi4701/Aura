import type {Metadata} from 'next';
import { Instrument_Serif, DM_Mono } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({ 
  weight: '400', 
  style: ['normal', 'italic'], 
  subsets: ['latin'], 
  variable: '--font-serif' 
});

const dmMono = DM_Mono({ 
  weight: ['300', '400', '500'], 
  subsets: ['latin'], 
  variable: '--font-mono' 
});

export const metadata: Metadata = {
  title: 'Aura - Social Wellness & Music',
  description: 'A social wellness chatbot that recommends music based on your mood and connects you with a live community.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable}`}>
      <body className="font-mono bg-[#0a0502] text-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
