
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarSearch from './navbar/NavbarSearch';
import NavigationLinks from './navbar/NavigationLinks';
import NavIcons from './navbar/NavIcons';
import MobileMenu from './navbar/MobileMenu';
import { categories, mainMenuItems, communityItems } from './navbar/NavbarData';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
          <NavigationLinks 
            mainMenuItems={mainMenuItems} 
            categories={categories} 
            communityItems={communityItems} 
          />

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-2">
            <NavbarSearch 
              searchOpen={searchOpen} 
              setSearchOpen={setSearchOpen} 
            />
            <NavIcons 
              mobileMenuOpen={mobileMenuOpen} 
              setMobileMenuOpen={setMobileMenuOpen} 
            />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu 
            mainMenuItems={mainMenuItems}
            communityItems={communityItems}
            categories={categories}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
