import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: '/images/glow with us 2.png', alt: 'glow with us 2' },
  { src: '/images/glowwithus cake png.png', alt: 'glow with us cake' },
  { src: '/images/glowwithus updated.png', alt: 'glow with us updated' },
  { src: '/images/final master image .png', alt: 'final master image' },
];

export default function ImageGallery() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 md:px-6">
      <div className="rounded-xl overflow-hidden bg-[#faf9f7] p-5 md:p-7">
        {/* Title */}
        <h3 className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#67645e] mb-5">
          glowwithus
        </h3>

        {/* Image Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto pb-5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`flex-shrink-0 w-[260px] md:w-[340px] ${i === 2 ? 'aspect-[3/4]' : 'aspect-square'} rounded-xl overflow-hidden cursor-pointer`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* Progress bar + arrows */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-[#e0dbd5] relative overflow-hidden">
            <div
              className="h-full bg-[#67645e] transition-all duration-300"
              style={{ width: `${Math.max(20, progress * 100)}%` }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-charcoal hover:text-charcoal transition-colors duration-300"
              aria-label="Previous"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-charcoal hover:text-charcoal transition-colors duration-300"
              aria-label="Next"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
