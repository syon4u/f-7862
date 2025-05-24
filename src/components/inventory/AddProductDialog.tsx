
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';
import BasicInfoSection from './form-sections/BasicInfoSection';
import CategoriesSection from './form-sections/CategoriesSection';
import HeritageSection from './form-sections/HeritageSection';
import ImagesSection from './form-sections/ImagesSection';

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
          <BasicInfoSection
            product={newProduct}
            onInputChange={handleInputChange}
            onSwitchChange={handleSwitchChange}
          />

          <CategoriesSection
            product={newProduct}
            onSelectChange={handleSelectChange}
            onAddFeature={handleAddFeature}
            onRemoveFeature={removeFeature}
            onAddTag={handleAddTag}
            onRemoveTag={removeTag}
            onInputChange={handleInputChange}
          />

          <div className="space-y-6">
            <HeritageSection
              product={newProduct}
              onSelectChange={handleSelectChange}
              onInputChange={handleInputChange}
              onSwitchChange={handleSwitchChange}
            />

            <ImagesSection
              product={newProduct}
              onImageUploaded={handleNewProductImageUpload}
              onRemoveImage={removeNewProductImage}
              onAddColor={handleAddColor}
              onAddSize={handleAddSize}
            />
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
