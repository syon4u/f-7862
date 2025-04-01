
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  features: string[];
  inStock: boolean;
  // Added fields
  gender?: string;
  ageRange?: string;
  brand?: string;
  material?: string;
  category?: string;
  tags?: string[];
  seasonality?: string;
  careInstructions?: string;
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}
