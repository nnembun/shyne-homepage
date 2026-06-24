/**
 * Creates a Stripe PaymentIntent and returns its client_secret.
 * The frontend then confirms the card payment client-side (handles 3D Secure).
 *
 * SECURITY:
 *  - STRIPE_SECRET_KEY lives only in Vercel env vars — never in the client
 *    bundle, never in git.
 *  - The charge amount is recomputed SERVER-SIDE from an authoritative price
 *    list (see _prices.js). The client only sends product slugs + quantities,
 *    so a tampered request cannot change what gets charged.
 */
import Stripe from 'stripe';
import { computeOrder } from './_prices.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!stripe) {
    return res.status(500).json({ error: 'Payments are not configured on the server.' });
  }

  const { items, shipping = 'standard' } = req.body || {};

  // Authoritative server-side total — client-sent amounts are ignored.
  const order = computeOrder(items, shipping);
  if (!order.ok) {
    return res.status(400).json({ error: order.error });
  }
  if (order.amount < 50) {
    return res.status(400).json({ error: 'Order total is below the minimum.' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.amount, // integer pence, computed server-side
      currency: 'gbp',
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: {
        subtotal: String(order.subtotal),
        shipping_cost: String(order.shippingCost),
        shipping_method: shipping,
      },
    });
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      total: order.total, // so the client can sanity-check / display
    });
  } catch (err) {
    console.error('Stripe PaymentIntent error:', err.message);
    return res.status(500).json({ error: err.message || 'Could not initiate payment.' });
  }
}
