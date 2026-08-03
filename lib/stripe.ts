import Stripe from "stripe";

/**
 * Server-side Stripe client.
 * Prefer standard env names; fall back to Individual_* aliases.
 */
export function getStripeSecretKey(): string | undefined {
  return (
    process.env.STRIPE_SECRET_KEY ||
    process.env.Individual_STRIPE_SECRET_KEY ||
    undefined
  );
}

export function getStripePublishableKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_Individual_STRIPE_PUBLISHABLE_KEY ||
    undefined
  );
}

export function stripeEnabled(): boolean {
  const key = getStripeSecretKey();
  return Boolean(key && key.startsWith("sk_"));
}

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = getStripeSecretKey();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      // Match installed stripe package default
      apiVersion: "2026-07-29.dahlia",
      typescript: true,
    });
  }
  return stripeClient;
}
