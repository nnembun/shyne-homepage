import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartBadge from './CartBadge';

const navLeft = ['Shop', 'About'];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-5">
      <nav className="flex items-center justify-between">
        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLeft.map((item) => (
            <a
              key={item}
              href={item === 'About' ? '/about' : item === 'Shop' ? '#shop' : '/'}
              className="text-[10px] tracking-[0.22em] uppercase font-light text-white/80 hover:text-white transition-colors duration-400"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          <span className="block w-[22px] h-[1.5px] bg-white rounded-full" />
          <span className="block w-[22px] h-[1.5px] bg-white rounded-full" />
          <span className="block w-[22px] h-[1.5px] bg-white rounded-full" />
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="block">
            <img
              src="/images/shyne-logo-light.png"
              alt="SHYNE"
              className="h-[32px] md:h-[40px] w-auto"
            />
          </a>
        </div>

        {/* Right: cart icon */}
        <div className="hidden md:flex items-center">
          <CartBadge variant="light" />
        </div>
        <div className="md:hidden">
          <CartBadge variant="light" />
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-6 pb-6 border-b border-white/20"
          >
            <div className="flex flex-col gap-5">
              {navLeft.map((item) => (
                <a
                  key={item}
                  href={item === 'About' ? '/about' : item === 'Shop' ? '#shop' : '/'}
                  className="text-[10px] tracking-[0.22em] uppercase font-light text-white/80"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
