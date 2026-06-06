import { motion } from 'framer-motion';

export default function EditorialGrid() {
  return (
    <section className="py-8 md:py-12 px-4 md:px-6">
      {/* Section Title */}
      <h2 className="text-center text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-medium text-[#67645e] mb-8 md:mb-10">
        Transformation
      </h2>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {/* Left - Before Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-xl overflow-hidden aspect-square relative"
        >
          <img
            src="/TRANSFORMATION 1/before.png"
            alt="Before transformation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-white text-[14px] md:text-[16px] tracking-[0.06em] font-medium uppercase">Before</p>
          </div>
        </motion.div>

        {/* Right - After Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="rounded-xl overflow-hidden aspect-square relative"
        >
          <img
            src="/TRANSFORMATION 1/AFTER.png"
            alt="After transformation"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-white text-[14px] md:text-[16px] tracking-[0.06em] font-medium uppercase">After</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
