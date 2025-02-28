import "./globals.css";

import type { Metadata } from "next";
import Image from "next/image";

import { sfProText } from "./fonts";
import { Providers } from "./providers";

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
        <Providers>
          <div className="flex flex-col h-screen min-h-[100dvh] self-center max-w-[768px] mx-auto">
            <main className="max-w-full flex-grow">{children}</main>
            <footer className="mx-auto w-full row-start-3 flex gap-6 flex-wrap items-center justify-center bg-white border-t border-liner-gray py-2 max-w-full">
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://getliner.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/images/globe.svg"
                  unoptimized
                  alt="Globe icon"
                  width={16}
                  height={16}
                />
                Liner →
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
