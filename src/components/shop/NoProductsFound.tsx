
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NoProductsFoundProps {
  hasFilters: boolean;
  productsCount: number;
  onClearFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ 
  hasFilters, 
  productsCount, 
  onClearFilters 
}) => {
  return (
    <div className="text-center py-16 bg-muted/20 rounded-lg">
      <h3 className="text-xl font-league-spartan mb-2">No items found</h3>
      <p className="text-muted-foreground">
        {productsCount > 0 
          ? "Try adjusting your filters to find what you're looking for" 
          : "No products found in inventory. Please add products in the Admin Inventory page."}
      </p>
      {hasFilters && (
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      )}
      {productsCount === 0 && (
        <Button 
          variant="outline" 
          className="mt-4"
          asChild
        >
          <Link to="/admin-inventory">Go to Inventory Management</Link>
        </Button>
      )}
    </div>
  );
};

export default NoProductsFound;
