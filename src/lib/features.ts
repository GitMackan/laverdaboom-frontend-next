// Public feature flags are read when Next.js builds the application.
// The shop stays disabled unless explicitly enabled in the deployment environment.
export const shopEnabled = process.env.NEXT_PUBLIC_SHOP_ENABLED === "true";
