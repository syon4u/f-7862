
import React from 'react';
import { Product } from '@/types/product';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface HeritageSectionProps {
  product: Partial<Product>;
  onSelectChange: (value: string, field: keyof Product) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => void;
  onSwitchChange: (checked: boolean, field: keyof Product) => void;
}

const HeritageSection: React.FC<HeritageSectionProps> = ({
  product,
  onSelectChange,
  onInputChange,
  onSwitchChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Caribbean Heritage</h3>

      <div>
        <Label htmlFor="islandCollection">Island Collection</Label>
        <Select onValueChange={(value) => onSelectChange(value, 'islandCollection')}>
          <SelectTrigger>
            <SelectValue placeholder="Select island" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="Jamaica">Jamaica</SelectItem>
            <SelectItem value="Trinidad">Trinidad & Tobago</SelectItem>
            <SelectItem value="Barbados">Barbados</SelectItem>
            <SelectItem value="Bahamas">Bahamas</SelectItem>
            <SelectItem value="Cuba">Cuba</SelectItem>
            <SelectItem value="Haiti">Haiti</SelectItem>
            <SelectItem value="Dominican Republic">Dominican Republic</SelectItem>
            <SelectItem value="Puerto Rico">Puerto Rico</SelectItem>
            <SelectItem value="Grenada">Grenada</SelectItem>
            <SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="culturalSignificance">Cultural Significance</Label>
        <Textarea
          id="culturalSignificance"
          value={product.culturalSignificance}
          onChange={(e) => onInputChange(e, 'culturalSignificance')}
          placeholder="Describe cultural meaning or significance"
          className="h-20"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="localDesigner"
          checked={product.localDesigner}
          onCheckedChange={(checked) => onSwitchChange(checked, 'localDesigner')}
        />
        <Label htmlFor="localDesigner">Local Designer</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="sustainablySourced"
          checked={product.sustainablySourced}
          onCheckedChange={(checked) => onSwitchChange(checked, 'sustainablySourced')}
        />
        <Label htmlFor="sustainablySourced">Sustainably Sourced</Label>
      </div>
    </div>
  );
};

export default HeritageSection;
