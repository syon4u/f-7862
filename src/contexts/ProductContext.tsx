
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial products from localStorage and check for new product images
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // First load from localStorage for immediate display
        const storedProducts = localStorage.getItem('inventory-products');
        if (storedProducts) {
          try {
            setProducts(JSON.parse(storedProducts));
          } catch (error) {
            console.error('Failed to parse products from localStorage:', error);
          }
        }

        // Check for new product images from Supabase Storage
        try {
          const { data, error } = await supabase.storage
            .from('product-images')
            .list();

          if (error) {
            console.error('Error fetching product images:', error);
          } else if (data && data.length > 0) {
            // We have images in storage, let's update any product that doesn't have images yet
            const updatedProducts = products.map(product => {
              if (!product.images || product.images.length === 0 || (product.images.length === 1 && product.images[0] === '/placeholder.svg')) {
                // Pick a random image from the storage
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomImage = data[randomIndex];
                
                const { data: urlData } = supabase.storage
                  .from('product-images')
                  .getPublicUrl(randomImage.name);
                
                return {
                  ...product,
                  images: [urlData.publicUrl]
                };
              }
              return product;
            });
            
            setProducts(updatedProducts);
            localStorage.setItem('inventory-products', JSON.stringify(updatedProducts));
          }
        } catch (storageError) {
          console.error('Error accessing Supabase storage:', storageError);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        toast({
          title: "Error loading products",
          description: "There was a problem loading product data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('inventory-products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    toast({
      title: "Product added",
      description: "The product has been added to your inventory",
    });
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(product => product.id === id ? updatedProduct : product)
    );
    toast({
      title: "Product updated",
      description: "The product has been updated in your inventory",
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory",
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
}
