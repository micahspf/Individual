export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-pink-400 text-sm font-medium mb-3">CONTACT</p>
      <h1 className="text-4xl font-bold mb-6">Get in touch</h1>
      <div className="space-y-8 text-neutral-300">
        <div>
          <h2 className="font-medium text-white mb-2">Location</h2>
          <p className="text-neutral-400">
            Cullman, Alabama<br />
            Made to order · Local pickup available by arrangement
          </p>
        </div>
        <div>
          <h2 className="font-medium text-white mb-2">Email</h2>
          <p className="text-neutral-400">
            <a href="mailto:micahspf@gmail.com" className="text-pink-400 hover:text-pink-300">
              micahspf@gmail.com
            </a>
          </p>
        </div>
        <div>
          <h2 className="font-medium text-white mb-2">Custom requests</h2>
          <p className="text-neutral-400">
            Prefer the{' '}
            <a href="/#request" className="text-pink-400 hover:text-pink-300">
              request form
            </a>
            . Include size, material preference, color, quantity, any text or logo, and a deadline if you have one.
          </p>
        </div>
        <div>
          <h2 className="font-medium text-white mb-2">Response time</h2>
          <p className="text-neutral-400">
            Most messages are answered within 1 business day. Quotes for custom work usually come the same day or next.
          </p>
        </div>
      </div>
    </main>
  );
}
