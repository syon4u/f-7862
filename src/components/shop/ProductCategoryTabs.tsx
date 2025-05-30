
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryBanner from '../CategoryBanner';

type Category = 'all' | 'boys' | 'girls' | 'baby';

interface ProductCategoryTabsProps {
  activeTab: Category;
  onTabChange: (value: Category) => void;
}

const categoryDescriptions = {
  "all": "Shop our complete collection of quality children's clothing",
  "boys": "Cool and comfortable styles for active boys",
  "girls": "Stylish and fun fashion for girls of all ages",
  "baby": "Soft and adorable outfits for the smallest family members"
};

const ProductCategoryTabs: React.FC<ProductCategoryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue="all" 
        className="w-full"
        onValueChange={(value) => onTabChange(value as Category)}
      >
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-background border h-12 w-full md:w-auto inline-flex">
            <TabsTrigger value="all" className="text-sm md:text-base">All Products</TabsTrigger>
            <TabsTrigger value="boys" className="text-sm md:text-base">Boys</TabsTrigger>
            <TabsTrigger value="girls" className="text-sm md:text-base">Girls</TabsTrigger>
            <TabsTrigger value="baby" className="text-sm md:text-base">Baby</TabsTrigger>
          </TabsList>
        </div>
        
        <CategoryBanner 
          category={activeTab === 'all' ? 'Shop Kids Clothing' : activeTab}
          description={categoryDescriptions[activeTab]}
        />
      </Tabs>
    </div>
  );
};

export default ProductCategoryTabs;
