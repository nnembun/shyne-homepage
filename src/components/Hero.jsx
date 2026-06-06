import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden rounded-xl mx-auto">
      {/* Background Image — top-anchored on mobile to keep face high, centered on desktop */}
      <div className="absolute inset-0">
        <img
          src="/images/HER SHYE.png"
          alt="SHYNE beauty editorial"
          className="w-full h-full object-cover object-top md:object-center"
        />
        {/* Gradient: bottom-fade on mobile so text reads cleanly, side-fade on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-none" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
      </div>

      {/* Mobile: button pinned to bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-14 flex flex-col items-start md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
        >
          <a
            href="#shop"
            className="group inline-block px-6 py-2.5 border border-white/90 rounded-full text-[9px] tracking-[0.35em] uppercase font-light text-white/90 transition-all duration-500 group-hover:bg-white group-hover:text-[#3d3b37]"
          >
            Shop Now
          </a>
        </motion.div>
      </div>

      {/* Desktop: button in lower-left */}
      <div className="absolute inset-0 z-10 hidden md:flex items-end justify-start pl-14 lg:pl-20 pb-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
        >
          <a
            href="#shop"
            className="group inline-block px-6 py-2.5 border border-white/90 rounded-full text-[10px] tracking-[0.35em] uppercase font-light text-white/90 transition-all duration-500 group-hover:bg-white group-hover:text-[#3d3b37]"
          >
            Shop Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
