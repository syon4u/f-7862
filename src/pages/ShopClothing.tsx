
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryBanner from '../components/CategoryBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Filter, X, Heart, Search } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useProducts } from '@/contexts/ProductContext';
import { Product } from '@/types/product';
import { toast } from '@/hooks/use-toast';

type Category = 'all' | 'new-in' | 'designers' | 'boys' | 'girls' | 'baby' | 'shoes';

interface ClothingItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: Category;
  age: string;
  color: string;
  rating: number;
  sale: boolean;
  salePrice?: number;
  new: boolean;
}

// Static mock data as fallback
const mockClothingItems: ClothingItem[] = [
  {
    id: "1",
    name: "Wild Cheetah T-Shirt",
    price: 24.99,
    image: "public/lovable-uploads/image(3).png",
    category: "tops",
    subcategory: "girls",
    age: "5-7",
    color: "black",
    rating: 4.8,
    sale: false,
    new: true
  },
  {
    id: "2",
    name: "Tie Dye Summer Top",
    price: 29.99,
    image: "public/lovable-uploads/image(4).png",
    category: "tops",
    subcategory: "girls",
    age: "8-10",
    color: "multi",
    rating: 4.9,
    sale: true,
    salePrice: 22.99,
    new: false
  },
  {
    id: "3",
    name: "Colorful Pattern Shirt",
    price: 32.99,
    image: "public/lovable-uploads/image(5).png",
    category: "tops",
    subcategory: "girls",
    age: "5-7",
    color: "purple",
    rating: 4.7,
    sale: false,
    new: true
  },
  {
    id: "4",
    name: "Floral Print Dress",
    price: 36.99,
    image: "public/lovable-uploads/image(6).png",
    category: "dresses",
    subcategory: "girls",
    age: "8-10",
    color: "multi",
    rating: 4.6,
    sale: false,
    new: false
  },
  {
    id: "5",
    name: "Boys Graphic T-Shirt",
    price: 22.99,
    image: "public/lovable-uploads/image(7).png",
    category: "tops",
    subcategory: "boys",
    age: "5-7",
    color: "blue",
    rating: 4.3,
    sale: false,
    new: false
  },
  {
    id: "6",
    name: "Baby Sailor Outfit",
    price: 44.99,
    image: "public/lovable-uploads/image(8).png",
    category: "outerwear",
    subcategory: "baby",
    age: "0-2",
    color: "white",
    rating: 4.6,
    sale: false,
    new: true
  },
  {
    id: "7",
    name: "Designer Polka Dot Dress",
    price: 49.99,
    image: "public/lovable-uploads/image(9).png",
    category: "dresses",
    subcategory: "designers",
    age: "8-10",
    color: "pink",
    rating: 4.5,
    sale: true,
    salePrice: 39.99,
    new: false
  },
  {
    id: "8",
    name: "New Season Casual T-Shirt",
    price: 26.99,
    image: "public/lovable-uploads/image(10).png",
    category: "tops",
    subcategory: "new-in",
    age: "5-7",
    color: "yellow",
    rating: 4.2,
    sale: false,
    new: true
  },
  {
    id: "9",
    name: "Kids Summer Sandals",
    price: 34.99,
    image: "public/lovable-uploads/image(11).png",
    category: "footwear",
    subcategory: "shoes",
    age: "2-4",
    color: "brown",
    rating: 4.4,
    sale: true,
    salePrice: 29.99,
    new: false
  },
  {
    id: "10",
    name: "Baby Cotton Romper",
    price: 29.99,
    image: "public/lovable-uploads/image(12).png",
    category: "onesies",
    subcategory: "baby",
    age: "0-2",
    color: "white",
    rating: 4.9,
    sale: false,
    new: true
  },
  {
    id: "11",
    name: "Boys Casual Shorts",
    price: 32.99,
    image: "public/lovable-uploads/image(13).png",
    category: "bottoms",
    subcategory: "boys",
    age: "8-10",
    color: "blue",
    rating: 4.7,
    sale: true,
    salePrice: 27.99,
    new: false
  },
  {
    id: "12",
    name: "Designer Kids Sneakers",
    price: 79.99,
    image: "public/lovable-uploads/image(14).png",
    category: "footwear",
    subcategory: "designers",
    age: "5-7",
    color: "white",
    rating: 4.8,
    sale: false,
    new: true
  },
  {
    id: "13",
    name: "Colorful Summer Dress",
    price: 42.99,
    image: "public/lovable-uploads/image(15).png",
    category: "dresses",
    subcategory: "new-in",
    age: "5-7",
    color: "multi",
    rating: 4.7,
    sale: false,
    new: true
  },
  {
    id: "14",
    name: "Baby Duck Raincoat",
    price: 38.99,
    image: "public/lovable-uploads/image(16).png",
    category: "outerwear",
    subcategory: "baby",
    age: "2-4",
    color: "yellow",
    rating: 4.9,
    sale: true,
    salePrice: 32.99,
    new: false
  },
  {
    id: "15",
    name: "Boys Sports Jersey",
    price: 34.99,
    image: "public/lovable-uploads/image(17).png",
    category: "tops",
    subcategory: "boys",
    age: "8-10",
    color: "red",
    rating: 4.6,
    sale: false,
    new: true
  },
  {
    id: "16",
    name: "Designer Party Dress",
    price: 89.99,
    image: "public/lovable-uploads/image(18).png",
    category: "dresses",
    subcategory: "designers",
    age: "5-7",
    color: "pink",
    rating: 4.8,
    sale: true,
    salePrice: 69.99,
    new: false
  },
  {
    id: "17",
    name: "Summer Hat Collection",
    price: 19.99,
    image: "public/lovable-uploads/image(19).png",
    category: "accessories",
    subcategory: "new-in",
    age: "2-4",
    color: "multi",
    rating: 4.5,
    sale: false,
    new: true
  },
  {
    id: "18",
    name: "Canvas Slip-On Shoes",
    price: 42.99,
    image: "public/lovable-uploads/image(20).png",
    category: "footwear",
    subcategory: "shoes",
    age: "5-7",
    color: "blue",
    rating: 4.4,
    sale: true,
    salePrice: 36.99,
    new: false
  },
  {
    id: "19",
    name: "Patterned Leggings Set",
    price: 28.99,
    image: "public/lovable-uploads/image(21).png",
    category: "bottoms",
    subcategory: "girls",
    age: "2-4",
    color: "multi",
    rating: 4.7,
    sale: false,
    new: true
  },
  {
    id: "20",
    name: "Baby Two-Piece Set",
    price: 45.99,
    image: "public/lovable-uploads/image(22).png",
    category: "outfits",
    subcategory: "baby",
    age: "0-2",
    color: "white",
    rating: 4.9,
    sale: true,
    salePrice: 38.99,
    new: false
  },
  {
    id: "21",
    name: "Boys Formal Shirt",
    price: 32.99,
    image: "public/lovable-uploads/image(23).png",
    category: "tops",
    subcategory: "boys",
    age: "8-10",
    color: "white",
    rating: 4.5,
    sale: false,
    new: true
  },
  {
    id: "22",
    name: "Sparkle Princess Shoes",
    price: 49.99,
    image: "public/lovable-uploads/image(24).png",
    category: "footwear",
    subcategory: "shoes",
    age: "5-7",
    color: "pink",
    rating: 4.8,
    sale: false,
    new: true
  },
  {
    id: "23",
    name: "Summer Shorts Collection",
    price: 26.99,
    image: "public/lovable-uploads/image(25).png",
    category: "bottoms",
    subcategory: "new-in",
    age: "5-7",
    color: "blue",
    rating: 4.6,
    sale: true,
    salePrice: 22.99,
    new: false
  },
  {
    id: "24",
    name: "Designer School Backpack",
    price: 64.99,
    image: "public/lovable-uploads/image(26).png",
    category: "accessories",
    subcategory: "designers",
    age: "5-7",
    color: "purple",
    rating: 4.7,
    sale: false,
    new: true
  },
  {
    id: "25",
    name: "Girls Summer Playsuit",
    price: 38.99,
    image: "public/lovable-uploads/image(27).png",
    category: "outfits",
    subcategory: "girls",
    age: "2-4",
    color: "pink",
    rating: 4.5,
    sale: true,
    salePrice: 32.99,
    new: false
  },
  {
    id: "26",
    name: "Baby Winter Snowsuit",
    price: 52.99,
    image: "public/lovable-uploads/image(28).png",
    category: "outerwear",
    subcategory: "baby",
    age: "0-2",
    color: "blue",
    rating: 4.9,
    sale: false,
    new: true
  },
  {
    id: "27",
    name: "Kids Athletic Shoes",
    price: 45.99,
    image: "public/lovable-uploads/image(29).png",
    category: "footwear",
    subcategory: "shoes",
    age: "8-10",
    color: "black",
    rating: 4.7,
    sale: true,
    salePrice: 39.99,
    new: false
  },
  {
    id: "28",
    name: "Boys Superhero Pajamas",
    price: 34.99,
    image: "public/lovable-uploads/image(30).png",
    category: "sleepwear",
    subcategory: "boys",
    age: "5-7",
    color: "blue",
    rating: 4.8,
    sale: false,
    new: true
  },
  {
    id: "29",
    name: "Designer Kids Sunglasses",
    price: 28.99,
    image: "public/lovable-uploads/image(31).png",
    category: "accessories",
    subcategory: "designers",
    age: "5-7",
    color: "black",
    rating: 4.6,
    sale: true,
    salePrice: 22.99,
    new: false
  },
  {
    id: "30",
    name: "Girls Ballet Flats",
    price: 36.99,
    image: "public/lovable-uploads/image(32).png",
    category: "footwear",
    subcategory: "girls",
    age: "5-7",
    color: "pink",
    rating: 4.5,
    sale: false,
    new: true
  },
  {
    id: "31",
    name: "New Season Denim Jacket",
    price: 48.99,
    image: "public/lovable-uploads/image(33).png",
    category: "outerwear",
    subcategory: "new-in",
    age: "8-10",
    color: "blue",
    rating: 4.7,
    sale: true,
    salePrice: 42.99,
    new: true
  }
];

const categoryDescriptions = {
  "all": "Shop our complete collection of quality children's clothing",
  "new-in": "The latest styles and trends for your little ones",
  "designers": "Premium brands and exclusive designer collections",
  "boys": "Cool and comfortable styles for active boys",
  "girls": "Stylish and fun fashion for girls of all ages",
  "baby": "Soft and adorable outfits for the smallest family members",
  "shoes": "Quality footwear for growing feet"
};

const ShopClothing: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterAge, setFilterAge] = useState<string[]>([]);
  const [filterColor, setFilterColor] = useState<string[]>([]);
  const [filterSale, setFilterSale] = useState<boolean>(false);
  const [filterNew, setFilterNew] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  
  // Get products from context
  const { products, loading } = useProducts();
  
  // Convert products from admin inventory to clothing items format
  useEffect(() => {
    if (products.length > 0) {
      const convertedItems: ClothingItem[] = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg',
        category: product.category?.toLowerCase() || 'tops',
        subcategory: (product.gender === 'boy' ? 'boys' : 
                     product.gender === 'girl' ? 'girls' : 
                     product.gender === 'unisex' && product.ageRange?.includes('0-') ? 'baby' : 'new-in') as Category,
        age: product.ageRange || '5-7',
        color: product.colors && product.colors.length > 0 ? product.colors[0].value.toLowerCase() : 'multi',
        rating: product.rating || 4.5,
        sale: product.discountPrice !== undefined,
        salePrice: product.discountPrice,
        new: product.tags?.includes('new') || false
      }));
      
      // Combine admin products with mock data, prioritizing admin products
      const adminProductIds = new Set(convertedItems.map(item => item.id));
      const filteredMockItems = mockClothingItems.filter(item => !adminProductIds.has(item.id));
      
      setClothingItems([...convertedItems, ...filteredMockItems]);
      toast({
        title: "Products Loaded",
        description: `${convertedItems.length} products loaded from inventory`,
        variant: "default"
      });
    } else {
      // Use mock data if no admin products
      setClothingItems(mockClothingItems);
    }
  }, [products]);
  
  const handleCategoryChange = (category: string) => {
    setFilterCategory(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleAgeChange = (age: string) => {
    setFilterAge(prev => 
      prev.includes(age) 
        ? prev.filter(a => a !== age)
        : [...prev, age]
    );
  };
  
  const handleColorChange = (color: string) => {
    setFilterColor(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const clearFilters = () => {
    setFilterCategory([]);
    setFilterAge([]);
    setFilterColor([]);
    setFilterSale(false);
    setFilterNew(false);
    setSearchTerm('');
  };
  
  const filteredItems = clothingItems.filter(item => {
    if (activeTab !== 'all' && item.subcategory !== activeTab) {
      return false;
    }
    
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    const matchesCategory = filterCategory.length === 0 || filterCategory.includes(item.category);
    const matchesAge = filterAge.length === 0 || filterAge.includes(item.age);
    const matchesColor = filterColor.length === 0 || filterColor.includes(item.color);
    const matchesSale = !filterSale || item.sale;
    const matchesNew = !filterNew || item.new;
    
    return matchesCategory && matchesAge && matchesColor && matchesSale && matchesNew;
  }).sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return Number(b.new) - Number(a.new);
    }
  });

  const categories = ["tops", "bottoms", "dresses", "outerwear", "sleepwear", "swimwear", "footwear", "onesies"];
  const ages = ["0-2", "2-4", "5-7", "8-10", "11+"];
  const colors = ["black", "white", "blue", "pink", "green", "brown", "purple", "multi"];

  const hasFilters = filterCategory.length > 0 || 
                     filterAge.length > 0 || 
                     filterColor.length > 0 || 
                     filterSale || 
                     filterNew ||
                     searchTerm.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={(value) => setActiveTab(value as Category)}
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="bg-background border h-12 w-full md:w-auto inline-flex">
                <TabsTrigger value="all" className="text-sm md:text-base">All Products</TabsTrigger>
                <TabsTrigger value="new-in" className="text-sm md:text-base">New In</TabsTrigger>
                <TabsTrigger value="designers" className="text-sm md:text-base">Designers</TabsTrigger>
                <TabsTrigger value="boys" className="text-sm md:text-base">Boys</TabsTrigger>
                <TabsTrigger value="girls" className="text-sm md:text-base">Girls</TabsTrigger>
                <TabsTrigger value="baby" className="text-sm md:text-base">Baby</TabsTrigger>
                <TabsTrigger value="shoes" className="text-sm md:text-base">Shoes</TabsTrigger>
              </TabsList>
            </div>
            
            <CategoryBanner 
              category={activeTab === 'all' ? 'Shop Kids Clothing' : activeTab.replace('-', ' ')}
              description={categoryDescriptions[activeTab]}
            />
          </Tabs>
        </div>
      
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:hidden space-y-4">
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter clothing items by your preferences
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Category</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category}`} 
                              checked={filterCategory.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <Label htmlFor={`mobile-category-${category}`} className="capitalize">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Age Range</h3>
                      <div className="space-y-2">
                        {ages.map((age) => (
                          <div key={age} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-age-${age}`} 
                              checked={filterAge.includes(age)}
                              onCheckedChange={() => handleAgeChange(age)}
                            />
                            <Label htmlFor={`mobile-age-${age}`}>{age}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Color</h3>
                      <div className="space-y-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-color-${color}`} 
                              checked={filterColor.includes(color)}
                              onCheckedChange={() => handleColorChange(color)}
                            />
                            <Label htmlFor={`mobile-color-${color}`} className="capitalize">
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Special</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-sale" 
                            checked={filterSale}
                            onCheckedChange={() => setFilterSale(!filterSale)}
                          />
                          <Label htmlFor="mobile-sale">On Sale</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-new" 
                            checked={filterNew}
                            onCheckedChange={() => setFilterNew(!filterNew)}
                          />
                          <Label htmlFor="mobile-new">New Arrivals</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={clearFilters}
                      disabled={!hasFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="relative flex-grow">
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="priceLow">Price: Low to High</SelectItem>
                  <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="hidden md:block w-1/4 bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6">
              <div className="relative">
                <Input 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-league-spartan font-bold">Filters</h2>
              {hasFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={filterCategory.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="capitalize">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Age Range</h3>
                <div className="space-y-2">
                  {ages.map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`age-${age}`} 
                        checked={filterAge.includes(age)}
                        onCheckedChange={() => handleAgeChange(age)}
                      />
                      <Label htmlFor={`age-${age}`}>{age}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${color}`} 
                        checked={filterColor.includes(color)}
                        onCheckedChange={() => handleColorChange(color)}
                      />
                      <Label htmlFor={`color-${color}`} className="capitalize flex items-center gap-1">
                        <span className={`inline-block w-3 h-3 rounded-full bg-${color === 'multi' ? 'gradient-to-r from-pink-400 via-yellow-400 to-blue-500' : color}`}></span>
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Special</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sale" 
                      checked={filterSale}
                      onCheckedChange={() => setFilterSale(!filterSale)}
                    />
                    <Label htmlFor="sale">On Sale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new" 
                      checked={filterNew}
                      onCheckedChange={() => setFilterNew(!filterNew)}
                    />
                    <Label htmlFor="new">New Arrivals</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            <div className="flex flex-col space-y-6">
              <div className="hidden md:flex justify-between items-center">
                <div></div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {hasFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      <span>"{searchTerm}"</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => setSearchTerm('')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {filterCategory.map(category => (
                    <div 
                      key={`filter-${category}`} 
                      className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span className="capitalize">{category}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => handleCategoryChange(category)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {filterAge.map(age => (
                    <div 
                      key={`filter-${age}`} 
                      className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span>{age}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => handleAgeChange(age)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {filterColor.map(color => (
                    <div 
                      key={`filter-${color}`} 
                      className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span className="capitalize">{color}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => handleColorChange(color)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {filterSale && (
                    <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      <span>On Sale</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => setFilterSale(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {filterNew && (
                    <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      <span>New Arrivals</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 p-0" 
                        onClick={() => setFilterNew(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 product-image-shine" 
                      />
                      {item.sale && (
                        <div className="absolute top-3 left-3 bg-kid-pink text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                          SALE
                        </div>
                      )}
                      {item.new && (
                        <div className="absolute top-3 right-3 bg-kid-green text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                          NEW
                        </div>
                      )}
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="absolute bottom-3 right-3 bg-white text-primary hover:bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-league-spartan font-medium text-lg">{item.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="uppercase text-xs px-2 py-0.5 bg-kid-blue/20 text-kid-blue rounded-full">
                          {item.category}
                        </span>
                        <span className="uppercase text-xs px-2 py-0.5 bg-kid-purple/20 text-kid-purple rounded-full">
                          {item.age}
                        </span>
                        <span className="uppercase text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                          {item.subcategory}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          {item.sale ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">${item.salePrice?.toFixed(2)}</span>
                              <span className="text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <Button size="sm" className="rounded-full kid-button">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div className="text-center py-16 bg-muted/20 rounded-lg">
                  <h3 className="text-xl font-league-spartan mb-2">No items found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-16 bg-kid-gradient-3 p-8 rounded-xl shadow-sm">
              <div className="text-center space-y-4">
                <h2 className="font-league-spartan text-2xl font-bold">Not sure what to choose?</h2>
                <p className="text-muted-foreground">Take our style quiz to help find the perfect clothing for your child</p>
                <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 shadow-md">
                  <Link to="/style-quiz">Take the Style Quiz</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopClothing;
