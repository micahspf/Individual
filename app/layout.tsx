import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import EmailCapture from "@/components/ui/EmailCapture";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Made by Individual — Custom 3D print & laser engraving · Cullman, AL",
  description:
    "Custom 3D-printed and laser-engraved products made to order in Cullman, Alabama. Tumblers, signs, flexi packs, pet tags. Made for you. No waste inventory.",
  openGraph: {
    title: "Made by Individual — Custom 3D print & laser engraving",
    description:
      "Custom 3D-printed and laser-engraved goods made to order in Cullman, Alabama. Made for you.",
    url: "https://www.madebyindividual.com",
    siteName: "Made by Individual",
    locale: "en_US",
    type: "website",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Made by Individual",
              description:
                "Custom 3D printing and laser engraving: tumblers, wood signs, flexi packs, and more. Made for you in Cullman, Alabama.",
              url: "https://www.madebyindividual.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Cullman",
                addressRegion: "AL",
                addressCountry: "US",
              },
              areaServed: "Cullman County, Alabama",
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="min-h-screen text-zinc-100 antialiased">
        <Header />
        {children}
        <SpeedInsights />
        <Analytics />
        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3 font-bold">
                Made by <span className="text-pink-400">Individual</span>
              </div>
              <p className="text-zinc-400">
                Custom 3D print & laser engraving. Made for you in Cullman, Alabama.
              </p>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Shop</div>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="/shop" className="hover:text-pink-300">
                    All Products
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
                    3D Printed
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
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-zinc-200">Stay in the loop</div>
              <EmailCapture />
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Made by Individual · Cullman, AL
          </div>
        </footer>
      </body>
    </html>
  );
}
