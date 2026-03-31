import * as serverBuild from 'virtual:react-router/server-build';
import {AsyncLocalStorage} from 'node:async_hooks';
import {waitUntil as vercelWaitUntil} from '@vercel/functions';
import {
  createHydrogenContext,
  createRequestHandler,
  InMemoryCache,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getHydrogenEnv} from '~/lib/env.server';
import {AppSession} from '~/lib/session.server';

const cache = new InMemoryCache();

const hydrogenAsyncLocalStorage =
  new AsyncLocalStorage<HydrogenRouterContextProvider>();

const handleRequest = createRequestHandler({
  build: serverBuild,
  mode: process.env.NODE_ENV,
  getLoadContext: () => {
    const ctx = hydrogenAsyncLocalStorage.getStore();
    if (!ctx) {
      throw new Error(
        '[emiwoo] Missing Hydrogen context (AsyncLocalStorage). Server misconfiguration.',
      );
    }
    return ctx;
  },
});

function assertProductionStorefrontEnv(
  env: ReturnType<typeof getHydrogenEnv>,
): void | never {
  if (process.env.NODE_ENV !== 'production') return;

  const missing: string[] = [];
  if (!env.PUBLIC_STORE_DOMAIN) missing.push('PUBLIC_STORE_DOMAIN');
  if (!env.PUBLIC_STOREFRONT_API_TOKEN) {
    missing.push('PUBLIC_STOREFRONT_API_TOKEN');
  }
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) {
    missing.push('SESSION_SECRET (32+ characters)');
  }
  if (missing.length === 0) return;

  throw new Response(
    [
      'Storefront environment is incomplete on Vercel.',
      `Add these Production variables: ${missing.join(', ')}`,
      'See CLAUDE.md / project README for the full list.',
    ].join('\n'),
    {
      status: 503,
      headers: {'content-type': 'text/plain; charset=utf-8'},
    },
  );
}

/**
 * Hydrogen SSR handler for Vercel (Node).
 * Uses AsyncLocalStorage so the React Router request handler can be a singleton
 * (avoids per-request handler initialization issues under Fluid concurrency).
 */
export default async function handler(request: Request) {
  const env = getHydrogenEnv();
  assertProductionStorefrontEnv(env);

  const session = await AppSession.init(request, [env.SESSION_SECRET]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil: vercelWaitUntil,
    session,
    i18n: {language: 'EN', country: 'US'},
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  return hydrogenAsyncLocalStorage.run(hydrogenContext, async () => {
    const response = await handleRequest(request);

    if (session.isPending) {
      response.headers.append('Set-Cookie', await session.commit());
    }

    return response;
  });
}
