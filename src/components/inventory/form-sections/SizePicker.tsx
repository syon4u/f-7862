
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SizePickerProps {
  product: Partial<Product>;
  onAddSize: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SizePicker: React.FC<SizePickerProps> = ({ product, onAddSize }) => {
  return (
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
  );
};

export default SizePicker;
