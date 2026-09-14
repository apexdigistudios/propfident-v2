'use client';

import { useWhopCheckout } from '@/hooks/useWhopCheckout';

export function FoundersAccessPricing() {
  const { email, setEmail, loading, handleCheckout } = useWhopCheckout();

  // Replace this with your actual Whop checkout link
  const WHOP_CHECKOUT_URL = 'https://whop.com/checkout/plan_YOUR_PLAN_ID';

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-foreground">Founders Access</h3>
      <p className="mt-2 text-muted-foreground">
        Get priority access, custom risk limits, and direct founder support.
      </p>

      <form onSubmit={(e) => handleCheckout(e, WHOP_CHECKOUT_URL)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Gmail Address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="trader@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Redirecting to Whop...' : 'Get Founders Access'}
        </button>
      </form>
    </div>
  );
}