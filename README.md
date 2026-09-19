# VA Coach
Frontend for the VA Coach application

Generated using Figma

## Local development

```bash
pnpm install
pnpm dev
```

The local Vite server uses `/` as its base path. Create a production build with:

```bash
pnpm build
```

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` installs dependencies with the
locked pnpm dependencies, builds the Vite app, adds a Pages-compatible SPA fallback,
and deploys `dist` using the official GitHub Pages actions.

After merging to `main`, enable Pages in the repository settings:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` or run **Deploy VA Coach to GitHub Pages** from the Actions tab.

The published site is:

<https://max-ss24.github.io/IT-Capstone-VA-Nav-/>

Vite derives the repository base path from the `GITHUB_REPOSITORY` Actions
environment variable, so local development remains rooted at `/`. Set
`VITE_BASE_PATH` explicitly if the app is built for another hosting path.
