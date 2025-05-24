
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CategoriesSectionProps {
  product: Partial<Product>;
  onSelectChange: (value: string, field: keyof Product) => void;
  onAddFeature: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveFeature: (feature: string) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  product,
  onSelectChange,
  onAddFeature,
  onRemoveFeature,
  onAddTag,
  onRemoveTag,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categories & Attributes</h3>

      <div>
        <Label htmlFor="productCategory">Category</Label>
        <Select onValueChange={(value) => onSelectChange(value, 'category')}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tops">Tops</SelectItem>
            <SelectItem value="bottoms">Bottoms</SelectItem>
            <SelectItem value="dresses">Dresses</SelectItem>
            <SelectItem value="outerwear">Outerwear</SelectItem>
            <SelectItem value="sleepwear">Sleepwear</SelectItem>
            <SelectItem value="swimwear">Swimwear</SelectItem>
            <SelectItem value="footwear">Footwear</SelectItem>
            <SelectItem value="onesies">Onesies</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="productGender">Gender</Label>
        <Select onValueChange={(value) => onSelectChange(value, 'gender')}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boy">Boy</SelectItem>
            <SelectItem value="girl">Girl</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="productAgeRange">Age Range</Label>
        <Select onValueChange={(value) => onSelectChange(value, 'ageRange')}>
          <SelectTrigger>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-3 months">0-3 months</SelectItem>
            <SelectItem value="3-6 months">3-6 months</SelectItem>
            <SelectItem value="6-12 months">6-12 months</SelectItem>
            <SelectItem value="12-18 months">12-18 months</SelectItem>
            <SelectItem value="18-24 months">18-24 months</SelectItem>
            <SelectItem value="2-3 years">2-3 years</SelectItem>
            <SelectItem value="4-5 years">4-5 years</SelectItem>
            <SelectItem value="6-7 years">6-7 years</SelectItem>
            <SelectItem value="8-10 years">8-10 years</SelectItem>
            <SelectItem value="11-12 years">11-12 years</SelectItem>
            <SelectItem value="13-14 years">13-14 years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="seasonality">Seasonality</Label>
        <Select onValueChange={(value) => onSelectChange(value, 'seasonality')}>
          <SelectTrigger>
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spring">Spring</SelectItem>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="fall">Fall</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
            <SelectItem value="year-round">Year-round</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="careInstructions">Care Instructions</Label>
        <Textarea
          id="careInstructions"
          value={product.careInstructions}
          onChange={(e) => onInputChange(e, 'careInstructions')}
          placeholder="e.g., Machine wash cold, tumble dry low"
          className="h-20"
        />
      </div>

      <div>
        <Label htmlFor="addFeature">Features</Label>
        <Input
          id="addFeature"
          placeholder="Type feature and press Enter"
          onKeyDown={onAddFeature}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {product.features?.map((feature, i) => (
            <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
              {feature}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0" 
                onClick={() => onRemoveFeature(feature)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="addTag">Tags</Label>
        <Input
          id="addTag"
          placeholder="Type tag and press Enter"
          onKeyDown={onAddTag}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {product.tags?.map((tag, i) => (
            <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
              {tag}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0" 
                onClick={() => onRemoveTag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
