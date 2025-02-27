import "./globals.css";

import type { Metadata } from "next";
import Image from "next/image";

import { sfProText } from "./fonts";

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
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://getliner.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/images/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Liner →
          </a>
        </footer>
      </body>
    </html>
  );
}
