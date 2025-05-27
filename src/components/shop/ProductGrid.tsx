
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ClothingItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  age: string;
  color: string;
  rating: number;
  sale: boolean;
  salePrice?: number;
  new: boolean;
}

interface ProductGridProps {
  items: ClothingItem[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="relative">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 product-image-shine" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/placeholder.svg';
              }}
            />
            {item.sale && (
              <div className="absolute top-3 left-3 bg-kid-pink text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                SALE
              </div>
            )}
            {item.new && (
              <div className="absolute top-3 right-3 bg-kid-green text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                NEW
              </div>
            )}
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute bottom-3 right-3 bg-white text-primary hover:bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-league-spartan font-medium text-lg">{item.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{item.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="uppercase text-xs px-2 py-0.5 bg-kid-blue/20 text-kid-blue rounded-full">
                {item.category}
              </span>
              <span className="uppercase text-xs px-2 py-0.5 bg-kid-purple/20 text-kid-purple rounded-full">
                {item.age}
              </span>
              <span className="uppercase text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                {item.subcategory}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div>
                {item.sale ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${item.salePrice?.toFixed(2)}</span>
                    <span className="text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                )}
              </div>
              
              <Button size="sm" className="rounded-full kid-button">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
