import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
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
    default: "Individual — Individual manufacturer · Cullman, AL",
    template: "%s · Individual",
  },
  description:
    "Personalized drinkware, home gifts, and keepsakes manufactured to order in Cullman, Alabama. Names, monograms, dates — clear quotes and honest timelines.",
  openGraph: {
    title: "Individual — Personalized, made to order",
    description:
      "Personalized gifts and home goods from an individual manufacturer in Cullman, Alabama. Drinkware, signs, boards, and commissions.",
    url: "https://www.madebyindividual.com",
    siteName: "Individual",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Individual",
    description: "Individual manufacturer · made to order · Cullman, AL",
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className={`${dmSans.className} min-h-screen text-zinc-100 antialiased`}>
        <Header />
        {children}
        <SpeedInsights />
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-display mb-3 text-xl font-medium tracking-wide">
                <span className="text-pink-400">Individual</span>
              </div>
              <p className="leading-relaxed text-zinc-400">
                Individual manufacturer. Made-to-order goods in Cullman, Alabama.
              </p>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Shop</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="/shop" className="hover:text-pink-300">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="/shop?cat=drinkware" className="hover:text-pink-300">
                    Drinkware
                  </a>
                </li>
                <li>
                  <a href="/shop?cat=home" className="hover:text-pink-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/shop?cat=3d-printed" className="hover:text-pink-300">
                    Fabricated
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Info</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="/about" className="hover:text-pink-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-pink-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-pink-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-pink-300">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:text-pink-300">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/orders/track" className="hover:text-pink-300">
                    Track order
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-pink-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-pink-300">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Stay informed</div>
              <EmailCapture />
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Individual · Cullman, AL ·{" "}
            <a href="/privacy" className="hover:text-pink-300">
              Privacy
            </a>{" "}
            ·{" "}
            <a href="/terms" className="hover:text-pink-300">
              Terms
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
