/**
 * Confirm payment server-side for Apple Pay
 * This is more reliable than client-side confirmation
 */
import Stripe from 'stripe';

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
    return res.status(500).json({ error: 'Payments not configured.' });
  }

  const { clientSecret, paymentMethodId } = req.body || {};

  if (!clientSecret || !paymentMethodId) {
    return res.status(400).json({ error: 'Missing clientSecret or paymentMethodId' });
  }

  try {
    // Confirm the PaymentIntent with the payment method server-side
    const paymentIntent = await stripe.paymentIntents.confirm(clientSecret, {
      payment_method: paymentMethodId,
    });

    console.log(`✅ Payment confirmed server-side: ${paymentIntent.id} - Status: ${paymentIntent.status}`);

    return res.status(200).json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    });
  } catch (err) {
    console.error('❌ Payment confirmation error:', err.message);
    return res.status(400).json({
      error: err.message || 'Payment confirmation failed',
      code: err.code,
    });
  }
}
