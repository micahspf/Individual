# Code word: **Stripe going live.**

Use this phrase later to reopen this plan. Last updated: 2026-08-03.

---

## Status when saved

- Local **test** checkout works (`sk_test_` / `pk_test_`).
- Example paid test session: tumbler **$32**, order ref `IND-MSCRA7NJ`, status **paid**.
- Webhook route: `POST /api/webhooks/stripe` (raw body + signature + idempotent fulfill).
- Soft launch is OK after **live** Stripe + Vercel env + one real self-purchase.
- Not set-and-forget yet: server order store is in-memory; treat **Stripe Dashboard** as source of truth until Postgres.

---

## Do in order (production)

### 1. Live Stripe keys
1. [dashboard.stripe.com](https://dashboard.stripe.com) → **Live** mode (not Test)
2. **Developers → API keys**
3. Copy `pk_live_…` and `sk_live_…`

### 2. Live webhook
1. **Developers → Webhooks → Add endpoint**
2. URL:

```text
https://www.madebyindividual.com/api/webhooks/stripe
```

3. Event: `checkout.session.completed` (optional: `payment_intent.payment_failed`, `charge.refunded`)
4. Reveal signing secret → copy live `whsec_…`

### 3. Vercel env (Production)
| Name | Value |
|------|--------|
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | live `whsec_…` |
| `NEXT_PUBLIC_APP_URL` | `https://www.madebyindividual.com` |
| `FOUNDER_EMAIL` | email you check daily |

### 4. Redeploy
Vercel → Deployments → Redeploy → wait **Ready**.

### 5. One real self-purchase
1. https://www.madebyindividual.com/shop  
2. Checkout with your real card  
3. Confirm: success page + Stripe payment **Succeeded** + webhook delivery **200**

### 6. Soft open
- Tell 5–10 people / one local post  
- Check Stripe **daily** for new payments  
- Message each buyer: confirm + 7–10 day timeline  

### 7. Later (after ~10–20 orders)
- Real photos: `raw-photos/{slug}.jpg` → `npm run images` → push  
- Wire Postgres for durable orders  
- Don’t run big ads until then  

---

## Local test (reference)

```powershell
# Terminal A
cd C:\Users\micah\Documents\Individual
npm run dev

# Terminal B
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# paste whsec_ into .env.local as STRIPE_WEBHOOK_SECRET, restart Terminal A
```

Test card: `4242 4242 4242 4242` · any future expiry · any CVC.

---

## Don’t

- Go live on **test** keys  
- Promise 2–4 day turnaround (use **7–10 days**)  
- Re-enable spin wheel / rewards without a database  
- Assume every order is permanently stored in the app without Postgres  

---

## Repo pointers

- Checkout API: `app/api/checkout/route.ts`
- Webhook: `app/api/webhooks/stripe/route.ts`
- Fulfill: `lib/orders/fulfill.ts`
- Project: `C:\Users\micah\Documents\Individual` · GitHub `micahspf/Individual`
