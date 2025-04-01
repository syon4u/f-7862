
import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

const mockClothingItems: ClothingItem[] = [
  {
    id: "1",
    name: "Wild Cheetah T-Shirt",
    price: 24.99,
    image: "public/lovable-uploads/761ea3ff-40e2-457d-84f2-d1bb82065633.png",
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
    image: "public/lovable-uploads/d63a9b83-76c4-4d33-a915-ebef09e1b705.png",
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
    name: "Sequin Unicorn Shirt",
    price: 32.99,
    image: "public/lovable-uploads/5754ea2e-950a-497b-8481-99499b62e764.png",
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
    name: "Palm Print Tank Top",
    price: 26.99,
    image: "public/lovable-uploads/85e5cba9-699f-4c04-b837-ae63a2d20237.png",
    category: "tops",
    subcategory: "girls",
    age: "8-10",
    color: "black",
    rating: 4.6,
    sale: false,
    new: false
  },
  {
    id: "5",
    name: "Classic Denim Jeans",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1565292334631-127e15e74bf1?w=800&auto=format&fit=crop&q=60",
    category: "bottoms",
    subcategory: "boys",
    age: "5-7",
    color: "blue",
    rating: 4.3,
    sale: false,
    new: false
  },
  {
    id: "6",
    name: "Cotton Bear Hoodie",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1522968639566-c048a0ea1e36?w=800&auto=format&fit=crop&q=60",
    category: "outerwear",
    subcategory: "baby",
    age: "0-2",
    color: "brown",
    rating: 4.6,
    sale: false,
    new: true
  },
  {
    id: "7",
    name: "Designer Polka Dot Swimsuit",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1543702610-31e0b297b88e?w=800&auto=format&fit=crop&q=60",
    category: "swimwear",
    subcategory: "designers",
    age: "8-10",
    color: "blue",
    rating: 4.5,
    sale: true,
    salePrice: 39.99,
    new: false
  },
  {
    id: "8",
    name: "New Season Jungle Print T-Shirt",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1486714941986-f2113c751c97?w=800&auto=format&fit=crop&q=60",
    category: "tops",
    subcategory: "new-in",
    age: "5-7",
    color: "green",
    rating: 4.2,
    sale: false,
    new: true
  },
  {
    id: "9",
    name: "Kids Summer Sandals",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60",
    category: "footwear",
    subcategory: "shoes",
    age: "2-4",
    color: "pink",
    rating: 4.4,
    sale: true,
    salePrice: 29.99,
    new: false
  },
  {
    id: "10",
    name: "Baby Cotton Romper",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&auto=format&fit=crop&q=60",
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
    name: "Boys Denim Shorts",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25cc55?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&auto=format&fit=crop&q=60",
    category: "footwear",
    subcategory: "designers",
    age: "5-7",
    color: "white",
    rating: 4.8,
    sale: false,
    new: true
  },
];

const categoryDescriptions = {
  'all': "Shop our complete collection of quality children's clothing",
  'new-in': "The latest styles and trends for your little ones",
  'designers': "Premium brands and exclusive designer collections",
  'boys': "Cool and comfortable styles for active boys",
  'girls': "Stylish and fun fashion for girls of all ages",
  'baby': "Soft and adorable outfits for the smallest family members",
  'shoes': "Quality footwear for growing feet"
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
  
  const filteredItems = mockClothingItems.filter(item => {
    // Filter by subcategory tab
    if (activeTab !== 'all' && item.subcategory !== activeTab) {
      return false;
    }
    
    // Search term filter
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
        // Sort by newness by default
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
        {/* Category Tabs */}
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
          {/* Mobile Filter and Search */}
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
          
          {/* Desktop Filters */}
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
                <div></div> {/* Empty div for spacing */}
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
