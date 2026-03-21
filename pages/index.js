import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCard'
import { motion } from 'framer-motion'
import { FiGrid, FiList } from 'react-icons/fi'

// Sample product data
const products = [
  {
    id: 1,
    name: 'Premium Basmati Rice',
    category: 'Grains',
    price: 80,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
    inStock: true
  },
  {
    id: 2,
    name: 'India Gate Basmati Rice',
    category: 'Grains',
    price: 120,
    unit: 'kg',
    image: '/images/india Gate Basmati Rice.jfif',
    inStock: true
  },
  {
    id: 3,
    name: 'Samrat Atta',
    category: 'Grains',
    price: 310,
    unit: '5kg',
    image: '/images/Samrat Atta.jfif',
    inStock: true
  },
  {
    id: 4,
    name: 'Sunflower Oil',
    category: 'Oil',
    price: 600,
    unit: '5 liter bottle',
    image: '/images/fortune sunflower oil.jpg',
    inStock: true
  },
  {
    id: 5,
    name: 'Amul Gold',
    category: 'Dairy',
    price: 55,
    unit: 'liter',
    image: '/images/Amul-gold.webp',
    inStock: true
  }
]

export default function Home({ cartItems, setCartItems }) {
  const router = useRouter()
  const [internalSearchQuery, setInternalSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [view, setView] = useState('grid')

  // Sync search query from URL params
  useEffect(() => {
    const searchParam = router.query.search
    const queryValue = Array.isArray(searchParam) ? searchParam[0] : searchParam || ''
    setInternalSearchQuery(queryValue)
  }, [router.query.search])

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(p => p.id === product.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + product.quantity }
        return updated
      }
      return [...prev, product]
    })
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]
  
  const searchedProducts = !internalSearchQuery.trim() 
    ? products 
    : products.filter(p => p.name.toLowerCase().includes(internalSearchQuery.trim().toLowerCase()))
  
  const filteredProducts = selectedCategory === 'All' 
    ? searchedProducts 
    : searchedProducts.filter(p => p.category === selectedCategory)
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-[calc(100vh-80px)]">
      {/* Filters & Sorting */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
          <div className="space-y-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sorting */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>

        {/* View Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">View</label>
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                view === 'grid' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-gray-300 hover:shadow-sm'
              }`}
            >
              <FiGrid className="mx-auto h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                view === 'list' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-gray-300 hover:shadow-sm'
              }`}
            >
              <FiList className="mx-auto h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Products */}
      <motion.div
        layout
        className={view === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }
      >
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        ))}
      </motion.div>

      {sortedProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          {internalSearchQuery.trim() && (
            <p className="text-sm text-gray-400">Showing results for: "{internalSearchQuery}"</p>
          )}
        </motion.div>
      )}

      {/* Load More */}
      {sortedProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105 shadow-lg">
            Load More Products
          </button>
        </motion.div>
      )}
    </div>
  )
}

