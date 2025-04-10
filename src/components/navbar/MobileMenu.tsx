
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  mainMenuItems: Array<{ name: string; path: string; hasDropdown: boolean }>;
  communityItems: Array<{ name: string; path: string }>;
  categories: Array<{ name: string; path: string }>;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  mainMenuItems, 
  communityItems, 
  categories, 
  setMobileMenuOpen 
}) => {
  return (
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
  );
};

export default MobileMenu;
