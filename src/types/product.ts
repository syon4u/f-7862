
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
  // Enhanced fields for diverse representation
  gender?: "boy" | "girl" | "unisex";
  ageRange?: string; // e.g., "0-3 months", "2-3 years"
  brand?: string;
  material?: string;
  category?: string;
  tags?: string[];
  seasonality?: string;
  careInstructions?: string;
  // Caribbean-specific fields
  islandCollection?: string; // e.g., "Jamaica", "Trinidad", "Barbados"
  culturalSignificance?: string;
  localDesigner?: boolean;
  sustainablySourced?: boolean;
  // Box-specific field
  isBox?: boolean;
}

export interface ProductColor {
  name: string;
  value: string;
  // Add cultural context for colors if relevant
  culturalMeaning?: string;
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
  // Additional fields for review enhancement
  verifiedPurchase?: boolean;
  location?: string;
  childAge?: string;
  childGender?: string;
  photos?: string[];
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}
