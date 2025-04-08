import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/types/product';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Trash, Edit, Plus, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import ImageUploader from '@/components/ImageUploader';
import { getProductImages } from '@/utils/imageUpload';

const AdminInventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

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

  useEffect(() => {
    const loadImages = async () => {
      setIsLoadingImages(true);
      try {
        const images = await getProductImages();
        setAvailableImages(images);
      } catch (error) {
        console.error('Failed to load images:', error);
        toast({
          title: "Failed to load images",
          description: "Could not retrieve the list of available images",
          variant: "destructive"
        });
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImages();
  }, []);

  const handleAddProduct = () => {
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

    addProduct(product);
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
      inStock: true
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Product added",
      description: "Product has been added to inventory",
    });
  };

  const handleEditProduct = () => {
    if (!currentProduct) return;
    updateProduct(currentProduct.id, currentProduct);
    setIsEditDialogOpen(false);
    toast({
      title: "Product updated",
      description: "Product has been updated in inventory",
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: "Product deleted",
        description: "Product has been removed from inventory",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrentProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (!currentProduct) return;
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setCurrentProduct(prev => ({ ...prev!, [field]: value }));
  };

  const handleSelectChange = (value: string, field: keyof Product) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrentSelectChange = (value: string, field: keyof Product) => {
    if (!currentProduct) return;
    setCurrentProduct(prev => ({ ...prev!, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>, isNew: boolean) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const tag = e.currentTarget.value.trim();
      if (isNew) {
        setNewProduct(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tag]
        }));
      } else if (currentProduct) {
        setCurrentProduct(prev => ({
          ...prev!,
          tags: [...(prev!.tags || []), tag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tag: string, isNew: boolean) => {
    if (isNew) {
      setNewProduct(prev => ({
        ...prev,
        tags: prev.tags?.filter(t => t !== tag) || []
      }));
    } else if (currentProduct) {
      setCurrentProduct(prev => ({
        ...prev!,
        tags: prev!.tags?.filter(t => t !== tag) || []
      }));
    }
  };

  const handleAddColor = (e: React.FormEvent<HTMLFormElement>, isNew: boolean) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const colorName = formData.get('colorName') as string;
    const colorValue = formData.get('colorValue') as string;
    
    if (!colorName || !colorValue) return;
    
    const newColor = { name: colorName, value: colorValue };
    
    if (isNew) {
      setNewProduct(prev => ({
        ...prev,
        colors: [...(prev.colors || []), newColor]
      }));
    } else if (currentProduct) {
      setCurrentProduct(prev => ({
        ...prev!,
        colors: [...(prev!.colors || []), newColor]
      }));
    }
    
    form.reset();
  };

  const handleAddSize = (e: React.KeyboardEvent<HTMLInputElement>, isNew: boolean) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const size = e.currentTarget.value.trim();
      if (isNew) {
        setNewProduct(prev => ({
          ...prev,
          sizes: [...(prev.sizes || []), size]
        }));
      } else if (currentProduct) {
        setCurrentProduct(prev => ({
          ...prev!,
          sizes: [...(prev!.sizes || []), size]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const handleNewProductImageUpload = (imageUrl: string) => {
    setNewProduct(prev => ({
      ...prev,
      images: [...(prev.images || []), imageUrl]
    }));
  };

  const handleExistingProductImageUpload = (imageUrl: string) => {
    if (!currentProduct) return;
    setCurrentProduct(prev => ({
      ...prev!,
      images: [...(prev!.images || []), imageUrl]
    }));
  };

  const removeNewProductImage = (imageUrl: string) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images?.filter(url => url !== imageUrl) || []
    }));
  };

  const removeExistingProductImage = (imageUrl: string) => {
    if (!currentProduct) return;
    setCurrentProduct(prev => ({
      ...prev!,
      images: prev!.images?.filter(url => url !== imageUrl) || []
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Button>
        </div>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative h-48 bg-gray-100">
                        <img 
                          src={product.images?.[0] || '/placeholder.svg'} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder.svg';
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="rounded-full bg-white/80 hover:bg-white"
                            onClick={() => {
                              setCurrentProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="rounded-full bg-white/80 hover:bg-white text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold">
                          ${product.price.toFixed(2)}
                          {product.discountPrice && (
                            <span className="ml-2 text-sm line-through text-muted-foreground">
                              ${product.discountPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.inStock ? (
                            <span className="text-green-600 font-medium">In Stock</span>
                          ) : (
                            <span className="text-red-600 font-medium">Out of Stock</span>
                          )}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.gender && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {product.gender}
                          </span>
                        )}
                        {product.ageRange && (
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                            {product.ageRange}
                          </span>
                        )}
                        {product.category && (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 border rounded-lg">
                  <h3 className="text-xl font-semibold text-muted-foreground">No products in inventory</h3>
                  <p className="mb-4">Add products to see them here</p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>Add First Product</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Analytics</CardTitle>
                <CardDescription>Get insights about your inventory and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">In Stock</h3>
                    <p className="text-3xl font-bold">
                      {products.filter(p => p.inStock).length}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Out of Stock</h3>
                    <p className="text-3xl font-bold">
                      {products.filter(p => !p.inStock).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                <form onSubmit={(e) => handleAddColor(e, true)} className="flex gap-2 items-center">
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
                  onKeyDown={(e) => handleAddSize(e, true)}
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
                  onKeyDown={(e) => handleAddTag(e, true)}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProduct.tags?.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                      {tag}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => removeTag(tag, true)}
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of this product
            </DialogDescription>
          </DialogHeader>

          {currentProduct && (
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
                  <form onSubmit={(e) => handleAddColor(e, false)} className="flex gap-2 items-center">
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
                    onKeyDown={(e) => handleAddSize(e, false)}
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
                    onKeyDown={(e) => handleAddTag(e, false)}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentProduct.tags?.map((tag, i) => (
                      <div key={i} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                        {tag}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0" 
                          onClick={() => removeTag(tag, false)}
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
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminInventory;
