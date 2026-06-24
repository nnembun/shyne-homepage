import { useState } from 'react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

const fmt = (n) => `£${Number(n).toFixed(2)}`;

export default function CheckoutPage() {
  const { items, subtotal, itemCount } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const shippingPrice = subtotal >= 45 ? 0 : 3.99;
  const total = subtotal + shippingPrice;

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white text-[#3d3b37] flex flex-col items-center justify-center px-4">
        <h1 className="text-[32px] font-light mb-4">Your bag is empty</h1>
        <p className="text-[14px] text-[#84827e] mb-8">Add some products before checking out.</p>
        <a href="/#shop"
          className="inline-flex items-center gap-2 bg-[#3d3b37] text-white text-[11px] tracking-[0.14em] uppercase font-medium rounded-full px-8 py-4 hover:bg-[#2c2a27] transition-colors">
          Shop SHYNE →
        </a>
      </div>
    );
  }

  const handleCheckout = async () => {
    setProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ slug: i.slug, quantity: i.quantity, name: i.name, price: i.price, salePrice: i.salePrice, image: i.image })),
          shipping: 'standard',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to create checkout');
        setProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#3d3b37] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[36px] font-light mb-12">Order Summary</h1>

        {/* Items */}
        <div className="bg-[#f0ede8] rounded-2xl p-8 mb-8">
          <div className="space-y-4 mb-6 pb-6 border-b border-[#dcd6cd]">
            {items.map(item => (
              <div key={item.slug} className="flex justify-between items-center">
                <div>
                  <p className="text-[14px] font-semibold text-[#3d3b37] uppercase">{item.name}</p>
                  <p className="text-[12px] text-[#84827e]">Qty {item.quantity}</p>
                </div>
                <p className="text-[14px] font-semibold text-[#3d3b37]">
                  {fmt(item.salePrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[14px] text-[#67645e]">Subtotal</span>
              <span className="text-[14px] font-medium">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[14px] text-[#67645e]">Shipping</span>
              <span className="text-[14px] font-medium">
                {shippingPrice === 0 ? <span className="text-[#b4502f]">FREE</span> : fmt(shippingPrice)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#dcd6cd]">
              <span className="text-[18px] font-semibold">Total</span>
              <span className="text-[18px] font-semibold">{fmt(total)}</span>
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[12px] text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={processing}
            className={`mt-8 w-full py-4 rounded-lg text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors ${
              processing
                ? 'bg-[#84827e] text-white cursor-not-allowed'
                : 'bg-[#3d3b37] text-white hover:bg-[#2c2a27]'
            }`}>
            {processing ? 'Processing...' : `Proceed to Secure Checkout — ${fmt(total)}`}
          </button>

          <p className="text-[11px] text-[#9c9a96] text-center mt-4">
            Secured by Stripe. You will be redirected to our secure payment page.
          </p>
        </div>

        <a href="/cart" className="text-[12px] text-[#67645e] hover:text-[#3d3b37] underline">
          ← Back to Cart
        </a>
      </div>
    </div>
  );
}
