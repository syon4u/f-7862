
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mainMenuItems } from './NavbarData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isAuthenticated, user }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-3">
          {mainMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-600 hover:text-kid-purple py-2 transition-colors"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="border-t pt-3 mt-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Hi, {user?.profile?.first_name || 'User'}
                </p>
                <Button asChild variant="outline" className="w-full" onClick={onClose}>
                  <Link to="/my-account">My Account</Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="w-full" onClick={onClose}>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
