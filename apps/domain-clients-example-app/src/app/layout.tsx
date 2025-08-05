import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ValenceDomainModalProvider } from "@/context";
import "@valence-protocol/domain-modal-react/index.css";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valence Domain Clients Example App",
  description: "Example app for Valence Protocol domain clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ValenceDomainModalProvider>
          {children}
        </ValenceDomainModalProvider>
      </body>
    </html>
  );
}
