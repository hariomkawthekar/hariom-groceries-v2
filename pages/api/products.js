export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Sample products - Firebase-ready structure
    const sampleProducts = [
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
        name: 'Fortune Sunflower Oil',
        category: 'Oil',
        price: 600,
        unit: '5 liter bottle',
        image: '/images/fortune sunflower oil.jpg',
        inStock: true
      },
      {
        id: 5,
        name: 'Amul Gold Milk',
        category: 'Dairy',
        price: 55,
        unit: 'liter',
        image: '/images/Amul-gold.webp',
        inStock: true
      },
      {
        id: 6,
        name: 'Dairy Milk Chocolate',
        category: 'Chocolate',
        price: 99,
        unit: 'piece',
        image: '/images/Dairy Milk Chocolate.jfif',
        inStock: true
      },
      
    ];

    res.status(200).json(sampleProducts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

