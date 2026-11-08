# Public shop

The shop is disabled by default. When disabled, shop links and the cart are
hidden, and `/shop` and its subpages redirect to the home page. Admin pages
for products and orders remain available to signed-in administrators.

To enable it, set this variable in the hosting environment (or `.env.local`
for local development):

```env
NEXT_PUBLIC_SHOP_ENABLED=true
```

Then rebuild and redeploy the frontend. Restart the development server for
local changes. Set it to `false` and rebuild/redeploy to disable it again.
An unset variable also disables the shop.

This flag controls the frontend. It does not disable the separate backend
API or Stripe webhooks.
