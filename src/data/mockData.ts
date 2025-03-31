
import { Product, Review, RatingDistribution } from '../types/product';

export const product: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear audio and exceptional comfort with our Premium Wireless Headphones. Featuring advanced noise cancellation, premium materials, and up to 30 hours of battery life. Perfect for audiophiles and casual listeners alike.',
  price: 299.99,
  discountPrice: 249.99,
  rating: 4.7,
  reviewCount: 128,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1000',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000',
    'https://images.unsplash.com/photo-1563330232-57114bb0823c?q=80&w=1000',
  ],
  colors: [
    { name: 'Matte Black', value: '#0f0f0f' },
    { name: 'Silver Gray', value: '#d1d1d1' },
    { name: 'Navy Blue', value: '#1a2456' },
    { name: 'Rose Gold', value: '#e6c7c2' },
  ],
  sizes: ['One Size'],
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium memory foam ear cushions',
    'Voice assistant compatible',
    'Fast charging - 5 hours of playback with 10 min charge',
  ],
  inStock: true,
};

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Alex Johnson',
    rating: 5,
    date: '2023-11-15',
    title: "Best headphones I've ever owned",
    content: "These headphones have completely transformed my listening experience. The sound quality is incredible, with deep bass and crystal clear highs. The noise cancellation works perfectly for my commute and office work. Battery life exceeds expectations - I only need to charge once a week with daily use. Highly recommended!",
    helpful: 24,
    notHelpful: 2,
  },
  {
    id: '2',
    author: 'Morgan Smith',
    rating: 4,
    date: '2023-10-28',
    title: 'Great quality but a bit heavy',
    content: 'Sound quality is superb and the noise cancellation is top-notch. My only complaint is that they get a bit heavy during long listening sessions. Otherwise, these are fantastic headphones that I would recommend to anyone looking for premium audio.',
    helpful: 18,
    notHelpful: 3,
  },
  {
    id: '3',
    author: 'Jamie Wilson',
    rating: 5,
    date: '2023-09-12',
    title: 'Worth every penny',
    content: 'After trying several high-end headphones, these are by far the best. The sound quality is phenomenal and the comfort is unmatched. I can wear them all day without any discomfort. The battery life is impressive too!',
    helpful: 32,
    notHelpful: 1,
  },
];

export const ratingDistribution: RatingDistribution[] = [
  { rating: 5, count: 89, percentage: 70 },
  { rating: 4, count: 24, percentage: 19 },
  { rating: 3, count: 10, percentage: 8 },
  { rating: 2, count: 3, percentage: 2 },
  { rating: 1, count: 2, percentage: 1 },
];

export const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    description: 'Compact wireless earbuds with noise cancellation and premium sound quality.',
    price: 179.99,
    rating: 4.5,
    reviewCount: 86,
    images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=1000'],
    colors: [
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#000000' },
    ],
    sizes: ['One Size'],
    features: [],
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Bluetooth Speaker',
    description: 'Powerful 360° sound with water resistance and 24-hour battery life.',
    price: 129.99,
    rating: 4.8,
    reviewCount: 104,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Gray', value: '#808080' },
    ],
    sizes: ['One Size'],
    features: [],
    inStock: true,
  },
  {
    id: '4',
    name: 'Noise Cancelling Headphones',
    description: 'Over-ear headphones with cutting-edge noise cancellation technology.',
    price: 349.99,
    discountPrice: 299.99,
    rating: 4.6,
    reviewCount: 72,
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#ffffff' },
    ],
    sizes: ['One Size'],
    features: [],
    inStock: true,
  },
  {
    id: '5',
    name: 'Sports Wireless Earbuds',
    description: 'Sweat-resistant earbuds designed for active lifestyles.',
    price: 149.99,
    rating: 4.4,
    reviewCount: 58,
    images: ['https://images.unsplash.com/photo-1631176093617-63490a3d785a?q=80&w=1000'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Blue', value: '#0000ff' },
    ],
    sizes: ['One Size'],
    features: [],
    inStock: true,
  },
];
