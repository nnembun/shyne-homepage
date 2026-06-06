import { motion } from 'framer-motion';
import CartBadge from './CartBadge';
import Footer from './Footer';

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

export default function PaymentCancelPage() {
  const params = new URLSearchParams(window.location.search);
  const reason = params.get('reason') || 'payment-failed';

  const message = reason === 'cancelled'
    ? 'Your order was cancelled and no payment was taken.'
    : 'Your payment could not be processed. Please check your card details and try again.';

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <PageHeader />

      <main className="px-4 md:px-6 py-16 max-w-xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#f0ede8] flex items-center justify-center">
            <svg className="w-9 h-9 text-[#b4502f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-[32px] md:text-[40px] font-light text-[#3d3b37] mb-3">
            {reason === 'cancelled' ? 'Order Cancelled' : 'Payment Failed'}
          </h1>
          <p className="text-[14px] text-[#67645e] leading-relaxed mb-10 max-w-[42ch] mx-auto">
            {message}
          </p>

          <div className="rounded-2xl bg-[#f0ede8] p-6 text-left mb-8">
            <p className="text-[12px] tracking-[0.14em] uppercase font-semibold text-[#3d3b37] mb-3">
              Common Reasons
            </p>
            <ul className="space-y-2">
              {[
                'Insufficient funds on your card',
                'Incorrect card number, expiry or CVV',
                'Card not enabled for online purchases',
                'Bank blocked the transaction — contact your bank',
              ].map(r => (
                <li key={r} className="flex items-start gap-2 text-[13px] text-[#67645e]">
                  <span className="text-[#b4502f] mt-0.5 flex-shrink-0">·</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.14em] uppercase font-semibold rounded-full px-8 py-4 hover:bg-[#2c2a27] transition-colors duration-300">
              Try Again
            </a>
            <a href="/cart"
              className="inline-flex items-center justify-center gap-2 border border-[#dcd6cd] text-[#67645e] text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors duration-300">
              Back to Bag
            </a>
            <a href="/#shop"
              className="inline-flex items-center justify-center gap-2 border border-[#dcd6cd] text-[#67645e] text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors duration-300">
              Continue Shopping
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
