import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCategoryTabs from '../components/shop/ProductCategoryTabs';
import ProductFilters from '../components/shop/ProductFilters';
import ActiveFilters from '../components/shop/ActiveFilters';
import ProductGrid from '../components/shop/ProductGrid';
import NoProductsFound from '../components/shop/NoProductsFound';
import StyleQuizCTA from '../components/shop/StyleQuizCTA';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useProducts } from '@/contexts/ProductContext';
import { toast } from '@/hooks/use-toast';

type Category = 'all' | 'boys' | 'girls' | 'baby';

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
                     product.gender === 'unisex' && product.ageRange?.includes('0-') ? 'baby' : 'all') as Category,
        age: product.ageRange || '5-7',
        color: product.colors && product.colors.length > 0 ? product.colors[0].name.toLowerCase() : 'multi',
        rating: product.rating || 4.5,
        sale: product.discountPrice !== undefined,
        salePrice: product.discountPrice,
        new: product.tags?.includes('new') || false
      }));
      
      setClothingItems(convertedItems);
      
      if (convertedItems.length > 0) {
        toast({
          title: "Products Loaded",
          description: `${convertedItems.length} products loaded from inventory`,
          variant: "default"
        });
      } else {
        toast({
          title: "No Products Found",
          description: "No products found in inventory. Please add products in the Admin Inventory page.",
          variant: "destructive"
        });
      }
    } else {
      setClothingItems([]);
      if (!loading) {
        toast({
          title: "No Products Found",
          description: "No products found in inventory. Please add products in the Admin Inventory page.",
          variant: "destructive"
        });
      }
    }
  }, [products, loading]);
  
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
        <ProductCategoryTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <ProductFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterCategory={filterCategory}
            filterAge={filterAge}
            filterColor={filterColor}
            filterSale={filterSale}
            filterNew={filterNew}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setFilterSale={setFilterSale}
            setFilterNew={setFilterNew}
            onCategoryChange={handleCategoryChange}
            onAgeChange={handleAgeChange}
            onColorChange={handleColorChange}
            onClearFilters={clearFilters}
            hasFilters={hasFilters}
          />
          
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
                <ActiveFilters
                  searchTerm={searchTerm}
                  filterCategory={filterCategory}
                  filterAge={filterAge}
                  filterColor={filterColor}
                  filterSale={filterSale}
                  filterNew={filterNew}
                  onRemoveSearchTerm={() => setSearchTerm('')}
                  onRemoveCategory={handleCategoryChange}
                  onRemoveAge={handleAgeChange}
                  onRemoveColor={handleColorChange}
                  onRemoveSale={() => setFilterSale(false)}
                  onRemoveNew={() => setFilterNew(false)}
                />
              )}
              
              {filteredItems.length === 0 ? (
                <NoProductsFound
                  hasFilters={hasFilters}
                  productsCount={products.length}
                  onClearFilters={clearFilters}
                />
              ) : (
                <ProductGrid items={filteredItems} />
              )}
            </div>
            
            <StyleQuizCTA />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopClothing;
