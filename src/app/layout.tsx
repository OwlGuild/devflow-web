import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevFlow · team task management',
  description:
    'Open-source team task management: REST API, realtime WebSocket layer, vector search and quality gates, built by OwlGuild.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
