import { useCart } from '../store/CartContext';

/**
 * Shopping-bag icon with a live item-count badge.
 * variant="light"  → white icon  (homepage dark hero header)
 * variant="dark"   → charcoal icon (sticky product / about headers)
 */
export default function CartBadge({ variant = 'dark' }) {
  const { itemCount } = useCart();

  const cls = variant === 'light'
    ? 'text-white/80 hover:text-white'
    : 'text-[#67645e] hover:text-[#3d3b37]';

  return (
    <a
      href="/cart"
      aria-label={`Shopping bag — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
      className={`relative inline-flex items-center transition-colors duration-300 ${cls}`}
    >
      <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-[#b4502f] text-white
                         text-[9px] font-bold rounded-full flex items-center justify-center
                         px-0.5 leading-none pointer-events-none">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </a>
  );
}
