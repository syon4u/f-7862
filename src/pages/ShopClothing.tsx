
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Filter, X } from 'lucide-react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ClothingItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
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
    name: "Colorful Stripe T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519238360530-d5eeb35f50e0?w=800&auto=format&fit=crop&q=60",
    category: "tops",
    age: "2-4",
    color: "multi",
    rating: 4.5,
    sale: false,
    new: true
  },
  {
    id: "2",
    name: "Cute Denim Overalls",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=800&auto=format&fit=crop&q=60",
    category: "bottoms",
    age: "5-7",
    color: "blue",
    rating: 4.8,
    sale: true,
    salePrice: 29.99,
    new: false
  },
  {
    id: "3",
    name: "Dinosaur Print Pajamas",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=60",
    category: "sleepwear",
    age: "8-10",
    color: "green",
    rating: 4.7,
    sale: false,
    new: false
  },
  {
    id: "4",
    name: "Ruffled Summer Dress",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=800&auto=format&fit=crop&q=60",
    category: "dresses",
    age: "2-4",
    color: "pink",
    rating: 4.9,
    sale: true,
    salePrice: 32.99,
    new: true
  },
  {
    id: "5",
    name: "Camo Print Cargo Pants",
    price: 36.99,
    image: "https://images.unsplash.com/photo-1565292334631-127e15e74bf1?w=800&auto=format&fit=crop&q=60",
    category: "bottoms",
    age: "5-7",
    color: "multi",
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
    age: "0-2",
    color: "brown",
    rating: 4.6,
    sale: false,
    new: true
  },
  {
    id: "7",
    name: "Polka Dot Swimsuit",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1543702610-31e0b297b88e?w=800&auto=format&fit=crop&q=60",
    category: "swimwear",
    age: "8-10",
    color: "blue",
    rating: 4.5,
    sale: true,
    salePrice: 22.99,
    new: false
  },
  {
    id: "8",
    name: "Jungle Print T-Shirt",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1486714941986-f2113c751c97?w=800&auto=format&fit=crop&q=60",
    category: "tops",
    age: "5-7",
    color: "green",
    rating: 4.2,
    sale: false,
    new: false
  },
];

const ShopClothing: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterAge, setFilterAge] = useState<string[]>([]);
  const [filterColor, setFilterColor] = useState<string[]>([]);
  const [filterSale, setFilterSale] = useState<boolean>(false);
  const [filterNew, setFilterNew] = useState<boolean>(false);
  
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
  };
  
  const filteredItems = mockClothingItems.filter(item => {
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

  const categories = ["tops", "bottoms", "dresses", "outerwear", "sleepwear", "swimwear"];
  const ages = ["0-2", "2-4", "5-7", "8-10", "11+"];
  const colors = ["blue", "pink", "green", "brown", "multi"];

  const hasFilters = filterCategory.length > 0 || 
                     filterAge.length > 0 || 
                     filterColor.length > 0 || 
                     filterSale || 
                     filterNew;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile Filters */}
          <div className="w-full md:hidden flex justify-between items-center mb-4">
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
          
          {/* Desktop Filters */}
          <div className="hidden md:block w-1/4 bg-white p-6 rounded-lg shadow-sm">
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
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${color}`} 
                        checked={filterColor.includes(color)}
                        onCheckedChange={() => handleColorChange(color)}
                      />
                      <Label htmlFor={`color-${color}`} className="capitalize">
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
              <div className="flex justify-between items-center">
                <h1 className="font-league-spartan text-3xl md:text-4xl font-bold">Shop Kids Clothing</h1>
                <div className="hidden md:block">
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
              </div>
              
              {hasFilters && (
                <div className="flex flex-wrap gap-2">
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
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                      />
                      {item.sale && (
                        <div className="absolute top-3 left-3 bg-kid-pink text-white text-xs font-bold rounded-full px-3 py-1">
                          SALE
                        </div>
                      )}
                      {item.new && (
                        <div className="absolute top-3 right-3 bg-kid-green text-white text-xs font-bold rounded-full px-3 py-1">
                          NEW
                        </div>
                      )}
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="absolute bottom-3 right-3 bg-white text-primary hover:bg-white/90 rounded-full shadow-sm"
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
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="uppercase text-xs px-2 py-0.5 bg-kid-blue/20 text-kid-blue rounded-full">
                          {item.category}
                        </span>
                        <span className="uppercase text-xs px-2 py-0.5 bg-kid-purple/20 text-kid-purple rounded-full">
                          {item.age}
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
                        
                        <Button size="sm" className="rounded-full">
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
