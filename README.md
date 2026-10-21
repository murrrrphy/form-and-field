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

## Code organization

- `src/main.jsx`: React entry point and global stylesheet import.
- `src/App.jsx`: Page composition and coordination between the catalog, product dialog and bag.
- `src/components/`: Header, product cards/catalog/details, shopping bag, modal, and editorial sections. Components own only their local display state.
- `src/hooks/`: Cart persistence (`useCart`), catalog filters/favorites (`useCatalog`), and timed notifications (`useToast`).
- `src/data/products.js`: Mock product records and category definitions.
- `src/utils/`: Pure cart calculations, filtering/sorting, and currency formatting. Cart quantities, shipping fees and thresholds are defined here.
- `src/styles/`: Readable CSS grouped by purpose. `src/styles.css` preserves the import order; responsive overrides are loaded last.
- `tests/store.test.js`: Regression tests for shopping rules and existing saved-cart compatibility.

The stored cart schema (`ff-cart`, with `id`, `qty`, and `color` fields) remains compatible with earlier versions. No state library or backend is needed: shared state lives in hooks called by `App`, while forms and dialogs keep their own local state.

## Maintenance checks

```sh
npm run format        # Format source and configuration
npm run format:check  # Check formatting without modifying files
npm test              # Run shopping logic regression tests
npm run build         # Build the production bundle
```

GitHub Actions runs formatting checks and tests before deploying. To add a product, edit `src/data/products.js`; to change shipping rules, edit the constants in `src/utils/cart.js`.
