/**
 * Creates a Stripe Checkout Session
 * Redirects user to Stripe-hosted checkout page
 */
import Stripe from 'stripe';
import { computeOrder } from './_prices.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const DOMAIN = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://www.shyneoils.com';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!stripe) {
    return res.status(500).json({ error: 'Payments not configured.' });
  }

  const { items, shipping = 'standard' } = req.body || {};

  // Compute order server-side (secure)
  const order = computeOrder(items, shipping);
  if (!order.ok) {
    return res.status(400).json({ error: order.error });
  }
  if (order.amount < 50) {
    return res.status(400).json({ error: 'Order total is below the minimum.' });
  }

  try {
    // Convert items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round((item.salePrice ?? item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item
    const shippingLabel = ['standard', 'nextday'].includes(shipping)
      ? (shipping === 'standard' ? 'Standard Delivery (2-5 days)' : 'Next Day Delivery')
      : 'Shipping';

    if (order.shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: shippingLabel,
          },
          unit_amount: Math.round(order.shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/payment/cancel`,
      customer_email: undefined,
      metadata: {
        order_items: JSON.stringify(items),
        shipping_method: shipping,
        subtotal: String(order.subtotal),
        shipping_cost: String(order.shippingCost),
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    console.error('❌ Checkout session error:', err.message);
    return res.status(500).json({ error: err.message || 'Could not create checkout session.' });
  }
}
