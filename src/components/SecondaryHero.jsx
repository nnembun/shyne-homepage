import { motion } from 'framer-motion';

export default function SecondaryHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden rounded-xl mx-auto">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/secondy hero 3.png"
          alt="SHYNE - glow without compromise"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent md:bg-gradient-to-r md:from-black/30 md:via-black/5 md:to-transparent" />
      </div>

      {/* Mobile: content pinned to bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-16 flex flex-col items-start md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            className="mb-4"
          >
            <h2 className="text-[18px] tracking-[0.08em] font-normal text-white leading-tight">
              glow without compromise.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
            className="mb-6 max-w-xs"
          >
            <p className="text-[12px] tracking-[0.02em] font-light text-white/90 leading-relaxed">
              Every SHYNE formula is designed to nourish, soften and illuminate, delivering a luminous finish while feeling lightweight and effortless on the skin. Because glow should never come at the expense of how your skin feels.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.2 }}
          >
            <a
              href="#shop"
              className="group inline-block px-6 py-2.5 border border-white/90 rounded-full text-[9px] tracking-[0.35em] uppercase font-light text-white/90 transition-all duration-500 group-hover:bg-white group-hover:text-[#3d3b37]"
            >
              Shop Shyne
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop: content in lower-left */}
      <div className="absolute inset-0 z-10 hidden md:flex items-end justify-start pl-14 lg:pl-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="flex flex-col items-start max-w-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
            className="mb-5"
          >
            <h2 className="text-[24px] tracking-[0.08em] font-normal text-white leading-tight">
              glow without compromise.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.1 }}
            className="mb-7"
          >
            <p className="text-[14px] tracking-[0.02em] font-light text-white/90 leading-relaxed">
              Every SHYNE formula is designed to nourish, soften and illuminate, delivering a luminous finish while feeling lightweight and effortless on the skin. Because glow should never come at the expense of how your skin feels.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1.3 }}
          >
            <a
              href="#shop"
              className="group inline-block px-6 py-2.5 border border-white/90 rounded-full text-[10px] tracking-[0.35em] uppercase font-light text-white/90 transition-all duration-500 group-hover:bg-white group-hover:text-[#3d3b37]"
            >
              Shop Shyne
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
