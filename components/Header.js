import Link from 'next/link'
import { FiShoppingCart, FiShoppingBag } from 'react-icons/fi'
import { useState } from 'react'

export default function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FiShoppingBag className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Hariom Grocery</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/login" className="hidden md:block hover:text-primary">
            Account
          </Link>
          <button onClick={onCartClick} className="flex items-center space-x-2 hover:text-primary">
            <FiShoppingCart />
            <span>Cart ({cartItemCount})</span>
          </button>
        </div>
      </div>
    </header>
  )
}
