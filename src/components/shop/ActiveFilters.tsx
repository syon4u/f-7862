
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  searchTerm: string;
  filterCategory: string[];
  filterAge: string[];
  filterColor: string[];
  filterSale: boolean;
  filterNew: boolean;
  onRemoveSearchTerm: () => void;
  onRemoveCategory: (category: string) => void;
  onRemoveAge: (age: string) => void;
  onRemoveColor: (color: string) => void;
  onRemoveSale: () => void;
  onRemoveNew: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  searchTerm,
  filterCategory,
  filterAge,
  filterColor,
  filterSale,
  filterNew,
  onRemoveSearchTerm,
  onRemoveCategory,
  onRemoveAge,
  onRemoveColor,
  onRemoveSale,
  onRemoveNew
}) => {
  const hasFilters = filterCategory.length > 0 || 
                     filterAge.length > 0 || 
                     filterColor.length > 0 || 
                     filterSale || 
                     filterNew ||
                     searchTerm.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {searchTerm && (
        <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
          <span>"{searchTerm}"</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={onRemoveSearchTerm}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {filterCategory.map(category => (
        <div 
          key={`filter-${category}`} 
          className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
        >
          <span className="capitalize">{category}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={() => onRemoveCategory(category)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      {filterAge.map(age => (
        <div 
          key={`filter-${age}`} 
          className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
        >
          <span>{age}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={() => onRemoveAge(age)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      {filterColor.map(color => (
        <div 
          key={`filter-${color}`} 
          className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1"
        >
          <span className="capitalize">{color}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={() => onRemoveColor(color)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      {filterSale && (
        <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
          <span>On Sale</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={onRemoveSale}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {filterNew && (
        <div className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
          <span>New Arrivals</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0" 
            onClick={onRemoveNew}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;
