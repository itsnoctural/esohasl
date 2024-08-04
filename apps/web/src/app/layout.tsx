import { Background } from "@/components/background";
import { ClientProviders } from "@/components/client-providers";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
