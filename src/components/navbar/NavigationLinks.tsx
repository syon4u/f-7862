
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  );
};

export default NavigationLinks;
