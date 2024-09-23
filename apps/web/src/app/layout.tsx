import { Background } from "@/components/background";
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
            <Background />
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
              src="//d2w9cdu84xc4eq.cloudfront.net/?udcwd=1005401"
            />
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
