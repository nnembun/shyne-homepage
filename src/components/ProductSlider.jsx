import { useRef } from 'react';
import ProductCard from './ProductCard';

const P = '/Products%20/';

const products = [
  {
    category: 'bare',
    image: P + 'Bare/Bare%20vanilla%20glow%20oil.png',
    hoverImage: P + 'Bare/bare%20model.png',
    name: 'Bare Vanilla Glow Oil',
    description: 'Weightless glow, sun-kissed skin',
    price: 15.99,
    href: '/products/bare-vanilla-glow-oil',
  },
  {
    category: 'golden',
    image: P + 'Golden%20hour%20/Golden%20hour%20glow%20.png',
    hoverImage: P + 'Golden%20hour%20/golden%20hour%20model.png',
    name: 'Golden Hour Glow',
    description: 'Radiant golden elixer',
    price: 19.99,
    href: '/products/golden-hour-glow',
  },
  {
    category: 'pearl',
    image: P + 'Pearl/Pearl%20Veil.png',
    hoverImage: P + 'Pearl/pearl%20model.png',
    name: 'Pearl Veil',
    description: 'Luminous skin tint & veil',
    price: 19.99,
    href: '/products/pearl-veil',
  },
  {
    category: 'sunset',
    image: P + 'Sunset/Sunset%20glow%20.png',
    hoverImage: P + 'Sunset/bronz%20model.png',
    name: 'Sunset Glow',
    description: 'Warm bronzing shimmer',
    price: 19.99,
    href: '/products/sunset-glow',
  },
  {
    category: 'hydro',
    image: P + 'Hydro-gel/hydo%20gel.png',
    hoverImage: P + 'Hydro-gel/hydo%20gel%20model.png',
    name: 'Hydrating Hyaluronic Acid Serum',
    description: 'Deep hydration, dewy finish',
    price: 19.99,
    href: '/products/hydrating-hyaluronic-acid-serum',
  },
  {
    category: 'glow',
    image: P + 'Glow%20polish%20bar/glow%20polish%20bar%20.png',
    hoverImage: P + 'Glow%20polish%20bar/glow%20polish%20bar%20model.png',
    name: 'Glow Polish Bar',
    description: 'Exfoliating glow ritual',
    price: 12.99,
    href: '/products/glow-polish-bar',
  },
];

export default function ProductSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="shop" className="py-4 md:py-6">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 md:px-10 pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, i) => (
          <ProductCard key={product.name} {...product} index={i} />
        ))}
      </div>

      {/* Nav arrows */}
      <div className="hidden md:flex justify-end gap-2 px-10 mt-1">
        <button
          onClick={() => scroll('left')}
          className="w-9 h-9 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors duration-300"
          aria-label="Previous products"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="w-9 h-9 rounded-full border border-[#d5cfc8] flex items-center justify-center text-[#84827e] hover:border-[#3d3b37] hover:text-[#3d3b37] transition-colors duration-300"
          aria-label="Next products"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
