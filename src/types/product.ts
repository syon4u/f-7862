
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  gender?: 'boy' | 'girl' | 'unisex';
  ageRange?: string;
  brand?: string;
  material?: string;
  tags?: string[];
  sizes?: string[];
  colors?: any;
  features?: string[];
  inStock: boolean;
  stockQuantity?: number;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Box {
  id: string;
  name: string;
  description?: string;
  price: number;
  sizes?: string[];
  itemsCount?: number;
  ageRange?: string;
  gender?: 'boy' | 'girl' | 'unisex';
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Customer {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  customerId?: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod?: 'credit-card' | 'paypal' | 'bank-transfer';
  subtotal: number;
  shippingCost?: number;
  taxAmount?: number;
  totalAmount: number;
  shippingAddressId?: string;
  billingAddressId?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: string;
  orderId?: string;
  productId?: string;
  boxId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  size?: string;
  color?: string;
  createdAt?: string;
}

export interface Address {
  id: string;
  customerId?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  parish: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
  createdAt?: string;
}

export interface Review {
  id: string;
  productId?: string;
  customerId?: string;
  rating?: number;
  title?: string;
  content?: string;
  verifiedPurchase?: boolean;
  helpfulCount?: number;
  notHelpfulCount?: number;
  createdAt?: string;
}
