import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'shyne_cart_v1';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex(i => i.slug === action.item.slug);
      if (idx >= 0) {
        const next = [...state];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + action.item.quantity };
        return next;
      }
      return [...state, action.item];
    }
    case 'REMOVE': return state.filter(i => i.slug !== action.slug);
    case 'QTY':
      if (action.qty <= 0) return state.filter(i => i.slug !== action.slug);
      return state.map(i => i.slug === action.slug ? { ...i, quantity: action.qty } : i);
    case 'CLEAR': return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    dispatch({
      type: 'ADD',
      item: {
        slug: product.slug,
        name: product.shortName,
        subtitle: product.subtitle,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images.thumb,
        quantity,
      },
    });
  }, []);

  const removeItem = useCallback((slug) => dispatch({ type: 'REMOVE', slug }), []);
  const updateQuantity = useCallback((slug, qty) => dispatch({ type: 'QTY', slug, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal  = items.reduce((s, i) => s + i.salePrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside <CartProvider>');
  return ctx;
}
