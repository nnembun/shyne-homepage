/**
 * Handle successful Stripe Checkout
 * Called when user returns from Stripe Checkout with session_id
 */
import Stripe from 'stripe';
import { pushOrderToGHL } from './_ghl.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!stripe) {
    return res.status(500).json({ error: 'Payments not configured.' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'customer'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    console.log(`✅ Payment successful: ${session.id}`);
    console.log(`Amount: ${session.amount_total / 100} ${session.currency.toUpperCase()}`);

    // Extract order info from session
    const { email, customer_details } = session;
    const items = session.metadata?.order_items ? JSON.parse(session.metadata.order_items) : [];
    const shippingMethod = session.metadata?.shipping_method || 'standard';

    const orderData = {
      fullName: customer_details?.name || 'Customer',
      email: customer_details?.email || email || '',
      phone: customer_details?.phone || '',
      address: customer_details?.address?.line1 || '',
      city: customer_details?.address?.city || '',
      postcode: customer_details?.address?.postal_code || '',
      country: customer_details?.address?.country || 'GB',
      items: items,
      subtotal: parseFloat(session.metadata?.subtotal || 0),
      shippingPrice: parseFloat(session.metadata?.shipping_cost || 0),
      total: session.amount_total / 100,
      shippingMethod: shippingMethod,
      paymentIntentId: session.payment_intent,
    };

    // Push to GHL
    const ghlResult = await pushOrderToGHL(orderData);
    console.log('GHL result:', ghlResult);

    return res.status(200).json({
      success: true,
      message: 'Order processed successfully',
      sessionId: session.id,
      paymentIntentId: session.payment_intent,
      email: orderData.email,
      total: orderData.total,
    });
  } catch (err) {
    console.error('❌ Checkout success handler error:', err.message);
    return res.status(500).json({ error: err.message || 'Could not process order' });
  }
}
