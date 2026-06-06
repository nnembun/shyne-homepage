import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ image, hoverImage, name, description, price, rating, reviews, badge, category, href, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex-shrink-0 w-[300px] md:w-[360px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { if (href) window.location.href = href; }}
    >
      {/* Image container */}
      <div
        className="relative bg-[#f0ede8] rounded-2xl overflow-hidden mb-3"
        style={{ paddingBottom: '116%' }}
      >
        {/* Category label — top left */}
        {category && (
          <span
            className="absolute top-4 left-4 z-10 text-[28px] md:text-[32px] font-black leading-none text-[#3d3b37]"
            style={{ fontFamily: "var(--font-product)", fontWeight: 900 }}
          >
            {category}
          </span>
        )}

        {/* Badge — top right */}
        {badge && (
          <span className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm text-[10px] tracking-[0.08em] uppercase font-medium text-[#3d3b37] rounded-full px-2.5 py-1">
            {badge}
          </span>
        )}

        {/* Main image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${hoverImage && hovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* Hover image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${name} hover`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      {/* Info */}
      <div className="px-0.5">
        {/* Stars + review count */}
        {rating && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < Math.round(rating) ? 'text-[#3d3b37]' : 'text-[#d5cfc8]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-[#9c9a96]">({reviews?.toLocaleString()})</span>
          </div>
        )}

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[13px] tracking-[0.04em] uppercase font-bold text-[#3d3b37]">
              {name}
            </h3>
            {description && (
              <p className="text-[12px] text-[#9c9a96] mt-0.5 font-normal">{description}</p>
            )}
          </div>
          <span className="text-[13px] font-bold text-[#3d3b37] whitespace-nowrap">£{price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
