/**
 * Creates a Stripe Payment Link
 * Redirects user to payment link
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
    // Convert items to Stripe line items for payment link
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round((item.salePrice ?? item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // Create payment link with shipping options
    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'CZ', 'PL', 'HU', 'RO', 'BG', 'HR', 'SL', 'SK', 'LT', 'LV', 'EE', 'JP', 'KR', 'CN', 'SG', 'HK', 'IN', 'BR', 'MX', 'NZ'],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: order.shippingCost > 0 ? Math.round(order.shippingCost * 100) : 0,
              currency: 'gbp',
            },
            display_name: order.shippingCost > 0 ? 'Standard Delivery (UK)' : 'Free Delivery',
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 750, // £7.50 in pence
              currency: 'gbp',
            },
            display_name: 'International Shipping',
          },
        },
      ],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${DOMAIN}/payment/success`,
        },
      },
    });

    console.log(`✅ Payment link created: ${paymentLink.url}`);

    return res.status(200).json({
      url: paymentLink.url,
    });
  } catch (err) {
    console.error('❌ Payment link error:', err.message);
    return res.status(500).json({ error: err.message || 'Could not create payment link.' });
  }
}
