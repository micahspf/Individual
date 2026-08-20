import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import BrandLogo from "@/components/ui/BrandLogo";
import EmailCapture from "@/components/ui/EmailCapture";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Elegant display + simple modern body */
const cormorant = Cormorant({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.madebyindividual.com"),
  title: {
    default: "Individual — Personalized goods, made to order in Cullman, AL",
    template: "%s · Individual",
  },
  description:
    "Personalized drinkware, home gifts, and keepsakes manufactured to order in Cullman, Alabama. Names, monograms, dates — clear quotes and honest timelines.",
  icons: {
    icon: [{ url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/apple-icon-180.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Individual — Personalized goods, made to order",
    description:
      "Personalized gifts and home goods made to order in Cullman, Alabama. Drinkware, signs, boards, and commissions.",
    url: "https://www.madebyindividual.com",
    siteName: "Individual",
    locale: "en_US",
    type: "website",
    // Uses app/opengraph-image.png via file convention; keep explicit for consumers that need URL
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Individual — made to order in Cullman, Alabama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Individual — Personalized goods, made to order",
    description: "Made to order in Cullman, Alabama",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Applies the saved theme before first paint so a returning light-mode
          visitor never sees a flash of dark. Dark is the default when nothing
          is stored — it is the brand, not a fallback for system preference.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}}catch(e){}`,
          }}
        />
      </head>
      <body className={`${dmSans.className} min-h-screen text-zinc-100 antialiased`}>
        <Suspense
          fallback={
            <div className="h-16 border-b border-white/10 bg-[#0a0a12]/85" aria-hidden />
          }
        >
          <Header />
        </Suspense>
        {children}
        <SpeedInsights />
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4">
                <BrandLogo size="md" />
              </div>
              <p className="leading-relaxed text-zinc-400">
                Individual · Made to order in Cullman, Alabama.
              </p>
              <p className="mt-3 space-y-1 leading-relaxed">
                <a
                  href="tel:+12565906534"
                  className="block font-medium text-zinc-200 hover:text-pink-300"
                >
                  256-590-6534
                </a>
                <a
                  href="mailto:madebyindividual@gmail.com"
                  className="block text-zinc-400 hover:text-pink-300"
                >
                  madebyindividual@gmail.com
                </a>
              </p>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Work</div>
              {/* Category filters removed while the shop is paused — they all
                  landed on the same coming-soon page. */}
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link href="/shop" className="hover:text-pink-300">
                    Past work
                  </Link>
                </li>
                <li>
                  <Link href="/#request" className="hover:text-pink-300">
                    Request a commission
                  </Link>
                </li>
                <li>
                  <Link href="/ai" className="hover:text-pink-300">
                    AI systems
                  </Link>
                </li>
                <li>
                  <a
                    href="/what-ai-can-do-for-your-local-business.pdf"
                    className="hover:text-pink-300"
                    download
                  >
                    Free AI guide (PDF)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Info</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <Link href="/ai" className="hover:text-pink-300">
                    AI services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-pink-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-pink-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-pink-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-pink-300">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-pink-300">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-pink-300">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-pink-300">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Stay informed</div>
              <Suspense
                fallback={<div className="h-24 rounded-lg bg-white/5" aria-hidden />}
              >
                <EmailCapture />
              </Suspense>
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Individual · Cullman, AL ·{" "}
            <Link href="/privacy" className="hover:text-pink-300">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-pink-300">
              Terms
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
