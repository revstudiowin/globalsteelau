import type { Metadata } from 'next';
import './globals.css';
import './refined.css';
import { Footer, Motion } from './ui';
import { ConditionalHeader } from './conditional-header';

export const metadata: Metadata = {
  title: { default: 'Global Steel Australia | Strength for your next project', template: '%s | Global Steel Australia' },
  description: 'Explore steel bar, reinforcing mesh and construction accessories from Global Steel Australia. Discuss your next project with our team.',
  robots: { index: false, follow: false }
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <ConditionalHeader />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
