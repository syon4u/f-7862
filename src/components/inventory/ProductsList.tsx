
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import InventorySeeder from '@/components/InventorySeeder';
import { Button } from '@/components/ui/button';
import ProductsFilter from './ProductsFilter';

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
  onFilter: (filters: {
    search: string;
    inStock: 'all' | 'in-stock' | 'out-of-stock';
    category: string;
    gender: string;
  }) => void;
  filteredProducts: Product[];
  categories: string[];
  genders: string[];
  onBulkUpload?: () => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  onAddClick, 
  onFilter,
  filteredProducts,
  categories,
  genders,
  onBulkUpload
}) => {
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;
  
  if (products.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 border rounded-lg">
        <h3 className="text-xl font-semibold text-muted-foreground">No products in inventory</h3>
        <p className="mb-4">Add products to see them here</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <InventorySeeder />
          <Button onClick={onAddClick}>Add Product Manually</Button>
          {onBulkUpload && (
            <Button variant="outline" onClick={onBulkUpload}>Bulk Upload</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductsFilter 
        onFilter={onFilter}
        categories={categories}
        genders={genders}
        onBulkUpload={onBulkUpload}
      />
      
      {filteredProducts.length === 0 && products.length > 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-semibold text-muted-foreground">No products match your filters</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
