
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from '@/components/ui/use-toast';

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAddProduct 
}) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    images: [],
    colors: [],
    sizes: [],
    rating: 4.5,
    reviewCount: 0,
    features: [],
    inStock: true,
    gender: 'unisex',
    ageRange: '5-7',
    category: 'tops',
    tags: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (value: string, field: keyof Product) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const tag = e.currentTarget.value.trim();
      setNewProduct(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string) => {
    setNewProduct(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
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
    
    setNewProduct(prev => ({
      ...prev,
      colors: [...(prev.colors || []), newColor]
    }));
    
    form.reset();
  };

  const handleAddSize = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const size = e.currentTarget.value.trim();
      setNewProduct(prev => ({
        ...prev,
        sizes: [...(prev.sizes || []), size]
      }));
      e.currentTarget.value = '';
    }
  };

  const handleNewProductImageUpload = (imageUrl: string) => {
    setNewProduct(prev => ({
      ...prev,
      images: [...(prev.images || []), imageUrl]
    }));
  };

  const removeNewProductImage = (imageUrl: string) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter(url => url !== imageUrl) || []
    }));
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      ...newProduct as Product,
      id: `prod-${Date.now()}`,
      colors: newProduct.colors || [],
      sizes: newProduct.sizes || [],
      features: newProduct.features || [],
      images: newProduct.images && newProduct.images.length > 0 ? newProduct.images : ['/placeholder.svg'],
      rating: newProduct.rating || 4.5,
      reviewCount: newProduct.reviewCount || 0,
      inStock: newProduct.inStock !== false
    };

    onAddProduct(product);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      images: [],
      colors: [],
      sizes: [],
      rating: 4.5,
      reviewCount: 0,
      features: [],
      inStock: true,
      gender: 'unisex',
      ageRange: '5-7',
      category: 'tops',
      tags: []
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to inventory
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name*</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => handleInputChange(e, 'name')}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="productPrice">Price*</Label>
              <Input
                id="productPrice"
                type="number"
                value={newProduct.price || ''}
                onChange={(e) => handleInputChange(e, 'price')}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div>
              <Label htmlFor="productDiscountPrice">Discount Price (Optional)</Label>
              <Input
                id="productDiscountPrice"
                type="number"
                value={newProduct.discountPrice || ''}
                onChange={(e) => handleInputChange(e, 'discountPrice')}
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="productCategory">Category</Label>
              <Select onValueChange={(value) => handleSelectChange(value, 'category')}>
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
              <Label htmlFor="productGender">Gender</Label>
              <Select onValueChange={(value) => handleSelectChange(value, 'gender')}>
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
              <Select onValueChange={(value) => handleSelectChange(value, 'ageRange')}>
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
              <Label htmlFor="productDescription">Description*</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => handleInputChange(e, 'description')}
                placeholder="Enter product description"
                className="h-20"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="block mb-2">Product Images</Label>
              <ImageUploader onImageUploaded={handleNewProductImageUpload} />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {newProduct.images && newProduct.images.length > 0 ? (
                    newProduct.images.map((img, idx) => (
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
                          onClick={() => removeNewProductImage(img)}
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
              <Label htmlFor="addColor">Add Colors</Label>
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
                {newProduct.colors?.map((color, i) => (
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
              <Label htmlFor="addSize">Add Sizes</Label>
              <Input
                id="addSize"
                placeholder="Type size and press Enter (e.g. S, M, L)"
                onKeyDown={handleAddSize}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newProduct.sizes?.map((size, i) => (
                  <div key={i} className="bg-muted px-2 py-1 rounded-md text-sm">
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="addTag">Add Tags</Label>
              <Input
                id="addTag"
                placeholder="Type tag and press Enter (e.g. new, sale)"
                onKeyDown={handleAddTag}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newProduct.tags?.map((tag, i) => (
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
