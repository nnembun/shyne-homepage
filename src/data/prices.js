/**
 * SINGLE SOURCE OF TRUTH for SHYNE sale prices (the amount actually charged).
 *
 * Both the storefront (src/data/products.jsx) and the payment server
 * (api/_prices.js) import this file, so a price can only ever be defined once.
 * Change a value here and the site display AND the server-side charge update
 * together — they can never drift apart.
 *
 * Plain .js (no JSX) so it imports cleanly in both Vite and Node serverless.
 */
export const PRICES = {
  'bare-vanilla-glow-oil': 15.99,
  'golden-hour-glow': 19.99,
  'pearl-veil': 19.99,
  'sunset-glow': 19.99,
  'hydrating-hyaluronic-acid-serum': 19.99,
  'glow-polish-bar': 12.99,
};
