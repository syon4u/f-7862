import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash, Package, ShoppingBag, Box, Upload, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerManager from '../components/admin/BannerManager';
import { toast } from 'sonner';
import { Product } from '@/types/product';

const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'HK Baby Box',
      description: 'Perfect for newborns to 24 months, 6 adorable pieces.',
      price: 85,
      rating: 4.8,
      reviewCount: 42,
      images: ['https://images.unsplash.com/photo-1632163030629-a7b9a21b6094?q=80&w=1000'],
      colors: [{ name: 'Blue', value: '#3b82f6' }, { name: 'Pink', value: '#ec4899' }],
      sizes: ['Newborn', '3M', '6M', '9M', '12M', '18M', '24M'],
      features: ['6 items per box', 'Mix of bottoms, tops and one-piece outfits', 'Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '0-24 months',
      category: 'Baby',
      brand: 'Happy Kids',
      material: 'Cotton',
      tags: ['baby', 'box', 'subscription'],
      seasonality: 'All Season',
      isBox: true,
    },
    {
      id: '2',
      name: 'HK Mini Box',
      description: 'For ages 2-14 years, 2 stylish outfit pieces.',
      price: 62,
      rating: 4.5,
      reviewCount: 28,
      images: ['https://images.unsplash.com/photo-1519403744128-5eed654514c5?q=80&w=1000'],
      colors: [{ name: 'Red', value: '#ef4444' }, { name: 'Green', value: '#22c55e' }],
      sizes: ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14'],
      features: ['2 items per box', 'Styled brand outfit', 'Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '2-14 years',
      category: 'Kids',
      brand: 'Happy Kids',
      material: 'Mixed Materials',
      tags: ['kids', 'box', 'subscription'],
      seasonality: 'All Season',
      isBox: true,
    },
    {
      id: '3',
      name: 'HK Classic Box',
      description: 'For ages 2-14 years, 4 stylish, mix-and-match pieces.',
      price: 85,
      rating: 4.9,
      reviewCount: 56,
      images: ['https://images.unsplash.com/photo-1519403744128-5eed654514c5?q=80&w=1000'],
      colors: [{ name: 'Blue', value: '#3b82f6' }, { name: 'Yellow', value: '#eab308' }],
      sizes: ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14'],
      features: ['4 items per box', 'Style mix of brand bottoms, tops', 'Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '2-14 years',
      category: 'Kids',
      brand: 'Happy Kids',
      material: 'Mixed Materials',
      tags: ['kids', 'box', 'subscription'],
      seasonality: 'All Season',
      isBox: true,
    },
    {
      id: '4',
      name: 'HK Deluxe Box',
      description: 'For ages 2-14 years, 6 premium pieces for any occasion.',
      price: 124,
      rating: 4.7,
      reviewCount: 34,
      images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1000'],
      colors: [{ name: 'Purple', value: '#8b5cf6' }, { name: 'Orange', value: '#f97316' }],
      sizes: ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14'],
      features: ['6 items per box', 'Premium brand selection', 'Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '2-14 years',
      category: 'Kids',
      brand: 'Happy Kids',
      material: 'Mixed Materials',
      tags: ['kids', 'box', 'subscription'],
      seasonality: 'All Season',
      isBox: true,
    },
    {
      id: '5',
      name: 'HK Grand Box',
      description: 'For ages 2-14 years, 8 top-quality pieces for a complete wardrobe refresh.',
      price: 155,
      rating: 4.6,
      reviewCount: 23,
      images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1000'],
      colors: [{ name: 'Black', value: '#171717' }, { name: 'White', value: '#f3f4f6' }],
      sizes: ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14'],
      features: ['8 items per box', 'Complete wardrobe refresh', 'Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '2-14 years',
      category: 'Kids',
      brand: 'Happy Kids',
      material: 'Mixed Materials',
      tags: ['kids', 'box', 'subscription'],
      seasonality: 'All Season',
      isBox: true,
    },
  ]);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 5,
    inStock: 5,
    outOfStock: 0,
    lowStock: 2,
  });

  const form = useForm<Product>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      price: 0,
      rating: 5,
      reviewCount: 0,
      images: [],
      colors: [],
      sizes: [],
      features: [],
      inStock: true,
      gender: 'unisex',
      ageRange: '',
      category: '',
      brand: 'Happy Kids',
      material: '',
      tags: [],
      seasonality: 'All Season',
      isBox: false,
    }
  });

  const detectIfBox = () => {
    const productName = form.getValues().name.toLowerCase();
    const productDescription = form.getValues().description.toLowerCase();
    
    const boxKeywords = ['box', 'kit', 'bundle', 'collection', 'package', 'set'];
    
    const hasBoxKeyword = boxKeywords.some(keyword => 
      productName.includes(keyword) || productDescription.includes(keyword)
    );
    
    if (hasBoxKeyword && !form.getValues().isBox) {
      form.setValue('isBox', true);
      toast.info("This product was automatically identified as a box/bundle product.");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    form.reset(product);
  };

  const handleAddProduct = () => {
    setIsAddingProduct(true);
    form.reset({
      id: `${Math.floor(Math.random() * 1000)}`,
      name: '',
      description: '',
      price: 0,
      rating: 5,
      reviewCount: 0,
      images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1000'],
      colors: [{ name: 'Blue', value: '#3b82f6' }],
      sizes: ['2T', '3T', '4T', '5'],
      features: ['Free shipping'],
      inStock: true,
      gender: 'unisex',
      ageRange: '',
      category: '',
      brand: 'Happy Kids',
      material: '',
      tags: [],
      seasonality: 'All Season',
      isBox: false,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success("Product deleted successfully");
    
    updateInventoryStats(products.filter(product => product.id !== productId));
  };

  const updateInventoryStats = (updatedProducts: Product[]) => {
    const inStock = updatedProducts.filter(p => p.inStock).length;
    setInventoryStats({
      totalProducts: updatedProducts.length,
      inStock,
      outOfStock: updatedProducts.length - inStock,
      lowStock: Math.floor(updatedProducts.length * 0.4),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const currentImages = form.getValues().images || [];
        form.setValue('images', [...currentImages, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues().images || [];
    form.setValue('images', currentImages.filter((_, i) => i !== index));
  };

  const onSubmit = (data: Product) => {
    if (data.name && !form.getValues().isBox) {
      detectIfBox();
    }
    
    let updatedProducts;
    
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === data.id ? data : p);
      setProducts(updatedProducts);
      setEditingProduct(null);
      toast.success("Product updated successfully");
    } else {
      updatedProducts = [...products, data];
      setProducts(updatedProducts);
      setIsAddingProduct(false);
      toast.success("Product added successfully");
    }
    
    updateInventoryStats(updatedProducts);
    form.reset();
  };

  const toggleProductStock = (productId: string, inStock: boolean) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return { ...p, inStock: !inStock };
      }
      return p;
    });
    
    setProducts(updatedProducts);
    updateInventoryStats(updatedProducts);
    
    toast.success(`Product marked as ${!inStock ? 'in stock' : 'out of stock'}`);
  };

  const handleTagInput = (value: string) => {
    if (value.endsWith(',') || value.endsWith(' ')) {
      const tag = value.replace(/,|\s+$/g, '').trim();
      if (tag) {
        const currentTags = form.getValues().tags || [];
        if (!currentTags.includes(tag)) {
          form.setValue('tags', [...currentTags, tag]);
        }
        return '';
      }
    }
    return value;
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues().tags || [];
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const [newSize, setNewSize] = useState('');
  
  const handleAddSize = () => {
    if (newSize.trim()) {
      const currentSizes = form.getValues().sizes || [];
      if (!currentSizes.includes(newSize.trim())) {
        form.setValue('sizes', [...currentSizes, newSize.trim()]);
        setNewSize('');
      }
    }
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    const currentSizes = form.getValues().sizes || [];
    form.setValue('sizes', currentSizes.filter(size => size !== sizeToRemove));
  };

  const [newColor, setNewColor] = useState({ name: '', value: '#000000' });
  
  const handleAddColor = () => {
    if (newColor.name.trim()) {
      const currentColors = form.getValues().colors || [];
      form.setValue('colors', [...currentColors, { ...newColor }]);
      setNewColor({ name: '', value: '#000000' });
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    const currentColors = form.getValues().colors || [];
    form.setValue('colors', currentColors.filter(color => color.name !== colorToRemove));
  };

  const [newFeature, setNewFeature] = useState('');
  
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues().features || [];
      if (!currentFeatures.includes(newFeature.trim())) {
        form.setValue('features', [...currentFeatures, newFeature.trim()]);
        setNewFeature('');
      }
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    const currentFeatures = form.getValues().features || [];
    form.setValue('features', currentFeatures.filter(feature => feature !== featureToRemove));
  };

  const renderProductForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(detectIfBox, 500);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(detectIfBox, 500);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select 
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 2-5 years" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select 
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select Category</option>
                      <option value="Baby">Baby</option>
                      <option value="Boys">Boys</option>
                      <option value="Girls">Girls</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Uniform">School Uniform</option>
                      <option value="Outlet">Outlet</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Cotton, Polyester" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="seasonality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seasonality</FormLabel>
                <FormControl>
                  <select 
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="All Season">All Season</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Product Colors</FormLabel>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              {form.getValues().colors?.map((color, index) => (
                <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.value }} />
                  <span className="text-sm">{color.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color.name)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newColor.name}
                onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                placeholder="Color name (e.g., Red)"
                className="flex-1"
              />
              <Input
                type="color"
                value={newColor.value}
                onChange={(e) => setNewColor({ ...newColor, value: e.target.value })}
                className="w-16"
              />
              <Button type="button" variant="outline" onClick={handleAddColor}>Add</Button>
            </div>
          </div>
          
          <div>
            <FormLabel>Product Sizes</FormLabel>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              {form.getValues().sizes?.map((size, index) => (
                <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1">
                  <span className="text-sm">{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Size (e.g., S, M, L, XL, 2T, 3T)"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleAddSize}>Add</Button>
            </div>
          </div>

          <div>
            <FormLabel>Product Features</FormLabel>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              {form.getValues().features?.map((feature, index) => (
                <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Feature (e.g., Free shipping)"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleAddFeature}>Add</Button>
            </div>
          </div>
          
          <div>
            <FormLabel>Product Tags</FormLabel>
            <div className="mt-2 flex flex-wrap gap-2 mb-2">
              {form.getValues().tags?.map((tag, index) => (
                <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1">
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter tags separated by commas"
                  onChange={(e) => {
                    const result = handleTagInput(e.target.value);
                    if (result !== undefined) {
                      e.target.value = result;
                    }
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Enter tags and press comma or space to add
              </FormDescription>
            </FormItem>
          </div>
          
          <FormField
            control={form.control}
            name="careInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Care Instructions</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Machine wash cold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <div className="space-y-4">
                  {field.value && field.value.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {field.value.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`Product image ${index + 1}`} 
                            className="h-20 w-20 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-md border-gray-300">
                      <div className="text-center">
                        <Image className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">No images uploaded</p>
                      </div>
                    </div>
                  )}
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" className="flex items-center">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Input 
                    type="checkbox" 
                    checked={field.value} 
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4"
                  />
                </FormControl>
                <FormLabel className="font-normal">In Stock</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isBox"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    This is a box/bundle product
                  </FormLabel>
                  <FormDescription>
                    Check this if the product is a subscription box or contains multiple items bundled together
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setEditingProduct(null);
                setIsAddingProduct(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="inventory">
            <TabsList className="mb-8">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="banners">Banner Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Box className="h-8 w-8 text-primary mr-2" />
                      <span className="text-3xl font-bold">{inventoryStats.totalProducts}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">In Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <ShoppingBag className="h-8 w-8 text-green-500 mr-2" />
                      <span className="text-3xl font-bold">{inventoryStats.inStock}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Out of Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-red-500 mr-2" />
                      <span className="text-3xl font-bold">{inventoryStats.outOfStock}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Low Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Box className="h-8 w-8 text-amber-500 mr-2" />
                      <span className="text-3xl font-bold">{inventoryStats.lowStock}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Product Inventory</h2>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button onClick={handleAddProduct} className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>{isAddingProduct ? 'Add New Product' : 'Edit Product'}</SheetTitle>
                        <SheetDescription>
                          {isAddingProduct ? 'Create a new product' : 'Update product details'}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        {renderProductForm()}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableCaption>Product inventory management</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="w-20">
                            <div className="h-16 w-16 rounded overflow-hidden">
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">{product.name}</p>
                                {product.isBox && (
                                  <span className="inline-flex">
                                    <Package className="h-4 w-4 text-amber-600" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {product.category && (
                                  <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                                    {product.category}
                                  </span>
                                )}
                                {product.gender && (
                                  <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary text-xs rounded">
                                    {product.gender}
                                  </span>
                                )}
                                {product.ageRange && (
                                  <span className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                                    Age: {product.ageRange}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.discountPrice ? (
                              <div>
                                <span className="line-through text-muted-foreground mr-2">${product.price}</span>
                                <span className="text-primary font-medium">${product.discountPrice}</span>
                              </div>
                            ) : (
                              <span>${product.price}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              onClick={() => toggleProductStock(product.id, product.inStock)}
                              variant={product.inStock ? "outline" : "destructive"} 
                              size="sm"
                              className={`px-2 py-1 text-xs ${product.inStock ? 'border-green-500 text-green-700' : 'bg-red-100 text-red-700'}`}
                            >
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Sheet>
                                <SheetTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                    Edit
                                  </Button>
                                </SheetTrigger>
                                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                                  <SheetHeader>
                                    <SheetTitle>Edit Product</SheetTitle>
                                    <SheetDescription>
                                      Update product details
                                    </SheetDescription>
                                  </SheetHeader>
                                  <div className="mt-6">
                                    {renderProductForm()}
                                  </div>
                                </SheetContent>
                              </Sheet>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="banners">
              <BannerManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminInventory;
