
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface ProductsFilterProps {
  onFilter: (filters: {
    search: string;
    inStock: 'all' | 'in-stock' | 'out-of-stock';
    category: string;
    gender: string;
  }) => void;
  categories: string[];
  genders: string[];
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({ 
  onFilter,
  categories,
  genders
}) => {
  const [search, setSearch] = useState('');
  const [inStock, setInStock] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');

  const handleFilter = () => {
    onFilter({
      search,
      inStock,
      category,
      gender
    });
  };

  const handleReset = () => {
    setSearch('');
    setInStock('all');
    setCategory('');
    setGender('');
    
    onFilter({
      search: '',
      inStock: 'all',
      category: '',
      gender: ''
    });
  };

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <h3 className="font-medium mb-3">Filter Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Select 
          value={inStock} 
          onValueChange={(value: 'all' | 'in-stock' | 'out-of-stock') => setInStock(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Stock status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All products</SelectItem>
            <SelectItem value="in-stock">In stock</SelectItem>
            <SelectItem value="out-of-stock">Out of stock</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={category} 
          onValueChange={setCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={gender} 
          onValueChange={setGender}
        >
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All genders</SelectItem>
            {genders.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
          <X size={16} /> Reset
        </Button>
        <Button onClick={handleFilter} className="flex items-center gap-2">
          <Search size={16} /> Filter
        </Button>
      </div>
    </div>
  );
};

export default ProductsFilter;
