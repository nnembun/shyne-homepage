import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

export default function WaitlistPage() {
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    if (!validEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'waitlist-page' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1c1916] text-white">
      {/* ── Background image ── */}
      <img
        src="/images/about/about-1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* ── Overlays for legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1916] via-[#1c1916]/55 to-[#1c1916]/35" />
      <div className="absolute inset-0 bg-[#1c1916]/20" />

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Logo */}
        <header className="flex justify-center pt-8 md:pt-10">
          <a href="/" aria-label="SHYNE home">
            <img
              src="/images/shyne-logo-light.png"
              alt="SHYNE"
              className="h-[34px] md:h-[44px] w-auto object-contain"
            />
          </a>
        </header>

        {/* Centre block */}
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="w-full max-w-[560px] text-center">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="inline-block text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-semibold text-white/70 mb-5">
                    Coming Soon
                  </span>

                  <h1
                    className="text-[40px] sm:text-[52px] md:text-[64px] leading-[1.0] lowercase"
                    style={{ fontFamily: 'var(--font-product)' }}
                  >
                    SHYNE is<br />returning.
                  </h1>

                  <p className="mt-5 text-[14px] md:text-[16px] leading-relaxed text-white/75 max-w-[42ch] mx-auto">
                    Join the waitlist for early access, exclusive offers and first
                    access to new releases.
                  </p>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                      placeholder="Email address"
                      autoComplete="email"
                      className="flex-1 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-6 py-4 text-[14px] text-white placeholder:text-white/55 outline-none focus:border-white/70 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center justify-center gap-2 rounded-full bg-white text-[#1c1916] text-[11px] tracking-[0.16em] uppercase font-semibold px-8 py-4 hover:bg-[#f0ede8] transition-colors duration-300 disabled:opacity-70 whitespace-nowrap"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Joining…
                        </>
                      ) : (
                        'Join The Waitlist'
                      )}
                    </button>
                  </form>

                  {/* Error */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-[12px] text-[#f0b9a6]"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="mt-5 text-[11px] text-white/45">
                    No spam — just the glow. Unsubscribe anytime.
                  </p>
                </motion.div>
              ) : (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                    className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-white/12 backdrop-blur-md border border-white/25"
                  >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </motion.div>

                  <h2
                    className="text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] lowercase"
                    style={{ fontFamily: 'var(--font-product)' }}
                  >
                    welcome to<br />SHYNE.
                  </h2>
                  <p className="mt-5 text-[15px] md:text-[17px] text-white/80">
                    You&rsquo;re on the list.
                  </p>
                  <p className="mt-3 text-[13px] text-white/55 max-w-[40ch] mx-auto">
                    Keep an eye on your inbox — early access, exclusive offers and new
                    releases are coming your way first.
                  </p>

                  <a
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-white/70 hover:text-white transition-colors"
                  >
                    Explore SHYNE
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center">
          <p className="text-[11px] tracking-[0.1em] text-white/40">&copy; SHYNE 2026</p>
        </footer>
      </div>
    </div>
  );
}
