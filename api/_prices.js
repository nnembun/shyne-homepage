/**
 * Authoritative server-side pricing for SHYNE.
 * The client cart is NEVER trusted for amounts — the server recomputes the
 * order total from these prices so a tampered request can't change the charge.
 *
 * SINGLE SOURCE OF TRUTH: prices are derived directly from the same product
 * data the storefront renders (src/data/products.jsx → each product's
 * salePrice). Update a price there once and both the site and this server
 * stay in sync automatically — no duplication, no drift.
 *
 * Underscore prefix = not exposed as a Vercel route.
 */
// slug → unit price actually charged (the sale price), in GBP.
// Imported from the shared canonical source (plain .js, Node-safe).
import { PRICES } from '../src/data/prices.js';
export { PRICES };

// Shipping rules — mirror the checkout UI
const SHIPPING = { standard: 3.99, nextday: 5.99 };
const FREE_SHIPPING_THRESHOLD = 45;

/**
 * Recompute the order total authoritatively.
 * @param {Array<{slug:string, quantity:number}>} items
 * @param {string} shipping  'standard' | 'nextday'
 * @returns {{ ok:boolean, error?:string, subtotal:number, shippingCost:number, total:number, amount:number }}
 */
export function computeOrder(items, shipping = 'standard') {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'Cart is empty.' };
  }

  let subtotal = 0;
  for (const item of items) {
    const unit = PRICES[item?.slug];
    const qty = Number(item?.quantity);
    if (unit === undefined) return { ok: false, error: `Unknown product: ${item?.slug}` };
    if (!Number.isInteger(qty) || qty < 1 || qty > 99) return { ok: false, error: 'Invalid quantity.' };
    subtotal += unit * qty;
  }

  const methodCost = SHIPPING[shipping] ?? SHIPPING.standard;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : methodCost;
  const total = subtotal + shippingCost;

  // round to pence to avoid floating-point drift, then convert to integer pence
  const totalRounded = Math.round(total * 100) / 100;
  return {
    ok: true,
    subtotal: Math.round(subtotal * 100) / 100,
    shippingCost,
    total: totalRounded,
    amount: Math.round(totalRounded * 100), // integer pence for Stripe
  };
}
