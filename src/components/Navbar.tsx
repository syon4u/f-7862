
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Gift, Shield } from 'lucide-react';
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

  const mainMenuItems = [
    { name: "SHOP NOW", path: "/shop-clothing", hasDropdown: true },
    { name: "HOW IT WORKS", path: "/how-it-works", hasDropdown: false },
    { name: "STYLE QUIZ", path: "/style-quiz", hasDropdown: false },
    { name: "SOCIAL PURPOSE", path: "/social-purpose", hasDropdown: false },
    { name: "MEMBERSHIP CLUB", path: "/membership", hasDropdown: false },
  ];

  const communityItems = [
    { name: "BLOG", path: "/blog" },
    { name: "EVENTS", path: "/events" },
    { name: "DONATION PROGRAM", path: "/donation-program" },
  ];

  return (
    <header className="border-b bg-kid-blue sticky top-0 z-50 shadow-md">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Left Section - Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/af77dcd8-39d9-4916-9ac0-cf012692472e.png" 
              alt="Happy Kids Box Logo" 
              className="h-20 md:h-28 object-contain"
              onError={(e) => {
                console.error("Logo failed to load");
                e.currentTarget.src = "/placeholder.svg";
                e.currentTarget.style.height = "60px";
                e.currentTarget.style.width = "240px";
              }}
            />
          </Link>
          
          {/* Center - Navigation */}
          <nav className="hidden md:block">
            <NavigationMenu className="justify-center">
              <NavigationMenuList className="gap-4">
                {mainMenuItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10 text-white">
                          <Link to={item.path} className="text-sm font-bold">
                            {item.name}
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid grid-cols-5 gap-2 p-4 w-screen max-w-5xl bg-white rounded-b-xl shadow-lg">
                            {categories.map((category, catIndex) => (
                              <div key={catIndex} className="p-2">
                                <NavigationMenuLink asChild>
                                  <Link 
                                    to={category.path} 
                                    className="text-sm font-bold hover:text-[#FF4D6D] block transition-colors"
                                  >
                                    {category.name}
                                  </Link>
                                </NavigationMenuLink>
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        to={item.path} 
                        className="text-sm font-bold text-white hover:text-white/80 px-3 py-2 block transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10 text-white">
                    <span className="text-sm font-bold">COMMUNITY</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-56 bg-white rounded-b-xl shadow-lg">
                      {communityItems.map((item, index) => (
                        <Link 
                          key={index}
                          to={item.path} 
                          className="block p-2 hover:bg-[#FFCD4F]/10 rounded text-sm font-bold transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-2">
            <div className={`${searchOpen ? 'flex' : 'hidden'} md:flex relative`}>
              <Input 
                type="text" 
                placeholder="Search for..." 
                className="w-32 md:w-56 pr-8 border-white bg-white/90"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/customer-support" className="hidden md:block text-xs font-bold text-white hover:text-white/80">
              CUSTOMER CARE
            </Link>
            <Link to="/my-account">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/donation-program" className="hidden md:block">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" title="Donation Program">
                <Gift className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/membership" className="hidden md:block">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" title="Membership Club">
                <Shield className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/checkout" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#FF4D6D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Button>
            </Link>
            <Link to="/admin/inventory" className="hidden md:block">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                Inventory
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <ul className="space-y-4">
              {mainMenuItems.map((item, index) => (
                <li key={index} className="px-2">
                  <Link 
                    to={item.path} 
                    className="block py-2 text-sm font-bold text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="px-2">
                <div className="py-2 text-sm font-bold text-white">COMMUNITY</div>
                <ul className="pl-4 space-y-2">
                  {communityItems.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={item.path} 
                        className="block py-1 text-sm font-bold text-white/90 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="border-t border-white/20 pt-2 mt-2">
                <p className="px-2 text-xs text-white/70">CATEGORIES</p>
              </li>
              {categories.map((category, index) => (
                <li key={`cat-${index}`} className="px-2">
                  <Link 
                    to={category.path} 
                    className="block py-2 text-sm font-bold text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="px-2 pt-2 border-t border-white/20">
                <Link 
                  to="/admin/inventory" 
                  className="block py-2 text-sm font-bold text-white hover:text-white/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  INVENTORY MANAGEMENT
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
