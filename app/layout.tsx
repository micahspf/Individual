import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://www.madebyindividual.com"),
  title: {
    default: "Made by Individual — Custom manufacturing on demand",
    template: "%s · Made by Individual",
  },
  description:
    "We can individually manufacture anything you want with no waste. Custom 3D printing and made-to-order products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.madebyindividual.com",
    siteName: "Made by Individual",
    title: "Made by Individual — Custom manufacturing on demand",
    description:
      "Request custom-made products. Printed and manufactured only when ordered — no waste inventory.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
