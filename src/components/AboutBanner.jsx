import { motion } from 'framer-motion';

export default function AboutBanner() {
  return (
    <section id="about" className="relative rounded-xl overflow-hidden mx-4 md:mx-6 my-4">
      <div className="relative w-full aspect-[2.1/1] min-h-[480px] md:min-h-[580px]">
        <img
          src="https://www.rhodeskin.com/cdn/shop/files/hp-aus-nz-launch-full-bleed-desktop_8e2c2d9a-7440-4950-8226-274b18d6ea63_1800x.jpg?v=1777511557"
          alt="rhode about"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-white/50" />

        {/* Text overlay — centred, top-biased */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 md:pt-16 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-display text-[18px] md:text-[22px] font-semibold text-[#3d3b37] tracking-[-0.01em] italic">
              one of everything really good
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 md:mt-6 text-[14px] md:text-[15px] leading-relaxed text-[#3d3b37] max-w-lg mx-auto"
            >
              At rhode, our philosophy is to make one of everything really good.
              {' '}To us, that means a collection of intentional, high-performance essentials
              {' '}you reach for everyday. The ones you love, rely on, and always come back
              {' '}to for ultimate barrier nourishment, tint, and glow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <a
                href="#shop"
                className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-medium border border-[#3d3b37] text-[#3d3b37] rounded-full hover:bg-[#3d3b37] hover:text-white transition-all duration-500"
              >
                Shop Rhode
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
