import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/ui/Header';
import EmailCapture from '@/components/ui/EmailCapture';

export const metadata: Metadata = {
  title: 'Made by Individual — Custom products made in Cullman, Alabama',
  description:
    'Personalized tumblers, wood signs, flexi animals, pet tags, and custom 3D-printed goods. Made to order in Cullman, Alabama. No waste inventory.',
  openGraph: {
    title: 'Made by Individual — Custom products made in Cullman, Alabama',
    description:
      'Personalized tumblers, wood signs, flexi animals, pet tags, and custom 3D-printed goods. Made to order in Cullman, Alabama.',
    url: 'https://www.madebyindividual.com',
    siteName: 'Made by Individual',
    locale: 'en_US',
    type: 'website',
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
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Made by Individual',
              description:
                'Custom made-to-order products: personalized drinkware, wood signs, 3D printed goods, and more. Based in Cullman, Alabama.',
              url: 'https://www.madebyindividual.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cullman',
                addressRegion: 'AL',
                addressCountry: 'US',
              },
              areaServed: 'Cullman County, Alabama',
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <Header />
        {children}
        <footer className="border-t border-neutral-900 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="font-bold mb-3">
                Made by <span className="text-pink-400">Individual</span>
              </div>
              <p className="text-neutral-500">
                Custom products made to order in Cullman, Alabama. No waste inventory.
              </p>
            </div>
            <div>
              <div className="font-medium mb-3 text-neutral-300">Shop</div>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="/shop" className="hover:text-pink-300">All Products</a></li>
                <li><a href="/shop?cat=drinkware" className="hover:text-pink-300">Drinkware</a></li>
                <li><a href="/shop?cat=home" className="hover:text-pink-300">Home</a></li>
                <li><a href="/shop?cat=3d-printed" className="hover:text-pink-300">3D Printed</a></li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-3 text-neutral-300">Info</div>
              <ul className="space-y-2 text-neutral-500">
                <li><a href="/about" className="hover:text-pink-300">About</a></li>
                <li><a href="/contact" className="hover:text-pink-300">Contact</a></li>
                <li><a href="/faq" className="hover:text-pink-300">FAQ</a></li>
                <li><a href="/shipping" className="hover:text-pink-300">Shipping</a></li>
                <li><a href="/returns" className="hover:text-pink-300">Returns</a></li>
                <li><a href="/orders/track" className="hover:text-pink-300">Track order</a></li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-3 text-neutral-300">Stay in the loop</div>
              <EmailCapture />
            </div>
          </div>
          <div className="border-t border-neutral-900 text-center text-neutral-600 text-xs py-6">
            © {new Date().getFullYear()} Made by Individual · Cullman, AL
          </div>
        </footer>
      </body>
    </html>
  );
}
