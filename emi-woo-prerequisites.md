# Emi Woo — Prerequisites Checklist
*Everything that needs to exist before Claude Code starts building*

---

## 1. Local machine

**Node.js 18+**
```bash
node --version   # must return 18.x or higher
```
If not: download from [nodejs.org](https://nodejs.org) — choose the LTS version.

**pnpm**
```bash
npm install -g pnpm
```

**Shopify CLI (authenticated)**
```bash
shopify auth login
```
Opens browser — log in with your Shopify account.

**Git with GitHub SSH**
```bash
ssh -T git@github.com   # should say "Hi [username]! You've successfully authenticated"
```
If not set up: [GitHub SSH setup guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## 2. Shopify Dev MCP — add to Claude Code config

Open (or create) this file on your Mac:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Add:
```json
{
  "mcpServers": {
    "shopify-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"]
    }
  }
}
```

Restart Claude Code → verify it shows "running" in Settings → Developer.

---

## 3. GitHub — create a private repo

- Go to [github.com](https://github.com) → New repository
- Name: `emiwoo` ✅ already created
- Visibility: **Private**
- SSH URL: `git@github.com:[your-username]/emiwoo.git`

---

## 4. Vercel — already connected ✓

Your Vercel account (`hamishwoodrow-8089's projects`) is already connected. No action needed here. Once the GitHub repo exists, the Vercel project will be created and configured automatically.

Deployment flow:
- Push to any branch → unique preview URL generated automatically
- Push to `main` → production deployment
- All handled from this session — nothing to configure manually

---

## 5. Shopify — Dev Store + Storefront API token

**Step A — You should already have the Dev Store**
You created `emi-woo-dev` earlier in the Shopify Dev Dashboard (`dev.shopify.com` → Dev stores). If not yet created, do that first.

**Step B — Get the Storefront API token via the Headless channel**

Open the Dev Store admin (`emi-woo-dev.myshopify.com/admin`):

1. Left sidebar → **Sales channels** → click **+**
2. Search **"Headless"** → install it
3. Inside the Headless channel → click **Create storefront**
4. Name it "Emi Woo Hydrogen"
5. Copy the **Public access token** that is automatically generated

> Do NOT use the "Create app" button in the Dev Dashboard — that is for distributable apps, not for this.

Also note your Dev Store domain: `emi-woo-dev.myshopify.com`

---

## 6. Sanity — already in progress ✓

You've already created the Sanity project **Emi Woo** (`uiirktm4`) with dataset `prod`.

Still needed from Sanity:
- Go to [sanity.io/manage](https://sanity.io/manage) → Emi Woo project → **API** → **Tokens** → **Add API Token**
  - Name: `hydrogen-preview`
  - Permissions: **Editor**
  - Copy the token — shown once only
- Generate a preview secret in your terminal:
  ```bash
  openssl rand -hex 32
  ```
  Copy the output.

---

## 7. Mux — create account + API token

Go to [mux.com](https://mux.com) → sign up free (no card required — 5GB included).

Dashboard → **Settings** → **API Access Tokens** → **Generate new token**:
- Environment: **Development**
- Permissions: **Mux Video — Full Access**
- Copy both **Token ID** and **Token Secret** — secret shown once only

---

## 8. `.env` values — have these ready to paste

Claude Code will create the `.env` file. Have these values ready:

```env
# Shopify (from Step 5)
PUBLIC_STOREFRONT_API_TOKEN=       ← public token from Headless channel
PUBLIC_STORE_DOMAIN=               ← emi-woo-dev.myshopify.com

# Sanity (from Step 6)
SANITY_PROJECT_ID=uiirktm4
SANITY_DATASET=prod
SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=                  ← Editor token from sanity.io/manage
SANITY_PREVIEW_SECRET=             ← output of openssl rand -hex 32

# Mux (from Step 7)
MUX_TOKEN_ID=                      ← from mux.com dashboard
MUX_TOKEN_SECRET=                  ← from mux.com dashboard (shown once)
```

Store these in a password manager. Do not commit to git — `.gitignore` handles this automatically.

---

## Final checklist

- [ ] Node 18+ installed
- [ ] pnpm installed globally
- [ ] Shopify CLI installed and `shopify auth login` completed
- [ ] GitHub SSH working
- [ ] Shopify Dev MCP added to Claude Code config, Claude Code restarted
- [ ] Private GitHub repo `emi-woo` created (empty, no README) — share the SSH URL
- [ ] ✅ Vercel connected — nothing to do
- [ ] Dev Store `emi-woo-dev` exists at dev.shopify.com
- [ ] Headless channel installed in Dev Store, storefront created, **public token copied**
- [ ] ✅ Sanity project `uiirktm4` created, dataset `prod` — Editor API token still needed
- [ ] Mux account created, Token ID + Token Secret noted
- [ ] All `.env` values collected and stored securely

---

## At launch (switching from Dev Store to Pro store)

Just two `.env` changes:
1. Install Headless channel on the **Pro store** → create storefront → copy new public token
2. Update `PUBLIC_STOREFRONT_API_TOKEN` and `PUBLIC_STORE_DOMAIN` in `.env` and in Vercel project environment variables
3. Everything else (Sanity, Mux, GitHub, Vercel) stays exactly the same
