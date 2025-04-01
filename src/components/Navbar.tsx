
import React from 'react';
import { Search, ShoppingCart, User, Gift, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="border-b sticky top-0 bg-background z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/de2a3b1d-d4d3-4fc3-b978-d8912e563d38.png" 
              alt="Happy Kids Box Logo" 
              className="h-12 sm:h-14 animate-float"
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop-clothing" className="text-sm font-medium hover:text-primary transition-colors bubble">Shop Clothing</Link>
            <Link to="/shop-now" className="text-sm font-medium hover:text-primary transition-colors bubble">Subscription Boxes</Link>
            <Link to="/style-quiz" className="text-sm font-medium hover:text-primary transition-colors bubble">Style Quiz</Link>
            <Link to="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors bubble">How It Works</Link>
            <Link to="/social-purpose" className="text-sm font-medium hover:text-primary transition-colors bubble">Social Purpose</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Input 
              type="text" 
              placeholder="Search for kids clothing" 
              className="w-64 pr-10 rounded-full"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Search" className="text-kid-blue hover:text-primary transition-colors">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <Link to="/my-account">
            <Button variant="ghost" size="icon" aria-label="Account" className="text-kid-pink hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="text-kid-purple hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/checkout">
            <Button variant="ghost" size="icon" aria-label="Cart" className="text-kid-yellow hover:text-primary transition-colors">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-secondary text-white text-xs rounded-full">0</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
