import type {HydrogenSession} from '@shopify/hydrogen';
import {
  createCookieSessionStorage,
  type Session,
  type SessionStorage,
} from 'react-router';

/**
 * Cookie session compatible with Hydrogen createHydrogenContext.
 * @see https://shopify.dev/docs/api/hydrogen/latest/utilities/createhydrogencontext
 */
export class AppSession implements HydrogenSession {
  public isPending = false;

  constructor(
    private sessionStorage: SessionStorage,
    private cookieSession: Session,
  ) {}

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'hydrogen_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
        secure: process.env.NODE_ENV === 'production',
      },
    });
    const cookieSession = await storage.getSession(
      request.headers.get('Cookie'),
    );
    return new this(storage, cookieSession);
  }

  get(key: string) {
    return this.cookieSession.get(key);
  }

  flash(key: string, value: unknown) {
    this.isPending = true;
    this.cookieSession.flash(key, value);
  }

  unset(key: string) {
    this.isPending = true;
    this.cookieSession.unset(key);
  }

  set(key: string, value: unknown) {
    this.isPending = true;
    this.cookieSession.set(key, value);
  }

  destroy() {
    return this.sessionStorage.destroySession(this.cookieSession);
  }

  commit() {
    this.isPending = false;
    return this.sessionStorage.commitSession(this.cookieSession);
  }
}
