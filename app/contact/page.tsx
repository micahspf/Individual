export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="glass-strong p-8 sm:p-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">
          Contact
        </p>
        <h1 className="font-display mb-6 text-4xl font-medium tracking-tight">Get in touch</h1>
        <div className="space-y-8 text-zinc-300">
          <div>
            <h2 className="mb-2 font-medium text-white">Location</h2>
            <p className="text-zinc-400">
              Cullman, Alabama
              <br />
              Individual · Local Cullman pickup by arrangement
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Email</h2>
            <p className="text-zinc-400">
              <a
                href="mailto:founder@madebyindividual.com"
                className="text-pink-400 hover:text-pink-300"
              >
                founder@madebyindividual.com
              </a>
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Commissions</h2>
            <p className="text-zinc-400">
              Prefer the{" "}
              <a href="/#request" className="text-pink-400 hover:text-pink-300">
                quote form
              </a>
              . Include size, material, finish, quantity, any text or artwork, and a target date if you have one.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Response time</h2>
            <p className="text-zinc-400">
              Most messages are answered within one business day. Commission quotes usually arrive the same day or next.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
