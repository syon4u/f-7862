import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash, Package, ShoppingBag, Box, Upload, Image } from 'lucide-react';
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
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    }
  });

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
          
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
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
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">${product.price}</TableCell>
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
                              <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                  <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
                                  <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  
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
                                                id="image-upload-edit"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                              />
                                              <label htmlFor="image-upload-edit" className="cursor-pointer">
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
                                  
                                  <div className="flex justify-end space-x-4 pt-4">
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      onClick={() => setEditingProduct(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button type="submit">Save</Button>
                                  </div>
                                </form>
                              </Form>
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminInventory;
