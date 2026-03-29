import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler} from 'react-router';

/**
 * Phase 1 server entry — no Shopify/Hydrogen context.
 * Uses React Router's createRequestHandler directly.
 * @vercel/react-router's vercelPreset() wraps this into a Vercel serverless function.
 */
const handler = createRequestHandler(serverBuild);

export default handler;
