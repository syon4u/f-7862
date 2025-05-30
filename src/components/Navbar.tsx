
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

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
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
