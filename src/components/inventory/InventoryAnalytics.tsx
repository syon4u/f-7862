
import React from 'react';
import { Product } from '@/types/product';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface InventoryAnalyticsProps {
  products: Product[];
}

const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = ({ products }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Analytics</CardTitle>
        <CardDescription>Get insights about your inventory and sales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">In Stock</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => p.inStock).length}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Out of Stock</h3>
            <p className="text-3xl font-bold">
              {products.filter(p => !p.inStock).length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAnalytics;
