
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  Gift, 
  Shield 
} from 'lucide-react';

interface NavIconsProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const NavIcons: React.FC<NavIconsProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <div className="flex items-center space-x-2">
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
  );
};

export default NavIcons;
