import * as serverBuild from 'virtual:react-router/server-build';
import {
  createHydrogenContext,
  createRequestHandler,
  InMemoryCache,
} from '@shopify/hydrogen';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getHydrogenEnv} from '~/lib/env.server';
import {AppSession} from '~/lib/session.server';

const cache = new InMemoryCache();

/**
 * Hydrogen SSR handler for Vercel (Node).
 * Per-request session + load context; commits session cookie when mutated.
 */
export default async function handler(request: Request) {
  const env = getHydrogenEnv();
  const session = await AppSession.init(request, [env.SESSION_SECRET]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    session,
    i18n: {language: 'EN', country: 'US'},
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  const handleRequest = createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
    getLoadContext: () => hydrogenContext,
  });

  const response = await handleRequest(request);

  if (session.isPending) {
    response.headers.append('Set-Cookie', await session.commit());
  }

  return response;
}
