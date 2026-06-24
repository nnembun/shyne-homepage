// Quick test to verify the Coming Soon logic
const products = {
  'bare-vanilla-glow-oil': { slug: 'bare-vanilla-glow-oil' },
  'glow-polish-bar': { slug: 'glow-polish-bar' },
  'golden-hour-glow': { slug: 'golden-hour-glow' },
  'pearl-veil': { slug: 'pearl-veil' },
  'sunset-glow': { slug: 'sunset-glow' },
  'hydrating-hyaluronic-acid-serum': { slug: 'hydrating-hyaluronic-acid-serum' },
};

const availableProducts = ['bare-vanilla-glow-oil', 'glow-polish-bar'];

Object.entries(products).forEach(([key, product]) => {
  const isComingSoon = !availableProducts.includes(product.slug);
  console.log(`${product.slug}: ${isComingSoon ? 'COMING SOON' : 'AVAILABLE'}`);
});
