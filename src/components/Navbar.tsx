
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/de2a3b1d-d4d3-4fc3-b978-d8912e563d38.png" 
              alt="Happy Kids Box Logo" 
              className="h-10 sm:h-12"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop-now" className="text-sm font-medium hover:text-primary transition-colors">Shop Now</Link>
            <Link to="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link to="/social-purpose" className="text-sm font-medium hover:text-primary transition-colors">Social Purpose</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Input 
              type="text" 
              placeholder="Search for kids clothing" 
              className="w-64 pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <Link to="/my-account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-secondary text-primary-foreground text-xs rounded-full">0</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
