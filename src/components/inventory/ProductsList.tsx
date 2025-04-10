
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import InventorySeeder from '@/components/InventorySeeder';
import { Button } from '@/components/ui/button';

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  onAddClick 
}) => {
  if (products.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 border rounded-lg">
        <h3 className="text-xl font-semibold text-muted-foreground">No products in inventory</h3>
        <p className="mb-4">Add products to see them here</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <InventorySeeder />
          <Button onClick={onAddClick}>Add Product Manually</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ProductsList;
