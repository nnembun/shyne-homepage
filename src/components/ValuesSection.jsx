import { motion } from 'framer-motion';

const CDN = 'https://www.rhodeskin.com/cdn/shop/files/';

const values = ['Our Philosophy', 'Brand Story', 'Our Message'];

export default function ValuesSection() {
  return (
    <section id="values" className="px-4 md:px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {/* Left - Text + Values List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-[#faf9f7] rounded-xl p-8 md:p-12 flex flex-col justify-between min-h-[500px]"
        >
          <div>
            <h2 className="font-display text-[24px] md:text-[32px] lg:text-[38px] font-light leading-[1.2] text-[#67645e] tracking-[-0.01em]">
              <span className="uppercase font-normal tracking-[0.02em]">Restore</span>,{' '}
              <span className="uppercase font-normal tracking-[0.02em]">Protect</span>,{' '}
              <span className="uppercase font-normal tracking-[0.02em]">Nurture</span>{' '}
              the skin you have today for radiant results tomorrow.
            </h2>

            <div className="mt-8">
              <a
                href="#"
                className="inline-block px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-medium border border-[#67645e] text-[#67645e] rounded-full hover:bg-[#67645e] hover:text-white transition-all duration-500"
              >
                Our Values
              </a>
            </div>
          </div>

          {/* Values List */}
          <div className="mt-10">
            {values.map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="border-t border-[#e0dbd5] py-5">
                  <span className="text-[18px] md:text-[22px] font-light text-[#84827e] capitalize">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Lifestyle Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-xl overflow-hidden min-h-[400px] md:min-h-0"
        >
          <img
            src="/images/FINAL HERO SECTION BOTTOM PAGE.png"
            alt="rhode values"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
