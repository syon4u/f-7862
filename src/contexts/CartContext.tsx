import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  selected_size?: string;
  selected_color?: string;
  unit_price: number;
  total_price: number;
  product?: {
    name: string;
    images?: string[];
    price: number;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity: number, size?: string, color?: string, price?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  cartId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const { user } = useAuth();

  // Get or create session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('guest_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('guest_session_id', sessionId);
    }
    return sessionId;
  };

  // Initialize cart
  useEffect(() => {
    initializeCart();
  }, [user]);

  const initializeCart = async () => {
    try {
      setLoading(true);
      
      let cart;
      if (user) {
        // Get or create cart for authenticated user
        const { data: existingCart } = await supabase
          .from('shopping_carts')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (existingCart) {
          cart = existingCart;
        } else {
          const { data: newCart, error } = await supabase
            .from('shopping_carts')
            .insert({ user_id: user.id })
            .select()
            .single();
          
          if (error) throw error;
          cart = newCart;
        }
      } else {
        // Get or create cart for guest user
        const sessionId = getSessionId();
        const { data: existingCart } = await supabase
          .from('shopping_carts')
          .select('*')
          .eq('session_id', sessionId)
          .single();

        if (existingCart) {
          cart = existingCart;
        } else {
          const { data: newCart, error } = await supabase
            .from('shopping_carts')
            .insert({ session_id: sessionId })
            .select()
            .single();
          
          if (error) throw error;
          cart = newCart;
        }
      }

      setCartId(cart.id);
      await fetchCartItems(cart.id);
    } catch (error) {
      console.error('Error initializing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async (cartId: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            name,
            images,
            price
          )
        `)
        .eq('cart_id', cartId);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number, size?: string, color?: string, price?: number) => {
    if (!cartId) {
      toast({
        title: "Error",
        description: "Cart not initialized",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get product price if not provided
      if (!price) {
        const { data: product } = await supabase
          .from('products')
          .select('price')
          .eq('id', productId)
          .single();
        
        price = product?.price || 0;
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .eq('selected_size', size || '')
        .eq('selected_color', color || '')
        .single();

      if (existingItem) {
        // Update quantity of existing item
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cartId,
            product_id: productId,
            quantity,
            selected_size: size,
            selected_color: color,
            unit_price: price,
          });

        if (error) throw error;
      }

      await fetchCartItems(cartId);
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;

      if (cartId) {
        await fetchCartItems(cartId);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);

      if (error) throw error;

      setItems([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.total_price, 0);
  };

  const value: CartContextType = {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    cartId,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};