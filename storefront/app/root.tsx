import {
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  Links,
  Meta,
  useLoaderData,
  useRouteError,
} from 'react-router';
import type {Route} from './+types/root';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import {Aside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';
import {Header} from '~/components/layout/Header';
import {Footer} from '~/components/layout/Footer';
import {SmoothScroll} from '~/components/ui/SmoothScroll';

export function links() {
  return [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous' as const,
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap',
    },
    {rel: 'stylesheet', href: resetStyles},
    {rel: 'stylesheet', href: appStyles},
  ];
}

export async function loader({request, context}: Route.LoaderArgs) {
  const cart =
    context?.cart != null
      ? await context.cart.get().catch(() => null)
      : null;
  return {
    cart: cart ?? null,
    url: request.url,
    /** UTC year so SSR and client agree (avoids rare boundary timezone drift). */
    year: new Date().getUTCFullYear(),
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must be real DOM nodes; Route meta descriptors for charset/viewport were
            not present in SSR HTML while the client rendered them — hydration #418. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function CartAsideRoute() {
  const {cart} = useLoaderData<typeof loader>();
  return (
    <Aside type="cart" heading="Cart">
      <CartMain cart={cart} layout="aside" />
    </Aside>
  );
}

export default function App() {
  return (
    <Aside.Provider>
      <CartAsideRoute />
      <SmoothScroll />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Aside.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{
          background: '#EAE3C9',
          color: '#1a1611',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin: 0,
          gap: '1rem',
        }}
      >
        <h1 style={{fontFamily: 'serif', fontSize: '4rem', margin: 0}}>
          {errorStatus}
        </h1>
        <p style={{color: '#73889C', letterSpacing: '0.15em', fontSize: '0.85rem', textTransform: 'uppercase'}}>
          {errorMessage}
        </p>
      </body>
    </html>
  );
}
