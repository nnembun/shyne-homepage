import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CartBadge from './CartBadge';
import Footer from './Footer';

const fmt = (n) => `£${Number(n).toFixed(2)}`;

function PageHeader() {
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
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/SHYNE.png BLACK.png" alt="SHYNE" className="h-[40px] md:h-[52px] w-auto object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-6"><CartBadge /></div>
          <div className="md:hidden"><CartBadge /></div>
        </nav>
      </div>
    </header>
  );
}

export default function PaymentSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('shyne_last_order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  const orderRef = Math.random().toString(36).slice(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <PageHeader />

      <main className="px-4 md:px-6 py-16 max-w-2xl mx-auto">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#f0ede8] flex items-center justify-center">
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-10 h-10 text-[#b4502f]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <motion.path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </motion.svg>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-[32px] md:text-[40px] font-light text-[#3d3b37] mb-2">
            Order Confirmed!
          </h1>
          {order?.form?.name && (
            <p className="text-[15px] text-[#67645e] mb-1">
              Thank you, <strong>{order.form.name}</strong>!
            </p>
          )}
          <p className="text-[14px] text-[#84827e]">
            {order?.demo
              ? 'This was a test order — no payment was processed.'
              : `Your order has been placed and a confirmation will be sent to ${order?.form?.email || 'your email'}.`
            }
          </p>

          {order?.demo && (
            <div className="mt-4 inline-block rounded-full bg-amber-100 text-amber-800 text-[11px] tracking-[0.1em] uppercase font-semibold px-4 py-1.5">
              Demo Order — Configure Stripe for real payments
            </div>
          )}
        </motion.div>

        {/* Order summary card */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl bg-[#f0ede8] p-6 md:p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[12px] tracking-[0.18em] uppercase font-semibold text-[#3d3b37]">
                Order Details
              </h2>
              <span className="text-[11px] tracking-[0.08em] text-[#84827e] font-mono">
                #{orderRef}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 pb-4 border-b border-[#dcd6cd]">
              {order.items?.map(item => (
                <div key={item.slug} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#e8e3dc] flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#3d3b37] uppercase tracking-[0.03em] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#84827e]">Qty {item.quantity}</p>
                  </div>
                  <p className="text-[13px] font-medium text-[#3d3b37]">
                    {fmt(item.salePrice * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <dl className="space-y-2.5 pt-4">
              <div className="flex justify-between">
                <dt className="text-[13px] text-[#67645e]">Subtotal</dt>
                <dd className="text-[13px] text-[#3d3b37]">{fmt(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[13px] text-[#67645e]">{order.shippingMethod || 'Shipping'}</dt>
                <dd className="text-[13px] text-[#3d3b37]">
                  {order.shippingPrice === 0 ? <span className="text-[#b4502f] font-semibold">Free</span> : fmt(order.shippingPrice)}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#dcd6cd]">
                <dt className="text-[15px] font-semibold text-[#3d3b37]">Total Paid</dt>
                <dd className="text-[15px] font-semibold text-[#3d3b37]">{fmt(order.total)}</dd>
              </div>
            </dl>

            {/* Delivery info */}
            {order.form?.address && (
              <div className="mt-5 pt-4 border-t border-[#dcd6cd]">
                <p className="text-[10px] tracking-[0.14em] uppercase font-semibold text-[#84827e] mb-2">Delivering to</p>
                <p className="text-[13px] text-[#67645e] leading-relaxed">
                  {order.form.address}, {order.form.city}, {order.form.postcode}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a href="/#shop"
            className="inline-flex items-center justify-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.14em] uppercase font-semibold rounded-full px-8 py-4 hover:bg-[#2c2a27] transition-colors duration-300">
            Continue Shopping
          </a>
          <a href="/"
            className="inline-flex items-center justify-center gap-2 border border-[#dcd6cd] text-[#67645e] text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors duration-300">
            Back to Home
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
