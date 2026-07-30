import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.madebyindividual.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Made by Individual — Custom products with a bubbly twist",
    template: "%s · Made by Individual",
  },
  description:
    "Personalize apparel, drinkware, and home goods. Bright colors, soft shapes, and made-to-order magic — no boring inventory.",
  openGraph: {
    title: "Made by Individual",
    description: "Custom products made just for you.",
    url: siteUrl,
    siteName: "Made by Individual",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-black text-white">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-neutral-900 bg-black">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">
              Made by <span className="text-pink-400">Individual</span>
            </p>
            <p className="text-xs text-neutral-500">www.madebyindividual.com · Custom · Made to order</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
