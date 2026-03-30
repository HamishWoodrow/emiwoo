import type {HydrogenEnv} from '@shopify/hydrogen';

/**
 * Server-only env for createHydrogenContext.
 * Missing Customer Account / private token fields default to empty in dev.
 */
export function getHydrogenEnv(): HydrogenEnv {
  return {
    SESSION_SECRET:
      process.env.SESSION_SECRET ?? 'development-session-secret-min-32-chars!!',
    PUBLIC_STOREFRONT_API_TOKEN:
      process.env.PUBLIC_STOREFRONT_API_TOKEN ?? '',
    PRIVATE_STOREFRONT_API_TOKEN:
      process.env.PRIVATE_STOREFRONT_API_TOKEN ?? '',
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN ?? '',
    PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID ?? '',
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID ?? '',
    PUBLIC_CUSTOMER_ACCOUNT_API_URL:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL ?? '',
    PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN ?? '',
    SHOP_ID: process.env.SHOP_ID ?? '',
  };
}
