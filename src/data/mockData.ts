import { Product, Review, RatingDistribution } from '../types/product';

export const product: Product = {
  id: '1',
  name: "Children's Dinosaur Pajama Set",
  description: "Adorable and comfortable pajama set featuring playful dinosaur designs. Made from 100% organic cotton that's gentle on your child's skin. These pajamas are perfect for bedtime stories and sweet dreams.",
  price: 34.99,
  discountPrice: 29.99,
  rating: 4.8,
  reviewCount: 156,
  images: [
    'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=1000',
    'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1000',
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000',
    'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1000',
  ],
  colors: [
    { name: 'Green', value: '#4CAF50' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Pink', value: '#FF4081' },
    { name: 'Yellow', value: '#FFEB3B' },
  ],
  sizes: ['2T', '3T', '4T', '5T', '6'],
  features: [
    '100% Organic Cotton',
    'Tagless design for comfort',
    'Non-slip foot grips',
    'Machine washable',
    'Snug fit for safety',
  ],
  inStock: true,
  brand: 'Organic Dreams'
};

export const pumaProducts: Product[] = [
  {
    id: 'puma1',
    name: "Puma Red Sport T-Shirt & Socks Set",
    description: "Sporty and stylish red Puma t-shirt with matching black and red socks. Perfect for active kids who love to play and look cool.",
    price: 34.99,
    rating: 4.7,
    reviewCount: 42,
    images: ['/lovable-uploads/5754ea2e-950a-497b-8481-99499b62e764.png'],
    colors: [
      { name: 'Red', value: '#FF0000' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [
      'Moisture-wicking fabric',
      'Breathable material',
      'Matching socks included',
      'Machine washable',
      'Official Puma merchandise'
    ],
    inStock: true,
    brand: 'Puma',
    category: 'Set',
    ageRange: '4-8 years',
    tags: ['sports', 'active', 'red', 'set']
  },
  {
    id: 'puma2',
    name: "Puma Classic Raglan T-Shirt",
    description: "Classic white and gray raglan sleeve t-shirt with the iconic Puma logo. A timeless piece for everyday wear.",
    price: 29.99,
    rating: 4.6,
    reviewCount: 38,
    images: ['/lovable-uploads/761ea3ff-40e2-457d-84f2-d1bb82065633.png'],
    colors: [
      { name: 'White/Gray', value: '#EEEEEE' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [
      'Cotton-blend fabric',
      'Raglan sleeve design',
      'Comfortable fit',
      'Machine washable',
      'Official Puma merchandise'
    ],
    inStock: true,
    brand: 'Puma',
    category: 'Tops',
    ageRange: '4-8 years',
    tags: ['casual', 'everyday', 'raglan']
  },
  {
    id: 'puma3',
    name: "Puma Graphic Red T-Shirt",
    description: "Bold red t-shirt with athletic graphic text design. Show off your sportier side with this vibrant Puma tee.",
    price: 27.99,
    rating: 4.5,
    reviewCount: 31,
    images: ['/lovable-uploads/85e5cba9-699f-4c04-b837-ae63a2d20237.png'],
    colors: [
      { name: 'Red', value: '#FF0000' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [
      'Soft cotton material',
      'Bold graphic design',
      'Athletic fit',
      'Machine washable',
      'Official Puma merchandise'
    ],
    inStock: true,
    brand: 'Puma',
    category: 'Tops',
    ageRange: '4-8 years',
    tags: ['sports', 'graphic', 'red']
  },
  {
    id: 'puma4',
    name: "Puma Girls Floral Set",
    description: "Pretty pink t-shirt with floral Puma text design and matching floral leggings. Perfect for active girls who love a touch of style.",
    price: 39.99,
    rating: 4.9,
    reviewCount: 47,
    images: ['/lovable-uploads/d63a9b83-76c4-4d33-a915-ebef09e1b705.png'],
    colors: [
      { name: 'Pink', value: '#FFC0CB' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [
      'Stretchy comfortable fabric',
      'Floral pattern design',
      'Matching set',
      'Machine washable',
      'Official Puma merchandise'
    ],
    inStock: true,
    brand: 'Puma',
    category: 'Set',
    ageRange: '4-8 years',
    gender: 'girl',
    tags: ['floral', 'pink', 'set', 'girls']
  },
  {
    id: 'puma5',
    name: "Puma Girls Glitter Logo T-Shirt",
    description: "Stylish black t-shirt with a glittery Puma logo that sparkles. Fashion-forward design for trendy young girls.",
    price: 32.99,
    rating: 4.7,
    reviewCount: 36,
    images: ['/lovable-uploads/de2a3b1d-d4d3-4fc3-b978-d8912e563d38.png'],
    colors: [
      { name: 'Black', value: '#000000' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [
      'Soft cotton material',
      'Glitter logo application',
      'Comfortable fit',
      'Machine washable',
      'Official Puma merchandise'
    ],
    inStock: true,
    brand: 'Puma',
    category: 'Tops',
    ageRange: '4-8 years',
    gender: 'girl',
    tags: ['glitter', 'black', 'fashion', 'girls']
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Miller',
    rating: 5,
    date: '2023-11-15',
    title: "My son's favorite pajamas",
    content: "These dinosaur pajamas are absolutely adorable and my 4-year-old refuses to wear anything else to bed! The material is incredibly soft, and they've held up well after multiple washes. The colors are still vibrant and the fit is perfect. Highly recommended!",
    helpful: 34,
    notHelpful: 2,
  },
  {
    id: '2',
    author: 'James Thompson',
    rating: 4,
    date: '2023-10-28',
    title: 'Great quality but sizing runs small',
    content: 'The quality of these pajamas is excellent and my daughter loves the dinosaur design. My only complaint is that they run a bit small. I would recommend ordering one size up for a comfortable fit. Otherwise, these are fantastic pajamas that are worth every penny.',
    helpful: 22,
    notHelpful: 3,
  },
  {
    id: '3',
    author: 'Emily Wilson',
    rating: 5,
    date: '2023-09-12',
    title: 'Perfect for my dino-loving twins',
    content: "I bought these for my twins who are obsessed with dinosaurs, and they absolutely love them! The organic cotton is so soft and gentle on their sensitive skin. They've been washed dozens of times and still look brand new. Will definitely purchase more from this brand!",
    helpful: 29,
    notHelpful: 1,
  },
];

export const ratingDistribution: RatingDistribution[] = [
  { rating: 5, count: 112, percentage: 72 },
  { rating: 4, count: 31, percentage: 20 },
  { rating: 3, count: 8, percentage: 5 },
  { rating: 2, count: 3, percentage: 2 },
  { rating: 1, count: 2, percentage: 1 },
];

export const relatedProducts: Product[] = [
  {
    id: '2',
    name: "Children's Unicorn T-shirt",
    description: "Magical unicorn t-shirt made from 100% organic cotton. Perfect for everyday wear or special occasions.",
    price: 19.99,
    rating: 4.6,
    reviewCount: 94,
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000'],
    colors: [
      { name: 'Purple', value: '#9C27B0' },
      { name: 'Pink', value: '#FF4081' },
    ],
    sizes: ['2T', '3T', '4T', '5T', '6'],
    features: [],
    inStock: true,
  },
  {
    id: 'puma1',
    name: "Puma Red Sport T-Shirt & Socks Set",
    description: "Sporty and stylish red Puma t-shirt with matching black and red socks. Perfect for active kids who love to play and look cool.",
    price: 34.99,
    rating: 4.7,
    reviewCount: 42,
    images: ['/lovable-uploads/5754ea2e-950a-497b-8481-99499b62e764.png'],
    colors: [
      { name: 'Red', value: '#FF0000' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [],
    inStock: true,
    brand: 'Puma',
  },
  {
    id: 'puma4',
    name: "Puma Girls Floral Set",
    description: "Pretty pink t-shirt with floral Puma text design and matching floral leggings. Perfect for active girls who love a touch of style.",
    price: 39.99,
    rating: 4.9,
    reviewCount: 47,
    images: ['/lovable-uploads/d63a9b83-76c4-4d33-a915-ebef09e1b705.png'],
    colors: [
      { name: 'Pink', value: '#FFC0CB' },
    ],
    sizes: ['4', '5', '6', '7', '8'],
    features: [],
    inStock: true,
    brand: 'Puma',
  },
  {
    id: '5',
    name: "Animal Friends Socks Set",
    description: "Adorable set of 5 pairs of socks featuring different animal friends. Soft, comfortable, and non-slip.",
    price: 14.99,
    rating: 4.5,
    reviewCount: 72,
    images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000'],
    colors: [
      { name: 'Assorted', value: '#8BC34A' },
    ],
    sizes: ['S', 'M', 'L'],
    features: [],
    inStock: true,
  },
];
