
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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
    discountPrice: undefined,
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
    tags: [],
    brand: '',
    material: '',
    seasonality: '',
    careInstructions: '',
    islandCollection: '',
    culturalSignificance: '',
    localDesigner: false,
    sustainablySourced: false,
    isBox: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (value: string, field: keyof Product) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (checked: boolean, field: keyof Product) => {
    setNewProduct(prev => ({ ...prev, [field]: checked }));
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

  const handleAddFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const feature = e.currentTarget.value.trim();
      setNewProduct(prev => ({
        ...prev,
        features: [...(prev.features || []), feature]
      }));
      e.currentTarget.value = '';
    }
  };

  const removeFeature = (feature: string) => {
    setNewProduct(prev => ({
      ...prev,
      features: prev.features?.filter(f => f !== feature) || []
    }));
  };

  const handleAddColor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const colorName = formData.get('colorName') as string;
    const colorValue = formData.get('colorValue') as string;
    const culturalMeaning = formData.get('culturalMeaning') as string;
    
    if (!colorName || !colorValue) return;
    
    const newColor = { 
      name: colorName, 
      value: colorValue,
      ...(culturalMeaning && { culturalMeaning })
    };
    
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

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      discountPrice: undefined,
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
      tags: [],
      brand: '',
      material: '',
      seasonality: '',
      careInstructions: '',
      islandCollection: '',
      culturalSignificance: '',
      localDesigner: false,
      sustainablySourced: false,
      isBox: false
    });
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.description || newProduct.price === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields (name, description, price)",
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
      inStock: newProduct.inStock !== false,
      tags: newProduct.tags || []
    };

    onAddProduct(product);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to inventory
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
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
              <Label htmlFor="productDescription">Description*</Label>
              <Textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => handleInputChange(e, 'description')}
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
                  value={newProduct.price || ''}
                  onChange={(e) => handleInputChange(e, 'price')}
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
                  value={newProduct.discountPrice || ''}
                  onChange={(e) => handleInputChange(e, 'discountPrice')}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="productBrand">Brand</Label>
              <Input
                id="productBrand"
                value={newProduct.brand}
                onChange={(e) => handleInputChange(e, 'brand')}
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <Label htmlFor="productMaterial">Material</Label>
              <Input
                id="productMaterial"
                value={newProduct.material}
                onChange={(e) => handleInputChange(e, 'material')}
                placeholder="e.g., 100% Cotton, Organic Cotton"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={newProduct.inStock}
                onCheckedChange={(checked) => handleSwitchChange(checked, 'inStock')}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isBox"
                checked={newProduct.isBox}
                onCheckedChange={(checked) => handleSwitchChange(checked, 'isBox')}
              />
              <Label htmlFor="isBox">Is Box Product</Label>
            </div>
          </div>

          {/* Categories & Attributes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories & Attributes</h3>

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
                  <SelectItem value="accessories">Accessories</SelectItem>
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
              <Select onValueChange={(value) => handleSelectChange(value, 'seasonality')}>
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
                value={newProduct.careInstructions}
                onChange={(e) => handleInputChange(e, 'careInstructions')}
                placeholder="e.g., Machine wash cold, tumble dry low"
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="addFeature">Features</Label>
              <Input
                id="addFeature"
                placeholder="Type feature and press Enter"
                onKeyDown={handleAddFeature}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newProduct.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                    {feature}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeFeature(feature)}
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

          {/* Caribbean Heritage & Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Heritage & Product Details</h3>

            <div>
              <Label htmlFor="islandCollection">Island Collection</Label>
              <Select onValueChange={(value) => handleSelectChange(value, 'islandCollection')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select island" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
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
                value={newProduct.culturalSignificance}
                onChange={(e) => handleInputChange(e, 'culturalSignificance')}
                placeholder="Describe cultural meaning or significance"
                className="h-20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="localDesigner"
                checked={newProduct.localDesigner}
                onCheckedChange={(checked) => handleSwitchChange(checked, 'localDesigner')}
              />
              <Label htmlFor="localDesigner">Local Designer</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="sustainablySourced"
                checked={newProduct.sustainablySourced}
                onCheckedChange={(checked) => handleSwitchChange(checked, 'sustainablySourced')}
              />
              <Label htmlFor="sustainablySourced">Sustainably Sourced</Label>
            </div>

            <div>
              <Label className="block mb-2">Product Images</Label>
              <ImageUploader onImageUploaded={handleNewProductImageUpload} />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Current Images</h4>
                <div className="grid grid-cols-2 gap-2">
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
              <form onSubmit={handleAddColor} className="space-y-2">
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
                {newProduct.colors?.map((color, i) => (
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
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => { resetForm(); onClose(); }}>
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
