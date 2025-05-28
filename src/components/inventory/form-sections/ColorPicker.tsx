
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  product: Partial<Product>;
  onAddColor: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ product, onAddColor }) => {
  return (
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
  );
};

export default ColorPicker;
