import './globals.css';

import type { Metadata } from 'next';

import { sfProText } from './fonts';

export const metadata: Metadata = {
  title: "Liner Challenge",
  description: "Liner Frontend Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sfProText.variable} font-sf-pro-text`}>
        <main className="mx-auto max-w-[768px]">{children}</main>
      </body>
    </html>
  );
}
