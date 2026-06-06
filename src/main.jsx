import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductPage from './components/ProductPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import CartPage from './components/CartPage.jsx'
import CheckoutPage from './components/CheckoutPage.jsx'
import PaymentSuccessPage from './components/PaymentSuccessPage.jsx'
import PaymentCancelPage from './components/PaymentCancelPage.jsx'
import { products } from './data/products.jsx'
import { CartProvider } from './store/CartContext.jsx'

// Lightweight path-based routing
const path = window.location.pathname.replace(/\/+$/, '')
const productMatch = path.match(/^\/products\/(.+)$/)
const slug = path === '/product' ? 'bare-vanilla-glow-oil' : productMatch?.[1]
const product = slug ? products[slug] : null

let Page
if (path === '/about')             Page = <AboutPage />
else if (path === '/cart')         Page = <CartPage />
else if (path === '/checkout')     Page = <CheckoutPage />
else if (path === '/payment/success') Page = <PaymentSuccessPage />
else if (path === '/payment/cancel')  Page = <PaymentCancelPage />
else if (product)                  Page = <ProductPage product={product} />
else                               Page = <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      {Page}
    </CartProvider>
  </StrictMode>,
)
