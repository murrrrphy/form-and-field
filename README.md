# Form & Field

A responsive, English-language lifestyle storefront built with React 19, Vite, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Build with `npm run build`; serve that build with `npm run preview`.

## Demo features

- Eight mock products across four categories
- Search, category filters, under-$50 filter, favorites, and sorting
- Product details, color choices, quantity selection, quick add
- Shopping bag with quantity changes, removal, shipping estimate, and localStorage persistence
- Explicitly simulated checkout and newsletter signup (no backend or payment)
- Responsive layouts, keyboard focus indicators, modal focus trapping, Escape to close, reduced-motion support

Prices use USD. Shipping is $8 below $100 and free at or above $100. Product photography is illustrative and loaded from Unsplash; fonts load from Google Fonts. These assets require an internet connection. All inventory, reviews, and brand content are fictional demo data.

## GitHub Pages

This project is published at https://murrrrphy.github.io/form-and-field/.
Pushes to `main` trigger `.github/workflows/deploy.yml`, which installs locked dependencies, builds the app and deploys `dist` to GitHub Pages. In repository Settings → Pages, the source is GitHub Actions.

The Vite base path is `/form-and-field/` in GitHub Actions and `/` during local development.
