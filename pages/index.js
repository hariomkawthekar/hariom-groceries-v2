import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import { FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi'

// Sample product data
const products = [
  {
    id: 1,
    name: 'Fresh Organic Bananas',
    category: 'Fruits',
    price: 60,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500',
    discount: 10,
    originalPrice: 66,
    inStock: true
  },
  {
    id: 2,
    name: 'Premium Basmati Rice',
    category: 'Grains',
    price: 120,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
    inStock: true
  },
  {
    id: 3,
    name: 'Farm Fresh Eggs',
    category: 'Dairy',
    price: 85,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500',
    discount: 15,
    originalPrice: 100,
    inStock: true
  },
  {
    id: 4,
    name: 'Organic Whole Wheat Flour',
    category: 'Grains',
    price: 45,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1585518419759-434cf4261d5e?w=500',
    inStock: true
  }
]

export default function Home({ cartItems, setCartItems }) {
  const [view, setView] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-primary mb-2">Fresh Groceries</h1>
          <p className="text-gray-600 text-lg">Quality products delivered to your door</p>
        </motion.div>

        {/* Filters & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Category Filter */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Sorting */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </motion.div>

          {/* View Toggle */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">View</label>
            <div className="flex gap-2">
              <button
                onClick={() => setView('grid')}
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  view === 'grid' ? 'bg-primary text-white' : 'bg-white border border-gray-300'
                }`}
              >
                <FiGrid className="mx-auto" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex-1 px-4 py-2 rounded-lg transition ${
                  view === 'list' ? 'bg-primary text-white' : 'bg-white border border-gray-300'
                }`}
              >
                <FiList className="mx-auto" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Products */}
        <motion.div
          layout
          className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}
        >
          {sortedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </motion.div>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all transform hover:scale-105">
              Load More Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
