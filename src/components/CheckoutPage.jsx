/**
 * SHYNE Checkout Page
 * ─────────────────────────────────────────────────────────────────────────────
 * STRIPE INTEGRATION NOTES
 * ─────────────────────────────────────────────────────────────────────────────
 * Current state: The checkout form uses Stripe.js for real card tokenisation.
 * When VITE_STRIPE_PUBLISHABLE_KEY is set in .env:
 *   • A real Stripe CardElement renders — no fake inputs.
 *   • stripe.createPaymentMethod() makes a live API call to Stripe.
 *   • Apple Pay / Google Pay buttons appear automatically where the browser supports them.
 *
 * To enable actual charging, add a backend endpoint /api/create-payment-intent
 * and uncomment the backend call section in handlePay() below.
 *
 * Backend example (Node / Netlify Function):
 *   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 *   const pi = await stripe.paymentIntents.create({
 *     amount: Math.round(total * 100), currency: 'gbp',
 *     payment_method: paymentMethodId, confirm: true,
 *     automatic_payment_methods: { enabled: true },
 *   });
 *   return { clientSecret: pi.client_secret };
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../store/CartContext';
import CartBadge from './CartBadge';
import Footer from './Footer';

/* ── Stripe setup ─────────────────────────────────────────────── */
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

const CARD_STYLE = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#3d3b37',
      fontFamily: '"DM Sans", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '14px',
      letterSpacing: '0.01em',
      '::placeholder': { color: '#b8b4ae' },
    },
    invalid: { color: '#b4502f', iconColor: '#b4502f' },
  },
};

/* ── Shipping options ─────────────────────────────────────────── */
const SHIPPING = [
  { id: 'standard', label: 'Standard Delivery', sub: '2–5 working days', price: 3.99 },
  { id: 'nextday',  label: 'Next Day Delivery',  sub: 'Order before 2pm',  price: 5.99 },
];
const fmt = (n) => `£${Number(n).toFixed(2)}`;

/* ── Helpers ──────────────────────────────────────────────────── */
function TopBanner() {
  return (
    <div className="px-4 md:px-6 pt-3 pb-[15px] bg-white">
      <div className="flex items-center justify-center text-center px-4"
        style={{ backgroundColor: '#f1f0ed', borderRadius: '0.625rem', minHeight: '2.5rem', padding: '0.625rem 0.9375rem' }}>
        <p className="uppercase text-[12px] font-bold leading-[0.875rem] text-[#67645e] m-0">
          Free UK Shipping on Orders Over £45
        </p>
      </div>
    </div>
  );
}

function PageHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7]/90 backdrop-blur-md border-b border-[#e8e3dc]/70">
      <div className="px-6 md:px-10 py-4">
        <nav className="flex items-center justify-between">
          <div className="hidden md:flex items-center gap-9">
            {[['Shop', '/#shop'], ['About', '/about']].map(([label, href]) => (
              <a key={label} href={href}
                className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e] hover:text-[#3d3b37] transition-colors">
                {label}
              </a>
            ))}
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1">
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
          </button>
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/SHYNE.png BLACK.png" alt="SHYNE" className="h-[40px] md:h-[52px] w-auto object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-6"><CartBadge /></div>
          <div className="md:hidden"><CartBadge /></div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="flex flex-col gap-5 pt-6 pb-2">
                {[['Shop', '/#shop'], ['About', '/about']].map(([label, href]) => (
                  <a key={label} href={href} className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e]">{label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.12em] uppercase font-semibold text-[#67645e] mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-[#b4502f] mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full rounded-lg border px-4 py-3 text-[14px] text-[#3d3b37] bg-white placeholder:text-[#b8b4ae] outline-none transition-colors focus:border-[#3d3b37] ${
    err ? 'border-[#b4502f]' : 'border-[#dcd6cd]'
  }`;

/* ── Inner checkout form (needs useStripe / useElements) ─────── */
function InnerForm({ items, subtotal, clearCart }) {
  const stripe   = useStripe();
  const elements = useElements();
  const DEMO     = !stripe; // no key configured → demo mode

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postcode: '', country: 'GB',
  });
  const [errors,      setErrors]      = useState({});
  const [shipping,    setShipping]    = useState('standard');
  const [processing,  setProcessing]  = useState(false);
  const [paymentErr,  setPaymentErr]  = useState('');
  const [cardComplete,   setCardComplete]   = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  // Ref so the paymentmethod handler always reads the latest state (no stale closure)
  const latestRef = useRef({});

  const shippingPrice = (() => {
    if (subtotal >= 45) return 0;
    return SHIPPING.find(s => s.id === shipping)?.price ?? 3.99;
  })();
  const total = subtotal + shippingPrice;

  // Keep the ref up to date so the paymentmethod handler is never stale
  latestRef.current = { items, subtotal, shippingPrice, total, shipping, form };

  // Initialise the Stripe Payment Request (Apple Pay / Google Pay) once
  useEffect(() => {
    if (!stripe) return;

    const { items, subtotal, shippingPrice, total, shipping } = latestRef.current;
    const shippingLabel = SHIPPING.find(s => s.id === shipping)?.label || 'Standard Delivery';

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'SHYNE Order',
        amount: Math.round(total * 100),
        pending: false,
      },
      displayItems: [
        {
          label: 'Subtotal',
          amount: Math.round(subtotal * 100),
        },
        {
          label: shippingLabel,
          amount: Math.round(shippingPrice * 100),
          pending: false,
        },
      ],
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestPayerCountry: true,
      requestShipping: false,
      requestBillingAddress: true,
    });

    pr.canMakePayment().then(result => {
      console.log('Apple Pay available:', result);
      if (result) setPaymentRequest(pr);
    });

    pr.on('paymentmethod', async (e) => {
      setProcessing(true);
      try {
        const { items, subtotal, shippingPrice, total, shipping, form } = latestRef.current;

        // 1. Create PaymentIntent on backend
        const piRes = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({ slug: i.slug, quantity: i.quantity })),
            shipping,
          }),
        });
        const piData = await piRes.json();

        if (!piRes.ok || piData.error) {
          console.error('PaymentIntent creation failed:', piData.error);
          e.complete('fail');
          setPaymentErr(piData.error || 'Failed to create payment.');
          setProcessing(false);
          return;
        }

        const clientSecret = piData.clientSecret;
        console.log('PaymentIntent created:', clientSecret);

        // 2. Confirm payment with the token from Apple Pay
        const { error: confirmError, paymentIntent } = await stripe.handleCardPayment(clientSecret, e.paymentMethod);

        if (confirmError) {
          console.error('Payment confirmation error:', confirmError);
          e.complete('fail');
          setPaymentErr(confirmError.message || 'Payment confirmation failed.');
          setProcessing(false);
          return;
        }

        console.log('PaymentIntent status:', paymentIntent?.status);

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          console.error('Payment not succeeded. Status:', paymentIntent?.status);
          e.complete('fail');
          setPaymentErr('Payment was not confirmed. Status: ' + paymentIntent?.status);
          setProcessing(false);
          return;
        }

        // 3. Payment succeeded - record order
        console.log('Payment succeeded, recording order...');
        try {
          await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: e.payerName || form.fullName,
              email: e.payerEmail || form.email,
              phone: e.payerPhone || form.phone,
              address: e.payerAddress?.addressLine?.[0] || form.address,
              city: e.payerAddress?.city || form.city,
              postcode: e.payerAddress?.postalCode || form.postcode,
              country: e.payerAddress?.country || form.country || 'GB',
              items: items,
              subtotal: subtotal,
              shippingPrice: shippingPrice,
              total: total,
              shippingMethod: SHIPPING.find(s => s.id === shipping)?.label,
              timestamp: new Date().toISOString(),
            }),
          });
          console.log('Order recorded successfully');
        } catch (orderErr) {
          console.error('Order sync error:', orderErr);
          // Continue anyway - payment succeeded even if order sync failed
        }

        e.complete('success');
        clearCart();
        window.location.href = '/payment/success';

      } catch (err) {
        console.error('Apple Pay error:', err);
        e.complete('fail');
        setPaymentErr('Payment processing failed: ' + err.message);
        setProcessing(false);
      }
    });
  }, [stripe, clearCart]);

  // Keep the Payment Request total in sync when shipping method changes
  useEffect(() => {
    if (!paymentRequest) return;
    paymentRequest.update({ total: { label: 'SHYNE Order', amount: Math.round(total * 100) } });
  }, [paymentRequest, total]);

  const set = useCallback((k) => (e) => setForm(f => ({ ...f, [k]: e.target.value })), []);

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.postcode.trim()) e.postcode = 'Postcode is required';
    if (!DEMO && !cardComplete) e.card = 'Please complete your card details';
    return e;
  }

  async function handlePay(e) {
    e.preventDefault();
    setPaymentErr('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setProcessing(true);

    try {
      let paymentMethodId = null;

      if (!DEMO && stripe && elements) {
        /* ── REAL STRIPE FLOW (PaymentIntent + 3D Secure) ──────── */
        // 1. Ask the server to create a PaymentIntent.
        //    Send only slugs + quantities — the server computes the real total
        //    from its own price list, so the charge can't be tampered with.
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({ slug: i.slug, quantity: i.quantity })),
            shipping,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setPaymentErr(data.error || 'Could not start payment. Please try again.');
          setProcessing(false);
          return;
        }

        // 2. Confirm the card payment (Stripe handles any 3D Secure step)
        const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: form.fullName,
              email: form.email,
              phone: form.phone,
              address: { line1: form.address, city: form.city, postal_code: form.postcode, country: form.country },
            },
          },
        });

        if (error) { setPaymentErr(error.message); setProcessing(false); return; }
        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          window.location.href = '/payment/cancel?reason=payment-failed';
          return;
        }
        paymentMethodId = paymentIntent.id;
      } else {
        /* ── DEMO MODE — no charge ─────────────────────────────── */
        await new Promise(r => setTimeout(r, 1800));
      }

      // Sync order to HubSpot before redirecting
      try {
        await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            postcode: form.postcode,
            country: form.country,
            items: items,
            subtotal: subtotal,
            shippingPrice: shippingPrice,
            total: total,
            shippingMethod: SHIPPING.find(s => s.id === shipping)?.label,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (orderError) {
        console.error('Error syncing order to HubSpot:', orderError);
        // Continue anyway - don't block checkout on CRM sync
      }

      sessionStorage.setItem('shyne_last_order', JSON.stringify({
        items, subtotal, shippingPrice, total,
        shippingMethod: SHIPPING.find(s => s.id === shipping)?.label,
        form: { name: form.fullName, email: form.email, address: form.address, city: form.city, postcode: form.postcode, country: form.country },
        paymentMethodId,
        demo: DEMO,
      }));

      clearCart();
      window.location.href = '/payment/success';

    } catch (err) {
      setPaymentErr('Something went wrong. Please try again.');
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handlePay} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 pt-8">

        {/* ── LEFT: form ── */}
        <div className="space-y-8">

          {/* DEMO banner */}
          {DEMO && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-[12px] text-amber-800">
              <strong>Demo mode</strong> — Add <code className="font-mono text-[11px] bg-amber-100 px-1 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code> to <code className="font-mono text-[11px] bg-amber-100 px-1 rounded">.env</code> to enable real Stripe payments. No charge will be made.
            </div>
          )}

          {/* Contact information */}
          <div>
            <h2 className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#3d3b37] pb-4 border-b border-[#e8e3dc] mb-5">
              Contact Information
            </h2>
            <div className="space-y-4">
              <Field label="Full Name *" error={errors.fullName}>
                <input value={form.fullName} onChange={set('fullName')} placeholder="Jane Smith"
                  className={inputCls(errors.fullName)} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com"
                    className={inputCls(errors.email)} />
                </Field>
                <Field label="Phone Number *" error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+44 7700 000000"
                    className={inputCls(errors.phone)} />
                </Field>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div>
            <h2 className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#3d3b37] pb-4 border-b border-[#e8e3dc] mb-5">
              Delivery Address
            </h2>
            <div className="space-y-4">
              <Field label="Address *" error={errors.address}>
                <input value={form.address} onChange={set('address')} placeholder="123 Glow Street"
                  className={inputCls(errors.address)} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="City *" error={errors.city}>
                  <input value={form.city} onChange={set('city')} placeholder="London"
                    className={inputCls(errors.city)} />
                </Field>
                <Field label="Postcode *" error={errors.postcode}>
                  <input value={form.postcode} onChange={set('postcode')} placeholder="SW1A 1AA"
                    className={inputCls(errors.postcode)} />
                </Field>
              </div>
              <Field label="Country">
                <select value={form.country} onChange={set('country')} className={inputCls(false)}>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="NL">Netherlands</option>
                  <option value="AU">Australia</option>
                  <option value="AE">UAE</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <h2 className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#3d3b37] pb-4 border-b border-[#e8e3dc] mb-5">
              Shipping Method
            </h2>
            <div className="space-y-3">
              {SHIPPING.map(opt => {
                const isFree = subtotal >= 45 && opt.id === 'standard';
                const displayPrice = isFree ? 'FREE' : fmt(opt.price);
                return (
                  <label key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                      shipping === opt.id ? 'border-[#3d3b37] bg-[#f0ede8]' : 'border-[#dcd6cd] hover:border-[#84827e]'
                    }`}>
                    <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)} className="accent-[#3d3b37]" />
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#3d3b37]">{opt.label}</p>
                      <p className="text-[11px] text-[#84827e]">{opt.sub}</p>
                    </div>
                    <span className={`text-[13px] font-semibold ${isFree ? 'text-[#b4502f]' : 'text-[#3d3b37]'}`}>
                      {displayPrice}
                    </span>
                  </label>
                );
              })}
              {subtotal < 45 && (
                <p className="text-[11px] text-[#84827e] px-1">
                  💡 Add {fmt(45 - subtotal)} more for free standard shipping
                </p>
              )}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#3d3b37] pb-4 border-b border-[#e8e3dc] mb-5">
              Payment
            </h2>

            {!DEMO ? (
              <div>
                {/* Apple Pay / Google Pay — shown automatically when browser supports it */}
                {paymentRequest ? (
                  <>
                    <div className="rounded-xl overflow-hidden mb-4">
                      <PaymentRequestButtonElement
                        options={{
                          paymentRequest,
                          style: {
                            paymentRequestButton: { type: 'default', theme: 'dark', height: '48px' },
                          },
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-[#dcd6cd]" />
                      <span className="text-[11px] text-[#84827e] uppercase tracking-[0.1em]">or pay with card</span>
                      <div className="flex-1 h-px bg-[#dcd6cd]" />
                    </div>
                  </>
                ) : (
                  <p className="text-[11px] text-[#84827e] mb-4 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    Apple Pay & Google Pay activate automatically on HTTPS with a saved wallet
                  </p>
                )}

                {/* Stripe CardElement */}
                <div className={`rounded-lg border px-4 py-3.5 transition-colors ${errors.card ? 'border-[#b4502f]' : 'border-[#dcd6cd]'}`}>
                  <CardElement
                    options={CARD_STYLE}
                    onChange={(e) => setCardComplete(e.complete)}
                  />
                </div>
                {errors.card && <p className="text-[11px] text-[#b4502f] mt-1">{errors.card}</p>}
                <p className="text-[11px] text-[#9c9a96] mt-2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
                  </svg>
                  Secured by Stripe — your card details are encrypted
                </p>
              </div>
            ) : (
              /* Demo card form */
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Card Number">
                    <input placeholder="4242 4242 4242 4242" className={inputCls(false)}
                      maxLength={19} onChange={() => {}} />
                  </Field>
                  <Field label="Name on Card">
                    <input placeholder="Jane Smith" className={inputCls(false)} onChange={() => {}} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry">
                    <input placeholder="MM / YY" className={inputCls(false)} maxLength={7} onChange={() => {}} />
                  </Field>
                  <Field label="CVC">
                    <input placeholder="123" className={inputCls(false)} maxLength={4} onChange={() => {}} />
                  </Field>
                </div>
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Demo mode — these fields are for visual reference only. Configure Stripe to enable real payments.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: order summary ── */}
        <div className="lg:sticky lg:top-[88px] self-start">
          <div className="rounded-2xl bg-[#f0ede8] p-6 md:p-8">
            <h2 className="text-[14px] tracking-[0.16em] uppercase font-semibold text-[#3d3b37] mb-5">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 pb-4 border-b border-[#dcd6cd]">
              {items.map(item => (
                <div key={item.slug} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#e8e3dc] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#3d3b37] truncate uppercase tracking-[0.03em]">{item.name}</p>
                    <p className="text-[11px] text-[#84827e]">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[13px] font-medium text-[#3d3b37] flex-shrink-0">
                    {fmt(item.salePrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <dl className="space-y-2.5 pt-4">
              <div className="flex justify-between">
                <dt className="text-[13px] text-[#67645e]">Subtotal</dt>
                <dd className="text-[13px] font-medium text-[#3d3b37]">{fmt(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[13px] text-[#67645e]">Shipping</dt>
                <dd className="text-[13px] font-medium text-[#3d3b37]">
                  {shippingPrice === 0
                    ? <span className="text-[#b4502f] font-semibold">Free</span>
                    : fmt(shippingPrice)}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#dcd6cd]">
                <dt className="text-[16px] font-semibold text-[#3d3b37]">Total</dt>
                <dd className="text-[16px] font-semibold text-[#3d3b37]">{fmt(total)}</dd>
              </div>
            </dl>

            {/* Pay Now */}
            {paymentErr && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-[12px] text-red-700">
                {paymentErr}
              </div>
            )}

            <button type="submit" disabled={processing}
              className={`mt-5 w-full flex items-center justify-center gap-2 rounded-lg py-4 text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors duration-300 ${
                processing
                  ? 'bg-[#84827e] text-white cursor-not-allowed'
                  : 'bg-[#3d3b37] text-white hover:bg-[#2c2a27]'
              }`}>
              {processing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing…
                </>
              ) : (
                <>
                  {DEMO ? 'Place Test Order' : 'Pay Now'} — {fmt(total)}
                </>
              )}
            </button>

            <p className="text-[10px] text-[#9c9a96] text-center mt-3">
              By placing this order you agree to our{' '}
              <a href="#" className="underline hover:text-[#67645e]">Terms of Service</a>
            </p>
          </div>

          <a href="/cart"
            className="flex items-center justify-center gap-2 mt-4 text-[11px] tracking-[0.1em] uppercase text-[#67645e] hover:text-[#3d3b37] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Back to Bag
          </a>
        </div>
      </div>
    </form>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const { items, subtotal, clearCart, itemCount } = useCart();

  // Redirect to cart if empty
  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white text-[#3d3b37]">
        <TopBanner />
        <PageHeader />
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <h1 className="text-[24px] font-light mb-4">Your bag is empty</h1>
          <p className="text-[14px] text-[#84827e] mb-8">Add some products before checking out.</p>
          <a href="/#shop"
            className="inline-flex items-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:bg-[#2c2a27] transition-colors">
            Shop SHYNE →
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <TopBanner />
      <PageHeader />

      <main className="px-4 md:px-6 pb-16">
        <div className="pt-8 pb-6 border-b border-[#e8e3dc]">
          <h1 className="text-[28px] md:text-[36px] font-light">Checkout</h1>
        </div>

        {/* Wrap in Elements — no-op when stripePromise is null */}
        <Elements stripe={stripePromise}>
          <InnerForm items={items} subtotal={subtotal} clearCart={clearCart} />
        </Elements>
      </main>

      <Footer />
    </div>
  );
}
