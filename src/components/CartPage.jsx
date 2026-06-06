import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../store/CartContext';
import CartBadge from './CartBadge';
import Footer from './Footer';

const fmt = (n) => `£${Number(n).toFixed(2)}`;
const EASE = [0.25, 0.1, 0.25, 1];

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
                className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e] hover:text-[#3d3b37] transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>
          <button onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1">
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
          </button>
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/SHYNE.png BLACK.png" alt="SHYNE" className="h-[40px] md:h-[52px] w-auto object-contain" />
          </a>
          <div className="hidden md:flex items-center gap-6">
            <CartBadge />
          </div>
          <div className="md:hidden"><CartBadge /></div>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="flex flex-col gap-5 pt-6 pb-2">
                {[['Shop', '/#shop'], ['About', '/about']].map(([label, href]) => (
                  <a key={label} href={href}
                    className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e]">{label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function QtyControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-0 border border-[#dcd6cd] rounded-full overflow-hidden">
      <button onClick={() => onChange(value - 1)}
        className="w-8 h-8 flex items-center justify-center text-[#67645e] hover:bg-[#f0ede8] transition-colors text-lg leading-none">
        −
      </button>
      <span className="w-7 text-center text-[13px] font-medium text-[#3d3b37] select-none">
        {value}
      </span>
      <button onClick={() => onChange(value + 1)}
        className="w-8 h-8 flex items-center justify-center text-[#67645e] hover:bg-[#f0ede8] transition-colors text-lg leading-none">
        +
      </button>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <svg className="w-16 h-16 text-[#dcd6cd] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
      <h2 className="text-[22px] font-light text-[#3d3b37] mb-2">Your bag is empty</h2>
      <p className="text-[14px] text-[#84827e] mb-8 max-w-[28ch]">
        Discover our range of nourishing body care made to glow.
      </p>
      <a href="/#shop"
        className="inline-flex items-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:bg-[#2c2a27] transition-colors duration-300">
        Shop SHYNE
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart();

  const shippingCost = subtotal >= 45 ? 0 : 3.99;
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <TopBanner />
      <PageHeader />

      <main className="px-4 md:px-6 pb-16">
        {/* Page title */}
        <div className="pt-8 pb-6 border-b border-[#e8e3dc]">
          <h1 className="text-[28px] md:text-[36px] font-light text-[#3d3b37]">
            Your Bag
            {itemCount > 0 && (
              <span className="ml-3 text-[18px] text-[#84827e]">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            )}
          </h1>
        </div>

        {itemCount === 0 ? <EmptyCart /> : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 pt-8">

            {/* ── LEFT: items ── */}
            <div>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div key={item.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex gap-4 py-6 border-b border-[#e8e3dc]">

                    {/* Image */}
                    <a href={`/products/${item.slug}`}
                      className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#f0ede8]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </a>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <a href={`/products/${item.slug}`}
                        className="text-[14px] font-semibold text-[#3d3b37] uppercase tracking-[0.04em] hover:underline block truncate">
                        {item.name}
                      </a>
                      <p className="text-[12px] text-[#84827e] mt-0.5">{item.subtitle}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <QtyControl value={item.quantity} onChange={(q) => updateQuantity(item.slug, q)} />
                        <button onClick={() => removeItem(item.slug)}
                          className="text-[11px] tracking-[0.08em] uppercase text-[#9c9a96] hover:text-[#b4502f] transition-colors duration-200">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-[15px] font-semibold text-[#3d3b37]">
                        {fmt(item.salePrice * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-[#9c9a96] mt-0.5">{fmt(item.salePrice)} each</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <div className="mt-8">
                <a href="/#shop"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-medium text-[#67645e] hover:text-[#3d3b37] transition-colors duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                  Continue Shopping
                </a>
              </div>
            </div>

            {/* ── RIGHT: order summary ── */}
            <div className="lg:sticky lg:top-[88px] self-start">
              <div className="rounded-2xl bg-[#f0ede8] p-6 md:p-8">
                <h2 className="text-[14px] tracking-[0.16em] uppercase font-semibold text-[#3d3b37] mb-6">
                  Order Summary
                </h2>

                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-[13px] text-[#67645e]">Subtotal</dt>
                    <dd className="text-[13px] font-medium text-[#3d3b37]">{fmt(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[13px] text-[#67645e]">Shipping</dt>
                    <dd className="text-[13px] font-medium text-[#3d3b37]">
                      {shippingCost === 0
                        ? <span className="text-[#b4502f] font-semibold">Free</span>
                        : fmt(shippingCost)}
                    </dd>
                  </div>
                  {subtotal < 45 && (
                    <p className="text-[11px] text-[#84827e] pt-1">
                      Add {fmt(45 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between pt-4 border-t border-[#dcd6cd]">
                    <dt className="text-[15px] font-semibold text-[#3d3b37]">Total</dt>
                    <dd className="text-[15px] font-semibold text-[#3d3b37]">{fmt(total)}</dd>
                  </div>
                </dl>

                <a href="/checkout"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-[#3d3b37] text-white text-[11px] tracking-[0.16em] uppercase font-semibold rounded-lg py-4 hover:bg-[#2c2a27] transition-colors duration-300">
                  Proceed to Checkout
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                <p className="text-[11px] text-[#9c9a96] text-center mt-4">
                  Secure checkout · Stripe encrypted
                </p>
              </div>

              {/* Trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: '🔒', label: 'Secure' },
                  { icon: '🚚', label: 'Fast Delivery' },
                  { icon: '↩️', label: 'Easy Returns' },
                ].map(({ icon, label }) => (
                  <div key={label} className="rounded-xl bg-[#faf9f7] border border-[#e2ddd5] py-3 flex flex-col items-center gap-1">
                    <span className="text-[18px]">{icon}</span>
                    <span className="text-[10px] tracking-[0.08em] uppercase text-[#84827e]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
