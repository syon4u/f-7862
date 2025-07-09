import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '../types/product';
import { toast } from '@/hooks/use-toast';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  loading: boolean;
  seedInventory: () => Promise<number>;
  fetchProducts: () => Promise<void>;
}

const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products from Supabase...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Fetched products:', data?.length || 0);
      
      // Transform Supabase data to match Product interface
      const transformedProducts: Product[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        discountPrice: item.discount_price ? Number(item.discount_price) : undefined,
        category: item.category_id || '',
        gender: item.gender as 'boy' | 'girl' | 'unisex' || 'unisex',
        ageRange: item.age_range || '',
        brand: item.brand || '',
        material: item.material || '',
        tags: item.tags || [],
        sizes: item.sizes || [],
        colors: item.colors || [],
        features: item.features || [],
        inStock: item.in_stock ?? true,
        stockQuantity: item.stock_quantity || 0,
        images: item.images || [],
        rating: item.rating || 0,
        reviewCount: item.review_count || 0,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error in fetchProducts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          discount_price: product.discountPrice,
          gender: product.gender,
          age_range: product.ageRange,
          brand: product.brand,
          material: product.material,
          tags: product.tags,
          sizes: product.sizes,
          colors: product.colors,
          features: product.features,
          in_stock: product.inStock,
          stock_quantity: product.stockQuantity,
          images: product.images,
          rating: product.rating,
          review_count: product.reviewCount,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchProducts(); // Refresh products
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const updateProduct = async (id: string, updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          discount_price: updatedProduct.discountPrice,
          gender: updatedProduct.gender,
          age_range: updatedProduct.ageRange,
          brand: updatedProduct.brand,
          material: updatedProduct.material,
          tags: updatedProduct.tags,
          sizes: updatedProduct.sizes,
          colors: updatedProduct.colors,
          features: updatedProduct.features,
          in_stock: updatedProduct.inStock,
          stock_quantity: updatedProduct.stockQuantity,
          images: updatedProduct.images,
          rating: updatedProduct.rating,
          review_count: updatedProduct.reviewCount,
        })
        .eq('id', id);

      if (error) throw error;

      await fetchProducts(); // Refresh products
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const seedInventory = async (): Promise<number> => {
    try {
      setLoading(true);
      console.log('Calling seed-products function...');
      
      const { data, error } = await supabase.functions.invoke('seed-products');
      
      if (error) {
        console.error('Error seeding products:', error);
        throw error;
      }

      console.log('Seed response:', data);
      await fetchProducts(); // Refresh the products list
      
      toast({
        title: "Success",
        description: `Successfully seeded ${data.products?.length || 0} products`,
      });
      
      return data.products?.length || 0;
    } catch (error) {
      console.error('Error in seedInventory:', error);
      toast({
        title: "Error",
        description: "Failed to seed inventory",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
    seedInventory,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, useProducts };