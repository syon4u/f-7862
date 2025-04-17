
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

interface NavigationLinksProps {
  mainMenuItems: Array<{ name: string; path: string; hasDropdown: boolean }>;
  categories: Array<{ name: string; path: string }>;
  communityItems: Array<{ name: string; path: string }>;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  mainMenuItems, 
  categories, 
  communityItems 
}) => {
  return (
    <nav className="hidden md:block">
      <NavigationMenu className="justify-center">
        <NavigationMenuList className="gap-6">
          {mainMenuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.hasDropdown ? (
                <>
                  <NavigationMenuTrigger className="bg-transparent hover:text-primary text-[#5D4EBD] font-poppins text-sm">
                    <Link to={item.path} className="font-medium">
                      {item.name}
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-3 gap-3 p-4 w-screen max-w-2xl bg-white rounded-b-xl shadow-lg">
                      {categories.map((category, catIndex) => (
                        <div key={catIndex} className="p-2">
                          <NavigationMenuLink asChild>
                            <Link 
                              to={category.path} 
                              className="text-sm font-poppins text-[#5D4EBD] hover:text-primary block transition-colors"
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
                  className="text-sm font-poppins text-[#5D4EBD] hover:text-primary px-3 py-2 block transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavigationLinks;
