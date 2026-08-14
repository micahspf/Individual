import Link from "next/link";

/**
 * Rewards UI paused until balances persist in a real database.
 * In-memory / localStorage token balances reset on serverless cold starts.
 * Spin wheel removed (paid chance mechanic — wrong risk for launch).
 * Keep lib/rewards/* for a future ship after ~20 real orders.
 */
export default function RewardsPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-6 py-20">
      <div className="glass-strong w-full p-8 text-center sm:p-12">
        <p className="mb-3 text-sm font-medium text-pink-400">REWARDS</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Coming after real orders
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-400 leading-relaxed">
          Individual Tokens, daily check-ins, and exclusives will return when they
          sit on a durable database — not memory that vanishes on every deploy.
          For now we ship the catalog: made-to-order goods from a two-person workshop in Cullman, Alabama.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-pill-pink px-7 py-3 text-sm">
            Browse catalog →
          </Link>
          <Link
            href="/#request"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium transition hover:border-pink-500/40"
          >
            Request a commission
          </Link>
        </div>
      </div>
    </main>
  );
}
