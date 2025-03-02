import "./globals.css";

import type { Metadata } from "next";

import { sfProText } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Liner Challenge",
  description: "Liner Frontend Assignment",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    title: "Liner Challenge",
    description: "Liner Frontend Assignment",
    images: [{ url: "/images/og_image.png", alt: "Liner Logo" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href={`${process.env.NEXT_PUBLIC_API_URL}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${sfProText.variable} font-sf-pro-text`}>
        <Providers>
          <div className="flex flex-col h-screen min-h-[100dvh] self-center max-w-[768px] mx-auto">
            <main className="max-w-full flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
