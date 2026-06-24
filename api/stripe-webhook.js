/**
 * Stripe webhook — the source of truth for whether a payment really succeeded.
 *
 * Stripe signs every event; we verify the signature with STRIPE_WEBHOOK_SECRET
 * so no one can forge a "payment succeeded" call. This is independent of the
 * browser, so fulfillment is reliable even if the customer closes the tab.
 *
 * SETUP (one-time, in your Stripe Dashboard):
 *   1. Developers → Webhooks → Add endpoint
 *   2. URL:  https://shyne-homepage.vercel.app/api/stripe-webhook
 *   3. Events: payment_intent.succeeded, payment_intent.payment_failed
 *   4. Copy the "Signing secret" (whsec_...) → add as STRIPE_WEBHOOK_SECRET in
 *      Vercel env vars → redeploy.
 */
import Stripe from 'stripe';

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
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      console.log(`✅ Payment confirmed: ${pi.id} — ${pi.amount} ${pi.currency}`);
      // ── FULFILLMENT HOOK ──────────────────────────────────────────────
      // Payment is genuinely confirmed here. Safe place to: mark the order
      // paid in a DB, trigger a confirmation email, push to HubSpot, etc.
      // pi.metadata contains subtotal / shipping_cost / shipping_method.
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      console.warn(`❌ Payment failed: ${pi.id} — ${pi.last_payment_error?.message || 'unknown'}`);
      break;
    }
    default:
      // Other event types are acknowledged but ignored.
      break;
  }

  return res.status(200).json({ received: true });
}
