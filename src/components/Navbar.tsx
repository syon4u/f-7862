
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavigationLinks from './navbar/NavigationLinks';
import MobileMenu from './navbar/MobileMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavIcons from './navbar/NavIcons';
import { mainMenuItems, categories, communityItems } from './navbar/NavbarData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-kid-purple">
            Kid's Closet
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationLinks 
              mainMenuItems={mainMenuItems}
              categories={categories}
              communityItems={communityItems}
            />
          </div>

          {/* Right side icons and auth */}
          <div className="flex items-center space-x-4">
            <NavbarSearch 
              searchOpen={isSearchOpen} 
              setSearchOpen={setIsSearchOpen} 
            />
            <NavIcons 
              mobileMenuOpen={isOpen}
              setMobileMenuOpen={setIsOpen}
            />
            
            {/* Authentication */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Hi, {user?.profile?.first_name || 'User'}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/my-account">My Account</Link>
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-2 border-t">
            <NavbarSearch 
              searchOpen={true} 
              setSearchOpen={() => setIsSearchOpen(false)} 
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
