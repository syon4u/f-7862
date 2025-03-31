
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar: React.FC = () => {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <a href="/" className="text-2xl font-serif font-bold">ModernShop</a>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">New Arrivals</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Shop</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Collections</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Input 
              type="text" 
              placeholder="Search products" 
              className="w-64 pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full">0</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
