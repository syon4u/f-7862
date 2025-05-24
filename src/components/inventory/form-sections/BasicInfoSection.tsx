
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface BasicInfoSectionProps {
  product: Partial<Product>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => void;
  onSwitchChange: (checked: boolean, field: keyof Product) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  product,
  onInputChange,
  onSwitchChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      
      <div>
        <Label htmlFor="productName">Product Name*</Label>
        <Input
          id="productName"
          value={product.name}
          onChange={(e) => onInputChange(e, 'name')}
          placeholder="Enter product name"
          required
        />
      </div>

      <div>
        <Label htmlFor="productDescription">Description*</Label>
        <Textarea
          id="productDescription"
          value={product.description}
          onChange={(e) => onInputChange(e, 'description')}
          placeholder="Enter product description"
          className="h-24"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="productPrice">Price*</Label>
          <Input
            id="productPrice"
            type="number"
            value={product.price || ''}
            onChange={(e) => onInputChange(e, 'price')}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
        <div>
          <Label htmlFor="productDiscountPrice">Sale Price</Label>
          <Input
            id="productDiscountPrice"
            type="number"
            value={product.discountPrice || ''}
            onChange={(e) => onInputChange(e, 'discountPrice')}
            placeholder="0.00"
            step="0.01"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="productBrand">Brand</Label>
        <Input
          id="productBrand"
          value={product.brand}
          onChange={(e) => onInputChange(e, 'brand')}
          placeholder="Enter brand name"
        />
      </div>

      <div>
        <Label htmlFor="productMaterial">Material</Label>
        <Input
          id="productMaterial"
          value={product.material}
          onChange={(e) => onInputChange(e, 'material')}
          placeholder="e.g., 100% Cotton, Organic Cotton"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="inStock"
          checked={product.inStock}
          onCheckedChange={(checked) => onSwitchChange(checked, 'inStock')}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isBox"
          checked={product.isBox}
          onCheckedChange={(checked) => onSwitchChange(checked, 'isBox')}
        />
        <Label htmlFor="isBox">Is Box Product</Label>
      </div>
    </div>
  );
};

export default BasicInfoSection;
