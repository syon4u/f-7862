
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NavbarSearchProps {
  searchOpen: boolean;
  setSearchOpen: (isOpen: boolean) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({ searchOpen, setSearchOpen }) => {
  return (
    <>
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
    </>
  );
};

export default NavbarSearch;
