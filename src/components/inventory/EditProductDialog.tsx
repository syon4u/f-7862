
import React from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageUploader from '@/components/ImageUploader';

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct: Product | null;
  onUpdateProduct: (product: Product) => void;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onClose,
  currentProduct,
  onUpdateProduct,
  setCurrentProduct
}) => {
  if (!currentProduct) return null;

  const handleCurrentProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setCurrentProduct(prev => ({ ...prev!, [field]: value }));
  };

  const handleCurrentSelectChange = (value: string, field: keyof Product) => {
    setCurrentProduct(prev => ({ ...prev!, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const tag = e.currentTarget.value.trim();
      setCurrentProduct(prev => ({
        ...prev!,
        tags: [...(prev!.tags || []), tag]
      }));
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string) => {
    setCurrentProduct(prev => ({
      ...prev!,
      tags: prev!.tags?.filter(t => t !== tag) || []
    }));
  };

  const handleAddColor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const colorName = formData.get('colorName') as string;
    const colorValue = formData.get('colorValue') as string;
    
    if (!colorName || !colorValue) return;
    
    const newColor = { name: colorName, value: colorValue };
    
    setCurrentProduct(prev => ({
      ...prev!,
      colors: [...(prev!.colors || []), newColor]
    }));
    
    form.reset();
  };

  const handleAddSize = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const size = e.currentTarget.value.trim();
      setCurrentProduct(prev => ({
        ...prev!,
        sizes: [...(prev!.sizes || []), size]
      }));
      e.currentTarget.value = '';
    }
  };

  const handleExistingProductImageUpload = (imageUrl: string) => {
    setCurrentProduct(prev => ({
      ...prev!,
      images: [...(prev!.images || []), imageUrl]
    }));
  };

  const removeExistingProductImage = (imageUrl: string) => {
    setCurrentProduct(prev => ({
      ...prev!,
      images: prev!.images?.filter(url => url !== imageUrl) || []
    }));
  };

  const handleSave = () => {
    if (!currentProduct) return;
    onUpdateProduct(currentProduct);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details of this product
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="editProductName">Product Name*</Label>
              <Input
                id="editProductName"
                value={currentProduct.name}
                onChange={(e) => handleCurrentProductChange(e, 'name')}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="editProductPrice">Price*</Label>
              <Input
                id="editProductPrice"
                type="number"
                value={currentProduct.price || ''}
                onChange={(e) => handleCurrentProductChange(e, 'price')}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="editProductDiscountPrice">Discount Price (Optional)</Label>
              <Input
                id="editProductDiscountPrice"
                type="number"
                value={currentProduct.discountPrice || ''}
                onChange={(e) => handleCurrentProductChange(e, 'discountPrice')}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="editProductCategory">Category</Label>
              <Select 
                defaultValue={currentProduct.category} 
                onValueChange={(value) => handleCurrentSelectChange(value, 'category')}
              >
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
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="editProductGender">Gender</Label>
              <Select 
                defaultValue={currentProduct.gender} 
                onValueChange={(value) => handleCurrentSelectChange(value, 'gender')}
              >
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
              <Label htmlFor="editProductAgeRange">Age Range</Label>
              <Select 
                defaultValue={currentProduct.ageRange} 
                onValueChange={(value) => handleCurrentSelectChange(value, 'ageRange')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="2-4">2-4 years</SelectItem>
                  <SelectItem value="5-7">5-7 years</SelectItem>
                  <SelectItem value="8-10">8-10 years</SelectItem>
                  <SelectItem value="11+">11+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="editProductDescription">Description*</Label>
              <Textarea
                id="editProductDescription"
                value={currentProduct.description}
                onChange={(e) => handleCurrentProductChange(e, 'description')}
                placeholder="Enter product description"
                className="h-20"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block mb-2">Product Images</Label>
              <ImageUploader onImageUploaded={handleExistingProductImageUpload} />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {currentProduct.images && currentProduct.images.length > 0 ? (
                    currentProduct.images.map((img, idx) => (
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
                          onClick={() => removeExistingProductImage(img)}
                          className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex items-center justify-center h-24 bg-gray-50 border border-dashed rounded-md">
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
              <Label htmlFor="editAddColor">Colors</Label>
              <form onSubmit={handleAddColor} className="flex gap-2 items-center">
                <Input 
                  name="colorName" 
                  placeholder="Color name (e.g. Red)" 
                  className="flex-1"
                />
                <Input 
                  name="colorValue" 
                  placeholder="Color value (e.g. #FF0000)" 
                  className="flex-1"
                />
                <Button type="submit" size="sm">Add</Button>
              </form>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentProduct.colors?.map((color, i) => (
                  <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: color.value }} 
                    />
                    {color.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="editAddSize">Sizes</Label>
              <Input
                id="editAddSize"
                placeholder="Type size and press Enter (e.g. S, M, L)"
                onKeyDown={handleAddSize}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {currentProduct.sizes?.map((size, i) => (
                  <div key={i} className="bg-muted px-2 py-1 rounded-md text-sm">
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="editAddTag">Tags</Label>
              <Input
                id="editAddTag"
                placeholder="Type tag and press Enter (e.g. new, sale)"
                onKeyDown={handleAddTag}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {currentProduct.tags?.map((tag, i) => (
                  <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                    {tag}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="editInStock" 
                checked={currentProduct.inStock}
                onCheckedChange={(checked) => {
                  setCurrentProduct(prev => ({
                    ...prev!,
                    inStock: checked === true
                  }));
                }}
              />
              <Label htmlFor="editInStock">In Stock</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
