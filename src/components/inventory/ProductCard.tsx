
import React from 'react';
import { Product } from '@/types/product';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <Card key={product.id} className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gray-100">
          <img 
            src={product.images?.[0] || '/placeholder.svg'} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/80 hover:bg-white"
              onClick={() => onEdit(product)}
            >
              <Edit size={16} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/80 hover:bg-white text-destructive hover:text-destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold">
            ${product.price.toFixed(2)}
            {product.discountPrice && (
              <span className="ml-2 text-sm line-through text-muted-foreground">
                ${product.discountPrice.toFixed(2)}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {product.gender && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {product.gender}
            </span>
          )}
          {product.ageRange && (
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
              {product.ageRange}
            </span>
          )}
          {product.category && (
            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              {product.category}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
