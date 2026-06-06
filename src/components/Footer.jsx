import { useState } from 'react';
import ContactFormModal from './ContactFormModal';
import AffiliateFormModal from './AffiliateFormModal';

export default function Footer() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [affiliateModalOpen, setAffiliateModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'loading', 'success', 'error'

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      return;
    }

    setNewsletterStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');

        // Reset success message after 3 seconds
        setTimeout(() => {
          setNewsletterStatus(null);
        }, 3000);
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setNewsletterStatus('error');
    }
  };

  return (
    <>
      <footer className="border-t border-[#e8e3dc]/60 mt-4">
      <div className="px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-8">
          {/* Newsletter */}
          <div className="md:pr-8 md:border-r md:border-[#e8e3dc]/60">
            <p className="text-[14px] text-[#67645e] leading-relaxed">
              Join us on the SHYNE journey to radiant skin.
            </p>
            <p className="text-[13px] text-[#9c9a96] mt-3 leading-relaxed">
              Glow your inbox with skincare tips, product updates & exclusive offers.
            </p>

            <form onSubmit={handleNewsletterSubscribe} className="mt-5">
              <div className="flex border border-[#d5cfc8] rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterStatus === 'loading'}
                  className="flex-1 px-5 py-3 text-[13px] bg-transparent text-charcoal placeholder:text-[#b8b4ae] outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-5 py-3 text-[11px] tracking-[0.12em] uppercase font-medium text-charcoal hover:bg-charcoal hover:text-white transition-colors duration-300 border-l border-[#d5cfc8] whitespace-nowrap disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {newsletterStatus === 'success' && (
                <p className="text-[11px] text-green-600 mt-2">✓ Thanks for subscribing!</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-[11px] text-red-600 mt-2">Please enter a valid email</p>
              )}
            </form>

            <p className="text-[11px] text-[#9c9a96] mt-3 leading-relaxed">
              By signing up, you agree to our Privacy Policy.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium text-charcoal mb-5">
              Navigate
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'Shop',                href: '/#shop' },
                { label: 'Our Philosophy',      href: '/about#philosophy' },
                { label: 'Our Values',          href: '/about#values' },
                { label: 'Brand Story',         href: '/about#story' },
                { label: 'Our Message',         href: '/about#message' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-[13px] text-[#67645e] hover:text-charcoal transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setAffiliateModalOpen(true)}
                  className="text-[13px] text-[#67645e] hover:text-charcoal transition-colors duration-300 text-left"
                >
                  Become an Affiliate
                </button>
              </li>
              <li>
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="text-[13px] text-[#67645e] hover:text-charcoal transition-colors duration-300 text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium text-charcoal mb-5">
              Social
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/shyneoils/' },
                { label: 'YouTube', href: 'https://www.youtube.com/@Shyneoils' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@shyneoils' },
                { label: 'Pinterest', href: 'https://pin.it/584leG9bV' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#67645e] hover:text-charcoal transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium text-charcoal mb-5">
              Support
            </h4>
            <p className="text-[13px] text-[#67645e] leading-relaxed">
              We're here M-F 9am - 5pm.
            </p>
            <p className="text-[13px] text-[#67645e] mt-3 leading-relaxed">
              Drop us a note anytime.
            </p>
            <p className="text-[13px] text-[#9c9a96] mt-10">
              &copy; SHYNE 2026
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e8e3dc]/40 py-4 px-6 md:px-10">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] text-[#9c9a96]">Country/region:</span>
          <button className="text-[11px] text-[#9c9a96] underline underline-offset-2 hover:text-charcoal transition-colors duration-300">
            United Kingdom (GBP £)
          </button>
        </div>
      </div>
    </footer>

    {/* Modals */}
    <ContactFormModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    <AffiliateFormModal isOpen={affiliateModalOpen} onClose={() => setAffiliateModalOpen(false)} />
    </>
  );
}
