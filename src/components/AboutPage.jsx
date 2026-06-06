import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import CartBadge from './CartBadge';

const EASE = [0.25, 0.1, 0.25, 1];

/* ─── Shared animation wrapper ─── */
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

/* ─── Top shipping banner ─── */
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

/* ─── Sticky header ─── */
function AboutHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLeft = ['Shop', 'About', 'Futures'];
  const navRight = ['Search', 'Account', 'Cart (0)'];

  const href = (item) => {
    if (item === 'Shop') return '/#shop';
    if (item === 'About') return '/about';
    return '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7]/90 backdrop-blur-md border-b border-[#e8e3dc]/70">
      <div className="px-6 md:px-10 py-4">
        <nav className="flex items-center justify-between">
          {/* Desktop left */}
          <div className="hidden md:flex items-center gap-9">
            {navLeft.map((item) => (
              <a
                key={item}
                href={href(item)}
                className={`text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  item === 'About'
                    ? 'font-semibold text-[#3d3b37]'
                    : 'font-light text-[#67645e] hover:text-[#3d3b37]'
                }`}
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
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
            <span className="block w-[22px] h-[1.5px] bg-[#3d3b37] rounded-full" />
          </button>

          {/* Centre logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/SHYNE.png BLACK.png"
              alt="SHYNE"
              className="h-[40px] md:h-[52px] w-auto object-contain"
            />
          </a>

          {/* Desktop right */}
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

          {/* Mobile cart */}
          <div className="md:hidden">
            <CartBadge />
          </div>
        </nav>

        {/* Mobile menu */}
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
                    href={href(item)}
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

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#3d3b37]">
      <TopBanner />
      <AboutHeader />

      <main className="px-4 md:px-6 pb-2">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 pt-2">

          {/* Title panel */}
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-between min-h-[460px] lg:min-h-[600px]">
              <div>
                <span className="inline-block text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f] bg-[#b4502f]/10 rounded-full px-3 py-1.5">
                  About SHYNE
                </span>
                <h1
                  className="text-[40px] md:text-[54px] lg:text-[64px] leading-[1.0] text-[#3d3b37] mt-6"
                  style={{ fontFamily: 'var(--font-product)' }}
                >
                  It's Your Time<br />to SHYNE
                </h1>
              </div>
              <div className="mt-10">
                <p className="text-[15px] md:text-[17px] font-light tracking-wide text-[#84827e] uppercase mb-3">
                  Body care made to be experienced.
                </p>
                <p className="text-[14px] leading-relaxed text-[#67645e] max-w-[44ch]">
                  More than skincare. More than fragrance. SHYNE is a sensory ritual designed to nourish the skin, captivate the senses and elevate everyday moments into something unforgettable.
                </p>
                <div className="mt-6 w-14 h-[2px] bg-[#b4502f] rounded-full" />
              </div>
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[480px] lg:h-full lg:min-h-[600px]">
              <img
                src="/images/about/about-1.png"
                alt="SHYNE — glowing skin"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ PHILOSOPHY ═══════════════════ */}
        <section id="philosophy" className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">

          {/* Image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] sm:h-[540px] lg:h-full lg:min-h-[620px]">
              <img
                src="/images/about/about-2.png"
                alt="SHYNE philosophy — nourished skin"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="rounded-2xl bg-[#f0ede8] p-8 md:p-12 lg:p-14 h-full flex flex-col justify-center min-h-[420px]">
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f]">
                Our Philosophy
              </span>
              <h2 className="text-[28px] md:text-[38px] leading-[1.1] font-semibold text-[#3d3b37] mt-4">
                A Presence That's Felt
              </h2>
              <p className="text-[14px] leading-relaxed text-[#67645e] mt-5">
                At SHYNE, we believe beauty is more than what is seen, it is what is felt. Our philosophy is rooted in the idea that self-care should be a luxurious ritual that nourishes the skin, awakens the senses and transforms everyday moments into something special.
              </p>
              <p className="text-[14px] leading-relaxed text-[#67645e] mt-4">
                Through rich oils, captivating fragrances and intentional body care, we create experiences that make you feel confident, radiant and unforgettable. Because when you feel your best, every moment becomes an opportunity to leave a lasting impression and embrace the presence you were born to SHYNE with.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ OUR STORY ═══════════════════ */}
        <section id="story" className="mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl overflow-hidden bg-[#1c1916]">
              {/* Landscape image */}
              <div className="relative h-[320px] md:h-[480px]">
                <img
                  src="/images/about/about-3.png"
                  alt="SHYNE — our story"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1916] via-[#1c1916]/10 to-transparent" />
              </div>

              {/* Story text in two columns */}
              <div className="p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f]">
                    Our Story
                  </span>
                  <h2
                    className="text-[32px] md:text-[46px] leading-[1.0] text-white mt-4"
                    style={{ fontFamily: 'var(--font-product)' }}
                  >
                    You Were Born<br />to SHYNE
                  </h2>
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <p className="text-[14px] leading-relaxed text-white/65">
                    SHYNE is where you step into the version of yourself you were always destined to be. Inspired by the ancient oil traditions of Africa and the rich fragrance heritage of Arabia, SHYNE transforms body care into a complete sensory experience. Every formula combines nourishing botanical oils with captivating notes of oud, vanilla, amber and delicate florals to engage every sense.
                  </p>
                  <p className="text-[14px] leading-relaxed text-white/65">
                    The silky texture melts effortlessly into the skin, leaving behind a radiant glow and touchable softness. As the fragrance unfolds throughout the day, it surrounds you with warmth, femininity and confidence.
                  </p>
                  <p className="text-[14px] leading-relaxed text-white/65">
                    From the moment the oil touches your skin, SHYNE becomes a ritual of self-devotion. A moment to slow down. A moment to reconnect with yourself. A moment to feel beautiful, present and unforgettable. Because true luxury is not only seen. It is felt, experienced and remembered.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ OUR MESSAGE ═══════════════════ */}
        <section id="message" className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">

          {/* Quote panel */}
          <Reveal>
            <div className="rounded-2xl bg-[#efece6] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center min-h-[420px]">
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f]">
                Our Message
              </span>
              <h2 className="text-[24px] md:text-[32px] lg:text-[36px] leading-[1.15] font-semibold text-[#3d3b37] mt-5">
                The World Is Your Stage.<br />Be Unforgettable.
              </h2>
              <div className="mt-5 w-12 h-[2px] bg-[#b4502f] rounded-full" />
              <p className="text-[14px] leading-relaxed text-[#67645e] mt-5">
                You were never created to shrink yourself, blend into the background or go unnoticed. Every woman carries something unique within her. A presence. An energy. A light. SHYNE exists to help you embrace it. Through intentional rituals, luxurious fragrances and nourishing body care, we encourage women to take up space, celebrate themselves and leave a lasting impression wherever they go.
              </p>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl overflow-hidden bg-[#f0ede8] h-[420px] lg:h-full lg:min-h-[460px]">
              <img
                src="/images/about/about-4.png"
                alt="SHYNE — glowing skin"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ OUR VALUES ═══════════════════ */}
        <section id="values" className="mt-3 md:mt-4">
          <Reveal>
            <div className="rounded-2xl bg-[#f0ede8] p-8 md:p-12 lg:p-14">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f]">
                    What We Stand For
                  </span>
                  <h2 className="text-[30px] md:text-[42px] leading-[1.08] font-light text-[#3d3b37] mt-3">
                    What we <span className="font-semibold">stand for.</span>
                  </h2>
                </div>
                <p className="text-[13px] text-[#84827e] max-w-[36ch] md:text-right">
                  Four principles that guide everything we make.
                </p>
              </div>

              {/* 4-card grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    num: '01',
                    title: 'Luxury Ritual',
                    body: 'Treat yourself with the same care, intention and importance you wish to receive from the world. Self-respect begins with how you care for yourself, and every SHYNE ritual is designed to remind you that you are worthy of luxury.',
                  },
                  {
                    num: '02',
                    title: 'Natural Beauty',
                    body: 'We believe beauty is enhanced, not hidden. Our nourishing formulas are designed to celebrate your natural features, leaving your skin healthy, radiant and glowing with confidence.',
                  },
                  {
                    num: '03',
                    title: 'Audacity',
                    body: 'Confidence begins the moment you stop trying to be invisible. SHYNE is about embracing who you are, owning your presence and stepping boldly into every room with intention.',
                  },
                  {
                    num: '04',
                    title: 'Impact',
                    body: 'Beauty fades from sight when you leave, but impact remains. Our oils are created to leave a lasting impression through touch, scent and presence, ensuring you are remembered long after the moment has passed.',
                  },
                ].map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                    className="rounded-2xl bg-[#faf9f7] border border-[#e2ddd5] p-6 md:p-7 flex flex-col min-h-[220px]"
                  >
                    <span className="text-[11px] tracking-[0.12em] font-bold text-[#b4502f]">
                      {v.num}
                    </span>
                    <h3
                      className="text-[17px] md:text-[19px] font-semibold text-[#3d3b37] mt-3 lowercase"
                      style={{ fontFamily: 'var(--font-product)' }}
                    >
                      {v.title}
                    </h3>
                    <div className="mt-2 w-8 h-[1.5px] bg-[#b4502f]/40 rounded-full" />
                    <p className="text-[13px] leading-relaxed text-[#67645e] mt-3 flex-1">
                      {v.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════ CTA ═══════════════════ */}
        <section className="mt-3 md:mt-4 mb-4">
          <Reveal>
            <div className="rounded-2xl overflow-hidden bg-[#1c1916] grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
              {/* Text panel */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="inline-block text-[10px] tracking-[0.24em] uppercase font-semibold text-[#b4502f] bg-[#b4502f]/10 rounded-full px-3 py-1.5 w-fit">
                  Shop SHYNE
                </span>
                <h2
                  className="text-[36px] md:text-[50px] lg:text-[58px] leading-[1.0] text-white mt-6"
                  style={{ fontFamily: 'var(--font-product)' }}
                >
                  It's Your Time<br />to SHYNE
                </h2>
                <p className="text-[14px] leading-relaxed text-white/60 mt-5 max-w-[38ch]">
                  Discover the full SHYNE collection. Sensory body care designed to nourish, empower and leave a lasting impression.
                </p>
                <a
                  href="/#shop"
                  className="mt-8 inline-flex items-center gap-2 bg-white text-[#3d3b37] text-[11px] tracking-[0.16em] uppercase font-semibold rounded-full px-8 py-4 hover:bg-[#f0ede8] transition-colors duration-300 w-fit"
                >
                  Shop Collection
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>

              {/* Image panel */}
              <div className="relative h-[360px] lg:h-auto lg:min-h-[480px]">
                <img
                  src="/images/about/about-5.png"
                  alt="SHYNE glow ritual"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c1916]/20 to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </div>
  );
}
