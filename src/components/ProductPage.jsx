import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { products } from '../data/products';
import { useCart } from '../store/CartContext';
import CartBadge from './CartBadge';

/* ----------------------------------------------------------------------------
   Shared SHYNE product-page template.
   Layout cloned from the SHYNE product-page reference (rhode "glazing mist"),
   re-skinned in SHYNE brand styling and driven entirely by a `product` config
   from src/data/products.jsx. Self-contained so the homepage and the shared
   navigation stay untouched.
---------------------------------------------------------------------------- */

const EASE = [0.25, 0.1, 0.25, 1];
const fmt = (n) => `£${n.toFixed(2)}`;

/* ------------------------------- Primitives ------------------------------- */

// Drag-to-scroll + sensory swipe cursor for horizontal carousels.
function useDragScroll() {
  const ref = useRef(null);
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e) => {
    const el = ref.current;
    if (!el) return;
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const el = ref.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.startScroll - dx;
  };
  const onPointerUp = () => {
    state.current.down = false;
    state.current.moved = false;
  };
  // Suppress click navigation that happens right after a drag.
  const onClickCapture = (e) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  };

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, onClickCapture },
  };
}

// Cursor-following "swipe / drag" sensory signal shown while hovering a carousel.
function SwipeCursor({ targetRef }) {
  const [state, setState] = useState({ visible: false, x: 0, y: 0 });
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      setState({ visible: true, x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const leave = () => setState((s) => ({ ...s, visible: false }));
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [targetRef]);

  return (
    <AnimatePresence>
      {state.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="pointer-events-none absolute z-30 hidden md:flex"
          style={{ left: state.x, top: state.y, transform: 'translate(-50%, -50%)' }}
        >
          <span className="flex items-center gap-2 rounded-full bg-[#3d3b37]/90 backdrop-blur-sm text-white text-[10px] tracking-[0.18em] uppercase font-medium px-4 py-3 shadow-lg">
            <motion.svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              animate={{ x: [-2, 2, -2] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l-7 7 7 7M15 5l7 7-7 7" />
            </motion.svg>
            Swipe
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Stars({ rating, className = 'w-3.5 h-3.5' }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`${className} ${i < Math.round(rating) ? 'text-[#3d3b37]' : 'text-[#d5cfc8]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#dcd6cd]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="border-b border-[#dcd6cd]">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left group"
            >
              <span className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#3d3b37]">
                {it.title}
              </span>
              <span className="relative w-4 h-4 flex-shrink-0 text-[#84827e] group-hover:text-[#3d3b37] transition-colors">
                <span className="absolute top-1/2 left-0 w-4 h-[1.5px] -translate-y-1/2 bg-current" />
                <span
                  className={`absolute top-1/2 left-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${
                    isOpen ? 'scale-y-0' : 'scale-y-100'
                  }`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-[13px] leading-relaxed text-[#67645e]">
                    {it.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- Header --------------------------------- */

function ProductHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLeft = ['Shop', 'About', 'Futures'];
  const navRight = ['Search', 'Account'];
  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7]/90 backdrop-blur-md border-b border-[#e8e3dc]/70">
      <div className="px-6 md:px-10 py-4">
        <nav className="flex items-center justify-between">
          <div className="hidden md:flex items-center gap-9">
            {navLeft.map((item) => (
              <a
                key={item}
                href={item === 'Shop' ? '/#shop' : item === 'About' ? '/about' : '/'}
                className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e] hover:text-[#3d3b37] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
          </button>

          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/SHYNE.png BLACK.png"
              alt="SHYNE"
              className="h-[40px] md:h-[52px] w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-9">
            {navRight.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e] hover:text-[#3d3b37] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <CartBadge />
          </div>

          <div className="md:hidden">
            <CartBadge />
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-5 pt-6 pb-2">
                {[...navLeft, 'Search', 'Account'].map((item) => (
                  <a
                    key={item}
                    href={item === 'Shop' ? '/#shop' : item === 'About' ? '/about' : '/'}
                    className="text-[10px] tracking-[0.22em] uppercase font-light text-[#67645e]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ------------------------------- Top banner ------------------------------- */

function TopBanner() {
  return (
    <div className="px-4 md:px-6 pt-3 pb-[15px] bg-white">
      <div
        className="flex items-center justify-center text-center px-4"
        style={{
          backgroundColor: '#f1f0ed',
          borderRadius: '0.625rem',
          minHeight: '2.5rem',
          padding: '0.625rem 0.9375rem',
        }}
      >
        <p className="uppercase text-[12px] font-bold leading-[0.875rem] text-[#67645e] m-0">
          Free UK Shipping on Orders Over £45
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Sticky buy bar ---------------------------- */

function StickyBuyBar({ product, isComingSoon }) {
  const { addItem } = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isComingSoon) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#faf9f7]/95 backdrop-blur-md border-t border-[#e2ddd5]"
        >
          <div className="px-4 md:px-10 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.images.thumb}
                alt=""
                className="h-9 w-9 object-cover rounded-md hidden sm:block"
              />
              <span className="text-[11px] tracking-[0.14em] uppercase font-semibold text-[#3d3b37] truncate">
                {product.shortName}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] text-[#9c9a96]">
              <span>Country/region:</span>
              <span className="underline underline-offset-2">United Kingdom (GBP £)</span>
            </div>
            <button
              onClick={() => addItem(product)}
              className="flex-shrink-0 bg-[#3d3b37] text-white text-[11px] tracking-[0.12em] uppercase font-medium rounded-full px-6 py-3 hover:bg-[#2c2a27] transition-colors duration-300 whitespace-nowrap">
              {product.ctaLabel} — {fmt(product.salePrice)}
              <span className="ml-2 text-white/50 line-through hidden sm:inline">{fmt(product.price)}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- Page ----------------------------------- */

export default function ProductPage({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { ref: galleryRef, handlers: galleryHandlers } = useDragScroll();

  // Fallback so a bad/unknown slug still renders something sensible.
  const p = product || products['bare-vanilla-glow-oil'];

  const availableProducts = ['bare-vanilla-glow-oil', 'glow-polish-bar'];
  const isComingSoon = !availableProducts.includes(p.slug);

  const handleAdd = () => {
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };
  const img = p.images;

  const scrollGallery = (dir) => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
    }
  };

  const benefits = (
    <ul className="space-y-2 list-none">
      {p.benefits.map((b) => (
        <li key={b}>· {b}</li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <TopBanner />
      <ProductHeader />

      <main className="px-4 md:px-6 pb-2">
        {/* ============================ HERO ============================ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 pt-2">
          {/* Lifestyle image */}
          <Reveal className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] sm:h-[560px] lg:h-full lg:min-h-[640px]">
              <img
                src={img.hero}
                alt={`${p.shortName} — model with a glowing, sun-kissed finish`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>

          {/* Buy panel */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-[#efece6] p-7 md:p-10 lg:p-12 h-full flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className="text-[34px] md:text-[44px] leading-[1.02] lowercase text-[#3d3b37]"
                    style={{ fontFamily: 'var(--font-product)' }}
                  >
                    {p.titleLines[0]}
                    <br />
                    {p.titleLines[1]}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 pt-2 flex-shrink-0">
                  <Stars rating={p.rating} />
                  <span className="text-[11px] text-[#9c9a96]">({p.reviews.toLocaleString()})</span>
                </div>
              </div>

              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#84827e] mt-3">
                {p.subtitle} · {p.scent}
              </p>

              <div className="flex items-center gap-3 mt-5">
                <span className="text-[22px] font-semibold text-[#3d3b37]">{fmt(p.salePrice)}</span>
                <span className="text-[15px] text-[#9c9a96] line-through">{fmt(p.price)}</span>
                <span className="text-[10px] tracking-[0.14em] uppercase font-semibold text-white bg-[#b4502f] rounded-full px-2.5 py-1">
                  Save {fmt(p.price - p.salePrice)}
                </span>
              </div>

              <p className="text-[14px] leading-relaxed text-[#67645e] mt-5 max-w-[46ch]">
                {p.description} {p.tagline}.
              </p>

              <div className="mt-7">
                {isComingSoon ? (
                  <button
                    disabled
                    className="w-full text-white text-[12px] tracking-[0.14em] uppercase font-medium rounded-lg py-4 bg-[#d5cfc8] cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleAdd}
                      className={`w-full text-white text-[12px] tracking-[0.14em] uppercase font-medium rounded-lg py-4 transition-colors duration-300 ${
                        added ? 'bg-[#b4502f] hover:bg-[#9a4427]' : 'bg-[#3d3b37] hover:bg-[#2c2a27]'
                      }`}
                    >
                      {added ? '✓ Added to Bag' : `${p.ctaLabel} — ${fmt(p.salePrice)}`}
                    </button>
                    <p className="text-[11px] text-[#9c9a96] mt-3 text-center">
                      Or 4 interest-free payments of {fmt(p.salePrice / 4)} with{' '}
                      <span className="font-semibold text-[#67645e]">Klarna</span>.
                    </p>
                    {added && (
                      <p className="text-[11px] text-[#67645e] mt-2 text-center">
                        Added to your bag.{' '}
                        <a href="/cart" className="font-semibold underline hover:text-[#3d3b37]">View bag →</a>
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="mt-8">
                <Accordion
                  defaultOpen={0}
                  items={[
                    { title: 'Benefits', content: benefits },
                    { title: 'Application', content: <p>{p.application}</p> },
                    { title: 'Key Ingredients', content: <p>{p.ingredients}</p> },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===================== EDITORIAL / SPEC ====================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Reveal className="order-2 lg:order-1">
            <div className="rounded-2xl bg-[#f0ede8] p-7 md:p-10 lg:p-12 h-full flex flex-col">
              <h2 className="text-[26px] md:text-[34px] leading-[1.12] font-light text-[#3d3b37]">
                A <span className="font-semibold">{p.editorial.emph1}</span> {p.editorial.noun} for{' '}
                <span className="font-semibold">{p.editorial.emph2}</span> and next-level{' '}
                <span style={{ fontFamily: 'var(--font-product)' }}>{p.editorial.glowWord}.</span>
              </h2>

              <div className="mt-8">
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#84827e]">
                  Good for:
                </p>
                <p className="text-[13px] text-[#67645e] mt-1.5 max-w-[40ch]">{p.goodFor}</p>
              </div>

              <dl className="mt-8 border-t border-[#dcd6cd]">
                {p.specRows.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[120px_1fr] gap-4 py-3.5 border-b border-[#dcd6cd]"
                  >
                    <dt className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[#9c9a96]">
                      {k}:
                    </dt>
                    <dd className="text-[13px] text-[#67645e]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden bg-[#1c1916] h-[420px] sm:h-[560px] lg:h-full lg:min-h-[600px]">
              <img
                src={img.dramatic}
                alt={`${p.shortName} bottle in golden light`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>
        </section>

        {/* ===================== GLAZE IT ON FOR ====================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Reveal className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] sm:h-[560px] lg:h-full lg:min-h-[560px]">
              <img
                src={img.glaze}
                alt="Sun-kissed glowing skin"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-[#efece6] p-10 md:p-14 h-full flex flex-col items-center justify-center text-center min-h-[420px]">
              <p className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#84827e]">
                Glaze it on for
              </p>
              <div className="mt-6 space-y-3">
                <p
                  className="text-[40px] md:text-[52px] leading-none lowercase text-[#3d3b37]"
                  style={{ fontFamily: 'var(--font-product)' }}
                >
                  {p.glazeWords[0]}
                </p>
                <p className="text-[34px] md:text-[44px] leading-none font-light text-[#67645e] lowercase">
                  {p.glazeWords[1]}
                </p>
                <p className="text-[34px] md:text-[44px] leading-none font-semibold text-[#3d3b37] lowercase">
                  {p.glazeWords[2]}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================= APPLICATION + WHAT'S INSIDE ============== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          {/* Application block */}
          <div className="flex flex-col gap-3 md:gap-4">
            <Reveal>
              <div className="rounded-2xl bg-[#efece6] p-7 md:p-10">
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#84827e]">
                  Application
                </p>
                <div className="flex items-start justify-between gap-6 mt-4">
                  <p className="text-[19px] md:text-[22px] leading-snug text-[#3d3b37] max-w-[28ch]">
                    <span className="text-[#9c9a96] mr-2">01</span>
                    {p.applicationStep}
                  </p>
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border border-[#cfc8be] flex items-center justify-center text-[#84827e]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex-1">
              <div className="relative rounded-2xl overflow-hidden bg-[#1c1916] h-[300px] md:h-full md:min-h-[300px]">
                <img
                  src={img.box}
                  alt={`${p.shortName} carton`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-4 right-4 bg-white/85 backdrop-blur-sm text-[10px] tracking-[0.08em] uppercase font-medium text-[#3d3b37] rounded-full px-3 py-1.5">
                  Full ingredients list
                </span>
              </div>
            </Reveal>
          </div>

          {/* What's inside */}
          <Reveal delay={0.05}>
            <div className="rounded-2xl bg-[#f0ede8] p-7 md:p-10 lg:p-12 h-full">
              <h3 className="text-[24px] md:text-[30px] font-light text-[#3d3b37]">
                what&rsquo;s inside
              </h3>
              <p className="text-[13px] text-[#67645e] mt-2 max-w-[42ch]">{p.whatsInside.intro}</p>

              <div className="mt-8 space-y-7">
                {p.whatsInside.items.map(([title, body]) => (
                  <div key={title} className="border-t border-[#dcd6cd] pt-5">
                    <p className="text-[16px] font-semibold text-[#3d3b37] lowercase">{title}</p>
                    <p className="text-[13px] text-[#67645e] mt-1.5 leading-relaxed">{body}</p>
                  </div>
                ))}
                <p className="text-[11px] tracking-[0.06em] text-[#9c9a96] pt-1">
                  {p.whatsInside.footnote}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================= RESULTS ========================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] p-7 md:p-10 lg:p-12 h-full">
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#84827e]">
                  Immediate results
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#9c9a96]">After 2 weeks</p>
              </div>
              <div className="mt-6">
                {p.results.stats.map(([pct, label]) => (
                  <div key={label} className="py-4 border-b border-[#dcd6cd]">
                    <p className="text-[40px] md:text-[48px] font-semibold leading-none text-[#3d3b37]">
                      {pct}
                    </p>
                    <p className="text-[12px] uppercase tracking-[0.06em] text-[#67645e] mt-2">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] sm:h-[560px] lg:h-full lg:min-h-[560px]">
              <img
                src={img.results}
                alt="Sun-kissed glowing skin"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>
        </section>

        {/* ====================== RECAP CARD ========================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[360px] lg:h-full lg:min-h-[480px]">
              <img
                src={img.recap}
                alt={p.shortName}
                className={
                  img.recapFit === 'contain'
                    ? 'absolute inset-0 w-full h-full object-contain p-10'
                    : 'absolute inset-0 w-full h-full object-cover object-center'
                }
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-[#efece6] p-7 md:p-10 lg:p-12 h-full">
              <h3
                className="text-[28px] md:text-[36px] lowercase leading-none text-[#3d3b37]"
                style={{ fontFamily: 'var(--font-product)' }}
              >
                {p.recapTitle}
              </h3>
              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#84827e] mt-2">
                {p.subtitle}
              </p>

              <dl className="mt-7">
                {p.recapRows.map(([k, v]) => (
                  <div key={k} className="py-4 border-t border-[#dcd6cd]">
                    <dt className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[#9c9a96]">
                      {k}
                    </dt>
                    <dd className="text-[13px] text-[#67645e] mt-1.5">{v}</dd>
                  </div>
                ))}
              </dl>

              {isComingSoon ? (
                <button
                  disabled
                  className="mt-6 inline-flex items-center gap-2 bg-[#d5cfc8] text-white text-[11px] tracking-[0.12em] uppercase font-medium rounded-full px-7 py-3.5 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="mt-6 inline-flex items-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.12em] uppercase font-medium rounded-full px-7 py-3.5 hover:bg-[#2c2a27] transition-colors duration-300"
                >
                  {added ? '✓ Added' : `Add to bag — ${fmt(p.salePrice)}`}
                  <span className="text-white/50 line-through">{fmt(p.price)}</span>
                </button>
              )}
            </div>
          </Reveal>
        </section>

        {/* ============================ FAQ =========================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] p-7 md:p-10 lg:p-12 h-full">
              <h3 className="text-[28px] md:text-[34px] font-light text-[#3d3b37]">FAQ</h3>
              <p className="text-[13px] text-[#84827e] mt-1">Find out more about {p.shortName}.</p>
              <div className="mt-6">
                <Accordion items={p.faq.map(([title, content]) => ({ title, content }))} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] sm:h-[560px] lg:h-full lg:min-h-[560px]">
              <img
                src={img.faq}
                alt="Glowing skin"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>
        </section>

        {/* ====================== GET READY ROUTINE =================== */}
        <section className="mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[360px] lg:h-auto lg:min-h-[520px]">
                <img
                  src={img.tray}
                  alt="SHYNE glow ritual"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-7 md:p-12">
                <h3 className="text-[26px] md:text-[34px] text-[#3d3b37]">
                  <span className="font-light">Get the glow with </span>
                  <span style={{ fontFamily: 'var(--font-product)' }}>SHYNE.</span>
                </h3>
                <p className="text-[13px] text-[#84827e] mt-2">
                  The five-step ritual for sun-kissed, lit-from-within skin.
                </p>

                <ol className="mt-8 space-y-1">
                  {p.routine.steps.map(([n, title, body], i) => (
                    <li key={n} className="flex gap-5 py-3.5 border-t border-[#dcd6cd]">
                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold ${
                          i === p.routine.activeIndex
                            ? 'bg-[#3d3b37] text-white'
                            : 'border border-[#cfc8be] text-[#84827e]'
                        }`}
                      >
                        {n}
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#3d3b37]">
                          {title}
                        </p>
                        <p className="text-[13px] text-[#67645e] mt-0.5">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===================== SUSTAINABILITY ====================== */}
        <section className="mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#f0ede8] p-7 md:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div>
                <h3 className="text-[30px] md:text-[42px] font-light text-[#3d3b37]">
                  less waste, <span className="font-semibold">more glow.</span>
                </h3>
                <p className="text-[13px] text-[#67645e] mt-4 max-w-[42ch]">{p.sustainabilityIntro}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(p.sustainabilityParts || [
                  ['Cap', 'Recyclable PP — 40% recycled content'],
                  ['Bottle', 'Recyclable glass — refillable design'],
                  ['Carton', '100% FSC-certified recycled paper'],
                ]).map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-[#faf9f7] border border-[#e2ddd5] p-4 flex flex-col">
                    <span className="text-[11px] tracking-[0.14em] uppercase font-semibold text-[#3d3b37]">
                      {k}
                    </span>
                    <span className="text-[11px] text-[#84827e] mt-2 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================= REVIEWS ========================= */}
        <section className="mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] p-7 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[28px] font-semibold text-[#3d3b37] leading-none">
                      {p.rating}
                    </span>
                    <Stars rating={p.rating} className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-[#84827e] mt-2">
                    Average rating
                  </p>
                  <p className="text-[12px] text-[#9c9a96]">
                    Based on {p.reviews.toLocaleString()} reviews
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full border border-[#cfc8be] px-5 py-2.5 text-[11px] tracking-[0.12em] uppercase text-[#67645e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M6 12h12M10 19h4" />
                    </svg>
                    Filters
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-[#cfc8be] px-5 py-2.5 text-[11px] tracking-[0.12em] uppercase text-[#67645e]">
                    Most recent
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8 divide-y divide-[#dcd6cd] border-t border-[#dcd6cd]">
                {p.reviewCards.map((r) => (
                  <div key={r.name} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-7">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[13px] font-semibold text-[#3d3b37] flex items-center gap-1.5">
                          {r.name}
                          <svg className="w-3.5 h-3.5 text-[#84827e]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 011.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z" clipRule="evenodd" />
                          </svg>
                        </p>
                        <p className="text-[11px] text-[#9c9a96]">Verified Buyer</p>
                      </div>
                      <div className="text-[11px] text-[#67645e] space-y-2">
                        <p><span className="font-semibold block text-[#3d3b37]">Age Range</span>{r.age}</p>
                        <p><span className="font-semibold block text-[#3d3b37]">Skin Concern</span>{r.skin}</p>
                        <p><span className="font-semibold block text-[#3d3b37]">Skin Type</span>{r.type}</p>
                        <p><span className="font-semibold block text-[#3d3b37]">Favourite features</span>{r.fav}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <Stars rating={5} />
                        <span className="text-[11px] text-[#9c9a96]">{r.when}</span>
                      </div>
                      <p className="text-[14px] font-semibold text-[#3d3b37] mt-3">{r.title}</p>
                      <p className="text-[13px] text-[#67645e] mt-1.5 leading-relaxed max-w-[60ch]">{r.body}</p>
                      <div className="mt-5 max-w-[320px]">
                        <p className="text-[11px] font-semibold text-[#3d3b37]">How glowy did your skin feel?</p>
                        <div className="relative mt-2 h-[2px] bg-[#d5cfc8] rounded-full">
                          <span className="absolute -top-1 right-2 w-2.5 h-2.5 rounded-full bg-[#3d3b37]" />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#9c9a96] mt-1.5">
                          <span>Subtle</span>
                          <span>Super glowy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button className="rounded-full border border-[#cfc8be] px-8 py-3 text-[11px] tracking-[0.14em] uppercase text-[#67645e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors">
                  Show more
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ==================== RELATED PRODUCTS ===================== */}
        <section className="mt-10 md:mt-16">
          <Reveal>
            <div className="flex items-end justify-between px-2 mb-6">
              <h3
                className="text-[44px] md:text-[64px] leading-none lowercase text-[#e2ddd5]"
                style={{ fontFamily: 'var(--font-product)' }}
              >
                glow more
              </h3>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollGallery('left')}
                  className="w-9 h-9 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="w-9 h-9 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
          <div className="relative">
            <SwipeCursor targetRef={galleryRef} />
            <div
              ref={galleryRef}
              {...galleryHandlers}
              className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none md:[&_*]:cursor-grab"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {p.related.map((rp, i) => (
                <Reveal key={rp.name} delay={i * 0.06} className="flex-shrink-0 w-[280px] md:w-[340px]">
                  <a href={rp.href || '/#shop'} className="group block" draggable={false}>
                    <div
                      className="relative bg-[#f0ede8] rounded-2xl overflow-hidden mb-3"
                      style={{ paddingBottom: '116%' }}
                    >
                      <span
                        className="absolute top-4 left-4 z-10 text-[26px] md:text-[30px] font-black leading-none text-[#3d3b37] lowercase"
                        style={{ fontFamily: 'var(--font-product)', fontWeight: 900 }}
                      >
                        {rp.category}
                      </span>
                      <img
                        src={rp.image}
                        alt={rp.name}
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 px-0.5">
                      <div>
                        <h4 className="text-[13px] tracking-[0.04em] uppercase font-bold text-[#3d3b37]">
                          {rp.name}
                        </h4>
                        <p className="text-[12px] text-[#9c9a96] mt-0.5">{rp.description}</p>
                      </div>
                      <span className="text-[13px] font-bold text-[#3d3b37] whitespace-nowrap">
                        {fmt(rp.price)}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyBuyBar product={p} isComingSoon={isComingSoon} />
      {/* bottom spacer so sticky bar never hides the footer end */}
      <div className="h-16" />
    </div>
  );
}
