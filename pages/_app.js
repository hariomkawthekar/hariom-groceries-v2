import '@/styles/globals.css'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

export default function App({ Component, pageProps }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <main className="flex-grow">
        <Component 
          {...pageProps} 
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </main>
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </div>
  )
}
