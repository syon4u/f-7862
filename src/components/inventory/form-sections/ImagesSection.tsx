
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

interface ImagesSectionProps {
  product: Partial<Product>;
  onImageUploaded: (imageUrl: string) => void;
  onRemoveImage: (imageUrl: string) => void;
  onAddColor: (e: React.FormEvent<HTMLFormElement>) => void;
  onAddSize: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({
  product,
  onImageUploaded,
  onRemoveImage,
  onAddColor,
  onAddSize
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Images & Variants</h3>

      <div>
        <Label className="block mb-2">Product Images</Label>
        <ImageUploader onImageUploaded={onImageUploaded} />
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Current Images</h4>
          <div className="grid grid-cols-2 gap-2">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <div key={idx} className="relative group border rounded-md overflow-hidden aspect-square">
                  <img 
                    src={img} 
                    alt={`Product image ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(img)}
                    className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex items-center justify-center h-24 bg-gray-50 border border-dashed rounded-md">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">No images added yet</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="addColor">Add Colors</Label>
        <form onSubmit={onAddColor} className="space-y-2">
          <div className="flex gap-2">
            <Input 
              name="colorName" 
              placeholder="Color name" 
              className="flex-1"
            />
            <Input 
              name="colorValue" 
              placeholder="#FF0000" 
              className="flex-1"
            />
          </div>
          <Input 
            name="culturalMeaning" 
            placeholder="Cultural meaning (optional)"
            className="w-full"
          />
          <Button type="submit" size="sm" className="w-full">Add Color</Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.colors?.map((color, i) => (
            <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color.value }} 
              />
              {color.name}
              {color.culturalMeaning && (
                <span className="text-xs text-muted-foreground">({color.culturalMeaning})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="addSize">Add Sizes</Label>
        <Input
          id="addSize"
          placeholder="Type size and press Enter (e.g. S, M, L, 2T, 3T)"
          onKeyDown={onAddSize}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {product.sizes?.map((size, i) => (
            <div key={i} className="bg-muted px-2 py-1 rounded-md text-sm">
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesSection;
