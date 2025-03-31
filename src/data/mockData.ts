
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
};

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
    id: '3',
    name: "Kids Rainbow Dress",
    description: "Colorful rainbow dress that twirls beautifully. Made with soft, comfortable fabric perfect for all-day wear.",
    price: 29.99,
    rating: 4.9,
    reviewCount: 128,
    images: ['https://images.unsplash.com/photo-1531179589489-32d21f10befa?q=80&w=1000'],
    colors: [
      { name: 'Rainbow', value: '#FF9800' },
      { name: 'Blue Rainbow', value: '#03A9F4' },
    ],
    sizes: ['2T', '3T', '4T', '5T', '6'],
    features: [],
    inStock: true,
  },
  {
    id: '4',
    name: "Superhero Hoodie",
    description: "Let your little one feel like a superhero with this comfortable and warm hoodie featuring a detachable cape.",
    price: 32.99,
    discountPrice: 27.99,
    rating: 4.7,
    reviewCount: 86,
    images: ['https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1000'],
    colors: [
      { name: 'Red', value: '#F44336' },
      { name: 'Blue', value: '#2196F3' },
    ],
    sizes: ['3T', '4T', '5T', '6', '7'],
    features: [],
    inStock: true,
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
