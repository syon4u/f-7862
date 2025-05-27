
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, X } from 'lucide-react';
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

interface ProductFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  filterCategory: string[];
  filterAge: string[];
  filterColor: string[];
  filterSale: boolean;
  filterNew: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilterSale: (value: boolean) => void;
  setFilterNew: (value: boolean) => void;
  onCategoryChange: (category: string) => void;
  onAgeChange: (age: string) => void;
  onColorChange: (color: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  sortBy,
  setSortBy,
  filterCategory,
  filterAge,
  filterColor,
  filterSale,
  filterNew,
  searchTerm,
  setSearchTerm,
  setFilterSale,
  setFilterNew,
  onCategoryChange,
  onAgeChange,
  onColorChange,
  onClearFilters,
  hasFilters
}) => {
  const categories = ["tops", "bottoms", "dresses", "outerwear", "sleepwear", "swimwear", "onesies"];
  const ages = ["0-2", "2-4", "5-7", "8-10", "11+"];
  const colors = ["black", "white", "blue", "pink", "green", "brown", "purple", "multi"];

  return (
    <>
      {/* Mobile Filters */}
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
                          onCheckedChange={() => onCategoryChange(category)}
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
                          onCheckedChange={() => onAgeChange(age)}
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
                          onCheckedChange={() => onColorChange(color)}
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
                  onClick={onClearFilters}
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
              onClick={onClearFilters}
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
                    onCheckedChange={() => onCategoryChange(category)}
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
                    onCheckedChange={() => onAgeChange(age)}
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
                    onCheckedChange={() => onColorChange(color)}
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
    </>
  );
};

export default ProductFilters;
