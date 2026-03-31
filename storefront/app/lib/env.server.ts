import type {HydrogenEnv} from '@shopify/hydrogen';

function str(env: string | undefined): string {
  return env?.trim() ?? '';
}

/**
 * Server-only env for createHydrogenContext.
 * Missing Customer Account / private token fields default to empty in dev.
 */
export function getHydrogenEnv(): HydrogenEnv {
  const isProd = process.env.NODE_ENV === 'production';
  const sessionFallback = 'development-session-secret-min-32-chars!!';
  const sessionSecret = str(process.env.SESSION_SECRET);

  return {
    SESSION_SECRET: !isProd && !sessionSecret ? sessionFallback : sessionSecret,
    PUBLIC_STOREFRONT_API_TOKEN: str(process.env.PUBLIC_STOREFRONT_API_TOKEN),
    PRIVATE_STOREFRONT_API_TOKEN: str(
      process.env.PRIVATE_STOREFRONT_API_TOKEN,
    ),
    PUBLIC_STORE_DOMAIN: str(process.env.PUBLIC_STORE_DOMAIN),
    PUBLIC_STOREFRONT_ID: str(process.env.PUBLIC_STOREFRONT_ID),
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: str(
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
    ),
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: str(
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
    ),
    PUBLIC_CHECKOUT_DOMAIN: str(process.env.PUBLIC_CHECKOUT_DOMAIN),
    SHOP_ID: str(process.env.SHOP_ID),
  };
}
