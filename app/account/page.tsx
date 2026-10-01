import Link from "next/link";

/**
 * Accounts paused until the shop reopens.
 *
 * The previous account system is switched off, not just hidden: it stored
 * passwords in plain text, kept users in memory that serverless cold starts
 * wipe, and signed sessions with a fallback secret readable in this public
 * repo. /login, /register, /forgot-password and /reset-password redirect here
 * (see next.config.ts). lib/auth/ is kept for reference only — see the warning
 * at the top of lib/auth/store.ts before reusing any of it.
 *
 * Bring accounts back on a hosted auth provider and a real database, at the
 * same time as the shop.
 */
export default function AccountPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-20">
      <div className="glass-strong w-full p-8 text-center sm:p-12">
        <p className="mb-3 text-sm font-medium text-pink-400">ACCOUNTS</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Opening with the shop
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-400 leading-relaxed">
          Everything is made to order right now, so there is nothing to log in to.
          Accounts come back when the shop does. Until then, every commission and AI
          project starts with a conversation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#request" className="btn-pill-pink px-7 py-3 text-sm">
            Get a quote →
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium transition hover:border-pink-500/40"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
