
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const categories = [
    { name: "NEW IN", path: "/shop-clothing?category=new" },
    { name: "DESIGNERS", path: "/shop-clothing?category=designers" },
    { name: "BOYS", path: "/shop-clothing?category=boys" },
    { name: "GIRLS", path: "/shop-clothing?category=girls" },
    { name: "BABY", path: "/shop-clothing?category=baby" },
    { name: "SHOES", path: "/shop-clothing?category=shoes" },
    { name: "GIFT IDEAS", path: "/shop-clothing?category=gifts" },
    { name: "SCHOOL UNIFORM", path: "/shop-clothing?category=uniform" },
    { name: "THE EDIT", path: "/shop-clothing?category=edit" },
    { name: "OUTLET", path: "/shop-clothing?category=outlet" },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left Section - Search */}
          <div className="flex items-center space-x-2">
            <div className={`${searchOpen ? 'flex' : 'hidden'} md:flex relative`}>
              <Input 
                type="text" 
                placeholder="Search for..." 
                className="w-32 md:w-56 pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Center - Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/de2a3b1d-d4d3-4fc3-b978-d8912e563d38.png" 
              alt="Happy Kids Box Logo" 
              className="h-10 md:h-12"
            />
          </Link>
          
          {/* Right Section - Icons */}
          <div className="flex items-center space-x-2">
            <Link to="/my-account" className="hidden md:block text-xs font-medium">
              CUSTOMER CARE
            </Link>
            <Link to="/my-account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Navigation Categories */}
        <nav className="hidden md:block py-3">
          <NavigationMenu className="justify-center">
            <NavigationMenuList className="gap-2">
              {categories.map((category, index) => (
                <NavigationMenuItem key={index}>
                  <Link to={category.path} className="text-sm font-medium hover:text-primary px-4 py-2 block transition-colors">
                    {category.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index} className="px-2">
                  <Link 
                    to={category.path} 
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="px-2 pt-2 border-t">
                <Link 
                  to="/my-account" 
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CUSTOMER CARE
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
