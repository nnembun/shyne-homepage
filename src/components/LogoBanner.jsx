import { motion } from 'framer-motion';

export default function LogoBanner() {
  return (
    <section className="py-8 md:py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-[#faf9f7] rounded-xl py-16 md:py-24 px-8 flex items-center justify-center overflow-hidden"
      >
        <img
          src="/PINAPPLE .png"
          alt="SHYNE banner"
          className="h-48 md:h-64 lg:h-80 object-contain"
        />
      </motion.div>
    </section>
  );
}
