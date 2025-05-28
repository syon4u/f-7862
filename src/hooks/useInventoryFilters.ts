
import { useState, useMemo } from 'react';
import { Product } from '@/types/product';

export const useInventoryFilters = (products: Product[]) => {
  const [filters, setFilters] = useState({
    search: '',
    inStock: 'all' as 'all' | 'in-stock' | 'out-of-stock',
    category: '',
    gender: ''
  });

  // Get unique categories from products
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach(product => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    return Array.from(categorySet);
  }, [products]);
  
  // Get unique genders from products
  const genders = useMemo(() => {
    const genderSet = new Set<string>();
    products.forEach(product => {
      if (product.gender) {
        genderSet.add(product.gender);
      }
    });
    return Array.from(genderSet);
  }, [products]);
  
  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const searchMatch = filters.search === '' || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(filters.search.toLowerCase()));
      
      // Stock status filter
      const stockMatch = filters.inStock === 'all' || 
        (filters.inStock === 'in-stock' && product.inStock) ||
        (filters.inStock === 'out-of-stock' && !product.inStock);
      
      // Category filter
      const categoryMatch = filters.category === '' || 
        product.category === filters.category;
      
      // Gender filter
      const genderMatch = filters.gender === '' || 
        product.gender === filters.gender;
      
      return searchMatch && stockMatch && categoryMatch && genderMatch;
    });
  }, [products, filters]);

  const handleFilter = (newFilters: {
    search: string;
    inStock: 'all' | 'in-stock' | 'out-of-stock';
    category: string;
    gender: string;
  }) => {
    setFilters(newFilters);
  };

  return {
    filteredProducts,
    categories,
    genders,
    handleFilter
  };
};
