/**
 * Stripe webhook — listens for checkout.session.completed to capture full order data
 *
 * Stripe signs every event; we verify the signature with STRIPE_WEBHOOK_SECRET
 * so no one can forge a "payment succeeded" call. This is independent of the
 * browser, so fulfillment is reliable even if the customer closes the tab.
 *
 * SETUP (one-time, in your Stripe Dashboard):
 *   1. Developers → Webhooks → Add endpoint
 *   2. URL:  https://www.shyneoils.com/api/stripe-webhook
 *   3. Events: checkout.session.completed
 *   4. Copy the "Signing secret" (whsec_...) → add as STRIPE_WEBHOOK_SECRET in
 *      Vercel env vars → redeploy.
 */
import Stripe from 'stripe';
import { pushOrderToGHL } from './_ghl.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe signature verification needs the raw, unparsed body.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!stripe || !webhookSecret) {
    return res.status(500).json({ error: 'Webhook not configured.' });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      // Only process if payment was successful
      if (session.payment_status !== 'paid') {
        console.log(`⚠️ Checkout session ${session.id} not paid yet`);
        break;
      }

      console.log(`✅ Checkout session completed: ${session.id}`);

      // Retrieve full session with expanded customer and shipping details
      try {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['customer', 'customer_details', 'shipping_details', 'line_items'],
        });

        const shippingAddress = fullSession.shipping_details?.address || {};
        const customerDetails = fullSession.customer_details || {};

        console.log('📍 Shipping Address received:');
        console.log('  Line 1:', shippingAddress.line1);
        console.log('  Line 2:', shippingAddress.line2);
        console.log('  City:', shippingAddress.city);
        console.log('  State/County:', shippingAddress.state);
        console.log('  Postal Code:', shippingAddress.postal_code);
        console.log('  Country:', shippingAddress.country);

        // Parse metadata
        const metadata = fullSession.metadata || {};
        const items = metadata.order_items ? JSON.parse(metadata.order_items) : [];

        // Build order data with full shipping address
        const orderData = {
          fullName: customerDetails.name || 'Customer',
          email: customerDetails.email || '',
          phone: customerDetails.phone || '',
          // Shipping address
          address: shippingAddress.line1 || '',
          address2: shippingAddress.line2 || '',
          city: shippingAddress.city || '',
          county: shippingAddress.state || '',
          postcode: shippingAddress.postal_code || '',
          country: shippingAddress.country || 'GB',
          // Order details
          items: items,
          subtotal: parseFloat(metadata.subtotal || 0),
          shippingPrice: parseFloat(metadata.shipping_cost || 0),
          total: fullSession.amount_total / 100,
          shippingMethod: metadata.shipping_method || 'standard',
          paymentIntentId: fullSession.payment_intent,
        };

        console.log('📦 Order data ready for GHL:', {
          email: orderData.email,
          fullName: orderData.fullName,
          phone: orderData.phone,
          address: orderData.address,
          city: orderData.city,
          postcode: orderData.postcode,
          country: orderData.country,
        });

        // Push to GHL
        const ghlResult = await pushOrderToGHL(orderData);
        if (ghlResult.ok) {
          console.log(`✅ Order pushed to GHL: ${ghlResult.contactId}`);
        } else {
          console.error(`❌ Failed to push to GHL: ${ghlResult.error}`);
        }
      } catch (err) {
        console.error('❌ Error processing checkout session:', err.message);
      }

      break;
    }

    default:
      // Other event types are acknowledged but ignored.
      break;
  }

  return res.status(200).json({ received: true });
}
