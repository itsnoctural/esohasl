import { ClientProviders } from "@/components/client-providers";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./globals.css";
import { description, openGraph, twitter } from "./shared-metadata";

export const metadata: Metadata = {
  description,
  openGraph,
  twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <ClientProviders>
          <ThemeProvider attribute="class">
            <div className="fixed -z-50 size-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] dark:bg-[radial-gradient(#5e5e5e,transparent_1px)]" />
            {children}
            <Script
              defer
              data-domain="esohasl.net"
              src="https://plaus.aisboost.com/js/script.js"
            />
            <Script
              async
              data-cfasync="false"
              src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1012710"
            />
            <Script
              async
              data-cfasync="false"
              src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1101753"
            />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
