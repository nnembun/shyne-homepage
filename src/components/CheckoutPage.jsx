import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/CartContext';
import CartBadge from './CartBadge';
import Footer from './Footer';

const SHIPPING = [
  { id: 'standard', label: 'Standard Delivery', sub: '2–5 working days', price: 3.99 },
  { id: 'nextday', label: 'Next Day Delivery', sub: 'Order before 2pm', price: 5.99 },
];

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

const fmt = (n) => `£${Number(n).toFixed(2)}`;

export default function CheckoutPage() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const [shipping, setShipping] = useState('standard');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

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

  const shippingPrice = subtotal >= 45 ? 0 : (SHIPPING.find(s => s.id === shipping)?.price ?? 3.99);
  const total = subtotal + shippingPrice;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.slug, quantity: i.quantity, name: i.name, price: i.price, salePrice: i.salePrice, image: i.image })),
          shipping,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to create checkout session');
        setProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <TopBanner />
      <PageHeader />

      <main className="px-4 md:px-6 pb-16">
        <div className="pt-8 pb-6 border-b border-[#e8e3dc]">
          <h1 className="text-[28px] md:text-[36px] font-light">Checkout</h1>
        </div>

        <form onSubmit={handleCheckout} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 pt-8">

            {/* LEFT: Shipping & Summary */}
            <div className="space-y-8">
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
                          onChange={(e) => setShipping(e.target.value)} className="accent-[#3d3b37]" />
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
            </div>

            {/* RIGHT: Order Summary */}
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

                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-[12px] text-red-700">
                    {error}
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
                    <>Proceed to Payment — {fmt(total)}</>
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
      </main>

      <Footer />
    </div>
  );
}
